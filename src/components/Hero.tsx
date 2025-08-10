import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 lg:pb-24 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="h-4 w-4" />
            <span>Hand-coded, blazing-fast websites</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-primary">
            Your website is your storefront, handshake, and elevator pitch — 
            <span className="text-accent"> we make it unforgettable</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            We design high-performance, custom websites that tell your story and win customers. 
            Hand-coded, secure, and yours to own — no lock-in, no monthly fees.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              asChild 
              size="lg" 
              className="gradient-accent text-accent-foreground font-semibold hover-lift shadow-accent"
            >
              <Link to="/contact" className="flex items-center space-x-2">
                <span>Request Free Audit</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-accent text-accent hover:bg-accent/5"
            >
              <Link to="/portfolio">See Our Work</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-soft hover-lift">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground text-center">
                90+ PageSpeed scores guaranteed. Cut load times from 6s to 1.2s.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-soft hover-lift">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Secure & Yours</h3>
              <p className="text-sm text-muted-foreground text-center">
                Hand-coded, plugin-light, and no platform lock-in. You own it outright.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-soft hover-lift">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Results Driven</h3>
              <p className="text-sm text-muted-foreground text-center">
                Strategic copy included. Boost bookings 25%+ with optimized messaging.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;