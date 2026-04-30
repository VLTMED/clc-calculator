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
import { DimensionsSection } from "@/sections/DimensionsSection";
import { ConstructionSection } from "@/sections/ConstructionSection";
import { GlassSection } from "@/sections/GlassSection";
import { InternalLoadsSection } from "@/sections/InternalLoadsSection";
import { ProductSection } from "@/sections/ProductSection";
import { AirLoadsSection } from "@/sections/AirLoadsSection";
import { ResultsPanel } from "@/sections/ResultsPanel";
import { StudentInfo } from "@/sections/StudentInfo";
import type { DetailedResults } from "@/engine/calculator";
import type { CalculationInputs } from "@/types/inputs";
import { runAllCalculations } from "@/engine/fullCalculator";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import "./App.css";

function App() {
  const [results, setResults] = useState<DetailedResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [inputs, setInputs] = useState<CalculationInputs>({
    // Dimensions
    length: 40,
    width: 30,
    height: 4,
    tempIn: 25,
    tempOut: 35,
    groundTemp: 25,
    location: "jeddah",
    isGroundFloor: 1,
    considerRoofFloor: 1,
    considerWalls: 1,
    considerSolar: 1,

    // Roof layers
    roofLayers: [
      { materialId: "concrete", thickness: 0.2, k: 1.23 },
      { materialId: "poly_smooth", thickness: 0.05, k: 0.029 },
      { materialId: "cement_brick", thickness: 0.02, k: 0.72 },
    ],
    roofHi: 9.37,
    roofHo: 22.7,

    // Floor layers
    floorLayers: [
      { materialId: "concrete", thickness: 0.2, k: 1.23 },
      { materialId: "poly_smooth", thickness: 0.05, k: 0.029 },
      { materialId: "cement_brick", thickness: 0.02, k: 0.72 },
    ],
    floorHi: 9.37,
    floorHo: 9.37,

    // Wall layers (for all 4 directions)
    wallLayers: [
      { materialId: "cement_brick", thickness: 0.22, k: 0.72 },
      { materialId: "gypsum", thickness: 0, k: 0.46 },
    ],
    wallHi: 8,
    wallHo: 22.7,

    // Directional settings
    northEnabled: 1,
    southEnabled: 1,
    eastEnabled: 1,
    westEnabled: 1,
    northWallHo: 22.7,
    southWallHo: 8,
    eastWallHo: 8,
    westWallHo: 22.7,

    // Solar
    absorptance: 0.57,
    radiation: 230,

    // Glass
    glassEnabled: 1,
    glassArea: 18,
    glassU: 4.7,
    glassDirection: "غربي",
    glassSHGF: 126,
    shadingCoefficient: 0.55,
    useSCMethod: 0,
    scValue: 0,
    shgfValue: 0,
    clfValue: 0,

    // Internal loads
    lightsCount: 110,
    lightsWatt: 100,
    lightsHours: 8,
    peopleCount: 150,
    peopleQt: 97,
    peopleHours: 8,
    equipmentEnabled: 1,
    equipmentHeatRate: 90,
    equipmentCount: 4,
    equipmentHours: 8,

    // Product
    productEnabled: 1,
    productId: "beef_fresh",
    productMass: 20000,
    productEnterTemp: 25,
    freezeTemp: -2.7,
    storageTemp: 0,
    coolTime: 24,
    crf: 0.67,
    cpAbove: 3.4,
    cpBelow: 1.8,
    latentHeat: 257,
    respirationRate: 0,

    // Packaging
    packagingEnabled: 0,
    boxesCount: 200,
    boxWeight: 0.1,
    packagingCp: 2.3,
    packagingSafetyHours: 0,

    // Defrost
    defrostEnabled: 0,
    heatersCount: 5,
    heaterPower: 1500,
    heaterUsageFactor: 0.4,

    // Usage method
    usageEnabled: 0,
    usageFactor: 1.18,

    // Air infiltration
    infiltrationEnabled: 1,
    infiltrationRate: 28.9,
    enthalpyDiff: 0.0563,

    // Ventilation
    ventilationEnabled: 1,
    ventRatePerPerson: 24,
    peopleCountVent: 150,
    ventHi: 45,
    ventHo: 91,
    specificVolume: 0.91,

    // Air change
    airChangeEnabled: 0,
    airChangesPer24h: 1.2,
    airChangeVolume: 0,
    airChangeHi: 45,
    airChangeHo: 91,
    airChangeSpecificVolume: 0.91,

    // System
    safetyFactor: 10,
    operationHours: 24,
  });

  const handleInputChange = useCallback(
    (field: string, value: number | string) => {
      setInputs((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleCalculate = useCallback(() => {
    try {
      const results = runAllCalculations(inputs);
      setResults(results);
      setShowResults(true);
      toast.success("تمت الحسابات بنجاح!", {
        description: `السعة الإجمالية: ${results.tons.toFixed(2)} طن تبريد`,
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
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHpNMjAgMjBoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="relative max-w-[1600px] mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <Calculator className="w-10 h-10 text-cyan-300" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                  حساب أحمال التبريد والتكييف
                </h1>
                <p className="text-blue-200 text-sm mt-1">
                  برنامج احترافي متكامل
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="border-white/30 text-white bg-white/10"
              >
                <ThermometerSun className="w-3 h-3 me-1" />
                جميع جداول ASHRAE
              </Badge>
              <Badge
                variant="outline"
                className="border-white/30 text-white bg-white/10"
              >
                <CheckCircle2 className="w-3 h-3 me-1" />
                100+ منتج
              </Badge>
              <Badge
                variant="outline"
                className="border-white/30 text-white bg-white/10"
              >
                <ClipboardList className="w-3 h-3 me-1" />
                22 جدول مرجعي
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Inputs */}
          <div className="xl:col-span-2 space-y-6">
            <Tabs defaultValue="dimensions" className="w-full">
              <TabsList className="w-full flex h-auto bg-white/80 backdrop-blur-sm border shadow-sm rounded-xl p-1 gap-1">
                <TabsTrigger
                  value="dimensions"
                  className="flex-1 min-w-[100px] data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg text-xs sm:text-sm"
                >
                  <Settings className="w-3.5 h-3.5 me-1" />
                  الأبعاد والمواد
                </TabsTrigger>
                <TabsTrigger
                  value="glass"
                  className="flex-1 min-w-[100px] data-[state=active]:bg-amber-600 data-[state=active]:text-white rounded-lg text-xs sm:text-sm"
                >
                  <Sun className="w-3.5 h-3.5 me-1" />
                  الزجاج والشمس
                </TabsTrigger>
                <TabsTrigger
                  value="internal"
                  className="flex-1 min-w-[100px] data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg text-xs sm:text-sm"
                >
                  <Users className="w-3.5 h-3.5 me-1" />
                  الأحمال الداخلية
                </TabsTrigger>
                <TabsTrigger
                  value="product"
                  className="flex-1 min-w-[100px] data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-lg text-xs sm:text-sm"
                >
                  <Package className="w-3.5 h-3.5 me-1" />
                  المنتج والتخزين
                </TabsTrigger>
                <TabsTrigger
                  value="air"
                  className="flex-1 min-w-[100px] data-[state=active]:bg-sky-600 data-[state=active]:text-white rounded-lg text-xs sm:text-sm"
                >
                  <Wind className="w-3.5 h-3.5 me-1" />
                  أحمال الهواء
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dimensions" className="mt-4 space-y-4">
                <DimensionsSection inputs={inputs} onChange={handleInputChange} />
                <Separator />
                <ConstructionSection
                  inputs={inputs}
                  onChange={handleInputChange}
                />
              </TabsContent>

              <TabsContent value="glass" className="mt-4 space-y-4">
                <GlassSection inputs={inputs} onChange={handleInputChange} />
              </TabsContent>

              <TabsContent value="internal" className="mt-4 space-y-4">
                <InternalLoadsSection
                  inputs={inputs}
                  onChange={handleInputChange}
                />
              </TabsContent>

              <TabsContent value="product" className="mt-4 space-y-4">
                <ProductSection inputs={inputs} onChange={handleInputChange} />
              </TabsContent>

              <TabsContent value="air" className="mt-4 space-y-4">
                <AirLoadsSection inputs={inputs} onChange={handleInputChange} />
              </TabsContent>
            </Tabs>

            {/* Calculate Button */}
            <Card className="border-2 border-blue-200 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-xl">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-900">
                        جاهز للحساب؟
                      </h3>
                      <p className="text-sm text-blue-700">
                        اضغط لحساب جميع الأحمال بدقة 100%
                      </p>
                    </div>
                  </div>
                  {/* RTL: primary (احسب) on right = first in flex-row-reverse on mobile */}
                  <div className="flex flex-row-reverse sm:flex-row gap-3 w-full sm:w-auto">
                    <Button
                      onClick={handleCalculate}
                      className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all text-base sm:text-lg px-6 sm:px-8"
                    >
                      <Calculator className="w-5 h-5 me-2" />
                      احسب الأحمال
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="flex-1 sm:flex-none border-red-300 text-red-700 hover:bg-red-50"
                    >
                      <RotateCcw className="w-4 h-4 me-2" />
                      إعادة
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="xl:col-span-1">
            <div className="sticky top-4 space-y-4">
              {showResults && results ? (
                <>
                  <ResultsPanel results={results} inputs={inputs} />
                  <StudentInfo />
                  <Button
                    onClick={() => window.print()}
                    variant="outline"
                    className="w-full border-slate-300 hover:bg-slate-50 no-print"
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
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">
                      لوحة النتائج
                    </h3>
                    <p className="text-sm text-slate-500">
                      أدخل البيانات واضغط "احسب الأحمال" لرؤية النتائج
                      المفصلة
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-6 no-print">
        <div className="max-w-[1600px] mx-auto px-4 text-center">
          <p className="text-sm">
            Copyright © 2024. All rights reserved.
          </p>
        </div>
      </footer>

      <Toaster position="top-center" />
    </div>
  );
}

export default App;
