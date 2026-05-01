import { useState, useCallback } from "react";
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

function App() {
  const [results, setResults]       = useState<DetailedResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [inputs, setInputs]         = useState<CalculationInputs>({
    length: 40, width: 30, height: 4,
    tempIn: 25, tempOut: 35, groundTemp: 25,
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
    glassEnabled: 1, glassArea: 18, glassU: 4.7,
    glassDirection: "غربي", glassSHGF: 126,
    shadingCoefficient: 0.55, useSCMethod: 0,
    scValue: 0, shgfValue: 0, clfValue: 0,
    lightsCount: 110, lightsWatt: 100, lightsHours: 8,
    peopleCount: 150, peopleQt: 97, peopleHours: 8,
    equipmentEnabled: 1, equipmentHeatRate: 90, equipmentCount: 4, equipmentHours: 8,
    productEnabled: 1, productId: "beef_fresh", productMass: 20000,
    productEnterTemp: 25, freezeTemp: -2.7, storageTemp: 0, coolTime: 24,
    crf: 0.67, cpAbove: 3.4, cpBelow: 1.8, latentHeat: 257, respirationRate: 0,
    packagingEnabled: 0, boxesCount: 200, boxWeight: 0.1,
    packagingCp: 2.3, packagingSafetyHours: 0,
    defrostEnabled: 0, heatersCount: 5, heaterPower: 1500, heaterUsageFactor: 0.4,
    usageEnabled: 0, usageFactor: 1.18,
    infiltrationEnabled: 1, infiltrationRate: 28.9, enthalpyDiff: 0.0563,
    ventilationEnabled: 1, ventRatePerPerson: 24, peopleCountVent: 150,
    ventHi: 45, ventHo: 91, specificVolume: 0.91,
    airChangeEnabled: 0, airChangesPer24h: 1.2, airChangeVolume: 0,
    airChangeHi: 45, airChangeHo: 91, airChangeSpecificVolume: 0.91,
    safetyFactor: 10, operationHours: 24,
  });

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
    setResults(null);
    setShowResults(false);
    toast.info("تم إعادة تعيين النتائج");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20" dir="rtl">

      {/* ══════════════════════════════════════════
          HEADER
          H1 → ThmanyahSerifDisplay Black (900)
          Meta → ThmanyahSans Light (300)
          Badges → ThmanyahSans Medium (500)
          ══════════════════════════════════════════ */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHpNMjAgMjBoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="relative max-w-[1600px] mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            {/* Brand identity */}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shrink-0">
                <Calculator className="w-10 h-10 text-cyan-300" />
              </div>
              <div>
                {/* H1 — ThmanyahSerifDisplay Black: أعلى مستوى في الهرم البصري */}
                <h1
                  className="font-display text-2xl lg:text-display-md tracking-tight leading-tight"
                  style={{ fontFamily: "'ThmanyahSerifDisplay'", fontWeight: 900 }}
                >
                  حساب أحمال التبريد والتكييف
                </h1>
                {/* Subtitle — ThmanyahSans Light: ثانوي هادئ */}
                <p
                  className="mt-1 text-blue-200 text-caption"
                  style={{ fontFamily: "'ThmanyahSans'", fontWeight: 300 }}
                >
                  برنامج احترافي متكامل لحسابات ASHRAE
                </p>
              </div>
            </div>

            {/* Feature badges — ThmanyahSans Medium */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { icon: <ThermometerSun className="w-3 h-3 me-1.5" />, label: "جداول ASHRAE" },
                { icon: <CheckCircle2   className="w-3 h-3 me-1.5" />, label: "100+ منتج" },
                { icon: <ClipboardList  className="w-3 h-3 me-1.5" />, label: "22 جدول مرجعي" },
              ].map(({ icon, label }) => (
                <Badge
                  key={label}
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 text-micro py-1 px-2.5"
                  style={{ fontFamily: "'ThmanyahSans'", fontWeight: 500 }}
                >
                  {icon}{label}
                </Badge>
              ))}
            </div>

          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════════ */}
      <main className="max-w-[1600px] mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ── Input Panel (2/3 width on xl) ─────────── */}
          <div className="xl:col-span-2 space-y-6">
            <Tabs defaultValue="dimensions" className="w-full">

              {/* Tab list — ThmanyahSans Bold (700): عناصر التنقل تحتاج وضوح */}
              <TabsList className="w-full flex flex-wrap h-auto bg-white/80 backdrop-blur-sm border shadow-sm rounded-xl p-1 gap-1">
                {[
                  { value: "dimensions", icon: <Settings className="w-3.5 h-3.5 me-1" />,          label: "الأبعاد والمواد",   color: "data-[state=active]:bg-blue-600" },
                  { value: "glass",      icon: <Sun       className="w-3.5 h-3.5 me-1" />,          label: "الزجاج والشمس",    color: "data-[state=active]:bg-amber-600" },
                  { value: "internal",   icon: <Users     className="w-3.5 h-3.5 me-1" />,          label: "الأحمال الداخلية", color: "data-[state=active]:bg-emerald-600" },
                  { value: "product",    icon: <Package   className="w-3.5 h-3.5 me-1" />,          label: "المنتج والتخزين",  color: "data-[state=active]:bg-violet-600" },
                  { value: "air",        icon: <Wind      className="w-3.5 h-3.5 me-1 rtl-flip" />, label: "أحمال الهواء",     color: "data-[state=active]:bg-sky-600" },
                ].map(({ value, icon, label, color }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className={`flex-1 min-w-[90px] ${color} data-[state=active]:text-white rounded-lg text-micro sm:text-caption`}
                    style={{ fontFamily: "'ThmanyahSans'", fontWeight: 700 }}
                  >
                    {icon}{label}
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

            {/* ── Calculate CTA Card ────────────────────── */}
            <Card className="border-2 border-blue-200 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600 rounded-xl shrink-0">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      {/* Card heading — ThmanyahSerifDisplay Bold (700) */}
                      <h3
                        className="text-heading-md text-blue-900 leading-snug"
                        style={{ fontFamily: "'ThmanyahSerifDisplay'", fontWeight: 700 }}
                      >
                        جاهز للحساب؟
                      </h3>
                      {/* Description — ThmanyahSans Regular (400) */}
                      <p
                        className="text-body-sm text-blue-700 mt-0.5"
                        style={{ fontFamily: "'ThmanyahSans'", fontWeight: 400 }}
                      >
                        اضغط لحساب جميع الأحمال بدقة احترافية
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto">
                    {/* Secondary button — Sans Bold (700) */}
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="flex-1 sm:flex-none border-red-300 text-red-700 hover:bg-red-50 text-body-sm"
                      style={{ fontFamily: "'ThmanyahSans'", fontWeight: 700 }}
                    >
                      <RotateCcw className="w-4 h-4 me-2 rtl-flip" />
                      إعادة
                    </Button>
                    {/* Primary CTA — Sans Black (900): أقوى وزن للفعل الأهم */}
                    <Button
                      onClick={handleCalculate}
                      className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all text-body-lg px-8"
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

          {/* ── Results Panel (1/3 width on xl) ─────────── */}
          <div className="xl:col-span-1">
            <div className="sticky top-4 space-y-4">
              {showResults && results ? (
                <>
                  <ResultsPanel results={results} inputs={inputs} />
                  <StudentInfo />
                  <Button
                    onClick={() => window.print()}
                    variant="outline"
                    className="w-full border-slate-300 hover:bg-slate-50 no-print text-body-sm"
                    style={{ fontFamily: "'ThmanyahSans'", fontWeight: 700 }}
                  >
                    <Printer className="w-4 h-4 me-2" />
                    طباعة التقرير
                  </Button>
                </>
              ) : (
                /* Empty state */
                <Card className="border-dashed border-2 border-slate-300 bg-slate-50/50">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ClipboardList className="w-10 h-10 text-slate-400" />
                    </div>
                    {/* Empty state title — Serif Bold */}
                    <h3
                      className="text-heading-lg text-slate-600 mb-3"
                      style={{ fontFamily: "'ThmanyahSerifDisplay'", fontWeight: 700 }}
                    >
                      لوحة النتائج
                    </h3>
                    {/* Helper text — Sans Light */}
                    <p
                      className="text-body-sm text-slate-500 leading-relaxed"
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

      {/* ══════════════════════════════════════════
          FOOTER — ThmanyahSans Light (300)
          ══════════════════════════════════════════ */}
      <footer className="mt-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-400 py-6 no-print">
        <div className="max-w-[1600px] mx-auto px-4 text-center">
          <p
            className="text-caption"
            style={{ fontFamily: "'ThmanyahSans'", fontWeight: 300 }}
          >
            Copyright © ٢٠٢٤. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>

      <Toaster position="top-center" />
    </div>
  );
}

export default App;
