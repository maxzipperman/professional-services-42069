export type Provider = "perplexity" | "openai" | "anthropic";

export interface LLMParams {
  provider: Provider;
  apiKey: string;
  model?: string;
  message: string;
}

export async function callLLM({ provider, apiKey, model, message }: LLMParams): Promise<string> {
  try {
    if (provider === "perplexity") {
      const res = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model || "llama-3.1-sonar-small-128k-online",
          messages: [
            { role: "system", content: "Be precise and concise." },
            { role: "user", content: message },
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1000,
          frequency_penalty: 1,
          presence_penalty: 0,
        }),
      });
      if (!res.ok) throw new Error(`Perplexity error ${res.status}`);
      const data = await res.json();
      return data.choices?.[0]?.message?.content || "No content returned.";
    }

    if (provider === "openai") {
      const modelToUse = model || "gpt-4o-mini"; // browser-friendly default
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: modelToUse,
          messages: [
            { role: "system", content: "Be precise and concise." },
            { role: "user", content: message },
          ],
          temperature: 0.2,
        }),
      });
      if (!res.ok) throw new Error(`OpenAI error ${res.status}`);
      const data = await res.json();
      return data.choices?.[0]?.message?.content || "No content returned.";
    }

    if (provider === "anthropic") {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: model || "claude-3-5-sonnet-20241022",
          max_tokens: 800,
          messages: [
            { role: "user", content: message },
          ],
        }),
      });
      if (!res.ok) throw new Error(`Anthropic error ${res.status}`);
      const data = await res.json();
      const blocks = data?.content || [];
      const text = Array.isArray(blocks)
        ? blocks.map((b: any) => (typeof b === "string" ? b : b.text || "")).join("\n")
        : "";
      return text || "No content returned.";
    }

    throw new Error("Unsupported provider");
  } catch (err: any) {
    if (err?.message?.includes("NetworkError") || err?.message?.includes("CORS")) {
      throw new Error("Network/CORS error. Consider adding a Supabase Edge proxy.");
    }
    throw err;
  }
}
