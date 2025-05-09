
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCarbonContext } from "@/contexts/CarbonContext";
import { regionalAverages } from "@/utils/emissionFactors";

const UserForm: React.FC = () => {
  const { userData, setUserData, setCurrentStep } = useCarbonContext();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, name: e.target.value });
  };

  const handleLocationChange = (value: string) => {
    setUserData({ ...userData, location: value });
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.name.trim().length > 0) {
      setCurrentStep(1);
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center text-eco-dark">Welcome to CarbonPrint AI</h2>
        <p className="text-center text-muted-foreground mt-2">
          Let's start by getting to know you a little bit.
        </p>
      </div>

      <form onSubmit={handleContinue}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="input-label">Your Name</label>
            <Input
              id="name"
              type="text"
              value={userData.name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              className="input-field"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="input-label">Your Location</label>
            <Select 
              value={userData.location} 
              onValueChange={handleLocationChange}
            >
              <SelectTrigger className="input-field">
                <SelectValue placeholder="Select your location" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(regionalAverages).map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full mt-6 bg-eco-primary hover:bg-eco-dark text-white"
          >
            Continue
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default UserForm;
