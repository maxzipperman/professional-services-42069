export const industryPrompts = {
  "Professional Services": "Analyze this professional services website for trust signals, compliance considerations, and conversion optimization. Focus on credibility factors, call-to-action placement, accessibility standards, and whether the messaging clearly communicates expertise and builds confidence in potential clients.",
  
  "Local Businesses": "Review this local business website for local SEO potential, mobile experience, and conversion paths. Analyze contact information visibility, service clarity, geographic targeting, Google My Business integration, and whether the site effectively drives foot traffic and phone calls.",
  
  "Nonprofits": "Evaluate this nonprofit website for donor engagement, volunteer recruitment, and mission clarity. Focus on storytelling effectiveness, donation flow optimization, impact communication, accessibility compliance, and whether the site successfully converts visitors into supporters and advocates.",
  
  "Creatives": "Assess this creative professional's website for portfolio presentation, service clarity, and client attraction. Analyze visual hierarchy, work showcase effectiveness, booking process optimization, and whether the site positions the creative as a premium, sought-after professional.",
  
  "Lawyers": "Analyze this law firm website for legal compliance, trust building, and client acquisition. Focus on ethical advertising compliance, case result presentation, attorney credibility signals, practice area clarity, and whether the site effectively converts prospects into consultations while maintaining professional standards.",
  
  "Accountants": "Review this accounting firm website for professional credibility, service clarity, and lead generation. Analyze trust signals, compliance messaging, service packaging, seasonal content strategy, and whether the site effectively attracts and converts high-value business clients during key periods like tax season.",
  
  "Consultants": "Evaluate this consulting website for thought leadership positioning, expertise demonstration, and client attraction. Focus on authority building, case study presentation, service differentiation, pricing transparency, and whether the site effectively positions the consultant as a premium expert worth hiring."
};

export const getIndustryPrompt = (industry: string): string => {
  return industryPrompts[industry as keyof typeof industryPrompts] || industryPrompts["Professional Services"];
};