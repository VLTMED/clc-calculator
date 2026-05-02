// ═══════════════════════════════════════════════════════════════════
// نوع البيانات الشاملة — CLC v4A (إعادة بناء كاملة)
// مطابق 100% لهيكل ملف Excel الأصلي
// ═══════════════════════════════════════════════════════════════════

export interface BuildingLayer {
  materialId: string;
  thickness: number; // m
}

export interface SurfaceConfig {
  enabled: boolean;
  hi: number;
  ho: number;
  layers: BuildingLayer[];
  solarEnabled: boolean;
  absorptanceMaterialId: string;
}

export type WallDirection = "north" | "south" | "east" | "west";

export interface WallConfig {
  enabled: boolean;
  hi: number;
  ho: number;
  layers: BuildingLayer[];
  solarEnabled: boolean;
  absorptanceMaterialId: string;
}

export interface GlassConfig {
  enabled: boolean;
  direction: WallDirection;
  area: number;
  glassTypeId: string;
  solarMethod: "table16A" | "table16B" | "none";
  month?: string;
  shadingCoefficient: number;
}

export interface LightingLoad {
  enabled: boolean;
  count: number;
  wattEach: number;
  hoursPerDay: number;
  clf: number;
}

export interface PeopleLoad {
  enabled: boolean;
  count: number;
  hoursPerDay: number;
  clf: number;
  activityId: string;
}

export interface EquipmentLoad {
  enabled: boolean;
  count: number;
  heatRate: number;
  hoursPerDay: number;
  clf: number;
}

export interface ProductLoad {
  enabled: boolean;
  productId: string;
  massKg: number;
  enterTemp: number;
  storageTemp: number;
  aboveFreezeEnabled: boolean;
  latentEnabled: boolean;
  belowFreezeEnabled: boolean;
  pulldownHours: number;
  crf: number;
}

export interface PackagingLoad {
  enabled: boolean;
  packagingMaterialId: string;
  boxCount: number;
  massPerBoxKg: number;
  enterTemp: number;
  storageTemp: number;
  pulldownHours: number;
}

export interface DefrostLoad {
  enabled: boolean;
  heaterCount: number;
  powerEachW: number;
  usageFactor: number;
}

export interface InfiltrationLoad {
  enabled: boolean;
  method: "table11" | "manual";
  manualRate?: number;
  tempOut: number;
  rhOut: number;
  severeConditions: boolean;
}

export interface AirChangesLoad {
  enabled: boolean;
  method: "table13" | "manual";
  manualChanges?: number;
  vo: number;
  hi: number;
  ho: number;
}

export interface VentilationLoad {
  enabled: boolean;
  personCount: number;
  ventilationRateId: string;
  usePreferred: boolean;
  vo: number;
  hi: number;
  ho: number;
}

export interface StudentInfo {
  studentName: string;
  studentId: string;
  university: string;
  professorName: string;
  projectName: string;
  date: string;
}

export type AppMode = "refrigeration" | "ac";
export type RoomLocation = "ground" | "elevated";

export interface CLCInputs {
  mode: AppMode;
  tempIn: number;
  tempOut: number;
  groundTemp: number;
  roomLocation: RoomLocation;
  length: number;
  width: number;
  height: number;
  roof: SurfaceConfig;
  floor: SurfaceConfig;
  walls: Record<WallDirection, WallConfig>;
  glasses: GlassConfig[];
  lighting: LightingLoad;
  people: PeopleLoad;
  equipment: EquipmentLoad;
  products: ProductLoad[];
  packaging: PackagingLoad;
  defrost: DefrostLoad;
  infiltration: InfiltrationLoad;
  airChanges: AirChangesLoad;
  ventilation: VentilationLoad;
  safetyFactor: number;
  operatingHours: number;
  shortMethodEnabled: boolean;
  shortMethodType: "heavy" | "medium";
  studentInfo: StudentInfo;
}
