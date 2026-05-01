import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ThermometerSun, MapPin, Building2 } from "lucide-react";
import { SAUDI_CITIES } from "@/data/cities";
import type { CalculationInputs } from "@/types/inputs";

interface Props {
  inputs: CalculationInputs;
  onChange: (field: string, value: number | string) => void;
}

/* ══════════════════════════════════════════════════════
   FieldRow — نمط RTL الأصيل
   [ النص ·····················  ] [ قيمة ]
   اللابل يمين (flex-1) — الـ input يسار (w-28 ثابت)
   ══════════════════════════════════════════════════════ */
function FieldRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 text-sm font-medium text-slate-700 leading-snug">{label}</div>
      <div className="w-28 shrink-0">{children}</div>
    </div>
  );
}

export function DimensionsSection({ inputs, onChange }: Props) {
  return (
    <div className="space-y-4">

      {/* ── أبعاد الحيز ─────────────────────────────────── */}
      <Card className="border-blue-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-800 font-display">
            <Building2 className="w-5 h-5 text-blue-600 shrink-0" />
            أبعاد الحيز المبرد/المكيف
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">

          <FieldRow label="الطول (m)">
            <Input id="length" type="number" value={inputs.length}
              onChange={(e) => onChange("length", parseFloat(e.target.value) || 0)}
              dir="ltr" className="text-center font-mono" />
          </FieldRow>

          <FieldRow label="العرض (m)">
            <Input id="width" type="number" value={inputs.width}
              onChange={(e) => onChange("width", parseFloat(e.target.value) || 0)}
              dir="ltr" className="text-center font-mono" />
          </FieldRow>

          <FieldRow label="الارتفاع (m)">
            <Input id="height" type="number" value={inputs.height}
              onChange={(e) => onChange("height", parseFloat(e.target.value) || 0)}
              dir="ltr" className="text-center font-mono" />
          </FieldRow>

          <Separator />

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              المساحة: <span className="font-mono ms-1">{(inputs.length * inputs.width).toFixed(1)}</span> m²
            </Badge>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              الحجم: <span className="font-mono ms-1">{(inputs.length * inputs.width * inputs.height).toFixed(1)}</span> m³
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* ── الظروف الحرارية ──────────────────────────────── */}
      <Card className="border-amber-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-amber-800 font-display">
            <ThermometerSun className="w-5 h-5 text-amber-600 shrink-0" />
            الظروف الحرارية والموقع
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">

          <FieldRow label="درجة حرارة الداخل (°C)">
            <Input type="number" value={inputs.tempIn}
              onChange={(e) => onChange("tempIn", parseFloat(e.target.value) || 0)}
              dir="ltr" className="text-center font-mono" />
          </FieldRow>

          <FieldRow label="درجة حرارة الخارج (°C)">
            <Input type="number" value={inputs.tempOut}
              onChange={(e) => onChange("tempOut", parseFloat(e.target.value) || 0)}
              dir="ltr" className="text-center font-mono" />
          </FieldRow>

          <FieldRow label="حرارة الأرض/الهواء (°C)">
            <Input type="number" value={inputs.groundTemp}
              onChange={(e) => onChange("groundTemp", parseFloat(e.target.value) || 0)}
              dir="ltr" className="text-center font-mono" />
          </FieldRow>

          <Separator />

          <div className="space-y-1.5">
            <Label className="text-sm font-medium flex items-center gap-1.5 text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              المدينة
            </Label>
            <Select value={inputs.location} onValueChange={(v) => onChange("location", v)}>
              <SelectTrigger><SelectValue placeholder="اختر المدينة" /></SelectTrigger>
              <SelectContent>
                {SAUDI_CITIES.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name} (جافة: {city.dryTemp}°C | رطبة: {city.wetTemp}°C)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-slate-700">موقع الحيز</Label>
            <Select value={inputs.isGroundFloor.toString()}
              onValueChange={(v) => onChange("isGroundFloor", parseInt(v))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">الأرض (Ground Floor)</SelectItem>
                <SelectItem value="0">مختلف (Not Ground)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-amber-600">
                حرارة الأرض - الداخل: <span className="font-mono">{inputs.groundTemp - inputs.tempIn}°C</span>
              </span>
              <span className="font-medium text-amber-800 text-sm">
                فرق الحرارة (CLTD):{" "}
                <span className="text-lg font-bold font-mono">{inputs.tempOut - inputs.tempIn}°C</span>
              </span>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
