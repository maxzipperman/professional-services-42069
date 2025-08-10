import { IndustryPage } from '@/components/IndustryPage';
import { localBusinessData } from '@/data/industries';

const LocalBusinesses = () => {
  return <IndustryPage data={localBusinessData} />;
};

export default LocalBusinesses;