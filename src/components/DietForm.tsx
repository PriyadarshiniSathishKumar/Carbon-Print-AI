
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCarbonContext } from "@/contexts/CarbonContext";
import { LeafyGreen, Beef, Egg } from "lucide-react";

const DietForm: React.FC = () => {
  const { dietData, setDietData, currentStep, setCurrentStep } = useCarbonContext();

  const handleDietTypeChange = (value: string) => {
    setDietData({ ...dietData, dietType: value as any });
  };

  const handleRedMeatChange = (value: string) => {
    setDietData({ ...dietData, redMeatFrequency: value as any });
  };

  const handleDairyChange = (value: string) => {
    setDietData({ ...dietData, dairyFrequency: value as any });
  };

  const handleLocalFoodChange = (values: number[]) => {
    setDietData({ ...dietData, localFoodPercentage: values[0] });
  };

  return (
    <Card className="max-w-md w-full mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center text-eco-dark">Diet</h2>
        <p className="text-center text-muted-foreground mt-2">
          Tell us about your eating habits.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center mb-2">
            <LeafyGreen className="mr-2 h-5 w-5 text-eco-accent" />
            <h3 className="font-medium text-lg">Diet Type</h3>
          </div>
          
          <div>
            <label htmlFor="dietType" className="input-label">
              What best describes your diet?
            </label>
            <Select 
              value={dietData.dietType} 
              onValueChange={handleDietTypeChange}
            >
              <SelectTrigger id="dietType" className="input-field">
                <SelectValue placeholder="Select diet type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegan">Vegan (no animal products)</SelectItem>
                <SelectItem value="vegetarian">Vegetarian (no meat)</SelectItem>
                <SelectItem value="pescatarian">Pescatarian (fish, no meat)</SelectItem>
                <SelectItem value="flexitarian">Flexitarian (occasionally meat)</SelectItem>
                <SelectItem value="omnivore">Omnivore (regular meat eater)</SelectItem>
                <SelectItem value="carnivore">Carnivore (mostly meat-based)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center mb-2">
            <Beef className="mr-2 h-5 w-5 text-eco-accent" />
            <h3 className="font-medium text-lg">Red Meat Consumption</h3>
          </div>
          
          <div>
            <label htmlFor="redMeat" className="input-label">
              How often do you eat red meat?
            </label>
            <Select 
              value={dietData.redMeatFrequency} 
              onValueChange={handleRedMeatChange}
            >
              <SelectTrigger id="redMeat" className="input-field">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="rarely">Rarely (few times a month)</SelectItem>
                <SelectItem value="sometimes">Sometimes (1-2 times a week)</SelectItem>
                <SelectItem value="often">Often (3-5 times a week)</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center mb-2">
            <Egg className="mr-2 h-5 w-5 text-eco-accent" />
            <h3 className="font-medium text-lg">Dairy Consumption</h3>
          </div>
          
          <div>
            <label htmlFor="dairy" className="input-label">
              How often do you consume dairy products?
            </label>
            <Select 
              value={dietData.dairyFrequency} 
              onValueChange={handleDairyChange}
            >
              <SelectTrigger id="dairy" className="input-field">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="rarely">Rarely (few times a month)</SelectItem>
                <SelectItem value="sometimes">Sometimes (1-2 times a week)</SelectItem>
                <SelectItem value="often">Often (3-5 times a week)</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center mb-2">
            <h3 className="font-medium text-lg">Local Food</h3>
          </div>
          
          <div>
            <label className="input-label">
              Percentage of locally sourced food: {dietData.localFoodPercentage}%
            </label>
            <Slider
              value={[dietData.localFoodPercentage]}
              min={0}
              max={100}
              step={5}
              onValueChange={handleLocalFoodChange}
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
            Continue
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DietForm;
