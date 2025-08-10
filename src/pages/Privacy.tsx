import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Privacy = () => {
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/privacy` : '/privacy';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy | Clearline Studio',
    url: canonical,
    description: 'How Clearline Studio collects, uses, and protects your data, including cookies, analytics, payments, email delivery, and AI features.'
  };

  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | Clearline Studio</title>
        <meta name="description" content="How we collect, use, and protect your data. Clearline Studio privacy policy covering cookies, analytics, payments, and email." />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section id="top" className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <header className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Privacy Policy</h1>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: August 2025</p>
          </header>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            <aside className="lg:col-span-4">
              <nav aria-label="Table of contents" className="sticky top-24 bg-muted/30 border border-border rounded-lg p-4">
                <h2 className="text-sm font-semibold text-foreground">On this page</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><a className="hover:text-accent transition-smooth" href="#overview">Overview</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#information-we-collect">Information We Collect</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#how-we-use">How We Use Information</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#cookies-analytics">Cookies & Analytics</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#payments">Payments</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#email-delivery">Email Delivery & Resources</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#ai-features">AI Features</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#data-retention">Data Retention</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#your-rights">Your Rights</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#contact">Contact</a></li>
                </ul>
              </nav>
            </aside>

            <article className="lg:col-span-8">
              <div className="prose prose-neutral max-w-none dark:prose-invert">
                <section id="overview">
                  <h2>Overview</h2>
                  <p>
                    Clearline Studio ("we", "us") is committed to protecting your privacy. This policy explains what we collect, how we use
                    information, and the choices you have. By using our website or services, you agree to this policy.
                  </p>
                </section>

                <section id="information-we-collect">
                  <h2>Information We Collect</h2>
                  <ul>
                    <li><strong>Contact data</strong> (name, email, phone) when you submit forms or book calls.</li>
                    <li><strong>Usage data</strong> (pages visited, interactions, device/browser info) for analytics and performance.</li>
                    <li><strong>Files</strong> you upload for reviews or projects (if applicable).</li>
                    <li><strong>Payment metadata</strong> via Stripe (amount, time, status). We never store card numbers.</li>
                  </ul>
                </section>

                <section id="how-we-use">
                  <h2>How We Use Information</h2>
                  <ul>
                    <li>To provide and improve services you request.</li>
                    <li>To send requested resources and transactional emails.</li>
                    <li>To analyze usage, improve performance, and maintain security.</li>
                    <li>To comply with legal obligations.</li>
                  </ul>
                </section>

                <section id="cookies-analytics">
                  <h2>Cookies & Analytics</h2>
                  <p>
                    We use cookies and similar technologies for essential functionality and analytics. You can control cookies in your browser settings.
                    Analytics tools report aggregated, non-identifying usage trends.
                  </p>
                </section>

                <section id="payments">
                  <h2>Payments</h2>
                  <p>
                    Payments are processed securely by Stripe. Card details are handled by Stripe and never touch our servers. We receive payment
                    confirmations and basic order metadata to fulfill services.
                  </p>
                </section>

                <section id="email-delivery">
                  <h2>Email Delivery & Resources</h2>
                  <p>
                    When you request a guide or resource, we send it by email (using providers like Resend). You can unsubscribe from non-transactional emails at any time.
                  </p>
                </section>

                <section id="ai-features">
                  <h2>AI Features</h2>
                  <p>
                    If you use AI feedback features, we process the inputs you provide to generate responses. We may retain prompts and outputs for
                    quality and abuse prevention.
                  </p>
                </section>

                <section id="data-retention">
                  <h2>Data Retention</h2>
                  <p>
                    We keep information only as long as necessary to provide services, meet legal obligations, or resolve disputes. You may request deletion subject to legal requirements.
                  </p>
                </section>

                <section id="your-rights">
                  <h2>Your Rights</h2>
                  <p>
                    You may request access, correction, or deletion of your personal data. To exercise your rights, contact us using the details below.
                  </p>
                </section>

                <section id="contact">
                  <h2>Contact</h2>
                  <p>
                    Questions about this policy? Reach out at <a href="mailto:hello@clearlinestudio.com">hello@clearlinestudio.com</a> or use our <Link to="/contact">Contact</Link> page.
                  </p>
                </section>

                <p className="mt-10 text-sm text-muted-foreground"><a href="#top" className="hover:text-accent transition-smooth">Back to top</a></p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
