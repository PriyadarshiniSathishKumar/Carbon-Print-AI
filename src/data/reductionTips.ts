
import { ReductionTip } from "../types/carbon";

export const reductionTips: ReductionTip[] = [
  // Transport tips
  {
    id: "t1",
    title: "Bike to work",
    description: "Cycling to work just once a week instead of driving can reduce your carbon footprint significantly while improving your health.",
    potentialReduction: 260, // kg CO2 per year
    category: "transport",
    difficulty: "medium",
    iconName: "bike"
  },
  {
    id: "t2",
    title: "Take public transport",
    description: "Using buses or trains instead of a car can reduce your emissions by up to 70% per journey.",
    potentialReduction: 400, // kg CO2 per year
    category: "transport",
    difficulty: "easy",
    iconName: "bus"
  },
  {
    id: "t3",
    title: "Limit air travel",
    description: "A single long-haul flight can emit more carbon than some people produce in a year. Consider alternatives like trains for shorter trips.",
    potentialReduction: 1500, // kg CO2 per year
    category: "transport",
    difficulty: "hard",
    iconName: "train-front"
  },
  {
    id: "t4",
    title: "Carpool regularly",
    description: "Sharing rides with others going to the same destination cuts emissions per person by up to 75%.",
    potentialReduction: 500, // kg CO2 per year
    category: "transport",
    difficulty: "medium",
    iconName: "car"
  },

  // Diet tips
  {
    id: "d1",
    title: "Meatless Mondays",
    description: "Going vegetarian just one day a week can reduce your dietary carbon footprint by about 15%.",
    potentialReduction: 300, // kg CO2 per year
    category: "diet",
    difficulty: "easy",
    iconName: "leafy-green"
  },
  {
    id: "d2",
    title: "Reduce red meat",
    description: "Beef has about 10 times the carbon footprint of chicken. Substituting red meat with other proteins makes a big difference.",
    potentialReduction: 700, // kg CO2 per year
    category: "diet",
    difficulty: "medium",
    iconName: "utensils"
  },
  {
    id: "d3",
    title: "Buy local seasonal produce",
    description: "Food that's grown locally and in-season requires fewer resources for transportation and storage.",
    potentialReduction: 150, // kg CO2 per year
    category: "diet",
    difficulty: "easy",
    iconName: "shopping-cart"
  },
  {
    id: "d4",
    title: "Reduce food waste",
    description: "About 1/3 of food produced is wasted. Planning meals and proper storage can help reduce this waste.",
    potentialReduction: 300, // kg CO2 per year
    category: "diet",
    difficulty: "medium",
    iconName: "utensils"
  },

  // Home tips
  {
    id: "h1",
    title: "Switch to LED lighting",
    description: "LEDs use up to 85% less energy than traditional incandescent bulbs and last much longer.",
    potentialReduction: 250, // kg CO2 per year
    category: "home",
    difficulty: "easy",
    iconName: "lightbulb"
  },
  {
    id: "h2",
    title: "Adjust your thermostat",
    description: "Lowering your heating by just 1°C (or raising AC by 1°C in summer) can reduce energy use by up to 10%.",
    potentialReduction: 300, // kg CO2 per year
    category: "home",
    difficulty: "easy",
    iconName: "home"
  },
  {
    id: "h3",
    title: "Switch to renewable energy",
    description: "Many utility companies offer green energy options that source electricity from solar, wind, or hydropower.",
    potentialReduction: 1600, // kg CO2 per year
    category: "home",
    difficulty: "medium",
    iconName: "lightbulb"
  },
  {
    id: "h4",
    title: "Reduce water usage",
    description: "Installing water-efficient fixtures and taking shorter showers reduces the energy needed to heat and treat water.",
    potentialReduction: 200, // kg CO2 per year
    category: "home",
    difficulty: "easy",
    iconName: "water"
  },

  // Shopping tips
  {
    id: "s1",
    title: "Buy fewer new clothes",
    description: "The fashion industry is responsible for about 10% of global carbon emissions. Buying second-hand or repairing clothes helps.",
    potentialReduction: 400, // kg CO2 per year
    category: "shopping",
    difficulty: "medium",
    iconName: "shopping-cart"
  },
  {
    id: "s2",
    title: "Repair instead of replace",
    description: "Manufacturing new products is carbon-intensive. Fixing items extends their life and reduces emissions.",
    potentialReduction: 300, // kg CO2 per year
    category: "shopping",
    difficulty: "medium",
    iconName: "global"
  },
  {
    id: "s3",
    title: "Choose quality over quantity",
    description: "Higher-quality items tend to last longer, reducing the need for frequent replacements and the associated emissions.",
    potentialReduction: 200, // kg CO2 per year
    category: "shopping",
    difficulty: "easy",
    iconName: "award"
  },
  {
    id: "s4",
    title: "Reduce packaging waste",
    description: "Choose products with minimal or recyclable packaging, and bring your own shopping bags.",
    potentialReduction: 150, // kg CO2 per year
    category: "shopping",
    difficulty: "easy",
    iconName: "shopping-cart"
  }
];

// Simulated AI suggestions (in a real app, these would come from an AI model)
export const getAiSuggestions = (
  transportData: any,
  dietData: any,
  homeData: any,
  shoppingData: any
) => {
  const suggestions = [];

  // Transport suggestions
  if (transportData.carKmPerWeek > 100) {
    suggestions.push({
      suggestion: "Consider carpooling or public transit for your commute",
      reasoning: "Your weekly driving distance is higher than average, which contributes significantly to your carbon footprint.",
      potentialImpact: "Reducing your driving by 20% could save approximately 400kg of CO₂ per year.",
      category: "transport"
    });
  }

  if (transportData.flightsPerYear > 2) {
    suggestions.push({
      suggestion: "Consider taking fewer flights or offset your flight emissions",
      reasoning: "Air travel has one of the highest carbon footprints per mile traveled.",
      potentialImpact: "Each flight avoided could save approximately 500-1500kg of CO₂.",
      category: "transport"
    });
  }

  // Diet suggestions
  if (dietData.dietType === "omnivore" || dietData.dietType === "carnivore") {
    suggestions.push({
      suggestion: "Try replacing some meat meals with plant-based alternatives",
      reasoning: "Animal products, especially red meat, have significantly higher carbon footprints than plant foods.",
      potentialImpact: "Replacing just 2 meat meals per week could save approximately 300kg of CO₂ per year.",
      category: "diet"
    });
  }

  if (dietData.localFoodPercentage < 30) {
    suggestions.push({
      suggestion: "Shop at farmers markets or look for locally-sourced options",
      reasoning: "Locally-grown food typically requires less transportation and refrigeration.",
      potentialImpact: "Increasing your local food consumption could reduce your food carbon footprint by up to 10%.",
      category: "diet"
    });
  }

  // Home suggestions
  if (homeData.renewablePercentage < 20) {
    suggestions.push({
      suggestion: "Look into renewable energy options from your utility provider",
      reasoning: "Many electricity providers now offer renewable energy options at competitive rates.",
      potentialImpact: "Switching to 100% renewable electricity could reduce your home emissions by 30-60%.",
      category: "home"
    });
  }

  if (homeData.electricityKwhPerMonth > 300) {
    suggestions.push({
      suggestion: "Consider an energy audit to identify efficiency improvements",
      reasoning: "Your electricity usage is above average, suggesting opportunities for reduction.",
      potentialImpact: "Simple efficiency measures could reduce electricity use by 10-30%.",
      category: "home"
    });
  }

  // Shopping suggestions
  if (shoppingData.newClothesPerYear > 10) {
    suggestions.push({
      suggestion: "Consider a capsule wardrobe or buying second-hand clothing",
      reasoning: "The fashion industry has a significant environmental impact through production and transportation.",
      potentialImpact: "Reducing new clothes purchases by half could save approximately 200kg of CO₂ per year.",
      category: "shopping"
    });
  }

  if (shoppingData.recyclingPercentage < 50) {
    suggestions.push({
      suggestion: "Improve your recycling habits and reduce single-use items",
      reasoning: "Proper recycling reduces the energy needed for new materials and reduces landfill methane emissions.",
      potentialImpact: "Increasing recycling by 25% could reduce your waste emissions by approximately 150kg CO₂ per year.",
      category: "shopping"
    });
  }

  // Return 3-4 suggestions randomly selected from the available ones
  return suggestions.sort(() => 0.5 - Math.random()).slice(0, 4);
};
