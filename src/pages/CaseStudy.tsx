import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CaseStudy = () => {
  const { slug } = useParams();
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/case/${slug ?? ''}` : `/case/${slug ?? ''}`;

  return (
    <Layout>
      <Helmet>
        <title>Case Study | Clearline Studio</title>
        <meta name="description" content="Selected client work and outcomes from Clearline Studio." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="mb-3">Case Study</h1>
          <p className="text-muted-foreground">This case study page is coming soon. In the meantime, explore more work or get in touch.</p>

          <div className="mt-8 flex gap-3">
            <Button asChild variant="outline"><Link to="/portfolio">Back to Portfolio</Link></Button>
            <Button asChild><Link to="/contact" data-cta="case_contact">Discuss Your Project</Link></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudy;
