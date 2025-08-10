import React from 'react';

const HeroGraphic: React.FC = () => {
  return (
    <svg
      viewBox="0 0 600 400"
      className="w-full h-auto"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.08)" />
          <stop offset="100%" stopColor="hsl(var(--accent) / 0.12)" />
        </linearGradient>
        <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--accent) / 0.9)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0.9)" />
        </linearGradient>
      </defs>

      {/* Background panel */}
      <rect x="0" y="0" width="600" height="400" rx="24" fill="url(#g1)" />

      {/* Grid */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={60 + i * 56}
          y1={40}
          x2={60 + i * 56}
          y2={360}
          stroke="hsl(var(--border))"
          strokeOpacity="0.4"
        />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1={40}
          y1={60 + i * 50}
          x2={560}
          y2={60 + i * 50}
          stroke="hsl(var(--border))"
          strokeOpacity="0.4"
        />
      ))}

      {/* Accent shapes */}
      <circle cx="150" cy="120" r="28" fill="hsl(var(--accent))" fillOpacity="0.2" />
      <circle cx="180" cy="120" r="10" fill="hsl(var(--accent))" />

      <rect x="220" y="90" width="160" height="24" rx="6" fill="hsl(var(--primary))" fillOpacity="0.12" />
      <rect x="220" y="124" width="120" height="12" rx="6" fill="hsl(var(--primary))" fillOpacity="0.18" />

      {/* Chart-like area */}
      <path
        d="M80 300 L150 240 L230 270 L310 210 L390 230 L470 160"
        fill="none"
        stroke="url(#g2)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="150" cy="240" r="6" fill="hsl(var(--accent))" />
      <circle cx="310" cy="210" r="6" fill="hsl(var(--accent))" />
      <circle cx="470" cy="160" r="6" fill="hsl(var(--accent))" />

      {/* Card mockups */}
      <rect x="100" y="320" width="120" height="40" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
      <rect x="260" y="320" width="90" height="40" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
      <rect x="380" y="320" width="120" height="40" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
    </svg>
  );
};

export default HeroGraphic;
