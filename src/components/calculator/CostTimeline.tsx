
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CostCategory } from "@/types/calculator";

interface CostTimelineProps {
  categorizedCosts: CostCategory[];
  values: Record<string, number>;
}

export default function CostTimeline({ categorizedCosts, values }: CostTimelineProps) {
  const oneTimeCosts = categorizedCosts
    .filter(cat => ["Legal & Administrative", "Equipment & Technology", "Location & Facilities", "Initial Inventory"].includes(cat.title))
    .flatMap(cat => cat.items)
    .reduce((sum, item) => sum + (values[item.id] || 0), 0);

  const ongoingMonthlyCosts = categorizedCosts
    .filter(cat => ["Marketing & Sales", "Operating Expenses", "Staffing & Payroll"].includes(cat.title))
    .flatMap(cat => cat.items)
    .reduce((sum, item) => sum + (values[item.id] || 0), 0);

  const sixMonthRunway = ongoingMonthlyCosts * 6;
  
  const data = [
    { name: 'One-time Costs', amount: oneTimeCosts },
    { name: '6-Month Runway', amount: sixMonthRunway },
    { name: 'Total Startup Cost', amount: oneTimeCosts + sixMonthRunway },
  ];

  return (
    <div className="h-[350px] bg-white rounded-lg border border-brand-mint/40 p-4">
      <h3 className="text-base font-medium text-center mb-4">Startup Cost Timeline</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={(value) => `₹${value >= 1000 ? `${(value/1000).toFixed(0)}K` : value}`}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar dataKey="amount" fill="#245e4f" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
