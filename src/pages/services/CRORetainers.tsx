import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowRight, LineChart, CheckCircle } from 'lucide-react';

const CRORetainers = () => {
  return (
    <Layout>
      <Helmet>
        <title>CRO Retainers for Professional Services | Clearline Studio</title>
        <meta name="description" content="Ongoing conversion optimization retainers focused on measurable growth for law firms, accountants, and consultants." />
        <link rel="canonical" href="/services/cro-retainers" />
      </Helmet>

      <section className="py-12 lg:py-16 gradient-subtle">
        <div className="container mx-auto px-4">
          <header className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="mb-4 text-primary">CRO Retainers</h1>
            <p className="text-lg text-muted-foreground">Data-driven, iterative improvements that increase lead volume and quality month over month.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <article>
              <h2 className="text-xl font-semibold mb-3">What’s included</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-accent mt-0.5" />A/B tests and UX improvements</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-accent mt-0.5" />Analytics & funnel tracking (GA4/GTM)</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-accent mt-0.5" />Monthly reporting and roadmap</li>
              </ul>
              <div className="mt-6">
                <Button asChild size="lg" className="gradient-accent text-accent-foreground">
                  <a href="/book" className="inline-flex items-center gap-2">Schedule a Strategy Call <ArrowRight className="h-5 w-5" /></a>
                </Button>
              </div>
            </article>
            <aside className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2"><LineChart className="h-5 w-5 text-accent" /> Growth Focus</h3>
              <p className="text-muted-foreground">Prioritize high-leverage improvements tied to pipeline quality—not vanity metrics.</p>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CRORetainers;
