
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@/hooks/use-toast';
const CALENDLY_URL = 'https://calendly.com/maxzipperman';
const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactInfo = [{
    icon: <Mail className="h-5 w-5" />,
    title: "Email",
    content: "hello@clearlinestudio.com",
    description: "We respond within 24 hours"
  }, {
    icon: <Phone className="h-5 w-5" />,
    title: "Phone",
    content: "(555) 987-6543",
    description: "Mon-Fri, 9am-6pm EST"
  }, {
    icon: <Clock className="h-5 w-5" />,
    title: "Response Time",
    content: "24 hours",
    description: "Free audit within 2 business days"
  }];
  const services = ["Website Design & Development", "Brand Messaging Strategy", "Website Optimization & Refresh", "Free Website Audit", "Other"];
  const industries = ["Professional Services (Law, Accounting, Consulting)", "Local Business (Restaurant, Home Services, Retail)", "Nonprofit & Religious Organizations", "Independent Creatives (Photography, Art, Coaching)", "Other"];
  useEffect(() => {
    const handler = async (e: MessageEvent) => {
      try {
        const evt = (e as any)?.data?.event;
        console.log('Calendly postMessage received:', evt, e);
        if (evt === 'calendly.event_scheduled') {
          console.log('Calendly event scheduled — redirecting to /payment');
          window.location.href = '/payment';
        }
      } catch (err: any) {
        console.error('Failed to start checkout:', err);
        toast({
          title: 'Unable to start checkout',
          description: err?.message || 'Please try again or use the Payment page.',
          variant: 'destructive'
        });
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [toast]);
  return <Layout>
      {/* Hero Section */}
      <section className="pt-16 md:pt-20 pb-12 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Get Started</Badge>
            <h1 className="mb-6">
              Contact
              <span className="text-accent"> Clearline Studio</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to transform your online presence? We'd love to learn about your project 
              and provide a free website audit with actionable recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-2xl">Start the Process</CardTitle>
                <CardDescription>
                  Tell us about your project and we'll provide a comprehensive audit 
                  with specific recommendations to improve your site's performance.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form className="space-y-6" onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  
                  // Simulate form submission
                  setTimeout(() => {
                    navigate('/thank-you');
                  }, 1000);
                }}>
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
                    <Label htmlFor="service">What can we help you with?</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary need" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website-redesign">Website Redesign</SelectItem>
                        <SelectItem value="conversion-optimization">Conversion Optimization</SelectItem>
                        <SelectItem value="brand-refresh">Brand Refresh</SelectItem>
                        <SelectItem value="audit">Website Audit</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Project Details</Label>
                    <Textarea id="message" placeholder="Tell us about your project goals, challenges, and timeline..." rows={4} />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full gradient-accent text-accent-foreground font-semibold hover-lift" 
                    data-cta="contact-form" 
                    data-page="contact"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground mt-2">
                    We'll respond within 24 hours with next steps.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & Calendly Embed */}
            <div className="space-y-8">
              {/* Contact Information */}
              

              {/* Quick Stats */}
              <Card className="shadow-soft gradient-accent text-accent-foreground">
                <CardHeader>
                  <CardTitle className="text-accent-foreground">Why Choose Clearline Studio?</CardTitle>
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

              {/* Calendly Embed (replaces the previously selected card) */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Schedule a Consultation</CardTitle>
                  <CardDescription>
                    Initial 2-hour consultation: $499. After scheduling, you’ll be redirected to secure Stripe checkout to complete payment. One-hour consultations are available for $299.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-border overflow-hidden bg-background">
                    <iframe
                      title="Calendly Scheduling"
                      src={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1`}
                      className="w-full h-[480px] md:h-[520px] lg:h-[560px]"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Prefer a full page view? <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="underline">Open Calendly</a>.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>;
};
export default Contact;
