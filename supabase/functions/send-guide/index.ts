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

    const from = "Clearline Studio <onboarding@resend.dev>"; // You can change this to a verified domain
    const subject = `Your guide${title ? ": " + title : ""}`;

    const absolutePageUrl = toAbsoluteUrl(page);
    const absoluteDownloadUrl = toAbsoluteUrl(downloadUrl);
    const absoluteAttachmentUrl = toAbsoluteUrl(attachmentUrl);

    const fetchedAttachment =
      (await tryFetchAttachment(absoluteAttachmentUrl)) ||
      (await tryFetchAttachment(absoluteDownloadUrl));

    const attachment = fetchedAttachment || (await createFallbackPdf({
      title,
      pageUrl: absolutePageUrl,
      downloadUrl: absoluteDownloadUrl,
      industry,
      fileName,
    }));

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
