import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';

interface StatProps {
  value: string;
  label: string;
  description: string;
}

interface AnimatedStatsProps {
  stats: StatProps[];
}

const AnimatedCounter = ({ value, duration = 2000 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/\d/g, '');

  useEffect(() => {
    let startTime: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * numericValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [numericValue, duration]);

  return <span>{count}{suffix}</span>;
};

export const AnimatedStats = ({ stats }: AnimatedStatsProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center hover-lift transition-smooth border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-primary mb-2">
              <AnimatedCounter value={stat.value} />
            </div>
            <h3 className="font-semibold mb-2">{stat.label}</h3>
            <p className="text-sm text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};