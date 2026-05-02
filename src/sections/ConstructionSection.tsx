import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import type { CLCInputs, SurfaceConfig, WallConfig, WallDirection, BuildingLayer } from "@/types/inputs";
import { MATERIALS, ABSORPTANCE_MATERIALS } from "@/data/tables";
import { calcU } from "@/engine/fullCalculator";

interface Props {
  inputs: CLCInputs;
  onChange: (partial: Partial<CLCInputs>) => void;
}

// ─── مكوّن الطبقات ────────────────────────────────────────────────
function LayersEditor({
  layers, hi, ho,
  onLayersChange,
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
      {layers.map((layer, i) => {
        return (
          <div key={i} className="grid grid-cols-[1fr_100px_32px] gap-1 items-end">
            <div className="space-y-0.5">
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
            <div className="space-y-0.5">
              {i === 0 && <Label className="text-[10px] text-muted-foreground">السُمك (m)</Label>}
              <Input className="h-8 text-xs" type="number" min={0.001} step={0.01}
                value={layer.thickness}
                onChange={e => updateLayer(i, { thickness: parseFloat(e.target.value) || 0 })} />
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8"
              onClick={() => removeLayer(i)}>
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </div>
        );
      })}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={addLayer}>
          <PlusCircle className="h-3.5 w-3.5" /> إضافة طبقة
        </Button>
        <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded">
          U = {U.toFixed(4)} W/m²·K
        </span>
      </div>
    </div>
  );
}

// ─── مكوّن السطح (سقف / أرضية) ───────────────────────────────────
function SurfaceEditor({
  label, surface, onChange, showSolar = false
}: {
  label: string;
  surface: SurfaceConfig;
  onChange: (patch: Partial<SurfaceConfig>) => void;
  showSolar?: boolean;
}) {
  return (
    <div className="border rounded p-3 space-y-3">
      <div className="flex items-center gap-2">
        <Switch checked={surface.enabled} onCheckedChange={v => onChange({ enabled: v })} />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      {surface.enabled && (
        <>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">hi (W/m²·K)</Label>
              <Input type="number" step={0.1} className="h-8 text-xs"
                value={surface.hi}
                onChange={e => onChange({ hi: parseFloat(e.target.value) || 8 })} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">ho (W/m²·K)</Label>
              <Input type="number" step={0.1} className="h-8 text-xs"
                value={surface.ho}
                onChange={e => onChange({ ho: parseFloat(e.target.value) || 22.7 })} />
            </div>
          </div>
          <LayersEditor
            layers={surface.layers} hi={surface.hi} ho={surface.ho}
            onLayersChange={layers => onChange({ layers })} />
          {showSolar && (
            <div className="border-t pt-2 space-y-2">
              <div className="flex items-center gap-2">
                <Switch checked={surface.solarEnabled}
                  onCheckedChange={v => onChange({ solarEnabled: v })} />
                <Label className="text-xs">تأثير الشمس — جدول 2-16A</Label>
              </div>
              {surface.solarEnabled && (
                <div className="space-y-1">
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

// ─── مكوّن الجدار ──────────────────────────────────────────────────
function WallEditor({
  label, wall, onChange
}: {
  label: string;
  wall: WallConfig;
  onChange: (patch: Partial<WallConfig>) => void;
}) {
  return (
    <div className="border rounded p-3 space-y-3">
      <div className="flex items-center gap-2">
        <Switch checked={wall.enabled} onCheckedChange={v => onChange({ enabled: v })} />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      {wall.enabled && (
        <>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">hi (W/m²·K)</Label>
              <Input type="number" step={0.1} className="h-8 text-xs"
                value={wall.hi}
                onChange={e => onChange({ hi: parseFloat(e.target.value) || 8 })} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">ho (W/m²·K)</Label>
              <Input type="number" step={0.1} className="h-8 text-xs"
                value={wall.ho}
                onChange={e => onChange({ ho: parseFloat(e.target.value) || 22.7 })} />
            </div>
          </div>
          <LayersEditor
            layers={wall.layers} hi={wall.hi} ho={wall.ho}
            onLayersChange={layers => onChange({ layers })} />
          <div className="border-t pt-2 space-y-2">
            <div className="flex items-center gap-2">
              <Switch checked={wall.solarEnabled}
                onCheckedChange={v => onChange({ solarEnabled: v })} />
              <Label className="text-xs">تأثير الشمس — جدول 2-16A</Label>
            </div>
            {wall.solarEnabled && (
              <div className="space-y-1">
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

// ─── المكوّن الرئيسي ───────────────────────────────────────────────
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
          🏗️ بناء الجدران والسقف والأرضية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/30 p-2 rounded">
          جدول 2-1 — معامل التوصيل الحراري k (W/m·K) | جدول 2-2 — hi/ho | المعادلة: U = 1/(1/hi + Σ(L/k) + 1/ho)
        </p>

        {/* السقف */}
        <SurfaceEditor
          label="السقف"
          surface={inputs.roof}
          onChange={patch => onChange({ roof: { ...inputs.roof, ...patch } })}
          showSolar />

        {/* الأرضية */}
        <SurfaceEditor
          label="الأرضية"
          surface={inputs.floor}
          onChange={patch => onChange({ floor: { ...inputs.floor, ...patch } })} />

        {/* الجدران */}
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
