import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

interface GuideTemplateProps {
  title: string;
  subtitle: string;
  bullets: string[];
  industry: string;
}

const GuideTemplate = ({ title, subtitle, bullets, industry }: GuideTemplateProps) => {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <Layout>
      <Helmet>
        <title>{`${industry} Quick Wins Guide | Clearline Studio`}</title>
        <meta name="description" content={`${industry} website quick wins guide. Practical, high-impact checklist you can implement today.`} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
            <p className="text-muted-foreground text-lg">{subtitle}</p>
          </header>
          <section className="bg-background rounded-lg shadow-sm p-6 md:p-8">
            <ol className="list-decimal pl-6 space-y-3">
              {bullets.map((b, i) => (
                <li key={i} className="text-foreground/90">{b}</li>
              ))}
            </ol>
            <div className="mt-8 flex justify-center">
              <Button onClick={() => window.print()} variant="secondary">Print / Save as PDF</Button>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default GuideTemplate;
