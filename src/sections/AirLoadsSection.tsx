import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumericInput } from "@/components/ui/numeric-input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wind } from "lucide-react";
import type { CLCInputs } from "@/types/inputs";
import { VENTILATION_RATES, getInfiltrationRate, getAirChangesPerDay } from "@/data/tables";

interface Props {
  inputs: CLCInputs;
  onChange: (partial: Partial<CLCInputs>) => void;
}

export function AirLoadsSection({ inputs, onChange }: Props) {
  const { infiltration, airChanges, ventilation } = inputs;
  const volume = inputs.length * inputs.width * inputs.height;

  const autoRate = getInfiltrationRate(volume, inputs.tempIn);
  const autoChanges = getAirChangesPerDay(volume);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-primary flex items-center gap-2">
          <Wind className="h-4 w-4" />
          أحمال الهواء (تسرب / تغيير / تهوية)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* تسرب الهواء */}
        <div className="border rounded-lg p-3 space-y-3">
          <div className="flex items-center gap-3">
            <Switch checked={infiltration.enabled}
              onCheckedChange={v => onChange({ infiltration: { ...infiltration, enabled: v } })} />
            <span className="text-sm font-semibold">تسرب الهواء — جدول 2-11</span>
          </div>
          {infiltration.enabled && (
            <>
              <div className="flex items-center gap-3 rounded-lg border p-2.5">
                <Label className="text-xs font-medium min-w-fit">طريقة الحساب:</Label>
                <div className="flex items-center gap-3">
                  <span className={`text-xs ${infiltration.method === "table11" ? "font-bold text-primary" : "text-muted-foreground"}`}>
                    من الجدول
                  </span>
                  <Switch checked={infiltration.method === "manual"}
                    onCheckedChange={v => onChange({ infiltration: { ...infiltration, method: v ? "manual" : "table11" } })} />
                  <span className={`text-xs ${infiltration.method === "manual" ? "font-bold text-primary" : "text-muted-foreground"}`}>
                    يدوي
                  </span>
                </div>
              </div>

              {infiltration.method === "table11" && (
                <p className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/30 p-2.5 rounded-lg">
                  الحجم: {volume.toFixed(1)} m³ → معدل التسرب التلقائي = <span className="font-bold text-primary">{autoRate.toFixed(2)} l/s</span>
                  {inputs.tempIn < 0 ? " (درجة حرارة تحت الصفر)" : " (درجة حرارة فوق الصفر)"}
                </p>
              )}

              {infiltration.method === "manual" && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">معدل التسرب اليدوي (l/s)</Label>
                  <NumericInput className="h-8 text-xs" min={0} step={0.1} fallback={autoRate}
                    value={infiltration.manualRate ?? autoRate}
                    onChange={v => onChange({ infiltration: { ...infiltration, manualRate: v } })} />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">درجة الهواء الخارجي (°C) — جدول 2-12A/B</Label>
                  <NumericInput className="h-8 text-xs" step={0.5} fallback={0}
                    value={infiltration.tempOut}
                    onChange={v => onChange({ infiltration: { ...infiltration, tempOut: v } })} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">الرطوبة النسبية الخارجية (%)</Label>
                  <NumericInput className="h-8 text-xs" min={10} max={100} step={5} fallback={50}
                    value={infiltration.rhOut}
                    onChange={v => onChange({ infiltration: { ...infiltration, rhOut: v } })} />
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border p-2.5">
                <Switch checked={infiltration.severeConditions}
                  onCheckedChange={v => onChange({ infiltration: { ...infiltration, severeConditions: v } })} />
                <Label className="text-xs font-medium">ظروف قاسية (+50% للمعدلات المجدولة)</Label>
              </div>
            </>
          )}
        </div>

        {/* تغيير الهواء — تبريد */}
        {inputs.mode === "refrigeration" && (
          <div className="border rounded-lg p-3 space-y-3">
            <div className="flex items-center gap-3">
              <Switch checked={airChanges.enabled}
                onCheckedChange={v => onChange({ airChanges: { ...airChanges, enabled: v } })} />
              <span className="text-sm font-semibold">تغيير الهواء — جدول 2-13</span>
            </div>
            {airChanges.enabled && (
              <>
                <div className="flex items-center gap-3 rounded-lg border p-2.5">
                  <Label className="text-xs font-medium min-w-fit">الطريقة:</Label>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs ${airChanges.method === "table13" ? "font-bold text-primary" : "text-muted-foreground"}`}>
                      من الجدول
                    </span>
                    <Switch checked={airChanges.method === "manual"}
                      onCheckedChange={v => onChange({ airChanges: { ...airChanges, method: v ? "manual" : "table13" } })} />
                    <span className={`text-xs ${airChanges.method === "manual" ? "font-bold text-primary" : "text-muted-foreground"}`}>
                      يدوي
                    </span>
                  </div>
                </div>

                {airChanges.method === "table13" && (
                  <p className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/30 p-2.5 rounded-lg">
                    الحجم: {volume.toFixed(1)} m³ → <span className="font-bold text-primary">{autoChanges.toFixed(2)}</span> مرة/24ساعة
                  </p>
                )}
                {airChanges.method === "manual" && (
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">عدد مرات تغيير الهواء / 24ساعة</Label>
                    <NumericInput className="h-8 text-xs" min={0} step={0.1} fallback={autoChanges}
                      value={airChanges.manualChanges ?? autoChanges}
                      onChange={v => onChange({ airChanges: { ...airChanges, manualChanges: v } })} />
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "vo (m³/kg)", key: "vo", step: 0.01, fallback: 0.84 },
                    { label: "hi الداخلي (kJ/kg)", key: "hi", step: 1, fallback: 0 },
                    { label: "ho الخارجي (kJ/kg)", key: "ho", step: 1, fallback: 0 },
                  ].map(({ label, key, step, fallback }) => (
                    <div key={key} className="space-y-1.5">
                      <Label className="text-xs font-medium">{label}</Label>
                      <NumericInput className="h-8 text-xs" step={step} min={0.1} fallback={fallback}
                        value={((airChanges as unknown) as Record<string, number>)[key]}
                        onChange={v => onChange({ airChanges: { ...airChanges, [key]: v } })} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* التهوية — تكييف */}
        {inputs.mode === "ac" && (
          <div className="border rounded-lg p-3 space-y-3">
            <div className="flex items-center gap-3">
              <Switch checked={ventilation.enabled}
                onCheckedChange={v => onChange({ ventilation: { ...ventilation, enabled: v } })} />
              <span className="text-sm font-semibold">التهوية — جدول 2-14</span>
            </div>
            {ventilation.enabled && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">نوع الاستخدام</Label>
                    <Select value={ventilation.ventilationRateId}
                      onValueChange={v => onChange({ ventilation: { ...ventilation, ventilationRateId: v } })}>
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {VENTILATION_RATES.map(r => (
                          <SelectItem key={r.id} value={r.id}>
                            {r.nameAr} (مفضل: {r.preferred} / أدنى: {r.minimum} L/s/شخص)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">عدد الأشخاص</Label>
                    <NumericInput className="h-8 text-xs" min={0} step={1} fallback={0}
                      value={ventilation.personCount}
                      onChange={v => onChange({ ventilation: { ...ventilation, personCount: Math.round(v) } })} />
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border p-2.5">
                  <Switch checked={ventilation.usePreferred}
                    onCheckedChange={v => onChange({ ventilation: { ...ventilation, usePreferred: v } })} />
                  <Label className="text-xs font-medium">
                    {ventilation.usePreferred ? "المعدل المفضل" : "المعدل الأدنى"}
                  </Label>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "vo (m³/kg)", key: "vo", step: 0.01, fallback: 0.84 },
                    { label: "hi (kJ/kg)", key: "hi", step: 1, fallback: 0 },
                    { label: "ho (kJ/kg)", key: "ho", step: 1, fallback: 0 },
                  ].map(({ label, key, step, fallback }) => (
                    <div key={key} className="space-y-1.5">
                      <Label className="text-xs font-medium">{label}</Label>
                      <NumericInput className="h-8 text-xs" step={step} fallback={fallback}
                        value={((ventilation as unknown) as Record<string, number>)[key]}
                        onChange={v => onChange({ ventilation: { ...ventilation, [key]: v } })} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
