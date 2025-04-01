
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, MinusCircle, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CostInputProps {
  id: string;
  label: string;
  description?: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
}

export default function CostInput({
  id,
  label,
  description,
  value,
  onChange,
  step = 1000,
  min = 0,
  max = 10000000,
}: CostInputProps) {
  const [focused, setFocused] = useState(false);

  const handleDecrease = () => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0;
    onChange(Math.min(Math.max(newValue, min), max));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Label htmlFor={id} className="text-sm font-medium">
            {label}
          </Label>
          {description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-brand-green opacity-70" />
                </TooltipTrigger>
                <TooltipContent className="bg-white p-3 max-w-xs shadow-lg rounded-lg border border-brand-mint/30">
                  <p className="text-sm">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <span className="text-sm text-brand-green font-medium">
          ₹{value.toLocaleString('en-IN')}
        </span>
      </div>
      <div className="flex rounded-md">
        <button
          type="button"
          onClick={handleDecrease}
          className="flex items-center justify-center w-10 h-10 rounded-l-md bg-brand-mint/30 hover:bg-brand-mint/50 text-brand-green border border-brand-mint/40"
        >
          <MinusCircle className="h-4 w-4" />
        </button>
        <Input
          id={id}
          type="text"
          value={focused ? value : `₹${value.toLocaleString('en-IN')}`}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="rounded-none border-x-0 text-center bg-white border-brand-mint/40"
        />
        <button
          type="button"
          onClick={handleIncrease}
          className="flex items-center justify-center w-10 h-10 rounded-r-md bg-brand-mint/30 hover:bg-brand-mint/50 text-brand-green border border-brand-mint/40"
        >
          <PlusCircle className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
