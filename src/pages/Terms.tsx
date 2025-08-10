import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Terms = () => {
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/terms` : '/terms';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service | Clearline Studio',
    url: canonical,
    description: 'Terms governing the use of Clearline Studio’s website and services, including payments, IP, confidentiality, and limitations.'
  };

  return (
    <Layout>
      <Helmet>
        <title>Terms of Service | Clearline Studio</title>
        <meta name="description" content="Terms governing the use of our website and services: payments, refunds, IP, confidentiality, limitations, and more." />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section id="top" className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <header className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Terms of Service</h1>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: August 2025</p>
          </header>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            <aside className="lg:col-span-4">
              <nav aria-label="Table of contents" className="sticky top-24 bg-muted/30 border border-border rounded-lg p-4">
                <h2 className="text-sm font-semibold text-foreground">On this page</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><a className="hover:text-accent transition-smooth" href="#acceptance">1) Acceptance of Terms</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#services">2) Services</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#payments">3) Quotes, Payments & Invoices</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#cancellations">4) Cancellations & Refunds</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#client-responsibilities">5) Client Responsibilities</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#ip">6) Intellectual Property</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#confidentiality">7) Confidentiality</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#warranties">8) Warranties & Disclaimers</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#liability">9) Limitation of Liability</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#third-party">10) Third‑Party Services</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#changes">11) Changes to Terms</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#law">12) Governing Law</a></li>
                  <li><a className="hover:text-accent transition-smooth" href="#contact">13) Contact</a></li>
                </ul>
              </nav>
            </aside>

            <article className="lg:col-span-8">
              <div className="prose prose-neutral max-w-none dark:prose-invert">
                <section id="acceptance">
                  <h2>1) Acceptance of Terms</h2>
                  <p>
                    By accessing our website or engaging our services, you agree to these Terms of Service. If you do not agree, please do not use the site or services.
                  </p>
                </section>

                <section id="services">
                  <h2>2) Services</h2>
                  <p>
                    We provide strategy, design, and development services, as described on our website or in a written proposal/statement of work (SOW). Scope, deliverables, and timelines are defined in the SOW.
                  </p>
                </section>

                <section id="payments">
                  <h2>3) Quotes, Payments & Invoices</h2>
                  <p>
                    Prices are quoted in USD unless noted otherwise. Payments are processed via trusted providers (e.g., Stripe). Invoices are due upon receipt unless otherwise agreed. Late payments may pause work.
                  </p>
                </section>

                <section id="cancellations">
                  <h2>4) Cancellations & Refunds</h2>
                  <p>
                    Due to the nature of professional services, fees for time spent and work delivered are non‑refundable. If you need to cancel, notify us promptly so we can minimize costs and re-schedule remaining work.
                  </p>
                </section>

                <section id="client-responsibilities">
                  <h2>5) Client Responsibilities</h2>
                  <p>
                    You agree to provide timely feedback, approvals, and access to required systems/content. Delays in feedback or access can affect timelines and costs.
                  </p>
                </section>

                <section id="ip">
                  <h2>6) Intellectual Property</h2>
                  <p>
                    Upon full payment, you receive a license or ownership to deliverables as defined in the SOW. Third‑party assets remain subject to their respective licenses. We may showcase non-confidential work in our portfolio.
                  </p>
                </section>

                <section id="confidentiality">
                  <h2>7) Confidentiality</h2>
                  <p>
                    Both parties agree to keep confidential information shared in the course of the project confidential and to use it only for the purposes of the engagement.
                  </p>
                </section>

                <section id="warranties">
                  <h2>8) Warranties & Disclaimers</h2>
                  <p>
                    Services are provided “as is.” We disclaim all warranties to the fullest extent permitted by law, including implied warranties of merchantability and fitness for a particular purpose.
                  </p>
                </section>

                <section id="liability">
                  <h2>9) Limitation of Liability</h2>
                  <p>
                    To the maximum extent permitted by law, Clearline Studio is not liable for indirect, incidental, or consequential damages. Our total liability is limited to the amount you paid for the specific service at issue.
                  </p>
                </section>

                <section id="third-party">
                  <h2>10) Third‑Party Services</h2>
                  <p>
                    We may integrate third‑party services (e.g., hosting, analytics, email). Their terms and privacy policies apply; we are not responsible for third‑party outages or changes.
                  </p>
                </section>

                <section id="changes">
                  <h2>11) Changes to Terms</h2>
                  <p>
                    We may update these terms from time to time. Continued use of the site or services after changes constitutes acceptance of the updated terms.
                  </p>
                </section>

                <section id="law">
                  <h2>12) Governing Law</h2>
                  <p>
                    These terms are governed by the laws of our principal place of business, without regard to conflict‑of‑law principles.
                  </p>
                </section>

                <section id="contact">
                  <h2>13) Contact</h2>
                  <p>
                    Questions about these terms? Email <a href="mailto:hello@clearlinestudio.com">hello@clearlinestudio.com</a> or visit our <Link to="/contact">Contact</Link> page.
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

export default Terms;
