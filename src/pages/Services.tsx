import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Code, MessageSquare, TrendingUp, ArrowRight, CheckCircle, Search } from 'lucide-react';
import ROICalculator from '@/components/ROICalculator';
import { AIFeatureSection } from '@/components/AIFeatureSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Services = () => {
  const packages = [
    {
      icon: <TrendingUp className="h-8 w-8 text-success" />,
      title: "Website Tune-Up",
      description: "Performance optimization and conversion improvements for existing sites",
      features: [
        "Performance audit & optimization",
        "Mobile responsiveness fixes", 
        "SEO technical improvements",
        "Conversion rate optimization",
        "Analytics setup & tracking",
        "30-day performance guarantee"
      ],
      price: "$2,500",
      popular: false
    },
    {
      icon: <Code className="h-8 w-8 text-accent" />,
      title: "Brand Refresh",
      description: "Complete 5-page custom website with strategic messaging",
      features: [
        "5 custom-designed pages",
        "Brand messaging strategy",
        "Hand-coded development",
        "90+ PageSpeed score guaranteed", 
        "Mobile-first responsive design",
        "SEO optimization included",
        "No ongoing platform fees"
      ],
      price: "$4,500",
      popular: true
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-accent" />,
      title: "Premium Brand Experience",
      description: "Enterprise-level custom solutions for complex projects",
      features: [
        "Unlimited pages & custom features",
        "Advanced integrations",
        "Custom functionality development",
        "Dedicated project manager",
        "Priority support",
        "Custom maintenance plan"
      ],
      price: "Custom Quote",
      popular: false
    }
  ];

  const auditProduct = {
    icon: <CheckCircle className="h-8 w-8 text-accent" />,
    title: "Brand & Performance Audit",
    description: "Comprehensive analysis of your website's performance, messaging, and conversion opportunities",
    features: [
      "Detailed performance analysis report",
      "Mobile usability assessment",
      "SEO opportunity identification", 
      "Messaging clarity evaluation",
      "Competitor comparison analysis",
      "30-minute strategy consultation call"
    ],
    price: "$499",
    note: "Full cost credited toward any redesign project"
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-16 md:pt-20 pb-12 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Our Services</Badge>
            <h1 className="mb-6">
              Everything You Need for a 
              <span className="text-accent"> High-Performance Website</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From strategy to launch, we provide end-to-end solutions that deliver results. 
              No ongoing fees, no platform lock-in — just a website that works for you.
            </p>
          </div>
        </div>
      </section>

      {/* Fixed-Price Packages */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-6">Simple, Fixed-Price Packages</h2>
            <p className="text-lg text-muted-foreground">
              No surprises, no scope creep. Choose the package that fits your needs with transparent, all-inclusive pricing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, index) => (
              <Card key={index} className={`hover-lift shadow-medium h-full ${pkg.popular ? 'border-2 border-accent/50 shadow-accent' : ''} relative`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-accent text-accent-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {pkg.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{pkg.title}</CardTitle>
                  <CardDescription className="text-base">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="features">
                      <AccordionTrigger className="text-sm">What's included</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-3">
                          {pkg.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="text-2xl font-bold text-accent mb-4">
                      {pkg.price}
                    </div>
                    <Button asChild className={`w-full ${pkg.popular ? 'gradient-accent text-accent-foreground' : ''}`}>
                      <Link to="/contact">Get Started</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Audit Product */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Not Sure Which Package is Right?</h3>
              <p className="text-muted-foreground">Start with our comprehensive audit to get personalized recommendations.</p>
            </div>
            
            <Card className="shadow-large border-2 border-accent/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {auditProduct.icon}
                </div>
                <CardTitle className="text-xl mb-2">{auditProduct.title}</CardTitle>
                <CardDescription className="text-base">
                  {auditProduct.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="features">
                    <AccordionTrigger className="text-sm">What's included</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3">
                        {auditProduct.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="pt-4 border-t border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-accent">{auditProduct.price}</span>
                    <Badge variant="secondary">{auditProduct.note}</Badge>
                  </div>
                  <Button asChild className="w-full gradient-accent text-accent-foreground">
                    <Link to="/contact" className="flex items-center space-x-2">
                      <Search className="h-4 w-4" />
                      <span>Order Your Audit</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Feature Section */}
      <AIFeatureSection />

      {/* ROI Calculator */}
      <ROICalculator />

      {/* BYOS Uploads Policy */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="mb-4">How Uploads Work: Bring Your Own Storage (BYOS)</h2>
            <p className="text-lg text-muted-foreground">
              For customers who need file or photo uploads, we connect your site directly to your own storage (S3, Cloudflare R2, GCS, or Supabase Storage).
              You keep control and pay your provider directly — we don’t add platform fees.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Direct browser-to-storage uploads via secure, short‑lived links (no server middleman).</li>
              <li>Granular controls for file types and max size (default 10MB, adjustable to your needs).</li>
              <li>Private or public access options depending on your use case.</li>
              <li>Easy to switch providers later without changing the website UI.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-14 lg:py-20 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-6">Our Proven Process</h2>
            <p className="text-lg text-muted-foreground">
              A collaborative approach that ensures your project is delivered on time, 
              on budget, and aligned with your business goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Discovery & Strategy",
                description: "We understand your business, audience, and goals through detailed discovery sessions."
              },
              {
                step: "02", 
                title: "Design & Messaging",
                description: "Create wireframes, designs, and strategic copy that resonates with your target audience."
              },
              {
                step: "03",
                title: "Development & Testing", 
                description: "Hand-code your website with performance, security, and SEO as top priorities."
              },
              {
                step: "04",
                title: "Launch & Optimize",
                description: "Deploy your site and provide training, analytics setup, and ongoing optimization recommendations."
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-lg flex items-center justify-center mx-auto mb-4 font-bold">
                  {process.step}
                </div>
                <h3 className="font-semibold mb-3">{process.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss your project and create a custom solution that drives real results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="gradient-accent text-accent-foreground font-semibold hover-lift"
              >
                <Link to="/contact" className="flex items-center space-x-2">
                  <span>Request Free Audit</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;