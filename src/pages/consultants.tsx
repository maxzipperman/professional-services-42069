import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LeadMagnet from '@/components/LeadMagnet';
import { Link } from 'react-router-dom';
import { Briefcase, Target, TrendingUp, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Consultants = () => {
  const caseStudy = {
    firm: "Strategic Growth Partners",
    challenge: "Consultant struggled to differentiate from competitors and attract enterprise clients online",
    solution: "Authority-building website with case studies, thought leadership content, and clear process visualization",
    results: [
      "500% increase in qualified enterprise inquiries",
      "Average project value increased by 150%",
      "Speaking engagement requests doubled",
      "Featured in 3 industry publications"
    ]
  };

  const services = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Authority Positioning",
      description: "Establish thought leadership and showcase your unique methodology"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Results-Driven Design",
      description: "Highlight outcomes and ROI to attract decision-makers"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Lead Generation Focus",
      description: "Optimized for capturing high-value consulting inquiries"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Client Journey Mapping",
      description: "Guide prospects from awareness to engagement with strategic content"
    }
  ];

  const testimonial = {
    quote: "Position Digital helped me transform my consulting practice from a commodity service to a premium advisory firm. The website positions me as the expert in my field, and I'm attracting the kinds of clients I've always wanted to work with.",
    author: "Jennifer Chen",
    role: "Principal, Strategic Growth Partners"
  };

  return (
    <Layout>
      <Helmet>
        <title>Website Design for Consultants | Position Digital</title>
        <meta name="description" content="Professional websites for consultants and advisory firms. Build authority, showcase expertise, and attract premium clients with a results-focused consulting website." />
        <meta name="keywords" content="consultant website design, consulting firm marketing, business consultant website, strategy consultant web design" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Briefcase className="h-4 w-4 mr-2" />
              For Consultants
            </Badge>
            <h1 className="mb-6">
              Authority-Building Websites for 
              <span className="text-accent"> Consulting Professionals</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Position yourself as the go-to expert in your field. Convert visitors into high-value clients with a website that showcases your unique methodology and proven results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="gradient-accent text-accent-foreground font-semibold hover-lift"
              >
                <Link to="/contact" className="flex items-center space-x-2">
                  <span>Get Your Free Strategy Session</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/portfolio">View Consultant Websites</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-6">Why Your Consulting Website is Your Biggest Asset</h2>
            <p className="text-lg text-muted-foreground">
              In consulting, trust and expertise drive purchasing decisions. Your website is where potential clients evaluate whether you're worth their significant investment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              "92% of B2B buyers research consultants online before contact",
              "Authority-positioned consultants charge 3x higher rates", 
              "Clear methodology presentation increases close rates by 60%"
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
            <h2 className="mb-6">Designed for Consulting Success</h2>
            <p className="text-lg text-muted-foreground">
              We understand how consulting sales work and build websites that support your entire client acquisition process.
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
              <h2 className="mb-6">Real Results for Consulting Practices</h2>
            </div>
            
            <Card className="shadow-large">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">Case Study</Badge>
                <CardTitle className="text-xl">{caseStudy.firm}</CardTitle>
                <CardDescription className="text-base">
                  Business Strategy & Operations Consulting
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
                  <h4 className="font-semibold mb-4">Results After 12 Months</h4>
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
            <h2 className="mb-6">Transform Your Website Into a Lead Machine</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Download our comprehensive guide to creating a consulting website that positions you as an authority and attracts premium clients.
            </p>
          </div>
          
          <LeadMagnet
            industry="consultants"
            title="How to Turn Your Website Into a Lead-Generation Machine for Your Consulting Practice"
            description="The complete playbook for positioning, content strategy, and conversion optimization for consultants."
            benefits={[
              "Authority positioning strategies that command premium rates",
              "Content frameworks that demonstrate expertise",
              "Lead capture optimization for consulting inquiries",
              "Client journey mapping for complex B2B sales",
              "Case study presentation that builds credibility"
            ]}
            fileName="Consultant Lead Generation Guide.pdf"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-accent-foreground">
              Ready to Command Premium Rates?
            </h2>
            <p className="text-lg text-accent-foreground/80 mb-8">
              Let's create a website that positions you as the go-to expert in your field and attracts your ideal clients.
            </p>
            <Button 
              asChild 
              size="lg" 
              variant="secondary"
              className="font-semibold hover-lift"
            >
              <Link to="/contact" className="flex items-center space-x-2">
                <span>Get Your Free Strategy Session</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Consultants;