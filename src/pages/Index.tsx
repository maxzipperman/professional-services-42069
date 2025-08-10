import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, Globe, Shield, Target, Zap, Award, BookOpen, DollarSign, Video, BarChart3 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const trustLogos = [
    "AICPA Member",
    "American Bar Association", 
    "Forbes",
    "Inc.",
    "Chamber of Commerce"
  ];

  const valuePillars = [
    {
      title: "Niche-Specific Authority",
      description: "We demonstrate a deep, insider-level understanding of your industry, from compliance standards to client expectations, reducing your risk and cognitive load.",
      icon: <Target className="h-6 w-6 text-accent" />
    },
    {
      title: "Quantifiable Trust Signals",
      description: "We move beyond generic testimonials to showcase data-backed case studies, authoritative endorsements, and clear proof of your success to build unshakeable trust.",
      icon: <BarChart3 className="h-6 w-6 text-accent" />
    },
    {
      title: "Frictionless Client Journey",
      description: "We design an intuitive, streamlined digital experience that guides visitors toward a specific, profitable action, making it effortless for them to engage your firm.",
      icon: <Zap className="h-6 w-6 text-accent" />
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Websites for Professionals Who Trade on Credibility | Position Digital</title>
        <meta name="description" content="We build polished, high-performance digital platforms that close the trust gap, showcase your expertise, and convert discerning visitors into high-value clients." />
        <link rel="canonical" href="/" />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-24 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">Professional Digital Presence</Badge>
            <h1 className="mb-6 text-primary">
              Websites for Professionals Who Trade on Credibility
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We build polished, high-performance digital platforms that close the trust gap, 
              showcase your expertise, and convert discerning visitors into high-value clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="gradient-accent text-accent-foreground font-semibold px-8">
                <Link to="/contact" className="flex items-center space-x-2">
                  <span>Schedule a Confidential Consultation</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/20">
                <Link to="/portfolio">View Case Studies</Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">Secure & Professional</h3>
                <p className="text-sm text-muted-foreground">Enterprise-grade security and compliance standards</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">Industry Authority</h3>
                <p className="text-sm text-muted-foreground">Deep expertise in professional services</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">Measurable ROI</h3>
                <p className="text-sm text-muted-foreground">Proven results that impact your bottom line</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Featured In & Trusted By</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {trustLogos.map((logo, index) => (
                <div key={index} className="text-sm font-medium text-muted-foreground px-4 py-2 border border-border rounded-md">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-primary">Your Website Should Be Your Most Powerful Asset, Not a Liability</h2>
            <p className="text-lg text-muted-foreground mb-8">
              For a sophisticated client, a website is not a line-item expense but a critical, revenue-generating asset. 
              Yet, many professionals are held back by generic, outdated sites that fail to convey their true expertise, 
              creating a "trust gap" with potential clients.
            </p>
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-8">
              <p className="text-lg font-medium text-primary">
                We solve this by engineering every design element as a business decision with financial implications, 
                turning your digital presence into a predictable engine for growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="py-16 lg:py-24 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-6 text-primary">Our Strategic Approach</h2>
            <p className="text-lg text-muted-foreground">
              We don't just build websites — we architect digital platforms that systematically build trust and convert prospects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {valuePillars.map((pillar, index) => (
              <Card key={index} className="hover-lift shadow-soft text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {pillar.icon}
                  </div>
                  <CardTitle className="text-xl">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {pillar.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Highlight */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">Case Study</Badge>
                <h2 className="mb-6 text-primary">How a Boutique Law Firm Increased Qualified Inquiries by 75%</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                      <Target className="h-5 w-5 text-accent mr-2" />
                      Challenge
                    </h3>
                    <p className="text-muted-foreground">
                      A 12-partner employment law firm was losing potential clients to larger competitors due to an outdated website that failed to convey their specialized expertise.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                      <Zap className="h-5 w-5 text-accent mr-2" />
                      Solution
                    </h3>
                    <p className="text-muted-foreground">
                      We rebuilt their digital presence with industry-specific case studies, detailed attorney profiles, and a streamlined consultation booking system.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                      <BarChart3 className="h-5 w-5 text-success mr-2" />
                      Result
                    </h3>
                    <p className="text-muted-foreground">
                      75% increase in qualified inquiries within 6 months, with average case value increasing by 40%.
                    </p>
                  </div>
                </div>
                
                <Button asChild variant="outline" className="mt-8">
                  <Link to="/portfolio" className="flex items-center space-x-2">
                    <span>Read the Full Case Study</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 shadow-large">
                  <div className="bg-white rounded-lg shadow-medium p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent rounded-full"></div>
                      <div className="font-semibold">Employment Law Specialists</div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="bg-accent text-accent-foreground px-4 py-2 rounded text-sm">
                        Schedule Consultation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Testimonial */}
      <section className="py-16 lg:py-24 gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Star className="h-8 w-8 text-accent mx-auto mb-4" />
              <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
                "Position Digital understands that for a law firm, a website is a critical validation tool. 
                Their ROI-driven framework is a fundamental departure from the commoditized view of a website as a digital brochure. 
                Our initial investment paid for itself within months."
              </blockquote>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <div className="font-semibold text-lg">Michael T. Richardson</div>
                <div className="text-primary-foreground/80">Managing Partner, Richardson & Associates LLC</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Focus */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-6 text-primary">Specialized Expertise for Professional Services</h2>
            <p className="text-lg text-muted-foreground">
              We understand the unique challenges and opportunities in professional services. 
              Our industry-specific approach ensures your website speaks directly to your target clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Lawyers",
                description: "Build credibility, showcase expertise, attract high-value cases",
                href: "/lawyers",
                icon: <BookOpen className="h-8 w-8 text-accent" />
              },
              {
                title: "Accountants", 
                description: "Demonstrate trust, highlight credentials, grow your practice",
                href: "/accountants",
                icon: <BarChart3 className="h-8 w-8 text-accent" />
              },
              {
                title: "Consultants",
                description: "Establish authority, prove ROI, convert prospects to clients",
                href: "/consultants",
                icon: <Target className="h-8 w-8 text-accent" />
              }
            ].map((industry, index) => (
              <Card key={index} className="hover-lift shadow-soft group cursor-pointer text-center">
                <Link to={industry.href} className="block p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-smooth">
                    {industry.icon}
                  </div>
                  <h3 className="font-semibold text-xl mb-3 group-hover:text-accent transition-smooth">
                    {industry.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {industry.description}
                  </p>
                  <ArrowRight className="h-5 w-5 text-accent mx-auto opacity-0 group-hover:opacity-100 transition-smooth" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 gradient-accent text-accent-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">Ready to Transform Your Digital Presence into a Revenue-Generating Asset?</h2>
            <p className="text-lg text-accent-foreground/90 mb-8">
              Let's discuss how a strategic website investment can enhance your credibility, 
              attract premium clients, and provide a significant competitive advantage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                variant="secondary"
                className="hover-lift font-semibold bg-white text-primary hover:bg-white/90"
              >
                <Link to="/contact" className="flex items-center space-x-2">
                  <span>Book Your Strategic Roadmap Call</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Link to="/portfolio">View Our Authority Sites</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
