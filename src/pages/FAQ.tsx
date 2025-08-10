import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: 'How do document uploads work?',
    a: 'We use secure, short‑lived signed URLs so files go directly from your browser to your storage provider (no large files passing through our servers). You keep ownership and control.'
  },
  {
    q: 'What file types and size limits are supported?',
    a: 'Common types like images and PDFs are supported by default, with a typical 10MB limit. Both file types and size limits are configurable for your needs.'
  },
  {
    q: 'Where are files stored?',
    a: 'We can connect to your preferred storage (S3, Cloudflare R2, GCS, Azure, Supabase Storage, etc.). You pay your provider directly; we do not add platform fees.'
  },
  {
    q: 'Are uploads secure?',
    a: 'Yes. Uploads use short‑lived credentials (pre‑signed URLs/parameters). Your secret keys are never exposed to the browser.'
  },
  {
    q: 'Can you enforce limits or auto‑delete temp files?',
    a: 'Yes. We enforce limits in the UI and backend, and can set lifecycle policies (e.g., auto‑delete temporary files) to control costs.'
  },
  {
    q: 'AI Website Feedback — is it free?',
    a: 'There is a limited free daily quota. If you hit the limit, try again later or contact us for extended access.'
  },
  {
    q: 'How do payments work?',
    a: 'We process secure one‑time payments via Stripe Checkout. You’ll receive an email receipt from Stripe. We never see or store your card details.'
  },
  {
    q: 'Do you store my payment information?',
    a: 'No. Stripe handles all payment details. Clearline Studio only receives confirmation and basic order metadata.'
  },
  {
    q: 'What’s the typical project timeline?',
    a: "Simple projects can usually be completed within a week or two, and more complex work can take up to 6–8 weeks depending on client feedback.",
  },
  {
    q: 'How do I get support?',
    a: 'Use the Contact page to reach our team. We typically respond within one business day.'
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const FAQPage = () => {
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/faq` : '/faq';
  return (
    <Layout>
      <Helmet>
        <title>Frequently Asked Questions (FAQ) | Clearline Studio</title>
        <meta name="description" content="Answers about uploads, security, Stripe payments, AI feedback limits, and timelines. Clearline Studio FAQ." />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <header className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h1>
            <p className="mt-4 text-muted-foreground">
              Quick answers about uploads, security, payments, AI feedback, and timelines.
            </p>
          </header>

          <main className="mt-10 max-w-3xl mx-auto">
            <section aria-labelledby="faq-list">
              <h2 id="faq-list" className="sr-only">FAQ List</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="bg-muted/20 rounded-lg px-6">
                    <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <aside className="mt-10 grid gap-4 sm:grid-cols-2">
              <Link to="/services" className="block border border-border rounded-md p-4 hover:bg-muted/30 transition-smooth">
                <span className="font-medium text-foreground">Explore Services</span>
                <p className="text-sm text-muted-foreground">See what we offer and how we work.</p>
              </Link>
              <Link to="/contact" className="block border border-border rounded-md p-4 hover:bg-muted/30 transition-smooth">
                <span className="font-medium text-foreground">Contact Us</span>
                <p className="text-sm text-muted-foreground">Have a specific question? Get in touch.</p>
              </Link>
            </aside>
          </main>
        </div>
      </section>
    </Layout>
  );
};

export default FAQPage;
