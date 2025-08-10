import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const PaymentPage = () => {
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/payment` : '/payment';
  const { toast } = useToast();

  const handlePayNow = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { amount: 49900, title: 'Website Conversion Audit' },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (e: any) {
      console.error('Stripe checkout error:', e);
      toast({ title: 'Payment unavailable', description: e?.message || 'Please try again later.', variant: 'destructive' });
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Make a Payment | Clearline Studio</title>
        <meta name="description" content="Secure online payment via Stripe. Pay your invoice quickly and safely with Clearline Studio." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <header className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Make a Secure Payment</h1>
            <p className="mt-4 text-muted-foreground">
              Use this page to complete a secure payment. We process payments via Stripe for your safety and convenience.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Consultation pricing: 1 hour $299, 2 hours $499.</p>
          </header>

          <div className="mt-8 flex items-center gap-4">
            <Button size="lg" className="gradient-accent text-accent-foreground font-medium" onClick={handlePayNow}>
              Pay Now
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Have questions? Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PaymentPage;
