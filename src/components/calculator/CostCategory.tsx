
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CostInput from "./CostInput";
import { CostItem } from "@/types/calculator";

interface CostCategoryProps {
  title: string;
  icon: React.ReactNode;
  items: CostItem[];
  values: Record<string, number>;
  onChange: (id: string, value: number) => void;
  initialExpanded?: boolean;
}

export default function CostCategory({
  title,
  icon,
  items,
  values,
  onChange,
  initialExpanded = false,
}: CostCategoryProps) {
  const [expanded, setExpanded] = useState(initialExpanded);
  
  const totalCost = items.reduce((sum, item) => sum + (values[item.id] || 0), 0);

  return (
    <div className="rounded-lg border border-brand-mint/40 bg-gradient-card overflow-hidden mb-6 animate-fade-in shadow-sm">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 bg-brand-green/10 hover:bg-brand-green/15 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-white">
            {icon}
          </div>
          <h3 className="text-base font-medium text-brand-green">{title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-brand-green">
            ₹{totalCost.toLocaleString('en-IN')}
          </span>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-brand-green" />
          ) : (
            <ChevronDown className="h-5 w-5 text-brand-green" />
          )}
        </div>
      </button>
      {expanded && (
        <div className="p-4 space-y-4 bg-white">
          {items.map((item) => (
            <CostInput
              key={item.id}
              id={item.id}
              label={item.label}
              description={item.description}
              value={values[item.id] || 0}
              onChange={(value) => onChange(item.id, value)}
              step={item.step}
            />
          ))}
        </div>
      )}
    </div>
  );
}
