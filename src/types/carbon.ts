
export interface UserData {
  id?: string;
  name: string;
  location: string;
  createdAt?: Date;
}

export interface TransportData {
  carKmPerWeek: number;
  carType: CarType;
  publicTransportTripsPerWeek: number;
  flightsPerYear: number;
}

export interface DietData {
  dietType: DietType;
  redMeatFrequency: FrequencyType;
  dairyFrequency: FrequencyType;
  localFoodPercentage: number;
}

export interface HomeData {
  electricityKwhPerMonth: number;
  renewablePercentage: number;
  homeSize: number; // in square meters
  heatingType: HeatingType;
  peopleInHousehold: number;
}

export interface ShoppingData {
  newClothesPerYear: number;
  electronicsSpendPerYear: number;
  recyclingPercentage: number;
}

export interface CarbonFootprint {
  transportEmissions: number;
  dietEmissions: number;
  homeEmissions: number;
  shoppingEmissions: number;
  totalEmissions: number;
  comparisonToAverage: number; // percentage compared to average
}

export interface ReductionTip {
  id: string;
  title: string;
  description: string;
  potentialReduction: number; // kg CO2 per year
  category: 'transport' | 'diet' | 'home' | 'shopping';
  difficulty: 'easy' | 'medium' | 'hard';
  iconName: string; // name of the Lucide icon
}

export interface AiSuggestion {
  suggestion: string;
  reasoning: string;
  potentialImpact: string;
  category: 'transport' | 'diet' | 'home' | 'shopping';
}

export type FrequencyType = 'never' | 'rarely' | 'sometimes' | 'often' | 'daily';

export type DietType = 
  | 'vegan' 
  | 'vegetarian' 
  | 'pescatarian' 
  | 'flexitarian' 
  | 'omnivore' 
  | 'carnivore';

export type CarType = 
  | 'none' 
  | 'small-gas' 
  | 'medium-gas' 
  | 'large-gas' 
  | 'hybrid' 
  | 'plugin-hybrid'
  | 'electric';

export type HeatingType = 
  | 'gas' 
  | 'oil' 
  | 'electric' 
  | 'heat-pump' 
  | 'wood' 
  | 'district'
  | 'none';
