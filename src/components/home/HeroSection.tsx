import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/clearline-hero-professional.jpg';
import { trustLogos } from '@/data/home';

const HeroSection = () => (
  <>
    <section className="relative bg-gradient-to-b from-dp-bg via-dp-bg to-dp-panel text-dp-text py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-dp-bg/90 to-dp-bg/70" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-dp-accent/20 text-dp-accent border-dp-accent/30">
            Premium Professional Digital Presence
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-dp-text">
            Professional Websites That Win Premium Clients
          </h1>
          <p className="text-xl text-dp-text mb-8 max-w-3xl mx-auto leading-relaxed">
            We build sophisticated digital platforms that establish authority, build unshakeable trust,
            and consistently attract high-value professional services clients.
          </p>
          <p className="text-lg text-dp-text mb-12 max-w-2xl mx-auto">
            For attorneys, accountants, and consultants who treat their website as a core business asset.
            Our ROI-driven builds increase qualified inquiries and signal expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="inline-flex items-center justify-center bg-dp-accent text-dp-bg px-8 py-4 rounded-xl font-semibold text-lg transition-colors hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-dp-accent"
            >
              <Link
                to="/contact"
                data-cta="hero_primary_cta - Book Your Strategic Roadmap Call"
                className="inline-flex items-center justify-center space-x-2 gradient-accent text-accent-foreground px-8 py-4 rounded-xl transition-colors hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-dp-accent"
              >
                <span>Book Your Strategic Roadmap Call</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="inline-flex items-center justify-center border border-dp-accent/40 text-dp-accent px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dp-panel focus:outline-none focus:ring-2 focus:ring-dp-accent"
            >
              <Link to="/ai-feedback" data-cta="hero_secondary_cta - Run a Free AI Site Audit">
                Run a Free AI Site Audit
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-dp-accent/20 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-dp-accent" />
              </div>
              <h3 className="font-semibold text-lg text-dp-text">Secure & Professional</h3>
              <p className="text-sm text-dp-text/70">Enterprise-grade security and compliance standards</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-dp-accent/20 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-dp-accent" />
              </div>
              <h3 className="font-semibold text-lg text-dp-text">Industry Authority</h3>
              <p className="text-sm text-dp-text/70">Deep expertise in professional services</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-dp-accent/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-dp-accent" />
              </div>
              <h3 className="font-semibold text-lg text-dp-text">Measurable ROI</h3>
              <p className="text-sm text-dp-text/70">Proven results that impact your bottom line</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-8 border-b border-dp-border bg-dp-panel">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-dp-text/60 mb-4">Featured In & Trusted By</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
            {trustLogos.map((logo, index) => (
              <div
                key={index}
                className="text-sm font-medium text-dp-text/70 px-4 py-2 border border-dp-border rounded-md"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

export default HeroSection;

