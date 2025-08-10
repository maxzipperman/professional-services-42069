import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PaymentCanceled = () => {
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/payment-canceled` : '/payment-canceled';
  return (
    <Layout>
      <Helmet>
        <title>Payment Canceled | Clearline Studio</title>
        <meta name="description" content="Your payment was canceled. You can try again or contact Clearline Studio for assistance." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Payment Canceled</h1>
            <p className="mt-4 text-muted-foreground">No charges were made. You can try again at any time.</p>
          </header>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
              <Link to="/payment">Try Again</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Need help? Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PaymentCanceled;
