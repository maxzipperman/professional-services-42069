import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface CreatePaymentRequest {
  amount?: number; // in cents
  title?: string;
  metadata?: Record<string, unknown>;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAnon = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY") || "";
    if (!stripeKey || !stripeKey.startsWith("sk_")) {
      throw new Error(
        "Stripe secret key missing or invalid. Please set STRIPE_SECRET_KEY (starts with 'sk_') in Supabase Edge Function secrets."
      );
    }
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    const body = (await req.json().catch(() => ({}))) as CreatePaymentRequest;
    const amount = typeof body.amount === "number" ? body.amount : 49900; // $499.00 default
    const title = body.title || "Website Conversion Audit";

    // Try to get authenticated user (if any)
    let user: { id: string; email?: string } | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseAnon.auth.getUser(token);
      if (data?.user) {
        user = { id: data.user.id, email: data.user.email ?? undefined };
      }
    }

    // Derive origin for redirects
    let origin = req.headers.get("origin") || "";
    if (!origin) {
      const referer = req.headers.get("referer");
      try {
        if (referer) origin = new URL(referer).origin;
      } catch (_) {}
    }
    if (!origin) origin = "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: title },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/payment-success`,
      cancel_url: `${origin}/payment-canceled`,
      metadata: body.metadata || {},
    });

    // Best-effort: record order as pending
    try {
      const supabaseService = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );
      await supabaseService.from("orders").insert({
        user_id: user?.id ?? null,
        email: user?.email ?? null,
        amount,
        status: "pending",
        stripe_session_id: session.id,
        metadata: body.metadata || null,
      });
    } catch (e) {
      console.error("orders insert error (non-fatal):", e);
    }

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("create-payment error:", error);
    return new Response(JSON.stringify({ error: error.message || "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
