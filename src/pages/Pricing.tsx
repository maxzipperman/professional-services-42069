import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const tiers = [
    { tier: 'Website Refresh', price: '$995', features: ['Performance tune-up', 'Mobile fixes', 'Basic on-page SEO', 'CTA & form optimization'] },
    { tier: 'Professional Site', price: '$2,495', features: ['Custom design + responsive build', 'On-page SEO', 'Analytics + forms', 'Performance pipeline'], popular: true },
    { tier: 'Growth Platform', price: '$4,500', features: ['Messaging framework', 'Design system', 'Advanced CRO', 'Quarterly reviews'] },
    { tier: 'Custom Solution', price: '$8,000+', features: ['UX strategy workshops', 'Custom features/integrations', 'Scalable architecture', 'Dedicated PM'] },
  ];

  const faqs = [
    { q: 'Which tier is right for me?', a: 'Most professional services firms start with Professional, then expand into Growth as content and CRO opportunities grow.' },
    { q: 'Do you lock me into monthly payments?', a: 'No lock-ins. You own your site. Retainers are optional and month-to-month.' },
    { q: 'How long does a typical project take?', a: 'Refresh: ~2 weeks. Professional: 3–5 weeks. Growth/Custom varies with scope.' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Clearline Pricing',
    url: 'https://www.clearlinestudio.com/pricing',
  };

  return (
    <Layout>
      <Helmet>
        <title>Clearline Studio Pricing | Packages for Every Need</title>
        <meta name="description" content="Compare Refresh, Professional, Growth, and Custom packages. Transparent pricing. Premium outcomes." />
        <link rel="canonical" href="/pricing" />
        <meta property="og:title" content="Transparent Pricing | Clearline Studio" />
        <meta property="og:description" content="Tiers that scale with your ambition. No recurring lock-ins." />
        <meta property="og:image" content="/clearline-pricing-hero.jpg" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="py-12 lg:py-16 bg-dp-bg text-dp-text">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="mb-4 inline-flex px-3 py-1 rounded-full bg-dp-accent/15 text-dp-accent text-sm">Pricing</span>
            <h1 className="mb-3">Pricing & Packages</h1>
            <p className="text-lg text-muted-foreground">Transparent tiers, premium outcomes, no monthly lock-ins.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {tiers.map((t) => (
              <Card key={t.tier} className="bg-dp-panel border border-dp-border rounded-2xl p-0">
                <CardHeader className="p-8 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{t.tier}</CardTitle>
                    {t.popular && (
                      <span className="inline-flex px-3 py-1 rounded-full bg-dp-accent/15 text-dp-accent text-sm" aria-label="Most popular tier">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="text-primary font-semibold mt-2">{t.price}</p>
                  <CardDescription className="sr-only">{t.tier} package</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <ul className="space-y-2 text-muted-foreground">
                    {t.features.map((f) => (
                      <li key={`${t.tier}-${f}`} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-dp-accent/60" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex gap-3">
                    {t.tier === 'Professional Site' ? (
                      <Button asChild className="gradient-accent text-accent-foreground" data-analytics-id="cta_start_professional">
                        <Link to="/contact">Start with Professional</Link>
                      </Button>
                    ) : (
                      <Button asChild variant="outline" data-analytics-id={`cta_select_${t.tier.toLowerCase().replace(/\s+/g,'_')}`}>
                        <Link to="/contact">Choose {t.tier}</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">Unsure which tier fits? <Link to="/contact" className="underline underline-offset-4">Book a roadmap call</Link>.</div>

          <div className="mt-10">
            <h2 className="mb-4">Questions</h2>
            <Accordion type="single" collapsible className="mt-4">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-dp-border">
                  <AccordionTrigger className="focus:outline-none focus:ring-2 focus:ring-dp-accent">{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-10">
            <Card className="bg-dp-panel border border-dp-border rounded-2xl">
              <CardContent className="p-8">
                <figure className="max-w-4xl mx-auto text-center">
                  <blockquote className="text-xl md:text-2xl font-medium">
                    “Clearline delivered a clean, fast site that finally reflects our expertise. Inquiries are up and the quality is higher.”
                  </blockquote>
                  <figcaption className="mt-3 text-sm text-muted-foreground">Managing Partner, Boutique Firm</figcaption>
                </figure>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="gradient-accent text-accent-foreground" data-analytics-id="cta_request_custom_quote">
              <Link to="/contact">Request Custom Quote</Link>
            </Button>
            <Button asChild variant="outline" data-analytics-id="cta_book_roadmap_call">
              <Link to="/contact">Book a Roadmap Call</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
