import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error("Missing Supabase env");
    return new Response(JSON.stringify({ error: "Server not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const {
      fileName,
      contentType,
      bucket = "customer-uploads",
      folder = "",
      maxSizeMB = 10,
      allow = ["image/", "application/pdf"],
    } = body || {};

    if (!fileName || !contentType) {
      return new Response(JSON.stringify({ error: "fileName and contentType required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Basic content-type allowlist
    const allowed = Array.isArray(allow) && allow.length ? allow : ["image/", "application/pdf"];
    if (!allowed.some((prefix: string) => contentType.startsWith(prefix))) {
      return new Response(JSON.stringify({ error: "File type not allowed" }), {
        status: 415,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Ensure bucket exists (idempotent)
    const { data: existingBucket } = await supabase.storage.getBucket(bucket);
    if (!existingBucket) {
      console.log(`[sign-upload] Creating bucket: ${bucket}`);
      const { error: createErr } = await supabase.storage.createBucket(bucket, { public: true });
      if (createErr) {
        console.error("Bucket create error", createErr);
        return new Response(JSON.stringify({ error: "Failed to ensure bucket" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Build object path: yyyy/mm/random-fileName
    const now = new Date();
    const yyyy = now.getUTCFullYear();
    const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
    const rand = crypto.randomUUID();
    const safeName = String(fileName).replace(/[^a-zA-Z0-9._-]/g, "-");
    const prefix = folder ? `${folder.replace(/\/$/, "")}/` : "";
    const objectPath = `${prefix}${yyyy}/${mm}/${rand}-${safeName}`;

    // Create signed upload URL (60s)
    const { data: signed, error: signErr } = await supabase.storage.createSignedUploadUrl(
      bucket,
      objectPath
    );

    if (signErr || !signed) {
      console.error("Sign error", signErr);
      return new Response(JSON.stringify({ error: "Failed to create signed upload" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Return token and path so client can call uploadToSignedUrl
    const payload = {
      bucket,
      path: objectPath,
      token: signed.token,
      expiresIn: 60,
      maxSizeMB,
      contentType,
      publicUrl: `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${objectPath}`,
    };

    console.log("[sign-upload] payload:", payload);

    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("[sign-upload] error", err);
    return new Response(JSON.stringify({ error: err?.message || "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
