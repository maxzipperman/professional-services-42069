import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { specializations } from '@/data/home';

const Specializations = () => (
  <section className="py-12 lg:py-16 bg-dp-bg">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="mb-6 text-dp-text">Specialized Expertise for Professional Services</h2>
        <p className="text-lg text-dp-text/80">
          We understand the unique challenges and opportunities in professional services.
          Our industry-specific approach ensures your website speaks directly to your target clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {specializations.map((industry, index) => (
          <Card
            key={index}
            className="bg-dp-panel border border-dp-border rounded-2xl shadow-dp-card hover:shadow-lg transition-shadow group cursor-pointer text-center"
          >
            <Link
              to={industry.href}
              data-cta={`specialization - ${industry.title}`}
              className="block p-8"
            >
              <div className="w-16 h-16 bg-dp-accent/20 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-dp-accent/30 transition-colors">
                <industry.icon className="h-8 w-8 text-dp-accent" />
              </div>
              <h3 className="font-semibold text-xl mb-3 group-hover:text-dp-accent transition-colors text-dp-text">
                {industry.title}
              </h3>
              <p className="text-dp-text/70 mb-4">{industry.description}</p>
              <ArrowRight className="h-5 w-5 text-dp-accent mx-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default Specializations;

