import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Zap, BarChart3, Star } from 'lucide-react';

const CaseStudySection = () => (
  <section className="py-12 lg:py-16 bg-dp-panel">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-dp-panel to-[#0F172A] border border-dp-border rounded-2xl p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-dp-accent/20 text-dp-accent border-dp-accent/30">
                Case Study
              </Badge>
              <h2 className="mb-6 text-dp-text">How a Boutique Law Firm Increased Qualified Inquiries</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center text-dp-text">
                    <Target className="h-5 w-5 text-dp-accent mr-2" />
                    Challenge
                  </h3>
                  <p className="text-dp-text/70">
                    A 12-partner employment law firm was losing potential clients to larger competitors due to an outdated website that failed to convey their specialized expertise.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center text-dp-text">
                    <Zap className="h-5 w-5 text-dp-accent mr-2" />
                    Solution
                  </h3>
                  <p className="text-dp-text/70">
                    Rebuilt digital presence with industry-specific case studies, attorney profiles, and a streamlined consultation flow.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center text-dp-text">
                    <BarChart3 className="h-5 w-5 text-dp-accent mr-2" />
                    Result
                  </h3>
                  <p className="text-dp-text/70">
                    Significant lift in qualified inquiries within 6 months; higher average case value.
                  </p>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="mt-8 border-dp-accent/40 text-dp-accent hover:bg-dp-panel"
              >
                <Link to="/portfolio" data-cta="case_study_portfolio - View Our Professional Portfolio" className="flex items-center space-x-2">
                  <span>View Our Professional Portfolio</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="bg-dp-accent/10 p-8 rounded-xl">
                <div className="text-center">
                  <Star className="h-8 w-8 text-dp-accent mx-auto mb-4" />
                  <blockquote className="text-lg font-medium leading-relaxed mb-4 text-dp-text">
                    "Clearline Studio understands that for a law firm, a website is a critical validation tool.
                    Their ROI-driven framework delivered measurable results."
                  </blockquote>
                  <div className="text-sm text-dp-text/70">Michael T. Richardson, Managing Partner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CaseStudySection;

