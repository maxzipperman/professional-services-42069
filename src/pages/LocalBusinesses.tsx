import { IndustryPage } from '@/components/IndustryPage';
import { localBusinessData } from '@/data/industries';
import { Helmet } from 'react-helmet-async';

const LocalBusinesses = () => {
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}${localBusinessData.slug}` : localBusinessData.slug;
  return (
    <>
      <Helmet>
        <title>{localBusinessData.seo.title}</title>
        <meta name="description" content={localBusinessData.seo.description} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <IndustryPage data={localBusinessData} />
    </>
  );
};

export default LocalBusinesses;
