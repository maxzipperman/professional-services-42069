import GuideTemplate from '@/components/GuideTemplate';

const LawyersQuickWins = () => (
  <GuideTemplate
    industry="Lawyers"
    title="5 Quick Wins for Law Firm Websites"
    subtitle="Boost credibility, speed, and conversions in under a week."
    bullets={[
      'Add visible trust signals: bar admissions, practice areas, and disclaimers on the homepage.',
      'Target <1.5s LCP: compress hero images (AVIF/WebP) and preload key fonts.',
      'Create focused practice-area pages with clear FAQs and a single primary CTA.',
      'Streamline intake: reduce form fields, add Calendly option, and show response times.',
      'Implement LocalBusiness + Service schema for richer search results.'
    ]}
  />
);

export default LawyersQuickWins;
