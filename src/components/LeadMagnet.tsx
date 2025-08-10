import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, CheckCircle } from 'lucide-react';

interface LeadMagnetProps {
  industry: 'lawyers' | 'therapists' | 'consultants';
  title: string;
  description: string;
  benefits: string[];
  fileName: string;
}

const LeadMagnet = ({ industry, title, description, benefits, fileName }: LeadMagnetProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your email service
    setIsSubmitted(true);
  };

  const industryConfig = {
    lawyers: {
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: '⚖️'
    },
    therapists: {
      color: 'text-green-600', 
      bgColor: 'bg-green-50',
      icon: '🧠'
    },
    consultants: {
      color: 'text-purple-600',
      bgColor: 'bg-purple-50', 
      icon: '📊'
    }
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
        <div className={`w-16 h-16 ${config.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
          <span className="text-2xl">{config.icon}</span>
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
          <Button type="submit" className="w-full gradient-accent text-accent-foreground">
            <Mail className="h-4 w-4 mr-2" />
            Get Free Guide
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