
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CostCategory } from "@/types/calculator";

interface CostChartProps {
  categorizedCosts: CostCategory[];
  values: Record<string, number>;
}

export default function CostChart({ categorizedCosts, values }: CostChartProps) {
  const chartColors = ["#245e4f", "#7ac9a7", "#e9c46a", "#4a8fe7", "#f4a261", "#e76f51"];
  
  const chartData = categorizedCosts.map((category, index) => {
    const total = category.items.reduce((sum, item) => sum + (values[item.id] || 0), 0);
    return {
      name: category.title,
      value: total,
      color: chartColors[index % chartColors.length],
    };
  }).filter(item => item.value > 0);

  // Ensure we have data to display
  if (chartData.length === 0 || chartData.every(item => item.value === 0)) {
    return (
      <div className="h-[350px] flex items-center justify-center bg-white rounded-lg border border-brand-mint/40 p-4">
        <p className="text-muted-foreground text-center">
          Add some costs to see your expense breakdown
        </p>
      </div>
    );
  }

  return (
    <div className="h-[350px] bg-white rounded-lg border border-brand-mint/40 p-4">
      <h3 className="text-base font-medium text-center mb-4">Cost Breakdown</h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend 
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={(value) => <span className="text-xs">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
