// ═══════════════════════════════════════════════════════════════════
// جدول 2-1: معامل التوصيل الحراري k (W/m·K)
// المصدر: ورقة الجداول، صفوف 1-13
// ═══════════════════════════════════════════════════════════════════
export interface Material {
  id: string;
  nameAr: string;
  nameEn: string;
  k: number; // W/m·K
}

export const MATERIALS: Material[] = [
  { id: "poly_smooth",  nameAr: "بوليستيرين (ناعم)",          nameEn: "Expanded Polystyrene (Smooth)",   k: 0.029 },
  { id: "poly_cut",     nameAr: "بوليستيرين (قطع)",           nameEn: "Expanded Polystyrene (Cut cell)", k: 0.036 },
  { id: "polyurethane", nameAr: "بوليريثان",                  nameEn: "Expanded Polyurethane",           k: 0.025 },
  { id: "corkboard",    nameAr: "الفلين (كوركبورد)",           nameEn: "Corkboard",                      k: 0.043 },
  { id: "mosaic",       nameAr: "موزاييك / قرميد طيني",       nameEn: "Mosaic / Clay Tile",              k: 0.500 },
  { id: "mineral_wool", nameAr: "صوف معدني",                  nameEn: "Mineral Wool",                   k: 0.039 },
  { id: "wood_fiber",   nameAr: "خشب / ألياف خشبية",         nameEn: "Wood / Wood fiber",               k: 0.043 },
  { id: "glass_fiber",  nameAr: "صوف زجاجي",                  nameEn: "Glass fiber",                    k: 0.036 },
  { id: "concrete",     nameAr: "الخرسانة",                   nameEn: "Concrete",                       k: 1.230 },
  { id: "cement_brick", nameAr: "مونة أسمنتية / طوب عادي",   nameEn: "Cinder Block, Brick, Plaster",   k: 0.720 },
  { id: "gypsum",       nameAr: "الجبس",                      nameEn: "Gypsum",                         k: 0.460 },
];

export function getMaterialById(id: string): Material | undefined {
  return MATERIALS.find(m => m.id === id);
}


// ═══════════════════════════════════════════════════════════════════
// جدول 2-2: معامل انتقال الحرارة السطحي h (W/m²·K)
// المصدر: ورقة الجداول، صفوف 15-23
// ═══════════════════════════════════════════════════════════════════
export const SURFACE_H_VALUES = {
  hi_up:    9.37,  // حرارة إلى أعلى (أفقي)
  hi_down:  6.00,  // حرارة إلى أسفل (أفقي)
  hi_vert:  8.00,  // حرارة أفقي (رأسي)
  ho_fast: 34.10,  // هواء متحرك 6.7 m/s
  ho_norm: 22.70,  // هواء متحرك 3.4 m/s
};


// ═══════════════════════════════════════════════════════════════════
// جدول 2-4: شروط التصميم لمدن المملكة العربية السعودية
// المصدر: ورقة الجداول، صفوف 28-32
// ═══════════════════════════════════════════════════════════════════
export interface City {
  id: string;
  nameAr: string;
  tempDryBulb: number; // °C
  tempWetBulb: number; // °C
}

export const SAUDI_CITIES: City[] = [
  { id: "jeddah",  nameAr: "جدة",     tempDryBulb: 41.0, tempWetBulb: 29.5 },
  { id: "riyadh",  nameAr: "الرياض",  tempDryBulb: 43.5, tempWetBulb: 25.5 },
  { id: "dhahran", nameAr: "الظهران", tempDryBulb: 44.0, tempWetBulb: 29.5 },
];


// ═══════════════════════════════════════════════════════════════════
// جدول 2-15: معامل الامتصاص الشمسي (a)
// المصدر: ورقة الجداول، صفوف 319-328
// ═══════════════════════════════════════════════════════════════════
export interface AbsorptanceMaterial {
  id: string;
  nameAr: string;
  a: number;
}

export const ABSORPTANCE_MATERIALS: AbsorptanceMaterial[] = [
  { id: "asphalt",      nameAr: "الأسفلت",         a: 0.89 },
  { id: "concrete",     nameAr: "الخرسانة",         a: 0.65 },
  { id: "red_brick",    nameAr: "الطوب الأحمر",    a: 0.77 },
  { id: "white_brick",  nameAr: "الطوب الأبيض",    a: 0.26 },
  { id: "cement_mortar",nameAr: "المونة الأسمنتية", a: 0.57 },
  { id: "gypsum_mortar",nameAr: "المونة الجبسية",  a: 0.40 },
  { id: "glass_wool",   nameAr: "الغازل الحراري",  a: 0.91 },
  { id: "bitumen",      nameAr: "البيتومين",        a: 0.90 },
];


// ═══════════════════════════════════════════════════════════════════
// جدول 2-16A: تأثير أشعة الشمس على مخازن التبريد
// DTs (فرق درجات إضافي) + I (شدة الإشعاع W/m²) + ساعات التعرض
// المصدر: ورقة الجداول، صفوف 319-328
// ═══════════════════════════════════════════════════════════════════
export interface SolarEffect16A {
  surface: string;      // نوع السطح
  surfaceAr: string;
  dTs: number;          // فرق درجات الحرارة الإضافي (°C)
  I: number;            // متوسط شدة الإشعاع (W/m²)
  hours: number;        // عدد ساعات التعرض
}

export const SOLAR_EFFECTS_16A: SolarEffect16A[] = [
  { surface: "east",  surfaceAr: "جدار-الشرقي", dTs: 12, I: 462, hours: 6 },
  { surface: "west",  surfaceAr: "الغربي",       dTs: 12, I: 462, hours: 6 },
  { surface: "north", surfaceAr: "الشمالي",      dTs: 2,  I: 71,  hours: 6 },
  { surface: "south", surfaceAr: "الجنوبي",      dTs: 3,  I: 117, hours: 7 },
  { surface: "roof",  surfaceAr: "السقف",         dTs: 9,  I: 333, hours: 12 },
];

export function getSolarEffect16A(surface: string): SolarEffect16A | undefined {
  return SOLAR_EFFECTS_16A.find(s => s.surface === surface);
}


// ═══════════════════════════════════════════════════════════════════
// جدول 2-16B: شدة أشعة الشمس (W/m²) بالشهر والاتجاه — للتكييف
// خط العرض 20 درجة
// المصدر: ورقة الجداول، صفوف 330-375
// ═══════════════════════════════════════════════════════════════════
export interface SolarRadiation16B {
  month: string;
  horizontal: number;
  north: number;
  east: number;
  south: number;
  west: number;
}

export const SOLAR_RADIATION_16B: SolarRadiation16B[] = [
  { month: "يناير",   horizontal: 732, north: 91,  east: 634, south: 675, west: 634 },
  { month: "فبراير",  horizontal: 830, north: 98,  east: 713, south: 549, west: 713 },
  { month: "مارس",    horizontal: 896, north: 107, east: 748, south: 363, west: 748 },
  { month: "أبريل",   horizontal: 905, north: 120, east: 719, south: 183, west: 719 },
  { month: "مايو",    horizontal: 893, north: 148, east: 685, south: 133, west: 685 },
  { month: "يونيو",   horizontal: 880, north: 186, east: 663, south: 133, west: 663 },
  { month: "يوليو",   horizontal: 877, north: 151, east: 669, south: 136, west: 669 },
  { month: "أغسطس",   horizontal: 883, north: 126, east: 694, south: 180, west: 694 },
  { month: "سبتمبر",  horizontal: 868, north: 114, east: 710, south: 360, west: 710 },
  { month: "أكتوبر",  horizontal: 814, north: 101, east: 685, south: 536, west: 685 },
  { month: "نوفمبر",  horizontal: 726, north: 91,  east: 622, south: 66,  west: 622 },
  { month: "ديسمبر",  horizontal: 685, north: 85,  east: 590, south: 713, west: 590 },
  { month: "الأقصى",  horizontal: 905, north: 186, east: 748, south: 713, west: 748 },
];

export function getSolarRadiation16B(month: string, direction: string): number {
  const row = SOLAR_RADIATION_16B.find(r => r.month === month);
  if (!row) return 0;
  const map: Record<string, keyof SolarRadiation16B> = {
    "أفقي": "horizontal", "شمالي": "north", "شرقي": "east", "جنوبي": "south", "غربي": "west",
    "Hor": "horizontal", "N": "north", "E": "east", "S": "south", "W": "west",
  };
  const key = map[direction];
  return key ? (row[key] as number) : 0;
}


// ═══════════════════════════════════════════════════════════════════
// جدول 2-17: معامل انتقال الحرارة الكلي للزجاج U (W/m²·K)
// المصدر: ورقة الجداول، صفوف 331-337
// ═══════════════════════════════════════════════════════════════════
export interface GlassType {
  id: string;
  nameAr: string;
  uSummer: number;
  uWinter: number;
}

export const GLASS_TYPES: GlassType[] = [
  { id: "single",       nameAr: "زجاج مفرد",                    uSummer: 4.7, uWinter: 7.0 },
  { id: "double_5mm",   nameAr: "زجاج مزدوج — طبقة هواء 5 مم", uSummer: 3.2, uWinter: 4.0 },
  { id: "double_6mm",   nameAr: "زجاج مزدوج — طبقة هواء 6 مم", uSummer: 3.1, uWinter: 2.7 },
  { id: "double_13mm",  nameAr: "زجاج مزدوج — طبقة هواء 13 مم",uSummer: 2.8, uWinter: 3.4 },
];


// ═══════════════════════════════════════════════════════════════════
// جدول 2-18A: أقصى حرارة مكتسبة للزجاج (W/m²) — خط عرض 20
// بالاتجاه والشهر
// المصدر: ورقة الجداول، صفوف 360-375
// ═══════════════════════════════════════════════════════════════════
export interface SHGF18A {
  month: string;
  N: number; E: number; S: number; W: number; Hor: number;
}

// من جدول 2-18A (يونية/يوليو/أغسطس — الأشهر الحرجة)
// + الشهر 21 (المقارن الأقصى)
export const SHGF_TABLE_18A: SHGF18A[] = [
  // month 21 (June) from Excel rows 336-338
  { month: "يونية (21)",   N: 105, E: 220, S: 45,  W: 395, Hor: 1025 },
  // month 23 (July) from Excel rows 342-344
  { month: "يوليو (23)",   N: 155, E: 225, S: 25,  W: 365, Hor: 1020 },
  // month 24 (August) from Excel rows 348-350
  { month: "أغسطس (24)",   N: 285, E: 230, S: 50,  W: 245, Hor: 985  },
  // month 22 (September) from Excel rows 354-356
  { month: "سبتمبر (22)",  N: 445, E: 230, S: 265, W: 230, Hor: 870  },
];

// Fallback max SHGF per direction (يستخدم عند عدم تحديد الشهر)
export const SHGF_MAX: Record<string, number> = {
  N: 285, E: 635, S: 675, W: 635, Hor: 1025,
};


// ═══════════════════════════════════════════════════════════════════
// جدول 2-18B: معامل التضليل SC
// المصدر: ورقة الجداول، صفوف 377-399
// ═══════════════════════════════════════════════════════════════════
export interface ShadingCoefficient {
  glassType: string;
  thickness_mm: number | string;
  noShading: number;       // بدون تضليل
  rollerLight: number;     // ستائر ملفوفة فاتحة
  rollerDark: number;      // ستائر ملفوفة غامقة
  venetianLight: number;   // ستائر فينيسية فاتحة
  venetianMedium: number;  // ستائر فينيسية متوسطة
}

export const SHADING_COEFFICIENTS: ShadingCoefficient[] = [
  // زجاج مفرد
  { glassType: "لوح منتظم",    thickness_mm: 3,      noShading: 1.00, rollerLight: 0.25, rollerDark: 0.59, venetianLight: 0.55, venetianMedium: 0.64 },
  { glassType: "لوح منتظم",    thickness_mm: "6-12", noShading: 0.95, rollerLight: 0.25, rollerDark: 0.59, venetianLight: 0.55, venetianMedium: 0.64 },
  { glassType: "ماص للحرارة",  thickness_mm: 6,      noShading: 0.70, rollerLight: 0.30, rollerDark: 0.40, venetianLight: 0.53, venetianMedium: 0.57 },
  // زجاج مزدوج
  { glassType: "لوح منتظم مزدوج",  thickness_mm: 3,  noShading: 0.90, rollerLight: 0.25, rollerDark: 0.60, venetianLight: 0.51, venetianMedium: 0.57 },
  { glassType: "ملون مزدوج",       thickness_mm: 6,  noShading: 0.83, rollerLight: 0.25, rollerDark: 0.60, venetianLight: 0.51, venetianMedium: 0.57 },
  { glassType: "عاكس للحرارة",    thickness_mm: 6,  noShading: 0.30, rollerLight: 0,    rollerDark: 0,    venetianLight: 0,    venetianMedium: 0.25 },
];


// ═══════════════════════════════════════════════════════════════════
// جدول 2-11: معدلات التسرب عند فتح الأبواب (l/s)
// المصدر: ورقة الجداول، صفوف 242-268
// ═══════════════════════════════════════════════════════════════════
export interface InfiltrationRate {
  roomVolume: number;    // m³
  rateAboveZero: number; // l/s (درجة حرارة > 0°C)
  rateBelowZero: number; // l/s (درجة حرارة < 0°C)
}

export const INFILTRATION_RATES: InfiltrationRate[] = [
  { roomVolume: 7,    rateAboveZero: 3.1,  rateBelowZero: 2.3  },
  { roomVolume: 8.5,  rateAboveZero: 3.4,  rateBelowZero: 2.6  },
  { roomVolume: 10,   rateAboveZero: 3.7,  rateBelowZero: 2.8  },
  { roomVolume: 15,   rateAboveZero: 4.4,  rateBelowZero: 3.3  },
  { roomVolume: 20,   rateAboveZero: 5.0,  rateBelowZero: 3.8  },
  { roomVolume: 25,   rateAboveZero: 5.5,  rateBelowZero: 4.2  },
  { roomVolume: 30,   rateAboveZero: 5.9,  rateBelowZero: 4.6  },
  { roomVolume: 40,   rateAboveZero: 6.8,  rateBelowZero: 5.4  },
  { roomVolume: 50,   rateAboveZero: 7.5,  rateBelowZero: 5.8  },
  { roomVolume: 75,   rateAboveZero: 9.0,  rateBelowZero: 6.9  },
  { roomVolume: 100,  rateAboveZero: 10.2, rateBelowZero: 7.9  },
  { roomVolume: 150,  rateAboveZero: 12.2, rateBelowZero: 9.4  },
  { roomVolume: 200,  rateAboveZero: 13.9, rateBelowZero: 10.9 },
  { roomVolume: 250,  rateAboveZero: 15.3, rateBelowZero: 11.9 },
  { roomVolume: 300,  rateAboveZero: 16.7, rateBelowZero: 12.9 },
  { roomVolume: 400,  rateAboveZero: 19.0, rateBelowZero: 14.9 },
  { roomVolume: 500,  rateAboveZero: 21.4, rateBelowZero: 16.8 },
  { roomVolume: 600,  rateAboveZero: 23.6, rateBelowZero: 18.1 },
  { roomVolume: 700,  rateAboveZero: 24.3, rateBelowZero: 18.6 },
  { roomVolume: 800,  rateAboveZero: 25.9, rateBelowZero: 20.4 },
  { roomVolume: 900,  rateAboveZero: 27.1, rateBelowZero: 21.9 },
  { roomVolume: 1000, rateAboveZero: 28.9, rateBelowZero: 23.1 },
];

export function getInfiltrationRate(volume: number, tempIn: number): number {
  if (INFILTRATION_RATES.length === 0) return 0;
  const isBelowZero = tempIn < 0;
  const sorted = INFILTRATION_RATES;
  if (volume <= sorted[0].roomVolume)
    return isBelowZero ? sorted[0].rateBelowZero : sorted[0].rateAboveZero;
  if (volume >= sorted[sorted.length - 1].roomVolume)
    return isBelowZero ? sorted[sorted.length - 1].rateBelowZero : sorted[sorted.length - 1].rateAboveZero;
  for (let i = 0; i < sorted.length - 1; i++) {
    if (volume >= sorted[i].roomVolume && volume <= sorted[i + 1].roomVolume) {
      const t = (volume - sorted[i].roomVolume) / (sorted[i + 1].roomVolume - sorted[i].roomVolume);
      const r0 = isBelowZero ? sorted[i].rateBelowZero : sorted[i].rateAboveZero;
      const r1 = isBelowZero ? sorted[i + 1].rateBelowZero : sorted[i + 1].rateAboveZero;
      return parseFloat((r0 + t * (r1 - r0)).toFixed(2));
    }
  }
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// جدول 2-12A: كمية الحرارة مع الهواء الداخل (kJ/l) — درجة حرارة الحيز > 0
// المصدر: ورقة الجداول، صفوف 270-279
// الصفوف: درجة الحيز (0,5,10,15)°C
// الأعمدة: (درجة خارجية × رطوبة نسبية)
// ═══════════════════════════════════════════════════════════════════
export interface EnthalpyRow12A {
  tempRoom: number;
  data: { tempOut: number; rh: number; value: number }[];
}

export const ENTHALPY_TABLE_12A: EnthalpyRow12A[] = [
  { tempRoom: 15, data: [
    { tempOut: 25, rh: 50, value: 0.0128 }, { tempOut: 25, rh: 60, value: 0.0186 }, { tempOut: 25, rh: 70, value: 0.0246 },
    { tempOut: 30, rh: 50, value: 0.0281 }, { tempOut: 30, rh: 60, value: 0.0357 }, { tempOut: 30, rh: 70, value: 0.0441 },
    { tempOut: 35, rh: 50, value: 0.0500 }, { tempOut: 35, rh: 60, value: 0.0563 },
    { tempOut: 40, rh: 50, value: 0.0663 }, { tempOut: 40, rh: 60, value: 0.0795 },
  ]},
  { tempRoom: 10, data: [
    { tempOut: 25, rh: 50, value: 0.0266 }, { tempOut: 25, rh: 60, value: 0.0323 }, { tempOut: 25, rh: 70, value: 0.0382 },
    { tempOut: 30, rh: 50, value: 0.0319 }, { tempOut: 30, rh: 60, value: 0.0491 }, { tempOut: 30, rh: 70, value: 0.0574 },
    { tempOut: 35, rh: 50, value: 0.0591 }, { tempOut: 35, rh: 60, value: 0.0694 },
    { tempOut: 40, rh: 50, value: 0.0792 }, { tempOut: 40, rh: 60, value: 0.0992 },
  ]},
  { tempRoom: 5, data: [
    { tempOut: 25, rh: 50, value: 0.0388 }, { tempOut: 25, rh: 60, value: 0.0445 }, { tempOut: 25, rh: 70, value: 0.0502 },
    { tempOut: 30, rh: 50, value: 0.0536 }, { tempOut: 30, rh: 60, value: 0.0610 }, { tempOut: 30, rh: 70, value: 0.0693 },
    { tempOut: 35, rh: 50, value: 0.0708 }, { tempOut: 35, rh: 60, value: 0.0810 },
    { tempOut: 40, rh: 50, value: 0.0906 }, { tempOut: 40, rh: 60, value: 0.1036 },
  ]},
  { tempRoom: 0, data: [
    { tempOut: 25, rh: 50, value: 0.0493 }, { tempOut: 25, rh: 60, value: 0.0550 }, { tempOut: 25, rh: 70, value: 0.0606 },
    { tempOut: 30, rh: 50, value: 0.0639 }, { tempOut: 30, rh: 60, value: 0.0713 }, { tempOut: 30, rh: 70, value: 0.0794 },
    { tempOut: 35, rh: 50, value: 0.0808 }, { tempOut: 35, rh: 60, value: 0.0910 },
    { tempOut: 40, rh: 50, value: 0.1003 }, { tempOut: 40, rh: 60, value: 0.1141 },
  ]},
];


// ═══════════════════════════════════════════════════════════════════
// جدول 2-12B: كمية الحرارة مع الهواء الداخل (kJ/l) — درجة حرارة الحيز < 0
// المصدر: ورقة الجداول، صفوف 281-295
// ═══════════════════════════════════════════════════════════════════
export interface EnthalpyRow12B {
  tempRoom: number;
  data: { tempOut: number; rh: number; value: number }[];
}

export const ENTHALPY_TABLE_12B: EnthalpyRow12B[] = [
  { tempRoom: 0,   data: [
    { tempOut: 5,  rh: 70, value: 0.0092 }, { tempOut: 5,  rh: 80, value: 0.0111 },
    { tempOut: 10, rh: 70, value: 0.0142 }, { tempOut: 10, rh: 80, value: 0.0154 },
    { tempOut: 25, rh: 50, value: 0.0505 }, { tempOut: 25, rh: 60, value: 0.0562 },
    { tempOut: 30, rh: 50, value: 0.0650 }, { tempOut: 30, rh: 60, value: 0.0724 },
    { tempOut: 35, rh: 50, value: 0.0820 }, { tempOut: 35, rh: 60, value: 0.0921 },
  ]},
  { tempRoom: -5,  data: [
    { tempOut: 5,  rh: 70, value: 0.0193 }, { tempOut: 5,  rh: 80, value: 0.0210 },
    { tempOut: 10, rh: 70, value: 0.0235 }, { tempOut: 10, rh: 80, value: 0.0247 },
    { tempOut: 25, rh: 50, value: 0.0592 }, { tempOut: 25, rh: 60, value: 0.0649 },
    { tempOut: 30, rh: 50, value: 0.0736 }, { tempOut: 30, rh: 60, value: 0.0809 },
    { tempOut: 35, rh: 50, value: 0.0903 }, { tempOut: 35, rh: 60, value: 0.1004 },
  ]},
  { tempRoom: -10, data: [
    { tempOut: 5,  rh: 70, value: 0.0271 }, { tempOut: 5,  rh: 80, value: 0.0288 },
    { tempOut: 10, rh: 70, value: 0.0309 }, { tempOut: 10, rh: 80, value: 0.0321 },
    { tempOut: 25, rh: 50, value: 0.0662 }, { tempOut: 25, rh: 60, value: 0.0719 },
    { tempOut: 30, rh: 50, value: 0.0805 }, { tempOut: 30, rh: 60, value: 0.0877 },
    { tempOut: 35, rh: 50, value: 0.0970 }, { tempOut: 35, rh: 60, value: 0.1071 },
  ]},
  { tempRoom: -15, data: [
    { tempOut: 5,  rh: 70, value: 0.0350 }, { tempOut: 5,  rh: 80, value: 0.0367 },
    { tempOut: 10, rh: 70, value: 0.0383 }, { tempOut: 10, rh: 80, value: 0.0395 },
    { tempOut: 25, rh: 50, value: 0.0732 }, { tempOut: 25, rh: 60, value: 0.0788 },
    { tempOut: 30, rh: 50, value: 0.0873 }, { tempOut: 30, rh: 60, value: 0.0945 },
    { tempOut: 35, rh: 50, value: 0.1037 }, { tempOut: 35, rh: 60, value: 0.1137 },
  ]},
  { tempRoom: -20, data: [
    { tempOut: 5,  rh: 70, value: 0.0427 }, { tempOut: 5,  rh: 80, value: 0.0444 },
    { tempOut: 10, rh: 70, value: 0.0456 }, { tempOut: 10, rh: 80, value: 0.0468 },
    { tempOut: 25, rh: 50, value: 0.0801 }, { tempOut: 25, rh: 60, value: 0.0857 },
    { tempOut: 30, rh: 50, value: 0.0941 }, { tempOut: 30, rh: 60, value: 0.1013 },
    { tempOut: 35, rh: 50, value: 0.1102 }, { tempOut: 35, rh: 60, value: 0.1203 },
  ]},
  { tempRoom: -25, data: [
    { tempOut: 5,  rh: 70, value: 0.0501 }, { tempOut: 5,  rh: 80, value: 0.0523 },
    { tempOut: 10, rh: 70, value: 0.0525 }, { tempOut: 10, rh: 80, value: 0.0537 },
    { tempOut: 25, rh: 50, value: 0.0866 }, { tempOut: 25, rh: 60, value: 0.0922 },
    { tempOut: 30, rh: 50, value: 0.0998 }, { tempOut: 30, rh: 60, value: 0.1077 },
    { tempOut: 35, rh: 50, value: 0.1165 }, { tempOut: 35, rh: 60, value: 0.1265 },
  ]},
  { tempRoom: -30, data: [
    { tempOut: 5,  rh: 70, value: 0.0571 }, { tempOut: 5,  rh: 80, value: 0.0588 },
    { tempOut: 10, rh: 70, value: 0.0591 }, { tempOut: 10, rh: 80, value: 0.0604 },
    { tempOut: 25, rh: 50, value: 0.0929 }, { tempOut: 25, rh: 60, value: 0.0985 },
    { tempOut: 30, rh: 50, value: 0.1067 }, { tempOut: 30, rh: 60, value: 0.1138 },
    { tempOut: 35, rh: 50, value: 0.1225 }, { tempOut: 35, rh: 60, value: 0.1325 },
  ]},
  { tempRoom: -35, data: [
    { tempOut: 5,  rh: 70, value: 0.0640 }, { tempOut: 5,  rh: 80, value: 0.0657 },
    { tempOut: 10, rh: 70, value: 0.0656 }, { tempOut: 10, rh: 80, value: 0.0668 },
    { tempOut: 25, rh: 50, value: 0.0989 }, { tempOut: 25, rh: 60, value: 0.1045 },
    { tempOut: 30, rh: 50, value: 0.1126 }, { tempOut: 30, rh: 60, value: 0.1197 },
    { tempOut: 35, rh: 50, value: 0.1283 }, { tempOut: 35, rh: 60, value: 0.1382 },
  ]},
  { tempRoom: -40, data: [
    { tempOut: 5,  rh: 70, value: 0.0708 }, { tempOut: 5,  rh: 80, value: 0.0725 },
    { tempOut: 10, rh: 70, value: 0.0720 }, { tempOut: 10, rh: 80, value: 0.0732 },
    { tempOut: 25, rh: 50, value: 0.1050 }, { tempOut: 25, rh: 60, value: 0.1106 },
    { tempOut: 30, rh: 50, value: 0.1185 }, { tempOut: 30, rh: 60, value: 0.1256 },
    { tempOut: 35, rh: 50, value: 0.1341 }, { tempOut: 35, rh: 60, value: 0.1440 },
  ]},
];

// Helper: get enthalpy from 12A or 12B by interpolation
export function getEnthalpyDiff(tempRoom: number, tempOut: number, rh: number): number {
  const table = tempRoom < 0 ? ENTHALPY_TABLE_12B : ENTHALPY_TABLE_12A;
  let r1 = table[0], r2 = table[0];
  for (let i = 0; i < table.length - 1; i++) {
    if (tempRoom >= table[i + 1].tempRoom && tempRoom <= table[i].tempRoom) {
      r1 = table[i]; r2 = table[i + 1];
      break;
    }
  }
  const findVal = (row: EnthalpyRow12A | EnthalpyRow12B): number => {
    const candidates = row.data.filter(d =>
      Math.abs(d.tempOut - tempOut) <= 5 && Math.abs(d.rh - rh) <= 15
    );
    if (candidates.length === 0) {
      // fallback: closest
      const sorted = [...row.data].sort((a, b) =>
        Math.abs(a.tempOut - tempOut) + Math.abs(a.rh - rh) -
        Math.abs(b.tempOut - tempOut) - Math.abs(b.rh - rh)
      );
      return sorted[0]?.value ?? 0.05;
    }
    return candidates[0].value;
  };
  const v1 = findVal(r1), v2 = findVal(r2);
  if (r1.tempRoom === r2.tempRoom) return v1;
  const t = (tempRoom - r1.tempRoom) / (r2.tempRoom - r1.tempRoom);
  return v1 + t * (v2 - v1);
}


// ═══════════════════════════════════════════════════════════════════
// جدول 2-13: عدد مرات تغيير الهواء خلال 24 ساعة
// المصدر: ورقة الجداول، صفوف 297-316
// ═══════════════════════════════════════════════════════════════════
export interface AirChangeRate {
  roomVolume: number | string;
  changesPerDay: number;
}

export const AIR_CHANGE_RATES: AirChangeRate[] = [
  { roomVolume: 10,   changesPerDay: 33.0 },
  { roomVolume: 20,   changesPerDay: 22.0 },
  { roomVolume: 40,   changesPerDay: 15.0 },
  { roomVolume: 60,   changesPerDay: 12.0 },
  { roomVolume: 80,   changesPerDay: 10.0 },
  { roomVolume: 100,  changesPerDay: 9.0  },
  { roomVolume: 150,  changesPerDay: 7.0  },
  { roomVolume: 200,  changesPerDay: 5.8  },
  { roomVolume: 300,  changesPerDay: 4.8  },
  { roomVolume: 400,  changesPerDay: 4.2  },
  { roomVolume: 600,  changesPerDay: 3.4  },
  { roomVolume: 800,  changesPerDay: 2.9  },
  { roomVolume: 1000, changesPerDay: 2.5  },
  { roomVolume: 1500, changesPerDay: 1.9  },
  { roomVolume: 2000, changesPerDay: 1.7  },
  { roomVolume: 3000, changesPerDay: 1.4  },
  { roomVolume: ">4000", changesPerDay: 1.2 },
];

export function getAirChangesPerDay(volume: number): number {
  const numeric = AIR_CHANGE_RATES.filter(r => typeof r.roomVolume === "number") as { roomVolume: number; changesPerDay: number }[];
  if (volume <= numeric[0].roomVolume) return numeric[0].changesPerDay;
  if (volume >= numeric[numeric.length - 1].roomVolume) return numeric[numeric.length - 1].changesPerDay;
  for (let i = 0; i < numeric.length - 1; i++) {
    if (volume >= numeric[i].roomVolume && volume <= numeric[i + 1].roomVolume) {
      const t = (volume - numeric[i].roomVolume) / (numeric[i + 1].roomVolume - numeric[i].roomVolume);
      return parseFloat((numeric[i].changesPerDay + t * (numeric[i + 1].changesPerDay - numeric[i].changesPerDay)).toFixed(2));
    }
  }
  return 1.2;
}


// ═══════════════════════════════════════════════════════════════════
// جدول 2-14: معدلات التهوية (L/s/شخص)
// المصدر: ورقة الجداول، صفوف 297-312 (عمود G-J)
// ═══════════════════════════════════════════════════════════════════
export interface VentilationRate {
  id: string;
  nameAr: string;
  preferred: number;
  minimum: number;
  smoking: string;
}

export const VENTILATION_RATES: VentilationRate[] = [
  { id: "apartment",  nameAr: "شقة",             preferred: 9.5,  minimum: 7.0,  smoking: "أحياناً" },
  { id: "bank",       nameAr: "بنك",             preferred: 7.5,  minimum: 5.0,  smoking: "أحياناً" },
  { id: "salon",      nameAr: "صالون",           preferred: 7.0,  minimum: 5.0,  smoking: "أحياناً" },
  { id: "smoky",      nameAr: "مكان تدخين شديد",preferred: 15.0, minimum: 12.0, smoking: "شديد"    },
  { id: "retail",     nameAr: "محلات تجارية",   preferred: 3.5,  minimum: 2.5,  smoking: "ممنوع"   },
  { id: "factory",    nameAr: "مصانع",           preferred: 5.0,  minimum: 3.5,  smoking: "ممنوع"   },
  { id: "hospital",   nameAr: "مستشفيات",        preferred: 14.0, minimum: 12.0, smoking: "ممنوع"   },
  { id: "hotel",      nameAr: "فنادق",           preferred: 14.0, minimum: 12.0, smoking: "شديد"    },
  { id: "meeting",    nameAr: "غرف اجتماعات",   preferred: 24.0, minimum: 14.0, smoking: "شديد"    },
  { id: "office_priv",nameAr: "مكاتب خصوصية",  preferred: 12.0, minimum: 7.0,  smoking: "أحياناً" },
  { id: "office_gen", nameAr: "مكاتب عامة",     preferred: 12.5, minimum: 7.5,  smoking: "أحياناً" },
  { id: "restaurant", nameAr: "مطاعم",           preferred: 10.0, minimum: 7.5,  smoking: "أحياناً" },
  { id: "cafeteria",  nameAr: "كافتيريا",        preferred: 6.0,  minimum: 3.5,  smoking: "أحياناً" },
];


// ═══════════════════════════════════════════════════════════════════
// جدول 2-20: الحرارة المحسوسة والكامنة للإنسان — للتكييف (W/شخص)
// المصدر: ورقة الجداول، صفوف 347-360
// ═══════════════════════════════════════════════════════════════════
export interface PeopleHeatAC {
  id: string;
  activityAr: string;
  useAr: string;
  qt: number;      // إجمالي (W/شخص)
  qs: number;      // محسوسة
  ql: number;      // كامنة
}

export const PEOPLE_HEAT_AC: PeopleHeatAC[] = [
  { id: "seated_rest",   activityAr: "جالس ومستريح",             useAr: "",                       qt: 97,  qs: 66,  ql: 31  },
  { id: "seated_light",  activityAr: "جالس ويعمل عمل خفيف",     useAr: "مكتب-شقة-فندق",          qt: 117, qs: 72,  ql: 45  },
  { id: "seated_medium", activityAr: "يزاول عمل متوسط",         useAr: "مكتب-شقة-فندق",          qt: 132, qs: 73,  ql: 59  },
  { id: "standing_light",activityAr: "واقف يزاول عمل خفيف",    useAr: "محلات تجارية",            qt: 132, qs: 73,  ql: 59  },
  { id: "walking_slow",  activityAr: "يمشي ببطء",               useAr: "بنك",                    qt: 146, qs: 73,  ql: 73  },
  { id: "sitting_rest2", activityAr: "جالس (مطعم)",             useAr: "مطعم",                   qt: 162, qs: 81,  ql: 81  },
  { id: "factory_light", activityAr: "يزاول شغل بسيط",          useAr: "مصنع",                   qt: 229, qs: 81,  ql: 139 },
  { id: "factory_move",  activityAr: "عامل متحرك",              useAr: "مصنع",                   qt: 293, qs: 110, ql: 183 },
  { id: "factory_medium",activityAr: "عامل يزاول شغل متوسط",   useAr: "مصنع",                   qt: 292, qs: 88,  ql: 204 },
  { id: "factory_heavy", activityAr: "عامل يزاول شغل ثقيل",    useAr: "مصنع",                   qt: 425, qs: 170, ql: 255 },
  { id: "sport",         activityAr: "شخص يزاول رياضة",         useAr: "ملعب",                   qt: 425, qs: 170, ql: 255 },
];


// ═══════════════════════════════════════════════════════════════════
// جدول 2-21: حرارة الإنسان للتبريد Qt (W/شخص) حسب درجة حرارة المخزن
// المصدر: ورقة الجداول، صفوف 362-371
// ═══════════════════════════════════════════════════════════════════
export interface PeopleHeatRefrig {
  tempRoom: number;
  qt: number;
}

export const PEOPLE_HEAT_REFRIG: PeopleHeatRefrig[] = [
  { tempRoom: -30, qt: 450 },
  { tempRoom: -25, qt: 410 },
  { tempRoom: -20, qt: 390 },
  { tempRoom: -10, qt: 300 },
  { tempRoom: -5,  qt: 275 },
  { tempRoom: 0,   qt: 250 },
  { tempRoom: 5,   qt: 225 },
  { tempRoom: 10,  qt: 200 },
];

export function getPeopleHeatRefrig(tempRoom: number): number {
  const data = PEOPLE_HEAT_REFRIG;
  if (tempRoom <= data[0].tempRoom) return data[0].qt;
  if (tempRoom >= data[data.length - 1].tempRoom) return data[data.length - 1].qt;
  for (let i = 0; i < data.length - 1; i++) {
    if (tempRoom >= data[i].tempRoom && tempRoom <= data[i + 1].tempRoom) {
      const t = (tempRoom - data[i].tempRoom) / (data[i + 1].tempRoom - data[i].tempRoom);
      return data[i].qt + t * (data[i + 1].qt - data[i].qt);
    }
  }
  return 250;
}


// ═══════════════════════════════════════════════════════════════════
// جدول 2-19: الحرارة النوعية لمواد التغليف (kJ/kg·K)
// المصدر: ورقة الجداول، صفوف 339-345
// ═══════════════════════════════════════════════════════════════════
export interface PackagingMaterial {
  id: string;
  nameAr: string;
  cp: number;
}

export const PACKAGING_MATERIALS: PackagingMaterial[] = [
  { id: "fiber",     nameAr: "الألياف",   cp: 1.4 },
  { id: "wood",      nameAr: "الخشب",     cp: 2.3 },
  { id: "steel",     nameAr: "الفولاذ",   cp: 0.5 },
  { id: "plastic",   nameAr: "البلاستيك", cp: 1.6 },
  { id: "aluminum",  nameAr: "الألمنيوم", cp: 0.85 },
];


// ═══════════════════════════════════════════════════════════════════
// جدول 2-22: معامل الاستخدام في الطريقة المختصرة
// المصدر: ورقة الجداول، صفوف 373-399
// بُعد الغرفة: حجم m³، شاقة-تخزين، متوسطة-خدمة
// ═══════════════════════════════════════════════════════════════════
export interface UsageFactor {
  roomVolume: number;
  longTermHeavy: number;
  longTermMedium: number;
}

export const USAGE_FACTORS: UsageFactor[] = [
  { roomVolume: 0.6,   longTermHeavy: 3.97, longTermMedium: 3.63 },
  { roomVolume: 0.85,  longTermHeavy: 3.57, longTermMedium: 2.56 },
  { roomVolume: 1.5,   longTermHeavy: 2.76, longTermMedium: 1.77 },
  { roomVolume: 2.0,   longTermHeavy: 2.24, longTermMedium: 1.44 },
  { roomVolume: 3.0,   longTermHeavy: 1.96, longTermMedium: 1.25 },
  { roomVolume: 6.0,   longTermHeavy: 1.72, longTermMedium: 1.07 },
  { roomVolume: 8.5,   longTermHeavy: 1.61, longTermMedium: 1.01 },
  { roomVolume: 11.0,  longTermHeavy: 1.52, longTermMedium: 0.96 },
  { roomVolume: 14.0,  longTermHeavy: 1.45, longTermMedium: 0.94 },
  { roomVolume: 17.0,  longTermHeavy: 1.44, longTermMedium: 0.91 },
  { roomVolume: 23.0,  longTermHeavy: 1.37, longTermMedium: 0.86 },
  { roomVolume: 28.0,  longTermHeavy: 1.30, longTermMedium: 0.85 },
  { roomVolume: 34.0,  longTermHeavy: 1.23, longTermMedium: 0.77 },
  { roomVolume: 43.0,  longTermHeavy: 1.16, longTermMedium: 0.71 },
  { roomVolume: 57.0,  longTermHeavy: 0.60, longTermMedium: 0.65 },
  { roomVolume: 85.0,  longTermHeavy: 0.45, longTermMedium: 0.58 },
  { roomVolume: 140.0, longTermHeavy: 0.31, longTermMedium: 0    },
  { roomVolume: 200.0, longTermHeavy: 0.24, longTermMedium: 0    },
  { roomVolume: 280.0, longTermHeavy: 0.19, longTermMedium: 0    },
  { roomVolume: 560.0, longTermHeavy: 0.16, longTermMedium: 0    },
  { roomVolume: 1400,  longTermHeavy: 0.14, longTermMedium: 0    },
  { roomVolume: 2100,  longTermHeavy: 0.14, longTermMedium: 0    },
  { roomVolume: 2800,  longTermHeavy: 0.13, longTermMedium: 0    },
];
