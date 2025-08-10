import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LeadMagnet from '@/components/LeadMagnet';
import { Link } from 'react-router-dom';
import { Calculator, Shield, TrendingUp, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Accountants = () => {
  const caseStudy = {
    firm: "Martinez CPA Group",
    challenge: "Generic website that didn't communicate their specialized tax expertise for small businesses",
    solution: "Industry-focused website highlighting tax planning, bookkeeping, and business advisory services",
    results: [
      "300% increase in qualified business leads",
      "50% more tax planning consultations",
      "Reduced time spent explaining services",
      "Higher-value client acquisition"
    ]
  };

  const services = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Trust-Building Design",
      description: "Professional layouts that convey competence and attention to detail"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security & Compliance",
      description: "Built with financial data security and professional standards in mind"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Service Clarity",
      description: "Clear presentation of tax, audit, and advisory services"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Client Portal Ready",
      description: "Integration-ready for document sharing and client communication tools"
    }
  ];

  const testimonial = {
    quote: "Our new website has completely changed how potential clients perceive our practice. We're getting higher-quality inquiries and clients who understand the value of our advisory services, not just basic tax prep.",
    author: "Carlos Martinez",
    role: "CPA, Martinez CPA Group"
  };

  return (
    <Layout>
      <Helmet>
        <title>Website Design for Accounting Firms | Position Digital</title>
        <meta name="description" content="Professional website design for CPAs and accounting firms. Build trust, showcase expertise, and attract higher-value clients with a modern accounting website." />
        <meta name="keywords" content="accounting website design, CPA website, accounting firm marketing, tax professional website, bookkeeping website" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Calculator className="h-4 w-4 mr-2" />
              For Accounting Firms
            </Badge>
            <h1 className="mb-6">
              Professional Websites for 
              <span className="text-accent"> Accounting Practices</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Establish credibility, showcase your expertise, and attract higher-value clients with a website that reflects your professional standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="gradient-accent text-accent-foreground font-semibold hover-lift"
              >
                <Link to="/contact" className="flex items-center space-x-2">
                  <span>Book Your 20-Min Discovery Call</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/portfolio">View CPA Websites</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-6">Why Your Accounting Website is Critical</h2>
            <p className="text-lg text-muted-foreground">
              Financial decisions require trust. Your website is where potential clients evaluate your credibility and expertise before reaching out.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              "84% of people research accountants online first",
              "Professional design increases perceived expertise by 75%", 
              "Clear service descriptions reduce consultation time by 40%"
            ].map((stat, index) => (
              <Card key={index} className="text-center shadow-medium">
                <CardContent className="pt-8 pb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-accent" />
                  </div>
                  <p className="font-semibold text-foreground">{stat}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-6">Built for Financial Professionals</h2>
            <p className="text-lg text-muted-foreground">
              We understand the unique needs of accounting practices, from client communication to service positioning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="shadow-medium hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                    <div className="text-accent">{service.icon}</div>
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-6">Real Results for Accounting Firms</h2>
            </div>
            
            <Card className="shadow-large">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">Case Study</Badge>
                <CardTitle className="text-xl">{caseStudy.firm}</CardTitle>
                <CardDescription className="text-base">
                  Tax Planning & Business Advisory
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Challenge</h4>
                  <p className="text-muted-foreground">{caseStudy.challenge}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Solution</h4>
                  <p className="text-muted-foreground">{caseStudy.solution}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Results After 9 Months</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseStudy.results.map((result, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-muted-foreground">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-amber-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl font-medium text-foreground mb-6">
              "{testimonial.quote}"
            </blockquote>
            <div>
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-6">Get Your Free Accounting Website Guide</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Download our guide to creating a professional website that positions your practice for growth and attracts ideal clients.
            </p>
          </div>
          
          <LeadMagnet
            industry="consultants"
            title="The CPA's Guide to a Client-Attracting Website"
            description="Essential strategies for accounting professionals to build trust and showcase expertise online."
            benefits={[
              "Trust-building design principles for financial professionals",
              "Service presentation that reduces price shopping",
              "Client onboarding optimization techniques",
              "SEO strategies for local accounting searches",
              "Integration guide for accounting software and client portals"
            ]}
            fileName="CPA Website Success Guide.pdf"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-accent-foreground">
              Ready to Attract Higher-Value Clients?
            </h2>
            <p className="text-lg text-accent-foreground/80 mb-8">
              Let's create a professional website that showcases your expertise and builds client confidence.
            </p>
            <Button 
              asChild 
              size="lg" 
              variant="secondary"
              className="font-semibold hover-lift"
            >
              <Link to="/contact" className="flex items-center space-x-2">
                <span>Book Your 20-Min Discovery Call</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Accountants;