import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FinalCTA = () => (
  <section className="py-24 bg-gradient-to-r from-dp-panel to-[#0F172A] text-dp-text">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="mb-6 text-dp-text">Ready to Turn Your Website Into a Revenue-Generating Asset?</h2>
        <p className="text-lg text-dp-text/80 mb-8">
          Let's discuss how a strategic website investment can enhance your credibility,
          attract premium clients, and provide a significant competitive advantage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-dp-accent text-dp-bg px-8 py-4 rounded-xl font-semibold text-lg hover:brightness-110"
          >
            <Link
              to="/contact"
              data-cta="final_primary_cta - Book Your Strategic Roadmap Call"
              className="flex items-center space-x-2"
            >
              <span>Book Your Strategic Roadmap Call</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-dp-accent/40 text-dp-accent px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dp-panel"
          >
            <Link
              to="/ai-feedback"
              data-cta="final_secondary_cta - Run a Free AI Site Audit"
              className="flex items-center space-x-2"
            >
              <span>Run a Free AI Site Audit</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default FinalCTA;

