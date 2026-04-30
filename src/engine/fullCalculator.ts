// ==========================================
// المحرك الشامل لجميع الحسابات
// يربط كل المدخلات بالمعادلات
// ==========================================

import type { CalculationInputs } from "@/types/inputs";
import type { DetailedResults } from "./calculator";
import {
  calculateUValue,
  calculateTransmission,
  calculateSolarEffect,
  calculateLightingLoad,
  calculatePeopleLoad,
  calculateEquipmentLoad,
  calculateProductAboveFreezing,
  calculateProductBelowFreezing,
  calculateLatentHeatLoad,
  calculateRespirationLoad,
  calculatePackagingLoad,
  calculateDefrostLoad,
  calculateUsageLoad,
  calculateInfiltrationLoad,
  calculateVentilationLoad,
  calculateAirChangeLoad,
  calculateSystemCapacity,
} from "./calculator";

export const runAllCalculations = (
  inputs: CalculationInputs
): DetailedResults => {
  const {
    length,
    width,
    height,
    tempIn,
    tempOut,
    groundTemp,
    considerRoofFloor,
    considerWalls,
    considerSolar,
    roofLayers,
    roofHi,
    roofHo,
    floorLayers,
    floorHi,
    floorHo,
    wallLayers,
    wallHi,
    wallHo,
    northEnabled,
    southEnabled,
    eastEnabled,
    westEnabled,
    northWallHo,
    southWallHo,
    eastWallHo,
    westWallHo,
    absorptance,
    radiation,
    glassEnabled,
    glassArea,
    glassU,
    glassSHGF,
    shadingCoefficient,
    useSCMethod,
    scValue,
    shgfValue,
    clfValue,
    lightsCount,
    lightsWatt,
    lightsHours,
    peopleCount,
    peopleQt,
    peopleHours,
    equipmentEnabled,
    equipmentHeatRate,
    equipmentCount,
    equipmentHours,
    productEnabled,
    productMass,
    productEnterTemp,
    freezeTemp,
    storageTemp,
    coolTime,
    crf,
    cpAbove,
    cpBelow,
    latentHeat,
    respirationRate,
    packagingEnabled,
    boxesCount,
    boxWeight,
    packagingCp,
    packagingSafetyHours,
    defrostEnabled,
    heatersCount,
    heaterPower,
    heaterUsageFactor,
    usageEnabled,
    usageFactor,
    infiltrationEnabled,
    infiltrationRate,
    enthalpyDiff,
    ventilationEnabled,
    ventRatePerPerson,
    peopleCountVent,
    ventHi,
    ventHo,
    specificVolume,
    airChangeEnabled,
    airChangesPer24h,
    airChangeVolume,
    airChangeHi,
    airChangeHo,
    airChangeSpecificVolume,
    safetyFactor,
    operationHours,
  } = inputs;

  // Common calculations
  const cltd = tempOut - tempIn;
  const cltdFloor = groundTemp - tempIn;
  const areaRoof = length * width;
  const areaFloor = length * width;
  const areaNorth = northEnabled ? length * height : 0;
  const areaSouth = southEnabled ? length * height : 0;
  const areaEast = eastEnabled ? width * height : 0;
  const areaWest = westEnabled ? width * height : 0;

  // 1. Calculate U-Values
  const roofU = calculateUValue(roofLayers, roofHi, roofHo);
  const floorU = calculateUValue(floorLayers, floorHi, floorHo);
  const wallU = calculateUValue(wallLayers, wallHi, wallHo);

  // 2. Transmission Loads
  const roofLoad =
    considerRoofFloor * calculateTransmission(roofU.uValue, areaRoof, cltd);
  const floorLoad =
    considerRoofFloor *
    calculateTransmission(floorU.uValue, areaFloor, cltdFloor);

  const northWallLoad =
    considerWalls *
    northEnabled *
    calculateTransmission(wallU.uValue, areaNorth, cltd);
  const southWallLoad =
    considerWalls *
    southEnabled *
    calculateTransmission(wallU.uValue, areaSouth, cltd);
  const eastWallLoad =
    considerWalls *
    eastEnabled *
    calculateTransmission(wallU.uValue, areaEast, cltd);
  const westWallLoad =
    considerWalls *
    westEnabled *
    calculateTransmission(wallU.uValue, areaWest, cltd);

  const totalTransmission =
    roofLoad +
    floorLoad +
    northWallLoad +
    southWallLoad +
    eastWallLoad +
    westWallLoad;

  // 3. Solar Radiation Loads
  const solarRoof =
    considerSolar *
    considerRoofFloor *
    calculateSolarEffect(roofU.uValue, areaRoof, absorptance, radiation, roofHo);
  const solarNorth =
    considerSolar *
    northEnabled *
    calculateSolarEffect(wallU.uValue, areaNorth, absorptance, 71, northWallHo);
  const solarSouth =
    considerSolar *
    southEnabled *
    calculateSolarEffect(wallU.uValue, areaSouth, absorptance, 117, southWallHo);
  const solarEast =
    considerSolar *
    eastEnabled *
    calculateSolarEffect(wallU.uValue, areaEast, absorptance, 462, eastWallHo);
  const solarWest =
    considerSolar *
    westEnabled *
    calculateSolarEffect(wallU.uValue, areaWest, absorptance, 462, westWallHo);

  const totalSolar =
    solarRoof + solarNorth + solarSouth + solarEast + solarWest;

  // 4. Glass Loads
  let glassTransmission = 0;
  let glassSolar = 0;
  if (glassEnabled) {
    glassTransmission =
      glassEnabled * glassArea * glassU * cltd; // U * A * CLTD
    if (useSCMethod && scValue > 0 && shgfValue > 0 && clfValue > 0) {
      glassSolar = glassArea * scValue * shgfValue * clfValue;
    } else {
      glassSolar =
        glassEnabled * glassArea * glassSHGF * shadingCoefficient; // A * Qsun * SC
    }
  }
  const totalGlass = glassTransmission + glassSolar;

  // 5. Internal Loads
  const lightingLoad = calculateLightingLoad(lightsCount, lightsWatt, lightsHours);
  const peopleLoad = calculatePeopleLoad(peopleCount, peopleQt, peopleHours);
  const equipmentLoad = equipmentEnabled
    ? calculateEquipmentLoad(
        equipmentHeatRate * equipmentCount,
        1,
        equipmentHours
      )
    : 0;
  const totalInternal = lightingLoad + peopleLoad + equipmentLoad;

  // 6. Product Loads
  let productAboveFreezing = 0;
  let productBelowFreezing = 0;
  let latentHeatLoad = 0;
  let respirationLoad = 0;
  let packagingLoad = 0;

  if (productEnabled) {
    const deltaTAbove = productEnterTemp - Math.max(freezeTemp, storageTemp);
    const deltaTBelow =
      storageTemp < freezeTemp ? freezeTemp - storageTemp : 0;

    productAboveFreezing = calculateProductAboveFreezing(
      productMass,
      cpAbove,
      deltaTAbove,
      coolTime,
      crf
    );

    productBelowFreezing = calculateProductBelowFreezing(
      productMass,
      cpBelow,
      deltaTBelow,
      coolTime
    );

    if (storageTemp < freezeTemp && productEnterTemp >= freezeTemp) {
      latentHeatLoad = calculateLatentHeatLoad(productMass, latentHeat, coolTime);
    }

    if (respirationRate > 0) {
      respirationLoad = calculateRespirationLoad(
        productMass,
        respirationRate,
        coolTime,
        crf
      );
    }

    if (packagingEnabled) {
      const deltaTPack = productEnterTemp - storageTemp;
      packagingLoad = calculatePackagingLoad(
        boxesCount,
        boxWeight,
        packagingCp,
        deltaTPack,
        coolTime,
        crf,
        packagingSafetyHours
      );
    }
  }

  const totalProduct =
    productAboveFreezing +
    productBelowFreezing +
    latentHeatLoad +
    respirationLoad +
    packagingLoad;

  // 7. Defrost Load
  const defrostLoad = defrostEnabled
    ? calculateDefrostLoad(heatersCount, heaterPower, heaterUsageFactor)
    : 0;

  // 8. Usage Load (short method)
  const usageLoad = usageEnabled
    ? calculateUsageLoad(
        length * width * height,
        cltd,
        usageFactor
      )
    : 0;

  // 9. Air Loads
  const infiltrationLoad = infiltrationEnabled
    ? calculateInfiltrationLoad(infiltrationRate, enthalpyDiff)
    : 0;

  const ventilationLoad = ventilationEnabled
    ? calculateVentilationLoad(
        ventRatePerPerson,
        peopleCountVent,
        ventHi,
        ventHo,
        specificVolume
      )
    : 0;

  const airChangeLoad = airChangeEnabled
    ? calculateAirChangeLoad(
        airChangeVolume || length * width * height,
        airChangesPer24h,
        airChangeHi,
        airChangeHo,
        airChangeSpecificVolume
      )
    : 0;

  const totalAir = infiltrationLoad + ventilationLoad + airChangeLoad;

  // 10. Grand Total & System Capacity
  const grandTotal =
    totalTransmission +
    totalSolar +
    totalGlass +
    totalInternal +
    totalProduct +
    totalAir +
    defrostLoad +
    usageLoad;

  const capacity = calculateSystemCapacity(grandTotal, safetyFactor, operationHours);

  return {
    roofLoad,
    floorLoad,
    northWallLoad,
    southWallLoad,
    eastWallLoad,
    westWallLoad,
    totalTransmission,

    solarRoof,
    solarNorth,
    solarSouth,
    solarEast,
    solarWest,
    totalSolar,

    glassTransmission,
    glassSolar,
    totalGlass,

    lightingLoad,
    peopleLoad,
    equipmentLoad,
    totalInternal,

    productAboveFreezing,
    productBelowFreezing,
    latentHeatLoad,
    respirationLoad,
    packagingLoad,
    totalProduct,

    infiltrationLoad,
    ventilationLoad,
    airChangeLoad,
    totalAir,

    defrostLoad,
    usageLoad,

    grandTotal,
    totalWithSafety: capacity.totalWithSafety,
    requiredCapacity: capacity.requiredCapacity,
    kw: capacity.kw,
    tons: capacity.tons,
  };
};
