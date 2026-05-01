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
import { Badge } from "@/components/ui/badge";
import { ThermometerSun, MapPin, Building2 } from "lucide-react";
import { SAUDI_CITIES } from "@/data/cities";
import type { CalculationInputs } from "@/types/inputs";

interface Props {
  inputs: CalculationInputs;
  onChange: (field: string, value: number | string) => void;
}

/* ── Reusable RTL field row ──────────────────────────────────
   Layout: [Label  ·············  Value Input]
   اللابل على اليمين، والـ input يمتد للملء مع قيمة محاذاة يسار (أرقام)
   ─────────────────────────────────────────────────────────── */
function FieldRow({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm font-medium text-slate-700 leading-snug">{label}</div>
      <div className="w-28 shrink-0">{children}</div>
    </div>
  );
}

export function DimensionsSection({ inputs, onChange }: Props) {
  return (
    <div className="space-y-4">
      {/* ── Room Dimensions ──────────────────────────────────── */}
      <Card className="border-blue-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-800 font-display">
            <Building2 className="w-5 h-5 text-blue-600 shrink-0" />
            أبعاد الحيز المبرد/المكيف
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "length",  label: "الطول",     unit: "m", val: inputs.length },
              { id: "width",   label: "العرض",     unit: "m", val: inputs.width  },
              { id: "height",  label: "الارتفاع",  unit: "m", val: inputs.height },
            ].map(({ id, label, unit, val }) => (
              <div key={id} className="space-y-1">
                <label htmlFor={id} className="text-xs font-medium text-slate-600 block text-center">
                  {label} <span className="text-slate-400">({unit})</span>
                </label>
                <Input
                  id={id}
                  type="number"
                  value={val}
                  onChange={(e) => onChange(id, parseFloat(e.target.value) || 0)}
                  dir="ltr"
                  className="text-center font-mono"
                />
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-sans">
              المساحة: <span className="font-mono ms-1">{(inputs.length * inputs.width).toFixed(1)}</span> m²
            </Badge>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-sans">
              الحجم: <span className="font-mono ms-1">{(inputs.length * inputs.width * inputs.height).toFixed(1)}</span> m³
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* ── Temperature & Location ────────────────────────────── */}
      <Card className="border-amber-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-amber-800 font-display">
            <ThermometerSun className="w-5 h-5 text-amber-600 shrink-0" />
            الظروف الحرارية والموقع
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <FieldRow label="درجة حرارة الداخل (°C)">
            <Input
              id="tempIn"
              type="number"
              value={inputs.tempIn}
              onChange={(e) => onChange("tempIn", parseFloat(e.target.value) || 0)}
              dir="ltr"
              className="text-center font-mono"
            />
          </FieldRow>

          <FieldRow label="درجة حرارة الخارج (°C)">
            <Input
              id="tempOut"
              type="number"
              value={inputs.tempOut}
              onChange={(e) => onChange("tempOut", parseFloat(e.target.value) || 0)}
              dir="ltr"
              className="text-center font-mono"
            />
          </FieldRow>

          <FieldRow label="حرارة الأرض/الهواء (°C)">
            <Input
              id="groundTemp"
              type="number"
              value={inputs.groundTemp}
              onChange={(e) => onChange("groundTemp", parseFloat(e.target.value) || 0)}
              dir="ltr"
              className="text-center font-mono"
            />
          </FieldRow>

          <Separator />

          {/* City select — full width with label on top */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium flex items-center gap-1.5 text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              المدينة
            </Label>
            <Select
              value={inputs.location}
              onValueChange={(value) => onChange("location", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر المدينة" />
              </SelectTrigger>
              <SelectContent>
                {SAUDI_CITIES.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name} (جافة: {city.dryTemp}°C | رطبة: {city.wetTemp}°C)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Floor location — full width */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-slate-700">موقع الحيز</Label>
            <Select
              value={inputs.isGroundFloor.toString()}
              onValueChange={(value) => onChange("isGroundFloor", parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">الأرض (Ground Floor)</SelectItem>
                <SelectItem value="0">مختلف (Not Ground)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* CLTD */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span className="font-medium text-amber-800 text-sm">
                فرق الحرارة{" "}
                <span className="text-xs text-amber-600 font-mono">(CLTD)</span>
                {": "}
                <span className="text-lg font-bold font-mono">{inputs.tempOut - inputs.tempIn}°C</span>
              </span>
              <span className="text-sm text-amber-600 font-sans">
                حرارة الأرض - الداخل:{" "}
                <span className="font-mono">{inputs.groundTemp - inputs.tempIn}°C</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
