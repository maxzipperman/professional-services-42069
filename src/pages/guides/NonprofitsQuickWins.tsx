import GuideTemplate from '@/components/GuideTemplate';

const NonprofitsQuickWins = () => (
  <GuideTemplate
    industry="Nonprofits"
    title="Nonprofit Donation Flow Quick Wins"
    subtitle="Small changes that meaningfully increase giving and volunteer signups."
    bullets={[
      'Enable 2-click donate with Apple/Google Pay and recurring options.',
      'Add an impact strip: metrics, outcomes, and stories tied to donations.',
      'Meet WCAG 2.1 basics: contrast, focus states, and accessible labels.',
      'Sync CRM and email lists; confirm tracking is privacy-safe and accurate.',
      'Create campaign pages with a clear goal, progress, and social proof.'
    ]}
  />
);

export default NonprofitsQuickWins;
