import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Shield } from 'lucide-react';
import founderPhoto from '@/assets/founder-photo.jpg';

interface FounderCTAProps {
  ctaText: string;
  variant?: 'primary' | 'secondary' | 'value-first';
}

export const FounderCTA = ({ ctaText, variant = 'primary' }: FounderCTAProps) => {
  const getVariantConfig = () => {
    switch (variant) {
      case 'primary':
        return {
          title: "Speak With the Founder",
          subtitle: "Direct access to the key decision-maker and expert",
          description: "No sales team, no junior staff. You'll work directly with our founder who has personally delivered results for 100+ businesses.",
          icon: Shield,
          features: ["20+ years of experience", "Direct founder access", "Boutique experience"]
        };
      case 'secondary':
        return {
          title: "Book Your 20-Min Discovery Call",
          subtitle: "Quick, efficient consultation for busy professionals",
          description: "A focused call to understand your needs and share immediate insights. No lengthy sales pitches.",
          icon: Calendar,
          features: ["20-minute commitment", "Immediate insights", "Calendar booking"]
        };
      case 'value-first':
        return {
          title: "Get Your Free Strategy Session",
          subtitle: "Receive immediate value in our consultation",
          description: "Walk away with actionable insights and a clear roadmap, regardless of whether we work together.",
          icon: ArrowRight,
          features: ["Actionable insights", "Performance assessment", "No sales pitch"]
        };
    }
  };

  const config = getVariantConfig();
  const Icon = config.icon;

  return (
    <Card className="overflow-hidden shadow-medium hover-lift transition-smooth border-0 bg-gradient-subtle">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="relative">
              <img 
                src={founderPhoto} 
                alt="Founder"
                className="w-24 h-24 rounded-full object-cover shadow-accent"
              />
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                <Icon className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">{config.title}</h3>
            <p className="text-primary font-medium mb-3">{config.subtitle}</p>
            <p className="text-muted-foreground mb-4">{config.description}</p>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
              {config.features.map((feature, index) => (
                <span key={index} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {feature}
                </span>
              ))}
            </div>
            
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-accent">
              <Link to="/contact" className="inline-flex items-center gap-2">
                {ctaText}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};