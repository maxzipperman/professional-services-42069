import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const packages = [
    {
      name: 'Starter Site',
      price: '$7,000–$10,000',
      desc: 'High-performance 5-page site—fast, accessible, conversion-focused.',
      bullets: [
        'Strategy kickoff + messaging outline',
        'Custom design + responsive build',
        'On-page SEO + analytics setup',
        '90+ Lighthouse targets',
      ],
    },
    {
      name: 'Growth Site',
      price: '$12,000–$18,000',
      desc: 'Deeper strategy + pages, CMS content, and CRO foundations.',
      bullets: [
        'Positioning + messaging framework',
        'Custom design system + components',
        'CMS-driven content (blog, case studies)',
        'CRO-ready layouts + lead capture',
      ],
    },
    {
      name: 'Custom Platform',
      price: '$25,000+',
      desc: 'Bespoke experience, integrations, and complex requirements.',
      bullets: [
        'Advanced IA + UX workshops',
        'Custom features and integrations',
        'Scalable content architecture',
        'Analytics + event tracking plan',
      ],
    },
  ];

  const retainers = [
    { name: 'Secure Plan', price: '$150/mo', features: 'Hosting, backups, security, updates, email support' },
    { name: 'Optimize Plan', price: '$1,500/mo', features: 'Secure + 10 hrs updates/mo, monthly performance reports, priority support' },
    { name: 'Growth Plan', price: '$4,000+/mo', features: 'Optimize + SEO, CRO, content marketing' },
  ];

  const addOns = [
    'CRO & Analytics subscription',
    'Performance tuning service',
    'ADA remediation',
    'Content packages',
    'Brand motion kits',
  ];

  return (
    <Layout>
      <Helmet>
        <title>Pricing | Clearline Studio</title>
        <meta name="description" content="Transparent pricing for strategy-led web design, brand identity, and growth retainers." />
        <link rel="canonical" href="/pricing" />
      </Helmet>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h1 className="mb-4">Transparent Packages That Pay for Themselves</h1>
            <p className="text-lg text-muted-foreground">We price for outcomes. Choose a package or talk to us about a custom build.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {packages.map((p) => (
              <Card key={p.name} className="hover-lift shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl">{p.name}</CardTitle>
                  <p className="text-primary font-semibold">{p.price}</p>
                  <CardDescription>{p.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-3">Productized Offers</h2>
            <p className="text-muted-foreground mb-6">Quick, high-impact engagements to unlock ROI fast.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Brand Sprint</CardTitle>
                <p className="text-primary font-semibold">$8,500 • 2 weeks</p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Brand strategy workshops</li>
                  <li>Messaging framework</li>
                  <li>Logo suite, colors, fonts</li>
                  <li>1-page style guide</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Website Audit & CRO Roadmap</CardTitle>
                <p className="text-primary font-semibold">$999 • 5 days</p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Performance/SEO/Accessibility/UX audit</li>
                  <li>10 actionable CRO recommendations</li>
                  <li>60-minute presentation call</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="mb-3">Retainers</h2>
            <p className="text-muted-foreground">Ongoing support and optimization to compound results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {retainers.map((r) => (
              <Card key={r.name} className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg">{r.name}</CardTitle>
                  <p className="text-primary font-semibold">{r.price}</p>
                  <CardDescription>{r.features}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-3">Add-ons</h2>
          </div>
          <Card className="max-w-3xl mx-auto mb-12">
            <CardContent className="p-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-foreground">
                {addOns.map((a) => (
                  <li key={a} className="list-disc pl-5">{a}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="gradient-accent text-accent-foreground">
              <Link to="/book">Schedule a Strategy Call</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Ask a question</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
