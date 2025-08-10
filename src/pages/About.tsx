import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
const founderPhotoUrl = '/lovable-uploads/2a6e14bc-b206-4b6d-b81c-f36e7afc008d.png';

const About = () => {
  const canonical = typeof window !== 'undefined' 
    ? `${window.location.origin}/about` 
    : '/about';

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Clearline Studio',
    url: typeof window !== 'undefined' ? window.location.origin : '',
  };

  return (
    <Layout>
      <Helmet>
        <title>About Clearline Studio | Hand-Coded Websites</title>
        <meta 
          name="description" 
          content="About Clearline Studio—Ex‑Google with 15+ years in mobile and web. I build fast, SEO‑first sites for professional services and local businesses." 
        />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      </Helmet>

      <header className="pt-24 pb-12 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">About</Badge>
            <h1 className="mb-4">About Clearline Studio</h1>
            <p className="text-lg text-muted-foreground">
              I build fast, secure, and conversion-focused websites—without lock-in or monthly platform fees.
            </p>
          </div>
        </div>
      </header>

      <main>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <article className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
              <div>
                <figure>
                  <img
                    src={founderPhotoUrl}
                    alt="Founder with his golden retriever, Chuck, in Los Angeles"
                    loading="lazy"
                    className="w-full h-auto rounded-xl border border-border shadow-large"
                  />
                  <figcaption className="mt-2 text-sm text-muted-foreground">
                    I live in Los Angeles with my golden retriever, Chuck.
                  </figcaption>
                </figure>
              </div>
              <div>
                <h2 className="mb-4">Hi, I’m the founder behind Clearline</h2>
                <p className="text-muted-foreground mb-4">
                  Before Clearline, I spent nearly a decade at Google and have 15+ years working across the mobile app and website ecosystem.
                  I bring a unique blend of consulting, business acumen, technical know-how, and SEO experience to every engagement.
                </p>
                <p className="text-muted-foreground mb-4">
                  I partner with professional services and local businesses to launch websites that load instantly,
                  rank well, and convert visitors into clients.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Philosophy</h3>
                    <p className="text-muted-foreground">
                      Keep it clear, fast, and maintainable. I hand-code using modern tooling so your site stays
                      lightweight, accessible, and easy to evolve.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">How we’ll work</h3>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Discovery to align on goals and audience</li>
                      <li>Messaging and design that communicate value</li>
                      <li>Hand-coded build with a performance-first approach</li>
                      <li>Launch with analytics, SEO, and a simple handoff</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">What you can expect</h3>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Clear roadmaps and transparent pricing</li>
                      <li>Senior-level attention and thoughtful communication</li>
                      <li>Performance, accessibility, and SEO baked in from day one</li>
                      <li>Measurable results and practical recommendations</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild className="gradient-accent text-accent-foreground">
                    <Link to="/contact">Book your strategy call</Link>
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default About;
