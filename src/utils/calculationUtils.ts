
import { 
  TransportData, 
  DietData, 
  HomeData, 
  ShoppingData, 
  CarbonFootprint 
} from '../types/carbon';
import {
  transportFactors,
  dietFactors,
  homeFactors,
  shoppingFactors,
  regionalAverages,
  globalAverageCarbonFootprint
} from './emissionFactors';

/**
 * Calculate transport-related carbon emissions
 */
export const calculateTransportEmissions = (data: TransportData): number => {
  const carEmissions = data.carKmPerWeek * transportFactors.car[data.carType] * 52;
  const publicTransportEmissions = data.publicTransportTripsPerWeek * transportFactors.publicTransport * 52;
  const flightEmissions = data.flightsPerYear * transportFactors.flight;
  
  return carEmissions + publicTransportEmissions + flightEmissions;
};

/**
 * Calculate diet-related carbon emissions
 */
export const calculateDietEmissions = (data: DietData): number => {
  const baseDietEmissions = dietFactors.dietType[data.dietType] * 365;
  const redMeatMultiplier = dietFactors.redMeatMultiplier[data.redMeatFrequency];
  const dairyMultiplier = dietFactors.dairyMultiplier[data.dairyFrequency];
  const localFoodDiscount = data.localFoodPercentage * dietFactors.localFoodFactor;
  
  return baseDietEmissions * redMeatMultiplier * dairyMultiplier * (1 - localFoodDiscount);
};

/**
 * Calculate home-related carbon emissions
 */
export const calculateHomeEmissions = (data: HomeData): number => {
  const electricityEmissions = data.electricityKwhPerMonth * homeFactors.electricityPerKwh * 12;
  const renewableDiscount = data.renewablePercentage * homeFactors.renewableDiscount;
  const homeSizeEmissions = data.homeSize * homeFactors.homeSize * 1000; // Convert to kg
  const heatingMultiplier = homeFactors.heatingType[data.heatingType];
  
  // Calculate household divisor (capped at 6 people)
  const people = Math.min(data.peopleInHousehold, 6);
  const householdDivisor = homeFactors.householdDivisor[people as keyof typeof homeFactors.householdDivisor] || 
                           people * 0.5; // Fallback calculation if missing
  
  const totalHomeEmissions = (electricityEmissions * (1 - renewableDiscount) + 
                             homeSizeEmissions * heatingMultiplier) / householdDivisor;
  
  return totalHomeEmissions;
};

/**
 * Calculate shopping-related carbon emissions
 */
export const calculateShoppingEmissions = (data: ShoppingData): number => {
  const clothesEmissions = data.newClothesPerYear * shoppingFactors.clothesPerItem;
  const electronicsEmissions = data.electronicsSpendPerYear * shoppingFactors.electronicsPerDollar;
  const recyclingDiscount = data.recyclingPercentage * shoppingFactors.recyclingReduction;
  
  return (clothesEmissions + electronicsEmissions) * (1 - recyclingDiscount);
};

/**
 * Calculate total carbon footprint
 */
export const calculateCarbonFootprint = (
  transportData: TransportData,
  dietData: DietData,
  homeData: HomeData,
  shoppingData: ShoppingData,
  location: string = 'Global Average'
): CarbonFootprint => {
  const transportEmissions = calculateTransportEmissions(transportData);
  const dietEmissions = calculateDietEmissions(dietData);
  const homeEmissions = calculateHomeEmissions(homeData);
  const shoppingEmissions = calculateShoppingEmissions(shoppingData);
  
  const totalEmissions = transportEmissions + dietEmissions + homeEmissions + shoppingEmissions;
  
  // Compare to regional average or global average if region not found
  const averageEmissions = regionalAverages[location as keyof typeof regionalAverages] || 
                          globalAverageCarbonFootprint;
  const comparisonToAverage = (totalEmissions / averageEmissions) * 100;
  
  return {
    transportEmissions,
    dietEmissions,
    homeEmissions,
    shoppingEmissions,
    totalEmissions,
    comparisonToAverage
  };
};
