
import React from "react";
import { Card } from "@/components/ui/card";
import { AiSuggestion } from "../types/carbon";
import { Car, LeafyGreen, Home, ShoppingCart, Bot } from "lucide-react";

interface AiSuggestionsProps {
  suggestions: AiSuggestion[];
}

const AiSuggestions: React.FC<AiSuggestionsProps> = ({ suggestions }) => {
  // Function to get icon based on category
  const getIcon = (category: string) => {
    switch (category) {
      case "transport":
        return <Car className="h-5 w-5 text-blue-500" />;
      case "diet":
        return <LeafyGreen className="h-5 w-5 text-green-500" />;
      case "home":
        return <Home className="h-5 w-5 text-yellow-500" />;
      case "shopping":
        return <ShoppingCart className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  // Function to get color based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "transport":
        return "border-blue-500";
      case "diet":
        return "border-green-500";
      case "home":
        return "border-yellow-500";
      case "shopping":
        return "border-purple-500";
      default:
        return "border-gray-300";
    }
  };

  if (suggestions.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No Personalized Suggestions</h3>
        <p className="text-muted-foreground mt-2">
          We're still analyzing your data. Check back soon for AI-powered recommendations.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center space-x-2 mb-6">
        <Bot className="h-6 w-6 text-eco-accent" />
        <h3 className="text-lg font-medium">AI-Powered Recommendations</h3>
      </div>

      {suggestions.map((suggestion, index) => (
        <Card 
          key={index} 
          className={`p-5 border-l-4 ${getCategoryColor(suggestion.category)}`}
        >
          <div className="flex items-start">
            <div className="mt-1 mr-3">
              {getIcon(suggestion.category)}
            </div>
            <div>
              <h4 className="font-medium mb-2">{suggestion.suggestion}</h4>
              <p className="text-sm text-muted-foreground mb-2">{suggestion.reasoning}</p>
              <p className="text-sm text-eco-accent font-medium">{suggestion.potentialImpact}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AiSuggestions;
