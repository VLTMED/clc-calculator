import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CLCInputs } from "@/types/inputs";
import { PEOPLE_HEAT_AC } from "@/data/tables";

interface Props {
  inputs: CLCInputs;
  onChange: (partial: Partial<CLCInputs>) => void;
}

export function InternalLoadsSection({ inputs, onChange }: Props) {
  const { lighting, people, equipment } = inputs;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-primary flex items-center gap-2">
          💡 الأحمال الداخلية (إضاءة / أشخاص / معدات)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ─── الإضاءة ─── */}
        <div className="border rounded p-3 space-y-3">
          <div className="flex items-center gap-2">
            <Switch checked={lighting.enabled}
              onCheckedChange={v => onChange({ lighting: { ...lighting, enabled: v } })} />
            <span className="text-sm font-semibold">الإضاءة</span>
          </div>
          {lighting.enabled && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "عدد المصابيح", key: "count", step: 1, min: 0 },
                { label: "قدرة كل مصباح (W)", key: "wattEach", step: 10, min: 0 },
                { label: "ساعات التشغيل/يوم", key: "hoursPerDay", step: 0.5, min: 0 },
                { label: "معامل الحمل CLF (0-1)", key: "clf", step: 0.05, min: 0 },
              ].map(({ label, key, step, min }) => (
                <div key={key} className="space-y-1">
                  <Label className="text-[10px]">{label}</Label>
                  <Input className="h-8 text-xs" type="number" step={step} min={min}
                    value={((lighting as unknown) as Record<string, number>)[key]}
                    onChange={e => onChange({ lighting: { ...lighting, [key]: parseFloat(e.target.value) || 0 } })} />
                </div>
              ))}
            </div>
          )}
          {lighting.enabled && (
            <p className="text-xs text-muted-foreground">
              Q = {lighting.count} × {lighting.wattEach}W × ({lighting.hoursPerDay}/24) × {lighting.clf}
              = <span className="font-bold text-primary">{(lighting.count * lighting.wattEach * (lighting.hoursPerDay / 24) * lighting.clf).toFixed(1)} W</span>
            </p>
          )}
        </div>

        {/* ─── الأشخاص ─── */}
        <div className="border rounded p-3 space-y-3">
          <div className="flex items-center gap-2">
            <Switch checked={people.enabled}
              onCheckedChange={v => onChange({ people: { ...people, enabled: v } })} />
            <span className="text-sm font-semibold">
              الأشخاص — {inputs.mode === "ac" ? "جدول 2-20" : "جدول 2-21"}
            </span>
          </div>
          {people.enabled && (
            <>
              {inputs.mode === "ac" && (
                <div className="space-y-1">
                  <Label className="text-xs">نوع النشاط</Label>
                  <Select value={people.activityId}
                    onValueChange={v => onChange({ people: { ...people, activityId: v } })}>
                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PEOPLE_HEAT_AC.map(a => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.activityAr} — Qt={a.qt}W ({a.useAr})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {inputs.mode === "refrigeration" && (
                <p className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/30 p-2 rounded">
                  Qt للتبريد يُحسب من جدول 2-21 حسب درجة حرارة المخزن ({inputs.tempIn}°C)
                </p>
              )}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "عدد الأشخاص", key: "count", step: 1 },
                  { label: "ساعات التواجد/يوم", key: "hoursPerDay", step: 0.5 },
                  { label: "معامل الحمل CLF", key: "clf", step: 0.05 },
                ].map(({ label, key, step }) => (
                  <div key={key} className="space-y-1">
                    <Label className="text-[10px]">{label}</Label>
                    <Input className="h-8 text-xs" type="number" step={step} min={0}
                      value={((people as unknown) as Record<string, number>)[key]}
                      onChange={e => onChange({ people: { ...people, [key]: parseFloat(e.target.value) || 0 } })} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ─── المعدات ─── */}
        <div className="border rounded p-3 space-y-3">
          <div className="flex items-center gap-2">
            <Switch checked={equipment.enabled}
              onCheckedChange={v => onChange({ equipment: { ...equipment, enabled: v } })} />
            <span className="text-sm font-semibold">المعدات والأجهزة</span>
          </div>
          {equipment.enabled && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "عدد الوحدات", key: "count", step: 1 },
                { label: "معدل الكسب (W/وحدة)", key: "heatRate", step: 50 },
                { label: "ساعات التشغيل/يوم", key: "hoursPerDay", step: 0.5 },
                { label: "معامل الحمل CLF", key: "clf", step: 0.05 },
              ].map(({ label, key, step }) => (
                <div key={key} className="space-y-1">
                  <Label className="text-[10px]">{label}</Label>
                  <Input className="h-8 text-xs" type="number" step={step} min={0}
                    value={((equipment as unknown) as Record<string, number>)[key]}
                    onChange={e => onChange({ equipment: { ...equipment, [key]: parseFloat(e.target.value) || 0 } })} />
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
