import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import LeadMagnet from '@/components/LeadMagnet';

const Resources = () => {
  const guides = [
    { title: 'Lawyers: 10 Quick Wins', href: '/guides/lawyers-quick-wins', desc: 'Actionable ideas to improve trust and conversion.' },
    { title: 'Accountants: 10 Quick Wins', href: '/guides/accountants-quick-wins', desc: 'Clarity, speed, and proof to win more engagements.' },
    { title: 'Consultants: 10 Quick Wins', href: '/guides/consultants-quick-wins', desc: 'Positioning, authority assets, and lead flow.' },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Insights & Resources | Clearline Studio</title>
        <meta name="description" content="Actionable strategies, guides, and tools to grow online. Download our SMB’s Guide to Website ROI." />
        <link rel="canonical" href="/resources" />
      </Helmet>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">Resources</Badge>
            <h1 className="mb-4">Insights & Resources</h1>
            <p className="text-lg text-muted-foreground">Actionable strategies and inspiration to help you grow online.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {guides.map((g) => (
              <Card key={g.href} className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-xl">
                    <Link to={g.href}>{g.title}</Link>
                  </CardTitle>
                  <CardDescription>{g.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline">
                    <Link to={g.href}>Read Guide</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <LeadMagnet
              industry="professional services"
              title="SMB’s Guide to Website ROI"
              description="A concise playbook to measure, improve, and communicate your website’s ROI."
              benefits={[
                "ROI model template",
                "10 CRO quick wins",
                "Analytics setup checklist",
                "Executive summary one-pager",
              ]}
              fileName="smb-website-roi.pdf"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/ai-feedback">Try the AI Website Reviewer</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/case-studies">See Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
