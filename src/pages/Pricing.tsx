import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ComparisonTable from '@/components/ComparisonTable';
import { ArrowRight, CheckCircle } from 'lucide-react';

const pricingTable = {
  title: 'Compare Packages',
  subtitle: 'Transparent inclusions, timelines, and prices',
  columns: ['Industry Leader (~$9K)', 'Professional (~$5K)', 'Essential (~$2K)'],
  rows: [
    { label: 'Pages Included', values: ['8–12', '5', '3'], emphasis: true },
    { label: 'Design Approach', values: ['Custom + components', 'Custom', 'Template/Semi-custom'] },
    { label: 'Technical SEO', values: ['Yes', 'Yes', 'Basic'] },
    { label: 'Analytics (GA4) + GTM', values: ['Yes', 'Yes', 'No'] },
    { label: 'Copywriting', values: ['Yes', 'Partial', 'No'] },
    { label: 'Brand Identity Refresh', values: ['Yes', 'Styling only', 'No'] },
    { label: 'Accessibility (WCAG 2.1 AA)', values: ['Yes', 'Yes', 'Partial'] },
    { label: 'Optimization (post‑launch)', values: ['3 months', '2 weeks polish', 'No'] },
    { label: 'Typical Timeline', values: ['6–10 weeks', '3–5 weeks', '1–2 weeks'], emphasis: true },
    { label: 'Investment (approx.)', values: ['~$9,000', '~$5,000', '~$2,000'], emphasis: true },
  ],
  footnote: 'Payment terms: 50% to start, 25% at design approval, 25% at launch. Includes two revision rounds per milestone.'
};

const Pricing = () => {
  return (
    <Layout>
      <Helmet>
        <title>Website Pricing for Professional Services | Clearline Studio</title>
        <meta name="description" content="Transparent Good/Better/Best packages for law firms, accountants, and consultants. Compare inclusions, timelines, and pricing." />
        <link rel="canonical" href="/pricing" />
      </Helmet>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <header className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="mb-4 text-primary">Pricing</h1>
            <p className="text-lg text-muted-foreground">Transparent packages designed for measurable outcomes and long-term impact.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[{
              name: 'Essential Web Presence', price: '~$2K', points: ['3 pages', 'Basic SEO', 'Template/semi-custom']
            },{
              name: 'Professional Website Package', price: '~$5K', points: ['Custom 5-page site', 'Brand styling', 'SEO + Analytics']
            },{
              name: 'Industry Leader Package', price: '~$9K', points: ['8–12 pages', 'Brand refresh + copy', 'ADA audit + 3 mo. optimization']
            }].map((pkg) => (
              <Card key={pkg.name} className="shadow-soft">
                <CardHeader>
                  <CardTitle>{pkg.name}</CardTitle>
                  <div className="text-2xl font-semibold">{pkg.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    {pkg.points.map((p) => (
                      <li key={p} className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-accent mt-0.5" />{p}</li>
                    ))}
                  </ul>
                  <Button asChild className="mt-4 w-full gradient-accent text-accent-foreground">
                    <a href="/book" className="inline-flex items-center justify-center gap-2">Choose Package <ArrowRight className="h-4 w-4" /></a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <ComparisonTable data={pricingTable as any} />
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
