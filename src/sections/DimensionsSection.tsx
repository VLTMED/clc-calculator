import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumericInput } from "@/components/ui/numeric-input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { CLCInputs } from "@/types/inputs";
import { SAUDI_CITIES } from "@/data/tables";

interface Props {
  inputs: CLCInputs;
  onChange: (partial: Partial<CLCInputs>) => void;
}

export function DimensionsSection({ inputs, onChange }: Props) {
  const volume = inputs.length * inputs.width * inputs.height;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-primary flex items-center gap-2">
          📐 الأبعاد والظروف التصميمية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "الطول/عرض الشمال (m)", key: "length", step: 0.1, min: 0.1 },
            { label: "العرض/طول الشرق (m)", key: "width", step: 0.1, min: 0.1 },
            { label: "الارتفاع (m)", key: "height", step: 0.1, min: 0.1 },
          ].map(({ label, key, step, min }) => (
            <div key={key} className="space-y-1.5">
              <Label className="text-xs font-medium">{label}</Label>
              <NumericInput
                min={min} step={step} fallback={min}
                value={((inputs as unknown) as Record<string, number>)[key]}
                onChange={v => onChange({ [key]: v })} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 bg-muted/40 rounded-lg p-3 text-sm">
          <div>
            <span className="text-muted-foreground text-xs">المساحة: </span>
            <span className="font-bold">{(inputs.length * inputs.width).toFixed(2)} m²</span>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">الحجم: </span>
            <span className="font-bold">{volume.toFixed(2)} m³</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "درجة الحرارة الداخلية (°C)", key: "tempIn", step: 0.5, fallback: 0 },
            { label: "درجة الحرارة الخارجية (°C)", key: "tempOut", step: 0.5, fallback: 0 },
            { label: "درجة حرارة الأرض (°C)", key: "groundTemp", step: 0.5, fallback: 0 },
          ].map(({ label, key, step, fallback }) => (
            <div key={key} className="space-y-1.5">
              <Label className="text-xs font-medium">{label}</Label>
              <NumericInput
                step={step} fallback={fallback}
                value={((inputs as unknown) as Record<string, number>)[key]}
                onChange={v => onChange({ [key]: v })} />
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-medium">شروط تصميم المدينة — جدول 2-4</Label>
          <Select onValueChange={v => {
            const city = SAUDI_CITIES.find(c => c.id === v);
            if (city) onChange({ tempOut: city.tempDryBulb });
          }}>
            <SelectTrigger>
              <SelectValue placeholder="اختر مدينة للتعبئة التلقائية لدرجة الخارج..." />
            </SelectTrigger>
            <SelectContent>
              {SAUDI_CITIES.map(c => (
                <SelectItem key={c.id} value={c.id}>
                  {c.nameAr} — جاف: {c.tempDryBulb}°C | رطب: {c.tempWetBulb}°C
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3 rounded-lg border p-3">
          <Label className="text-xs font-medium min-w-fit">موقع الغرفة:</Label>
          <div className="flex items-center gap-3">
            <span className={`text-xs ${inputs.roomLocation === "ground" ? "font-bold text-primary" : "text-muted-foreground"}`}>
              أرضي (يستخدم درجة الأرض)
            </span>
            <Switch
              checked={inputs.roomLocation === "elevated"}
              onCheckedChange={v => onChange({ roomLocation: v ? "elevated" : "ground" })} />
            <span className={`text-xs ${inputs.roomLocation === "elevated" ? "font-bold text-primary" : "text-muted-foreground"}`}>
              مرتفع (يستخدم درجة الخارج)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t pt-3">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">معامل الأمان (%)</Label>
            <NumericInput min={0} max={50} step={1} fallback={0}
              value={inputs.safetyFactor}
              onChange={v => onChange({ safetyFactor: v })} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">ساعات تشغيل المنظومة / يوم</Label>
            <NumericInput min={1} max={24} step={1} fallback={18}
              value={inputs.operatingHours}
              onChange={v => onChange({ operatingHours: v })} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
