import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const OwnershipBanner = () => {
  return (
    <section aria-label="Ownership and portability" className="py-6">
      <div className="container mx-auto px-4">
        <div className="rounded-xl border border-border bg-card/60 backdrop-blur shadow-soft p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="text-sm md:text-base">
              You own your site — export anytime and make changes easily. No agency lock-in.
            </p>
          </div>
          <Link to="#what-you-get" className="text-sm font-medium text-primary hover:underline">
            How export works
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OwnershipBanner;
