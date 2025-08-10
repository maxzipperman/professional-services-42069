export interface ComparisonRow {
  label: string;
  values: string[]; // One value per column
  emphasis?: boolean;
}

export interface ComparisonTableData {
  title?: string;
  subtitle?: string;
  columns: string[]; // e.g., ["Position Digital", "DIY Builders", "Traditional Agency"]
  rows: ComparisonRow[];
  footnote?: string;
}

export interface IndustryData {
  industry: string;
  slug: string;
  vanityAliases?: string[];
  hero: {
    headline: string;
    subheadline: string;
    primaryCtaText: string;
    secondaryCtaText: string;
  };
  whyMatters: string[];
  proof: string[];
  servicesFocus: string[];
  icon?: string;
  valueProps?: string[];
  subProfessions?: { name: string; icon: string }[];
  caseStudies: {
    title: string;
    client: string;
    challenge: string;
    solution: string;
    outcome: string;
  }[];
  beforeAfter: {
    beforeImage: string;
    afterImage: string;
    caption: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  faqs: {
    q: string;
    a: string;
  }[];
  endCta: {
    heading: string;
    subheading: string;
    primaryCtaText: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  offers?: { name: string; description: string; points: string[] }[];
  gtm?: { title: string; points: string[] };
  comparison?: ComparisonTableData;
}