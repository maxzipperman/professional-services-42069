import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, TrendingDown } from 'lucide-react';

const ROICalculator = () => {
  const [timeframe, setTimeframe] = useState(3);

  const positionDigitalCost = {
    upfront: 4500,
    hosting: 120, // per year
    maintenance: 0
  };

  const typicalAgencyCost = {
    upfront: 3500,
    hosting: 0,
    maintenance: 50 * 12 // $50/month
  };

  const calculateTotalCost = (costs: typeof positionDigitalCost) => {
    return costs.upfront + (costs.hosting + costs.maintenance) * timeframe;
  };

  const positionTotal = calculateTotalCost(positionDigitalCost);
  const typicalTotal = calculateTotalCost(typicalAgencyCost);
  const savings = typicalTotal - positionTotal;

  return (
    <section className="py-16 lg:py-24 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Calculator className="h-4 w-4 mr-2" />
              No Ongoing Fees
            </Badge>
            <h2 className="mb-6">
              Save Thousands with 
              <span className="text-accent"> No Platform Lock-In</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how much you'll save over {timeframe} years compared to typical agency solutions with ongoing fees.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Position Digital */}
            <Card className="border-2 border-accent/20 shadow-accent">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-accent">Position Digital</CardTitle>
                <CardDescription>One-time investment, no ongoing fees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Initial Investment</span>
                    <span className="font-semibold">${positionDigitalCost.upfront.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hosting ({timeframe} years)</span>
                    <span className="font-semibold">${(positionDigitalCost.hosting * timeframe).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform/Maintenance Fees</span>
                    <span className="font-semibold text-success">$0</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Cost ({timeframe} years)</span>
                    <span className="text-accent">${positionTotal.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Typical Agency */}
            <Card className="shadow-medium">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingDown className="h-6 w-6 text-muted-foreground" />
                </div>
                <CardTitle>Typical Agency</CardTitle>
                <CardDescription>Lower upfront, ongoing monthly fees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Initial Investment</span>
                    <span className="font-semibold">${typicalAgencyCost.upfront.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hosting ({timeframe} years)</span>
                    <span className="font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform/Maintenance Fees</span>
                    <span className="font-semibold">${(typicalAgencyCost.maintenance * timeframe).toLocaleString()}</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Cost ({timeframe} years)</span>
                    <span>${typicalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeframe Selector */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-muted rounded-lg p-1">
              {[1, 2, 3, 5].map((years) => (
                <Button
                  key={years}
                  variant={timeframe === years ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeframe(years)}
                  className="px-6"
                >
                  {years} Year{years > 1 ? 's' : ''}
                </Button>
              ))}
            </div>
          </div>

          {/* Savings Summary */}
          <Card className="text-center gradient-accent border-0">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold text-accent-foreground mb-2">
                You Save ${savings.toLocaleString()}
              </h3>
              <p className="text-accent-foreground/80 text-lg">
                Over {timeframe} years with Position Digital's no-fee approach
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;