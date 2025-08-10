import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Bot, UserCheck, ArrowRight, CheckCircle, AlertCircle, Clock, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase, isSupabaseConnected } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export const AIFeedbackPage = () => {
  const [searchParams] = useSearchParams();
  const [industry, setIndustry] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [focusArea, setFocusArea] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string>("");
  const [usage, setUsage] = useState<{ remaining: number; limit: number; whitelisted: boolean } | null>(null);
  const [email, setEmail] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const industryParam = searchParams.get("industry");
    if (industryParam) {
      setIndustry(industryParam);
    }
  }, [searchParams]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!websiteUrl) {
      toast({
        title: "Website URL Required",
        description: "Please enter your website URL to analyze.",
        variant: "destructive",
      });
      return;
    }
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to receive the analysis.",
        variant: "destructive",
      });
      return;
    }

    // Check if Supabase is connected
    if (!isSupabaseConnected()) {
      toast({
        title: "Backend Not Ready",
        description: "The AI analysis backend is not connected yet. Please ensure Supabase is properly connected.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAnalysis("");

    try {
      const { data, error } = await supabase!.functions.invoke('ai-feedback', {
        body: {
          website_url: websiteUrl,
          focus_area: focusArea,
          industry: industry,
          email: email,
        }
      });

      if (error) {
        if (error.message?.includes('Rate limit exceeded')) {
          const errorData = JSON.parse(error.message);
          toast({
            title: "Daily Limit Reached",
            description: `You've used all ${errorData.limit} free analyses today. Try again tomorrow or contact us for more.`,
            variant: "destructive",
          });
          return;
        }
        throw error;
      }
      
      setAnalysis(data.analysis);
      setUsage(data.usage);
      
      toast({
        title: "Analysis Complete",
        description: "Your website analysis is ready!",
      });
    } catch (error) {
      console.error("Error getting AI feedback:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                  <Sparkles className="h-4 w-4" />
                  Professional AI Website Analysis
                  {usage && !usage.whitelisted && (
                    <Badge variant="secondary" className="ml-2">
                      {usage.remaining} analyses remaining today
                    </Badge>
                  )}
                </div>
                {industry && (
                  <Badge variant="outline" className="mb-4">
                    Optimized for {industry}
                  </Badge>
                )}
                <h1 className="text-4xl font-bold mb-4">Get Expert-Level Website Feedback</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Receive instant, comprehensive analysis of your website's performance, user experience, and conversion potential - powered by advanced AI.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Analysis Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        Website Analysis
                        {industry && (
                          <span className="text-sm font-normal text-muted-foreground">
                            for {industry}
                          </span>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                          <label htmlFor="url" className="block text-sm font-medium mb-2">
                            Website URL <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="url"
                            type="url"
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            placeholder="https://yourwebsite.com"
                            required
                            className="text-base"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Your Email <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                            className="text-base"
                          />
                        </div>

                        <div>
                          <label htmlFor="focus" className="block text-sm font-medium mb-2">
                            What would you like us to focus on? (Optional)
                          </label>
                          <Textarea
                            id="focus"
                            value={focusArea}
                            onChange={(e) => setFocusArea(e.target.value)}
                            placeholder="e.g., conversion optimization, mobile experience, user flow, accessibility..."
                            className="min-h-[100px]"
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full" 
                          size="lg"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Bot className="h-4 w-4 mr-2 animate-spin" />
                              Analyzing Website...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4 mr-2" />
                              Analyze My Website
                            </>
                          )}
                        </Button>
                      </form>

                      {analysis && (
                        <div className="mt-8">
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            Analysis Results
                          </h3>
                          <ScrollArea className="h-[500px] rounded-md border p-4">
                            <div className="prose prose-sm max-w-none">
                              {analysis.split('\n').map((line, index) => (
                                <p key={index} className="mb-2 whitespace-pre-wrap">
                                  {line}
                                </p>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">What's Included:</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Industry-Specific Analysis</strong>
                            <p className="text-sm text-muted-foreground">
                              Tailored insights for your industry's best practices and compliance requirements
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Performance Review</strong>
                            <p className="text-sm text-muted-foreground">
                              Assessment of site speed, mobile responsiveness, and user experience
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Conversion Optimization</strong>
                            <p className="text-sm text-muted-foreground">
                              Actionable recommendations to improve lead generation and sales
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Accessibility & SEO</strong>
                            <p className="text-sm text-muted-foreground">
                              Technical review for search visibility and inclusive design
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Priority Action Items</strong>
                            <p className="text-sm text-muted-foreground">
                              Clear roadmap with immediate wins and long-term improvements
                            </p>
                          </div>
                        </li>
                      </ul>

                      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Usage Limits</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Free users get 3 analyses per day. Need more? 
                          <Button variant="link" size="sm" className="px-1 h-auto">
                            Contact us for unlimited access
                          </Button>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Expert Audit CTA */}
                  <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <UserCheck className="h-5 w-5 text-accent" />
                        Want a Human Expert Audit?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get a comprehensive audit from our founder with competitive analysis, custom strategy, and implementation roadmap.
                      </p>
                      <Button asChild className="w-full gradient-accent text-accent-foreground">
                        <Link to="/contact?utm_source=ai-feedback&utm_medium=expert-audit&utm_campaign=upgrade-cta" className="inline-flex items-center gap-2">
                          <UserCheck className="h-4 w-4" />
                          Schedule Expert Audit
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
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
};