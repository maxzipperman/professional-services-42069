import { processSteps } from '@/data/home';

const ProcessTimeline = () => (
  <section className="py-12 lg:py-16 bg-dp-panel">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="mb-6 text-dp-text">Our Proven Process</h2>
        <p className="text-lg text-dp-text/80">
          A systematic approach to building authority and driving conversions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {processSteps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-dp-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-dp-bg font-bold text-lg">{step.phase}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-dp-text">{step.title}</h3>
            <p className="text-sm text-dp-text/70">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessTimeline;

