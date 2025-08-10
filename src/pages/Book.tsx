import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CALENDLY_URL = 'https://calendly.com/maxzipperman';

const Book = () => {
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/book` : '/book';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Book Your Strategy Call',
    url: canonical,
    description: 'Schedule a strategy call on Calendly and make a secure payment via Stripe.'
  };

  return (
    <Layout>
      <Helmet>
        <title>Book Your Strategy Call | Clearline Studio</title>
        <meta name="description" content="Schedule on Calendly and make a secure payment via Stripe in minutes." />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="pt-20 md:pt-24 pb-12">
        <div className="container mx-auto px-4">
          <header className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold">Book Your Strategy Call</h1>
            <p className="mt-4 text-muted-foreground">
              Choose a time that works for you and optionally complete a secure payment. No hard pitch — just practical next steps.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gradient-accent text-accent-foreground">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Schedule on Calendly</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/payment">Go to Secure Checkout</Link>
              </Button>
            </div>
          </header>

          <div className="mt-10">
            <div className="rounded-lg border border-border overflow-hidden bg-background">
              <iframe
                title="Calendly Scheduling"
                src={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1`}
                className="w-full"
                style={{ height: 720 }}
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Prefer a full page view? <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="underline">Open Calendly</a>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Book;
