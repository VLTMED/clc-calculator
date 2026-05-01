import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Layers, Plus, Trash2, GripVertical } from "lucide-react";
import { MATERIALS, getMaterialK } from "@/data/materials";
import type { CalculationInputs, WallLayer } from "@/types/inputs";

interface Props {
  inputs: CalculationInputs;
  onChange: (field: string, value: number | string) => void;
}

interface LayerEditorProps {
  title: string;
  accentColor: "rose" | "emerald" | "indigo";
  layers: WallLayer[];
  hi: number;
  ho: number;
  onLayersChange: (layers: WallLayer[]) => void;
  onHiChange: (val: number) => void;
  onHoChange: (val: number) => void;
}

const DEFAULT_LAYER: WallLayer = {
  materialId: "poly_smooth",
  thickness: 0.05,
  k: 0.029,
};

const ACCENT_MAP = {
  rose: {
    card: "border-rose-200 bg-rose-50/30",
    header: "text-rose-800",
    icon: "text-rose-500",
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    addBtn: "border-rose-300 text-rose-700 hover:bg-rose-100 hover:border-rose-400",
    layerCard: "bg-white border-rose-100 shadow-sm",
    layerNum: "bg-rose-100 text-rose-700",
    kBadge: "bg-rose-50 text-rose-800 border-rose-200",
  },
  emerald: {
    card: "border-emerald-200 bg-emerald-50/30",
    header: "text-emerald-800",
    icon: "text-emerald-500",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    addBtn: "border-emerald-300 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400",
    layerCard: "bg-white border-emerald-100 shadow-sm",
    layerNum: "bg-emerald-100 text-emerald-700",
    kBadge: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  indigo: {
    card: "border-indigo-200 bg-indigo-50/30",
    header: "text-indigo-800",
    icon: "text-indigo-500",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
    addBtn: "border-indigo-300 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-400",
    layerCard: "bg-white border-indigo-100 shadow-sm",
    layerNum: "bg-indigo-100 text-indigo-700",
    kBadge: "bg-indigo-50 text-indigo-800 border-indigo-200",
  },
};

function LayerCard({
  layer,
  index,
  total,
  accent,
  onMaterialChange,
  onThicknessChange,
  onDelete,
}: {
  layer: WallLayer;
  index: number;
  total: number;
  accent: typeof ACCENT_MAP["rose"];
  onMaterialChange: (v: string) => void;
  onThicknessChange: (v: number) => void;
  onDelete: () => void;
}) {
  return (
    <div className={`rounded-xl border p-3 sm:p-4 transition-all ${accent.layerCard}`}>
      {/* Layer header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-slate-300 shrink-0" />
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${accent.layerNum}`}>
            طبقة {index + 1}
          </span>
        </div>
        {total > 1 && (
          <button
            type="button"
            onClick={onDelete}
            aria-label="حذف الطبقة"
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200 px-2 py-1 rounded-lg transition-all active:scale-95"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">حذف</span>
          </button>
        )}
      </div>

      {/* Material selector — full width for mobile */}
      <div className="mb-3">
        <Label className="text-xs text-slate-500 mb-1 block">المادة</Label>
        <Select value={layer.materialId} onValueChange={onMaterialChange}>
          <SelectTrigger className="h-11 text-sm w-full bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {MATERIALS.map((m) => (
              <SelectItem key={m.id} value={m.id} className="text-sm">
                <span>{m.name}</span>
                <span className="text-slate-400 text-xs ms-2 font-mono">(k = {m.k})</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Thickness + K value — side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">
            السُّمك
            <span className="text-slate-400 font-mono ms-1">(m)</span>
          </Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={layer.thickness}
            onChange={(e) => onThicknessChange(parseFloat(e.target.value) || 0)}
            className="h-11 text-sm text-center font-mono bg-white"
            dir="ltr"
          />
        </div>
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">
            معامل التوصيل
            <span className="text-slate-400 font-mono ms-1">(k)</span>
          </Label>
          <div className={`h-11 flex items-center justify-center rounded-lg border text-sm font-mono font-bold ${accent.kBadge}`}>
            {layer.k}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConstructionLayerEditor({
  title,
  accentColor,
  layers,
  hi,
  ho,
  onLayersChange,
  onHiChange,
  onHoChange,
}: LayerEditorProps) {
  const accent = ACCENT_MAP[accentColor];

  const updateLayer = (index: number, field: keyof WallLayer, value: string | number) => {
    const newLayers = [...layers];
    if (field === "materialId") {
      newLayers[index] = {
        ...newLayers[index],
        materialId: value as string,
        k: getMaterialK(value as string),
      };
    } else {
      newLayers[index] = { ...newLayers[index], [field]: value as number };
    }
    onLayersChange(newLayers);
  };

  const addLayer = () => onLayersChange([...layers, { ...DEFAULT_LAYER }]);

  const deleteLayer = (index: number) => {
    if (layers.length <= 1) return;
    onLayersChange(layers.filter((_, i) => i !== index));
  };

  return (
    <Card className={`border shadow-sm ${accent.card}`}>
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex items-center justify-between gap-2">
          {title ? (
            <CardTitle className={`text-base flex items-center gap-2 ${accent.header}`}>
              <Layers className={`w-4 h-4 shrink-0 ${accent.icon}`} />
              {title}
              <span className={`text-xs font-normal border px-2 py-0.5 rounded-full ms-1 ${accent.badge}`}>
                {layers.length} {layers.length === 1 ? "طبقة" : "طبقات"}
              </span>
            </CardTitle>
          ) : (
            <div className={`flex items-center gap-2 ${accent.header}`}>
              <Layers className={`w-4 h-4 ${accent.icon}`} />
              <span className={`text-xs border px-2 py-0.5 rounded-full ${accent.badge}`}>
                {layers.length} {layers.length === 1 ? "طبقة" : "طبقات"}
              </span>
            </div>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addLayer}
            className={`h-9 text-xs px-3 gap-1.5 shrink-0 font-bold transition-all active:scale-95 ${accent.addBtn}`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>إضافة طبقة</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 space-y-3">
        {/* Layer cards */}
        {layers.map((layer, index) => (
          <LayerCard
            key={index}
            layer={layer}
            index={index}
            total={layers.length}
            accent={accent}
            onMaterialChange={(v) => updateLayer(index, "materialId", v)}
            onThicknessChange={(v) => updateLayer(index, "thickness", v)}
            onDelete={() => deleteLayer(index)}
          />
        ))}

        <Separator className="my-3" />

        {/* Surface coefficients */}
        <div>
          <p className="text-xs font-medium text-slate-500 mb-2.5">معاملات سطح الانتقال الحراري</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-slate-600 mb-1 block">
                داخلي
                <span className="text-slate-400 font-mono ms-1">(hi)</span>
              </Label>
              <Input
                type="number"
                step="0.1"
                value={hi}
                onChange={(e) => onHiChange(parseFloat(e.target.value) || 0)}
                className="h-11 text-sm text-center font-mono bg-white"
                dir="ltr"
              />
            </div>
            <div>
              <Label className="text-xs text-slate-600 mb-1 block">
                خارجي
                <span className="text-slate-400 font-mono ms-1">(ho)</span>
              </Label>
              <Input
                type="number"
                step="0.1"
                value={ho}
                onChange={(e) => onHoChange(parseFloat(e.target.value) || 0)}
                className="h-11 text-sm text-center font-mono bg-white"
                dir="ltr"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ConstructionSection({ inputs, onChange }: Props) {
  return (
    <div className="space-y-4">
      {/* Roof / Floor toggle */}
      <label
        htmlFor="considerRoofFloor"
        className="flex items-center justify-between gap-3 cursor-pointer select-none bg-white border border-slate-200 rounded-xl px-4 py-3.5 shadow-sm hover:border-slate-300 transition-colors"
      >
        <span className="text-sm font-medium text-slate-800 leading-snug">
          أخذ تأثير السقف والأرضية بالحسبان؟
        </span>
        <input
          type="checkbox"
          id="considerRoofFloor"
          checked={inputs.considerRoofFloor === 1}
          onChange={(e) => onChange("considerRoofFloor", e.target.checked ? 1 : 0)}
          className="w-5 h-5 rounded border-gray-300 accent-rose-600 shrink-0 cursor-pointer"
        />
      </label>

      {inputs.considerRoofFloor === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ConstructionLayerEditor
            title="طبقات السقف"
            accentColor="rose"
            layers={inputs.roofLayers}
            hi={inputs.roofHi}
            ho={inputs.roofHo}
            onLayersChange={(layers) => onChange("roofLayers", layers as any)}
            onHiChange={(val) => onChange("roofHi", val)}
            onHoChange={(val) => onChange("roofHo", val)}
          />
          <ConstructionLayerEditor
            title="طبقات الأرضية"
            accentColor="emerald"
            layers={inputs.floorLayers}
            hi={inputs.floorHi}
            ho={inputs.floorHo}
            onLayersChange={(layers) => onChange("floorLayers", layers as any)}
            onHiChange={(val) => onChange("floorHi", val)}
            onHoChange={(val) => onChange("floorHo", val)}
          />
        </div>
      )}

      <Separator />

      {/* Walls toggle */}
      <label
        htmlFor="considerWalls"
        className="flex items-center justify-between gap-3 cursor-pointer select-none bg-white border border-slate-200 rounded-xl px-4 py-3.5 shadow-sm hover:border-slate-300 transition-colors"
      >
        <span className="text-sm font-medium text-slate-800 leading-snug">
          أخذ حمل الجدران بالحسبان؟
        </span>
        <input
          type="checkbox"
          id="considerWalls"
          checked={inputs.considerWalls === 1}
          onChange={(e) => onChange("considerWalls", e.target.checked ? 1 : 0)}
          className="w-5 h-5 rounded border-gray-300 accent-indigo-600 shrink-0 cursor-pointer"
        />
      </label>

      {inputs.considerWalls === 1 && (
        <div className="space-y-4">
          <ConstructionLayerEditor
            title="طبقات الجدران"
            accentColor="indigo"
            layers={inputs.wallLayers}
            hi={inputs.wallHi}
            ho={inputs.wallHo}
            onLayersChange={(layers) => onChange("wallLayers", layers as any)}
            onHiChange={(val) => onChange("wallHi", val)}
            onHoChange={(val) => onChange("wallHo", val)}
          />

          {/* Directional ho values */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                قيمة الـ ho لكل اتجاه جداري
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "northWallHo", label: "الشمالي",  icon: "↑", val: inputs.northWallHo },
                  { key: "southWallHo", label: "الجنوبي",  icon: "↓", val: inputs.southWallHo },
                  { key: "eastWallHo",  label: "الشرقي",   icon: "←", val: inputs.eastWallHo  },
                  { key: "westWallHo",  label: "الغربي",   icon: "→", val: inputs.westWallHo  },
                ].map(({ key, label, icon, val }) => (
                  <div key={key} className="bg-slate-50 rounded-xl border border-slate-100 p-3">
                    <Label className="text-xs text-slate-600 mb-1.5 flex items-center gap-1.5">
                      <span className="text-slate-400 font-mono text-base leading-none">{icon}</span>
                      {label}
                      <span className="text-slate-400 font-mono">(ho)</span>
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={val}
                      onChange={(e) => onChange(key, parseFloat(e.target.value) || 0)}
                      className="h-10 text-sm text-center font-mono bg-white"
                      dir="ltr"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
