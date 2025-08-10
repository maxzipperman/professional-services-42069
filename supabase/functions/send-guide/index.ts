import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

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
  industry?: string;
  page?: string;
}

const resend = new Resend(Deno.env.get("RESEND_API_KEY") || "");

const isValidEmail = (email: string) => /.+@.+\..+/.test(email);

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
    const { email, title, fileName, downloadUrl, industry, page }: SendGuideRequest = await req.json();

    if (!email || !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Valid email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const from = "Clearline Studio <onboarding@resend.dev>"; // You can change this to a verified domain
    const subject = `Your guide${title ? ": " + title : ""}`;

    const attachment = await tryFetchAttachment(downloadUrl);

    const html = `
      <h1 style="margin:0 0 12px 0; font-size:20px;">Your guide is ready</h1>
      <p style="margin:0 0 10px 0;">Hi,</p>
      <p style="margin:0 0 10px 0;">Thanks for your interest in our resources. ${title ? `Here is <strong>${title}</strong>.` : "Here is your requested guide."}</p>
      ${downloadUrl ? `<p style="margin:0 0 10px 0;">You can also download it anytime with this link: <a href="${downloadUrl}">${downloadUrl}</a></p>` : ""}
      ${fileName ? `<p style="margin:0 0 10px 0;">File: ${fileName}</p>` : ""}
      ${industry ? `<p style="margin:0 0 10px 0; color:#666;">Industry: ${industry}</p>` : ""}
      ${page ? `<p style="margin:0 0 10px 0; color:#666;">Requested from: ${page}</p>` : ""}
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
