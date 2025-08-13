import type { LucideIcon } from 'lucide-react';
import { BarChart3, BookOpen, Target, Zap } from 'lucide-react';

interface ValuePillar {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ProcessStep {
  phase: string;
  title: string;
  description: string;
}

interface Specialization {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export const trustLogos = [
  'AICPA Member',
  'American Bar Association',
  'Chamber of Commerce',
  'Better Business Bureau'
];

export const valuePillars: ValuePillar[] = [
  {
    title: 'Strategic Authority Building',
    description:
      'Industry-aware structure and messaging that conveys deep expertise and reduces risk.',
    icon: Target
  },
  {
    title: 'Quantifiable Trust Signals',
    description:
      'Data-backed case studies, endorsements, and detailed bios; proof over platitudes.',
    icon: BarChart3
  },
  {
    title: 'Conversion-Optimized Journey',
    description:
      'Streamlined paths to consultations, resource downloads, and qualified inquiries.',
    icon: Zap
  }
];

export const processSteps: ProcessStep[] = [
  {
    phase: '01',
    title: 'Strategic Discovery',
    description: 'Deep-dive into your practice, competitors, and client journey'
  },
  {
    phase: '02',
    title: 'Authority Architecture',
    description: 'Design sophisticated information hierarchy and trust signals'
  },
  {
    phase: '03',
    title: 'Premium Development',
    description: 'Hand-coded, performance-optimized platform development'
  },
  {
    phase: '04',
    title: 'Growth Optimization',
    description: 'Analytics setup, conversion tracking, and iterative improvements'
  }
];

export const specializations: Specialization[] = [
  {
    title: 'Lawyers',
    description: 'Build credibility, showcase expertise, attract high-value cases',
    href: '/lawyers',
    icon: BookOpen
  },
  {
    title: 'Accountants',
    description: 'Demonstrate trust, highlight credentials, grow your practice',
    href: '/accountants',
    icon: BarChart3
  },
  {
    title: 'Consultants',
    description: 'Establish authority, prove ROI, convert prospects to clients',
    href: '/consultants',
    icon: Target
  }
];

