import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { Sparkles, UserCheck, ArrowRight, Zap, Shield, Target } from "lucide-react";

export const AIFeatureSection = () => {
  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              AI-Powered Website Analysis
            </div>
            <h2 className="text-3xl font-bold mb-4">Get Instant Professional Feedback</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Before investing in a new website, see exactly what needs improvement with our AI-powered analysis tool.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* AI Analysis Card */}
            <Card className="hover-lift transition-smooth border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Free AI Website Analysis</h3>
                    <p className="text-sm text-muted-foreground">Professional insights in minutes</p>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Performance & conversion optimization review
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Industry-specific best practice analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Actionable priority recommendations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Mobile & accessibility assessment
                  </li>
                </ul>
                
                <Button asChild className="w-full" variant="outline">
                  <Link to="/ai-feedback" className="inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Analyze My Website
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Expert Audit Card */}
            <Card className="hover-lift transition-smooth border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/20">
                    <UserCheck className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Expert Human Audit</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive professional review</p>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    Detailed competitive analysis & strategy
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    Custom roadmap for your business goals
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    Direct consultation with our founder
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    Implementation timeline & budget
                  </li>
                </ul>
                
                <Button asChild className="w-full gradient-accent text-accent-foreground">
                  <Link to="/contact?utm_source=ai-feature&utm_medium=expert-audit&utm_campaign=services-page" className="inline-flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    Schedule Expert Audit
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold">Instant Results</h4>
              <p className="text-sm text-muted-foreground">
                Get your analysis in under 2 minutes
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold">Privacy Protected</h4>
              <p className="text-sm text-muted-foreground">
                Your data stays secure and private
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold">Actionable Insights</h4>
              <p className="text-sm text-muted-foreground">
                Specific steps to improve performance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};