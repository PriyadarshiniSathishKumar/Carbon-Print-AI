
import React from "react";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onReset?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-eco-light shadow-sm">
      <div className="flex items-center space-x-2">
        <Leaf className="text-eco-primary h-8 w-8" />
        <div>
          <h1 className="text-2xl font-bold text-eco-dark">CarbonPrint AI</h1>
          <p className="text-sm text-eco-accent">Smart CO₂ Footprint Tracker</p>
        </div>
      </div>
      
      {onReset && (
        <Button 
          variant="outline" 
          onClick={onReset}
          className="border-eco-primary text-eco-primary hover:bg-eco-light hover:text-eco-dark"
        >
          Start New Assessment
        </Button>
      )}
    </header>
  );
};

export default Header;
