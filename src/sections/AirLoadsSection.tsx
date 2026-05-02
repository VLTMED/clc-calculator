import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
          💨 أحمال الهواء (تسرب / تغيير / تهوية)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* ─── تسرب الهواء (Infiltration) ─── */}
        <div className="border rounded p-3 space-y-3">
          <div className="flex items-center gap-2">
            <Switch checked={infiltration.enabled}
              onCheckedChange={v => onChange({ infiltration: { ...infiltration, enabled: v } })} />
            <span className="text-sm font-semibold">تسرب الهواء — جدول 2-11</span>
          </div>
          {infiltration.enabled && (
            <>
              <div className="flex items-center gap-3">
                <Label className="text-xs min-w-fit">طريقة الحساب:</Label>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${infiltration.method === "table11" ? "font-bold" : "text-muted-foreground"}`}>من الجدول</span>
                  <Switch checked={infiltration.method === "manual"}
                    onCheckedChange={v => onChange({ infiltration: { ...infiltration, method: v ? "manual" : "table11" } })} />
                  <span className={`text-xs ${infiltration.method === "manual" ? "font-bold" : "text-muted-foreground"}`}>يدوي</span>
                </div>
              </div>

              {infiltration.method === "table11" && (
                <p className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/30 p-2 rounded">
                  الحجم: {volume.toFixed(1)} m³ → معدل التسرب التلقائي = <span className="font-bold">{autoRate.toFixed(2)} l/s</span>
                  {inputs.tempIn < 0 ? " (درجة حرارة تحت الصفر)" : " (درجة حرارة فوق الصفر)"}
                </p>
              )}

              {infiltration.method === "manual" && (
                <div className="space-y-1">
                  <Label className="text-xs">معدل التسرب اليدوي (l/s)</Label>
                  <Input className="h-8 text-xs" type="number" min={0} step={0.1}
                    value={infiltration.manualRate ?? autoRate}
                    onChange={e => onChange({ infiltration: { ...infiltration, manualRate: parseFloat(e.target.value) || 0 } })} />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">درجة الهواء الخارجي (°C) — جدول 2-12A/B</Label>
                  <Input className="h-8 text-xs" type="number" step={0.5}
                    value={infiltration.tempOut}
                    onChange={e => onChange({ infiltration: { ...infiltration, tempOut: parseFloat(e.target.value) || 0 } })} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">الرطوبة النسبية الخارجية (%)</Label>
                  <Input className="h-8 text-xs" type="number" min={10} max={100} step={5}
                    value={infiltration.rhOut}
                    onChange={e => onChange({ infiltration: { ...infiltration, rhOut: parseFloat(e.target.value) || 50 } })} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch checked={infiltration.severeConditions}
                  onCheckedChange={v => onChange({ infiltration: { ...infiltration, severeConditions: v } })} />
                <Label className="text-xs">ظروف قاسية (+50% للمعدلات المجدولة)</Label>
              </div>
            </>
          )}
        </div>

        {/* ─── تغيير الهواء (Air Changes — تبريد) ─── */}
        {inputs.mode === "refrigeration" && (
          <div className="border rounded p-3 space-y-3">
            <div className="flex items-center gap-2">
              <Switch checked={airChanges.enabled}
                onCheckedChange={v => onChange({ airChanges: { ...airChanges, enabled: v } })} />
              <span className="text-sm font-semibold">تغيير الهواء — جدول 2-13</span>
            </div>
            {airChanges.enabled && (
              <>
                <div className="flex items-center gap-3">
                  <Label className="text-xs min-w-fit">الطريقة:</Label>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${airChanges.method === "table13" ? "font-bold" : "text-muted-foreground"}`}>من الجدول</span>
                    <Switch checked={airChanges.method === "manual"}
                      onCheckedChange={v => onChange({ airChanges: { ...airChanges, method: v ? "manual" : "table13" } })} />
                    <span className={`text-xs ${airChanges.method === "manual" ? "font-bold" : "text-muted-foreground"}`}>يدوي</span>
                  </div>
                </div>

                {airChanges.method === "table13" && (
                  <p className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/30 p-2 rounded">
                    الحجم: {volume.toFixed(1)} m³ → {autoChanges.toFixed(2)} مرة/24ساعة
                  </p>
                )}
                {airChanges.method === "manual" && (
                  <div className="space-y-1">
                    <Label className="text-xs">عدد مرات تغيير الهواء / 24ساعة</Label>
                    <Input className="h-8 text-xs" type="number" min={0} step={0.1}
                      value={airChanges.manualChanges ?? autoChanges}
                      onChange={e => onChange({ airChanges: { ...airChanges, manualChanges: parseFloat(e.target.value) || 0 } })} />
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[10px]">vo (m³/kg)</Label>
                    <Input className="h-8 text-xs" type="number" min={0.1} step={0.01}
                      value={airChanges.vo}
                      onChange={e => onChange({ airChanges: { ...airChanges, vo: parseFloat(e.target.value) || 0.84 } })} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px]">hi الداخلي (kJ/kg)</Label>
                    <Input className="h-8 text-xs" type="number" step={1}
                      value={airChanges.hi}
                      onChange={e => onChange({ airChanges: { ...airChanges, hi: parseFloat(e.target.value) || 0 } })} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px]">ho الخارجي (kJ/kg)</Label>
                    <Input className="h-8 text-xs" type="number" step={1}
                      value={airChanges.ho}
                      onChange={e => onChange({ airChanges: { ...airChanges, ho: parseFloat(e.target.value) || 0 } })} />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ─── التهوية (Ventilation — تكييف) ─── */}
        {inputs.mode === "ac" && (
          <div className="border rounded p-3 space-y-3">
            <div className="flex items-center gap-2">
              <Switch checked={ventilation.enabled}
                onCheckedChange={v => onChange({ ventilation: { ...ventilation, enabled: v } })} />
              <span className="text-sm font-semibold">التهوية — جدول 2-14</span>
            </div>
            {ventilation.enabled && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">نوع الاستخدام</Label>
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
                  <div className="space-y-1">
                    <Label className="text-xs">عدد الأشخاص</Label>
                    <Input className="h-8 text-xs" type="number" min={0}
                      value={ventilation.personCount}
                      onChange={e => onChange({ ventilation: { ...ventilation, personCount: parseInt(e.target.value) || 0 } })} />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch checked={ventilation.usePreferred}
                    onCheckedChange={v => onChange({ ventilation: { ...ventilation, usePreferred: v } })} />
                  <Label className="text-xs">
                    {ventilation.usePreferred ? "المعدل المفضل" : "المعدل الأدنى"}
                  </Label>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[10px]">vo (m³/kg)</Label>
                    <Input className="h-8 text-xs" type="number" step={0.01}
                      value={ventilation.vo}
                      onChange={e => onChange({ ventilation: { ...ventilation, vo: parseFloat(e.target.value) || 0.84 } })} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px]">hi (kJ/kg)</Label>
                    <Input className="h-8 text-xs" type="number" step={1}
                      value={ventilation.hi}
                      onChange={e => onChange({ ventilation: { ...ventilation, hi: parseFloat(e.target.value) || 0 } })} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px]">ho (kJ/kg)</Label>
                    <Input className="h-8 text-xs" type="number" step={1}
                      value={ventilation.ho}
                      onChange={e => onChange({ ventilation: { ...ventilation, ho: parseFloat(e.target.value) || 0 } })} />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
