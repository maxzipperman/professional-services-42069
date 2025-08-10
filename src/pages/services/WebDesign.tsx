import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Workflow, Target } from 'lucide-react';

const WebDesign = () => {
  return (
    <Layout>
      <Helmet>
        <title>Web Design & Development for Law Firms, Accountants, Consultants | Clearline Studio</title>
        <meta name="description" content="Custom, high-performance websites engineered to convert for law firms, accountants, and consultants. Strategy-led, measurable ROI." />
        <link rel="canonical" href="/services/web-design" />
      </Helmet>

      <section className="py-12 lg:py-16 gradient-subtle">
        <div className="container mx-auto px-4">
          <header className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="mb-4 text-primary">Web Design & Development</h1>
            <p className="text-lg text-muted-foreground">Outcome-first websites built to increase qualified inquiries and prove your authority.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <article>
              <h2 className="text-xl font-semibold mb-3">What you get</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-accent mt-0.5" />Conversion-focused design and messaging</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-accent mt-0.5" />High-performance build (LCP &lt; 2.5s) with analytics</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-accent mt-0.5" />Technical SEO and accessibility (WCAG 2.1 AA)</li>
              </ul>

              <div className="mt-6">
                <Button asChild size="lg" className="gradient-accent text-accent-foreground">
                  <a href="/book" className="inline-flex items-center gap-2">Schedule a Strategy Call <ArrowRight className="h-5 w-5" /></a>
                </Button>
              </div>
            </article>

            <aside className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2"><Workflow className="h-5 w-5 text-accent" /> Process Overview</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Strategy & goals alignment</li>
                <li>Information architecture & wireframes</li>
                <li>Design system & content</li>
                <li>Build, QA, optimize</li>
                <li>Launch & measurement</li>
              </ol>
            </aside>
          </div>

          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2"><Target className="h-5 w-5 text-accent" /> Business Outcomes</h2>
            <p className="text-muted-foreground">Higher conversion rates, clearer positioning, faster load times, and measurable lead growth.</p>
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default WebDesign;
