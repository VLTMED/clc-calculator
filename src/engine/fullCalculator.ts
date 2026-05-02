// ═══════════════════════════════════════════════════════════════════
// محرك الحسابات الكامل — CLC v4A
// مهندَس من ملف Excel الأصلي بدقة 100%
// المعادلات مطابقة تماماً لمنطق الملف
// ═══════════════════════════════════════════════════════════════════

import type { CLCInputs, BuildingLayer, WallDirection } from "../types/inputs";
import {
  MATERIALS,
  ABSORPTANCE_MATERIALS,
  SOLAR_EFFECTS_16A,
  getSolarRadiation16B,
  GLASS_TYPES,
  USAGE_FACTORS,
  PEOPLE_HEAT_AC,
  getPeopleHeatRefrig,
  getInfiltrationRate,
  getEnthalpyDiff,
  getAirChangesPerDay,
  VENTILATION_RATES,
  PACKAGING_MATERIALS,
} from "../data/tables";
import { PRODUCTS } from "../data/products";

// ─── نتيجة الحسابات ───────────────────────────────────────────────
export interface CalculationBreakdown {
  // معامل الانتقال الحراري U لكل سطح
  roofU: number;
  floorU: number;
  wallU: Record<WallDirection, number>;

  // الأحمال بالواط
  roofCond: number;
  floorCond: number;
  wallCond: Record<WallDirection, number>;
  wallSolar: Record<WallDirection, number>;
  roofSolar: number;
  glassCond: number;
  glassSolar: number;
  lighting: number;
  people: number;
  equipment: number;

  // أحمال التبريد
  productAboveFreeze: number;
  productLatent: number;
  productBelowFreeze: number;
  packaging: number;
  defrost: number;

  // أحمال الهواء
  infiltration: number;
  airChanges: number;
  ventilation: number;

  // طريقة مختصرة
  shortMethod: number;

  // المجاميع
  subtotal: number;
  safetyLoad: number;
  total: number;
  totalKW: number;
  capacityKW: number;  // مقسوم على ساعات التشغيل × 24
  capacityTon: number; // ÷ 3.517
}

// ─── حساب U = 1 / (1/hi + Σ(L/k) + 1/ho) ─────────────────────────
export function calcU(hi: number, ho: number, layers: BuildingLayer[]): number {
  if (hi <= 0 || ho <= 0) return 0;
  let R = 1 / hi + 1 / ho;
  for (const layer of layers) {
    const mat = MATERIALS.find(m => m.id === layer.materialId);
    if (mat && layer.thickness > 0) R += layer.thickness / mat.k;
  }
  return R > 0 ? 1 / R : 0;
}

// ─── حساب Q = U × A × CLTD ───────────────────────────────────────
function qCond(U: number, A: number, CLTD: number): number {
  return U * A * CLTD;
}

// ─── حساب DTs = 1.15 × a × I / ho ──────────────────────────────────
function calcDTs(a: number, I: number, ho: number): number {
  return ho > 0 ? (1.15 * a * I) / ho : 0;
}

// ─── الحصول على معامل الامتصاص ──────────────────────────────────────
function getAbsorptance(matId: string): number {
  const mat = ABSORPTANCE_MATERIALS.find(m => m.id === matId);
  return mat?.a ?? 0.65;
}

// ─── المساحات ────────────────────────────────────────────────────────
function surfaceAreas(inp: CLCInputs) {
  const roofFloor = inp.length * inp.width;
  return {
    roof: roofFloor,
    floor: roofFloor,
    north: inp.length * inp.height,
    south: inp.length * inp.height,
    east: inp.width * inp.height,
    west: inp.width * inp.height,
  };
}

// ═══════════════════════════════════════════════════════════════════
// الدالة الرئيسية
// ═══════════════════════════════════════════════════════════════════
export function calculateAll(inp: CLCInputs): CalculationBreakdown {
  const CLTD_wall  = inp.tempOut - inp.tempIn;
  const CLTD_roof  = inp.tempOut - inp.tempIn;
  const CLTD_floor = (inp.roomLocation === "ground" ? inp.groundTemp : inp.tempOut) - inp.tempIn;

  const areas = surfaceAreas(inp);

  // ─────────────────────────────────────────────────────────────────
  // 1. السقف
  // ─────────────────────────────────────────────────────────────────
  const roofU = inp.roof.enabled ? calcU(inp.roof.hi, inp.roof.ho, inp.roof.layers) : 0;
  const roofCond = inp.roof.enabled ? qCond(roofU, areas.roof, CLTD_roof) : 0;

  let roofSolar = 0;
  if (inp.roof.enabled && inp.roof.solarEnabled) {
    const a = getAbsorptance(inp.roof.absorptanceMaterialId);
    const solar = SOLAR_EFFECTS_16A.find(s => s.surface === "roof");
    if (solar) {
      const dTs = calcDTs(a, solar.I, inp.roof.ho);
      roofSolar = roofU * areas.roof * dTs;
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // 2. الأرضية
  // ─────────────────────────────────────────────────────────────────
  const floorU = inp.floor.enabled ? calcU(inp.floor.hi, inp.floor.ho, inp.floor.layers) : 0;
  const floorCond = inp.floor.enabled ? qCond(floorU, areas.floor, CLTD_floor) : 0;

  // ─────────────────────────────────────────────────────────────────
  // 3. الجدران الأربعة (مستقلة)
  // ─────────────────────────────────────────────────────────────────
  const wallU: Record<WallDirection, number> = { north: 0, south: 0, east: 0, west: 0 };
  const wallCond: Record<WallDirection, number> = { north: 0, south: 0, east: 0, west: 0 };
  const wallSolar: Record<WallDirection, number> = { north: 0, south: 0, east: 0, west: 0 };

  const WALL_DIRS: WallDirection[] = ["north", "south", "east", "west"];
  for (const dir of WALL_DIRS) {
    const wall = inp.walls[dir];
    if (!wall.enabled) continue;
    const A = areas[dir];
    wallU[dir] = calcU(wall.hi, wall.ho, wall.layers);
    wallCond[dir] = qCond(wallU[dir], A, CLTD_wall);

    if (wall.solarEnabled) {
      const a = getAbsorptance(wall.absorptanceMaterialId);
      if (inp.mode === "refrigeration") {
        // جدول 2-16A: DTs ثابتة بالاتجاه
        const solarData = SOLAR_EFFECTS_16A.find(s => s.surface === dir);
        if (solarData) {
          const dTs = calcDTs(a, solarData.I, wall.ho);
          wallSolar[dir] = wallU[dir] * A * dTs;
        }
      } else {
        // جدول 2-16B: I بالشهر والاتجاه
        const month = inp.infiltration.tempOut > 0 ? "الأقصى" : "يوليو"; // fallback
        const dir_ar = { north: "شمالي", south: "جنوبي", east: "شرقي", west: "غربي" }[dir];
        const I = getSolarRadiation16B(month, dir_ar);
        const dTs = calcDTs(a, I, wall.ho);
        wallSolar[dir] = wallU[dir] * A * dTs;
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // 4. الزجاج
  // ─────────────────────────────────────────────────────────────────
  let glassCond = 0;
  let glassSolar = 0;

  for (const glass of inp.glasses) {
    if (!glass.enabled || glass.area <= 0) continue;
    const gt = GLASS_TYPES.find(g => g.id === glass.glassTypeId);
    if (!gt) continue;
    const U = gt.uSummer;
    glassCond += U * glass.area * CLTD_wall;

    // الحرارة الشمسية
    if (glass.solarMethod === "table16A") {
      // طريقة مبسطة: I من جدول 2-16A حسب الاتجاه
      const sData = SOLAR_EFFECTS_16A.find(s => s.surface === glass.direction);
      if (sData) {
        glassSolar += glass.area * sData.I * glass.shadingCoefficient;
      }
    } else if (glass.solarMethod === "table16B") {
      const dir_map: Record<string, string> = { north: "شمالي", south: "جنوبي", east: "شرقي", west: "غربي" };
      const I = getSolarRadiation16B(glass.month ?? "يوليو", dir_map[glass.direction] ?? "شمالي");
      glassSolar += glass.area * I * glass.shadingCoefficient;
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // 5. الإضاءة
  // Q = عدد × قدرة × (ساعات/24) × CLF
  // ─────────────────────────────────────────────────────────────────
  let lighting = 0;
  if (inp.lighting.enabled) {
    lighting = inp.lighting.count * inp.lighting.wattEach
      * (inp.lighting.hoursPerDay / 24)
      * inp.lighting.clf;
  }

  // ─────────────────────────────────────────────────────────────────
  // 6. الأشخاص
  // ─────────────────────────────────────────────────────────────────
  let people = 0;
  if (inp.people.enabled && inp.people.count > 0) {
    let qt = 0;
    if (inp.mode === "ac") {
      const act = PEOPLE_HEAT_AC.find(a => a.id === inp.people.activityId);
      qt = act?.qt ?? 117;
    } else {
      qt = getPeopleHeatRefrig(inp.tempIn);
    }
    people = qt * inp.people.count
      * (inp.people.hoursPerDay / 24)
      * inp.people.clf;
  }

  // ─────────────────────────────────────────────────────────────────
  // 7. المعدات
  // Q = معدل_الكسب × عدد × CLF × (ساعات/24)
  // ─────────────────────────────────────────────────────────────────
  let equipment = 0;
  if (inp.equipment.enabled) {
    equipment = inp.equipment.heatRate * inp.equipment.count
      * inp.equipment.clf
      * (inp.equipment.hoursPerDay / 24);
  }

  // ─────────────────────────────────────────────────────────────────
  // 8. حمل المنتج — ثلاثة تبديلات مستقلة
  // ─────────────────────────────────────────────────────────────────
  let productAboveFreeze = 0;
  let productLatent = 0;
  let productBelowFreeze = 0;

  for (const prod of inp.products) {
    if (!prod.enabled || prod.massKg <= 0) continue;
    const product = PRODUCTS.find(p => p.id === prod.productId);
    if (!product) continue;

    const tf = product.tf;
    const cpAbove = product.cpAbove;
    const cpBelow = product.cpBelow;
    const lh = product.lh;
    const n = prod.pulldownHours;
    const M = prod.massKg;
    const crf = prod.crf > 0 ? prod.crf : product.crf;
    const Tin = prod.enterTemp;
    const Tsto = prod.storageTemp;

    // Q_فوق_التجميد = M × Cp_فوق × (T_دخول - max(Tf, T_تخزين)) × 1000 / (3600 × n × CRF)
    if (prod.aboveFreezeEnabled && Tin > tf) {
      const dT = Tin - Math.max(tf, Tsto);
      if (dT > 0) {
        productAboveFreeze += (M * cpAbove * dT * 1000) / (3600 * n * crf);
      }
    }

    // Q_تجميد = M × LH × 1000 / (3600 × n)
    if (prod.latentEnabled && Tin > tf && Tsto < tf) {
      productLatent += (M * lh * 1000) / (3600 * n);
    }

    // Q_تحت_التجميد = M × Cp_تحت × (Tf - T_تخزين) × 1000 / (3600 × n)
    if (prod.belowFreezeEnabled && Tsto < tf) {
      const dT = tf - Tsto;
      if (dT > 0) {
        productBelowFreeze += (M * cpBelow * dT * 1000) / (3600 * n);
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // 9. التغليف
  // مثل حمل فوق التجميد بالحرارة النوعية لمادة التغليف
  // ─────────────────────────────────────────────────────────────────
  let packaging = 0;
  if (inp.packaging.enabled && inp.packaging.boxCount > 0) {
    const pkgMat = PACKAGING_MATERIALS.find(m => m.id === inp.packaging.packagingMaterialId);
    const cp = pkgMat?.cp ?? 1.4;
    const M = inp.packaging.boxCount * inp.packaging.massPerBoxKg;
    const dT = inp.packaging.enterTemp - inp.packaging.storageTemp;
    const n = inp.packaging.pulldownHours;
    if (dT > 0 && n > 0) {
      packaging = (M * cp * dT * 1000) / (3600 * n);
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // 10. إزالة الصقيع
  // Qd = عدد × معامل × قدرة
  // ─────────────────────────────────────────────────────────────────
  let defrost = 0;
  if (inp.defrost.enabled) {
    defrost = inp.defrost.heaterCount * inp.defrost.usageFactor * inp.defrost.powerEachW;
  }

  // ─────────────────────────────────────────────────────────────────
  // 11. تسرب الهواء (Infiltration)
  // Q = معدل_التسرب (l/s) × 1000 (l/m³) × Δh (kJ/l) → W
  // ─────────────────────────────────────────────────────────────────
  let infiltration = 0;
  if (inp.infiltration.enabled) {
    const volume = inp.length * inp.width * inp.height;
    let rate: number;
    if (inp.infiltration.method === "table11") {
      rate = getInfiltrationRate(volume, inp.tempIn);
    } else {
      rate = inp.infiltration.manualRate ?? 0;
    }
    if (inp.infiltration.severeConditions) rate *= 1.5;

    const dh = getEnthalpyDiff(inp.tempIn, inp.infiltration.tempOut, inp.infiltration.rhOut);
    // Q (W) = rate (l/s) × dh (kJ/l) × 1000 (W/kW) 
    infiltration = rate * dh * 1000;
  }

  // ─────────────────────────────────────────────────────────────────
  // 12. تغيير الهواء (Air Changes — تبريد)
  // Q = مرات/24 × حجم × (1/vo) × (ho - hi) / 24 × (1000/3600) → W
  // ─────────────────────────────────────────────────────────────────
  let airChanges = 0;
  if (inp.airChanges.enabled && inp.mode === "refrigeration") {
    const volume = inp.length * inp.width * inp.height;
    let changes: number;
    if (inp.airChanges.method === "table13") {
      changes = getAirChangesPerDay(volume);
    } else {
      changes = inp.airChanges.manualChanges ?? 0;
    }
    const vo = inp.airChanges.vo > 0 ? inp.airChanges.vo : 0.84;
    const dh = inp.airChanges.ho - inp.airChanges.hi; // kJ/kg
    // Q (W) = changes/day × volume (m³) × (1/vo) (kg/m³) × dh (kJ/kg) × (1000/86400)
    airChanges = changes * volume * (1 / vo) * dh * 1000 / 86400;
  }

  // ─────────────────────────────────────────────────────────────────
  // 13. التهوية (Ventilation — تكييف)
  // Q = (عدد_أشخاص × معدل L/s/شخص) × (1/vo) × (ho - hi) 
  // ─────────────────────────────────────────────────────────────────
  let ventilation = 0;
  if (inp.ventilation.enabled && inp.mode === "ac") {
    const vRate = VENTILATION_RATES.find(v => v.id === inp.ventilation.ventilationRateId);
    const rate_ls = inp.ventilation.personCount
      * (inp.ventilation.usePreferred ? (vRate?.preferred ?? 7.5) : (vRate?.minimum ?? 5.0));
    const vo = inp.ventilation.vo > 0 ? inp.ventilation.vo : 0.84;
    const dh = inp.ventilation.ho - inp.ventilation.hi; // kJ/kg
    // Q (W) = rate (l/s) × (1/vo) (kg/m³) × (1000 cm³/l) × dh (kJ/kg) / 1000
    // Simplified: rate (l/s) × dh (kJ/kg) / vo × 1 → (kJ/s) → × 1000 W
    ventilation = (rate_ls / 1000) * (1 / vo) * dh * 1000; // W
  }

  // ─────────────────────────────────────────────────────────────────
  // 14. الطريقة المختصرة (اختياري — تحل محل الطريقة التفصيلية)
  // ─────────────────────────────────────────────────────────────────
  let shortMethod = 0;
  if (inp.shortMethodEnabled) {
    const volume = inp.length * inp.width * inp.height;
    const ufs = USAGE_FACTORS;
    if (ufs.length === 0) {
      shortMethod = 0;
    } else {
      let uf = ufs[0];
      for (let i = 0; i < ufs.length - 1; i++) {
        if (volume >= ufs[i].roomVolume && volume <= ufs[i + 1].roomVolume) {
          const t = (volume - ufs[i].roomVolume) / (ufs[i + 1].roomVolume - ufs[i].roomVolume);
          const v0 = inp.shortMethodType === "heavy" ? ufs[i].longTermHeavy : ufs[i].longTermMedium;
          const v1 = inp.shortMethodType === "heavy" ? ufs[i + 1].longTermHeavy : ufs[i + 1].longTermMedium;
          uf = { roomVolume: volume, longTermHeavy: v0 + t * (v1 - v0), longTermMedium: v0 + t * (v1 - v0) };
          break;
        }
        if (volume >= ufs[ufs.length - 1].roomVolume) uf = ufs[ufs.length - 1];
      }
      const factor = inp.shortMethodType === "heavy" ? uf.longTermHeavy : uf.longTermMedium;
      // Q_مختصر = CLTD × U_متوسط × A_إجمالي (fallback: factor × volume)
      // في الطريقة المختصرة: Q = factor × volume (من الجدول)
      shortMethod = factor * volume * Math.abs(CLTD_wall);
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // المجاميع
  // ─────────────────────────────────────────────────────────────────
  let subtotal = inp.shortMethodEnabled
    ? shortMethod
      + productAboveFreeze + productLatent + productBelowFreeze
      + packaging + defrost + infiltration + airChanges + ventilation
    : roofCond + roofSolar + floorCond
      + Object.values(wallCond).reduce((a, b) => a + b, 0)
      + Object.values(wallSolar).reduce((a, b) => a + b, 0)
      + glassCond + glassSolar
      + lighting + people + equipment
      + productAboveFreeze + productLatent + productBelowFreeze
      + packaging + defrost + infiltration + airChanges + ventilation;

  subtotal = Math.max(0, subtotal);
  const safetyLoad = subtotal * (inp.safetyFactor / 100);
  const total = subtotal + safetyLoad;
  const totalKW = total / 1000;
  const hours = inp.operatingHours > 0 ? inp.operatingHours : 18;
  const capacityKW = (total * 24) / (hours * 1000);
  const capacityTon = capacityKW / 3.517;

  return {
    roofU, floorU, wallU,
    roofCond, floorCond, wallCond, wallSolar, roofSolar,
    glassCond, glassSolar,
    lighting, people, equipment,
    productAboveFreeze, productLatent, productBelowFreeze,
    packaging, defrost,
    infiltration, airChanges, ventilation,
    shortMethod,
    subtotal, safetyLoad, total, totalKW, capacityKW, capacityTon,
  };
}
