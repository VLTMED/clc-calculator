import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

export default function App() {
  const [inputs, setInputs] = useState<CLCInputs>(getDefaultInputs("refrigeration"));
  const [showResults, setShowResults] = useState(false);

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
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-base font-bold text-primary leading-tight">
              حاسبة الأحمال الحرارية CLC v4A
            </h1>
            <p className="text-[10px] text-muted-foreground">
              د. رحيم ك. جاسم — نظام تبريد وتكييف هواء
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-end">
            {/* وضع التشغيل */}
            <div className="flex items-center gap-2 border rounded px-3 py-1.5">
              <span className={`text-xs font-medium ${!isAC ? "text-primary" : "text-muted-foreground"}`}>تبريد</span>
              <Switch
                checked={isAC}
                onCheckedChange={v => setInputs(getDefaultInputs(v ? "ac" : "refrigeration"))} />
              <span className={`text-xs font-medium ${isAC ? "text-primary" : "text-muted-foreground"}`}>تكييف</span>
            </div>

            {/* الطريقة المختصرة */}
            <div className="flex items-center gap-2 border rounded px-3 py-1.5">
              <Label className="text-xs text-muted-foreground">مختصرة 2-22</Label>
              <Switch
                checked={inputs.shortMethodEnabled}
                onCheckedChange={v => onChange({ shortMethodEnabled: v })} />
              {inputs.shortMethodEnabled && (
                <Select value={inputs.shortMethodType}
                  onValueChange={v => onChange({ shortMethodType: v as "heavy" | "medium" })}>
                  <SelectTrigger className="h-7 text-xs w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heavy">بناء ثقيل</SelectItem>
                    <SelectItem value="medium">بناء متوسط</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <Button size="sm" variant="default" className="md:hidden"
              onClick={() => setShowResults(v => !v)}>
              {showResults ? "↩ الإدخال" : "📊 النتائج"}
            </Button>

            <Button size="sm" variant="outline" onClick={handleReset}>
              إعادة تعيين
            </Button>
          </div>
        </div>
      </header>

      {/* ─── Main ─── */}
      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-4">
          {/* ─── Input area ─── */}
          <div className={`flex-1 min-w-0 space-y-4 ${showResults ? "hidden md:block" : ""}`}>
            <StudentInfo inputs={inputs} onChange={onChange} />
            <DimensionsSection inputs={inputs} onChange={onChange} />
            <ConstructionSection inputs={inputs} onChange={onChange} />
            <GlassSection inputs={inputs} onChange={onChange} />
            <InternalLoadsSection inputs={inputs} onChange={onChange} />
            {!isAC && <ProductSection inputs={inputs} onChange={onChange} />}
            <AirLoadsSection inputs={inputs} onChange={onChange} />

            {/* نتائج مدمجة على الجوال */}
            <div className="md:hidden mt-4">
              <ResultsPanel result={result} inputs={inputs} />
            </div>
          </div>

          {/* ─── Results sidebar (desktop) ─── */}
          <div className={`w-80 shrink-0 ${showResults ? "" : "hidden md:block"}`}>
            <ResultsPanel result={result} inputs={inputs} />
          </div>
        </div>
      </main>

      <footer className="border-t mt-8 py-4 text-center text-xs text-muted-foreground">
        CLC v4A · سلطان · نسخة ويب — {new Date().getFullYear()}
      </footer>
    </div>
  );
}
