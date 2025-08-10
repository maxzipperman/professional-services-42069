import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const cases = [
  { id: 1, industry: 'Lawyers', title: 'Boutique firm: +75% qualified inquiries', problem: 'Outdated site failed to convey specialization.', solution: 'Rebuilt with focused case studies and streamlined booking.', result: '75% increase in qualified inquiries; +40% avg. case value.' },
  { id: 2, industry: 'Accountants', title: 'Regional CPA: +35% consultation requests', problem: 'Low trust due to generic messaging.', solution: 'Industry-specific proof points and service pages.', result: '+35% consultation requests; higher close rate.' },
  { id: 3, industry: 'Consultants', title: 'Ops consultancy: +28% lead quality', problem: 'Unclear positioning and scattered CTAs.', solution: 'Clear ICP messaging and frictionless funnel.', result: '+28% MQL quality; shorter sales cycles.' },
];

const industries = ['All', 'Lawyers', 'Accountants', 'Consultants'] as const;

const CaseStudies = () => {
  return (
    <Layout>
      <Helmet>
        <title>Case Studies | Clearline Studio</title>
        <meta name="description" content="Problem → Solution → Result stories for law firms, accountants, and consultants. Realistic sample metrics as placeholders." />
        <link rel="canonical" href="/case-studies" />
      </Helmet>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <header className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="mb-4 text-primary">Case Studies</h1>
            <p className="text-lg text-muted-foreground">Explore how strategy-led websites drive measurable outcomes.</p>
          </header>

          <Tabs defaultValue="All" className="max-w-5xl mx-auto">
            <TabsList className="flex flex-wrap justify-center gap-2">
              {industries.map((i) => (
                <TabsTrigger key={i} value={i}>{i}</TabsTrigger>
              ))}
            </TabsList>
            {industries.map((i) => (
              <TabsContent key={i} value={i} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cases.filter(c => i === 'All' || c.industry === i).map((c) => (
                    <Card key={c.id} className="shadow-soft">
                      <CardHeader>
                        <CardTitle className="text-lg">{c.title}</CardTitle>
                        <div className="text-sm text-muted-foreground">{c.industry}</div>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm text-muted-foreground">
                        <p><strong>Problem:</strong> {c.problem}</p>
                        <p><strong>Solution:</strong> {c.solution}</p>
                        <p><strong>Result:</strong> {c.result}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudies;
