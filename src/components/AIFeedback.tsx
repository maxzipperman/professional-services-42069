import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { Sparkles } from "lucide-react";
import { callLLM, type Provider } from "@/utils/aiProviders";

const KEY_STORAGE = {
  perplexity: "AI_KEY_perplexity",
  openai: "AI_KEY_openai",
  anthropic: "AI_KEY_anthropic",
} as const;

type ProviderOption = {
  id: Provider;
  label: string;
  defaultModel: string;
};

const PROVIDERS: ProviderOption[] = [
  { id: "perplexity", label: "Perplexity (recommended)", defaultModel: "llama-3.1-sonar-small-128k-online" },
  { id: "openai", label: "OpenAI", defaultModel: "gpt-4o-mini" },
  { id: "anthropic", label: "Anthropic", defaultModel: "claude-3-5-sonnet-20241022" },
];

function getBodyText(): string {
  try {
    const text = document.body?.innerText || "";
    return text.replace(/\s+/g, " ").trim().slice(0, 8000);
  } catch {
    return "";
  }
}

export default function AIFeedback() {
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState<Provider>("perplexity");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState(PROVIDERS[0].defaultModel);
  const [includePage, setIncludePage] = useState(true);
  const [prompt, setPrompt] = useState("Analyze this website against industry best practices. Return: 1) a markdown checklist with pass/needs-work for key areas, 2) category scores and an overall score out of 100 with rationale, 3) five prioritized improvements, and 4) five ideas to discuss with Max.");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    const key = localStorage.getItem(KEY_STORAGE[provider]);
    if (key) setApiKey(key);
    const def = PROVIDERS.find(p => p.id === provider)?.defaultModel || "";
    setModel(def);
  }, [provider]);

  const composedMessage = useMemo(() => {
    const page = includePage ? `\n\nPage content (truncated):\n${getBodyText()}` : "";
    return `${prompt}${page}`;
  }, [prompt, includePage]);

  const onSubmit = async () => {
    if (!apiKey) {
      toast({ title: "API key required", description: "Enter your API key to send feedback." });
      return;
    }
    try {
      setLoading(true);
      localStorage.setItem(KEY_STORAGE[provider], apiKey);
      const answer = await callLLM({ provider, apiKey, model, message: composedMessage });
      setResult(answer);
      toast({ title: "AI feedback ready", description: "Scroll to see suggestions." });
    } catch (e: any) {
      toast({ title: "Request failed", description: e?.message || "Unknown error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="hidden md:inline-flex" aria-label="Open AI feedback">
          <Sparkles className="h-4 w-4" />
          <span>AI Feedback</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI Feedback Tool</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select value={provider} onValueChange={(v) => setProvider(v as Provider)}>
                <SelectTrigger id="provider"><SelectValue placeholder="Choose" /></SelectTrigger>
                <SelectContent>
                  {PROVIDERS.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="apiKey">API key</Label>
              <Input id="apiKey" type="password" placeholder="Paste your API key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" value={model} onChange={(e) => setModel(e.target.value)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} />
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <input id="include" type="checkbox" className="h-4 w-4" checked={includePage} onChange={(e) => setIncludePage(e.target.checked)} />
                <Label htmlFor="include">Include current page content (truncated)</Label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={onSubmit} disabled={loading} className="gradient-accent text-accent-foreground">
              {loading ? "Sending..." : "Get Feedback"}
            </Button>
            <Button variant="outline" onClick={() => setResult("")}>Clear</Button>
          </div>

          <div className="space-y-2">
            <Label>Response</Label>
            <ScrollArea className="h-60 border rounded-md p-3">
              <pre className="whitespace-pre-wrap text-sm text-foreground">{result || "No response yet."}</pre>
            </ScrollArea>
          </div>

          <p className="text-xs text-muted-foreground">
            Tip: For production, save API keys in Supabase Edge Function Secrets and proxy requests to avoid exposing keys and CORS issues.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
