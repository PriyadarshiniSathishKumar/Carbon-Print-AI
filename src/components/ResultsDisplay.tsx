
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, LeafyGreen, Home, ShoppingCart, TrendingDown } from "lucide-react";
import { useCarbonContext } from "@/contexts/CarbonContext";
import CarbonChart from "./CarbonChart";
import AiSuggestions from "./AiSuggestions";
import { reductionTips } from "../data/reductionTips";

const ResultsDisplay: React.FC = () => {
  const { userData, carbonFootprint, aiSuggestions } = useCarbonContext();

  if (!carbonFootprint) {
    return <div>Loading results...</div>;
  }

  // Format numbers
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(num));
  };

  // Get comparison text
  const getComparisonText = () => {
    const percentage = carbonFootprint.comparisonToAverage;
    if (percentage <= 60) {
      return "significantly lower than";
    } else if (percentage <= 90) {
      return "lower than";
    } else if (percentage <= 110) {
      return "about the same as";
    } else if (percentage <= 150) {
      return "higher than";
    } else {
      return "significantly higher than";
    }
  };

  // Get tips for each category
  const transportTips = reductionTips.filter(tip => tip.category === "transport").slice(0, 2);
  const dietTips = reductionTips.filter(tip => tip.category === "diet").slice(0, 2);
  const homeTips = reductionTips.filter(tip => tip.category === "home").slice(0, 2);
  const shoppingTips = reductionTips.filter(tip => tip.category === "shopping").slice(0, 2);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-eco-dark text-center mb-6">
        Your Carbon Footprint Results
      </h2>

      <div className="mb-8">
        <Card className="bg-gradient-to-br from-eco-light to-white p-6 shadow-md">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="bg-eco-primary w-24 h-24 rounded-full flex items-center justify-center mb-4 animate-pulse-green">
                <TrendingDown className="h-10 w-10 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-eco-dark mb-2">
              Hi {userData.name},
            </h3>
            <div className="text-4xl font-bold text-eco-accent mb-4">
              {formatNumber(carbonFootprint.totalEmissions)} kg CO₂e
            </div>
            <p className="text-muted-foreground">
              Your annual carbon footprint is <strong>{getComparisonText()}</strong> the average in {userData.location}.
            </p>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="breakdown">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="breakdown">Emissions Breakdown</TabsTrigger>
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="tips">Reduction Tips</TabsTrigger>
        </TabsList>
        
        <TabsContent value="breakdown" className="mt-6">
          <div className="space-y-6">
            <Card className="p-6">
              <CarbonChart footprint={carbonFootprint} />
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 border-l-4 border-l-blue-500">
                <div className="flex items-center mb-2">
                  <Car className="mr-2 h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Transport</h3>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {formatNumber(carbonFootprint.transportEmissions)} kg CO₂e
                </div>
                <p className="text-sm text-muted-foreground">
                  {Math.round((carbonFootprint.transportEmissions / carbonFootprint.totalEmissions) * 100)}% of your total emissions
                </p>
              </Card>
              
              <Card className="p-4 border-l-4 border-l-green-500">
                <div className="flex items-center mb-2">
                  <LeafyGreen className="mr-2 h-5 w-5 text-green-500" />
                  <h3 className="font-medium">Diet</h3>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {formatNumber(carbonFootprint.dietEmissions)} kg CO₂e
                </div>
                <p className="text-sm text-muted-foreground">
                  {Math.round((carbonFootprint.dietEmissions / carbonFootprint.totalEmissions) * 100)}% of your total emissions
                </p>
              </Card>
              
              <Card className="p-4 border-l-4 border-l-yellow-500">
                <div className="flex items-center mb-2">
                  <Home className="mr-2 h-5 w-5 text-yellow-500" />
                  <h3 className="font-medium">Home</h3>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {formatNumber(carbonFootprint.homeEmissions)} kg CO₂e
                </div>
                <p className="text-sm text-muted-foreground">
                  {Math.round((carbonFootprint.homeEmissions / carbonFootprint.totalEmissions) * 100)}% of your total emissions
                </p>
              </Card>
              
              <Card className="p-4 border-l-4 border-l-purple-500">
                <div className="flex items-center mb-2">
                  <ShoppingCart className="mr-2 h-5 w-5 text-purple-500" />
                  <h3 className="font-medium">Shopping</h3>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {formatNumber(carbonFootprint.shoppingEmissions)} kg CO₂e
                </div>
                <p className="text-sm text-muted-foreground">
                  {Math.round((carbonFootprint.shoppingEmissions / carbonFootprint.totalEmissions) * 100)}% of your total emissions
                </p>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="mt-6">
          <AiSuggestions suggestions={aiSuggestions} />
        </TabsContent>

        <TabsContent value="tips" className="mt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-5">
                <div className="flex items-center mb-4">
                  <Car className="mr-2 h-5 w-5 text-blue-500" />
                  <h3 className="font-medium text-lg">Transport Tips</h3>
                </div>
                <ul className="space-y-4">
                  {transportTips.map(tip => (
                    <li key={tip.id} className="border-b pb-3 last:border-0">
                      <div className="font-medium mb-1">{tip.title}</div>
                      <div className="text-sm text-muted-foreground">{tip.description}</div>
                      <div className="text-sm text-eco-accent font-medium mt-1">
                        Save up to {formatNumber(tip.potentialReduction)} kg CO₂/year
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
              
              <Card className="p-5">
                <div className="flex items-center mb-4">
                  <LeafyGreen className="mr-2 h-5 w-5 text-green-500" />
                  <h3 className="font-medium text-lg">Diet Tips</h3>
                </div>
                <ul className="space-y-4">
                  {dietTips.map(tip => (
                    <li key={tip.id} className="border-b pb-3 last:border-0">
                      <div className="font-medium mb-1">{tip.title}</div>
                      <div className="text-sm text-muted-foreground">{tip.description}</div>
                      <div className="text-sm text-eco-accent font-medium mt-1">
                        Save up to {formatNumber(tip.potentialReduction)} kg CO₂/year
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
              
              <Card className="p-5">
                <div className="flex items-center mb-4">
                  <Home className="mr-2 h-5 w-5 text-yellow-500" />
                  <h3 className="font-medium text-lg">Home Tips</h3>
                </div>
                <ul className="space-y-4">
                  {homeTips.map(tip => (
                    <li key={tip.id} className="border-b pb-3 last:border-0">
                      <div className="font-medium mb-1">{tip.title}</div>
                      <div className="text-sm text-muted-foreground">{tip.description}</div>
                      <div className="text-sm text-eco-accent font-medium mt-1">
                        Save up to {formatNumber(tip.potentialReduction)} kg CO₂/year
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
              
              <Card className="p-5">
                <div className="flex items-center mb-4">
                  <ShoppingCart className="mr-2 h-5 w-5 text-purple-500" />
                  <h3 className="font-medium text-lg">Shopping Tips</h3>
                </div>
                <ul className="space-y-4">
                  {shoppingTips.map(tip => (
                    <li key={tip.id} className="border-b pb-3 last:border-0">
                      <div className="font-medium mb-1">{tip.title}</div>
                      <div className="text-sm text-muted-foreground">{tip.description}</div>
                      <div className="text-sm text-eco-accent font-medium mt-1">
                        Save up to {formatNumber(tip.potentialReduction)} kg CO₂/year
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsDisplay;
