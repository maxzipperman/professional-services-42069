import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

import accountantsHero from '@/assets/accountants-hero.jpg';
import lawyersHero from '@/assets/lawyers-hero.jpg';
import consultantsHero from '@/assets/consultants-hero.jpg';
import performanceMetrics from '@/assets/performance-metrics.jpg';
import localBeforeAfter from '@/assets/local-before-after.jpg';
import professionalHero from '@/assets/clearline-hero-professional.jpg';


type Project = {
  title: string;
  client: string;
  industry: 'Accountants' | 'Law Firm' | 'Consultants' | 'Local Business' | 'Professional Services';
  capabilities: Array<'Design' | 'Build' | 'Performance' | 'SEO' | 'Messaging'>;
  result: string;
  summary: string;
  image: string;
  slug: string;
};

const allProjects: Project[] = [
  {
    title: 'Accountant Brand Refresh',
    client: 'North Shore Accounting',
    industry: 'Accountants',
    capabilities: ['Design', 'Build', 'SEO'],
    result: '+25% booked consultations',
    summary: 'Modern brand, faster site, clearer intake flow.',
    image: accountantsHero,
    slug: 'accountant-brand-refresh',
  },
  {
    title: 'Law Firm Speed Overhaul',
    client: 'Mason & Cole LLP',
    industry: 'Law Firm',
    capabilities: ['Performance', 'Build', 'SEO'],
    result: '6s → 1.2s, +27% inquiries',
    summary: 'Performance rebuild with trust-first layout and CTAs.',
    image: lawyersHero,
    slug: 'law-firm-speed-overhaul',
  },
  {
    title: 'Consulting Authority Site',
    client: 'Oakridge Advisory',
    industry: 'Consultants',
    capabilities: ['Design', 'Messaging', 'Build'],
    result: '+38% proposal acceptance',
    summary: 'Positioning and editorial polish for expertise signals.',
    image: consultantsHero,
    slug: 'consulting-authority-site',
  },
  {
    title: 'Local Services Conversion Lift',
    client: 'Harbor HVAC',
    industry: 'Local Business',
    capabilities: ['Design', 'Build', 'SEO'],
    result: '+2.1x calls from mobile',
    summary: 'Click-to-call and location trust, tuned for speed.',
    image: localBeforeAfter,
    slug: 'local-services-conversion',
  },
  {
    title: 'Professional Site Replatform',
    client: 'Clarity Legal Ops',
    industry: 'Professional Services',
    capabilities: ['Build', 'Performance'],
    result: 'CWV “Good”, +19% demo requests',
    summary: 'From page builders to hand-coded performance.',
    image: professionalHero,
    slug: 'professional-site-replatform',
  },
  {
    title: 'Technical SEO + Image Pipeline',
    client: 'Atlas Finance',
    industry: 'Professional Services',
    capabilities: ['Performance', 'SEO'],
    result: '+31 Lighthouse SEO, -60% transfer',
    summary: 'Caching, srcset, and structured data overhaul.',
    image: performanceMetrics,
    slug: 'technical-seo-image-pipeline',
  },
];

const industries = ['All', ...Array.from(new Set(allProjects.map(p => p.industry)))] as const;
const capabilities = ['All', 'Design', 'Build', 'Performance', 'SEO', 'Messaging'] as const;

const Portfolio = () => {
  const [industry, setIndustry] = useState<(typeof industries)[number]>('All');
  const [capability, setCapability] = useState<(typeof capabilities)[number]>('All');

  const projects = useMemo(() => {
    return allProjects.filter(p =>
      (industry === 'All' || p.industry === industry) &&
      (capability === 'All' || p.capabilities.includes(capability as any))
    );
  }, [industry, capability]);

  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/portfolio` : '/portfolio';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Clearline Portfolio',
    url: canonical,
  };

  return (
    <Layout>
      <Helmet>
        <title>Portfolio | Clearline Studio</title>
        <meta name="description" content="Browse selected projects and case studies for professional services clients." />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Clearline Studio Portfolio" />
        <meta property="og:description" content="Curated work that showcases authority and results." />
        <meta property="og:image" content="/clearline-portfolio-hero.jpg" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Our Work</Badge>
            <h1 className="mb-3">Portfolio & Case Studies</h1>
            <p className="text-lg text-muted-foreground">
              Selective work that signals expertise and delivers measurable outcomes.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Each case highlights goals, approach, and results—see how we think and what we deliver.
            </p>
          </div>

          {/* Filters */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="filters flex flex-wrap gap-3 items-center">
              <span className="text-sm text-muted-foreground">Industry:</span>
              {industries.map(opt => (
                <Button
                  key={opt}
                  variant={industry === opt ? 'default' : 'outline'}
                  aria-pressed={industry === opt}
                  onClick={() => setIndustry(opt)}
                  className="h-9"
                >
                  {opt}
                </Button>
              ))}
            </div>
            <div className="filters flex flex-wrap gap-3 items-center">
              <span className="text-sm text-muted-foreground">Capability:</span>
              {capabilities.map(opt => (
                <Button
                  key={opt}
                  variant={capability === opt ? 'default' : 'outline'}
                  aria-pressed={capability === opt}
                  onClick={() => setCapability(opt)}
                  className="h-9"
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {projects.map((p) => (
              <article key={p.slug} className="bg-dp-panel border border-dp-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/case/${p.slug}`} aria-label={`View case study: ${p.title}`}>
                  <img
                    src={p.image}
                    alt={`${p.client} — ${p.title}`}
                    loading="lazy"
                    className="w-full h-44 object-cover"
                    srcSet={`${p.image} 1x`}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </Link>
                <Card className="border-0 rounded-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{p.client}</CardTitle>
                    <p className="text-primary font-medium">{p.result}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground">{p.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge aria-hidden className="capitalize" variant="secondary">{p.industry}</Badge>
                      {p.capabilities.map(c => (
                        <Badge key={c} aria-hidden variant="outline" className="capitalize">{c}</Badge>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button asChild variant="link">
                        <Link to={`/case/${p.slug}`}>Read case study →</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" data-cta="discuss_your_project">
              <Link to="/contact">Discuss Your Project</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
