import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';

const Resources = () => {
  return (
    <Layout>
      <Helmet>
        <title>Blog & Resources | Clearline Studio</title>
        <meta name="description" content="Articles and guides on strategy-led websites, SEO, and conversion for professional services." />
        <link rel="canonical" href="/resources" />
      </Helmet>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <header className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="mb-4 text-primary">Blog & Resources</h1>
            <p className="text-lg text-muted-foreground">Helpful content for law firms, accountants, and consultants. Coming soon.</p>
          </header>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
