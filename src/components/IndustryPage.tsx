import { Helmet } from 'react-helmet-async';
import Layout from './Layout';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { BeforeAfterSlider } from './ui/before-after-slider';
import { Badge } from './ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { IndustryData } from '@/types/industry';
import { FounderCTA } from './FounderCTA';
import { AnimatedStats } from './AnimatedStats';
import { IndustryHero } from './IndustryHero';
import { IndustryIcon } from './IndustryIcon';
import { iconResolver } from '@/utils/iconResolver';

import { ComparisonTable } from './ComparisonTable';
import ROICalculator from './ROICalculator';

interface IndustryPageProps {
  data: IndustryData;
}

export const IndustryPage = ({ data }: IndustryPageProps) => {
  // Convert proof points to animated stats format
  const statsData = data.proof.map((point, index) => {
    const match = point.match(/(\d+%|\d+×|\d+s)/);
    const value = match ? match[1] : `${index + 1}x`;
    return {
      value,
      label: point.replace(/(\d+%|\d+×|\d+s)/, '').trim(),
      description: point
    };
  });

  // Determine CTA variant based on primary CTA text
  const getCtaVariant = () => {
    if (data.hero.primaryCtaText.includes('Founder')) return 'primary';
    if (data.hero.primaryCtaText.includes('20-Min')) return 'secondary';
    return 'value-first';
  };

  const canonical = typeof window !== 'undefined' ? `${window.location.origin}${data.slug}` : data.slug;

  return (
    <>
      <Helmet>
        <title>{data.seo.title}</title>
        <meta name="description" content={data.seo.description} />
        <meta name="keywords" content={data.seo.keywords.join(', ')} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Clearline Studio",
            "description": data.seo.description,
            "url": canonical
          })}
        </script>
      </Helmet>

      <Layout>
        {/* Enhanced Hero Section */}
        <IndustryHero 
          industry={data.industry}
          headline={data.hero.headline}
          subheadline={data.hero.subheadline}
          primaryCtaText={data.hero.primaryCtaText}
          secondaryCtaText={data.hero.secondaryCtaText}
          iconName={data.icon}
        />

        {/* Why This Matters */}
        <section className="py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Why This Matters to You</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {data.whyMatters.map((point, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <IndustryIcon name={iconResolver(point, data.industry)} className="h-8 w-8 text-primary mb-4" />
                      <p className="text-muted-foreground">{point}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Client-Centric Value */}
        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">What You'll Get</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(data.valueProps ?? data.servicesFocus).map((val, idx) => (
                  <Card key={idx} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <IndustryIcon name={iconResolver(val, data.industry)} className="h-6 w-6 text-primary mb-3" />
                      <p className="text-sm">{val}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Animated Proof Points */}
        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Proven Results</h2>
                <p className="text-lg text-muted-foreground">Real performance improvements for businesses like yours</p>
              </div>
              <AnimatedStats stats={statsData} />
              
            </div>
          </div>
        </section>

        {/* Services Focus */}
        <section className="py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">What We'll Do For You</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.servicesFocus.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-background rounded-lg">
                    <IndustryIcon name={iconResolver(service, data.industry)} className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Offer Architecture */}
        {data.offers?.length ? (
          <section className="py-14">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Offer Architecture</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.offers.map((offer, idx) => (
                    <Card key={idx} className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-xl">{offer.name}</CardTitle>
                        <p className="text-muted-foreground">{offer.description}</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                          {offer.points.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* Go-To-Market Quick Hits */}
        {data.gtm ? (
          <section className="py-14 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6">
                  <Badge variant="secondary" className="mb-2">{data.gtm.title}</Badge>
                  <h2 className="text-3xl font-bold">Go-To-Market Quick Hits</h2>
                </div>
                <ul className="max-w-3xl mx-auto list-disc pl-6 space-y-3 text-muted-foreground">
                  {data.gtm.points.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}

        {/* Who We Serve */}
        {data.subProfessions?.length ? (
          <section className="py-14">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Who We Serve</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.subProfessions!.map((sp, idx) => (
                    <Card key={idx} className="p-6 text-center border-0 shadow-sm hover-lift transition-smooth">
                      <IndustryIcon name={sp.icon || data.icon} className="h-10 w-10 text-primary mx-auto mb-4" />
                      <div className="text-2xl md:text-3xl font-bold">{sp.name}</div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* Before/After Showcase */}
        <section id="case-studies" className="py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Before & After</h2>
              <div className="grid lg:grid-cols-2 gap-6">
                {data.beforeAfter.map((comparison, index) => (
                  <BeforeAfterSlider
                    key={index}
                    beforeImage={comparison.beforeImage}
                    afterImage={comparison.afterImage}
                    caption={comparison.caption}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Us vs Competitors */}
        {data.industry === 'Local Businesses' && (
          <section className="py-14">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto animate-fade-in">
                <ComparisonTable data={data.comparison!} />
              </div>
            </div>
          </section>
        )}

        {/* ROI Calculator */}
        {data.industry === 'Local Businesses' && (
          <section className="py-14 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Your ROI vs Typical Retainers</h2>
                <ROICalculator />
              </div>
            </div>
          </section>
        )}

        {/* Case Studies */}
        <section className="py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Case Studies</h2>
              <div className="grid lg:grid-cols-2 gap-6">
                {data.caseStudies.map((study, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-xl">{study.title}</CardTitle>
                      <p className="text-primary font-medium">{study.client}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-2">Challenge</h4>
                        <p className="text-sm">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-2">Solution</h4>
                        <p className="text-sm">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-2">Outcome</h4>
                        <p className="text-sm font-medium text-primary">{study.outcome}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Testimonial */}
        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="text-center shadow-accent border-0 bg-gradient-subtle">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-2xl md:text-3xl font-medium mb-8 text-foreground">
                    "{data.testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-lg">{data.testimonial.author}</p>
                    <p className="text-muted-foreground">{data.testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Founder CTA Section */}
        <section className="py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <FounderCTA 
                ctaText={data.hero.primaryCtaText}
                variant={getCtaVariant()}
              />
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {data.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg px-6">
                    <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* End CTA */}
        <section className="py-14 bg-gradient-to-r from-primary to-primary-foreground text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {data.endCta.heading}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {data.endCta.subheading}
              </p>
              <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  {data.endCta.primaryCtaText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};