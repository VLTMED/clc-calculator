import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { CalculationBreakdown } from "@/engine/fullCalculator";
import type { CLCInputs } from "@/types/inputs";

interface Props {
  result: CalculationBreakdown;
  inputs: CLCInputs;
}

function Row({ label, value, unit = "W", highlight = false, muted = false }: {
  label: string; value: number; unit?: string; highlight?: boolean; muted?: boolean;
}) {
  if (Math.abs(value) < 0.001 && !highlight) return null;
  return (
    <div className={`flex items-center justify-between py-1 text-xs border-b border-border/30 last:border-0 ${highlight ? "font-bold" : ""} ${muted ? "text-muted-foreground" : ""}`}>
      <span>{label}</span>
      <span className={`font-mono ${highlight ? "text-primary text-sm" : ""}`}>
        {value.toFixed(1)} {unit}
      </span>
    </div>
  );
}

function SectionTitle({ label }: { label: string }) {
  return (
    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide pt-2 pb-1 border-t">
      {label}
    </div>
  );
}

export function ResultsPanel({ result, inputs }: Props) {
  const wallCondTotal = Object.values(result.wallCond).reduce((a, b) => a + b, 0);
  const wallSolarTotal = Object.values(result.wallSolar).reduce((a, b) => a + b, 0);

  const isAC = inputs.mode === "ac";

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold text-primary flex items-center justify-between">
          <span>📊 نتائج الحساب</span>
          <Badge variant={result.total > 0 ? "default" : "secondary"}>
            {result.capacityTon.toFixed(2)} طن
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-0">

        {/* السقف والأرضية */}
        {!inputs.shortMethodEnabled && (
          <>
            <SectionTitle label="المغلف الحراري" />
            <Row label="السقف — توصيل" value={result.roofCond} />
            <Row label="السقف — شمسي" value={result.roofSolar} />
            <Row label="الأرضية — توصيل" value={result.floorCond} />
            <Row label="الجدران — توصيل" value={wallCondTotal} />
            <Row label="الجدران — شمسي" value={wallSolarTotal} />
            <Row label="الزجاج — توصيل" value={result.glassCond} />
            <Row label="الزجاج — شمسي" value={result.glassSolar} />

            {/* الأحمال الداخلية */}
            <SectionTitle label="الأحمال الداخلية" />
            <Row label="الإضاءة" value={result.lighting} />
            <Row label="الأشخاص" value={result.people} />
            <Row label="المعدات" value={result.equipment} />

            {/* أحمال المنتج */}
            {inputs.mode === "refrigeration" && (
              <>
                <SectionTitle label="أحمال المنتج والتبريد" />
                <Row label="حمل فوق التجميد" value={result.productAboveFreeze} />
                <Row label="حرارة التجميد الكامنة" value={result.productLatent} />
                <Row label="حمل تحت التجميد" value={result.productBelowFreeze} />
                <Row label="التغليف" value={result.packaging} />
                <Row label="إزالة الصقيع" value={result.defrost} />
              </>
            )}

            {/* الهواء */}
            <SectionTitle label="أحمال الهواء" />
            <Row label="تسرب الهواء" value={result.infiltration} />
            {!isAC && <Row label="تغيير الهواء" value={result.airChanges} />}
            {isAC  && <Row label="التهوية" value={result.ventilation} />}
          </>
        )}

        {/* الطريقة المختصرة */}
        {inputs.shortMethodEnabled && (
          <>
            <SectionTitle label="الطريقة المختصرة — جدول 2-22" />
            <Row label="حمل المغلف (مختصر)" value={result.shortMethod} />
            <Row label="أحمال المنتج والتبريد"
              value={result.productAboveFreeze + result.productLatent + result.productBelowFreeze + result.packaging + result.defrost} />
            <Row label="أحمال الهواء"
              value={result.infiltration + result.airChanges + result.ventilation} />
          </>
        )}

        <Separator className="my-2" />

        {/* المجاميع */}
        <Row label="مجموع الأحمال" value={result.subtotal} highlight />
        <Row label={`معامل الأمان (${inputs.safetyFactor}%)`} value={result.safetyLoad} muted />

        <Separator className="my-2" />

        <div className="space-y-2 pt-1">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold">الكسب الكلي</span>
            <span className="font-mono font-bold text-primary">{result.total.toFixed(1)} W</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">بالكيلوواط</span>
            <span className="font-mono">{result.totalKW.toFixed(3)} kW</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">سعة المنظومة ({inputs.operatingHours}h/day)</span>
            <span className="font-mono">{result.capacityKW.toFixed(3)} kW</span>
          </div>

          <div className="bg-primary/10 rounded p-3 text-center">
            <div className="text-xs text-muted-foreground">سعة التبريد المطلوبة</div>
            <div className="text-2xl font-bold text-primary">{result.capacityTon.toFixed(2)}</div>
            <div className="text-xs font-semibold">طن تبريد (TR)</div>
            <div className="text-xs text-muted-foreground mt-1">= {result.capacityKW.toFixed(2)} kW</div>
          </div>

          {/* U values */}
          <div className="border-t pt-2 space-y-1">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">معاملات U (W/m²·K)</div>
            {result.roofU > 0 && <div className="flex justify-between text-[10px]"><span>السقف</span><span className="font-mono">{result.roofU.toFixed(4)}</span></div>}
            {result.floorU > 0 && <div className="flex justify-between text-[10px]"><span>الأرضية</span><span className="font-mono">{result.floorU.toFixed(4)}</span></div>}
            {(["north", "south", "east", "west"] as const).map(dir => result.wallU[dir] > 0 && (
              <div key={dir} className="flex justify-between text-[10px]">
                <span>{{ north:"شمال", south:"جنوب", east:"شرق", west:"غرب" }[dir]}</span>
                <span className="font-mono">{result.wallU[dir].toFixed(4)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
