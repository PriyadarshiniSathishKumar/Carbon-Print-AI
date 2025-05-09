
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ShoppingCart, Smartphone } from "lucide-react";
import { useCarbonContext } from "@/contexts/CarbonContext";

const ShoppingForm: React.FC = () => {
  const { shoppingData, setShoppingData, currentStep, setCurrentStep } = useCarbonContext();

  const handleClothesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value));
    setShoppingData({ ...shoppingData, newClothesPerYear: value });
  };

  const handleElectronicsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value));
    setShoppingData({ ...shoppingData, electronicsSpendPerYear: value });
  };

  const handleRecyclingChange = (values: number[]) => {
    setShoppingData({ ...shoppingData, recyclingPercentage: values[0] });
  };

  return (
    <Card className="max-w-md w-full mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center text-eco-dark">Shopping & Waste</h2>
        <p className="text-center text-muted-foreground mt-2">
          Let's look at your consumption habits.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center mb-2">
            <ShoppingCart className="mr-2 h-5 w-5 text-eco-accent" />
            <h3 className="font-medium text-lg">Clothing</h3>
          </div>
          
          <div>
            <label htmlFor="clothes" className="input-label">
              New clothing items purchased per year
            </label>
            <Input
              id="clothes"
              type="number"
              min={0}
              value={shoppingData.newClothesPerYear}
              onChange={handleClothesChange}
              className="input-field"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center mb-2">
            <Smartphone className="mr-2 h-5 w-5 text-eco-accent" />
            <h3 className="font-medium text-lg">Electronics</h3>
          </div>
          
          <div>
            <label htmlFor="electronics" className="input-label">
              Annual spending on electronics ($)
            </label>
            <Input
              id="electronics"
              type="number"
              min={0}
              value={shoppingData.electronicsSpendPerYear}
              onChange={handleElectronicsChange}
              className="input-field"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Include computers, phones, TVs, and other electronic devices.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center mb-2">
            <h3 className="font-medium text-lg">Recycling</h3>
          </div>
          
          <div>
            <label className="input-label">
              Percentage of waste you recycle: {shoppingData.recyclingPercentage}%
            </label>
            <Slider
              value={[shoppingData.recyclingPercentage]}
              min={0}
              max={100}
              step={5}
              onValueChange={handleRecyclingChange}
              className="py-4"
            />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(currentStep - 1)}
            className="border-eco-primary text-eco-primary hover:bg-eco-light"
          >
            Back
          </Button>
          <Button 
            onClick={() => setCurrentStep(currentStep + 1)}
            className="bg-eco-primary hover:bg-eco-dark text-white"
          >
            Complete Assessment
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ShoppingForm;
