import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const CALENDLY_URL = 'https://calendly.com/maxzipperman';

const Contact = () => {
  const { toast } = useToast();
  const [successOpen, setSuccessOpen] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = async (e: MessageEvent) => {
      try {
        const evt = (e as any)?.data?.event;
        if (evt === 'calendly.event_scheduled') {
          window.location.href = '/payment';
        }
      } catch (err: any) {
        toast({
          title: 'Unable to start checkout',
          description: err?.message || 'Please try again or use the Payment page.',
          variant: 'destructive',
        });
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [toast]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // simple honeypot check
    if (honeypotRef.current && honeypotRef.current.value) {
      return; // silently drop spam
    }
    setSuccessOpen(true);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Clearline Studio',
    url: 'https://www.clearlinestudio.com/contact',
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Clearline Studio</title>
        <meta name="description" content="Discuss your project goals and timelines. Use our inquiry form or book a call." />
        <link rel="canonical" href="/contact" />
        <meta property="og:title" content="Contact Clearline Studio" />
        <meta property="og:description" content="Premium websites for professional services. Start the conversation." />
        <meta property="og:image" content="/clearline-contact-hero.jpg" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-3">Start a Conversation</h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your goals; we’ll map the fastest route to value.
            </p>
          </div>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <Card className="bg-dp-panel border border-dp-border rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">Submit Inquiry</CardTitle>
                <CardDescription>Share a few details and we’ll respond within one business day.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={onSubmit} aria-describedby="privacy-note">
                  <input ref={honeypotRef} type="text" name="company_website" aria-hidden="true" tabIndex={-1} className="hidden" autoComplete="off" />

                  <div className="space-y-1">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" required className="bg-dp-bg border border-dp-border text-dp-text rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-dp-accent" />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required className="bg-dp-bg border border-dp-border text-dp-text rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-dp-accent" />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" className="bg-dp-bg border border-dp-border text-dp-text rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-dp-accent" />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="website">Website (optional)</Label>
                    <Input id="website" className="bg-dp-bg border border-dp-border text-dp-text rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-dp-accent" />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" rows={5} className="bg-dp-bg border border-dp-border text-dp-text rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-dp-accent" />
                  </div>

                  <p id="privacy-note" className="text-xs text-muted-foreground">We respect your privacy. No spam.</p>

                  <Button type="submit" className="w-full gradient-accent text-accent-foreground" data-analytics-id="cta_submit_inquiry">
                    Submit Inquiry
                  </Button>
                  <Button asChild variant="outline" className="w-full" data-analytics-id="cta_book_call">
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a Call</a>
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Details + Calendar */}
            <div className="space-y-6">
              <Card className="bg-dp-panel border border-dp-border rounded-2xl">
                <CardHeader>
                  <CardTitle>Contact Details</CardTitle>
                  <CardDescription>Email, phone, and optional booking link.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <address className="space-y-3 not-italic">
                    <p>
                      <strong>Email:</strong>{' '}
                      <a href="mailto:hello@clearlinestudio.com">hello@clearlinestudio.com</a>
                    </p>
                    <p>
                      <strong>Phone:</strong>{' '}
                      <a href="tel:5559876543">(555) 987-6543</a>
                    </p>
                  </address>
                  <p>
                    <a
                      className="underline underline-offset-4"
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Calendly
                    </a>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-dp-panel border border-dp-border rounded-2xl">
                <CardHeader>
                  <CardTitle>Schedule a Consultation</CardTitle>
                  <CardDescription>Use the embedded calendar to book time that works for you.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-dp-border overflow-hidden bg-dp-bg">
                    <iframe
                      title="Calendly Scheduling"
                      src={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1`}
                      className="w-full h-[480px] md:h-[520px] lg:h-[560px]"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thanks — we received your inquiry</DialogTitle>
            <DialogDescription>We’ll get back to you within one business day.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setSuccessOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Contact;
