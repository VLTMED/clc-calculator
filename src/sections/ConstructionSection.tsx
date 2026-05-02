import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumericInput } from "@/components/ui/numeric-input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Layers } from "lucide-react";
import type { CLCInputs, SurfaceConfig, WallConfig, WallDirection, BuildingLayer } from "@/types/inputs";
import { MATERIALS, ABSORPTANCE_MATERIALS } from "@/data/tables";
import { calcU } from "@/engine/fullCalculator";

interface Props {
  inputs: CLCInputs;
  onChange: (partial: Partial<CLCInputs>) => void;
}

function LayersEditor({
  layers, hi, ho, onLayersChange,
}: {
  layers: BuildingLayer[];
  hi: number; ho: number;
  onLayersChange: (layers: BuildingLayer[]) => void;
}) {
  const U = calcU(hi, ho, layers);

  const addLayer = () => onLayersChange([...layers, { materialId: MATERIALS[0].id, thickness: 0.1 }]);
  const removeLayer = (i: number) => onLayersChange(layers.filter((_, idx) => idx !== i));
  const updateLayer = (i: number, patch: Partial<BuildingLayer>) =>
    onLayersChange(layers.map((l, idx) => idx === i ? { ...l, ...patch } : l));

  return (
    <div className="space-y-2">
      {layers.map((layer, i) => (
        <div key={i} className="grid grid-cols-[1fr_90px_36px] gap-2 items-end">
          <div className="space-y-1">
            {i === 0 && <Label className="text-[10px] text-muted-foreground">المادة</Label>}
            <Select value={layer.materialId} onValueChange={v => updateLayer(i, { materialId: v })}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MATERIALS.map(m => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.nameAr} (k={m.k})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            {i === 0 && <Label className="text-[10px] text-muted-foreground">السُمك (m)</Label>}
            <NumericInput
              className="h-8 text-xs"
              min={0.001} step={0.01} fallback={0.1}
              value={layer.thickness}
              onChange={v => updateLayer(i, { thickness: v })} />
          </div>
          <div className={i === 0 ? "pt-4" : ""}>
            <Button variant="ghost" size="icon" className="h-8 w-8"
              onClick={() => removeLayer(i)}>
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between pt-1">
        <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5" onClick={addLayer}>
          <PlusCircle className="h-3.5 w-3.5" /> إضافة طبقة
        </Button>
        <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded-md">
          U = {U.toFixed(4)} W/m²·K
        </span>
      </div>
    </div>
  );
}

const HI_OPTIONS = [
  { value: "9.37", label: "9.37 — أفقي / حرارة أعلى (سقف)" },
  { value: "8",    label: "8.00 — رأسي / حرارة أفقياً (جدار)" },
  { value: "6",    label: "6.00 — أفقي / حرارة أسفل (أرضية)" },
];
const HO_OPTIONS = [
  { value: "22.7", label: "22.70 — هواء عادي 3.4 م/ث" },
  { value: "34.1", label: "34.10 — هواء سريع 6.7 م/ث" },
];

function hiToStr(v: number) {
  if (Math.abs(v - 9.37) < 0.01) return "9.37";
  if (Math.abs(v - 8)    < 0.01) return "8";
  if (Math.abs(v - 6)    < 0.01) return "6";
  return "8";
}
function hoToStr(v: number) {
  if (Math.abs(v - 34.1) < 0.05) return "34.1";
  return "22.7";
}

function SurfaceEditor({
  label, surface, onChange, showSolar = false
}: {
  label: string;
  surface: SurfaceConfig;
  onChange: (patch: Partial<SurfaceConfig>) => void;
  showSolar?: boolean;
}) {
  return (
    <div className="border rounded-lg p-3 space-y-3">
      <div className="flex items-center gap-3">
        <Switch checked={surface.enabled} onCheckedChange={v => onChange({ enabled: v })} />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      {surface.enabled && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">hi — جدول 2-2</Label>
              <Select value={hiToStr(surface.hi)} onValueChange={v => onChange({ hi: Number(v) })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {HI_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">ho — جدول 2-2</Label>
              <Select value={hoToStr(surface.ho)} onValueChange={v => onChange({ ho: Number(v) })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {HO_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <LayersEditor
            layers={surface.layers} hi={surface.hi} ho={surface.ho}
            onLayersChange={layers => onChange({ layers })} />
          {showSolar && (
            <div className="border-t pt-3 space-y-2">
              <div className="flex items-center gap-3">
                <Switch checked={surface.solarEnabled}
                  onCheckedChange={v => onChange({ solarEnabled: v })} />
                <Label className="text-xs font-medium">تأثير الشمس — جدول 2-16A</Label>
              </div>
              {surface.solarEnabled && (
                <div className="space-y-1.5">
                  <Label className="text-xs">مادة السطح الخارجي (معامل الامتصاص a)</Label>
                  <Select value={surface.absorptanceMaterialId}
                    onValueChange={v => onChange({ absorptanceMaterialId: v })}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ABSORPTANCE_MATERIALS.map(m => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.nameAr} (a={m.a})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function WallEditor({
  label, wall, onChange
}: {
  label: string;
  wall: WallConfig;
  onChange: (patch: Partial<WallConfig>) => void;
}) {
  return (
    <div className="border rounded-lg p-3 space-y-3">
      <div className="flex items-center gap-3">
        <Switch checked={wall.enabled} onCheckedChange={v => onChange({ enabled: v })} />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      {wall.enabled && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">hi — جدول 2-2</Label>
              <Select value={hiToStr(wall.hi)} onValueChange={v => onChange({ hi: Number(v) })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {HI_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">ho — جدول 2-2</Label>
              <Select value={hoToStr(wall.ho)} onValueChange={v => onChange({ ho: Number(v) })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {HO_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <LayersEditor
            layers={wall.layers} hi={wall.hi} ho={wall.ho}
            onLayersChange={layers => onChange({ layers })} />
          <div className="border-t pt-3 space-y-2">
            <div className="flex items-center gap-3">
              <Switch checked={wall.solarEnabled}
                onCheckedChange={v => onChange({ solarEnabled: v })} />
              <Label className="text-xs font-medium">تأثير الشمس — جدول 2-16A</Label>
            </div>
            {wall.solarEnabled && (
              <div className="space-y-1.5">
                <Label className="text-xs">مادة السطح الخارجي (a)</Label>
                <Select value={wall.absorptanceMaterialId}
                  onValueChange={v => onChange({ absorptanceMaterialId: v })}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ABSORPTANCE_MATERIALS.map(m => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.nameAr} (a={m.a})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function ConstructionSection({ inputs, onChange }: Props) {
  const DIRECTIONS: { key: WallDirection; label: string }[] = [
    { key: "north", label: "الجدار الشمالي" },
    { key: "south", label: "الجدار الجنوبي" },
    { key: "east",  label: "الجدار الشرقي" },
    { key: "west",  label: "الجدار الغربي" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-primary flex items-center gap-2">
          <Layers className="h-4 w-4" />
          بناء الجدران والسقف والأرضية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/30 p-2.5 rounded-lg">
          جدول 2-1 — معامل التوصيل الحراري k (W/m·K) | جدول 2-2 — hi/ho | المعادلة: U = 1/(1/hi + Σ(L/k) + 1/ho)
        </p>

        <SurfaceEditor
          label="السقف"
          surface={inputs.roof}
          onChange={patch => onChange({ roof: { ...inputs.roof, ...patch } })}
          showSolar />

        <SurfaceEditor
          label="الأرضية"
          surface={inputs.floor}
          onChange={patch => onChange({ floor: { ...inputs.floor, ...patch } })} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DIRECTIONS.map(({ key, label }) => (
            <WallEditor
              key={key}
              label={label}
              wall={inputs.walls[key]}
              onChange={patch => onChange({
                walls: { ...inputs.walls, [key]: { ...inputs.walls[key], ...patch } }
              })} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
