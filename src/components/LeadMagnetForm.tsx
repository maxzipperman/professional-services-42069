import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface LeadMagnetFormProps {
  source: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

const LeadMagnetForm = ({ 
  source, 
  placeholder = "Enter your email", 
  buttonText = "Get Free Guide",
  className = ""
}: LeadMagnetFormProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('capture-lead', {
        body: {
          email,
          source,
          page: window.location.pathname,
        }
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Check your email for your free guide.",
      });
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

  if (isSubmitted) {
    return (
      <div className={`text-center ${className}`}>
        <div className="inline-flex items-center text-primary">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Check your email!
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className="flex-1"
        data-cta="email-signup"
        data-page="footer"
      />
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="gradient-accent text-accent-foreground"
        data-cta="email-signup"
        data-page="footer"
      >
        {isSubmitting ? "..." : buttonText}
      </Button>
    </form>
  );
};

export default LeadMagnetForm;