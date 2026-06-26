import type { Detection } from "@/lib/types/analysis";

export interface WasteBreakdown {
  class: string;
  count: number;
  confidence: number;
  weightKg: number;
  isRecyclable: boolean;
  valueInr: number;
  carbonSavedKg: number;
}

export interface WasteAnalysisMetrics {
  totalWeightKg: number;
  recyclableWeightKg: number;
  nonRecyclableWeightKg: number;
  recyclabilityRatio: number; // percentage (0 - 100)
  estimatedValueInr: number; // net financial recovery value (can be negative due to disposal costs)
  carbonSavedKg: number;
  breakdown: WasteBreakdown[];
}

// Density factors to realistically distribute the total estimated weight among detected items
const DENSITY_FACTORS: Record<string, number> = {
  plastic: 1.0,        // light weight per item
  metal: 3.5,          // heavy weight per item
  glass: 2.5,          // heavy weight per item
  organic: 1.5,        // moderate weight
  "hazardous waste": 2.0, // hazardous debris
};

// Recycling / recovery market value per kg (INR)
const MARKET_VALUES: Record<string, number> = {
  plastic: 12,          // e.g. PET bottles / HDPE
  metal: 45,            // e.g. aluminum cans / steel scrap
  glass: 8,             // scrap glass bottles
  organic: 2,           // compost yield value
  "hazardous waste": -50, // disposal/treatment surcharge cost (negative ROI)
};

// Carbon offsets (kg of CO2 equivalent saved per kg of material processed)
const CARBON_FACTORS: Record<string, number> = {
  plastic: 1.8,
  metal: 4.5,
  glass: 0.3,
  organic: 0.5,
  "hazardous waste": 0.8,
};

export function isClassRecyclable(className: string): boolean {
  const norm = className.toLowerCase();
  return norm === "plastic" || norm === "metal" || norm === "glass";
}

export function computeWasteMetrics(
  detections: Detection[],
  totalWeightKg: number
): WasteAnalysisMetrics {
  if (detections.length === 0) {
    return {
      totalWeightKg: 0,
      recyclableWeightKg: 0,
      nonRecyclableWeightKg: 0,
      recyclabilityRatio: 0,
      estimatedValueInr: 0,
      carbonSavedKg: 0,
      breakdown: [],
    };
  }

  // Calculate weighted distribution based on count & density
  let totalWeightedScore = 0;
  const weightedScores = detections.map((d) => {
    const norm = d.class.toLowerCase();
    const density = DENSITY_FACTORS[norm] || 1.2; // default factor
    const score = d.count * density;
    totalWeightedScore += score;
    return { detection: d, score };
  });

  const breakdown: WasteBreakdown[] = weightedScores.map(({ detection, score }) => {
    const norm = detection.class.toLowerCase();
    
    // Distribute totalWeightKg proportionally
    const weightShare = totalWeightedScore > 0 ? (score / totalWeightedScore) : (1 / detections.length);
    const weightKg = parseFloat((totalWeightKg * weightShare).toFixed(2));
    
    const isRecyclable = isClassRecyclable(detection.class);
    
    // ROI & Carbon Calcs
    const valuePerKg = MARKET_VALUES[norm] ?? 5;
    const carbonPerKg = CARBON_FACTORS[norm] ?? 0.6;
    
    const valueInr = parseFloat((weightKg * valuePerKg).toFixed(2));
    const carbonSavedKg = parseFloat((weightKg * carbonPerKg).toFixed(2));

    return {
      class: detection.class,
      count: detection.count,
      confidence: detection.confidence,
      weightKg,
      isRecyclable,
      valueInr,
      carbonSavedKg,
    };
  });

  // Aggregates
  let recyclableWeightKg = 0;
  let nonRecyclableWeightKg = 0;
  let estimatedValueInr = 0;
  let carbonSavedKg = 0;

  breakdown.forEach((item) => {
    if (item.isRecyclable) {
      recyclableWeightKg += item.weightKg;
    } else {
      nonRecyclableWeightKg += item.weightKg;
    }
    estimatedValueInr += item.valueInr;
    carbonSavedKg += item.carbonSavedKg;
  });

  // Round metrics to 1 decimal place
  recyclableWeightKg = parseFloat(recyclableWeightKg.toFixed(1));
  nonRecyclableWeightKg = parseFloat(nonRecyclableWeightKg.toFixed(1));
  estimatedValueInr = Math.round(estimatedValueInr);
  carbonSavedKg = parseFloat(carbonSavedKg.toFixed(1));

  const recyclabilityRatio = totalWeightKg > 0 
    ? Math.round((recyclableWeightKg / totalWeightKg) * 100) 
    : 0;

  return {
    totalWeightKg,
    recyclableWeightKg,
    nonRecyclableWeightKg,
    recyclabilityRatio,
    estimatedValueInr,
    carbonSavedKg,
    breakdown,
  };
}
