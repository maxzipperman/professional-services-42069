import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, Globe, Shield, Target, Zap, Award, BookOpen, DollarSign, Video, BarChart3, TrendingUp, Building2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import LeadMagnet from '@/components/LeadMagnet';
import heroImage from '@/assets/clearline-hero-professional.jpg';

const Index = () => {
  const trustLogos = ["AICPA Member", "American Bar Association", "Chamber of Commerce", "Better Business Bureau"];
  
  const valuePillars = [
    {
      title: "Strategic Authority Building",
      description: "Industry-aware structure and messaging that conveys deep expertise and reduces risk.",
      icon: <Target className="h-6 w-6 text-dp-accent" />
    },
    {
      title: "Quantifiable Trust Signals", 
      description: "Data-backed case studies, endorsements, and detailed bios; proof over platitudes.",
      icon: <BarChart3 className="h-6 w-6 text-dp-accent" />
    },
    {
      title: "Conversion-Optimized Journey",
      description: "Streamlined paths to consultations, resource downloads, and qualified inquiries.",
      icon: <Zap className="h-6 w-6 text-dp-accent" />
    }
  ];

  const processSteps = [
    { phase: "01", title: "Strategic Discovery", description: "Deep-dive into your practice, competitors, and client journey" },
    { phase: "02", title: "Authority Architecture", description: "Design sophisticated information hierarchy and trust signals" },
    { phase: "03", title: "Premium Development", description: "Hand-coded, performance-optimized platform development" },
    { phase: "04", title: "Growth Optimization", description: "Analytics setup, conversion tracking, and iterative improvements" }
  ];

  const specializations = [
    {
      title: "Lawyers",
      description: "Build credibility, showcase expertise, attract high-value cases",
      href: "/lawyers",
      icon: <BookOpen className="h-8 w-8 text-dp-accent" />
    },
    {
      title: "Accountants", 
      description: "Demonstrate trust, highlight credentials, grow your practice",
      href: "/accountants",
      icon: <BarChart3 className="h-8 w-8 text-dp-accent" />
    },
    {
      title: "Consultants",
      description: "Establish authority, prove ROI, convert prospects to clients", 
      href: "/consultants",
      icon: <Target className="h-8 w-8 text-dp-accent" />
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Professional Website Design for Lawyers, Accountants & Consultants | Clearline Studio</title>
        <meta name="description" content="Premium websites that establish authority and win high-value clients. Specialized in professional services with proven ROI. Book your strategic roadmap call." />
        <link rel="canonical" href="https://www.clearlinestudio.com/" />
        <link rel="preload" as="image" href={heroImage} />
        <meta property="og:title" content="Professional Websites That Win Premium Clients | Clearline Studio" />
        <meta property="og:description" content="Sophisticated digital platforms for attorneys, accountants, and consultants. ROI-driven approach with proven results." />
        <meta property="og:image" content={heroImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization","ProfessionalService"],
            "name": "Clearline Studio",
            "url": "https://www.clearlinestudio.com",
            "description": "Professional website design and development for lawyers, accountants, and consultants",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Los Angeles",
              "addressRegion": "CA"
            },
            "serviceType": ["Website Design","Web Development","Digital Marketing"],
            "audience": {
              "@type": "Audience",
              "audienceType": "Professional Services"
            }
          })}
        </script>
      </Helmet>
      
      <div className="bg-dp-bg text-dp-text">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-dp-bg via-dp-bg to-dp-panel text-dp-text py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-r from-dp-bg/90 to-dp-bg/70" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 bg-dp-accent/20 text-dp-accent border-dp-accent/30">
                Premium Professional Digital Presence
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-dp-text">
                Professional Websites That Win Premium Clients
              </h1>
              <p className="text-xl text-dp-text/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                We build sophisticated digital platforms that establish authority, build unshakeable trust, 
                and consistently attract high-value professional services clients.
              </p>
              <p className="text-lg text-dp-text/70 mb-12 max-w-2xl mx-auto">
                For attorneys, accountants, and consultants who treat their website as a core business asset. 
                Our ROI-driven builds increase qualified inquiries and signal expertise.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Button asChild size="lg" className="inline-flex items-center justify-center bg-dp-accent text-dp-bg px-8 py-4 rounded-xl font-semibold text-lg transition-colors hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-dp-accent">
                  <Link to="/contact" data-cta="hero_primary_cta - Book Your Strategic Roadmap Call" className="inline-flex items-center justify-center space-x-2 gradient-accent text-accent-foreground px-8 py-4 rounded-xl transition-colors hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-dp-accent">
                    <span>Book Your Strategic Roadmap Call</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="inline-flex items-center justify-center border border-dp-accent/40 text-dp-accent px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dp-panel focus:outline-none focus:ring-2 focus:ring-dp-accent">
                  <Link to="/ai-feedback" data-cta="hero_secondary_cta - Run a Free AI Site Audit">Run a Free AI Site Audit</Link>
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-dp-accent/20 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-dp-accent" />
                  </div>
                  <h3 className="font-semibold text-lg text-dp-text">Secure & Professional</h3>
                  <p className="text-sm text-dp-text/70">Enterprise-grade security and compliance standards</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-dp-accent/20 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-dp-accent" />
                  </div>
                  <h3 className="font-semibold text-lg text-dp-text">Industry Authority</h3>
                  <p className="text-sm text-dp-text/70">Deep expertise in professional services</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-dp-accent/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-dp-accent" />
                  </div>
                  <h3 className="font-semibold text-lg text-dp-text">Measurable ROI</h3>
                  <p className="text-sm text-dp-text/70">Proven results that impact your bottom line</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-8 border-b border-dp-border bg-dp-panel">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-sm text-dp-text/60 mb-4">Featured In & Trusted By</p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
                {trustLogos.map((logo, index) => (
                  <div key={index} className="text-sm font-medium text-dp-text/70 px-4 py-2 border border-dp-border rounded-md">
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="py-12 lg:py-16 bg-dp-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="mb-6 text-dp-text">Our Strategic Approach</h2>
              <p className="text-lg text-dp-text/80">
                We don't just build websites — we architect digital platforms that systematically build trust and convert prospects.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {valuePillars.map((pillar, index) => (
                <Card key={index} className="bg-dp-panel border border-dp-border rounded-2xl p-8 shadow-dp-card hover:shadow-lg transition-shadow text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-dp-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      {pillar.icon}
                    </div>
                    <CardTitle className="text-xl text-dp-text">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-dp-text/70">
                      {pillar.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Case Study */}
        <section className="py-12 lg:py-16 bg-dp-panel">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-r from-dp-panel to-[#0F172A] border border-dp-border rounded-2xl p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <Badge variant="secondary" className="mb-4 bg-dp-accent/20 text-dp-accent border-dp-accent/30">Case Study</Badge>
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
                    
                    <Button asChild variant="outline" className="mt-8 border-dp-accent/40 text-dp-accent hover:bg-dp-panel">
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

        {/* Industry Specializations */}
        <section className="py-12 lg:py-16 bg-dp-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="mb-6 text-dp-text">Specialized Expertise for Professional Services</h2>
              <p className="text-lg text-dp-text/80">
                We understand the unique challenges and opportunities in professional services. 
                Our industry-specific approach ensures your website speaks directly to your target clients.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {specializations.map((industry, index) => (
                <Card key={index} className="bg-dp-panel border border-dp-border rounded-2xl shadow-dp-card hover:shadow-lg transition-shadow group cursor-pointer text-center">
                  <Link to={industry.href} data-cta={`specialization - ${industry.title}`} className="block p-8">
                    <div className="w-16 h-16 bg-dp-accent/20 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-dp-accent/30 transition-colors">
                      {industry.icon}
                    </div>
                    <h3 className="font-semibold text-xl mb-3 group-hover:text-dp-accent transition-colors text-dp-text">
                      {industry.title}
                    </h3>
                    <p className="text-dp-text/70 mb-4">
                      {industry.description}
                    </p>
                    <ArrowRight className="h-5 w-5 text-dp-accent mx-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-12 lg:py-16 bg-dp-panel">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="mb-6 text-dp-text">Our Proven Process</h2>
              <p className="text-lg text-dp-text/80">
                A systematic approach to building authority and driving conversions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-dp-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-dp-bg font-bold text-lg">{step.phase}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-dp-text">{step.title}</h3>
                  <p className="text-sm text-dp-text/70">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Magnet */}
        <section className="py-12 bg-dp-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <LeadMagnet 
                industry="professional services" 
                title="Professional Services ROI Playbook" 
                description="A comprehensive guide to measuring, improving, and communicating your website's ROI." 
                benefits={["ROI model template", "10 CRO quick wins", "Analytics setup checklist", "Executive summary one-pager"]} 
                fileName="professional-services-roi-playbook.pdf" 
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-r from-dp-panel to-[#0F172A] text-dp-text">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-6 text-dp-text">Ready to Turn Your Website Into a Revenue-Generating Asset?</h2>
              <p className="text-lg text-dp-text/80 mb-8">
                Let's discuss how a strategic website investment can enhance your credibility, 
                attract premium clients, and provide a significant competitive advantage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-dp-accent text-dp-bg px-8 py-4 rounded-xl font-semibold text-lg hover:brightness-110">
                  <Link to="/contact" data-cta="final_primary_cta - Book Your Strategic Roadmap Call" className="flex items-center space-x-2">
                    <span>Book Your Strategic Roadmap Call</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-dp-accent/40 text-dp-accent px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dp-panel">
                  <Link to="/ai-feedback" data-cta="final_secondary_cta - Run a Free AI Site Audit" className="flex items-center space-x-2">
                    <span>Run a Free AI Site Audit</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;