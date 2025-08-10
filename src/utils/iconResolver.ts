export function iconResolver(text: string, industry?: string): string {
  const t = text.toLowerCase();
  const i = industry?.toLowerCase();

  // Industry-priority rules
  if (i?.includes('local')) {
    if (t.includes('hours') || t.includes('location') || t.includes('map') || t.includes('nearby')) return 'map-pin';
    if (t.includes('order') || t.includes('menu') || t.includes('reservation') || t.includes('book')) return 'utensils';
    if (t.includes('inventory') || t.includes('retail') || t.includes('store')) return 'store';
    if (t.includes('review') || t.includes('stars') || t.includes('rating')) return 'star';
  }

  if (i?.includes('professional')) {
    if (t.includes('trust') || t.includes('credibility') || t.includes('compliance') || t.includes('wcag') || t.includes('ada')) return 'shield';
    if (t.includes('speed') || t.includes('fast') || t.includes('performance') || t.includes('load')) return 'zap';
    if (t.includes('bio') || t.includes('credential') || t.includes('award')) return 'award';
    if (t.includes('case') || t.includes('study') || t.includes('proof')) return 'book-open';
    if (t.includes('calendar') || t.includes('booking') || t.includes('consultation')) return 'calendar';
  }

  if (i?.includes('nonprofit')) {
    if (t.includes('donat') || t.includes('gift') || t.includes('fund')) return 'hand-heart';
    if (t.includes('volunteer') || t.includes('member') || t.includes('community')) return 'users';
    if (t.includes('impact') || t.includes('metrics') || t.includes('report')) return 'bar-chart-3';
    if (t.includes('mission') || t.includes('story')) return 'book-open';
  }

  if (i?.includes('creative')) {
    if (t.includes('portfolio') || t.includes('gallery') || t.includes('visual')) return 'palette';
    if (t.includes('photo')) return 'camera';
    if (t.includes('video')) return 'video';
    if (t.includes('design') || t.includes('brand')) return 'pen-tool';
  }

  // Generic keyword rules
  if (t.includes('trust') || t.includes('credibility') || t.includes('secure')) return 'shield';
  if (t.includes('speed') || t.includes('fast') || t.includes('lcp') || t.includes('performance')) return 'zap';
  if (t.includes('time') || t.includes('quick') || t.includes('hours')) return 'clock';
  if (t.includes('review') || t.includes('rating') || t.includes('star')) return 'star';
  if (t.includes('local') || t.includes('near') || t.includes('map')) return 'map-pin';
  if (t.includes('client') || t.includes('team') || t.includes('people')) return 'users';
  if (t.includes('award') || t.includes('recognition') || t.includes('credential')) return 'award';
  if (t.includes('book') || t.includes('learn') || t.includes('guide')) return 'book-open';
  if (t.includes('call') || t.includes('phone') || t.includes('contact')) return 'phone';
  if (t.includes('message') || t.includes('chat')) return 'message-square';
  if (t.includes('donat') || t.includes('gift') || t.includes('fund')) return 'hand-heart';
  if (t.includes('calendar') || t.includes('schedule') || t.includes('booking')) return 'calendar';
  if (t.includes('growth') || t.includes('increase') || t.includes('boost')) return 'trending-up';
  if (t.includes('convers') || t.includes('kpi') || t.includes('metric')) return 'bar-chart-3';
  if (t.includes('money') || t.includes('price') || t.includes('cost') || t.includes('revenue')) return 'dollar-sign';
  if (t.includes('check') || t.includes('complete')) return 'check-circle-2';
  if (t.includes('global') || t.includes('world')) return 'globe';

  // Fallbacks by industry
  if (i?.includes('professional')) return 'briefcase';
  if (i?.includes('local')) return 'building2';
  if (i?.includes('nonprofit')) return 'heart';
  if (i?.includes('creative')) return 'palette';

  return 'briefcase';
}
