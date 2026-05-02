import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PenLine, BarChart2 } from "lucide-react";

import { StudentInfo }          from "@/sections/StudentInfo";
import { DimensionsSection }    from "@/sections/DimensionsSection";
import { ConstructionSection }  from "@/sections/ConstructionSection";
import { GlassSection }         from "@/sections/GlassSection";
import { InternalLoadsSection } from "@/sections/InternalLoadsSection";
import { ProductSection }       from "@/sections/ProductSection";
import { AirLoadsSection }      from "@/sections/AirLoadsSection";
import { ResultsPanel }         from "@/sections/ResultsPanel";

import { getDefaultInputs }     from "@/engine/defaults";
import { calculateAll }         from "@/engine/fullCalculator";
import type { CLCInputs }       from "@/types/inputs";

type Tab = "inputs" | "results";

export default function App() {
  const [inputs, setInputs] = useState<CLCInputs>(getDefaultInputs("refrigeration"));
  const [activeTab, setActiveTab] = useState<Tab>("inputs");

  const onChange = useCallback((partial: Partial<CLCInputs>) => {
    setInputs(prev => ({ ...prev, ...partial }));
  }, []);

  const result = calculateAll(inputs);
  const isAC = inputs.mode === "ac";

  const handleReset = () => {
    if (window.confirm("هل تريد إعادة تعيين جميع البيانات إلى القيم الافتراضية؟")) {
      setInputs(getDefaultInputs(inputs.mode));
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">

      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* الصف الأول: العنوان + أزرار */}
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-primary leading-tight truncate">
                حاسبة الأحمال الحرارية
              </h1>
              <p className="text-[10px] text-muted-foreground">نظام تبريد وتكييف هواء</p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Button size="sm" variant="outline" onClick={handleReset} className="text-xs h-8 px-3">
                إعادة تعيين
              </Button>
            </div>
          </div>

          {/* الصف الثاني: التبديلات */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {/* وضع التشغيل */}
            <div className="flex items-center gap-2.5 bg-muted/50 rounded-lg px-3 py-2 border">
              <span className={`text-xs font-medium transition-colors ${!isAC ? "text-primary font-bold" : "text-muted-foreground"}`}>
                تبريد
              </span>
              <Switch
                checked={isAC}
                onCheckedChange={v => setInputs(getDefaultInputs(v ? "ac" : "refrigeration"))} />
              <span className={`text-xs font-medium transition-colors ${isAC ? "text-primary font-bold" : "text-muted-foreground"}`}>
                تكييف
              </span>
            </div>

            {/* الطريقة المختصرة */}
            <div className="flex items-center gap-2.5 bg-muted/50 rounded-lg px-3 py-2 border">
              <span className={`text-xs font-medium transition-colors ${!inputs.shortMethodEnabled ? "text-muted-foreground" : "text-primary font-bold"}`}>
                مختصرة 2-22
              </span>
              <Switch
                checked={inputs.shortMethodEnabled}
                onCheckedChange={v => onChange({ shortMethodEnabled: v })} />
              {inputs.shortMethodEnabled && (
                <Select value={inputs.shortMethodType}
                  onValueChange={v => onChange({ shortMethodType: v as "heavy" | "medium" })}>
                  <SelectTrigger className="h-7 text-xs w-28 border-0 bg-transparent shadow-none p-0 focus-visible:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heavy">بناء ثقيل</SelectItem>
                    <SelectItem value="medium">بناء متوسط</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* نتيجة مصغرة للموبايل */}
            <div className="md:hidden flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2 ms-auto">
              <span className="text-xs text-muted-foreground">الحمل:</span>
              <span className="text-sm font-bold text-primary">{result.capacityTon.toFixed(2)} طن</span>
            </div>
          </div>

          {/* تبويبات الموبايل */}
          <div className="flex md:hidden gap-1 mt-3 bg-muted rounded-lg p-1">
            <button
              onClick={() => setActiveTab("inputs")}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-md font-medium transition-all ${
                activeTab === "inputs"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <PenLine className="h-3.5 w-3.5" /> الإدخال
            </button>
            <button
              onClick={() => setActiveTab("results")}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-md font-medium transition-all ${
                activeTab === "results"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <BarChart2 className="h-3.5 w-3.5" /> النتائج
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main ─── */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        <div className="flex gap-4 items-start">

          {/* ─── منطقة الإدخال ─── */}
          <div className={`flex-1 min-w-0 space-y-4 ${activeTab === "results" ? "hidden md:block" : ""}`}>
            <StudentInfo inputs={inputs} onChange={onChange} />
            <DimensionsSection inputs={inputs} onChange={onChange} />
            <ConstructionSection inputs={inputs} onChange={onChange} />
            <GlassSection inputs={inputs} onChange={onChange} />
            <InternalLoadsSection inputs={inputs} onChange={onChange} />
            {!isAC && <ProductSection inputs={inputs} onChange={onChange} />}
            <AirLoadsSection inputs={inputs} onChange={onChange} />
          </div>

          {/* ─── لوحة النتائج — Desktop (ثابتة على اليسار) ─── */}
          <div className="hidden md:block w-72 lg:w-80 shrink-0 sticky top-[100px] self-start max-h-[calc(100vh-120px)] overflow-y-auto">
            <ResultsPanel result={result} inputs={inputs} />
          </div>

          {/* ─── لوحة النتائج — Mobile ─── */}
          <div className={`w-full min-w-0 ${activeTab === "inputs" ? "hidden" : "block md:hidden"}`}>
            <ResultsPanel result={result} inputs={inputs} />
          </div>
        </div>
      </main>

      <footer className="border-t mt-8 py-4 text-center text-xs text-muted-foreground">
        حاسبة الأحمال الحرارية · نسخة ويب — {new Date().getFullYear()}
      </footer>
    </div>
  );
}
