import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { Sparkles, UserCheck, ArrowRight } from "lucide-react";

interface IndustryAISectionProps {
  industry: string;
}

export const IndustryAISection = ({ industry }: IndustryAISectionProps) => {
  return (
    <section className="py-14 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Get Instant Website Analysis</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how your website performs with our AI-powered analysis tool, then get expert recommendations from our team.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Feedback CTA */}
            <Card className="hover-lift transition-smooth border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">AI Website Analysis</h3>
                    <p className="text-sm text-muted-foreground">Instant, industry-specific feedback</p>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Industry-specific analysis for {industry.toLowerCase()}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Performance, conversion & accessibility review
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Actionable recommendations in minutes
                  </li>
                </ul>
                
                <Button asChild className="w-full" variant="outline">
                  <Link to={`/ai-feedback?industry=${encodeURIComponent(industry)}`} className="inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Get AI Analysis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Expert Audit CTA */}
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
                </ul>
                
                <Button asChild className="w-full gradient-accent text-accent-foreground">
                  <Link to="/contact?utm_source=industry-page&utm_medium=expert-audit&utm_campaign=ai-section" className="inline-flex items-center gap-2">
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
    </section>
  );
};