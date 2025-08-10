import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Pricing = () => {
  const packages = [
    {
      name: 'Website Refresh',
      price: '$995',
      desc: 'Quick updates to improve your existing site\'s performance and conversion.',
      bullets: [
        { text: 'Performance optimization', detail: 'Speed improvements, image optimization, code minification for faster load times' },
        { text: 'Mobile responsiveness fixes', detail: 'Ensure your site works perfectly on all devices and screen sizes' },
        { text: 'Basic SEO improvements', detail: 'Meta tags, alt text, basic keyword optimization for better search rankings' },
        { text: 'CTA and form optimization', detail: 'Improve button placement, form usability, and conversion paths' },
      ],
    },
    {
      name: 'Professional Site',
      price: '$2,495',
      desc: 'Clean, professional 3-5 page site built for results.',
      bullets: [
        { text: 'Custom design + responsive build', detail: 'Fully custom design tailored to your brand, built to work on all devices' },
        { text: 'On-page SEO setup', detail: 'Complete SEO foundation with optimized content, schema markup, and technical SEO' },
        { text: 'Contact forms + analytics', detail: 'Lead capture forms with spam protection plus Google Analytics setup' },
        { text: 'Performance optimization', detail: 'Fast loading times with 90+ Lighthouse performance scores' },
      ],
    },
    {
      name: 'Growth Platform',
      price: '$4,500',
      desc: 'Strategy-driven site with advanced features and CRO focus.',
      bullets: [
        { text: 'Brand messaging framework', detail: 'Clear value proposition, messaging hierarchy, and compelling copy strategy' },
        { text: 'Custom design system', detail: 'Cohesive visual identity with reusable components and style guidelines' },
        { text: 'Lead capture optimization', detail: 'Advanced forms, pop-ups, and conversion-focused landing page elements' },
        { text: 'Analytics + conversion tracking', detail: 'Goal tracking, event monitoring, and detailed performance reporting setup' },
      ],
    },
    {
      name: 'Custom Solution',
      price: '$8,000+',
      desc: 'Fully custom platform with integrations and advanced requirements.',
      bullets: [
        { text: 'Complete UX strategy workshops', detail: 'User research, journey mapping, wireframing, and usability testing' },
        { text: 'Custom features + integrations', detail: 'Third-party APIs, databases, payment systems, and custom functionality' },
        { text: 'Scalable architecture', detail: 'Enterprise-grade hosting, CDN setup, and infrastructure planning' },
        { text: 'Comprehensive analytics plan', detail: 'Advanced tracking, custom dashboards, and detailed performance reporting' },
      ],
    },
  ];

  const retainers = [
    { name: 'Basic Care', price: '$99/mo', features: 'Hosting, backups, security, updates, email support' },
    { name: 'Growth Care', price: '$299/mo', features: 'Basic + 5 hrs updates/mo, monthly reports, priority support' },
    { name: 'Pro Care', price: '$699/mo', features: 'Growth + SEO, CRO optimization, content support' },
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
            <TooltipProvider>
              {packages.map((p) => (
                <Card key={p.name} className="hover-lift shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-xl">{p.name}</CardTitle>
                    <p className="text-primary font-semibold">{p.price}</p>
                    <CardDescription>{p.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      {p.bullets.map((bullet, index) => (
                        <li key={`${p.name}-${index}`}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help hover:text-foreground transition-colors">
                                {bullet.text}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{bullet.detail}</p>
                            </TooltipContent>
                          </Tooltip>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </TooltipProvider>
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
