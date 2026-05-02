import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumericInput } from "@/components/ui/numeric-input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, AppWindow } from "lucide-react";
import type { CLCInputs, GlassConfig, WallDirection } from "@/types/inputs";
import { GLASS_TYPES, SOLAR_RADIATION_16B, SHADING_COEFFICIENTS } from "@/data/tables";

interface Props {
  inputs: CLCInputs;
  onChange: (partial: Partial<CLCInputs>) => void;
}

const DIRECTIONS: { key: WallDirection; label: string }[] = [
  { key: "north", label: "شمالي" },
  { key: "south", label: "جنوبي" },
  { key: "east",  label: "شرقي" },
  { key: "west",  label: "غربي" },
];

const SOLAR_METHODS = [
  { value: "table16A", label: "جدول 2-16A (تبريد)" },
  { value: "table16B", label: "جدول 2-16B (تكييف — بالشهر)" },
  { value: "none",     label: "بدون تأثير شمسي" },
];

const MONTHS = SOLAR_RADIATION_16B.map(r => r.month);

type ShadingTypeKey = "noShading" | "rollerLight" | "rollerDark" | "venetianLight" | "venetianMedium";

const SHADING_TYPE_LABELS: Array<{ key: ShadingTypeKey; label: string }> = [
  { key: "noShading",      label: "بدون تضليل" },
  { key: "rollerLight",    label: "ستائر ملفوفة فاتحة" },
  { key: "rollerDark",     label: "ستائر ملفوفة غامقة" },
  { key: "venetianLight",  label: "ستائر فينيسية فاتحة" },
  { key: "venetianMedium", label: "ستائر فينيسية متوسطة" },
];

function findScInit(sc: number): { rowIdx: number; type: ShadingTypeKey } {
  for (let i = 0; i < SHADING_COEFFICIENTS.length; i++) {
    for (const { key } of SHADING_TYPE_LABELS) {
      if (Math.abs(SHADING_COEFFICIENTS[i][key] - sc) < 0.001) {
        return { rowIdx: i, type: key };
      }
    }
  }
  return { rowIdx: 0, type: "noShading" };
}

function GlassRow({
  glass, index, onUpdate, onRemove
}: {
  glass: GlassConfig;
  index: number;
  onUpdate: (patch: Partial<GlassConfig>) => void;
  onRemove: () => void;
}) {
  const [scRowIdx, setScRowIdx] = useState(() => findScInit(glass.shadingCoefficient).rowIdx);
  const [scType, setScType] = useState<ShadingTypeKey>(() => findScInit(glass.shadingCoefficient).type);

  const currentScRow = SHADING_COEFFICIENTS[scRowIdx];

  const handleScRow = (val: string) => {
    const idx = Number(val);
    setScRowIdx(idx);
    const row = SHADING_COEFFICIENTS[idx];
    const newVal = row[scType];
    if (newVal > 0) {
      onUpdate({ shadingCoefficient: newVal });
    } else {
      setScType("noShading");
      onUpdate({ shadingCoefficient: row.noShading });
    }
  };

  const handleScType = (val: ShadingTypeKey) => {
    setScType(val);
    onUpdate({ shadingCoefficient: currentScRow[val] });
  };

  return (
    <div className="border rounded-lg p-3 space-y-3 bg-muted/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Switch checked={glass.enabled} onCheckedChange={v => onUpdate({ enabled: v })} />
          <span className="text-sm font-medium">نافذة / زجاج {index + 1}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onRemove}>
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
        </Button>
      </div>

      {glass.enabled && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">الاتجاه</Label>
            <Select value={glass.direction} onValueChange={v => onUpdate({ direction: v as WallDirection })}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {DIRECTIONS.map(d => <SelectItem key={d.key} value={d.key}>{d.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">المساحة (m²)</Label>
            <NumericInput className="h-8 text-xs" min={0} step={0.1} fallback={0}
              value={glass.area}
              onChange={v => onUpdate({ area: v })} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">نوع الزجاج — جدول 2-17</Label>
            <Select value={glass.glassTypeId} onValueChange={v => onUpdate({ glassTypeId: v })}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {GLASS_TYPES.map(g => (
                  <SelectItem key={g.id} value={g.id}>
                    {g.nameAr} (U={g.uSummer})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">طريقة الحمل الشمسي</Label>
            <Select value={glass.solarMethod} onValueChange={v => onUpdate({ solarMethod: v as GlassConfig["solarMethod"] })}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {SOLAR_METHODS.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* ── معامل التضليل SC — جدول 2-18B (full width) ── */}
          <div className="col-span-2 sm:col-span-3 rounded-lg border border-primary/25 bg-primary/5 p-2.5 space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">معامل التضليل SC — جدول 2-18B</Label>
              <span className="text-xs font-bold font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                SC = {glass.shadingCoefficient.toFixed(2)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-[10px] text-muted-foreground">نوع الزجاج</Label>
                <Select value={String(scRowIdx)} onValueChange={handleScRow}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SHADING_COEFFICIENTS.map((row, i) => (
                      <SelectItem key={i} value={String(i)}>
                        {row.glassType} ({row.thickness_mm}mm)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] text-muted-foreground">نوع التضليل</Label>
                <Select value={scType} onValueChange={v => handleScType(v as ShadingTypeKey)}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SHADING_TYPE_LABELS
                      .filter(({ key }) => currentScRow[key] > 0)
                      .map(({ key, label }) => (
                        <SelectItem key={key} value={key}>
                          {label} — SC = {currentScRow[key].toFixed(2)}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {glass.solarMethod === "table16B" && (
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">الشهر</Label>
              <Select value={glass.month ?? "يوليو"} onValueChange={v => onUpdate({ month: v })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {MONTHS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function GlassSection({ inputs, onChange }: Props) {
  const addGlass = () => {
    onChange({
      glasses: [
        ...inputs.glasses,
        {
          enabled: true,
          direction: "north",
          area: 1.5,
          glassTypeId: "single",
          solarMethod: "table16A",
          shadingCoefficient: 1.0,
        } satisfies GlassConfig,
      ],
    });
  };

  const updateGlass = (i: number, patch: Partial<GlassConfig>) => {
    onChange({
      glasses: inputs.glasses.map((g, idx) => idx === i ? { ...g, ...patch } : g),
    });
  };

  const removeGlass = (i: number) => {
    onChange({ glasses: inputs.glasses.filter((_, idx) => idx !== i) });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-primary flex items-center gap-2">
          <AppWindow className="h-4 w-4" />
          النوافذ والزجاج
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/30 p-2.5 rounded-lg">
          جدول 2-17: U الزجاج | جدول 2-16A/B: شدة الشمس | جدول 2-18B: معامل التضليل SC
        </p>
        {inputs.glasses.map((g, i) => (
          <GlassRow key={i} glass={g} index={i}
            onUpdate={patch => updateGlass(i, patch)}
            onRemove={() => removeGlass(i)} />
        ))}
        <Button variant="outline" className="w-full gap-2 text-sm" onClick={addGlass}>
          <PlusCircle className="h-4 w-4" /> إضافة نافذة / زجاجية
        </Button>
      </CardContent>
    </Card>
  );
}
