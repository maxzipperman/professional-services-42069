import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import StickyMobileCTA from './StickyMobileCTA';
import SlideInCTA from './SlideInCTA';
import ScrollToTop from './ScrollToTop';
import { useAnalytics } from '@/hooks/useAnalytics';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useAnalytics();
  return (
    <div className="min-h-screen flex flex-col bg-dp-bg text-dp-text antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-dp-accent bg-dp-accent text-dp-bg"
      >
        Skip to main content
      </a>
      <Navigation />
      <ScrollToTop />
      <main id="main-content" role="main" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <Footer />
      <StickyMobileCTA />
      <SlideInCTA />
    </div>
  );
};

export default Layout;