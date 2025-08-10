import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LeadMagnet from '@/components/LeadMagnet';
import { Link } from 'react-router-dom';
import { Scale, Shield, Users, TrendingUp, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Lawyers = () => {
  const caseStudy = {
    firm: "Johnson & Associates Law Firm",
    challenge: "Outdated website with poor mobile experience and no online client acquisition",
    solution: "Modern, mobile-first website with clear service pages and contact optimization",
    results: [
      "400% increase in online inquiries",
      "Mobile traffic increased by 250%", 
      "60% faster page load times",
      "Higher search rankings for key practice areas"
    ]
  };

  const services = [
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Professional Legal Design",
      description: "Sophisticated, trustworthy designs that convey expertise and authority"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Compliance & Ethics Ready",
      description: "Built with legal advertising ethics and bar association guidelines in mind"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Client-Focused UX",
      description: "Easy navigation for stressed clients seeking legal help quickly"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Local SEO Optimization",
      description: "Rank higher for 'lawyer near me' and practice area searches"
    }
  ];

  const testimonial = {
    quote: "Position Digital completely transformed our online presence. We went from barely getting any web inquiries to having more qualified leads than we can handle. The website perfectly reflects our firm's professionalism.",
    author: "Sarah Johnson",
    role: "Managing Partner, Johnson & Associates"
  };

  return (
    <Layout>
      <Helmet>
        <title>Website Design for Law Firms | Position Digital</title>
        <meta name="description" content="Professional website design for law firms. Credibility-driven websites that attract clients and comply with legal advertising ethics. Get more qualified leads." />
        <meta name="keywords" content="law firm website design, lawyer website, legal website design, attorney website, legal marketing" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Scale className="h-4 w-4 mr-2" />
              For Law Firms
            </Badge>
            <h1 className="mb-6">
              Credibility-Driven Websites for 
              <span className="text-accent"> Small Law Firms</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Professional websites that establish trust, comply with legal ethics, and convert visitors into clients. No ongoing fees, no platform lock-in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="gradient-accent text-accent-foreground font-semibold hover-lift"
              >
                <Link to="/contact" className="flex items-center space-x-2">
                  <span>Speak With the Founder</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/portfolio">View Legal Websites</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-6">Why Your Legal Website Matters More Than Ever</h2>
            <p className="text-lg text-muted-foreground">
              90% of potential clients research law firms online before making contact. 
              Your website is often their first impression of your expertise and professionalism.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              "67% of clients choose firms based on website professionalism",
              "First impressions form in just 50 milliseconds", 
              "Mobile-friendly sites get 3x more inquiries"
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
            <h2 className="mb-6">Specialized for Legal Practices</h2>
            <p className="text-lg text-muted-foreground">
              We understand the unique needs of law firms, from compliance requirements to client psychology.
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
              <h2 className="mb-6">Real Results for Real Law Firms</h2>
            </div>
            
            <Card className="shadow-large">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">Case Study</Badge>
                <CardTitle className="text-xl">{caseStudy.firm}</CardTitle>
                <CardDescription className="text-base">
                  Personal Injury & Employment Law
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
                  <h4 className="font-semibold mb-4">Results After 6 Months</h4>
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
            <h2 className="mb-6">Get Your Free Legal Website Guide</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Download our comprehensive guide to avoiding the most common website mistakes that cost law firms new clients.
            </p>
          </div>
          
          <LeadMagnet
            industry="lawyers"
            title="The 5 Most Common Website Mistakes That Cost Law Firms New Clients"
            description="A comprehensive guide to website best practices specifically for legal professionals."
            benefits={[
              "Compliance checklist for legal advertising ethics",
              "Mobile optimization essentials for law firms",
              "Trust signals that convert visitors to clients",
              "SEO strategies for local legal searches",
              "Contact form optimization for legal inquiries"
            ]}
            fileName="Legal Website Mistakes Guide.pdf"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-accent-foreground">
              Ready to Attract More Qualified Clients?
            </h2>
            <p className="text-lg text-accent-foreground/80 mb-8">
              Let's create a professional website that establishes trust and drives inquiries for your practice.
            </p>
            <Button 
              asChild 
              size="lg" 
              variant="secondary"
              className="font-semibold hover-lift"
            >
              <Link to="/contact" className="flex items-center space-x-2">
                <span>Speak With the Founder</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Lawyers;