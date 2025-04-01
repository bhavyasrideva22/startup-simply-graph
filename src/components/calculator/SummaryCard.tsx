
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CostCategory } from "@/types/calculator";

interface SummaryCardProps {
  categorizedCosts: CostCategory[];
  values: Record<string, number>;
}

export default function SummaryCard({ categorizedCosts, values }: SummaryCardProps) {
  const calculateCategoryTotal = (category: CostCategory) => {
    return category.items.reduce((sum, item) => sum + (values[item.id] || 0), 0);
  };

  const totalCost = categorizedCosts.reduce(
    (total, category) => total + calculateCategoryTotal(category),
    0
  );

  return (
    <Card className="bg-white shadow-md border-brand-mint/40">
      <CardHeader className="bg-brand-green text-white pb-3">
        <CardTitle className="text-xl">Startup Cost Summary</CardTitle>
        <CardDescription className="text-brand-mint/90">
          Estimated expenses to start your business
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {categorizedCosts.map((category) => {
            const categoryTotal = calculateCategoryTotal(category);
            const percentage = totalCost ? Math.round((categoryTotal / totalCost) * 100) : 0;
            
            return (
              <div key={category.title} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green/20 text-brand-green">
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium">{category.title}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">₹{categoryTotal.toLocaleString('en-IN')}</div>
                  <div className="text-xs text-muted-foreground">{percentage}%</div>
                </div>
              </div>
            );
          })}
          <div className="pt-4 mt-2 border-t">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold">Total Startup Cost</span>
              <span className="text-base font-bold text-brand-green">
                ₹{totalCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
