
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserData,
  TransportData,
  DietData,
  HomeData,
  ShoppingData,
  CarbonFootprint,
  AiSuggestion
} from "../types/carbon";
import { calculateCarbonFootprint } from "../utils/calculationUtils";
import { getAiSuggestions } from "../data/reductionTips";

// Default data
const defaultUserData: UserData = {
  name: "",
  location: "Global Average"
};

const defaultTransportData: TransportData = {
  carKmPerWeek: 0,
  carType: "none",
  publicTransportTripsPerWeek: 0,
  flightsPerYear: 0
};

const defaultDietData: DietData = {
  dietType: "omnivore",
  redMeatFrequency: "sometimes",
  dairyFrequency: "sometimes",
  localFoodPercentage: 20
};

const defaultHomeData: HomeData = {
  electricityKwhPerMonth: 250,
  renewablePercentage: 0,
  homeSize: 100,
  heatingType: "gas",
  peopleInHousehold: 2
};

const defaultShoppingData: ShoppingData = {
  newClothesPerYear: 10,
  electronicsSpendPerYear: 500,
  recyclingPercentage: 30
};

// Context type
interface CarbonContextType {
  userData: UserData;
  transportData: TransportData;
  dietData: DietData;
  homeData: HomeData;
  shoppingData: ShoppingData;
  carbonFootprint: CarbonFootprint | null;
  aiSuggestions: AiSuggestion[];
  setUserData: (data: UserData) => void;
  setTransportData: (data: TransportData) => void;
  setDietData: (data: DietData) => void;
  setHomeData: (data: HomeData) => void;
  setShoppingData: (data: ShoppingData) => void;
  calculateFootprint: () => void;
  getAiRecommendations: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetData: () => void;
}

// Create context
const CarbonContext = createContext<CarbonContextType | undefined>(undefined);

// Provider component
export const CarbonProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [transportData, setTransportData] = useState<TransportData>(defaultTransportData);
  const [dietData, setDietData] = useState<DietData>(defaultDietData);
  const [homeData, setHomeData] = useState<HomeData>(defaultHomeData);
  const [shoppingData, setShoppingData] = useState<ShoppingData>(defaultShoppingData);
  const [carbonFootprint, setCarbonFootprint] = useState<CarbonFootprint | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<AiSuggestion[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Calculate carbon footprint
  const calculateFootprint = () => {
    const footprint = calculateCarbonFootprint(
      transportData,
      dietData,
      homeData,
      shoppingData,
      userData.location
    );
    setCarbonFootprint(footprint);
  };

  // Get AI recommendations
  const getAiRecommendations = () => {
    // In a real app, this would call an AI model API
    // For now, we use simulated AI suggestions
    const suggestions = getAiSuggestions(
      transportData,
      dietData,
      homeData,
      shoppingData
    );
    setAiSuggestions(suggestions);
  };

  // Reset all data to defaults
  const resetData = () => {
    setUserData(defaultUserData);
    setTransportData(defaultTransportData);
    setDietData(defaultDietData);
    setHomeData(defaultHomeData);
    setShoppingData(defaultShoppingData);
    setCarbonFootprint(null);
    setAiSuggestions([]);
    setCurrentStep(0);
  };

  // Calculate footprint when data changes
  useEffect(() => {
    if (currentStep === 5) {
      calculateFootprint();
      getAiRecommendations();
    }
  }, [currentStep]);

  return (
    <CarbonContext.Provider
      value={{
        userData,
        transportData,
        dietData,
        homeData,
        shoppingData,
        carbonFootprint,
        aiSuggestions,
        setUserData,
        setTransportData,
        setDietData,
        setHomeData,
        setShoppingData,
        calculateFootprint,
        getAiRecommendations,
        currentStep,
        setCurrentStep,
        resetData
      }}
    >
      {children}
    </CarbonContext.Provider>
  );
};

// Custom hook for using the context
export const useCarbonContext = () => {
  const context = useContext(CarbonContext);
  if (context === undefined) {
    throw new Error("useCarbonContext must be used within a CarbonProvider");
  }
  return context;
};
