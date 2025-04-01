
import { Link } from "react-router-dom";
import { Calculator, ArrowRight, BarChart4, Download, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-green to-brand-green/90 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Plan Your Business Finances with Precision
              </h1>
              <p className="text-xl text-brand-mint mb-8">
                Our interactive calculators help entrepreneurs make informed financial decisions with accurate cost estimates.
              </p>
              <Link
                to="/startup-calculator"
                className="inline-flex items-center justify-center rounded-md bg-brand-gold px-6 py-3 text-base font-medium text-brand-charcoal hover:bg-brand-gold/90 transition-colors"
              >
                Try Startup Cost Calculator
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-brand-green text-center mb-12">
              Why Use Our Calculator
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-brand-mint/30">
                <div className="h-12 w-12 bg-brand-green/10 rounded-full flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold text-brand-charcoal mb-3">
                  Comprehensive Cost Estimates
                </h3>
                <p className="text-muted-foreground">
                  Account for all startup expenses with our detailed categories covering everything from legal fees to marketing costs.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-brand-mint/30">
                <div className="h-12 w-12 bg-brand-green/10 rounded-full flex items-center justify-center mb-4">
                  <BarChart4 className="h-6 w-6 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold text-brand-charcoal mb-3">
                  Visual Breakdowns
                </h3>
                <p className="text-muted-foreground">
                  Interactive charts and graphs help you visualize your startup costs and understand where your money is going.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-brand-mint/30">
                <div className="h-12 w-12 bg-brand-green/10 rounded-full flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold text-brand-charcoal mb-3">
                  Shareable Reports
                </h3>
                <p className="text-muted-foreground">
                  Download or email professional PDF reports of your cost estimates to share with partners, investors, or lenders.
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link
                to="/startup-calculator"
                className="inline-flex items-center justify-center rounded-md bg-brand-green px-6 py-3 text-base font-medium text-white hover:bg-brand-green/90 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-brand-mint/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-brand-green mb-6">
                Ready to Plan Your Startup Budget?
              </h2>
              <p className="text-lg text-brand-charcoal mb-8">
                Use our interactive calculator to get a detailed breakdown of all the costs involved in launching your business in India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/startup-calculator"
                  className="inline-flex items-center justify-center rounded-md bg-brand-green px-6 py-3 text-base font-medium text-white hover:bg-brand-green/90 transition-colors"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Launch Calculator
                </Link>
                <a
                  href="mailto:info@startupcalc.com"
                  className="inline-flex items-center justify-center rounded-md border border-brand-green bg-transparent px-6 py-3 text-base font-medium text-brand-green hover:bg-brand-green/10 transition-colors"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Index;
