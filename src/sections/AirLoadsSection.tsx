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
import { Wind, DoorOpen, RefreshCw, Users, Sparkles, XCircle } from "lucide-react";
import { INFILTRATION_RATES } from "@/data/infiltration";
import { VENTILATION_RATES } from "@/data/ventilation";
import type { CalculationInputs } from "@/types/inputs";
import { useMemo } from "react";

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
      <span>{label} = <span className="font-mono font-bold">0</span> (غير محسوب)</span>
    </div>
  );
}

function SectionToggle({
  id, label, checked, onToggle, accentClass,
}: {
  id: string; label: string; checked: boolean;
  onToggle: (v: boolean) => void; accentClass: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-center justify-between gap-3 cursor-pointer select-none bg-white border border-slate-200 rounded-xl px-4 py-3 hover:border-slate-300 transition-colors"
    >
      <span className="text-sm font-medium text-slate-800 leading-snug">{label}</span>
      <input type="checkbox" id={id} checked={checked}
        onChange={(e) => onToggle(e.target.checked)}
        className={`w-5 h-5 shrink-0 rounded ${accentClass} cursor-pointer`} />
    </label>
  );
}

function EnthalpyRow({
  hiVal, hoVal, volVal, onHi, onHo, onVol,
}: {
  hiVal: number; hoVal: number; volVal: number;
  onHi: (v: number) => void; onHo: (v: number) => void; onVol: (v: number) => void;
}) {
  return (
    <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 space-y-2">
      <div className="text-xs font-medium text-slate-500">بيانات الإنثالبي</div>
      {[
        { label: "الإنثالبي الداخلي (kJ/kg)", val: hiVal, fn: onHi },
        { label: "الإنثالبي الخارجي (kJ/kg)", val: hoVal, fn: onHo },
        { label: "الحجم النوعي (m³/kg)", val: volVal, fn: onVol },
      ].map(({ label, val, fn }) => (
        <div key={label} className="flex items-center justify-between gap-2">
          <span className="text-xs text-slate-600 flex-1">{label}</span>
          <Input type="number" step="0.01" value={val}
            onChange={(e) => fn(parseFloat(e.target.value) || 0)}
            className="h-9 text-xs text-center font-mono w-24 shrink-0" dir="ltr" />
        </div>
      ))}
    </div>
  );
}

export function AirLoadsSection({ inputs, onChange }: Props) {
  const roomVolume = inputs.length * inputs.width * inputs.height;
  const isBelowZero = inputs.tempIn < 0;

  // Auto-calculate infiltration rate from room volume (interpolation)
  const autoInfiltrationRate = useMemo(() => {
    if (!INFILTRATION_RATES.length) return 0;
    const sorted = [...INFILTRATION_RATES].sort((a, b) => a.roomVolume - b.roomVolume);
    if (roomVolume <= sorted[0].roomVolume)
      return isBelowZero ? sorted[0].rateBelowZero : sorted[0].rateAboveZero;
    if (roomVolume >= sorted[sorted.length - 1].roomVolume)
      return isBelowZero
        ? sorted[sorted.length - 1].rateBelowZero
        : sorted[sorted.length - 1].rateAboveZero;
    for (let i = 0; i < sorted.length - 1; i++) {
      if (roomVolume >= sorted[i].roomVolume && roomVolume <= sorted[i + 1].roomVolume) {
        const t = (roomVolume - sorted[i].roomVolume) / (sorted[i + 1].roomVolume - sorted[i].roomVolume);
        const r0 = isBelowZero ? sorted[i].rateBelowZero : sorted[i].rateAboveZero;
        const r1 = isBelowZero ? sorted[i + 1].rateBelowZero : sorted[i + 1].rateAboveZero;
        return parseFloat((r0 + t * (r1 - r0)).toFixed(1));
      }
    }
    return 0;
  }, [roomVolume, isBelowZero]);

  return (
    <div className="space-y-4">

      {/* ── Infiltration ── */}
      <Card className={`border-sky-200 shadow-sm ${inputs.infiltrationEnabled === 0 ? "opacity-75" : ""}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-sky-800 font-display">
            <DoorOpen className="w-5 h-5 text-sky-600 shrink-0" />
            حمل تسرب الهواء
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <SectionToggle
            id="infiltrationEnabled"
            label="هناك حمل تسرب هواء؟"
            checked={inputs.infiltrationEnabled === 1}
            onToggle={(v) => onChange("infiltrationEnabled", v ? 1 : 0)}
            accentClass="accent-sky-600"
          />

          {inputs.infiltrationEnabled === 1 ? (
            <div className="space-y-3">
              {/* Auto-suggest from volume */}
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span className="text-xs font-medium text-sky-700">
                    محسوب تلقائياً من جدول 2-11 (حجم الغرفة {roomVolume.toFixed(0)} m³)
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-sky-800 font-medium">
                    معدل التسرب المقترح:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sky-900 text-base">{autoInfiltrationRate} l/s</span>
                    <button
                      type="button"
                      onClick={() => onChange("infiltrationRate", autoInfiltrationRate)}
                      className="text-xs bg-sky-600 text-white px-2.5 py-1 rounded-lg hover:bg-sky-700 transition-colors font-medium active:scale-95"
                    >
                      تطبيق
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">
                  معدل التسرب المستخدم (l/s)
                  <span className="text-slate-400 text-xs ms-1">— يمكن التعديل يدوياً</span>
                </Label>
                <Select value={inputs.infiltrationRate.toString()}
                  onValueChange={(v) => onChange("infiltrationRate", parseFloat(v))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="max-h-60">
                    {INFILTRATION_RATES.map((rate, i) => (
                      <SelectItem key={i} value={(isBelowZero ? rate.rateBelowZero : rate.rateAboveZero).toString()}>
                        {rate.roomVolume} m³ → {isBelowZero ? rate.rateBelowZero : rate.rateAboveZero} l/s
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <FieldRow label={<span>فرق الإنثالبي <span className="text-slate-400 font-mono text-xs">(kJ/l)</span></span>}>
                <Input type="number" step="0.0001" value={inputs.enthalpyDiff}
                  onChange={(e) => onChange("enthalpyDiff", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
            </div>
          ) : (
            <DisabledBadge label="حمل التسرب" />
          )}
        </CardContent>
      </Card>

      {/* ── Ventilation ── */}
      <Card className={`border-cyan-200 shadow-sm ${inputs.ventilationEnabled === 0 ? "opacity-75" : ""}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-cyan-800 font-display">
            <Wind className="w-5 h-5 text-cyan-600 shrink-0" />
            حمل التهوية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <SectionToggle
            id="ventilationEnabled"
            label="هناك حمل تهوية؟"
            checked={inputs.ventilationEnabled === 1}
            onToggle={(v) => onChange("ventilationEnabled", v ? 1 : 0)}
            accentClass="accent-cyan-600"
          />

          {inputs.ventilationEnabled === 1 ? (
            <>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />نوع الاستخدام (جدول 2-13)
                </Label>
                <Select value={inputs.ventRatePerPerson.toString()}
                  onValueChange={(v) => onChange("ventRatePerPerson", parseFloat(v))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {VENTILATION_RATES.map((v) => (
                      <SelectItem key={v.id} value={v.ratePreferred.toString()}>
                        {v.name} ({v.ratePreferred} L/s/شخص)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <FieldRow label="عدد الأشخاص">
                <Input type="number" min="0" value={inputs.peopleCountVent}
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
          ) : (
            <DisabledBadge label="حمل التهوية" />
          )}
        </CardContent>
      </Card>

      {/* ── Air Change ── */}
      <Card className={`border-indigo-200 shadow-sm ${inputs.airChangeEnabled === 0 ? "opacity-75" : ""}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-indigo-800 font-display">
            <RefreshCw className="w-5 h-5 text-indigo-600 shrink-0" />
            حمل تغيير الهواء
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <SectionToggle
            id="airChangeEnabled"
            label="هناك حمل تغيير هواء؟"
            checked={inputs.airChangeEnabled === 1}
            onToggle={(v) => onChange("airChangeEnabled", v ? 1 : 0)}
            accentClass="accent-indigo-600"
          />

          {inputs.airChangeEnabled === 1 ? (
            <div className="space-y-3">
              <FieldRow label="عدد مرات تغيير الهواء/24 ساعة">
                <Input type="number" step="0.1" min="0" value={inputs.airChangesPer24h}
                  onChange={(e) => onChange("airChangesPer24h", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label="حجم الحيز (m³)">
                <Input type="number" min="0"
                  value={inputs.airChangeVolume || roomVolume}
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
          ) : (
            <DisabledBadge label="حمل تغيير الهواء" />
          )}
        </CardContent>
      </Card>

    </div>
  );
}
