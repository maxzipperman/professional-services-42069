import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AIFeedbackRequest {
  website_url: string;
  focus_area?: string;
  industry?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { website_url, focus_area, industry }: AIFeedbackRequest = await req.json()
    
    // Get client IP
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                    req.headers.get('x-real-ip') || 
                    '127.0.0.1'

    // Check rate limiting
    const { data: usage, error: usageError } = await supabaseClient
      .from('ai_feedback_usage')
      .select('*')
      .eq('ip_address', clientIP)
      .single()

    if (usageError && usageError.code !== 'PGRST116') {
      throw usageError
    }

    // Check if IP is whitelisted or within daily limit
    const isWhitelisted = usage?.whitelisted || false
    const dailyLimit = 3
    const now = new Date()
    const lastUsed = usage?.last_used ? new Date(usage.last_used) : null
    const isNewDay = !lastUsed || lastUsed.toDateString() !== now.toDateString()

    if (!isWhitelisted) {
      const currentUsage = isNewDay ? 0 : (usage?.usage_count || 0)
      
      if (currentUsage >= dailyLimit) {
        return new Response(
          JSON.stringify({ 
            error: 'Rate limit exceeded', 
            limit: dailyLimit,
            usage: currentUsage,
            resetTime: new Date(now.getTime() + (24 * 60 * 60 * 1000) - (now.getTime() % (24 * 60 * 60 * 1000)))
          }),
          { 
            status: 429, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
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
    
    // Prepare the analysis prompt
    const analysisPrompt = `You are a professional website analyst and conversion optimization expert. ${industryPrompt}

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

    // Call Perplexity API
    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    
    if (!perplexityApiKey) {
      throw new Error('Perplexity API key not configured')
    }

    const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a professional website analyst and conversion optimization expert. Provide detailed, actionable feedback in a structured format.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 2000,
        return_images: false,
        return_related_questions: false,
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    })

    if (!perplexityResponse.ok) {
      throw new Error(`Perplexity API error: ${perplexityResponse.status}`)
    }

    const result = await perplexityResponse.json()
    const analysis = result.choices[0]?.message?.content

    if (!analysis) {
      throw new Error('No analysis received from AI')
    }

    // Update usage tracking
    if (!isWhitelisted) {
      const newUsageCount = isNewDay ? 1 : (usage?.usage_count || 0) + 1
      
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
    }

    return new Response(
      JSON.stringify({ 
        analysis,
        usage: {
          remaining: isWhitelisted ? 999 : Math.max(0, dailyLimit - (isNewDay ? 1 : (usage?.usage_count || 0) + 1)),
          limit: dailyLimit,
          whitelisted: isWhitelisted
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})