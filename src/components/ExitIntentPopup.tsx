import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { X } from 'lucide-react';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already seen or dismissed the popup
    const dismissed = sessionStorage.getItem('exit_intent_dismissed');
    if (dismissed) return;

    let exitIntentFired = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (exitIntentFired) return;
      if (e.clientY <= 0) {
        exitIntentFired = true;
        setIsVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('capture-lead', {
        body: {
          email,
          source: 'exit_intent',
          page: window.location.pathname,
        }
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Check your email for your free guide.",
      });
      
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('exit_intent_dismissed', '1');
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('exit_intent_dismissed', '1');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-md w-full mx-4 bg-background rounded-lg border shadow-lg p-6">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center text-primary mb-2">
              <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Check your email!</h3>
            <p className="text-muted-foreground">Your free guide is on its way.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-2">Wait! Before you go...</h3>
            <p className="text-muted-foreground mb-4">
              Get our free guide on optimizing your website for better conversions.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                data-cta="exit-intent"
                data-page="popup"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full gradient-accent text-accent-foreground"
                data-cta="exit-intent"
                data-page="popup"
              >
                {isSubmitting ? "Sending..." : "Get Free Guide"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ExitIntentPopup;