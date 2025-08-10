import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PaymentPage = () => {
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/payment` : '/payment';
  return (
    <Layout>
      <Helmet>
        <title>Make a Payment | Clearline Solutions</title>
        <meta name="description" content="Secure online payment via Stripe. Pay your invoice quickly and safely with Clearline Solutions." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <header className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Make a Secure Payment</h1>
            <p className="mt-4 text-muted-foreground">
              Use this page to complete a secure payment. We process payments via Stripe for your safety and convenience.
            </p>
          </header>

          <div className="mt-8 flex items-center gap-4">
            <Button asChild size="lg" className="gradient-accent text-accent-foreground font-medium">
              <Link to="/contact">Pay Now</Link>
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
