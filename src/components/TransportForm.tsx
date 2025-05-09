
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Car, Bus, Plane } from "lucide-react";
import { useCarbonContext } from "@/contexts/CarbonContext";

const TransportForm: React.FC = () => {
  const { transportData, setTransportData, currentStep, setCurrentStep } = useCarbonContext();

  const handleCarKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value));
    setTransportData({ ...transportData, carKmPerWeek: value });
  };

  const handleCarTypeChange = (value: string) => {
    setTransportData({ 
      ...transportData, 
      carType: value as any 
    });
  };

  const handlePublicTransportChange = (values: number[]) => {
    setTransportData({ ...transportData, publicTransportTripsPerWeek: values[0] });
  };

  const handleFlightsChange = (values: number[]) => {
    setTransportData({ ...transportData, flightsPerYear: values[0] });
  };

  return (
    <Card className="max-w-md w-full mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center text-eco-dark">Transportation</h2>
        <p className="text-center text-muted-foreground mt-2">
          Let's track your travel emissions.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center mb-2">
            <Car className="mr-2 h-5 w-5 text-eco-accent" />
            <h3 className="font-medium text-lg">Car Usage</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="carKm" className="input-label">
                Weekly car travel (km)
              </label>
              <Input
                id="carKm"
                type="number"
                min={0}
                value={transportData.carKmPerWeek}
                onChange={handleCarKmChange}
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="carType" className="input-label">
                Type of car
              </label>
              <Select 
                value={transportData.carType} 
                onValueChange={handleCarTypeChange}
              >
                <SelectTrigger id="carType" className="input-field">
                  <SelectValue placeholder="Select car type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No car</SelectItem>
                  <SelectItem value="small-gas">Small gasoline car</SelectItem>
                  <SelectItem value="medium-gas">Medium gasoline car</SelectItem>
                  <SelectItem value="large-gas">Large car/SUV</SelectItem>
                  <SelectItem value="hybrid">Hybrid car</SelectItem>
                  <SelectItem value="plugin-hybrid">Plug-in hybrid</SelectItem>
                  <SelectItem value="electric">Electric car</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center mb-2">
            <Bus className="mr-2 h-5 w-5 text-eco-accent" />
            <h3 className="font-medium text-lg">Public Transport</h3>
          </div>
          
          <div>
            <label className="input-label">
              Weekly public transport trips: {transportData.publicTransportTripsPerWeek}
            </label>
            <Slider
              value={[transportData.publicTransportTripsPerWeek]}
              min={0}
              max={20}
              step={1}
              onValueChange={handlePublicTransportChange}
              className="py-4"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center mb-2">
            <Plane className="mr-2 h-5 w-5 text-eco-accent" />
            <h3 className="font-medium text-lg">Air Travel</h3>
          </div>
          
          <div>
            <label className="input-label">
              Flights per year: {transportData.flightsPerYear}
            </label>
            <Slider
              value={[transportData.flightsPerYear]}
              min={0}
              max={20}
              step={1}
              onValueChange={handleFlightsChange}
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

export default TransportForm;
