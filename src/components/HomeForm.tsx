
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Home, Lightbulb } from "lucide-react";
import { useCarbonContext } from "@/contexts/CarbonContext";

const HomeForm: React.FC = () => {
  const { homeData, setHomeData, currentStep, setCurrentStep } = useCarbonContext();

  const handleElectricityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value));
    setHomeData({ ...homeData, electricityKwhPerMonth: value });
  };

  const handleRenewableChange = (values: number[]) => {
    setHomeData({ ...homeData, renewablePercentage: values[0] });
  };

  const handleHomeSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value));
    setHomeData({ ...homeData, homeSize: value });
  };

  const handleHeatingTypeChange = (value: string) => {
    setHomeData({ ...homeData, heatingType: value as any });
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(10, Number(e.target.value)));
    setHomeData({ ...homeData, peopleInHousehold: value });
  };

  return (
    <Card className="max-w-md w-full mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center text-eco-dark">Home Energy</h2>
        <p className="text-center text-muted-foreground mt-2">
          Tell us about your home energy usage.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center mb-2">
            <Lightbulb className="mr-2 h-5 w-5 text-eco-accent" />
            <h3 className="font-medium text-lg">Electricity Usage</h3>
          </div>
          
          <div>
            <label htmlFor="electricity" className="input-label">
              Monthly electricity usage (kWh)
            </label>
            <Input
              id="electricity"
              type="number"
              min={0}
              value={homeData.electricityKwhPerMonth}
              onChange={handleElectricityChange}
              className="input-field"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Typically found on your electricity bill, or estimate (150-300 kWh for small apartment,
              300-800 kWh for a house).
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <label className="input-label">
              Percentage of renewable electricity: {homeData.renewablePercentage}%
            </label>
            <Slider
              value={[homeData.renewablePercentage]}
              min={0}
              max={100}
              step={5}
              onValueChange={handleRenewableChange}
              className="py-4"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center mb-2">
            <Home className="mr-2 h-5 w-5 text-eco-accent" />
            <h3 className="font-medium text-lg">Home Details</h3>
          </div>
          
          <div>
            <label htmlFor="homeSize" className="input-label">
              Home size (square meters)
            </label>
            <Input
              id="homeSize"
              type="number"
              min={0}
              value={homeData.homeSize}
              onChange={handleHomeSizeChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="heatingType" className="input-label">
              Primary heating type
            </label>
            <Select 
              value={homeData.heatingType} 
              onValueChange={handleHeatingTypeChange}
            >
              <SelectTrigger id="heatingType" className="input-field">
                <SelectValue placeholder="Select heating type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gas">Natural Gas</SelectItem>
                <SelectItem value="oil">Oil</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
                <SelectItem value="heat-pump">Heat Pump</SelectItem>
                <SelectItem value="wood">Wood/Biomass</SelectItem>
                <SelectItem value="district">District Heating</SelectItem>
                <SelectItem value="none">None/Minimal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="people" className="input-label">
              Number of people in household
            </label>
            <Input
              id="people"
              type="number"
              min={1}
              max={10}
              value={homeData.peopleInHousehold}
              onChange={handlePeopleChange}
              className="input-field"
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

export default HomeForm;
