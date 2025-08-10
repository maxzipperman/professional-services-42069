import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SlideInCTA = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname === '/contact') return;
    try {
      if (sessionStorage.getItem('pd_slidein_dismissed') === '1') return;
    } catch {}

    const onScroll = () => {
      const doc = document.documentElement;
      const denom = doc.scrollHeight - doc.clientHeight;
      if (denom <= 0) return;
      const progress = ((window.scrollY || doc.scrollTop) / denom);
      if (progress >= 0.5) setVisible(true);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  const dismiss = () => {
    setVisible(false);
    try { sessionStorage.setItem('pd_slidein_dismissed', '1'); } catch {}
  };

  if (!visible) return null;

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-50">
      <div className="relative w-80 rounded-lg border border-border bg-background shadow-soft p-4">
        <button
          aria-label="Dismiss"
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          onClick={dismiss}
        >
          ×
        </button>
        <h3 className="text-base font-semibold text-foreground">Book Your Strategy Call</h3>
        <p className="mt-1 text-sm text-muted-foreground">No hard pitch—30 minutes to map your best next steps.</p>
        <div className="mt-3">
          <Button asChild className="w-full gradient-accent text-accent-foreground">
            <Link to="/book" data-cta="slidein" data-page="global">Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SlideInCTA;
