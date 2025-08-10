import { useEffect } from 'react';

// Lightweight analytics: tracks CTA clicks and scroll depth. Pushes to window.dataLayer if available.
export function useAnalytics() {
  useEffect(() => {
    const firedDepths = new Set<number>();

    const onClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      let el: HTMLElement | null = target;
      while (el && el !== document.body) {
        const cta = el.getAttribute('data-cta');
        if (cta) {
          const payload = {
            event: 'cta_click',
            cta,
            page: el.getAttribute('data-page') || window.location.pathname,
            industry: el.getAttribute('data-industry') || undefined,
            href: (el as HTMLAnchorElement).href || undefined,
            ts: Date.now(),
          };
          try {
            (window as any).dataLayer ? (window as any).dataLayer.push(payload) : console.info('[analytics]', payload);
          } catch (err) {
            console.info('[analytics-fallback]', payload);
          }
          break;
        }
        el = el.parentElement;
      }
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const denom = doc.scrollHeight - doc.clientHeight;
      if (denom <= 0) return;
      const progress = ((window.scrollY || doc.scrollTop) / denom) * 100;
      [25, 50, 75, 100].forEach((t) => {
        if (progress >= t && !firedDepths.has(t)) {
          firedDepths.add(t);
          const payload = { event: 'scroll_depth', value: t, page: window.location.pathname, ts: Date.now() };
          try {
            (window as any).dataLayer ? (window as any).dataLayer.push(payload) : console.info('[analytics]', payload);
          } catch {
            console.info('[analytics-fallback]', payload);
          }
        }
      });
    };

    document.addEventListener('click', onClick, { capture: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // initial check
    onScroll();

    return () => {
      document.removeEventListener('click', onClick, { capture: true } as any);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}
