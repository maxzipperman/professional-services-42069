import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, Globe, Rocket, DollarSign, Video, Cog } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const differentiators = [
    {
      title: "Hand-coded Excellence",
      description: "Custom-coded, secure, plugin-light builds that you own outright",
      icon: <CheckCircle className="h-6 w-6 text-success" />
    },
    {
      title: "Strategic Copy Included",
      description: "No generic filler — every word is crafted to convert your ideal clients",
      icon: <Star className="h-6 w-6 text-accent" />
    },
    {
      title: "No Lock-in or Monthly Fees",
      description: "Competitive pricing with boutique service, and the site is yours forever",
      icon: <Users className="h-6 w-6 text-accent" />
    },
    {
      title: "Performance Guaranteed",
      description: "90+ PageSpeed scores on mobile and desktop — fast sites that rank well",
      icon: <Rocket className="h-6 w-6 text-success" />
    }
  ];

  const results = [
    { metric: "6s to 1.2s", description: "Average load time improvement" },
    { metric: "25%+", description: "Boost in bookings/conversions" },
    { metric: "90+", description: "Google PageSpeed scores" },
    { metric: "100%", description: "Client satisfaction rate" }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Accountant Websites & Strategy | Position Digital</title>
        <meta name="description" content="Accountants-first go-to-market: custom websites, pricing $6k–$9.5k, Loom audits, and an automation stack to scale." />
        <link rel="canonical" href="/" />
      </Helmet>
      <Hero />
      
      {/* Strategic Focus: Accountants First */}
      <section className="py-16 lg:py-24 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">Strategic Focus</Badge>
            <h2 className="mb-4">Accountants Are Our Premier Market</h2>
            <p className="text-lg text-muted-foreground">
              Our analysis identifies accountants as the most attractive, underserved opportunity — ideal market size, budget, and clear, solvable pain points.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="hover-lift shadow-soft">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-6 w-6 text-accent" />
                  <CardTitle className="text-lg">Price for Value</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your research shows pricing was far too low. Position the flagship Brand Refresh Website at <span className="font-semibold text-foreground">$6,000–$9,500</span> to attract serious clients and signal quality.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="hover-lift shadow-soft">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Video className="h-6 w-6 text-accent" />
                  <CardTitle className="text-lg">Lead With Value</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Open with a personalized Loom video site review — it builds immediate trust, showcases expertise, and clearly differentiates you.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="hover-lift shadow-soft">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Cog className="h-6 w-6 text-accent" />
                  <CardTitle className="text-lg">Scale With Automation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Run a lean stack: <span className="font-medium">HubSpot</span> for CRM, <span className="font-medium">Apollo.io</span> for lead sourcing, and <span className="font-medium">Instantly.ai</span> for outreach.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Customer-Centric Offerings */}
          <div className="max-w-4xl mx-auto mt-12">
            <h3 className="text-center mb-6">Customer-Centric Packages</h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                'The Authority Site',
                'The Credibility Engine',
                'The Practice-Builder Package',
                'The Digital Handshake'
              ].map((label) => (
                <Badge key={label} variant="secondary" className="text-sm py-2 px-3">
                  {label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-accent text-accent-foreground font-semibold">
                <Link to="/contact" className="flex items-center space-x-2">
                  <span>Book a Discovery Call</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/accountants">See our approach for Accountants</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      {/* Differentiators Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-6">Why Position Digital?</h2>
            <p className="text-lg text-muted-foreground">
              We're not just another web agency. We're your strategic partner in creating 
              a digital presence that actually works for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {differentiators.map((item, index) => (
              <Card key={index} className="hover-lift shadow-soft">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-24 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Proven Results</Badge>
            <h2 className="mb-6">The Numbers Speak for Themselves</h2>
            <p className="text-lg text-muted-foreground">
              Our clients see real, measurable improvements that impact their bottom line.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {results.map((result, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {result.metric}
                </div>
                <p className="text-sm text-muted-foreground">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Preview */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-6">We Understand Your Industry</h2>
            <p className="text-lg text-muted-foreground">
              Every industry has unique challenges. We speak your language and know what works.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Local Businesses", 
                description: "Drive bookings and dominate local search",
                href: "/local-businesses",
                icon: <Users className="h-8 w-8 text-accent" />
              },
              {
                title: "Nonprofits & Religious",
                description: "Increase donations and community engagement", 
                href: "/nonprofits",
                icon: <CheckCircle className="h-8 w-8 text-success" />
              },
              {
                title: "Independent Creatives",
                description: "Showcase your work and book more clients",
                href: "/creatives", 
                icon: <Star className="h-8 w-8 text-accent" />
              },
              {
                title: "Professional Services",
                description: "Build credibility and attract higher-value clients",
                href: "/professional-services",
                icon: <Globe className="h-8 w-8 text-accent" />
              }
            ].map((industry, index) => (
              <Card key={index} className="hover-lift shadow-soft group cursor-pointer">
                <Link to={industry.href} className="block p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-smooth">
                      {industry.icon}
                    </div>
                    <h3 className="font-semibold group-hover:text-accent transition-smooth">
                      {industry.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {industry.description}
                    </p>
                    <ArrowRight className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transition-smooth" />
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-primary-foreground">Ready to Transform Your Online Presence?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Let's create a website that doesn't just look great — it works harder for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                variant="secondary"
                className="hover-lift font-semibold"
              >
                <Link to="/contact" className="flex items-center space-x-2">
                  <span>Request Free Audit</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
