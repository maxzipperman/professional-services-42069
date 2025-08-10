import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Code, MessageSquare, TrendingUp, ArrowRight, CheckCircle, Search } from 'lucide-react';
import ROICalculator from '@/components/ROICalculator';
import { AIFeatureSection } from '@/components/AIFeatureSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Helmet } from 'react-helmet-async';
import { ComparisonTable } from '@/components/ComparisonTable';
import ContextualCTA from '@/components/ContextualCTA';
import type { ComparisonTableData } from '@/types/industry';

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
      price: "From $8,500",
      popular: false
    }
  ];

  const comparisonData: ComparisonTableData = {
    title: "Compare Packages",
    subtitle: "Quick view of scope, timeline, and deliverables",
    columns: ["Website Tune-Up", "Brand Refresh", "Premium Brand Experience"],
    rows: [
      { label: "Typical Investment", values: ["$2,500", "$4,500", "From $8,500"], emphasis: true },
      { label: "Estimated Timeline", values: ["1–2 weeks", "3–4 weeks", "4–8+ weeks"] },
      { label: "Pages / Scope", values: ["Existing site", "Up to 5 pages", "Unlimited / Custom"] },
      { label: "Design", values: ["Refinements", "Custom design", "Advanced bespoke"] },
      { label: "Development", values: ["Optimization", "Hand-coded build", "Custom features & integrations"] },
      { label: "SEO", values: ["Technical fixes", "On-page SEO", "Technical + Content architecture"] },
      { label: "Performance target", values: ["90+ mobile", "90+ mobile", "90+ mobile"] },
      { label: "Deliverables", values: [
        "Audit, fixes, analytics",
        "New site, copy, SEO setup",
        "Scope defined in brief"
      ]},
      { label: "Support", values: ["30-day guarantee", "30-day guarantee", "Priority + maintenance"] },
    ],
  };

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
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {"@type":"Question","name":"Do you host our images and files?","acceptedAnswer":{"@type":"Answer","text":"By default, no. We set up direct uploads to your own storage or media platform. You keep ownership, control, and billing. If you prefer, we can host temporarily with strict quotas and auto-deletion policies."}},
            {"@type":"Question","name":"What storage providers do you support?","acceptedAnswer":{"@type":"Answer","text":"Amazon S3, Cloudflare R2, Google Cloud Storage, Azure Blob, Supabase Storage (on your project), Cloudinary, ImageKit, and Uploadcare."}},
            {"@type":"Question","name":"Is the upload secure?","acceptedAnswer":{"@type":"Answer","text":"Yes. We use short-lived, pre-signed upload URLs or signed parameters so your secret keys are never exposed. Files go directly from the browser to your storage (no large files through our servers)."}},
            {"@type":"Question","name":"Can you add limits (file size, types, quotas)?","acceptedAnswer":{"@type":"Answer","text":"Yes. We enforce limits in both the UI and backend. We also recommend lifecycle rules (e.g., auto-delete old temp files) to keep costs low."}},
            {"@type":"Question","name":"Who pays for bandwidth and storage?","acceptedAnswer":{"@type":"Answer","text":"You do—directly to your provider. We don’t add any markup."}}
          ]
        })}</script>
      </Helmet>
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
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Consultation pricing: 1 hour $299, 2 hours $499.
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

          {/* Package Comparison */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold">Package Comparison</h3>
              <p className="text-muted-foreground">See scope, timeline, and deliverables at a glance.</p>
            </div>
            <ComparisonTable data={comparisonData} />
          </div>

          {/* Media & File Storage: BYOS Blurb */}
          <Card className="mb-16 shadow-medium">
            <CardHeader>
              <CardTitle>Media & File Storage: Bring Your Own</CardTitle>
              <CardDescription>
                For uploads and media hosting, we connect your site directly to your own cloud storage or media platform (S3, Cloudflare R2, GCS, Cloudinary, etc.). You keep full ownership and pay your provider directly—no markups from us. We configure everything and ensure a smooth, secure upload experience.
              </CardDescription>
            </CardHeader>
          </Card>

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

      {/* Contextual CTA */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <ContextualCTA 
            title="Not sure which package fits your needs?"
            description="Schedule a free 30-minute strategy call to discuss your goals and get personalized recommendations."
            primaryAction={{
              text: "Book Strategy Call",
              href: "/book"
            }}
            secondaryAction={{
              text: "View Pricing",
              href: "/pricing"
            }}
            context="services"
            className="max-w-2xl mx-auto"
          />
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

      {/* Uploads & Media - FAQ */}
      <section className="py-14 lg:py-20 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="mb-4">Uploads & Media: Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Short answers about how we handle uploads, storage, and security.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="q1">
                <AccordionTrigger>Do you host our images and files?</AccordionTrigger>
                <AccordionContent>
                  By default, no. We set up direct uploads to your own storage or media platform. You keep ownership, control, and billing. If you prefer, we can host temporarily with strict quotas and auto-deletion policies.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>What storage providers do you support?</AccordionTrigger>
                <AccordionContent>
                  Amazon S3, Cloudflare R2, Google Cloud Storage, Azure Blob, Supabase Storage (on your project), Cloudinary, ImageKit, and Uploadcare.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Is the upload secure?</AccordionTrigger>
                <AccordionContent>
                  Yes. We use short-lived, pre-signed upload URLs or signed parameters so your secret keys are never exposed. Files go directly from the browser to your storage (no large files through our servers).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger>Can you add limits (file size, types, quotas)?</AccordionTrigger>
                <AccordionContent>
                  Yes. We enforce limits in both the UI and backend. We also recommend lifecycle rules (e.g., auto-delete old temp files) to keep costs low.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5">
                <AccordionTrigger>Who pays for bandwidth and storage?</AccordionTrigger>
                <AccordionContent>
                  You do—directly to your provider. We don’t add any markup.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-10 space-y-6">
              <article>
                <h3 className="font-semibold mb-2">Data Ownership &amp; Portability</h3>
                <p className="text-muted-foreground">
                  You own your media and files. We never lock you in; we simply connect your site to your chosen storage. You can export or switch providers anytime.
                </p>
              </article>
              <article>
                <h3 className="font-semibold mb-2">Privacy &amp; Compliance</h3>
                <p className="text-muted-foreground">
                  We minimize data we store (typically file URLs and basic metadata). For sensitive uploads, we can enable extra safeguards (virus scanning, encryption, data residency, or provider-level compliance).
                </p>
              </article>
            </div>
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