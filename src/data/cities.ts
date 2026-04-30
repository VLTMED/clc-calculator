// ==========================================
// جدول (2-4) شروط التصميم للهواء الخارجي
// لبعض مدن المملكة العربية السعودية
// Table 2-4: Design Conditions for Saudi Cities
// ==========================================

export interface CityDesignCondition {
  id: string;
  name: string;
  dryTemp: number; // درجة الحرارة الجافة °C
  wetTemp: number; // درجة الحرارة الرطبة °C
}

export const SAUDI_CITIES: CityDesignCondition[] = [
  { id: "jeddah", name: "جـــــدة", dryTemp: 41, wetTemp: 29.5 },
  { id: "riyadh", name: "الرياض", dryTemp: 43.5, wetTemp: 25.5 },
  { id: "dhahran", name: "الظهران", dryTemp: 44, wetTemp: 29.5 },
];

export const getCityById = (id: string): CityDesignCondition | undefined =>
  SAUDI_CITIES.find((c) => c.id === id);
