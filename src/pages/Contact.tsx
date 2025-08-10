import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      content: "hello@positiondigital.com",
      description: "We respond within 24 hours"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone", 
      content: "(555) 123-4567",
      description: "Mon-Fri, 9am-6pm EST"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Response Time",
      content: "24 hours",
      description: "Free audit within 2 business days"
    }
  ];

  const services = [
    "Website Design & Development",
    "Brand Messaging Strategy", 
    "Website Optimization & Refresh",
    "Free Website Audit",
    "Other"
  ];

  const industries = [
    "Professional Services (Law, Accounting, Consulting)",
    "Local Business (Restaurant, Home Services, Retail)",
    "Nonprofit & Religious Organizations", 
    "Independent Creatives (Photography, Art, Coaching)",
    "Other"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Get Started</Badge>
            <h1 className="mb-6">
              Let's Create Something 
              <span className="text-accent"> Amazing Together</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to transform your online presence? We'd love to learn about your project 
              and provide a free website audit with actionable recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-2xl">Request Your Free Website Audit</CardTitle>
                <CardDescription>
                  Tell us about your project and we'll provide a comprehensive audit 
                  with specific recommendations to improve your site's performance.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Smith" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input id="company" placeholder="Your Company Name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Current Website (if any)</Label>
                    <Input id="website" placeholder="https://yourwebsite.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry.toLowerCase().replace(/\s+/g, '-')}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interest</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="What service interests you most?" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Project Budget</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-2500">Under $2,500</SelectItem>
                        <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                        <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10000-plus">$10,000+</SelectItem>
                        <SelectItem value="not-sure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Project Details</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your project goals, challenges, and timeline..."
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-accent text-accent-foreground font-semibold hover-lift"
                  >
                    Request Free Audit
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & What to Expect */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>
                    Ready to discuss your project? We're here to help.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{info.title}</h4>
                        <p className="text-accent font-medium">{info.content}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* What to Expect */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>What to Expect</CardTitle>
                  <CardDescription>
                    Our free audit process and next steps
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "We'll review your current website (if you have one)",
                    "Analyze your industry and competitors", 
                    "Provide specific recommendations for improvement",
                    "Discuss your goals and create a custom proposal",
                    "No obligation — just valuable insights for your business"
                  ].map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="shadow-soft gradient-accent text-accent-foreground">
                <CardHeader>
                  <CardTitle className="text-accent-foreground">Why Choose Position Digital?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">48hrs</div>
                      <div className="text-sm opacity-90">Average response time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-sm opacity-90">Client satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">90+</div>
                      <div className="text-sm opacity-90">PageSpeed scores</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-sm opacity-90">Monthly fees</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;