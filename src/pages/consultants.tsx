import Layout from '@/components/Layout';
import { IndustryHero } from '@/components/IndustryHero';
import { Helmet } from 'react-helmet-async';

const ConsultantsPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Websites for Consultants Who Command Premium Fees | Position Digital</title>
        <meta name="description" content="Establish unshakeable authority, demonstrate quantifiable ROI, and convert prospects into high-value, long-term clients." />
      </Helmet>
      <IndustryHero
        heroTitle="Websites for Consultants Who Command Premium Fees"
        heroSubtitle="Establish unshakeable authority, demonstrate quantifiable ROI, and convert prospects into high-value, long-term clients."
        heroImage="/src/assets/consultants-hero.jpg"
      />
    </Layout>
  );
};

export default ConsultantsPage;