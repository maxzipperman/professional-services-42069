import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { IndustryIcon } from './IndustryIcon';

interface IndustryHeroProps {
  industry: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  backgroundImage?: string;
  iconName?: string;
}

export const IndustryHero = ({ 
  industry, 
  headline, 
  subheadline, 
  primaryCtaText, 
  secondaryCtaText,
  backgroundImage,
  iconName
}: IndustryHeroProps) => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Background Image if provided */}
      {backgroundImage && (
        <div className="absolute inset-0 opacity-20">
          <img 
            src={backgroundImage} 
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />
        </div>
      )}
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 text-primary border-primary/20 hover-scale transition-smooth inline-flex items-center gap-2">
            {iconName && <IndustryIcon name={iconName} className="h-4 w-4" />}
            {industry}
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent animate-fade-in">
            {headline}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-accent hover-scale transition-smooth">
              <Link to="/contact" className="inline-flex items-center gap-2">
                {primaryCtaText}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="hover-scale transition-smooth">
              <Link to="#case-studies" className="inline-flex items-center gap-2">
                <Play className="h-4 w-4" />
                {secondaryCtaText}
              </Link>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              100+ Satisfied Clients
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              4-8 Week Delivery
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              No Ongoing Fees
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};