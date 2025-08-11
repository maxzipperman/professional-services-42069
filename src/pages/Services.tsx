import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PenTool, Zap, MessageSquare, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: PenTool,
      title: 'Web Design & Build',
      desc: 'Bespoke design + hand-coded builds for professional services. Accessibility, security, and editorial polish baked in.',
    },
    {
      icon: Zap,
      title: 'Performance Engineering',
      desc: 'Core Web Vitals, caching/CDN, image pipelines, and technical SEO.',
    },
    {
      icon: MessageSquare,
      title: 'Brand Messaging',
      desc: 'Positioning and page-level messaging so your expertise is unmistakable.',
    },
    {
      icon: Shield,
      title: 'Care & Optimization',
      desc: 'Privacy/security updates, uptime monitoring, analytics reviews, and small enhancements.',
    },
  ];

  const steps = [
    { k: '01', t: 'Discovery', d: 'Goals, audience, and differentiation. Site architecture and success metrics.' },
    { k: '02', t: 'Design', d: 'Visual system, page layouts, and editorial-quality content.' },
    { k: '03', t: 'Development', d: 'Hand-coded build, accessibility, performance, and QA.' },
    { k: '04', t: 'Launch', d: 'Deploy, monitor, and measure. Optional care plan.' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Clearline Services',
    url: 'https://www.clearlinestudio.com/services',
  };

  return (
    <Layout>
      <Helmet>
        <title>Services | Clearline Studio</title>
        <meta name="description" content="Premium custom websites for professional services. Performance, accessibility, and ownership-first builds." />
        <link rel="canonical" href="/services" />
        <meta property="og:title" content="Clearline Studio Services" />
        <meta property="og:description" content="From bespoke design to performance engineering, our builds signal authority and convert." />
        <meta property="og:image" content="/clearline-services-hero.jpg" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Intro */}
      <section className="bg-dp-bg text-dp-text py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="mb-3">Services</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Custom websites engineered for authority, performance, and long-term ownership.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="gradient-accent text-accent-foreground" data-analytics-id="cta_services_portfolio">
              <Link to="/portfolio">See Portfolio</Link>
            </Button>
            <Button asChild variant="outline" data-analytics-id="cta_services_strategy_call">
              <Link to="/contact">Book a Strategy Call</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <Card key={s.title} className="bg-dp-panel border border-dp-border rounded-2xl p-0 shadow-dp-card">
                <CardHeader className="p-8 pb-4">
                  <div className="flex items-center gap-3">
                    <s.icon className="h-6 w-6 text-dp-accent" aria-hidden="true" />
                    <CardTitle className="text-lg">{s.title}</CardTitle>
                  </div>
                  <CardDescription className="mt-3">{s.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Process timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            {steps.map((st) => (
              <Card key={st.k} className="bg-dp-panel border border-dp-border rounded-2xl p-0">
                <CardContent className="p-8">
                  <div className="text-sm text-muted-foreground">{st.k}</div>
                  <h3 className="text-xl font-semibold mt-1">{st.t}</h3>
                  <p className="mt-2 text-muted-foreground">{st.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Teasers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <Card className="bg-dp-panel border border-dp-border rounded-2xl p-0">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold">Transparent Pricing</h3>
                <p className="text-muted-foreground mt-2">See tiers that scale with your ambition.</p>
                <div className="mt-4">
                  <Button asChild variant="outline" data-analytics-id="cta_services_pricing">
                    <Link to="/pricing">View Pricing</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-dp-panel border border-dp-border rounded-2xl p-0">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold">Questions?</h3>
                <p className="text-muted-foreground mt-2">Read our most common answers about scope and process.</p>
                <div className="mt-4">
                  <Button asChild variant="outline" data-analytics-id="cta_services_faq">
                    <Link to="/faq">Read FAQ</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
