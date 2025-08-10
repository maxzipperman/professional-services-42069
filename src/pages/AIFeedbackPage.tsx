import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { Sparkles, CheckCircle, Clock, UserCheck } from "lucide-react";
import { getIndustryPrompt } from "@/utils/industryPrompts";
import { callLLM } from "@/utils/aiProviders";
import { Link } from "react-router-dom";

export default function AIFeedbackPage() {
  const [searchParams] = useSearchParams();
  const [industry, setIndustry] = useState(searchParams.get("industry") || "");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  
  // For demo purposes, we'll use the existing client-side setup
  // In production, this would call the Supabase Edge Function
  const [apiKey] = useState(localStorage.getItem("AI_KEY_perplexity") || "");

  useEffect(() => {
    if (industry) {
      setPrompt(getIndustryPrompt(industry));
    }
  }, [industry]);

  const onSubmit = async () => {
    if (!apiKey) {
      toast({ 
        title: "Setup required", 
        description: "Please configure your API key in the original AI Feedback modal first." 
      });
      return;
    }

    try {
      setLoading(true);
      const pageContent = document.body?.innerText || "";
      const message = `${prompt}\n\nPage content (truncated):\n${pageContent.slice(0, 8000)}`;
      
      const answer = await callLLM({ 
        provider: "perplexity", 
        apiKey, 
        model: "llama-3.1-sonar-small-128k-online", 
        message 
      });
      
      setResult(answer);
      toast({ title: "Analysis complete", description: "Your website analysis is ready!" });
    } catch (e: any) {
      toast({ title: "Analysis failed", description: e?.message || "Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Professional AI Website Analysis | Clearline Studio</title>
        <meta name="description" content="Get instant, expert-level feedback on your website's performance, conversion potential, and user experience with our AI-powered analysis tool." />
        <meta name="keywords" content="website analysis, ai feedback, website audit, conversion optimization, performance analysis" />
      </Helmet>

      <Layout>
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">AI-Powered Analysis</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Professional Website Analysis
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get instant, expert-level feedback on your website's performance, conversion potential, and user experience — no setup required.
              </p>

              {industry && (
                <Badge variant="secondary" className="mb-8 text-sm px-4 py-2">
                  Optimized for {industry}
                </Badge>
              )}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Analysis Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Website Analysis Request
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="prompt">Analysis Focus</Label>
                        <Textarea 
                          id="prompt" 
                          value={prompt} 
                          onChange={(e) => setPrompt(e.target.value)} 
                          rows={6}
                          placeholder="Describe what aspects of your website you'd like analyzed..."
                        />
                        <p className="text-xs text-muted-foreground">
                          Current page content will be automatically included in the analysis.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          onClick={onSubmit} 
                          disabled={loading || !prompt.trim()} 
                          className="gradient-accent text-accent-foreground"
                        >
                          {loading ? (
                            <>
                              <Clock className="h-4 w-4 mr-2 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4 mr-2" />
                              Analyze Website
                            </>
                          )}
                        </Button>
                        <Button variant="outline" onClick={() => setResult("")}>
                          Clear Results
                        </Button>
                      </div>

                      {result && (
                        <div className="space-y-2">
                          <Label>Analysis Results</Label>
                          <ScrollArea className="h-96 border rounded-md p-4">
                            <div className="prose prose-sm max-w-none">
                              <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                                {result}
                              </pre>
                            </div>
                          </ScrollArea>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* What's Included */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">What's Included</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Performance Analysis</p>
                          <p className="text-xs text-muted-foreground">Page speed, Core Web Vitals, mobile optimization</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Conversion Optimization</p>
                          <p className="text-xs text-muted-foreground">CTA placement, user flow, trust signals</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Accessibility Review</p>
                          <p className="text-xs text-muted-foreground">WCAG compliance, usability improvements</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Industry-Specific Insights</p>
                          <p className="text-xs text-muted-foreground">Tailored recommendations for your sector</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upgrade CTA */}
                  <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <UserCheck className="h-5 w-5 text-accent" />
                        Want Expert Analysis?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get a comprehensive audit from our founder with competitive analysis, custom strategy, and implementation roadmap.
                      </p>
                      <Button asChild className="w-full gradient-accent text-accent-foreground">
                        <Link to="/contact?utm_source=ai-feedback&utm_medium=upgrade-cta&utm_campaign=expert-audit">
                          Schedule Expert Audit
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Usage Note */}
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground">
                        <strong>Note:</strong> This analysis uses AI to provide instant feedback. For production deployment, analysis would be rate-limited and processed through secure backend infrastructure.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}