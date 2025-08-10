import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/payment-success` : '/payment-success';
  return (
    <Layout>
      <Helmet>
        <title>Payment Successful | Clearline Studio</title>
        <meta name="description" content="Your payment was successful. Thank you for your purchase with Clearline Studio." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Payment Successful</h1>
            <p className="mt-4 text-muted-foreground">Thank you! Your payment has been processed. A receipt will be sent by Stripe.</p>
          </header>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
              <Link to="/">Return Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Questions? Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PaymentSuccess;
