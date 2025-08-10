import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const StickyMobileCTA = () => {
  const location = useLocation();
  if (location.pathname === '/contact') return null;

  return (
    <div className="fixed md:hidden bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 py-3">
        <Button asChild size="lg" className="w-full gradient-accent text-accent-foreground" >
          <Link to="/book" data-cta="sticky" data-page="global">
            Book Your Strategy Call
          </Link>
        </Button>
        <p className="mt-1 text-center text-xs text-muted-foreground">No hard pitch—30 minutes to map your best next steps.</p>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
