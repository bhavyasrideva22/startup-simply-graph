
import { useState, useEffect } from "react";
import {
  BadgeIndianRupee,
  Calculator,
  Calendar,
  Clock,
  Goal,
  Info,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CostCategory from "@/components/calculator/CostCategory";
import SummaryCard from "@/components/calculator/SummaryCard";
import CostChart from "@/components/calculator/CostChart";
import CostTimeline from "@/components/calculator/CostTimeline";
import ResultActions from "@/components/calculator/ResultActions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { calculatorData } from "@/data/calculatorData";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StartupCalculator() {
  const [businessName, setBusinessName] = useState<string>("");
  const [values, setValues] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<string>("calculator");

  useEffect(() => {
    // Initialize default values
    const initialValues: Record<string, number> = {};
    calculatorData.forEach((category) => {
      category.items.forEach((item) => {
        if (item.defaultValue) {
          initialValues[item.id] = item.defaultValue;
        } else {
          initialValues[item.id] = 0;
        }
      });
    });
    setValues(initialValues);
  }, []);

  const handleValueChange = (id: string, value: number) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const totalCost = Object.values(values).reduce((total, value) => total + value, 0);

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Navbar />
      <main className="flex-1">
        <section className="bg-brand-green py-12 md:py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Startup Cost Calculator
              </h1>
              <p className="text-brand-mint/90 md:text-lg">
                Accurately estimate how much it will cost to launch your business in India with our comprehensive startup cost calculator.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container">
            <div className="grid gap-8">
              {/* Combined calculator and charts in one container */}
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Calculator section - 8 columns */}
                <div className="lg:col-span-8">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="calculator" className="text-sm">
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculator
                      </TabsTrigger>
                      <TabsTrigger value="guide" className="text-sm">
                        <Info className="h-4 w-4 mr-2" />
                        Guide
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="calculator" className="mt-0">
                      <div className="bg-white rounded-lg border border-brand-mint/40 p-4 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-white">
                            <BadgeIndianRupee className="h-4 w-4" />
                          </div>
                          <h2 className="text-lg font-medium text-brand-green">Business Information</h2>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="business-name">Business Name</Label>
                            <Input
                              id="business-name"
                              placeholder="Enter your business name"
                              value={businessName}
                              onChange={(e) => setBusinessName(e.target.value)}
                              className="mt-1.5"
                            />
                          </div>
                        </div>
                      </div>

                      {calculatorData.map((category, index) => (
                        <CostCategory
                          key={category.title}
                          title={category.title}
                          icon={category.icon}
                          items={category.items}
                          values={values}
                          onChange={handleValueChange}
                          initialExpanded={index === 0}
                        />
                      ))}

                      {/* Results Action Buttons */}
                      <div className="mt-6">
                        <ResultActions 
                          categorizedCosts={calculatorData} 
                          values={values} 
                          businessName={businessName}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="guide">
                      <Card className="bg-white border-brand-mint/40">
                        <CardContent className="p-6">
                          <h2 className="text-xl font-semibold text-brand-green mb-4">Understanding Startup Costs in India</h2>
                          
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium text-brand-charcoal mb-2">
                                Why Calculate Startup Costs?
                              </h3>
                              <p className="text-muted-foreground">
                                Accurately estimating your startup costs is crucial for securing funding, creating realistic financial projections, and ensuring your business has enough capital to reach profitability. Many entrepreneurs underestimate their initial costs, leading to cash flow problems within the first year.
                              </p>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium text-brand-charcoal mb-2">
                                One-Time vs. Ongoing Costs
                              </h3>
                              <p className="text-muted-foreground">
                                Startup costs typically fall into two categories:
                              </p>
                              <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
                                <li><span className="font-medium text-brand-charcoal">One-time costs:</span> Expenses that occur only during the startup phase, such as business registration, initial inventory, equipment purchases, and security deposits.</li>
                                <li><span className="font-medium text-brand-charcoal">Ongoing costs:</span> Regular expenses that continue after your business is operational, such as rent, utilities, salaries, and marketing.</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium text-brand-charcoal mb-2">
                                How to Use This Calculator
                              </h3>
                              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                <li>Enter your business name (optional).</li>
                                <li>Open each category and adjust the cost estimates to match your specific business needs.</li>
                                <li>Review the summary and charts to understand your total startup investment.</li>
                                <li>Download or email your detailed cost breakdown for reference or to share with stakeholders.</li>
                              </ol>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium text-brand-charcoal mb-2">
                                Planning for Contingencies
                              </h3>
                              <p className="text-muted-foreground">
                                Financial experts typically recommend adding a contingency fund of 15-25% to your estimated startup costs to account for unexpected expenses and delays. This buffer is especially important for first-time entrepreneurs who may encounter unforeseen challenges.
                              </p>
                            </div>
                            
                            <div className="bg-brand-mint/20 p-4 rounded-lg">
                              <h3 className="text-lg font-medium text-brand-green mb-2 flex items-center">
                                <Goal className="h-5 w-5 mr-2" />
                                Pro Tip
                              </h3>
                              <p className="text-muted-foreground">
                                Consider creating three different versions of your startup budget: a bare minimum scenario, a realistic scenario, and an optimal scenario. This approach helps you understand the range of capital you might need and allows for flexibility in your business planning.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Charts section - 4 columns */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Cost Chart */}
                  <CostChart categorizedCosts={calculatorData} values={values} />
                  
                  {/* Cost Timeline */}
                  <CostTimeline categorizedCosts={calculatorData} values={values} />
                  
                  {/* Total Cost Summary (simplified) */}
                  <Card className="bg-white shadow-md border-brand-mint/40">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h3 className="text-lg font-medium text-brand-green mb-2">Total Startup Cost</h3>
                        <p className="text-2xl font-bold text-brand-green">
                          ₹{totalCost.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Ad space */}
              <div className="w-full bg-white border border-brand-mint/40 rounded-lg p-4 min-h-[250px] flex items-center justify-center">
                <div className="text-center text-muted-foreground bg-[#0000001a] w-full h-full min-h-[200px] flex items-center justify-center rounded-md">
                  <p>Google Ad Space</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-brand-green mb-6 text-center">
                Understanding Your Startup Costs
              </h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Starting a business in India requires careful financial planning. Every rupee counts when you're launching a new venture, and understanding your startup costs is crucial for success. This calculator helps you estimate all the essential expenses you'll encounter when launching your business.
                </p>
                
                <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-brand-green" />
                  Planning Your Timeline
                </h3>
                
                <p>
                  Most startups take 6-12 months to become profitable. Your startup cost calculation should include enough runway to sustain your business during this critical period. Our calculator helps you visualize both your immediate costs and the operational expenses needed until you reach sustainable revenue.
                </p>
                
                <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-brand-green" />
                  Beyond the Launch
                </h3>
                
                <p>
                  Successful entrepreneurs know that startup costs extend beyond the initial launch. Our calculator includes categories for ongoing expenses like rent, utilities, and payroll that will continue after your doors open. We recommend budgeting for at least six months of these expenses to give your business time to generate consistent revenue.
                </p>
                
                <div className="bg-brand-mint/20 p-6 rounded-lg mt-6">
                  <h3 className="text-xl font-semibold text-brand-green mb-3">
                    Did You Know?
                  </h3>
                  <p className="m-0">
                    According to studies on Indian startups, most new businesses underestimate their initial costs by 30-40%. This miscalculation is often cited as one of the primary reasons for startup failure within the first two years. Using our comprehensive calculator can help you avoid this common pitfall by accounting for both obvious and hidden costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
