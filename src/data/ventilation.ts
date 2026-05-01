// ==========================================
// جدول (2-14) معدلات التهوية [L/s/Person]
// Table 2-14: Ventilation Rates
// ==========================================

export interface VentilationRate {
  id: string;
  name: string;
  nameEn: string;
  ratePreferred: number; // L/s/person (preferred)
  rateMinimum: number; // L/s/person (minimum)
  smoking: string;
}

export const VENTILATION_RATES: VentilationRate[] = [
  { id: "apartment", name: "شقة", nameEn: "Apartment", ratePreferred: 9.5, rateMinimum: 7, smoking: "أحياناً" },
  { id: "bank", name: "بنك", nameEn: "Bank", ratePreferred: 7.5, rateMinimum: 5, smoking: "أحياناً" },
  { id: "salon", name: "صالون", nameEn: "Salon", ratePreferred: 7, rateMinimum: 5, smoking: "أحياناً" },
  { id: "shops", name: "محلات تجارية", nameEn: "Shops", ratePreferred: 3.5, rateMinimum: 2.5, smoking: "ممنوع" },
  { id: "factories", name: "مصانع", nameEn: "Factories", ratePreferred: 5, rateMinimum: 3.5, smoking: "ممنوع" },
  { id: "hospital", name: "مستشفيات", nameEn: "Hospitals", ratePreferred: 14, rateMinimum: 12, smoking: "ممنوع" },
  { id: "hotel", name: "فنادق", nameEn: "Hotels", ratePreferred: 14, rateMinimum: 12, smoking: "شديد" },
  { id: "meeting", name: "غرف اجتماعات", nameEn: "Meeting Rooms", ratePreferred: 24, rateMinimum: 14, smoking: "شديد" },
  { id: "office_private", name: "مكاتب خصوصية", nameEn: "Private Offices", ratePreferred: 12, rateMinimum: 7, smoking: "أحياناً" },
  { id: "office_public", name: "مكاتب عامة", nameEn: "Public Offices", ratePreferred: 12.5, rateMinimum: 7.5, smoking: "أحياناً" },
  { id: "restaurant", name: "مطاعم", nameEn: "Restaurants", ratePreferred: 10, rateMinimum: 7.5, smoking: "أحياناً" },
  { id: "cafeteria", name: "كافتيريا", nameEn: "Cafeteria", ratePreferred: 6, rateMinimum: 3.5, smoking: "أحياناً" },
];

export const getVentilationRateById = (id: string): VentilationRate | undefined =>
  VENTILATION_RATES.find((v) => v.id === id);

// ==========================================
// جدول (2-15) معامل الامتصاص
// Table 2-15: Absorptance Coefficients
// ==========================================

export interface Absorptance {
  id: string;
  name: string;
  absorptance: number; // a
}

export const SOLAR_ABSORPTANCE: Absorptance[] = [
  { id: "asphalt", name: "الأسفلت", absorptance: 0.89 },
  { id: "concrete", name: "الخرسانة", absorptance: 0.65 },
  { id: "brick_red", name: "الطوب الأحمر", absorptance: 0.77 },
  { id: "brick_white", name: "الطوب الأبيض", absorptance: 0.26 },
  { id: "cement", name: "المونة الأسمنتية", absorptance: 0.57 },
  { id: "gypsum", name: "المونة الجبسية", absorptance: 0.40 },
  { id: "insulation", name: "العازل الحراري", absorptance: 0.91 },
  { id: "bitumen", name: "البيتومين", absorptance: 0.90 },
];

// ==========================================
// جداول (2-16 A & B) تأثير أشعة الشمس
// Table 2-16 A: Solar Effect for Cold Storage
// Table 2-16 B: Solar Radiation Intensity
// ==========================================

export interface SolarData {
  direction: string;
  cltdAdditional: number; // °C
  avgRadiation: number; // W/m²
  sunHours: number; // hr
  surfaceType: string;
}

export const SOLAR_DATA_COLD_STORAGE: SolarData[] = [
  { direction: "شرقي", cltdAdditional: 12, avgRadiation: 462, sunHours: 6, surfaceType: "جدار-الشرقي" },
  { direction: "غربي", cltdAdditional: 12, avgRadiation: 462, sunHours: 6, surfaceType: "الغربي" },
  { direction: "شمالي", cltdAdditional: 2, avgRadiation: 71, sunHours: 6, surfaceType: "الشمالي" },
  { direction: "جنوبي", cltdAdditional: 3, avgRadiation: 117, sunHours: 7, surfaceType: "الجنوبي" },
  { direction: "سقف", cltdAdditional: 9, avgRadiation: 333, sunHours: 12, surfaceType: "السقف" },
];

// Solar Heat Gain Factor (SHGF) for windows - Table 2-18A
export interface SHGFData {
  month: string;
  horizontal: number;
  north: number;
  east: number;
  south: number;
  west: number;
}

export const SHGF_TABLE: SHGFData[] = [
  { month: "يناير", horizontal: 732, north: 91, east: 634, south: 675, west: 634 },
  { month: "فبراير", horizontal: 830, north: 98, east: 713, south: 549, west: 713 },
  { month: "مارس", horizontal: 896, north: 107, east: 748, south: 363, west: 748 },
  { month: "أبريل", horizontal: 905, north: 120, east: 719, south: 183, west: 719 },
  { month: "مايو", horizontal: 893, north: 148, east: 685, south: 133, west: 685 },
  { month: "يونيو", horizontal: 880, north: 186, east: 663, south: 133, west: 663 },
  { month: "يوليو", horizontal: 877, north: 151, east: 669, south: 136, west: 669 },
  { month: "أغسطس", horizontal: 883, north: 126, east: 694, south: 180, west: 694 },
  { month: "سبتمبر", horizontal: 868, north: 114, east: 710, south: 360, west: 710 },
  { month: "أكتوبر", horizontal: 814, north: 101, east: 685, south: 536, west: 685 },
  { month: "نوفمبر", horizontal: 726, north: 91, east: 622, south: 66, west: 622 },
  { month: "ديسمبر", horizontal: 685, north: 85, east: 590, south: 713, west: 590 },
];

// Get SHGF for a specific month and direction
export const getSHGF = (month: string, direction: string): number => {
  const monthData = SHGF_TABLE.find((m) => m.month === month);
  if (!monthData) return 0;

  switch (direction) {
    case "شمالي":
      return monthData.north;
    case "شرقي":
      return monthData.east;
    case "جنوبي":
      return monthData.south;
    case "غربي":
      return monthData.west;
    case "أفقي":
      return monthData.horizontal;
    default:
      return 0;
  }
};

// ==========================================
// جدول (2-17) معامل انتقال الحرارة للزجاج
// Table 2-17: Glass U-Values
// ==========================================

export interface GlassUValue {
  id: string;
  description: string;
  uSummer: number; // W/m²K summer
  uWinter: number; // W/m²K winter
}

export const GLASS_U_VALUES: GlassUValue[] = [
  { id: "single", description: "زجاج مفرد", uSummer: 4.7, uWinter: 7.0 },
  { id: "double_5mm", description: "زجاج عازل مزدوج - طبقة هوائية 5 ملم", uSummer: 3.2, uWinter: 4.0 },
  { id: "double_6mm", description: "زجاج عازل مزدوج - طبقة هوائية 6 ملم", uSummer: 3.1, uWinter: 2.7 },
  { id: "double_13mm", description: "زجاج عازل مزدوج - طبقة هوائية 13 ملم", uSummer: 2.8, uWinter: 3.4 },
];

// ==========================================
// جداول (2-18 A & B) حرارة الزجاج ومعامل التضليل
// Table 2-18 A: Max Solar Heat Gain for Glass (W/m²) at latitude 20°
// Table 2-18 B: Shading Coefficient (SC)
// ==========================================

// Hourly solar heat gain for windows at 20° latitude
export interface HourlySolarGain {
  hour: number;
  north: number;
  east: number;
  south: number;
  west: number;
  horizontal: number;
}

// June data (summer peak)
export const HOURLY_SOLAR_GAIN_JUNE: HourlySolarGain[] = [
  { hour: 6, north: 45, east: 150, south: 15, west: 0, horizontal: 130 },
  { hour: 7, north: 120, east: 155, south: 55, west: 0, horizontal: 345 },
  { hour: 8, north: 55, east: 90, south: 90, west: 0, horizontal: 560 },
  { hour: 9, north: 0, east: 15, south: 140, west: 0, horizontal: 745 },
  { hour: 10, north: 0, east: 0, south: 215, west: 0, horizontal: 900 },
  { hour: 11, north: 0, east: 0, south: 265, west: 25, horizontal: 1000 },
  { hour: 12, north: 0, east: 0, south: 285, west: 90, horizontal: 1025 },
  { hour: 13, north: 0, east: 0, south: 265, west: 140, horizontal: 1000 },
  { hour: 14, north: 0, east: 0, south: 215, west: 155, horizontal: 900 },
  { hour: 15, north: 0, east: 0, south: 140, west: 120, horizontal: 745 },
  { hour: 16, north: 45, east: 0, south: 55, west: 90, horizontal: 560 },
  { hour: 17, north: 120, east: 0, south: 15, west: 0, horizontal: 345 },
  { hour: 18, north: 150, east: 0, south: 0, west: 0, horizontal: 130 },
];

// December data
export const HOURLY_SOLAR_GAIN_DEC: HourlySolarGain[] = [
  { hour: 6, north: 45, east: 120, south: 115, west: 0, horizontal: 50 },
  { hour: 7, north: 30, east: 155, south: 55, west: 0, horizontal: 255 },
  { hour: 8, north: 0, east: 90, south: 480, west: 0, horizontal: 480 },
  { hour: 9, north: 0, east: 15, south: 680, west: 0, horizontal: 680 },
  { hour: 10, north: 0, east: 0, south: 835, west: 25, horizontal: 835 },
  { hour: 11, north: 0, east: 0, south: 940, west: 90, horizontal: 940 },
  { hour: 12, north: 0, east: 0, south: 985, west: 140, horizontal: 985 },
  { hour: 13, north: 0, east: 0, south: 940, west: 155, horizontal: 940 },
  { hour: 14, north: 0, east: 0, south: 835, west: 120, horizontal: 835 },
  { hour: 15, north: 0, east: 0, south: 680, west: 90, horizontal: 680 },
  { hour: 16, north: 30, east: 0, south: 480, west: 15, horizontal: 480 },
  { hour: 17, north: 120, east: 0, south: 255, west: 0, horizontal: 255 },
  { hour: 18, north: 150, east: 0, south: 50, west: 0, horizontal: 50 },
];

// Shading Coefficient Table 2-18B
export interface ShadingCoefficient {
  glassType: string;
  thickness: string; // mm
  noShading: number;
  rollerLight: number;
  rollerDark: number;
  venetianLight: number;
  venetianMedium: number;
}

export const SHADING_COEFFICIENTS: ShadingCoefficient[] = [
  { glassType: "زجاج مفرد", thickness: "3", noShading: 1, rollerLight: 0.25, rollerDark: 0.59, venetianLight: 0.55, venetianMedium: 0.64 },
  { glassType: "زجاج مفرد ملون", thickness: "6-12", noShading: 0.95, rollerLight: 0.25, rollerDark: 0.59, venetianLight: 0.55, venetianMedium: 0.64 },
  { glassType: "زجاج مفرد ماص للحرارة", thickness: "6", noShading: 0.7, rollerLight: 0.3, rollerDark: 0.4, venetianLight: 0.53, venetianMedium: 0.57 },
  { glassType: "زجاج مزدوج منتظم", thickness: "3", noShading: 0.9, rollerLight: 0.25, rollerDark: 0.6, venetianLight: 0.51, venetianMedium: 0.57 },
  { glassType: "زجاج مزدوج ملون", thickness: "6", noShading: 0.83, rollerLight: 0.25, rollerDark: 0.6, venetianLight: 0.51, venetianMedium: 0.57 },
];

// ==========================================
// جدول (2-19) الحرارة النوعية لمواد التغليف
// Table 2-19: Specific Heat of Packaging Materials
// ==========================================

export interface PackagingMaterial {
  id: string;
  name: string;
  cp: number; // kJ/kg.K
}

export const PACKAGING_MATERIALS: PackagingMaterial[] = [
  { id: "fiber", name: "الألياف", cp: 1.4 },
  { id: "wood", name: "الخشب", cp: 2.3 },
  { id: "steel", name: "الفولاذ", cp: 0.5 },
  { id: "plastic", name: "البلاستيك", cp: 1.6 },
  { id: "aluminum", name: "الألمنيوم", cp: 0.85 },
];

// ==========================================
// جداول (2-20 & 2-21) حرارة الأنسان
// Table 2-20: Human Heat (for AC)
// Table 2-21: Human Heat (for Refrigeration)
// ==========================================

export interface PeopleHeat {
  id: string;
  activity: string;
  location: string;
  qt: number; // Total heat W/person
  qs: number; // Sensible heat W
  ql: number; // Latent heat W
}

// Table 2-20: For Air Conditioning
export const PEOPLE_HEAT_AC: PeopleHeat[] = [
  { id: "rest", activity: "جالس ومستريح", location: "", qt: 97, qs: 66, ql: 31 },
  { id: "office_light", activity: "جالس ويعمل عمل خفيف", location: "مكتب-شقة-فندق", qt: 117, qs: 72, ql: 45 },
  { id: "office_medium", activity: "يزاول عمل متوسط", location: "مكتب-شقة-فندق", qt: 132, qs: 73, ql: 59 },
  { id: "shop_light", activity: "واقف يزاول عمل خفيف", location: "محلات تجارية", qt: 132, qs: 73, ql: 59 },
  { id: "bank_walk", activity: "يمشي ببطاً", location: "بنك", qt: 146, qs: 73, ql: 73 },
  { id: "restaurant_sit", activity: "جالس", location: "مطعم", qt: 162, qs: 81, ql: 81 },
  { id: "factory_light", activity: "يزاول شغل بسيط", location: "مصنع", qt: 229, qs: 81, ql: 139 },
  { id: "factory_mobile", activity: "عامل متحرك", location: "مصنع", qt: 293, qs: 110, ql: 183 },
  { id: "factory_medium", activity: "عامل يزاول شغل متوسط", location: "مصنع", qt: 292, qs: 88, ql: 204 },
  { id: "factory_heavy", activity: "عامل يزاول شغل ثقيل", location: "مصنع", qt: 425, qs: 170, ql: 255 },
  { id: "sports", activity: "شخص يزاول رياضة", location: "ملعب", qt: 425, qs: 170, ql: 255 },
];

// Table 2-21: For Refrigeration
export const PEOPLE_HEAT_REFRIG: { temp: number; qt: number }[] = [
  { temp: -30, qt: 450 },
  { temp: -25, qt: 410 },
  { temp: -20, qt: 390 },
  { temp: -10, qt: 300 },
  { temp: -5, qt: 275 },
  { temp: 0, qt: 250 },
  { temp: 5, qt: 225 },
  { temp: 10, qt: 200 },
];

// Get people heat for refrigeration by temperature (with interpolation)
export const getPeopleHeatRefrig = (temp: number): number => {
  if (temp <= -30) return 450;
  if (temp >= 10) return 200;

  for (let i = 0; i < PEOPLE_HEAT_REFRIG.length - 1; i++) {
    const lower = PEOPLE_HEAT_REFRIG[i];
    const upper = PEOPLE_HEAT_REFRIG[i + 1];
    if (temp >= lower.temp && temp <= upper.temp) {
      const ratio = (temp - lower.temp) / (upper.temp - lower.temp);
      return lower.qt + ratio * (upper.qt - lower.qt);
    }
  }
  return 250; // Default
};

// ==========================================
// جدول (2-22) معامل الاستخدام في الطريقة المختصرة
// Table 2-22: Usage Factor for Short Method
// ==========================================

export interface UsageFactor {
  service: string;
  heavy: number;
  medium: number;
  volumeFactor: number; // m³
}

export const USAGE_FACTORS: UsageFactor[] = [
  // جدول (2-22) كامل — 17 صفاً من 0.6 حتى 2800 م³
  { service: "0.6 م³",   heavy: 3.97, medium: 3.63, volumeFactor: 0.6   },
  { service: "0.85 م³",  heavy: 3.57, medium: 2.56, volumeFactor: 0.85  },
  { service: "1.5 م³",   heavy: 2.76, medium: 1.77, volumeFactor: 1.5   },
  { service: "2 م³",     heavy: 2.24, medium: 1.44, volumeFactor: 2     },
  { service: "3 م³",     heavy: 1.96, medium: 1.25, volumeFactor: 3     },
  { service: "6 م³",     heavy: 1.72, medium: 1.07, volumeFactor: 6     },
  { service: "8.5 م³",   heavy: 1.61, medium: 1.01, volumeFactor: 8.5   },
  { service: "11 م³",    heavy: 1.52, medium: 0.96, volumeFactor: 11    },
  { service: "14 م³",    heavy: 1.45, medium: 0.94, volumeFactor: 14    },
  { service: "17 م³",    heavy: 1.44, medium: 0.91, volumeFactor: 17    },
  { service: "23 م³",    heavy: 1.37, medium: 0.86, volumeFactor: 23    },
  { service: "28 م³",    heavy: 1.30, medium: 0.85, volumeFactor: 28    },
  { service: "34 م³",    heavy: 1.23, medium: 0.77, volumeFactor: 34    },
  { service: "43 م³",    heavy: 1.16, medium: 0.71, volumeFactor: 43    },
  { service: "57 م³",    heavy: 0,    medium: 0.65, volumeFactor: 57    }, // معامل ثقيل غير متاح
  { service: "85 م³",    heavy: 0,    medium: 0.58, volumeFactor: 85    }, // معامل ثقيل غير متاح
  { service: "140+ م³",  heavy: 0,    medium: 0.45, volumeFactor: 140   }, // معامل ثقيل غير متاح
];
