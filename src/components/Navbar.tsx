
import { Calculator, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-brand-cream/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-brand-green">
            <Calculator className="h-6 w-6" />
            <span>StartupCalc</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-brand-charcoal hover:text-brand-green transition-colors">
              Home
            </Link>
            <Link 
              to="/startup-calculator" 
              className="text-brand-green font-medium"
            >
              Startup Cost Calculator
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden md:flex items-center justify-center rounded-md bg-brand-green px-4 py-2 text-sm font-medium text-white hover:bg-brand-green/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
