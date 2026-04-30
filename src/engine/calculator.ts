export interface WallLayers {
  materialId: string;
  thickness: number; // m
  k: number; // W/m.K
}

export interface UValueResult {
  uValue: number;
  rTotal: number;
  rLayers: number;
  rInside: number;
  rOutside: number;
}

// 1. حساب U-Value
export const calculateUValue = (
  layers: WallLayers[],
  hi: number,
  ho: number
): UValueResult => {
  let rLayers = 0;
  layers.forEach((layer) => {
    if (layer.thickness > 0 && layer.k > 0) {
      rLayers += layer.thickness / layer.k;
    }
  });
  const rInside = 1 / hi;
  const rOutside = 1 / ho;
  const rTotal = rInside + rOutside + rLayers;
  return {
    uValue: 1 / rTotal,
    rTotal,
    rLayers,
    rInside,
    rOutside,
  };
};

// 2. أحمال التوصيل (الجدران، السقف، الأرضية)
export const calculateTransmission = (
  U: number,
  A: number,
  CLTD: number
): number => {
  return U * A * CLTD;
};

// 3. الإشعاع الشمسي على الجدران والسقف
// DTs = 1.15 * a * I / ho
export const calculateSolarEffect = (
  U: number,
  A: number,
  absorptance: number,
  radiation: number,
  ho: number
): number => {
  const DTs = (1.15 * absorptance * radiation) / ho;
  return U * A * DTs;
};

// 4. الأحمال الداخلية - الإضاءة
export const calculateLightingLoad = (
  numLights: number,
  wattsPerLight: number,
  usageHours: number
): number => {
  const CLF = usageHours / 24;
  return numLights * wattsPerLight * CLF;
};

// 5. الأحمال الداخلية - الأشخاص
export const calculatePeopleLoad = (
  numPeople: number,
  qt: number, // W/person
  usageHours: number
): number => {
  const CLF = usageHours / 24;
  return numPeople * qt * CLF;
};

// 6. الأحمال الداخلية - المعدات
export const calculateEquipmentLoad = (
  heatGainW: number,
  numUnits: number,
  usageHours: number
): number => {
  return heatGainW * numUnits * (usageHours / 24);
};

// 7. أحمال المنتج - فوق التجميد
// Q = M * Cp_above * CLTD * 1000 / (3600 * n * CRF)
export const calculateProductAboveFreezing = (
  massKg: number,
  cpAbove: number,
  deltaT: number,
  coolTime: number,
  crf: number
): number => {
  if (deltaT <= 0) return 0;
  return (massKg * cpAbove * deltaT * 1000) / (3600 * coolTime * crf);
};

// 8. أحمال المنتج - تحت التجميد
// Q = M * Cp_below * CLTD * 1000 / (3600 * n)
export const calculateProductBelowFreezing = (
  massKg: number,
  cpBelow: number,
  deltaT: number,
  coolTime: number
): number => {
  if (deltaT <= 0) return 0;
  return (massKg * cpBelow * deltaT * 1000) / (3600 * coolTime);
};

// 9. أحمال المنتج - الحرارة الكامنة (التجميد)
// Q = M * L.H. * 1000 / (3600 * n)
export const calculateLatentHeatLoad = (
  massKg: number,
  latentHeat: number, // kJ/kg
  coolTime: number
): number => {
  return (massKg * latentHeat * 1000) / (3600 * coolTime);
};

// 10. حرارة التنفس
// Q = M * respRate / (3600 * n * CRF)
export const calculateRespirationLoad = (
  massKg: number,
  respRateWPerTonne: number,
  coolTime: number,
  crf: number
): number => {
  return (massKg * respRateWPerTonne) / (3600 * coolTime * crf);
};

// 11. حمل مواد التغليف
// Q = boxes * weight * Cp * deltaT * 1000 / ((coolTime + safety) * 3600 * CRF)
export const calculatePackagingLoad = (
  boxesCount: number,
  weightPerBox: number,
  specificHeat: number,
  deltaT: number,
  coolTime: number,
  crf: number,
  safetyHours: number = 0
): number => {
  if (deltaT <= 0) return 0;
  const totalMass = boxesCount * weightPerBox;
  return (
    (totalMass * specificHeat * deltaT * 1000) /
    ((coolTime + safetyHours) * 3600 * crf)
  );
};

// 12. حمل تذويب الصقيع (Defrost Load)
// Q = heaters * power * usageFactor
export const calculateDefrostLoad = (
  heatersCount: number,
  powerW: number,
  usageFactor: number
): number => {
  return heatersCount * powerW * usageFactor;
};

// 13. الطريقة المختصرة (Usage Load)
// Q = usageFactor * CLTD * Volume
export const calculateUsageLoad = (
  volume: number,
  cltd: number,
  usageFactor: number
): number => {
  return usageFactor * cltd * volume;
};

// 14. حمل التسرب عبر الأبواب
// Q = flowRate * deltaEnthalpy * 1000
export const calculateInfiltrationLoad = (
  flowRateLs: number,
  deltaEnthalpy: number // kJ/l
): number => {
  return flowRateLs * deltaEnthalpy * 1000;
};

// 15. حمل التهوية للأشخاص
// Q = (rate * people * deltaEnthalpy) / specificVolume
export const calculateVentilationLoad = (
  ratePerPerson: number, // L/s/person
  peopleCount: number,
  hi: number, // kJ/kg (inside enthalpy)
  ho: number, // kJ/kg (outside enthalpy)
  specificVolume: number // m³/kg
): number => {
  const deltaEnthalpy = Math.abs(ho - hi);
  return (ratePerPerson * peopleCount * deltaEnthalpy) / specificVolume;
};

// 16. حمل تغيير الهواء بالحجم
// Q = (airChanges * volume * deltaEnthalpy * 1000) / (24 * 3600 * specificVolume)
export const calculateAirChangeLoad = (
  volume: number,
  airChangesPer24h: number,
  hi: number,
  ho: number,
  specificVolume: number
): number => {
  const deltaEnthalpy = Math.abs(ho - hi);
  return (
    (airChangesPer24h * volume * deltaEnthalpy * 1000) /
    (24 * 3600 * specificVolume)
  );
};

// 17. السعة الكلية والنهائية للمنظومة
export interface SystemCapacity {
  totalHeatGain: number; // W
  totalWithSafety: number; // W
  requiredCapacity: number; // W
  kw: number; // kW
  tons: number; // Ton Refrigeration
}

export const calculateSystemCapacity = (
  totalHeatW: number,
  safetyPercent: number,
  operationHours: number
): SystemCapacity => {
  const safeTotal = totalHeatW * (1 + safetyPercent / 100);
  const requiredW = (safeTotal * 24) / operationHours;
  const kw = requiredW / 1000;
  const tons = kw * 0.2844;
  return {
    totalHeatGain: totalHeatW,
    totalWithSafety: safeTotal,
    requiredCapacity: requiredW,
    kw,
    tons,
  };
};

// ==========================================
// واجهة النتائج المفصلة
// ==========================================

export interface DetailedResults {
  // Transmission Loads
  roofLoad: number;
  floorLoad: number;
  northWallLoad: number;
  southWallLoad: number;
  eastWallLoad: number;
  westWallLoad: number;
  totalTransmission: number;

  // Solar Radiation Loads
  solarRoof: number;
  solarNorth: number;
  solarSouth: number;
  solarEast: number;
  solarWest: number;
  totalSolar: number;

  // Glass Loads
  glassTransmission: number;
  glassSolar: number;
  totalGlass: number;

  // Internal Loads
  lightingLoad: number;
  peopleLoad: number;
  equipmentLoad: number;
  totalInternal: number;

  // Product Loads
  productAboveFreezing: number;
  productBelowFreezing: number;
  latentHeatLoad: number;
  respirationLoad: number;
  packagingLoad: number;
  totalProduct: number;

  // Air Loads
  infiltrationLoad: number;
  ventilationLoad: number;
  airChangeLoad: number;
  totalAir: number;

  // Other Loads
  defrostLoad: number;
  usageLoad: number;

  // Totals
  grandTotal: number;
  totalWithSafety: number;
  requiredCapacity: number;
  kw: number;
  tons: number;
}
