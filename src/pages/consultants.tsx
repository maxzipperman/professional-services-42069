import Layout from '@/components/Layout';
import { IndustryHero } from '@/components/IndustryHero';
import { Helmet } from 'react-helmet-async';
import consultantsHero from '@/assets/consultants-hero.jpg';

const ConsultantsPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Websites for Consultants Who Command Premium Fees | Position Digital</title>
        <meta name="description" content="Establish unshakeable authority, demonstrate quantifiable ROI, and convert prospects into high-value, long-term clients." />
      </Helmet>
      <IndustryHero
        industry="Consultants"
        headline="Websites for Consultants Who Command Premium Fees"
        subheadline="Establish unshakeable authority, demonstrate quantifiable ROI, and convert prospects into high-value, long-term clients."
        primaryCtaText="Speak With the Founder"
        secondaryCtaText="View Case Studies"
        backgroundImage={consultantsHero}
      />
    </Layout>
  );
};

export default ConsultantsPage;