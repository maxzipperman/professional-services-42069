import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
const founderPhotoUrl = '/lovable-uploads/aa7fbfa2-499c-4e0b-9795-9aec6456f870.png';

const team = [
  { name: 'Max', role: 'Founder, Lead Engineer', photo: founderPhotoUrl },
  { name: 'Ava', role: 'Design & UX', photo: '/placeholder.svg' },
  { name: 'Liam', role: 'SEO & Content Systems', photo: '/placeholder.svg' },
];

const milestones = [
  { year: '2022', title: 'Clearline founded', desc: 'Hand-coded, ownership-first builds for services firms.' },
  { year: '2023', title: '20+ launches', desc: 'Performance and SEO frameworks mature across niches.' },
  { year: '2024', title: 'CWV “Good” baseline', desc: 'Systematic image pipelines, caching, and accessibility.' },
  { year: 'Today', title: 'Outcomes focus', desc: 'Messaging, design systems, and CRO as a practice.' },
];

const About = () => {
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/about` : '/about';

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Clearline Studio',
    url: canonical,
  };

  return (
    <Layout>
      <Helmet>
        <title>About Us – Clearline Studio</title>
        <meta name="description" content="Meet the studio behind premium, performance-first websites for professional services." />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
      </Helmet>

      <header className="pt-20 md:pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">About</Badge>
            <h1 className="mb-3">About Clearline Studio</h1>
            <p className="text-lg text-muted-foreground">Craftsmanship, performance, and a partnership mindset.</p>
          </div>
        </div>
      </header>

      <main>
        {/* Founder intro */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <article className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
              <div>
                <figure>
                  <img
                    src={founderPhotoUrl}
                    alt="Founder portrait"
                    loading="lazy"
                    className="w-full h-auto rounded-xl border border-border shadow-large"
                  />
                  <figcaption className="mt-3 text-sm text-muted-foreground md:text-center leading-relaxed">
                    We build fast, secure, and conversion-focused websites—without lock-in or monthly platform fees.
                  </figcaption>
                </figure>
              </div>
              <div>
                <h2 className="mb-4">Why we build the way we do</h2>
                <p className="text-muted-foreground mb-4">We build by hand, optimize obsessively, and measure outcomes. Your site should be an asset you own—not a subscription you rent.</p>
                <p className="text-muted-foreground">Integrity, quality, transparency, and ownership guide our process from discovery to launch.</p>
                <div className="mt-6 flex gap-3">
                  <Button asChild variant="outline"><Link to="/services">View Services</Link></Button>
                  <Button asChild data-cta="about_start_project"><Link to="/contact">Start Your Project</Link></Button>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Milestone timeline */}
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="mb-6">Milestones</h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {milestones.map((m) => (
                <li key={m.title} className="bg-dp-panel border border-dp-border rounded-2xl p-6">
                  <div className="text-sm text-muted-foreground">{m.year}</div>
                  <div className="font-medium">{m.title}</div>
                  <p className="text-muted-foreground mt-1">{m.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Team grid */}
        <section className="py-4">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="mb-6">Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
              {team.map((t) => (
                <Card key={t.name} className="bg-dp-panel border-dp-border">
                  <CardContent className="p-6">
                    <img src={t.photo} alt={`${t.name} – ${t.role}`} className="w-full h-44 object-cover rounded-lg border border-border" loading="lazy" />
                    <div className="mt-4">
                      <div className="font-medium">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Ownership promise callout */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-dp-panel border border-dp-border rounded-2xl p-8">
              <h2 className="mb-2">Ownership, not lock‑in</h2>
              <p className="text-muted-foreground">You own your code, content, and accounts. No proprietary platform, no recurring lock-ins—just a site engineered for speed, clarity, and control.</p>
              <div className="mt-6 flex gap-3">
                <Button asChild variant="outline"><Link to="/services">View Services</Link></Button>
                <Button asChild data-cta="about_cta_contact"><Link to="/contact">Start Your Project</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default About;
