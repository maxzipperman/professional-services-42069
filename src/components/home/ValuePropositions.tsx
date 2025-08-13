import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { valuePillars } from '@/data/home';

const ValuePropositions = () => (
  <section className="py-12 lg:py-16 bg-dp-bg">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="mb-6 text-dp-text">Our Strategic Approach</h2>
        <p className="text-lg text-dp-text/80">
          We don't just build websites — we architect digital platforms that systematically build trust and convert prospects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {valuePillars.map((pillar, index) => (
          <Card
            key={index}
            className="bg-dp-panel border border-dp-border rounded-2xl p-8 shadow-dp-card hover:shadow-lg transition-shadow text-center"
          >
            <CardHeader>
              <div className="w-16 h-16 bg-dp-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <pillar.icon className="h-6 w-6 text-dp-accent" />
              </div>
              <CardTitle className="text-xl text-dp-text">{pillar.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-dp-text/70">
                {pillar.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default ValuePropositions;

