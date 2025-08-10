import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface SendGuideRequest {
  email: string;
  title?: string;
  fileName?: string;
  downloadUrl?: string;
  attachmentUrl?: string;
  industry?: string;
  page?: string;
}

const resend = new Resend(Deno.env.get("RESEND_API_KEY") || "");

const isValidEmail = (email: string) => /.+@.+\..+/.test(email);

const BASE_SITE_URL = Deno.env.get("CANONICAL_BASE_URL") || "https://www.clearlinestudio.com";

function toAbsoluteUrl(url?: string): string | undefined {
  try {
    if (!url) return undefined;
    const u = new URL(url, BASE_SITE_URL);
    return u.toString();
  } catch {
    return undefined;
  }
}

async function createFallbackPdf(params: {
  title?: string;
  pageUrl?: string;
  downloadUrl?: string;
  industry?: string;
  fileName?: string;
}): Promise<{ filename: string; content: string }> {
  const { title, pageUrl, downloadUrl, industry, fileName } = params;
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]); // Letter size
  const { width, height } = page.getSize();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const drawText = (text: string, x: number, y: number, size = 12, bold = false) => {
    page.drawText(text, {
      x,
      y,
      size,
      font: bold ? fontBold : font,
      color: rgb(0, 0, 0),
    });
  };

  let cursorY = height - 72;
  drawText("Your guide is ready", 72, cursorY, 22, true);
  cursorY -= 28;

  if (title) {
    drawText(title, 72, cursorY, 16, true);
    cursorY -= 24;
  }

  if (industry) {
    drawText(`Industry: ${industry}`, 72, cursorY, 12, false);
    cursorY -= 18;
  }

  if (pageUrl) {
    drawText("Page:", 72, cursorY, 12, true);
    cursorY -= 16;
    drawText(pageUrl, 72, cursorY, 12);
    cursorY -= 22;
  }

  if (downloadUrl) {
    drawText("Download:", 72, cursorY, 12, true);
    cursorY -= 16;
    drawText(downloadUrl, 72, cursorY, 12);
    cursorY -= 22;
  }

  drawText("— Clearline Studio", 72, 72, 12, false);

  const pdfBytes = await doc.save();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));
  const filename = fileName || (title ? `${title}.pdf` : "guide.pdf");
  return { filename, content: base64 };
}
async function tryFetchAttachment(url?: string): Promise<{ filename: string; content: string } | null> {
  try {
    if (!url) return null;
    const u = new URL(url);
    // Only fetch if it's a direct file and likely a PDF
    const isPdf = u.pathname.endsWith(".pdf");
    if (!isPdf) return null;

    const resp = await fetch(url);
    if (!resp.ok) return null;
    const arrBuf = await resp.arrayBuffer();
    // Rough 7MB limit to be safe
    if (arrBuf.byteLength > 7 * 1024 * 1024) return null;
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrBuf)));
    const filename = u.pathname.split("/").pop() || "guide.pdf";
    return { filename, content: base64 };
  } catch {
    return null;
  }
}

// Library of substantive guide content we can render to a branded PDF
const GUIDES_LIBRARY: Record<string, { industry: string; title: string; subtitle: string; bullets: string[] }> = {
  "lawyers": {
    industry: "Lawyers",
    title: "5 Quick Wins for Law Firm Websites",
    subtitle: "Boost credibility, speed, and conversions in under a week.",
    bullets: [
      "Add visible trust signals: bar admissions, practice areas, and disclaimers on the homepage.",
      "Target <1.5s LCP: compress hero images (AVIF/WebP) and preload key fonts.",
      "Create focused practice-area pages with clear FAQs and a single primary CTA.",
      "Streamline intake: reduce form fields, add Calendly option, and show response times.",
      "Implement LocalBusiness + Service schema for richer search results."
    ]
  },
  "accountants": {
    industry: "Accountants",
    title: "CPA Website Quick Wins Checklist",
    subtitle: "Trust-first upgrades that reduce price shopping and increase inquiries.",
    bullets: [
      "Clarify services (tax, bookkeeping, advisory) with outcomes and ideal client fit.",
      "Surface a client portal/login callout with secure messaging expectations.",
      "Pre-qualify inquiries with a short intake form and optional booking link.",
      "Publish 2–3 service pages with local keywords and clear fees/starting points.",
      "Hit Core Web Vitals on mobile by optimizing images and third-party scripts."
    ]
  },
  "consultants": {
    industry: "Consultants",
    title: "Consulting Site Quick Wins",
    subtitle: "Message-market fit and proof patterns that win bigger deals.",
    bullets: [
      "Lead with an offer ladder and a single CTA per page (diagnostic, audit, or call).",
      "Add 2 case studies with problem → approach → measurable outcome.",
      "Build a simple lead magnet that tees up your core engagement.",
      "Publish a POV article that addresses a buyer pain with an actionable framework.",
      "Reduce layout noise; prioritize speed and scannability for executive readers."
    ]
  },
  "nonprofits": {
    industry: "Nonprofits",
    title: "Nonprofit Donation Flow Quick Wins",
    subtitle: "Small changes that meaningfully increase giving and volunteer signups.",
    bullets: [
      "Enable 2-click donate with Apple/Google Pay and recurring options.",
      "Add an impact strip: metrics, outcomes, and stories tied to donations.",
      "Meet WCAG 2.1 basics: contrast, focus states, and accessible labels.",
      "Sync CRM and email lists; confirm tracking is privacy-safe and accurate.",
      "Create campaign pages with a clear goal, progress, and social proof."
    ]
  },
  "creatives": {
    industry: "Creatives",
    title: "Creative Portfolio Quick Wins",
    subtitle: "Show your best work faster — without heavy templates.",
    bullets: [
      "Use lazy-loaded, compressed media; replace heavy embeds with thumbnails.",
      "Structure project pages with a narrative: brief, role, process, result.",
      "Add an inquiry form with budget ranges and timeline to qualify leads.",
      "Feature 3–5 marquee projects; remove anything that dilutes your brand.",
      "Implement basic SEO for your niche + location and link your socials smartly."
    ]
  },
  "local businesses": {
    industry: "Local Businesses",
    title: "Local Business Website Quick Wins",
    subtitle: "Turn local searches into calls, directions, and visits.",
    bullets: [
      "Place tap-to-call and directions above the fold on mobile.",
      "Keep hours synced; add holiday closures and live status.",
      "Showcase 5-star reviews and prompt for new ones after visits.",
      "Make services or menu reachable in 2 clicks; avoid PDF menus.",
      "Add LocalBusiness schema and ensure NAP consistency everywhere."
    ]
  },
  "professional services": {
    industry: "Professional Services",
    title: "Professional Services Website Quick Wins",
    subtitle: "Trust-first fixes that convert research into consultations.",
    bullets: [
      "Add a homepage trust block: badges, affiliations, and client logos.",
      "Create an intake CTA map (book a call, request a Loom review, or email).",
      "Collect and showcase testimonials with specific outcomes.",
      "Hit Core Web Vitals on mobile; reduce JS and optimize fonts/images.",
      "Structure service pages with who-it’s-for, outcomes, and next steps."
    ]
  }
};

async function createGuidePdfFromLibrary(params: {
  industry?: string;
  title?: string;
  subtitle?: string;
  bullets?: string[];
  fileName?: string;
}): Promise<{ filename: string; content: string }> {
  // Determine library entry by industry
  const key = (params.industry || "").toLowerCase();
  const lib = GUIDES_LIBRARY[key];

  const title = params.title || lib?.title || "Your Guide";
  const subtitle = params.subtitle || lib?.subtitle || "Actionable recommendations";
  const bullets = (params.bullets && params.bullets.length > 0) ? params.bullets : (lib?.bullets || []);

  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]);
  const { width, height } = page.getSize();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  let y = height - 72;
  page.drawText("Clearline Studio", { x: 72, y, size: 12, font: fontBold });
  y -= 24;
  page.drawText(title, { x: 72, y, size: 22, font: fontBold });
  y -= 22;
  if (subtitle) {
    page.drawText(subtitle, { x: 72, y, size: 12, font });
    y -= 22;
  }
  if (params.industry) {
    page.drawText(`Industry: ${params.industry}`, { x: 72, y, size: 12, font });
    y -= 18;
  }
  y -= 6;
  if (bullets.length) {
    page.drawText("Checklist:", { x: 72, y, size: 14, font: fontBold });
    y -= 18;
    let index = 1;
    for (const item of bullets) {
      const lines = wrapText(item, 468, font, 12);
      page.drawText(`${index}.`, { x: 72, y, size: 12, font });
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], { x: 92, y, size: 12, font });
        y -= 16;
        if (y < 72) {
          // new page
          const p = doc.addPage([612, 792]);
          y = p.getSize().height - 72;
          // Header on new page
          p.drawText(title, { x: 72, y, size: 14, font: fontBold });
          y -= 24;
        }
      }
      y -= 6;
      index++;
    }
  }

  // Footer
  page.drawText("— Clearline Studio", { x: 72, y: 60, size: 12, font });

  const pdfBytes = await doc.save();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));
  const filename = params.fileName || `${title}.pdf`;
  return { filename, content: base64 };
}

// Basic text wrapper for pdf-lib
function wrapText(text: string, maxWidth: number, font: any, size: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    const test = current ? current + " " + w : w;
    const width = font.widthOfTextAtSize(test, size);
    if (width > maxWidth) {
      if (current) lines.push(current);
      current = w;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, title, fileName, downloadUrl, attachmentUrl, industry, page }: SendGuideRequest = await req.json();

    if (!email || !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Valid email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const from = "Clearline Studio <onboarding@resend.dev>"; // Replace with verified domain when ready
    const subject = `Your guide${title ? ": " + title : ""}`;

    const absolutePageUrl = toAbsoluteUrl(page);
    const absoluteDownloadUrl = toAbsoluteUrl(downloadUrl);
    const absoluteAttachmentUrl = toAbsoluteUrl(attachmentUrl);

    // 1) Try to fetch a real PDF if provided
    const fetchedAttachment =
      (await tryFetchAttachment(absoluteAttachmentUrl)) ||
      (await tryFetchAttachment(absoluteDownloadUrl));

    // 2) Otherwise, create a substantive PDF from our library if we recognize the industry
    let attachment = fetchedAttachment;
    if (!attachment) {
      const key = (industry || "").toLowerCase();
      if (GUIDES_LIBRARY[key]) {
        attachment = await createGuidePdfFromLibrary({
          industry,
          title,
          fileName: fileName || `${GUIDES_LIBRARY[key].title}.pdf`,
        });
      }
    }

    // 3) Finally, fallback to simple confirmation PDF
    if (!attachment) {
      attachment = await createFallbackPdf({
        title,
        pageUrl: absolutePageUrl,
        downloadUrl: absoluteDownloadUrl,
        industry,
        fileName,
      });
    }

    const html = `
      <h1 style="margin:0 0 12px 0; font-size:20px;">Your guide is ready</h1>
      <p style="margin:0 0 10px 0;">Hi,</p>
      <p style="margin:0 0 10px 0;">Thanks for your interest in our resources. ${title ? `Here is <strong>${title}</strong>.` : "Here is your requested guide."}</p>
      ${absolutePageUrl ? `<p style="margin:0 0 10px 0;">View the full page: <a href="${absolutePageUrl}">${absolutePageUrl}</a></p>` : ""}
      ${absoluteDownloadUrl ? `<p style=\"margin:0 0 10px 0;\">Direct link: <a href=\"${absoluteDownloadUrl}\">${absoluteDownloadUrl}</a></p>` : ""}
      ${attachment?.filename ? `<p style=\"margin:0 0 10px 0;\">Attached: ${attachment.filename}</p>` : ""}
      ${industry ? `<p style="margin:0 0 10px 0; color:#666;">Industry: ${industry}</p>` : ""}
      ${absolutePageUrl ? `<p style=\"margin:0 0 10px 0; color:#666;\">Requested from: ${absolutePageUrl}</p>` : ""}
      <p style="margin:16px 0 0 0;">— Clearline Studio</p>
    `;

    const bcc = Deno.env.get("LEADS_NOTIFY_EMAIL") || undefined;

    const emailResp = await resend.emails.send({
      from,
      to: [email],
      ...(bcc ? { bcc: [bcc] } : {}),
      subject,
      html,
      attachments: attachment ? [{ filename: attachment.filename, content: attachment.content }] : undefined,
    });

    return new Response(JSON.stringify({ ok: true, id: emailResp.data?.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("send-guide error:", e);
    return new Response(JSON.stringify({ error: e?.message || "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
