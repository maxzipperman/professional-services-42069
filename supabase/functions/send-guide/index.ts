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

// Branding configuration for PDFs and emails
const BRAND = {
  name: "Clearline Studio",
  logoPath: "/lovable-uploads/03ad2a3e-fce7-4728-9221-c7806927fdc5.png", // public asset
  primaryHex: "#2563EB", // accessible blue
  darkHex: "#0F172A",
  grayHex: "#64748B",
};

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
  const helv = await doc.embedFont(StandardFonts.Helvetica);
  const helvBold = await doc.embedFont(StandardFonts.HelveticaBold);

  // Try to load logo
  let logoPng: any | undefined;
  try {
    const logoUrl = toAbsoluteUrl(BRAND.logoPath);
    if (logoUrl) {
      const resp = await fetch(logoUrl);
      if (resp.ok) {
        const bytes = new Uint8Array(await resp.arrayBuffer());
        logoPng = await doc.embedPng(bytes);
      }
    }
  } catch {}

  const page = doc.addPage([612, 792]);
  const { width, height } = page.getSize();
  const primary = hexToRgb01(BRAND.primaryHex);
  const gray = hexToRgb01(BRAND.grayHex);
  const dark = hexToRgb01(BRAND.darkHex);

  // Header band
  page.drawRectangle({ x: 0, y: height - 80, width, height: 80, color: rgb(primary.r, primary.g, primary.b) });
  if (logoPng) {
    const scale = 100 / logoPng.width;
    const lw = logoPng.width * scale;
    const lh = logoPng.height * scale;
    page.drawImage(logoPng, { x: 72, y: height - 70, width: lw, height: lh, opacity: 0.95 });
  }

  let y = height - 120;
  page.drawText("Your guide is ready", { x: 72, y, size: 20, font: helvBold, color: rgb(dark.r, dark.g, dark.b) });
  y -= 24;
  if (title) { page.drawText(title, { x: 72, y, size: 14, font: helvBold, color: rgb(dark.r, dark.g, dark.b) }); y -= 18; }
  if (industry) { page.drawText(`Industry: ${industry}`, { x: 72, y, size: 12, font: helv, color: rgb(gray.r, gray.g, gray.b) }); y -= 16; }
  if (pageUrl) { page.drawText(`Page: ${pageUrl}`, { x: 72, y, size: 12, font: helv, color: rgb(gray.r, gray.g, gray.b) }); y -= 16; }
  if (downloadUrl) { page.drawText(`Download: ${downloadUrl}`, { x: 72, y, size: 12, font: helv, color: rgb(gray.r, gray.g, gray.b) }); y -= 16; }

  page.drawText(`© ${new Date().getFullYear()} ${BRAND.name}`, { x: 72, y: 60, size: 10, font: helv, color: rgb(gray.r, gray.g, gray.b) });

  const pdfBytes = await doc.save();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));
  const rawName = fileName || (title ? `${title}-Clearline-Studio.pdf` : "guide-Clearline-Studio.pdf");
  const filename = `${sanitizeFilename(rawName.replace(/\.pdf$/i, ""))}.pdf`;
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
    title: "10 Quick Wins for Law Firm Websites",
    subtitle: "Boost credibility, speed, and conversions in under a week.",
    bullets: [
      "Add visible trust signals above the fold: bar admissions, jurisdictions, and disclaimers.",
      "Target <1.5s LCP: serve AVIF/WebP hero, preload primary font, and remove render-blocking CSS.",
      "Create focused practice-area pages with FAQs, service scope, and one primary CTA.",
      "Streamline intake: reduce fields to essentials, show response time, and offer Calendly.",
      "Implement LocalBusiness + Service schema; validate with Rich Results Test.",
      "Use location pages for each office with embedded map, parking info, and hours.",
      "Publish 2 brief case stories with problem → approach → outcome (redact sensitive details).",
      "Add attorney bios with headshots, jurisdictions, and representative matters.",
      "Enable secure document upload and client portal access prominently.",
      "Ensure WCAG 2.1 AA basics: focus states, alt text, form labels, and color contrast."
    ]
  },
  "accountants": {
    industry: "Accountants",
    title: "CPA Website Quick Wins Checklist",
    subtitle: "Trust-first upgrades that reduce price shopping and increase inquiries.",
    bullets: [
      "Clarify services (tax, bookkeeping, advisory) with outcomes and ideal client fit.",
      "Publish 3 service pages with local keywords and transparent starting prices.",
      "Surface a secure client portal/login with messaging expectations (response time).",
      "Offer a simple intake form with required docs and optional Calendly booking.",
      "Show seasonal hours and deadlines; add a tax calendar or key dates strip.",
      "Collect 5–10 reviews; feature best quotes with client type and location.",
      "Optimize for mobile: sticky tap-to-call and directions on contact page.",
      "Speed: compress images, trim third-party scripts, and lazy-load below-the-fold.",
      "Add Organization + LocalBusiness schema and verify NAP consistency.",
      "Create a short FAQ per service to cut pre-sales friction."
    ]
  },
  "consultants": {
    industry: "Consultants",
    title: "Consulting Site Quick Wins",
    subtitle: "Message-market fit and proof patterns that win bigger deals.",
    bullets: [
      "Lead with an offer ladder and one CTA per page (diagnostic, audit, or call).",
      "Publish 2 case studies with metrics: before → after; highlight executive outcomes.",
      "Create a simple lead magnet that tees up your core engagement.",
      "Ship a POV article framing the buyer pain and your approach/framework.",
      "Use credibility blocks: logos, testimonials with roles, and media mentions.",
      "Tighten navigation; remove low-intent pages and reduce layout noise.",
      "Speed: <1.8s LCP on mobile; optimize fonts and cut unused JS.",
      "Clarify ICP; add who-it’s-for/NOT-for to qualify leads.",
      "Add FAQ around scope, timeline, and engagement model.",
      "Add calendar booking with 2–3 qualifying questions."
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
      "Optimize donation page: preset amounts, monthly default, and fee coverage toggle.",
      "Show program transparency: how funds are allocated with recent updates.",
      "Embed testimonials from beneficiaries and partners with photos.",
      "Reduce header/footer on donate page to limit exits; keep the path focused.",
      "Add volunteer interest form with time commitment and location options.",
      "Ensure analytics: conversion tracking that’s privacy-safe and accurate.",
      "Create a campaign page template with goal progress and share buttons."
    ]
  },
  "creatives": {
    industry: "Creatives",
    title: "Creative Portfolio Quick Wins",
    subtitle: "Show your best work faster — without heavy templates.",
    bullets: [
      "Use compressed media; replace heavy embeds with click-to-load thumbnails.",
      "Structure projects: brief, role, process, constraints, and result.",
      "Feature 3–5 marquee projects; archive older or off-brand work.",
      "Add an inquiry form with budget ranges, timeline, and deliverables.",
      "Add a short about: niche, approach, and how it’s different.",
      "Speed: serve next-gen images, pre-size media, and lazy-load carousels.",
      "Offer a downloadable capabilities one-pager.",
      "Add testimonials with client names and outcomes.",
      "Provide licensing/usage clarity for deliverables.",
      "Link socials smartly; keep visitors on-site for key pages."
    ]
  },
  "local businesses": {
    industry: "Local Businesses",
    title: "Local Business Website Quick Wins",
    subtitle: "Turn local searches into calls, directions, and visits.",
    bullets: [
      "Place sticky tap-to-call and directions on mobile.",
      "Keep hours synced; add holiday closures and live status.",
      "Showcase 5-star reviews; ask for new ones via post-visit SMS/email.",
      "Make services/menu reachable in 2 clicks; avoid PDF menus.",
      "Add LocalBusiness schema and keep NAP consistent across listings.",
      "Create location pages with photos, parking, and neighborhood pointers.",
      "Feature top-selling services with price cues and FAQs.",
      "Add online booking or request-a-quote with 3–4 fields.",
      "Speed: compress images and strip heavy plugins/widgets.",
      "Add a promo banner for seasonal offers with an expiry date."
    ]
  },
  "professional services": {
    industry: "Professional Services",
    title: "Professional Services Website Quick Wins",
    subtitle: "Trust-first fixes that convert research into consultations.",
    bullets: [
      "Add a trust block: certifications, affiliations, and client logos.",
      "Map CTAs: book a call, request an audit, or email — one primary per page.",
      "Collect testimonials with specific outcomes and industries.",
      "Hit Core Web Vitals; optimize fonts and third-party scripts.",
      "Structure service pages with ICP, outcomes, process, and next steps.",
      "Publish 2 proof assets: case study and a short POV article.",
      "Add pricing anchors or ranges to reduce back-and-forth.",
      "Create a lightweight lead magnet aligned to your core offer.",
      "Clarify timeline and engagement model in FAQs.",
      "Add a clean contact page with calendar and alternative channels."
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
  const key = (params.industry || "").toLowerCase();
  const lib = GUIDES_LIBRARY[key];

  const title = params.title || lib?.title || "Your Guide";
  const subtitle = params.subtitle || lib?.subtitle || "Actionable recommendations";
  const bullets = (params.bullets && params.bullets.length > 0) ? params.bullets : (lib?.bullets || []);

  const doc = await PDFDocument.create();
  const helv = await doc.embedFont(StandardFonts.Helvetica);
  const helvBold = await doc.embedFont(StandardFonts.HelveticaBold);

  // Try to load the logo
  let logoPng: any | undefined;
  try {
    const logoUrl = toAbsoluteUrl(BRAND.logoPath);
    if (logoUrl) {
      const resp = await fetch(logoUrl);
      if (resp.ok) {
        const bytes = new Uint8Array(await resp.arrayBuffer());
        logoPng = await doc.embedPng(bytes);
      }
    }
  } catch {}

  const pageSize: [number, number] = [612, 792];
  const primary = hexToRgb01(BRAND.primaryHex);
  const gray = hexToRgb01(BRAND.grayHex);
  const dark = hexToRgb01(BRAND.darkHex);

  // Cover page
  const cover = doc.addPage(pageSize);
  const { width: cw, height: ch } = cover.getSize();
  // Accent band
  cover.drawRectangle({ x: 0, y: ch - 160, width: cw, height: 160, color: rgb(primary.r, primary.g, primary.b) });
  // Logo on cover
  if (logoPng) {
    const scale = 120 / logoPng.width;
    const lw = logoPng.width * scale;
    const lh = logoPng.height * scale;
    cover.drawImage(logoPng, { x: 72, y: ch - 140, width: lw, height: lh, opacity: 0.95 });
  }
  cover.drawText(BRAND.name, { x: 72, y: ch - 180, size: 12, font: helvBold, color: rgb(1,1,1) });
  cover.drawText(title, { x: 72, y: ch - 230, size: 28, font: helvBold, color: rgb(dark.r, dark.g, dark.b) });
  if (subtitle) cover.drawText(subtitle, { x: 72, y: ch - 260, size: 14, font: helv, color: rgb(gray.r, gray.g, gray.b) });
  if (params.industry) cover.drawText(`Industry: ${params.industry}`, { x: 72, y: ch - 285, size: 12, font: helv, color: rgb(gray.r, gray.g, gray.b) });

  // Content pages
  const pages: any[] = [];
  function newContentPage() {
    const p = doc.addPage(pageSize);
    const { width, height } = p.getSize();
    // Header
    p.drawRectangle({ x: 0, y: height - 72, width, height: 1.5, color: rgb(primary.r, primary.g, primary.b) });
    if (logoPng) {
      const scale = 64 / logoPng.width;
      const lw = logoPng.width * scale;
      const lh = logoPng.height * scale;
      p.drawImage(logoPng, { x: 72, y: height - 64, width: lw, height: lh, opacity: 0.95 });
    }
    p.drawText(title, { x: 72 + (logoPng ? 76 : 0), y: height - 48, size: 14, font: helvBold, color: rgb(dark.r, dark.g, dark.b) });
    pages.push(p);
    return p;
  }

  let page = newContentPage();
  let { height } = page.getSize();
  let y = height - 96;

  if (bullets.length) {
    page.drawText("Checklist", { x: 72, y, size: 14, font: helvBold, color: rgb(dark.r, dark.g, dark.b) });
    y -= 20;
    let index = 1;
    for (const item of bullets) {
      const lines = wrapText(item, 468, helv, 12);
      // checkbox
      page.drawRectangle({ x: 72, y: y - 10, width: 10, height: 10, borderColor: rgb(primary.r, primary.g, primary.b), borderWidth: 1.2 });
      page.drawText(`${index}.`, { x: 92, y, size: 12, font: helvBold, color: rgb(dark.r, dark.g, dark.b) });
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        page.drawText(line, { x: 110, y, size: 12, font: helv, color: rgb(dark.r, dark.g, dark.b) });
        y -= 16;
        if (y < 90) {
          // footer with page number before new page
          drawFooter(page, pages.length, BRAND.name, helv, gray);
          page = newContentPage();
          ({ height } = page.getSize());
          y = height - 96;
        }
      }
      y -= 8;
      index++;
      if (y < 90) {
        drawFooter(page, pages.length, BRAND.name, helv, gray);
        page = newContentPage();
        ({ height } = page.getSize());
        y = height - 96;
      }
    }
  }

  // Footer for last page + simple footer on cover
  drawFooter(page, pages.length, BRAND.name, helv, gray);
  cover.drawText(`© ${new Date().getFullYear()} ${BRAND.name}`, { x: 72, y: 60, size: 10, font: helv, color: rgb(gray.r, gray.g, gray.b) });

  const pdfBytes = await doc.save();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));
  const rawName = params.fileName || `${title}-Clearline-Studio.pdf`;
  const filename = `${sanitizeFilename(rawName.replace(/\.pdf$/i, ""))}.pdf`;
  return { filename, content: base64 };
}

// Helpers
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

function hexToRgb01(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#','');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return { r: r / 255, g: g / 255, b: b / 255 };
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '');
}

function drawFooter(page: any, pageNumber: number, brand: string, font: any, gray: { r: number; g: number; b: number }) {
  const { width } = page.getSize();
  page.drawText(`Page ${pageNumber}`, { x: width - 120, y: 60, size: 10, font, color: rgb(gray.r, gray.g, gray.b) });
  page.drawText(brand, { x: 72, y: 60, size: 10, font, color: rgb(gray.r, gray.g, gray.b) });
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

const logoUrl = toAbsoluteUrl(BRAND.logoPath) || "";
const bookUrl = `${BASE_SITE_URL}/book`;
const previewText = title ? `${title} — your PDF is attached` : "Your guide is attached";
const html = `
  <div style="background:#f6f8fb;padding:24px 0;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="background:#ffffff;border-radius:8px;overflow:hidden;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
        <tr>
          <td style="padding:20px 24px;border-bottom:4px solid ${BRAND.primaryHex};">
            ${logoUrl ? `<img src="${logoUrl}" alt="${BRAND.name} logo" width="120" style="display:block" />` : `<div style="font-weight:600;font-size:18px;">${BRAND.name}</div>`}
          </td>
        </tr>
        <tr>
          <td style="padding:24px 24px 8px 24px;">
            <div style="font-size:20px;font-weight:700;margin-bottom:8px;">Your guide is ready</div>
            <div style="font-size:14px;line-height:1.6;">Hi,</div>
            <div style="font-size:14px;line-height:1.6;margin-top:6px;">Thanks for your interest. ${title ? `Here is <strong>${title}</strong>.` : "Here is your requested guide."} The PDF is attached for your convenience.</div>
          </td>
        </tr>
        ${(industry || title) ? `
        <tr>
          <td style="padding:0 24px 8px 24px;">
            <div style="background:#f1f5f9;border:1px solid #e5e7eb;border-radius:8px;padding:12px 14px;font-size:13px;color:#334155;">
              ${title ? `<div><strong>Guide:</strong> ${title}</div>` : ""}
              ${industry ? `<div><strong>Industry:</strong> ${industry}</div>` : ""}
              ${absolutePageUrl ? `<div><strong>Requested from:</strong> <a href="${absolutePageUrl}">${absolutePageUrl}</a></div>` : ""}
            </div>
          </td>
        </tr>` : ""}
        ${(absoluteDownloadUrl) ? `
        <tr>
          <td style="padding:0 24px 8px 24px;">
            <div style="font-size:13px;">Direct link: <a href="${absoluteDownloadUrl}">${absoluteDownloadUrl}</a></div>
          </td>
        </tr>` : ""}
        <tr>
          <td style="padding:16px 24px 24px 24px;">
            <a href="${bookUrl}" style="display:inline-block;background:${BRAND.primaryHex};color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:6px;font-weight:600;font-size:14px;">Book a strategy call</a>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 24px;border-top:1px solid #e5e7eb;color:#64748b;font-size:12px;">
            <div>— Max & Team, ${BRAND.name}</div>
            <div style="margin-top:4px;"><a href="${BASE_SITE_URL}" style="color:#64748b;text-decoration:none;">${BASE_SITE_URL.replace('https://','')}</a></div>
          </td>
        </tr>
      </table>
    </td></tr></table>
    <div style="display:none;max-height:0;overflow:hidden;">${previewText}</div>
  </div>`;

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
