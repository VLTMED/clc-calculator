export interface WallLayer {
  materialId: string;
  thickness: number;
  k: number;
}

export interface CalculationInputs {
  // Dimensions
  length: number;
  width: number;
  height: number;
  tempIn: number;
  tempOut: number;
  groundTemp: number;
  location: string;
  isGroundFloor: number;
  considerRoofFloor: number;
  considerWalls: number;
  considerSolar: number;

  // Roof layers
  roofLayers: WallLayer[];
  roofHi: number;
  roofHo: number;

  // Floor layers
  floorLayers: WallLayer[];
  floorHi: number;
  floorHo: number;

  // Wall layers
  wallLayers: WallLayer[];
  wallHi: number;
  wallHo: number;

  // Directional settings
  northEnabled: number;
  southEnabled: number;
  eastEnabled: number;
  westEnabled: number;
  northWallHo: number;
  southWallHo: number;
  eastWallHo: number;
  westWallHo: number;

  // Solar
  absorptance: number;
  radiation: number;

  // Glass
  glassEnabled: number;
  glassArea: number;
  glassU: number;
  glassDirection: string;
  glassSHGF: number;
  shadingCoefficient: number;
  useSCMethod: number;
  scValue: number;
  shgfValue: number;
  clfValue: number;

  // Internal loads
  lightsCount: number;
  lightsWatt: number;
  lightsHours: number;
  peopleCount: number;
  peopleQt: number;
  peopleHours: number;
  equipmentEnabled: number;
  equipmentHeatRate: number;
  equipmentCount: number;
  equipmentHours: number;

  // Product
  productEnabled: number;
  productId: string;
  productMass: number;
  productEnterTemp: number;
  freezeTemp: number;
  storageTemp: number;
  coolTime: number;
  crf: number;
  cpAbove: number;
  cpBelow: number;
  latentHeat: number;
  respirationRate: number;

  // Packaging
  packagingEnabled: number;
  boxesCount: number;
  boxWeight: number;
  packagingCp: number;
  packagingSafetyHours: number;

  // Defrost
  defrostEnabled: number;
  heatersCount: number;
  heaterPower: number;
  heaterUsageFactor: number;

  // Usage method
  usageEnabled: number;
  usageFactor: number;

  // Air infiltration
  infiltrationEnabled: number;
  infiltrationRate: number;
  enthalpyDiff: number;

  // Ventilation
  ventilationEnabled: number;
  ventRatePerPerson: number;
  peopleCountVent: number;
  ventHi: number;
  ventHo: number;
  specificVolume: number;

  // Air change
  airChangeEnabled: number;
  airChangesPer24h: number;
  airChangeVolume: number;
  airChangeHi: number;
  airChangeHo: number;
  airChangeSpecificVolume: number;

  // System
  safetyFactor: number;
  operationHours: number;
}
