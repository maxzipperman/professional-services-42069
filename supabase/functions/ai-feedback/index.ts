import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// CORS headers must remain
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface AIFeedbackRequest {
  website_url: string;
  focus_area?: string;
  industry?: string;
}

// Helpers: fetch website content (Firecrawl -> fallback to direct fetch)
async function fetchWithFirecrawl(url: string, apiKey?: string): Promise<string | null> {
  if (!apiKey) return null
  try {
    const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        formats: ['markdown', 'text'],
      }),
    })
    if (!res.ok) {
      const t = await res.text()
      console.error('Firecrawl error:', res.status, t)
      return null
    }
    const data = await res.json() as any
    // Try common fields from Firecrawl responses
    const md = data?.markdown || data?.data?.[0]?.markdown || null
    const txt = data?.text || data?.data?.[0]?.text || null
    const content = md || txt
    return typeof content === 'string' ? content : null
  } catch (e) {
    console.error('Firecrawl fetch exception:', e)
    return null
  }
}

function stripHtml(html: string): string {
  try {
    // remove scripts/styles/noscript
    const cleaned = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    return cleaned
  } catch {
    return html
  }
}

async function fetchDirect(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      // Many sites require a UA
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ClearlineBot/1.0; +https://clearline.studio)',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    })
    if (!res.ok) {
      console.error('Direct fetch error:', res.status, await res.text().catch(() => ''))
      return null
    }
    const html = await res.text()
    return stripHtml(html)
  } catch (e) {
    console.error('Direct fetch exception:', e)
    return null
  }
}

async function getSiteContent(url: string): Promise<{ content: string; source: 'firecrawl' | 'direct' | 'none' }> {
  const firecrawlKey = Deno.env.get('FIRECRAWL_API_KEY') || ''
  const viaFirecrawl = await fetchWithFirecrawl(url, firecrawlKey)
  if (viaFirecrawl && typeof viaFirecrawl === 'string' && viaFirecrawl.trim()) {
    const snippet = viaFirecrawl.slice(0, 8000)
    return { content: snippet, source: 'firecrawl' }
  }
  const viaDirect = await fetchDirect(url)
  if (viaDirect && viaDirect.trim()) {
    const snippet = viaDirect.slice(0, 8000)
    return { content: snippet, source: 'direct' }
  }
  return { content: '', source: 'none' }
}

// Perplexity: try multiple models in order until one succeeds
const PERPLEXITY_MODELS = [
  // Try a few options; availability can vary per account
  'llama-3.1-sonar-large-128k-online',
  'llama-3.1-sonar-small-128k-online',
  'llama-3.1-sonar-huge-128k-online',
  // Fallbacks sometimes available on accounts
  'sonar-pro',
  'sonar-small-chat',
]

async function callPerplexityWithFallback({ apiKey, messages }: { apiKey: string; messages: any[] }) {
  const tried: Array<{ model: string; status?: number; error?: unknown }> = []
  let lastError: unknown = null

  for (const model of PERPLEXITY_MODELS) {
    try {
      console.log('Perplexity: trying model', model)
      const resp = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 2000,
          return_images: false,
          return_related_questions: false,
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      })

      if (!resp.ok) {
        const text = await resp.text()
        console.error('Perplexity API error:', resp.status, text)
        tried.push({ model, status: resp.status, error: text })
        continue
      }

      const data = await resp.json()
      const content = data?.choices?.[0]?.message?.content
      if (content && typeof content === 'string') {
        return { content, modelUsed: model }
      }

      console.error('Perplexity: empty content for model', model, JSON.stringify(data).slice(0, 1000))
      tried.push({ model, error: 'empty_content' })
    } catch (e) {
      console.error('Perplexity request exception for model', model, e)
      lastError = e
      tried.push({ model, error: e })
    }
  }

  return { error: 'all_models_failed', details: { tried, lastError } }
}

// New: Robust client IP extraction helper
function getClientIP(req: Request): { ip: string; sourceHeader: string } {
  const headers = req.headers
  const cfIp = headers.get('cf-connecting-ip')
  if (cfIp) return { ip: cfIp.trim(), sourceHeader: 'cf-connecting-ip' }

  const xff = headers.get('x-forwarded-for')
  if (xff) {
    const first = xff.split(',')[0]?.trim() || ''
    if (first) return { ip: first, sourceHeader: 'x-forwarded-for' }
  }

  const xReal = headers.get('x-real-ip')
  if (xReal) return { ip: xReal.trim(), sourceHeader: 'x-real-ip' }

  return { ip: '127.0.0.1', sourceHeader: 'fallback' }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Use service role key so RLS policies allow usage tracking
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { website_url, focus_area, industry }: AIFeedbackRequest = await req.json()

    // Basic validation for website_url
    if (!website_url || !/^https?:\/\//i.test(website_url)) {
      return new Response(
        JSON.stringify({ error: 'Invalid website_url. Include http(s):// and a valid domain.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get client IP using robust detection and load secrets
    const { ip: clientIP, sourceHeader } = getClientIP(req)
    const allowedRaw = (Deno.env.get('ALLOWED_OWNER_IPS') || '').trim()
    const allowedOwnerIPs = allowedRaw
      ? allowedRaw.split(',').map(s => s.trim()).filter(Boolean)
      : []
    const dailyLimit = Number.parseInt(Deno.env.get('AI_FEEDBACK_DAILY_LIMIT') || '3', 10) || 3

    const isOwnerWhitelisted = allowedOwnerIPs.includes(clientIP)
    console.log('[ai-feedback] ip:', clientIP, 'via:', sourceHeader, 'ownerWhitelisted:', isOwnerWhitelisted)

    // Usage tracking and rate limiting
    let isWhitelisted = isOwnerWhitelisted
    let usage: any = null
    let now = new Date()
    let lastUsed: Date | null = null
    let isNewDay = true
    let currentUsage = 0

    if (!isWhitelisted) {
      const { data: usageRow, error: usageError } = await supabaseClient
        .from('ai_feedback_usage')
        .select('*')
        .eq('ip_address', clientIP)
        .maybeSingle()

      if (usageError) {
        throw usageError
      }

      usage = usageRow
      isWhitelisted = !!usage?.whitelisted

      lastUsed = usage?.last_used ? new Date(usage.last_used) : null
      isNewDay = !lastUsed || lastUsed.toDateString() !== now.toDateString()
      currentUsage = isNewDay ? 0 : (usage?.usage_count || 0)

      if (!isWhitelisted && currentUsage >= dailyLimit) {
        const remaining = 0
        const headers = {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': String(dailyLimit),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Bypass': 'false',
          'X-Detected-IP': clientIP,
        }
        return new Response(
          JSON.stringify({
            error: 'Rate limit exceeded',
            limit: dailyLimit,
            usage: currentUsage,
            resetTime: new Date(now.getTime() + (24 * 60 * 60 * 1000) - (now.getTime() % (24 * 60 * 60 * 1000))),
            meta: { whitelisted: false, detectedIP: clientIP }
          }),
          { status: 429, headers }
        )
      }
    }

    // Get industry-specific prompt
    const industryPrompts: Record<string, string> = {
      'Professional Services': 'Analyze this professional services website for trust signals, compliance considerations, and conversion optimization. Focus on credibility factors, call-to-action placement, and accessibility.',
      'Local Businesses': 'Review this local business website for local SEO potential, mobile experience, and conversion paths. Analyze contact information visibility, service clarity, and geographic targeting.',
      'Nonprofits': 'Evaluate this nonprofit website for donor engagement, volunteer recruitment, and mission clarity. Focus on storytelling, donation flow, and impact communication.',
      'Creatives': 'Assess this creative professional\'s website for portfolio presentation, service clarity, and client attraction. Analyze visual hierarchy, work showcase, and booking process.',
      'Lawyers': 'Analyze this law firm website for professional credibility, practice area clarity, and client acquisition. Focus on trust factors, contact accessibility, and expertise demonstration.',
      'Accountants': 'Review this accounting firm website for professional trust, service transparency, and client communication. Analyze credential display, service clarity, and contact optimization.',
      'Consultants': 'Evaluate this consulting website for authority positioning, service differentiation, and lead generation. Focus on expertise demonstration, case studies, and conversion paths.'
    }

    const industryPrompt = industryPrompts[industry || 'Professional Services'] || industryPrompts['Professional Services']
    
    // Fetch site content (Firecrawl then direct)
    const { content: siteContent, source: contentSource } = await getSiteContent(website_url)
    console.log('Content source:', contentSource, 'length:', siteContent.length)

    // Prepare final prompt
    const finalPrompt = `You are a professional website analyst and conversion optimization expert. ${industryPrompt}

Website URL: ${website_url}
${focus_area ? `Specific Focus: ${focus_area}` : ''}

Please provide a comprehensive analysis covering:

1. **First Impressions & Design**
   - Visual hierarchy and professional appearance
   - Brand consistency and trust signals
   - Mobile responsiveness assessment

2. **User Experience & Navigation**
   - Site structure and ease of navigation
   - Page load considerations
   - Accessibility factors

3. **Content & Messaging**
   - Clarity of value proposition
   - Service/product presentation
   - Call-to-action effectiveness

4. **Conversion Optimization**
   - Lead generation potential
   - Contact information accessibility
   - Trust building elements

5. **Industry-Specific Recommendations**
   - Compliance and professional standards
   - Competitive positioning
   - Target audience alignment

6. **Priority Action Items**
   - Top 3 immediate improvements
   - Quick wins for better performance
   - Long-term strategic recommendations

Format your response in clear sections with specific, actionable recommendations. Be professional but approachable, focusing on practical improvements that will drive business results.`

    // Call Perplexity with fallback
    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    if (!perplexityApiKey) {
      throw new Error('Perplexity API key not configured')
    }

    const messages = [
      {
        role: 'system',
        content: 'You are a professional website analyst and conversion optimization expert. Produce a concise, structured report: a markdown checklist, category scores, an overall score out of 100, prioritized improvements, and discussion ideas for Max.'
      },
      {
        role: 'user',
        content: (() => {
          const contentBlock = siteContent ? `\n\nWebsite content (truncated):\n${siteContent}` : ''
          return `You are an expert website analyst evaluating a site against industry best practices. ${industryPrompt}

Website URL: ${website_url}
${focus_area ? `Specific Focus: ${focus_area}` : ''}${contentBlock}

Return your analysis in markdown with this exact structure:

## 1) Checklist
Use markdown checkboxes for each item. For any that need work, add 1–2 bullets with specifics.
- [ ] First Impressions & Design
- [ ] UX & Navigation
- [ ] Content & Messaging
- [ ] Conversion (CRO)
- [ ] Performance & Accessibility
- [ ] SEO Basics
- [ ] Industry-specific Compliance

## 2) Scores
- Category scores (0–10 each) for the areas above
- Overall score: NN/100 with a one-sentence rationale

## 3) Top Opportunities (Prioritized)
List 5 improvements with Expected Impact (Low/Med/High) and Effort (Low/Med/High).

## 4) Ideas to Discuss with Max
Provide 5 strategic enhancements, experiments, or positioning ideas to review with Max.

Be specific, actionable, and professional. Keep fluff to a minimum.`
        })()
      }
    ]

    const result = await callPerplexityWithFallback({ apiKey: perplexityApiKey, messages })

    if ((result as any).error) {
      console.error('Perplexity failed for all models:', (result as any).details)
      return new Response(
        JSON.stringify({
          error: 'Upstream AI error',
          provider: 'perplexity',
          details: (result as any).details
        }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const analysis = (result as any).content as string

    // Update usage tracking (skip if whitelisted)
    if (!isWhitelisted) {
      const newUsageCount = (usage && !isNaN(usage?.usage_count))
        ? ((lastUsed && lastUsed.toDateString() === now.toDateString())
            ? (usage.usage_count + 1)
            : 1)
        : 1

      if (usage) {
        await supabaseClient
          .from('ai_feedback_usage')
          .update({ 
            usage_count: newUsageCount, 
            last_used: now.toISOString() 
          })
          .eq('ip_address', clientIP)
      } else {
        await supabaseClient
          .from('ai_feedback_usage')
          .insert({ 
            ip_address: clientIP, 
            usage_count: 1, 
            last_used: now.toISOString() 
          })
      }
      // Recompute for response headers
      const usedToday = newUsageCount
      const remaining = Math.max(0, dailyLimit - usedToday)
      const headers = {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': String(dailyLimit),
        'X-RateLimit-Remaining': String(remaining),
        'X-RateLimit-Bypass': 'false',
        'X-Detected-IP': clientIP,
      }
      return new Response(
        JSON.stringify({
          analysis,
          usage: {
            remaining,
            limit: dailyLimit,
            whitelisted: false
          },
          meta: {
            contentSource: contentSource,
            detectedIP: clientIP
          }
        }),
        { headers }
      )
    }

    // Whitelisted: no rate limiting, return generous remaining
    const headers = {
      ...corsHeaders,
      'Content-Type': 'application/json',
      'X-RateLimit-Limit': String(dailyLimit),
      'X-RateLimit-Remaining': '999',
      'X-RateLimit-Bypass': 'true',
      'X-Detected-IP': clientIP,
    }

    return new Response(
      JSON.stringify({
        analysis,
        usage: {
          remaining: 999,
          limit: dailyLimit,
          whitelisted: true
        },
        meta: {
          contentSource: contentSource,
          detectedIP: clientIP
        }
      }),
      { headers }
    )

  } catch (error: any) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
