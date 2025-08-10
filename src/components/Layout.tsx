import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import StickyMobileCTA from './StickyMobileCTA';
import SlideInCTA from './SlideInCTA';
import { useAnalytics } from '@/hooks/useAnalytics';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useAnalytics();
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <StickyMobileCTA />
      <SlideInCTA />
    </div>
  );
};

export default Layout;