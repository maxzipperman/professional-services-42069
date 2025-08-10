import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ContextualCTAProps {
  title: string;
  description: string;
  primaryAction: {
    text: string;
    href: string;
    variant?: 'default' | 'outline';
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
  context?: string;
  className?: string;
}

const ContextualCTA = ({ 
  title, 
  description, 
  primaryAction, 
  secondaryAction,
  context = "section",
  className = ""
}: ContextualCTAProps) => {
  return (
    <div className={`bg-card rounded-lg border p-6 text-center ${className}`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button 
          asChild 
          variant={primaryAction.variant || "default"}
          className={primaryAction.variant === "outline" ? "" : "gradient-accent text-accent-foreground"}
          data-cta="contextual"
          data-page={context}
        >
          <Link to={primaryAction.href}>
            {primaryAction.text}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        
        {secondaryAction && (
          <Button 
            asChild 
            variant="outline"
            data-cta="contextual-secondary"
            data-page={context}
          >
            <Link to={secondaryAction.href}>
              {secondaryAction.text}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContextualCTA;