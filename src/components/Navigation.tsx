import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sparkles } from 'lucide-react';

import { LOGO_URL } from '@/constants/brand';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const industries = [
    { name: 'Lawyers', href: '/lawyers' },
    { name: 'Accountants', href: '/accountants' },
    { name: 'Consultants', href: '/consultants' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-background focus:text-foreground focus:border focus:border-ring focus:px-4 focus:py-2 focus:rounded">Skip to content</a>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center space-x-3 group shrink-0" aria-label="Clearline Studio home">
            <div className="relative flex items-center h-10 sm:h-12 md:h-14 max-w-[180px] md:max-w-[220px]">
              <img src={LOGO_URL} alt="Clearline Studio logo" className="h-full w-auto object-contain object-left" loading="eager" decoding="async" fetchPriority="high" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`transition-smooth hover:text-accent ${
                isActive('/') ? 'text-accent font-medium' : 'text-foreground'
              }`}
            >
              Home
            </Link>
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger aria-label="Services" className="flex items-center space-x-1 transition-smooth hover:text-accent text-foreground">
                <span>Services</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuItem asChild>
                  <Link to="/services/web-design" className="w-full cursor-pointer">Web Design & Development</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/brand-identity" className="w-full cursor-pointer">Brand Identity</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/cro-retainers" className="w-full cursor-pointer">CRO Retainers</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Who We Help Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger aria-label="Who We Help" className="flex items-center space-x-1 transition-smooth hover:text-accent text-foreground">
                <span>Who We Help</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {industries.map((industry) => (
                  <DropdownMenuItem key={industry.href} asChild>
                    <Link
                      to={industry.href}
                      className="w-full cursor-pointer"
                    >
                      {industry.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/case-studies"
              className={`transition-smooth hover:text-accent ${
                isActive('/case-studies') ? 'text-accent font-medium' : 'text-foreground'
              }`}
            >
              Case Studies
            </Link>
            <Link
              to="/pricing"
              className={`transition-smooth hover:text-accent ${
                isActive('/pricing') ? 'text-accent font-medium' : 'text-foreground'
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className={`transition-smooth hover:text-accent ${
                isActive('/about') ? 'text-accent font-medium' : 'text-foreground'
              }`}
            >
              About
            </Link>
            <Link
              to="/resources"
              className={`transition-smooth hover:text-accent ${
                isActive('/resources') ? 'text-accent font-medium' : 'text-foreground'
              }`}
            >
              Blog/Resources
            </Link>
            <Link
              to="/contact"
              className={`transition-smooth hover:text-accent ${
                isActive('/contact') ? 'text-accent font-medium' : 'text-foreground'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Client Login & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/payment" 
              className="text-sm text-muted-foreground hover:text-accent transition-smooth border border-border px-3 py-1.5 rounded-md"
            >
              Make Payment
            </Link>
            <Link 
              to="#" 
              className="text-sm text-muted-foreground hover:text-accent transition-smooth border border-border px-3 py-1.5 rounded-md"
            >
              Client Login
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link to="/faq">
                <span>FAQ</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
              <Link to="/ai-feedback">
                <Sparkles className="h-4 w-4" />
                <span>AI Feedback</span>
              </Link>
            </Button>
            <Button asChild size="sm" className="gradient-accent text-accent-foreground font-medium">
              <Link to="/book" data-cta="primary" data-page="nav">Schedule a Strategy Call</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-accent transition-smooth"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-foreground hover:text-accent transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-muted-foreground mb-2">Services</div>
                <Link to="/services/web-design" className="block px-3 py-1 text-sm text-foreground hover:text-accent transition-smooth" onClick={() => setIsOpen(false)}>
                  Web Design & Development
                </Link>
                <Link to="/services/brand-identity" className="block px-3 py-1 text-sm text-foreground hover:text-accent transition-smooth" onClick={() => setIsOpen(false)}>
                  Brand Identity
                </Link>
                <Link to="/services/cro-retainers" className="block px-3 py-1 text-sm text-foreground hover:text-accent transition-smooth" onClick={() => setIsOpen(false)}>
                  CRO Retainers
                </Link>
              </div>
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-muted-foreground mb-2">Who We Help</div>
                {industries.map((industry) => (
                  <Link
                    key={industry.href}
                    to={industry.href}
                    className="block px-3 py-1 text-sm text-foreground hover:text-accent transition-smooth"
                    onClick={() => setIsOpen(false)}
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/case-studies"
                className="block px-3 py-2 text-foreground hover:text-accent transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                Case Studies
              </Link>
              <Link
                to="/pricing"
                className="block px-3 py-2 text-foreground hover:text-accent transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-foreground hover:text-accent transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/resources"
                className="block px-3 py-2 text-foreground hover:text-accent transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                Blog/Resources
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-foreground hover:text-accent transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/payment"
                className="block px-3 py-2 text-foreground hover:text-accent transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                Make Payment
              </Link>
              <div className="pt-4">
                <Button asChild className="w-full gradient-accent text-accent-foreground">
                  <Link to="/book" onClick={() => setIsOpen(false)} data-cta="primary" data-page="nav">
                    Schedule a Strategy Call
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;