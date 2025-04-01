
import { ReactNode } from "react";

export interface CostItem {
  id: string;
  label: string;
  description?: string;
  step?: number;
  defaultValue?: number;
}

export interface CostCategory {
  title: string;
  icon: ReactNode;
  items: CostItem[];
}
