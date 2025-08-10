import { IndustryPage } from '@/components/IndustryPage';
import { nonprofitData } from '@/data/industries';

const Nonprofits = () => {
  return <IndustryPage data={nonprofitData} />;
};

export default Nonprofits;