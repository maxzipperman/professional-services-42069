import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Portfolio = () => {
  const projects = [
    {
      title: 'Accountant Brand Refresh',
      result: '25% more booked consultations',
      summary: 'Modernized brand, faster site, clearer services and intake flow.',
    },
    {
      title: 'Law Firm Speed Overhaul',
      result: '6s → 1.2s load time, +27% inquiries',
      summary: 'Performance rebuild with trust-first layout and clear CTAs.',
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Portfolio | Position Digital</title>
        <meta name="description" content="Selected client work and performance wins across professional services and local businesses." />
        <link rel="canonical" href="/portfolio" />
      </Helmet>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">Our Work</Badge>
            <h1 className="mb-4">Selected Projects & Results</h1>
            <p className="text-lg text-muted-foreground">A few examples of outcomes delivered for clients. More on request.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projects.map((p, i) => (
              <Card key={i} className="hover-lift shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl">{p.title}</CardTitle>
                  <p className="text-primary font-medium">{p.result}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{p.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
