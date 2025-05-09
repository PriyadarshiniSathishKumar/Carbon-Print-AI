
/**
 * Standard emission factors from various sources
 * Values are in kg CO2e (carbon dioxide equivalent)
 */

// Transport emissions factors
export const transportFactors = {
  // Car emissions per km
  car: {
    'none': 0,
    'small-gas': 0.15,      // Small gasoline car: ~150g CO2e/km
    'medium-gas': 0.2,      // Medium gasoline car: ~200g CO2e/km
    'large-gas': 0.3,       // Large gasoline/SUV: ~300g CO2e/km
    'hybrid': 0.1,          // Hybrid car: ~100g CO2e/km
    'plugin-hybrid': 0.05,  // Plugin hybrid: ~50g CO2e/km
    'electric': 0.03,       // Electric car: ~30g CO2e/km (grid dependent)
  },

  // Public transport per trip (average 10km)
  publicTransport: 0.04,    // ~4kg per 10km trip
  
  // Flight emissions per flight (average short/medium flights)
  flight: 500,              // ~500kg per flight (very rough average)
};

// Diet emissions factors (kg CO2e per day)
export const dietFactors = {
  dietType: {
    'vegan': 3.3,         // ~3.3kg CO2e per day
    'vegetarian': 4.0,    // ~4.0kg CO2e per day
    'pescatarian': 4.5,   // ~4.5kg CO2e per day
    'flexitarian': 5.5,   // ~5.5kg CO2e per day
    'omnivore': 7.0,      // ~7.0kg CO2e per day
    'carnivore': 11.0,    // ~11.0kg CO2e per day
  },

  // Frequency multipliers for red meat consumption
  redMeatMultiplier: {
    'never': 0.7,
    'rarely': 0.85,
    'sometimes': 1.0,
    'often': 1.2,
    'daily': 1.4,
  },

  // Frequency multipliers for dairy consumption
  dairyMultiplier: {
    'never': 0.8,
    'rarely': 0.9,
    'sometimes': 1.0,
    'often': 1.1,
    'daily': 1.2,
  },

  // Adjustment factor for local food (percentage of local food)
  localFoodFactor: 0.002,  // 0.2% reduction per percentage point of local food
};

// Home emissions factors
export const homeFactors = {
  // Electricity emissions per kWh (varies by country/region)
  electricityPerKwh: 0.4,  // 0.4kg CO2e per kWh (world average)
  
  // Renewable energy adjustment
  renewableDiscount: 0.01, // 1% discount per percentage point of renewable energy
  
  // Home size factor: emissions per square meter per year
  homeSize: 0.03,         // 0.03 tons CO2e per square meter per year
  
  // Heating type multiplier
  heatingType: {
    'gas': 1.0,
    'oil': 1.2,
    'electric': 0.9,
    'heat-pump': 0.4,
    'wood': 0.7,
    'district': 0.8,
    'none': 0.3,
  },
  
  // Household size divisor (shared footprint)
  householdDivisor: {
    1: 1,
    2: 1.6,    // Not exactly half due to economies of scale
    3: 2.1,
    4: 2.5,
    5: 2.8,
    6: 3.0,
  },
};

// Shopping emissions factors
export const shoppingFactors = {
  // New clothes emissions per item per year
  clothesPerItem: 15,      // 15kg CO2e per clothing item
  
  // Electronics emissions per dollar spent
  electronicsPerDollar: 0.7, // 0.7kg CO2e per dollar
  
  // Recycling reduction factor
  recyclingReduction: 0.005, // 0.5% reduction per percentage point of recycling
};

// Global average annual carbon footprint per person (~16,000 kg CO2e)
export const globalAverageCarbonFootprint = 16000;

// Regional averages (kg CO2e per year)
export const regionalAverages = {
  'United States': 18000,
  'Europe': 10000,
  'China': 8000,
  'India': 3000,
  'Global Average': 6000,
  'Australia': 17000,
  'Canada': 16000,
  'United Kingdom': 10000,
  'Germany': 11000,
  'France': 8000,
  'Japan': 10000,
  'Brazil': 5000,
  'Russia': 12000,
};
