import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lightbulb, Users, Wrench, Clock } from "lucide-react";
import { PEOPLE_HEAT_AC, getPeopleHeatRefrig } from "@/data/ventilation";
import type { CalculationInputs } from "@/types/inputs";

interface Props {
  inputs: CalculationInputs;
  onChange: (field: string, value: number | string) => void;
}

/* RTL field row: label right, input fixed-width left */
function FieldRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm font-medium text-slate-700 leading-snug">{label}</div>
      <div className="w-28 shrink-0">{children}</div>
    </div>
  );
}

export function InternalLoadsSection({ inputs, onChange }: Props) {
  return (
    <div className="space-y-4">

      {/* ── Lighting ── */}
      <Card className="border-yellow-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-yellow-800 font-display">
            <Lightbulb className="w-5 h-5 text-yellow-600 shrink-0" />
            حمل الإضاءة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <FieldRow label="عدد المصابيح">
            <Input type="number" value={inputs.lightsCount}
              onChange={(e) => onChange("lightsCount", parseFloat(e.target.value) || 0)}
              dir="ltr" className="text-center font-mono" />
          </FieldRow>
          <FieldRow label="قدرة كل منها (W)">
            <Input type="number" value={inputs.lightsWatt}
              onChange={(e) => onChange("lightsWatt", parseFloat(e.target.value) || 0)}
              dir="ltr" className="text-center font-mono" />
          </FieldRow>
          <FieldRow label={<span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />ساعات الاستخدام/يوم</span>}>
            <Input type="number" value={inputs.lightsHours}
              onChange={(e) => onChange("lightsHours", parseFloat(e.target.value) || 0)}
              dir="ltr" className="text-center font-mono" />
          </FieldRow>
        </CardContent>
      </Card>

      {/* ── People ── */}
      <Card className="border-emerald-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-emerald-800 font-display">
            <Users className="w-5 h-5 text-emerald-600 shrink-0" />
            حمل الأشخاص
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <FieldRow label="عدد الأشخاص">
            <Input type="number" value={inputs.peopleCount}
              onChange={(e) => {
                const val = parseFloat(e.target.value) || 0;
                onChange("peopleCount", val);
                onChange("peopleCountVent", val);
              }}
              dir="ltr" className="text-center font-mono" />
          </FieldRow>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-slate-700">نشاط الأشخاص</Label>
            <Select value={inputs.peopleQt.toString()}
              onValueChange={(v) => onChange("peopleQt", parseFloat(v))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {PEOPLE_HEAT_AC.map((p) => (
                  <SelectItem key={p.id} value={p.qt.toString()}>
                    {p.activity} - {p.qt}W
                  </SelectItem>
                ))}
                <SelectItem value={getPeopleHeatRefrig(inputs.tempIn).toString()}>
                  مخزن تبريد عند {inputs.tempIn}°C ({getPeopleHeatRefrig(inputs.tempIn).toFixed(0)}W)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <FieldRow label={<span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />ساعات الحضور/يوم</span>}>
            <Input type="number" value={inputs.peopleHours}
              onChange={(e) => onChange("peopleHours", parseFloat(e.target.value) || 0)}
              dir="ltr" className="text-center font-mono" />
          </FieldRow>
        </CardContent>
      </Card>

      {/* ── Equipment ── */}
      <Card className="border-orange-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-orange-800 font-display">
            <Wrench className="w-5 h-5 text-orange-600 shrink-0" />
            حمل المعدات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <label htmlFor="equipmentEnabled"
            className="flex items-center gap-3 cursor-pointer select-none mb-4 py-1">
            <span className="flex-1 text-sm font-medium">هناك حمل للمعدات؟</span>
            <input type="checkbox" id="equipmentEnabled"
              checked={inputs.equipmentEnabled === 1}
              onChange={(e) => onChange("equipmentEnabled", e.target.checked ? 1 : 0)}
              className="w-5 h-5 shrink-0 rounded accent-orange-600" />
          </label>

          {inputs.equipmentEnabled === 1 && (
            <div className="space-y-3">
              <FieldRow label="معدل الكسب الحراري (W)">
                <Input type="number" value={inputs.equipmentHeatRate}
                  onChange={(e) => onChange("equipmentHeatRate", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label="عدد المعدات">
                <Input type="number" value={inputs.equipmentCount}
                  onChange={(e) => onChange("equipmentCount", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label={<span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />ساعات التشغيل/يوم</span>}>
                <Input type="number" value={inputs.equipmentHours}
                  onChange={(e) => onChange("equipmentHours", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
