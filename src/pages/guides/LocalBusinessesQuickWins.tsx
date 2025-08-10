import GuideTemplate from '@/components/GuideTemplate';

const LocalBusinessesQuickWins = () => (
  <GuideTemplate
    industry="Local Businesses"
    title="Local Business Website Quick Wins"
    subtitle="Turn local searches into calls, directions, and visits."
    bullets={[
      'Place tap-to-call and directions above the fold on mobile.',
      'Keep hours synced; add holiday closures and live status.',
      'Showcase 5-star reviews and prompt for new ones after visits.',
      'Make services or menu reachable in 2 clicks; avoid PDF menus.',
      'Add LocalBusiness schema and ensure NAP consistency everywhere.'
    ]}
  />
);

export default LocalBusinessesQuickWins;
