import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

const allFaqs = [
  { q: 'How long does a standard engagement take?', a: 'Most standard sites are completed in 2–4 weeks depending on scope and feedback. Complex builds can take 6–8 weeks.' },
  { q: 'What platforms/CMS do you support?', a: 'We build hand-coded, ownership-first sites. If you need a CMS, we integrate lightweight options that avoid lock-in.' },
  { q: 'How do you ensure performance and SEO?', a: 'Core Web Vitals, caching/CDN, responsive images, and on-page SEO best practices from the start—measured pre/post launch.' },
  { q: 'Do we own our code and assets?', a: 'Yes. You own the code, assets, and accounts. No proprietary platform or recurring lock-in.' },
  { q: 'What happens after launch?', a: 'We offer care/optimization plans for updates, analytics reviews, and enhancements—no mandatory retainers.' },
  { q: 'How do document uploads work?', a: 'We use secure, short‑lived signed URLs so files go directly from your browser to your storage provider. You keep ownership and control.' },
  { q: 'Are uploads secure?', a: 'Yes. Uploads use short‑lived credentials (pre‑signed URLs/parameters). Your secret keys are never exposed to the browser.' },
  { q: 'How do payments work?', a: 'Secure one‑time payments via Stripe Checkout. We never store card details; Stripe sends your receipt.' },
  { q: 'Is the AI Website Feedback free?', a: 'There’s a limited daily quota. If you hit the limit, try later or contact us for extended access.' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allFaqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const FAQPage = () => {
  const [query, setQuery] = useState('');
  const faqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allFaqs;
    return allFaqs.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q));
  }, [query]);

  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/faq` : '/faq';
  return (
    <Layout>
      <Helmet>
        <title>FAQ – Clearline Studio</title>
        <meta name="description" content="Answers to common questions about scope, timelines, ownership, performance, and support." />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="py-16 md:py-20 bg-dp-bg text-dp-text">
        <div className="container mx-auto px-4">
          <header className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h1>
            <p className="mt-4 text-muted-foreground">Straight answers about timelines, scope, and outcomes.</p>
          </header>

          <main className="mt-10 max-w-3xl mx-auto">
            <label htmlFor="faq-search" className="sr-only">Search questions</label>
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="mt-6 mb-4 px-4 py-3 rounded-lg bg-dp-bg border border-dp-border text-dp-text focus:outline-none focus:ring-2 focus:ring-dp-accent w-full"
            />

            <section aria-labelledby="faq-list">
              <h2 id="faq-list" className="sr-only">FAQ List</h2>
              <div className="accordion divide-y divide-dp-border bg-dp-panel border border-dp-border rounded-2xl">
                <Accordion type="single" collapsible className="space-y-0">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="row p-6">
                      <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>

            <aside className="mt-10 grid gap-4 sm:grid-cols-2">
              <Link to="/pricing" className="block border border-dp-border rounded-md p-4 hover:bg-muted/30 transition-smooth">
                <span className="font-medium">View Pricing</span>
                <p className="text-sm text-muted-foreground">Compare tiers and deliverables.</p>
              </Link>
              <Link to="/contact" className="block border border-dp-border rounded-md p-4 hover:bg-muted/30 transition-smooth">
                <span className="font-medium">Contact Us</span>
                <p className="text-sm text-muted-foreground">Didn’t see your question? Reach out.</p>
              </Link>
            </aside>
          </main>
        </div>
      </section>
    </Layout>
  );
};

export default FAQPage;
