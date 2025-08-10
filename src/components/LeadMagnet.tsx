import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase, isSupabaseConnected } from '@/integrations/supabase/client';

interface LeadMagnetProps {
  industry: string;
  title: string;
  description: string;
  benefits: string[];
  fileName?: string;
  downloadUrl?: string;
}

const LeadMagnet = ({ industry, title, description, benefits, fileName, downloadUrl }: LeadMagnetProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  
  const toAbsoluteUrl = (url?: string) => {
    if (!url) return undefined;
    if (/^https?:\/\//i.test(url)) return url;
    if (typeof window !== 'undefined' && url.startsWith('/')) {
      return `${window.location.origin}${url}`;
    }
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConnected()) {
      setIsSubmitted(true);
      return;
    }
    try {
      setIsSending(true);
      const absoluteDownloadUrl = toAbsoluteUrl(downloadUrl);
      const pageUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : undefined;
      // 1) Capture lead
      const { error: leadErr } = await supabase!.functions.invoke('capture-lead', {
        body: {
          email,
          source: 'lead_magnet',
          industry,
          page: pageUrl,
          metadata: { fileName, downloadUrl: absoluteDownloadUrl }
        }
      });
      if (leadErr) throw leadErr;

      // 2) Send the guide via email
      const { error: emailErr } = await supabase!.functions.invoke('send-guide', {
        body: {
          email,
          title,
          fileName,
          downloadUrl: absoluteDownloadUrl,
          industry,
          page: pageUrl,
        }
      });
      if (emailErr) throw emailErr;

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Lead capture/email failed:', err);
    } finally {
      setIsSending(false);
    }
  };

  const industryConfig: Record<string, { icon: string }> = {
    lawyers: { icon: '⚖️' },
    accountants: { icon: '📊' },
    consultants: { icon: '🧩' },
    nonprofits: { icon: '🤝' },
    creatives: { icon: '🎨' },
    "local businesses": { icon: '📍' },
    "professional services": { icon: '🏢' },
  };

  const config = industryConfig[industry];

  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto text-center shadow-medium">
        <CardContent className="pt-8 pb-8">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Check Your Email!</h3>
          <p className="text-muted-foreground mb-4">
            We've sent you the download link for "{fileName}"
          </p>
          <Badge variant="secondary">
            Download starts automatically
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto shadow-medium hover-lift">
      <CardHeader className="text-center">
        <div className={`w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4`}>
          <span className="text-2xl">{config?.icon ?? '📘'}</span>
        </div>
        <Badge variant="secondary" className="mb-2">
          <Download className="h-4 w-4 mr-2" />
          Free Download
        </Badge>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">What you'll get:</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" disabled={isSending} aria-busy={isSending} className="w-full gradient-accent text-accent-foreground">
            <Mail className="h-4 w-4 mr-2" />
            {isSending ? "Sending..." : "Get Free Guide"}
          </Button>
        </form>
        
        <p className="text-xs text-muted-foreground text-center">
          No spam. Unsubscribe at any time.
        </p>
      </CardContent>
    </Card>
  );
};

export default LeadMagnet;