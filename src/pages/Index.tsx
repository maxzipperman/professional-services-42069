import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/home/HeroSection';
import ValuePropositions from '@/components/home/ValuePropositions';
import CaseStudySection from '@/components/home/CaseStudySection';
import Specializations from '@/components/home/Specializations';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import LeadMagnetSection from '@/components/home/LeadMagnetSection';
import FinalCTA from '@/components/home/FinalCTA';
import heroImage from '@/assets/clearline-hero-professional.jpg';

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Professional Website Design for Lawyers, Accountants & Consultants | Clearline Studio</title>
        <meta
          name="description"
          content="Premium websites that establish authority and win high-value clients. Specialized in professional services with proven ROI. Book your strategic roadmap call."
        />
        <link rel="canonical" href="https://www.clearlinestudio.com/" />
        <link rel="preload" as="image" href={heroImage} />
        <meta property="og:title" content="Professional Websites That Win Premium Clients | Clearline Studio" />
        <meta
          property="og:description"
          content="Sophisticated digital platforms for attorneys, accountants, and consultants. ROI-driven approach with proven results."
        />
        <meta property="og:image" content={heroImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['Organization', 'ProfessionalService'],
            name: 'Clearline Studio',
            url: 'https://www.clearlinestudio.com',
            description: 'Professional website design and development for lawyers, accountants, and consultants',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Los Angeles',
              addressRegion: 'CA'
            },
            serviceType: ['Website Design', 'Web Development', 'Digital Marketing'],
            audience: {
              '@type': 'Audience',
              audienceType: 'Professional Services'
            }
          })}
        </script>
      </Helmet>

      <div className="bg-dp-bg text-dp-text">
        <HeroSection />
        <ValuePropositions />
        <CaseStudySection />
        <Specializations />
        <ProcessTimeline />
        <LeadMagnetSection />
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default Index;

