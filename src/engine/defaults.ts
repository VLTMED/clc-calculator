// ═══════════════════════════════════════════════════════════════════
// القيم الافتراضية للمشروع — مطابقة لملف Excel
// ═══════════════════════════════════════════════════════════════════
import type { CLCInputs, WallConfig, SurfaceConfig } from "../types/inputs";

const defaultLayer = (matId: string, t: number) => ({ materialId: matId, thickness: t });

const defaultSurface = (): SurfaceConfig => ({
  enabled: true,
  hi: 9.37,
  ho: 22.7,
  layers: [
    defaultLayer("concrete", 0.20),
    defaultLayer("poly_smooth", 0.10),
  ],
  solarEnabled: false,
  absorptanceMaterialId: "concrete",
});

const defaultWall = (): WallConfig => ({
  enabled: true,
  hi: 8.0,
  ho: 22.7,
  layers: [
    defaultLayer("cement_brick", 0.20),
    defaultLayer("poly_smooth", 0.10),
  ],
  solarEnabled: false,
  absorptanceMaterialId: "concrete",
});

export function getDefaultInputs(mode: "refrigeration" | "ac" = "refrigeration"): CLCInputs {
  return {
    mode,
    tempIn: mode === "refrigeration" ? 0 : 23,
    tempOut: 41,
    groundTemp: 25,
    roomLocation: "ground",
    length: 5,
    width: 4,
    height: 3,
    roof: { ...defaultSurface(), solarEnabled: false },
    floor: { ...defaultSurface(), hi: 6.0, solarEnabled: false },
    walls: {
      north: defaultWall(),
      south: defaultWall(),
      east:  defaultWall(),
      west:  defaultWall(),
    },
    glasses: [],
    lighting: {
      enabled: false,
      count: 4,
      wattEach: 60,
      hoursPerDay: 8,
      clf: 1.0,
    },
    people: {
      enabled: false,
      count: 2,
      hoursPerDay: 8,
      clf: 1.0,
      activityId: "seated_light",
    },
    equipment: {
      enabled: false,
      count: 1,
      heatRate: 500,
      hoursPerDay: 8,
      clf: 1.0,
    },
    products: [
      {
        enabled: false,
        productId: "تفاح",
        massKg: 1000,
        enterTemp: 25,
        storageTemp: 0,
        aboveFreezeEnabled: true,
        latentEnabled: false,
        belowFreezeEnabled: false,
        pulldownHours: 12,
        crf: 0.67,
      },
    ],
    packaging: {
      enabled: false,
      packagingMaterialId: "wood",
      boxCount: 100,
      massPerBoxKg: 0.5,
      enterTemp: 25,
      storageTemp: 0,
      pulldownHours: 12,
    },
    defrost: {
      enabled: false,
      heaterCount: 2,
      powerEachW: 500,
      usageFactor: 0.25,
    },
    infiltration: {
      enabled: true,
      method: "table11",
      tempOut: 41,
      rhOut: 50,
      severeConditions: false,
    },
    airChanges: {
      enabled: false,
      method: "table13",
      vo: 0.84,
      hi: 50,
      ho: 90,
    },
    ventilation: {
      enabled: false,
      personCount: 10,
      ventilationRateId: "office_priv",
      usePreferred: true,
      vo: 0.84,
      hi: 50,
      ho: 90,
    },
    safetyFactor: 10,
    operatingHours: 18,
    shortMethodEnabled: false,
    shortMethodType: "heavy",
    studentInfo: {
      studentName: "",
      studentId: "",
      university: "",
      professorName: "",
      projectName: "",
      date: new Date().toLocaleDateString("ar-SA"),
    },
  };
}
