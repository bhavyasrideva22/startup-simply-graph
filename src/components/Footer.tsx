
import { Calculator, Mail, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-green text-white py-12">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-white mb-4">
            <Calculator className="h-6 w-6" />
            <span>StartupCalc</span>
          </div>
          <p className="text-brand-mint/90 max-w-sm">
            Helping entrepreneurs make informed financial decisions with our easy-to-use calculators and comprehensive business resources.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-brand-mint/90 hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/startup-calculator" className="text-brand-mint/90 hover:text-white transition-colors">
                Startup Cost Calculator
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-brand-mint/90 hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-brand-mint/90 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <div className="space-y-2">
            <a href="mailto:info@startupcalc.com" className="flex items-center gap-2 text-brand-mint/90 hover:text-white transition-colors">
              <Mail className="h-4 w-4" />
              info@startupcalc.com
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-2 text-brand-mint/90 hover:text-white transition-colors">
              <PhoneCall className="h-4 w-4" />
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t border-brand-mint/20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-brand-mint/90 text-sm">
            © {new Date().getFullYear()} StartupCalc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-brand-mint/90 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-brand-mint/90 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
