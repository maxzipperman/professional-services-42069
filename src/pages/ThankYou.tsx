import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Calendar, MessageSquare } from 'lucide-react';

const ThankYou = () => {
  useEffect(() => {
    // Track conversion
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'form_submission',
        form_type: 'contact',
        page: '/thank-you'
      });
    }
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Thank You - Clearline Studio</title>
        <meta name="description" content="Thank you for contacting Clearline Studio. We'll be in touch soon to discuss your project." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
            <p className="text-xl text-muted-foreground mb-6">
              We've received your message and will get back to you within 24 hours.
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">What happens next?</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex flex-col items-center p-4">
                <MessageSquare className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-medium mb-1">Review</h3>
                <p className="text-muted-foreground">We'll review your project details</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <Calendar className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-medium mb-1">Schedule</h3>
                <p className="text-muted-foreground">We'll reach out to schedule a call</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <ArrowRight className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-medium mb-1">Proposal</h3>
                <p className="text-muted-foreground">You'll receive a detailed proposal</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="gradient-accent text-accent-foreground">
                <Link to="/book" data-cta="thank-you" data-page="thank-you">
                  Schedule Strategy Call
                  <Calendar className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/case-studies" data-cta="thank-you-secondary" data-page="thank-you">
                  View Our Work
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Need immediate assistance? Email us at{' '}
              <a href="mailto:hello@clearlinestudio.com" className="text-primary hover:underline">
                hello@clearlinestudio.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYou;