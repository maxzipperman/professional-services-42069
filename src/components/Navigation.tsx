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

import logo from '@/assets/clearline-logo.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const industries = [
    { name: 'Lawyers', href: '/lawyers' },
    { name: 'Accountants', href: '/accountants' },
    { name: 'Consultants', href: '/consultants' },
    { name: 'Local Businesses', href: '/local-businesses' },
    { name: 'Nonprofits & Religious', href: '/nonprofits' },
    { name: 'Independent Creatives', href: '/creatives' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-3 group shrink-0" aria-label="Clearline Studio home">
            <div className="relative h-10 sm:h-12 md:h-14 overflow-hidden flex items-center">
              <img src={logo} alt="Clearline Studio logo" className="h-12 sm:h-14 md:h-16 w-auto object-contain -mt-1 sm:-mt-1.5 md:-mt-2" loading="eager" decoding="async" fetchPriority="high" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-smooth hover:text-accent ${
                isActive('/') ? 'text-accent font-medium' : 'text-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`transition-smooth hover:text-accent ${
                isActive('/services') ? 'text-accent font-medium' : 'text-foreground'
              }`}
            >
              Services
            </Link>
            
            {/* Industries Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 transition-smooth hover:text-accent text-foreground">
                <span>Industries</span>
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
              to="/portfolio"
              className={`transition-smooth hover:text-accent ${
                isActive('/portfolio') ? 'text-accent font-medium' : 'text-foreground'
              }`}
            >
              Portfolio
            </Link>
            <Link
              to="/about"
              className={`transition-smooth hover:text-accent ${
                isActive('/about') ? 'text-accent font-medium' : 'text-foreground'
              }`}
            >
              About
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
            <Button asChild size="sm" className="gradient-accent text-accent-foreground font-medium">
              <Link to="/contact" data-cta="primary" data-page="nav">Book Your Strategy Call</Link>
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
              <Link
                to="/services"
                className="block px-3 py-2 text-foreground hover:text-accent transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-muted-foreground mb-2">Industries</div>
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
                to="/portfolio"
                className="block px-3 py-2 text-foreground hover:text-accent transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-foreground hover:text-accent transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                About
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
                  <Link to="/contact" onClick={() => setIsOpen(false)} data-cta="primary" data-page="nav">
                    Book Your Strategy Call
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