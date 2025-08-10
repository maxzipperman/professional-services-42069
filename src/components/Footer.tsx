import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { LOGO_URL } from '@/constants/brand';
import LeadMagnetForm from './LeadMagnetForm';

const Footer = () => {
  const industries = [
    { name: 'Lawyers', href: '/lawyers' },
    { name: 'Accountants', href: '/accountants' },
    { name: 'Consultants', href: '/consultants' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="relative flex items-center h-8 md:h-10 max-w-[180px] md:max-w-[220px]">
                <img src={LOGO_URL} alt="Clearline Studio logo" className="h-full w-auto object-contain object-left" loading="lazy" decoding="async" />
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
                  Website Tune-Up
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  Brand Refresh
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  Premium Brand Experience
                </Link>
              </li>
              <li>
                <Link 
                  to="/payment" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  Brand & Performance Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-semibold mb-4">Who We Help</h4>
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

          {/* Newsletter & CTA */}
          <div>
            <h4 className="font-semibold mb-4">Get Our Free Growth Guide</h4>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Weekly insights on conversion optimization & growth strategies.
            </p>
            <LeadMagnetForm 
              source="footer"
              placeholder="Your email"
              buttonText="Get Guide"
              className="mb-4"
            />
            <div className="border-t border-primary-foreground/20 pt-4">
              <Button 
                asChild 
                variant="outline"
                className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                data-cta="footer-call"
                data-page="footer"
              >
                <Link to="/book">Book Strategy Call</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 Clearline Studio. All rights reserved.
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