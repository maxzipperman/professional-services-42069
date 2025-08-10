import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowRight, Palette, CheckCircle, Target } from 'lucide-react';

const BrandIdentity = () => {
  return (
    <Layout>
      <Helmet>
        <title>Brand Identity for Professional Services | Clearline Studio</title>
        <meta name="description" content="Strategic brand identity that clarifies positioning and elevates trust for law firms, accountants, and consultants." />
        <link rel="canonical" href="/services/brand-identity" />
      </Helmet>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <header className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="mb-4 text-primary">Brand Identity</h1>
            <p className="text-lg text-muted-foreground">A cohesive visual system and messaging that support premium positioning and conversion.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <article>
              <h2 className="text-xl font-semibold mb-3">Deliverables</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-accent mt-0.5" />Logo refinements and lockups</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-accent mt-0.5" />Typography & color system (WCAG compliant)</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-accent mt-0.5" />Component library & usage guide</li>
              </ul>
              <div className="mt-6">
                <Button asChild size="lg" className="gradient-accent text-accent-foreground">
                  <a href="/book" className="inline-flex items-center gap-2">Schedule a Strategy Call <ArrowRight className="h-5 w-5" /></a>
                </Button>
              </div>
            </article>
            <aside className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2"><Palette className="h-5 w-5 text-accent" /> Outcome Focus</h3>
              <p className="text-muted-foreground">Sharper market perception, consistent execution, and stronger trust signals across touchpoints.</p>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BrandIdentity;
