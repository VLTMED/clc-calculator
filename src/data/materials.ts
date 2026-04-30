// ==========================================
// جدول (2-1) معاملات التوصيل الحراري (k) [W/m.K]
// Table 2-1: Thermal Conductivity of Materials
// ==========================================

export interface Material {
  id: string;
  name: string;
  nameEn: string;
  k: number; // Thermal conductivity W/m.K
}

export const MATERIALS: Material[] = [
  { id: "poly_smooth", name: "بوليستيرين (ناعم)", nameEn: "Expanded Polystyrene (Smooth)", k: 0.029 },
  { id: "poly_cut", name: "بوليستيرين (قطع)", nameEn: "Expanded Polystyrene (Cut cell)", k: 0.036 },
  { id: "polyurethane", name: "بوليريثان", nameEn: "Expanded Polyurethane", k: 0.025 },
  { id: "cork", name: "الفلين", nameEn: "Corkboard", k: 0.043 },
  { id: "mosaic", name: "موزاييك / قرميد طيني", nameEn: "Clay Tile / Mosaic", k: 0.5 },
  { id: "mineral_wool", name: "صوف معدني", nameEn: "Mineral Wool", k: 0.039 },
  { id: "wood", name: "خشب", nameEn: "Wood fiber", k: 0.043 },
  { id: "glass_wool", name: "صوف زجاجي", nameEn: "Glass fiber", k: 0.036 },
  { id: "concrete", name: "الخرسانة", nameEn: "Concrete", k: 1.23 },
  { id: "cement_brick", name: "المونة الأسمنتية / طوب عادي", nameEn: "Cinder Block, Brick Common, Plaster", k: 0.72 },
  { id: "gypsum", name: "الجبس", nameEn: "Gypsum", k: 0.46 },
];

export const getMaterialById = (id: string): Material | undefined =>
  MATERIALS.find((m) => m.id === id);

export const getMaterialK = (id: string): number => {
  const mat = getMaterialById(id);
  return mat ? mat.k : 0;
};
