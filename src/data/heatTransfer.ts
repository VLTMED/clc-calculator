// ==========================================
// جدول (2-2) معامل انتقال الحرارة (h) [W/m².°C]
// Table 2-2: Film Coefficients for Air
// ==========================================

export interface FilmCoefficient {
  condition: string;
  direction: string;
  surfaceType: string;
  h: number;
}

// Still Air Film Coefficients
export const STILL_AIR_COEFFICIENTS: FilmCoefficient[] = [
  { condition: "هواء ساكن", direction: "إلى أعلى", surfaceType: "أفقي", h: 9.37 },
  { condition: "هواء ساكن", direction: "إلى أسفل", surfaceType: "أفقي", h: 6.0 },
  { condition: "هواء ساكن", direction: "أفقي", surfaceType: "رأسي", h: 8.0 },
];

// Moving Air Film Coefficients
export const MOVING_AIR_COEFFICIENTS: FilmCoefficient[] = [
  { condition: "هواء متحرك بسرعة 6.7 m/s", direction: "أي اتجاه", surfaceType: "أي نوع", h: 34.1 },
  { condition: "هواء متحرك بسرعة 3.4 m/s", direction: "أي اتجاه", surfaceType: "أي نوع", h: 22.7 },
];

export const ALL_FILM_COEFFICIENTS = [...STILL_AIR_COEFFICIENTS, ...MOVING_AIR_COEFFICIENTS];

// Get hi (inside) and ho (outside) based on conditions
export const getInsideFilmCoeff = (hasAirMovement: boolean = false): number =>
  hasAirMovement ? 34.1 : 8.0; // Default: vertical still air

export const getOutsideFilmCoeff = (windSpeed: number = 0): number => {
  if (windSpeed >= 6.7) return 34.1;
  if (windSpeed >= 3.4) return 22.7;
  return 22.7; // Default outdoor
};

// ==========================================
// جدول (2-3) معامل انتقال الحرارة [W/m²K] لجدران وسقف وأرضية مخازن التبريد
// Table 2-3: Overall U-Values for Cold Storage
// ==========================================

export interface ColdStorageUValue {
  insulationThickness: number; // mm
  k: number; // W/m.K for the insulation
  uValue: number; // W/m²K
}

// U-Values table based on insulation conductivity and thickness
export const COLD_STORAGE_U_VALUES: ColdStorageUValue[] = [
  // k=0.06
  { insulationThickness: 25, k: 0.06, uValue: 1.289 },
  { insulationThickness: 50, k: 0.06, uValue: 0.834 },
  { insulationThickness: 75, k: 0.06, uValue: 0.617 },
  { insulationThickness: 100, k: 0.06, uValue: 0.489 },
  { insulationThickness: 125, k: 0.06, uValue: 0.405 },
  { insulationThickness: 150, k: 0.06, uValue: 0.346 },
  { insulationThickness: 175, k: 0.06, uValue: 0.302 },
  { insulationThickness: 200, k: 0.06, uValue: 0.267 },
  // k=0.055
  { insulationThickness: 25, k: 0.055, uValue: 1.229 },
  { insulationThickness: 50, k: 0.055, uValue: 0.784 },
  { insulationThickness: 75, k: 0.055, uValue: 0.576 },
  { insulationThickness: 100, k: 0.055, uValue: 0.455 },
  { insulationThickness: 125, k: 0.055, uValue: 0.376 },
  { insulationThickness: 150, k: 0.055, uValue: 0.32 },
  { insulationThickness: 175, k: 0.055, uValue: 0.279 },
  { insulationThickness: 200, k: 0.055, uValue: 0.247 },
  // k=0.05
  { insulationThickness: 25, k: 0.05, uValue: 1.163 },
  { insulationThickness: 50, k: 0.05, uValue: 0.731 },
  { insulationThickness: 75, k: 0.05, uValue: 0.533 },
  { insulationThickness: 100, k: 0.05, uValue: 0.42 },
  { insulationThickness: 125, k: 0.05, uValue: 0.346 },
  { insulationThickness: 150, k: 0.05, uValue: 0.294 },
  { insulationThickness: 175, k: 0.05, uValue: 0.256 },
  { insulationThickness: 200, k: 0.05, uValue: 0.227 },
  // k=0.045
  { insulationThickness: 25, k: 0.045, uValue: 1.091 },
  { insulationThickness: 50, k: 0.045, uValue: 0.675 },
  { insulationThickness: 75, k: 0.045, uValue: 0.489 },
  { insulationThickness: 100, k: 0.045, uValue: 0.383 },
  { insulationThickness: 125, k: 0.045, uValue: 0.315 },
  { insulationThickness: 150, k: 0.045, uValue: 0.267 },
  { insulationThickness: 175, k: 0.045, uValue: 0.232 },
  { insulationThickness: 200, k: 0.045, uValue: 0.206 },
  // k=0.04
  { insulationThickness: 25, k: 0.04, uValue: 1.013 },
  { insulationThickness: 50, k: 0.04, uValue: 0.617 },
  { insulationThickness: 75, k: 0.04, uValue: 0.443 },
  { insulationThickness: 100, k: 0.04, uValue: 0.346 },
  { insulationThickness: 125, k: 0.04, uValue: 0.283 },
  { insulationThickness: 150, k: 0.04, uValue: 0.24 },
  { insulationThickness: 175, k: 0.04, uValue: 0.208 },
  { insulationThickness: 200, k: 0.04, uValue: 0.184 },
  // k=0.035
  { insulationThickness: 25, k: 0.035, uValue: 0.931 },
  { insulationThickness: 50, k: 0.035, uValue: 0.556 },
  { insulationThickness: 75, k: 0.035, uValue: 0.397 },
  { insulationThickness: 100, k: 0.035, uValue: 0.308 },
  { insulationThickness: 125, k: 0.035, uValue: 0.252 },
  { insulationThickness: 150, k: 0.035, uValue: 0.213 },
  { insulationThickness: 175, k: 0.035, uValue: 0.185 },
  { insulationThickness: 200, k: 0.035, uValue: 0.163 },
  // k=0.03
  { insulationThickness: 25, k: 0.03, uValue: 0.834 },
  { insulationThickness: 50, k: 0.03, uValue: 0.489 },
  { insulationThickness: 75, k: 0.03, uValue: 0.346 },
  { insulationThickness: 100, k: 0.03, uValue: 0.267 },
  { insulationThickness: 125, k: 0.03, uValue: 0.218 },
  { insulationThickness: 150, k: 0.03, uValue: 0.184 },
  { insulationThickness: 175, k: 0.03, uValue: 0.159 },
  { insulationThickness: 200, k: 0.03, uValue: 0.14 },
  // k=0.025
  { insulationThickness: 25, k: 0.025, uValue: 0.732 },
  { insulationThickness: 50, k: 0.025, uValue: 0.42 },
  { insulationThickness: 75, k: 0.025, uValue: 0.295 },
  { insulationThickness: 100, k: 0.025, uValue: 0.227 },
  { insulationThickness: 125, k: 0.025, uValue: 0.182 },
  { insulationThickness: 150, k: 0.025, uValue: 0.153 },
  { insulationThickness: 175, k: 0.025, uValue: 0.136 },
  { insulationThickness: 200, k: 0.025, uValue: 0.119 },
];

// Get U-value by insulation properties
export const getColdStorageUValue = (
  insulationThickness: number, // mm
  k: number // W/m.K
): number => {
  const entry = COLD_STORAGE_U_VALUES.find(
    (u) => u.insulationThickness === insulationThickness && Math.abs(u.k - k) < 0.001
  );
  return entry ? entry.uValue : 0;
};
