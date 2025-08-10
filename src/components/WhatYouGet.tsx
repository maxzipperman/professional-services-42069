import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Download, PencilLine, PlugZap } from 'lucide-react';
import { IndustryIcon } from './IndustryIcon';
import { iconResolver } from '@/utils/iconResolver';

interface WhatYouGetProps {
  items: string[];
  industry?: string;
}

export const WhatYouGet = ({ items, industry }: WhatYouGetProps) => {
  const keepList = [
    { icon: ShieldCheck, label: 'Full ownership — export anytime' },
    { icon: Download, label: 'Portable, standards-based stack' },
    { icon: PencilLine, label: 'Edit easily — no developer required' },
    { icon: PlugZap, label: 'Bring any provider — no lock-in' }
  ];

  return (
    <section aria-labelledby="what-you-get" className="py-14">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {/* Left: Feature cards */}
          <article className="lg:col-span-3 space-y-4">
            <header className="text-center lg:text-left mb-2">
              <h2 id="what-you-get" className="text-3xl font-bold">What You'll Get</h2>
              <p className="text-muted-foreground mt-2">Deliverables and upgrades tailored to your goals</p>
            </header>

            <div className="grid sm:grid-cols-2 gap-4">
              {items.map((val, idx) => (
                <Card key={idx} className="border-0 shadow-sm hover-lift transition-smooth">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <IndustryIcon name={iconResolver(val, industry || '')} className="h-6 w-6 text-primary mt-0.5" />
                      <p className="text-sm leading-relaxed">{val}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </article>

          {/* Right: Ownership & control */}
          <aside className="lg:col-span-2">
            <Card className="border-0 shadow-accent gradient-subtle h-full">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">Ownership & Portability</Badge>
                <CardTitle className="text-2xl">What You Keep</CardTitle>
                <p className="text-muted-foreground">Control, flexibility, and no agency lock-in</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {keepList.map((k, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <k.icon className="h-5 w-5 text-primary mt-0.5" />
                      <span className="text-sm">{k.label}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-muted-foreground">
                  Export your full codebase or a static export anytime. You’re never stuck.
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  );
};
