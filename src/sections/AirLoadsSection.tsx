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
import { Separator } from "@/components/ui/separator";
import { Wind, DoorOpen, RefreshCw, Users } from "lucide-react";
import { INFILTRATION_RATES } from "@/data/infiltration";
import { VENTILATION_RATES } from "@/data/ventilation";
import type { CalculationInputs } from "@/types/inputs";

interface Props {
  inputs: CalculationInputs;
  onChange: (field: string, value: number | string) => void;
}

function FieldRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-sm font-medium text-slate-700 flex-1 leading-snug">{label}</div>
      <div className="w-32 shrink-0">{children}</div>
    </div>
  );
}

/* Mini 3-col enthalpy row — label right, 3 inputs left */
function EnthalpyRow({
  hiVal, hoVal, volVal,
  onHi, onHo, onVol,
}: {
  hiVal: number; hoVal: number; volVal: number;
  onHi: (v: number) => void;
  onHo: (v: number) => void;
  onVol: (v: number) => void;
}) {
  return (
    <div className="bg-slate-50 rounded-lg p-3 space-y-2">
      <div className="text-xs font-medium text-slate-500">بيانات الإنثالبي</div>
      {[
        { label: "hi داخلي (kJ/kg)", val: hiVal, fn: onHi },
        { label: "ho خارجي (kJ/kg)", val: hoVal, fn: onHo },
        { label: "الحجم النوعي (m³/kg)", val: volVal, fn: onVol },
      ].map(({ label, val, fn }) => (
        <div key={label} className="flex items-center gap-2">
          <span className="text-xs text-slate-600 flex-1">{label}</span>
          <Input type="number" step="0.01" value={val}
            onChange={(e) => fn(parseFloat(e.target.value) || 0)}
            className="h-8 text-xs text-center font-mono w-24 shrink-0"
            dir="ltr" />
        </div>
      ))}
    </div>
  );
}

export function AirLoadsSection({ inputs, onChange }: Props) {
  return (
    <div className="space-y-4">

      {/* ── Infiltration ── */}
      <Card className="border-sky-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-sky-800 font-display">
            <DoorOpen className="w-5 h-5 text-sky-600 shrink-0" />
            حمل تسرب الهواء (Infiltration)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <label htmlFor="infiltrationEnabled"
            className="flex items-center gap-3 cursor-pointer select-none mb-4 py-1">
            <span className="flex-1 text-sm font-medium">هناك حمل تسرب؟</span>
            <input type="checkbox" id="infiltrationEnabled"
              checked={inputs.infiltrationEnabled === 1}
              onChange={(e) => onChange("infiltrationEnabled", e.target.checked ? 1 : 0)}
              className="w-5 h-5 shrink-0 rounded accent-sky-600" />
          </label>

          {inputs.infiltrationEnabled === 1 && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">معدل التسرب (l/s)</Label>
                <Select value={inputs.infiltrationRate.toString()}
                  onValueChange={(v) => onChange("infiltrationRate", parseFloat(v))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="max-h-60">
                    {INFILTRATION_RATES.map((rate, i) => (
                      <SelectItem key={i} value={rate.rateAboveZero.toString()}>
                        حجم {rate.roomVolume}m³ → {rate.rateAboveZero} l/s / {rate.rateBelowZero} l/s
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FieldRow label="كمية الحرارة مع الهواء (kJ/l)">
                <Input type="number" step="0.0001" value={inputs.enthalpyDiff}
                  onChange={(e) => onChange("enthalpyDiff", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Ventilation ── */}
      <Card className="border-cyan-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-cyan-800 font-display">
            <Wind className="w-5 h-5 text-cyan-600 shrink-0" />
            حمل التهوية (Ventilation)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label htmlFor="ventilationEnabled"
            className="flex items-center gap-3 cursor-pointer select-none py-1">
            <span className="flex-1 text-sm font-medium">هناك حمل تهوية؟</span>
            <input type="checkbox" id="ventilationEnabled"
              checked={inputs.ventilationEnabled === 1}
              onChange={(e) => onChange("ventilationEnabled", e.target.checked ? 1 : 0)}
              className="w-5 h-5 shrink-0 rounded accent-cyan-600" />
          </label>

          {inputs.ventilationEnabled === 1 && (
            <>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> نوع الاستخدام
                </Label>
                <Select value={inputs.ventRatePerPerson.toString()}
                  onValueChange={(v) => onChange("ventRatePerPerson", parseFloat(v))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {VENTILATION_RATES.map((v) => (
                      <SelectItem key={v.id} value={v.ratePreferred.toString()}>
                        {v.name} ({v.ratePreferred} L/s)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <FieldRow label="عدد الأشخاص">
                <Input type="number" value={inputs.peopleCountVent}
                  onChange={(e) => onChange("peopleCountVent", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>

              <Separator />

              <EnthalpyRow
                hiVal={inputs.ventHi} hoVal={inputs.ventHo} volVal={inputs.specificVolume}
                onHi={(v) => onChange("ventHi", v)}
                onHo={(v) => onChange("ventHo", v)}
                onVol={(v) => onChange("specificVolume", v)}
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* ── Air Change ── */}
      <Card className="border-indigo-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-indigo-800 font-display">
            <RefreshCw className="w-5 h-5 text-indigo-600 shrink-0" />
            حمل تغيير الهواء (Air Change)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <label htmlFor="airChangeEnabled"
            className="flex items-center gap-3 cursor-pointer select-none mb-4 py-1">
            <span className="flex-1 text-sm font-medium">هناك حمل تغيير هواء؟</span>
            <input type="checkbox" id="airChangeEnabled"
              checked={inputs.airChangeEnabled === 1}
              onChange={(e) => onChange("airChangeEnabled", e.target.checked ? 1 : 0)}
              className="w-5 h-5 shrink-0 rounded accent-indigo-600" />
          </label>

          {inputs.airChangeEnabled === 1 && (
            <div className="space-y-3">
              <FieldRow label="عدد مرات تغيير الهواء/24 ساعة">
                <Input type="number" step="0.1" value={inputs.airChangesPer24h}
                  onChange={(e) => onChange("airChangesPer24h", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label="حجم الحيز (m³)">
                <Input type="number"
                  value={inputs.airChangeVolume || inputs.length * inputs.width * inputs.height}
                  onChange={(e) => onChange("airChangeVolume", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <Separator />
              <EnthalpyRow
                hiVal={inputs.airChangeHi} hoVal={inputs.airChangeHo}
                volVal={inputs.airChangeSpecificVolume}
                onHi={(v) => onChange("airChangeHi", v)}
                onHo={(v) => onChange("airChangeHo", v)}
                onVol={(v) => onChange("airChangeSpecificVolume", v)}
              />
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
