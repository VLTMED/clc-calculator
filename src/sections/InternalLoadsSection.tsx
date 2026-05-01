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
import { Lightbulb, Users, Wrench, Clock, XCircle } from "lucide-react";
import { PEOPLE_HEAT_AC, getPeopleHeatRefrig } from "@/data/ventilation";
import type { CalculationInputs } from "@/types/inputs";

interface Props {
  inputs: CalculationInputs;
  onChange: (field: string, value: number | string) => void;
}

function FieldRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm font-medium text-slate-700 leading-snug flex-1">{label}</div>
      <div className="w-28 shrink-0">{children}</div>
    </div>
  );
}

function DisabledBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500">
      <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
      <span>{label} = <span className="font-mono font-bold">0 W</span> (غير محسوب)</span>
    </div>
  );
}

function SectionToggle({
  id, label, checked, onToggle,
  accentClass,
}: {
  id: string;
  label: string;
  checked: boolean;
  onToggle: (v: boolean) => void;
  accentClass: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-center justify-between gap-3 cursor-pointer select-none bg-white border border-slate-200 rounded-xl px-4 py-3 hover:border-slate-300 transition-colors"
    >
      <span className="text-sm font-medium text-slate-800 leading-snug">{label}</span>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onToggle(e.target.checked)}
        className={`w-5 h-5 shrink-0 rounded ${accentClass} cursor-pointer`}
      />
    </label>
  );
}

export function InternalLoadsSection({ inputs, onChange }: Props) {
  const isRefrig = inputs.appMode === "refrig";

  return (
    <div className="space-y-4">

      {/* ── Lighting ── */}
      <Card className={`border-yellow-200 shadow-sm transition-opacity ${inputs.lightsEnabled === 0 ? "opacity-75" : ""}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-yellow-800 font-display">
            <Lightbulb className="w-5 h-5 text-yellow-600 shrink-0" />
            حمل الإضاءة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <SectionToggle
            id="lightsEnabled"
            label="هناك حمل للإضاءة؟"
            checked={inputs.lightsEnabled === 1}
            onToggle={(v) => onChange("lightsEnabled", v ? 1 : 0)}
            accentClass="accent-yellow-500"
          />

          {inputs.lightsEnabled === 1 ? (
            <>
              <FieldRow label="عدد المصابيح">
                <Input type="number" min="0" value={inputs.lightsCount}
                  onChange={(e) => onChange("lightsCount", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label="قدرة كل منها (W)">
                <Input type="number" min="0" value={inputs.lightsWatt}
                  onChange={(e) => onChange("lightsWatt", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label={<span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />ساعات الاستخدام/يوم</span>}>
                <Input type="number" min="0" max="24" value={inputs.lightsHours}
                  onChange={(e) => onChange("lightsHours", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2 text-xs text-yellow-700">
                الحمل = {((inputs.lightsCount * inputs.lightsWatt * inputs.lightsHours) / 24).toFixed(0)} W
                <span className="text-yellow-500 ms-2">({inputs.lightsCount} × {inputs.lightsWatt}W × {inputs.lightsHours}h ÷ 24)</span>
              </div>
            </>
          ) : (
            <DisabledBadge label="حمل الإضاءة" />
          )}
        </CardContent>
      </Card>

      {/* ── People ── */}
      <Card className={`border-emerald-200 shadow-sm transition-opacity ${inputs.peopleEnabled === 0 ? "opacity-75" : ""}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-emerald-800 font-display">
            <Users className="w-5 h-5 text-emerald-600 shrink-0" />
            حمل الأشخاص
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <SectionToggle
            id="peopleEnabled"
            label="هناك أشخاص في الحيز؟"
            checked={inputs.peopleEnabled === 1}
            onToggle={(v) => onChange("peopleEnabled", v ? 1 : 0)}
            accentClass="accent-emerald-600"
          />

          {inputs.peopleEnabled === 1 ? (
            <>
              <FieldRow label="عدد الأشخاص">
                <Input type="number" min="0" value={inputs.peopleCount}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    onChange("peopleCount", val);
                    onChange("peopleCountVent", val);
                  }}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">
                  {isRefrig ? "حرارة الشخص (وضع التبريد)" : "نشاط الأشخاص"}
                </Label>
                {isRefrig ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                    <span className="text-sm text-emerald-700">
                      من جدول 2-21 عند {inputs.tempIn}°C:
                    </span>
                    <span className="font-mono font-bold text-emerald-800">
                      {getPeopleHeatRefrig(inputs.tempIn).toFixed(0)} W/شخص
                    </span>
                  </div>
                ) : (
                  <Select value={inputs.peopleQt.toString()}
                    onValueChange={(v) => onChange("peopleQt", parseFloat(v))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PEOPLE_HEAT_AC.map((p) => (
                        <SelectItem key={p.id} value={p.qt.toString()}>
                          {p.activity} — {p.qt} W/شخص
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <FieldRow label={<span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />ساعات الحضور/يوم</span>}>
                <Input type="number" min="0" max="24" value={inputs.peopleHours}
                  onChange={(e) => onChange("peopleHours", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>

              {isRefrig && (
                <p className="text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
                  في وضع التبريد تُحسب حرارة الشخص تلقائياً من جدول 2-21 بناءً على درجة الحرارة الداخلية ({inputs.tempIn}°C)
                </p>
              )}
            </>
          ) : (
            <DisabledBadge label="حمل الأشخاص" />
          )}
        </CardContent>
      </Card>

      {/* ── Equipment ── */}
      <Card className={`border-orange-200 shadow-sm transition-opacity ${inputs.equipmentEnabled === 0 ? "opacity-75" : ""}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-orange-800 font-display">
            <Wrench className="w-5 h-5 text-orange-600 shrink-0" />
            حمل المعدات
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <SectionToggle
            id="equipmentEnabled"
            label="هناك حمل للمعدات؟"
            checked={inputs.equipmentEnabled === 1}
            onToggle={(v) => onChange("equipmentEnabled", v ? 1 : 0)}
            accentClass="accent-orange-600"
          />

          {inputs.equipmentEnabled === 1 ? (
            <div className="space-y-3">
              <FieldRow label="معدل الكسب الحراري (W/وحدة)">
                <Input type="number" min="0" value={inputs.equipmentHeatRate}
                  onChange={(e) => onChange("equipmentHeatRate", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label="عدد المعدات">
                <Input type="number" min="0" value={inputs.equipmentCount}
                  onChange={(e) => onChange("equipmentCount", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label={<span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />ساعات التشغيل/يوم</span>}>
                <Input type="number" min="0" max="24" value={inputs.equipmentHours}
                  onChange={(e) => onChange("equipmentHours", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
            </div>
          ) : (
            <DisabledBadge label="حمل المعدات" />
          )}
        </CardContent>
      </Card>

    </div>
  );
}
