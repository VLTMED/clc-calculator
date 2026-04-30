// ==========================================
// جدول (2-11) معدلات التسرب من خلال فتح الأبواب [l/s]
// Table 2-11: Infiltration Air Flow Rates Through Doors
// ==========================================

export interface InfiltrationRate {
  roomVolume: number; // m³
  rateAboveZero: number; // l/s (for rooms > 0°C)
  rateBelowZero: number; // l/s (for rooms < 0°C)
}

export const INFILTRATION_RATES: InfiltrationRate[] = [
  { roomVolume: 7, rateAboveZero: 3.1, rateBelowZero: 2.3 },
  { roomVolume: 8.5, rateAboveZero: 3.4, rateBelowZero: 2.6 },
  { roomVolume: 10, rateAboveZero: 3.7, rateBelowZero: 2.8 },
  { roomVolume: 15, rateAboveZero: 4.4, rateBelowZero: 3.3 },
  { roomVolume: 20, rateAboveZero: 5.0, rateBelowZero: 3.8 },
  { roomVolume: 25, rateAboveZero: 5.5, rateBelowZero: 4.2 },
  { roomVolume: 30, rateAboveZero: 5.9, rateBelowZero: 4.6 },
  { roomVolume: 40, rateAboveZero: 6.8, rateBelowZero: 5.4 },
  { roomVolume: 50, rateAboveZero: 7.5, rateBelowZero: 5.8 },
  { roomVolume: 75, rateAboveZero: 9.0, rateBelowZero: 6.9 },
  { roomVolume: 100, rateAboveZero: 10.2, rateBelowZero: 7.9 },
  { roomVolume: 150, rateAboveZero: 12.2, rateBelowZero: 9.4 },
  { roomVolume: 200, rateAboveZero: 13.9, rateBelowZero: 10.9 },
  { roomVolume: 250, rateAboveZero: 15.3, rateBelowZero: 11.9 },
  { roomVolume: 300, rateAboveZero: 16.7, rateBelowZero: 12.9 },
  { roomVolume: 400, rateAboveZero: 19.0, rateBelowZero: 14.9 },
  { roomVolume: 500, rateAboveZero: 21.4, rateBelowZero: 16.8 },
  { roomVolume: 600, rateAboveZero: 23.6, rateBelowZero: 18.1 },
  { roomVolume: 700, rateAboveZero: 24.3, rateBelowZero: 18.6 },
  { roomVolume: 800, rateAboveZero: 25.9, rateBelowZero: 20.4 },
  { roomVolume: 900, rateAboveZero: 27.1, rateBelowZero: 21.9 },
  { roomVolume: 1000, rateAboveZero: 28.9, rateBelowZero: 23.1 },
];

// Get infiltration rate by room volume with interpolation
export const getInfiltrationRate = (
  roomVolume: number,
  isAboveZero: boolean
): number => {
  // Find closest entry
  let lower = INFILTRATION_RATES[0];
  let upper = INFILTRATION_RATES[INFILTRATION_RATES.length - 1];

  for (let i = 0; i < INFILTRATION_RATES.length - 1; i++) {
    if (
      roomVolume >= INFILTRATION_RATES[i].roomVolume &&
      roomVolume <= INFILTRATION_RATES[i + 1].roomVolume
    ) {
      lower = INFILTRATION_RATES[i];
      upper = INFILTRATION_RATES[i + 1];
      break;
    }
  }

  // Linear interpolation
  const ratio =
    (roomVolume - lower.roomVolume) /
    (upper.roomVolume - lower.roomVolume);
  const rate = isAboveZero
    ? lower.rateAboveZero +
      ratio * (upper.rateAboveZero - lower.rateAboveZero)
    : lower.rateBelowZero +
      ratio * (upper.rateBelowZero - lower.rateBelowZero);

  return rate;
};

// ==========================================
// جداول (2-12 A & B) كمية الحرارة المحتواة مع الهواء [kJ/l]
// Table 2-12 A: Room temp > 0°C
// Table 2-12 B: Room temp < 0°C
// ==========================================

export interface EnthalpyData {
  roomTemp: number; // °C
  airTemp: number; // °C
  humidity50?: number; // kJ/l at 50% RH
  humidity60?: number;
  humidity70?: number;
  humidity80?: number;
}

// Table 2-12 A: Room above 0°C
export const ENTHALPY_ABOVE_ZERO: EnthalpyData[] = [
  // Room temp 15°C
  { roomTemp: 15, airTemp: 25, humidity50: 0.0128, humidity60: 0.0186, humidity70: 0.0246 },
  { roomTemp: 15, airTemp: 30, humidity50: 0.0281, humidity60: 0.0357, humidity70: 0.0441 },
  { roomTemp: 15, airTemp: 35, humidity50: 0.05, humidity60: 0.0563, humidity70: 0.0663 },
  { roomTemp: 15, airTemp: 40, humidity50: 0.0663, humidity60: 0.0795 },
  // Room temp 10°C
  { roomTemp: 10, airTemp: 25, humidity50: 0.0266, humidity60: 0.0323, humidity70: 0.0382 },
  { roomTemp: 10, airTemp: 30, humidity50: 0.0319, humidity60: 0.0491, humidity70: 0.0574 },
  { roomTemp: 10, airTemp: 35, humidity50: 0.0591, humidity60: 0.0694, humidity70: 0.0792 },
  { roomTemp: 10, airTemp: 40, humidity50: 0.0792, humidity60: 0.0992 },
  // Room temp 5°C
  { roomTemp: 5, airTemp: 25, humidity50: 0.0388, humidity60: 0.0445, humidity70: 0.0502 },
  { roomTemp: 5, airTemp: 30, humidity50: 0.0536, humidity60: 0.061, humidity70: 0.0693 },
  { roomTemp: 5, airTemp: 35, humidity50: 0.0708, humidity60: 0.081, humidity70: 0.0906 },
  { roomTemp: 5, airTemp: 40, humidity50: 0.0906, humidity60: 0.1036 },
  // Room temp 0°C
  { roomTemp: 0, airTemp: 25, humidity50: 0.0493, humidity60: 0.055, humidity70: 0.0606 },
  { roomTemp: 0, airTemp: 30, humidity50: 0.0639, humidity60: 0.0713, humidity70: 0.0794 },
  { roomTemp: 0, airTemp: 35, humidity50: 0.0808, humidity60: 0.091, humidity70: 0.1003 },
  { roomTemp: 0, airTemp: 40, humidity50: 0.1003, humidity60: 0.1141 },
];

// Table 2-12 B: Room below 0°C
export const ENTHALPY_BELOW_ZERO: EnthalpyData[] = [
  // Room temp 0°C
  { roomTemp: -0, airTemp: 5, humidity70: 0.0092, humidity80: 0.0111 },
  { roomTemp: -0, airTemp: 10, humidity70: 0.0142, humidity80: 0.0154 },
  { roomTemp: -0, airTemp: 25, humidity50: 0.0505, humidity60: 0.0562, humidity70: 0.065, humidity80: 0.0724 },
  { roomTemp: -0, airTemp: 30, humidity50: 0.065, humidity60: 0.0724, humidity70: 0.082, humidity80: 0.0921 },
  { roomTemp: -0, airTemp: 35, humidity50: 0.082, humidity60: 0.0921 },
  // Room temp -5°C
  { roomTemp: -5, airTemp: 5, humidity70: 0.0193, humidity80: 0.021 },
  { roomTemp: -5, airTemp: 10, humidity70: 0.0235, humidity80: 0.0247 },
  { roomTemp: -5, airTemp: 25, humidity50: 0.0592, humidity60: 0.0649, humidity70: 0.0736, humidity80: 0.0809 },
  { roomTemp: -5, airTemp: 30, humidity50: 0.0736, humidity60: 0.0809, humidity70: 0.0903, humidity80: 0.1004 },
  { roomTemp: -5, airTemp: 35, humidity50: 0.0903, humidity60: 0.1004 },
  // Room temp -10°C
  { roomTemp: -10, airTemp: 5, humidity70: 0.0271, humidity80: 0.0288 },
  { roomTemp: -10, airTemp: 10, humidity70: 0.0309, humidity80: 0.0321 },
  { roomTemp: -10, airTemp: 25, humidity50: 0.0662, humidity60: 0.0719, humidity70: 0.0805, humidity80: 0.0877 },
  { roomTemp: -10, airTemp: 30, humidity50: 0.0805, humidity60: 0.0877, humidity70: 0.097, humidity80: 0.1071 },
  { roomTemp: -10, airTemp: 35, humidity50: 0.097, humidity60: 0.1071 },
  // Room temp -15°C
  { roomTemp: -15, airTemp: 5, humidity70: 0.035, humidity80: 0.0367 },
  { roomTemp: -15, airTemp: 10, humidity70: 0.0383, humidity80: 0.0395 },
  { roomTemp: -15, airTemp: 25, humidity50: 0.0732, humidity60: 0.0788, humidity70: 0.0873, humidity80: 0.0945 },
  { roomTemp: -15, airTemp: 30, humidity50: 0.0873, humidity60: 0.0945, humidity70: 0.1037, humidity80: 0.1137 },
  { roomTemp: -15, airTemp: 35, humidity50: 0.1037, humidity60: 0.1137 },
  // Room temp -20°C
  { roomTemp: -20, airTemp: 5, humidity70: 0.0427, humidity80: 0.0444 },
  { roomTemp: -20, airTemp: 10, humidity70: 0.0456, humidity80: 0.0468 },
  { roomTemp: -20, airTemp: 25, humidity50: 0.0801, humidity60: 0.0857, humidity70: 0.0941, humidity80: 0.1013 },
  { roomTemp: -20, airTemp: 30, humidity50: 0.0941, humidity60: 0.1013, humidity70: 0.1102, humidity80: 0.1203 },
  { roomTemp: -20, airTemp: 35, humidity50: 0.1102, humidity60: 0.1203 },
  // Room temp -25°C
  { roomTemp: -25, airTemp: 5, humidity70: 0.0501, humidity80: 0.0523 },
  { roomTemp: -25, airTemp: 10, humidity70: 0.0525, humidity80: 0.0537 },
  { roomTemp: -25, airTemp: 25, humidity50: 0.0866, humidity60: 0.0922, humidity70: 0.0998, humidity80: 0.1077 },
  { roomTemp: -25, airTemp: 30, humidity50: 0.0998, humidity60: 0.1077, humidity70: 0.1165, humidity80: 0.1265 },
  { roomTemp: -25, airTemp: 35, humidity50: 0.1165, humidity60: 0.1265 },
  // Room temp -30°C
  { roomTemp: -30, airTemp: 5, humidity70: 0.0571, humidity80: 0.0588 },
  { roomTemp: -30, airTemp: 10, humidity70: 0.0591, humidity80: 0.0604 },
  { roomTemp: -30, airTemp: 25, humidity50: 0.0929, humidity60: 0.0985, humidity70: 0.1067, humidity80: 0.1138 },
  { roomTemp: -30, airTemp: 30, humidity50: 0.1067, humidity60: 0.1138, humidity70: 0.1225, humidity80: 0.1325 },
  { roomTemp: -30, airTemp: 35, humidity50: 0.1225, humidity60: 0.1325 },
  // Room temp -35°C
  { roomTemp: -35, airTemp: 5, humidity70: 0.064, humidity80: 0.0657 },
  { roomTemp: -35, airTemp: 10, humidity70: 0.0656, humidity80: 0.0668 },
  { roomTemp: -35, airTemp: 25, humidity50: 0.0989, humidity60: 0.1045, humidity70: 0.1126, humidity80: 0.1197 },
  { roomTemp: -35, airTemp: 30, humidity50: 0.1126, humidity60: 0.1197, humidity70: 0.1283, humidity80: 0.1382 },
  { roomTemp: -35, airTemp: 35, humidity50: 0.1283, humidity60: 0.1382 },
  // Room temp -40°C
  { roomTemp: -40, airTemp: 5, humidity70: 0.0708, humidity80: 0.0725 },
  { roomTemp: -40, airTemp: 10, humidity70: 0.072, humidity80: 0.0732 },
  { roomTemp: -40, airTemp: 25, humidity50: 0.105, humidity60: 0.1106, humidity70: 0.1185, humidity80: 0.1256 },
  { roomTemp: -40, airTemp: 30, humidity50: 0.1185, humidity60: 0.1256, humidity70: 0.1341, humidity80: 0.144 },
  { roomTemp: -40, airTemp: 35, humidity50: 0.1341, humidity60: 0.144 },
];

// Get enthalpy difference (delta h)
export const getEnthalpyDiff = (
  roomTemp: number,
  airTemp: number,
  humidity: number,
  isAboveZero: boolean
): number => {
  const data = isAboveZero ? ENTHALPY_ABOVE_ZERO : ENTHALPY_BELOW_ZERO;
  const entry = data.find(
    (d) =>
      Math.abs(d.roomTemp - roomTemp) < 1 &&
      Math.abs(d.airTemp - airTemp) < 1
  );
  if (!entry) return isAboveZero ? 0.0563 : 0.0092; // Default values

  if (humidity <= 50) return entry.humidity50 || entry.humidity70 || 0;
  if (humidity <= 60) return entry.humidity60 || entry.humidity70 || 0;
  if (humidity <= 70) return entry.humidity70 || 0;
  return entry.humidity80 || entry.humidity70 || 0;
};

// ==========================================
// جدول (2-13) عدد مرات تغيير الهواء خلال 24 ساعة
// Table 2-13: Air Changes per 24 Hours
// ==========================================

export interface AirChangeRate {
  roomVolume: number; // m³
  changesPer24h: number;
}

export const AIR_CHANGE_RATES: AirChangeRate[] = [
  { roomVolume: 10, changesPer24h: 33 },
  { roomVolume: 20, changesPer24h: 22 },
  { roomVolume: 40, changesPer24h: 15 },
  { roomVolume: 60, changesPer24h: 12 },
  { roomVolume: 80, changesPer24h: 10 },
  { roomVolume: 100, changesPer24h: 9 },
  { roomVolume: 150, changesPer24h: 7 },
  { roomVolume: 200, changesPer24h: 5.8 },
  { roomVolume: 300, changesPer24h: 4.8 },
  { roomVolume: 400, changesPer24h: 4.2 },
  { roomVolume: 600, changesPer24h: 3.4 },
  { roomVolume: 800, changesPer24h: 2.9 },
  { roomVolume: 1000, changesPer24h: 2.5 },
  { roomVolume: 1500, changesPer24h: 1.9 },
  { roomVolume: 2000, changesPer24h: 1.7 },
  { roomVolume: 3000, changesPer24h: 1.4 },
  { roomVolume: 4000, changesPer24h: 1.2 },
];

// Get air changes per 24h by room volume with interpolation
export const getAirChangesPer24h = (roomVolume: number): number => {
  if (roomVolume <= AIR_CHANGE_RATES[0].roomVolume)
    return AIR_CHANGE_RATES[0].changesPer24h;

  for (let i = 0; i < AIR_CHANGE_RATES.length - 1; i++) {
    const lower = AIR_CHANGE_RATES[i];
    const upper = AIR_CHANGE_RATES[i + 1];
    if (roomVolume >= lower.roomVolume && roomVolume <= upper.roomVolume) {
      const ratio =
        (roomVolume - lower.roomVolume) /
        (upper.roomVolume - lower.roomVolume);
      return lower.changesPer24h + ratio * (upper.changesPer24h - lower.changesPer24h);
    }
  }

  return AIR_CHANGE_RATES[AIR_CHANGE_RATES.length - 1].changesPer24h;
};
