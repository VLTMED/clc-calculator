import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
            { label: "الطول/عرض الشمال (m)", key: "length" },
            { label: "العرض/طول الشرق (m)", key: "width" },
            { label: "الارتفاع (m)", key: "height" },
          ].map(({ label, key }) => (
            <div key={key} className="space-y-1">
              <Label className="text-xs">{label}</Label>
              <Input type="number" min={0.1} step={0.1}
                value={(inputs as Record<string, number>)[key]}
                onChange={e => onChange({ [key]: parseFloat(e.target.value) || 0 })} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 bg-muted/40 rounded p-3 text-sm">
          <div><span className="text-muted-foreground">المساحة: </span><span className="font-bold">{(inputs.length * inputs.width).toFixed(2)} m²</span></div>
          <div><span className="text-muted-foreground">الحجم: </span><span className="font-bold">{volume.toFixed(2)} m³</span></div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "درجة الحرارة الداخلية (°C)", key: "tempIn" },
            { label: "درجة الحرارة الخارجية (°C)", key: "tempOut" },
            { label: "درجة حرارة الأرض (°C)", key: "groundTemp" },
          ].map(({ label, key }) => (
            <div key={key} className="space-y-1">
              <Label className="text-xs">{label}</Label>
              <Input type="number" step={0.5}
                value={(inputs as Record<string, number>)[key]}
                onChange={e => onChange({ [key]: parseFloat(e.target.value) || 0 })} />
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <Label className="text-xs">شروط تصميم المدينة — جدول 2-4</Label>
          <Select onValueChange={v => {
            const city = SAUDI_CITIES.find(c => c.id === v);
            if (city) onChange({ tempOut: city.tempDryBulb });
          }}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="اختر مدينة للتعبئة التلقائية..." />
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

        <div className="flex items-center gap-4 py-1">
          <Label className="text-xs min-w-fit">موقع الغرفة:</Label>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${inputs.roomLocation === "ground" ? "font-bold" : "text-muted-foreground"}`}>أرضي (تستخدم درجة الأرض)</span>
            <Switch checked={inputs.roomLocation === "elevated"}
              onCheckedChange={v => onChange({ roomLocation: v ? "elevated" : "ground" })} />
            <span className={`text-xs ${inputs.roomLocation === "elevated" ? "font-bold" : "text-muted-foreground"}`}>مرتفع (يستخدم درجة الخارج)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t pt-3">
          <div className="space-y-1">
            <Label className="text-xs">معامل الأمان (%)</Label>
            <Input type="number" min={0} max={50}
              value={inputs.safetyFactor}
              onChange={e => onChange({ safetyFactor: parseFloat(e.target.value) || 0 })} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">ساعات تشغيل المنظومة / يوم</Label>
            <Input type="number" min={1} max={24}
              value={inputs.operatingHours}
              onChange={e => onChange({ operatingHours: parseFloat(e.target.value) || 18 })} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
