import { useState, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  ThermometerSun,
  Sun,
  Wind,
  Package,
  Users,
  Settings,
  ClipboardList,
  Printer,
  RotateCcw,
  CheckCircle2,
  Snowflake,
  Flame,
  BookOpen,
  Save,
} from "lucide-react";
import { DimensionsSection }    from "@/sections/DimensionsSection";
import { ConstructionSection }  from "@/sections/ConstructionSection";
import { GlassSection }         from "@/sections/GlassSection";
import { InternalLoadsSection } from "@/sections/InternalLoadsSection";
import { ProductSection }       from "@/sections/ProductSection";
import { AirLoadsSection }      from "@/sections/AirLoadsSection";
import { ResultsPanel }         from "@/sections/ResultsPanel";
import { StudentInfo }          from "@/sections/StudentInfo";
import type { DetailedResults } from "@/engine/calculator";
import type { CalculationInputs } from "@/types/inputs";
import { runAllCalculations }   from "@/engine/fullCalculator";
import { Toaster }              from "@/components/ui/sonner";
import { toast }                from "sonner";
import "./App.css";

// ─── Neutral (blank) defaults ───────────────────────────────────────────────
const NEUTRAL_DEFAULTS: CalculationInputs = {
  appMode: "refrig",
  length: 0, width: 0, height: 0,
  tempIn: 4, tempOut: 35, groundTemp: 25,
  location: "jeddah", isGroundFloor: 1,
  considerRoofFloor: 1, considerWalls: 1, considerSolar: 0,
  roofLayers: [
    { materialId: "concrete",    thickness: 0.2,  k: 1.23  },
    { materialId: "poly_smooth", thickness: 0.05, k: 0.029 },
  ],
  roofHi: 9.37, roofHo: 22.7,
  floorLayers: [
    { materialId: "concrete",    thickness: 0.2,  k: 1.23  },
    { materialId: "poly_smooth", thickness: 0.05, k: 0.029 },
  ],
  floorHi: 9.37, floorHo: 9.37,
  wallLayers: [
    { materialId: "cement_brick", thickness: 0.22, k: 0.72 },
    { materialId: "poly_smooth",  thickness: 0.05, k: 0.029 },
  ],
  wallHi: 8, wallHo: 22.7,
  northEnabled: 1, southEnabled: 1, eastEnabled: 1, westEnabled: 1,
  northWallHo: 22.7, southWallHo: 8, eastWallHo: 8, westWallHo: 22.7,
  absorptance: 0.57, radiation: 230,
  glassEnabled: 0, glassArea: 0, glassU: 4.7,
  glassDirection: "غربي", glassSHGF: 126,
  shadingCoefficient: 0.55, useSCMethod: 0,
  scValue: 0, shgfValue: 0, clfValue: 0,
  lightsEnabled: 0, lightsCount: 0, lightsWatt: 0, lightsHours: 8,
  peopleEnabled: 0, peopleCount: 0, peopleQt: 97, peopleHours: 8,
  equipmentEnabled: 0, equipmentHeatRate: 0, equipmentCount: 0, equipmentHours: 8,
  productEnabled: 0, productId: "", productMass: 0,
  productEnterTemp: 25, freezeTemp: -2.7, storageTemp: 0, coolTime: 24,
  crf: 0.67, cpAbove: 3.4, cpBelow: 1.8, latentHeat: 257, respirationRate: 0,
  packagingEnabled: 0, boxesCount: 0, boxWeight: 0.1,
  packagingCp: 2.3, packagingSafetyHours: 0,
  defrostEnabled: 0, heatersCount: 0, heaterPower: 1500, heaterUsageFactor: 0.4,
  usageEnabled: 0, usageFactor: 1.18,
  infiltrationEnabled: 0, infiltrationRate: 0, enthalpyDiff: 0.0563,
  ventilationEnabled: 0, ventRatePerPerson: 24, peopleCountVent: 0,
  ventHi: 45, ventHo: 91, specificVolume: 0.91,
  airChangeEnabled: 0, airChangesPer24h: 0, airChangeVolume: 0,
  airChangeHi: 45, airChangeHo: 91, airChangeSpecificVolume: 0.91,
  safetyFactor: 10, operationHours: 24,
};

// ─── Example (demo) data ─────────────────────────────────────────────────────
const EXAMPLE_INPUTS: CalculationInputs = {
  appMode: "refrig",
  length: 40, width: 30, height: 4,
  tempIn: 4, tempOut: 35, groundTemp: 25,
  location: "jeddah", isGroundFloor: 1,
  considerRoofFloor: 1, considerWalls: 1, considerSolar: 1,
  roofLayers: [
    { materialId: "concrete",     thickness: 0.2,  k: 1.23  },
    { materialId: "poly_smooth",  thickness: 0.05, k: 0.029 },
    { materialId: "cement_brick", thickness: 0.02, k: 0.72  },
  ],
  roofHi: 9.37, roofHo: 22.7,
  floorLayers: [
    { materialId: "concrete",     thickness: 0.2,  k: 1.23  },
    { materialId: "poly_smooth",  thickness: 0.05, k: 0.029 },
    { materialId: "cement_brick", thickness: 0.02, k: 0.72  },
  ],
  floorHi: 9.37, floorHo: 9.37,
  wallLayers: [
    { materialId: "cement_brick", thickness: 0.22, k: 0.72 },
    { materialId: "gypsum",       thickness: 0,    k: 0.46 },
  ],
  wallHi: 8, wallHo: 22.7,
  northEnabled: 1, southEnabled: 1, eastEnabled: 1, westEnabled: 1,
  northWallHo: 22.7, southWallHo: 8, eastWallHo: 8, westWallHo: 22.7,
  absorptance: 0.57, radiation: 230,
  glassEnabled: 0, glassArea: 0, glassU: 4.7,
  glassDirection: "غربي", glassSHGF: 126,
  shadingCoefficient: 0.55, useSCMethod: 0,
  scValue: 0, shgfValue: 0, clfValue: 0,
  lightsEnabled: 1, lightsCount: 20, lightsWatt: 100, lightsHours: 8,
  peopleEnabled: 1, peopleCount: 8, peopleQt: 97, peopleHours: 8,
  equipmentEnabled: 1, equipmentHeatRate: 200, equipmentCount: 2, equipmentHours: 8,
  productEnabled: 1, productId: "beef_fresh", productMass: 5000,
  productEnterTemp: 20, freezeTemp: -2.7, storageTemp: 4, coolTime: 24,
  crf: 0.67, cpAbove: 3.4, cpBelow: 1.8, latentHeat: 257, respirationRate: 0,
  packagingEnabled: 1, boxesCount: 100, boxWeight: 0.5,
  packagingCp: 2.3, packagingSafetyHours: 2,
  defrostEnabled: 0, heatersCount: 3, heaterPower: 1500, heaterUsageFactor: 0.4,
  usageEnabled: 0, usageFactor: 1.18,
  infiltrationEnabled: 1, infiltrationRate: 28.9, enthalpyDiff: 0.0563,
  ventilationEnabled: 0, ventRatePerPerson: 24, peopleCountVent: 8,
  ventHi: 45, ventHo: 91, specificVolume: 0.91,
  airChangeEnabled: 0, airChangesPer24h: 1.2, airChangeVolume: 0,
  airChangeHi: 45, airChangeHo: 91, airChangeSpecificVolume: 0.91,
  safetyFactor: 10, operationHours: 24,
};

const STORAGE_KEY = "clc_v4_inputs";

function loadFromStorage(): CalculationInputs | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CalculationInputs;
  } catch {
    return null;
  }
}

function App() {
  const [results, setResults]         = useState<DetailedResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [inputs, setInputs]           = useState<CalculationInputs>(
    () => loadFromStorage() ?? NEUTRAL_DEFAULTS
  );

  // ── Auto-save to localStorage on every change ───────────────────────────
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
    } catch {
      // storage quota exceeded — ignore
    }
  }, [inputs]);

  const handleInputChange = useCallback(
    (field: string, value: number | string) => {
      setInputs((prev) => ({ ...prev, [field]: value }));
    }, []
  );

  const handleCalculate = useCallback(() => {
    try {
      const res = runAllCalculations(inputs);
      setResults(res);
      setShowResults(true);
      toast.success("تمت الحسابات بنجاح!", {
        description: `السعة الإجمالية: ${res.tons.toFixed(2)} طن تبريد`,
      });
    } catch (error) {
      toast.error("حدث خطأ في الحسابات", {
        description: error instanceof Error ? error.message : "خطأ غير معروف",
      });
    }
  }, [inputs]);

  const handleReset = useCallback(() => {
    setInputs(NEUTRAL_DEFAULTS);
    setResults(null);
    setShowResults(false);
    localStorage.removeItem(STORAGE_KEY);
    toast.info("تم إعادة تعيين جميع الحقول إلى الصفر");
  }, []);

  const handleLoadExample = useCallback(() => {
    setInputs(EXAMPLE_INPUTS);
    setResults(null);
    setShowResults(false);
    toast.success("تم تحميل البيانات النموذجية");
  }, []);

  const handleSave = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
      toast.success("تم حفظ البيانات محلياً");
    } catch {
      toast.error("فشل الحفظ — مساحة التخزين ممتلئة");
    }
  }, [inputs]);

  const isRefrig = inputs.appMode === "refrig";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20" dir="rtl">

      {/* ══════════════════════════════════════════
          HEADER
          ══════════════════════════════════════════ */}
      <header className={`relative overflow-hidden text-white shadow-2xl ${
        isRefrig
          ? "bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900"
          : "bg-gradient-to-r from-orange-900 via-red-800 to-rose-900"
      }`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHpNMjAgMjBoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="relative max-w-[1600px] mx-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 sm:p-3 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 shrink-0">
                <Calculator className="w-7 h-7 sm:w-10 sm:h-10 text-cyan-300" />
              </div>
              <div className="min-w-0">
                <h1
                  className="font-display leading-tight truncate"
                  style={{
                    fontFamily: "'ThmanyahSerifDisplay'",
                    fontWeight: 900,
                    fontSize: "clamp(1.1rem, 4vw, 2rem)",
                    fontFeatureSettings: '"salt" 1, "calt" 1, "liga" 1',
                  }}
                >
                  {isRefrig ? "حساب أحمال التبريد" : "حساب أحمال التكييف"}
                </h1>
                <p
                  className="mt-0.5 text-xs sm:text-sm leading-snug opacity-80"
                  style={{ fontFamily: "'ThmanyahSans'", fontWeight: 300 }}
                >
                  برنامج احترافي متكامل لحسابات ASHRAE
                </p>
              </div>
            </div>
            <div className="hidden sm:flex flex-wrap items-center gap-1.5 shrink-0">
              {[
                { icon: <ThermometerSun className="w-3 h-3 me-1" />, label: "جداول ASHRAE" },
                { icon: <CheckCircle2   className="w-3 h-3 me-1" />, label: "100+ منتج" },
                { icon: <ClipboardList  className="w-3 h-3 me-1" />, label: "22 جدول" },
              ].map(({ icon, label }) => (
                <Badge
                  key={label}
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 text-xs py-1 px-2 whitespace-nowrap"
                  style={{ fontFamily: "'ThmanyahSans'", fontWeight: 500 }}
                >
                  {icon}{label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">

          {/* ── Input Panel ────────────────────────────── */}
          <div className="xl:col-span-2 space-y-4">

            {/* ── MODE SELECTOR ────────────────────────── */}
            <Card className="border-2 border-slate-200 shadow-sm overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="text-sm font-bold text-slate-700" style={{ fontFamily: "'ThmanyahSans'" }}>
                    وضع الحساب
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {/* Refrigeration */}
                  <button
                    type="button"
                    onClick={() => handleInputChange("appMode", "refrig")}
                    className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-start transition-all ${
                      isRefrig
                        ? "border-blue-600 bg-blue-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${isRefrig ? "bg-blue-100" : "bg-slate-100"}`}>
                      <Snowflake className={`w-5 h-5 ${isRefrig ? "text-blue-600" : "text-slate-400"}`} />
                    </div>
                    <div>
                      <div className={`text-sm font-bold leading-snug ${isRefrig ? "text-blue-800" : "text-slate-600"}`}
                        style={{ fontFamily: "'ThmanyahSans'" }}>
                        تبريد
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">غرف باردة ومجمدة</div>
                    </div>
                  </button>

                  {/* Air Conditioning */}
                  <button
                    type="button"
                    onClick={() => handleInputChange("appMode", "ac")}
                    className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-start transition-all ${
                      !isRefrig
                        ? "border-orange-500 bg-orange-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${!isRefrig ? "bg-orange-100" : "bg-slate-100"}`}>
                      <Flame className={`w-5 h-5 ${!isRefrig ? "text-orange-500" : "text-slate-400"}`} />
                    </div>
                    <div>
                      <div className={`text-sm font-bold leading-snug ${!isRefrig ? "text-orange-800" : "text-slate-600"}`}
                        style={{ fontFamily: "'ThmanyahSans'" }}>
                        تكييف هواء
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">مكاتب ومجمعات</div>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* ── Tabs ────────────────────────────────── */}
            <Tabs defaultValue="dimensions" className="w-full">
              <TabsList className="w-full flex h-auto bg-white/80 backdrop-blur-sm border shadow-sm rounded-xl p-1 gap-1 overflow-x-auto overflow-y-hidden scrollbar-none">
                {[
                  { value: "dimensions", icon: <Settings className="w-4 h-4 shrink-0" />, label: "الأبعاد",        color: "data-[state=active]:bg-blue-600" },
                  { value: "glass",      icon: <Sun       className="w-4 h-4 shrink-0" />, label: "الزجاج والشمس", color: "data-[state=active]:bg-amber-600" },
                  { value: "internal",   icon: <Users     className="w-4 h-4 shrink-0" />, label: "داخلية",        color: "data-[state=active]:bg-emerald-600" },
                  { value: "product",    icon: <Package   className="w-4 h-4 shrink-0" />, label: "المنتج",         color: "data-[state=active]:bg-violet-600" },
                  { value: "air",        icon: <Wind      className="w-4 h-4 shrink-0 rtl-flip" />, label: "الهواء", color: "data-[state=active]:bg-sky-600" },
                ].map(({ value, icon, label, color }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className={`flex-1 min-w-[48px] flex flex-col sm:flex-row items-center gap-1 sm:gap-1.5 ${color} data-[state=active]:text-white rounded-lg py-2 sm:py-1.5 px-1 sm:px-2 text-[10px] sm:text-xs whitespace-nowrap`}
                    style={{ fontFamily: "'ThmanyahSans'", fontWeight: 700 }}
                  >
                    {icon}
                    <span className="leading-none text-center">{label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="dimensions" className="mt-4 space-y-4">
                <DimensionsSection  inputs={inputs} onChange={handleInputChange} />
                <Separator />
                <ConstructionSection inputs={inputs} onChange={handleInputChange} />
              </TabsContent>
              <TabsContent value="glass"    className="mt-4 space-y-4">
                <GlassSection inputs={inputs} onChange={handleInputChange} />
              </TabsContent>
              <TabsContent value="internal" className="mt-4 space-y-4">
                <InternalLoadsSection inputs={inputs} onChange={handleInputChange} />
              </TabsContent>
              <TabsContent value="product"  className="mt-4 space-y-4">
                <ProductSection inputs={inputs} onChange={handleInputChange} />
              </TabsContent>
              <TabsContent value="air"      className="mt-4 space-y-4">
                <AirLoadsSection inputs={inputs} onChange={handleInputChange} />
              </TabsContent>
            </Tabs>

            {/* ── Calculate CTA ────────────────────────── */}
            <Card className="border-2 border-blue-200 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl shrink-0 ${isRefrig ? "bg-blue-600" : "bg-orange-500"}`}>
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3
                        className="text-blue-900 leading-snug font-semibold"
                        style={{ fontFamily: "'ThmanyahSerifDisplay'", fontWeight: 700 }}
                      >
                        جاهز للحساب؟
                      </h3>
                      <p className="text-blue-700 text-sm mt-0.5" style={{ fontFamily: "'ThmanyahSans'", fontWeight: 400 }}>
                        اضغط لحساب جميع الأحمال بدقة احترافية
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="flex-1 sm:flex-none border-slate-300 text-slate-700 hover:bg-slate-50 text-sm"
                      style={{ fontFamily: "'ThmanyahSans'", fontWeight: 700 }}
                    >
                      <RotateCcw className="w-4 h-4 me-2 rtl-flip" />
                      مسح
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleLoadExample}
                      className="flex-1 sm:flex-none border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-sm"
                      style={{ fontFamily: "'ThmanyahSans'", fontWeight: 700 }}
                    >
                      <BookOpen className="w-4 h-4 me-2" />
                      مثال
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleSave}
                      className="flex-1 sm:flex-none border-slate-300 text-slate-600 hover:bg-slate-50 text-sm"
                      style={{ fontFamily: "'ThmanyahSans'", fontWeight: 700 }}
                    >
                      <Save className="w-4 h-4 me-2" />
                      حفظ
                    </Button>
                    <Button
                      onClick={handleCalculate}
                      className={`flex-1 sm:flex-none text-white shadow-lg hover:shadow-xl transition-all text-sm px-6 ${
                        isRefrig
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                          : "bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600"
                      }`}
                      style={{ fontFamily: "'ThmanyahSans'", fontWeight: 900 }}
                    >
                      <Calculator className="w-5 h-5 me-2" />
                      احسب الأحمال
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Results Panel ────────────────────────────── */}
          <div className="xl:col-span-1">
            <div className="sticky top-4 space-y-4">
              {showResults && results ? (
                <>
                  <ResultsPanel results={results} inputs={inputs} />
                  <StudentInfo />
                  <Button
                    onClick={() => window.print()}
                    variant="outline"
                    className="w-full border-slate-300 hover:bg-slate-50 no-print text-sm"
                    style={{ fontFamily: "'ThmanyahSans'", fontWeight: 700 }}
                  >
                    <Printer className="w-4 h-4 me-2" />
                    طباعة التقرير
                  </Button>
                </>
              ) : (
                <Card className="border-dashed border-2 border-slate-300 bg-slate-50/50">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ClipboardList className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3
                      className="text-slate-600 mb-3 font-semibold text-lg"
                      style={{ fontFamily: "'ThmanyahSerifDisplay'", fontWeight: 700 }}
                    >
                      لوحة النتائج
                    </h3>
                    <p
                      className="text-slate-500 text-sm leading-relaxed"
                      style={{ fontFamily: "'ThmanyahSans'", fontWeight: 300 }}
                    >
                      أدخل البيانات واضغط «احسب الأحمال» لرؤية النتائج المفصلة
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

        </div>
      </main>

      <footer className="mt-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-400 py-6 no-print">
        <div className="max-w-[1600px] mx-auto px-4 text-center">
          <p className="text-xs" style={{ fontFamily: "'ThmanyahSans'", fontWeight: 300 }}>
            Copyright © ٢٠٢٦. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>

      <Toaster position="top-center" />
    </div>
  );
}

export default App;
