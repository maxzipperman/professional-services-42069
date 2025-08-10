import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/clearline-logo.png';

const Footer = () => {
  const industries = [
    { name: 'Local Businesses', href: '/local-businesses' },
    { name: 'Nonprofits & Religious', href: '/nonprofits' },
    { name: 'Independent Creatives', href: '/creatives' },
    { name: 'Professional Services', href: '/professional-services' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="relative h-10 md:h-12 overflow-hidden flex items-center">
                <img src={logo} alt="Clearline Solutions logo" className="h-12 md:h-14 w-auto object-contain -mt-1 md:-mt-1.5" loading="lazy" decoding="async" />
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Boutique consultancy creating high-performance, custom websites with strategic messaging that converts.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@clearlinestudio.com</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <span className="text-sm">(555) 987-6543</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/services" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  Website Design & Development
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  Brand Messaging Strategy
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  Optimization & Refresh
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  Website Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-semibold mb-4">Industries</h4>
            <ul className="space-y-2">
              {industries.map((industry) => (
                <li key={industry.href}>
                  <Link 
                    to={industry.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold mb-4">Ready to Transform Your Digital Presence?</h4>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Let's discuss your goals and the smartest next steps.
            </p>
            <Button 
              asChild 
              className="w-full gradient-accent text-accent-foreground hover-lift"
              data-cta="footer"
              data-page="footer"
            >
              <Link to="/contact">Book Your Strategy Call</Link>
            </Button>
            <p className="mt-2 text-xs text-primary-foreground/80">No hard pitch—30 minutes to map your best next steps.</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 Clearline Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link 
              to="/privacy" 
              className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-smooth"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-smooth"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;