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
import { Layers, Plus, Trash2 } from "lucide-react";
import { MATERIALS, getMaterialK } from "@/data/materials";
import type { CalculationInputs, WallLayer } from "@/types/inputs";

interface Props {
  inputs: CalculationInputs;
  onChange: (field: string, value: number | string) => void;
}

interface LayerEditorProps {
  title: string;
  colorClass: string;
  titleColorClass: string;
  iconColorClass: string;
  addBtnColor: string;
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

function LayerRow({
  layer,
  index,
  total,
  onMaterialChange,
  onThicknessChange,
  onDelete,
}: {
  layer: WallLayer;
  index: number;
  total: number;
  onMaterialChange: (v: string) => void;
  onThicknessChange: (v: number) => void;
  onDelete: () => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">الطبقة {index + 1}</span>
        {total > 1 && (
          <button
            type="button"
            onClick={onDelete}
            className="text-red-400 hover:text-red-600 transition-colors p-0.5 rounded"
            title="حذف الطبقة"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="shrink-0 w-14 text-center bg-slate-100 rounded-md border border-slate-200 py-1 px-1">
          <div className="text-[9px] text-slate-400">k</div>
          <div className="text-xs font-mono font-semibold text-slate-700">{layer.k}</div>
        </div>
        <div className="shrink-0 w-20 text-center">
          <div className="text-[10px] text-slate-400 mb-0.5">السُّمك (m)</div>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={layer.thickness}
            onChange={(e) => onThicknessChange(parseFloat(e.target.value) || 0)}
            className="h-9 text-xs text-center font-mono"
            dir="ltr"
          />
        </div>
        <Select value={layer.materialId} onValueChange={onMaterialChange}>
          <SelectTrigger className="h-9 text-xs flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-64">
            {MATERIALS.map((m) => (
              <SelectItem key={m.id} value={m.id} className="text-xs">
                {m.name} (k={m.k})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function ConstructionLayerEditor({
  title,
  colorClass,
  titleColorClass,
  iconColorClass,
  addBtnColor,
  layers,
  hi,
  ho,
  onLayersChange,
  onHiChange,
  onHoChange,
}: LayerEditorProps) {
  const updateLayer = (index: number, field: keyof WallLayer, value: string | number) => {
    const newLayers = [...layers];
    if (field === "materialId") {
      newLayers[index] = { ...newLayers[index], materialId: value as string, k: getMaterialK(value as string) };
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
    <Card className={`border-${colorClass}-200 shadow-sm`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          {title && (
            <CardTitle className={`text-base flex items-center gap-2 ${titleColorClass}`}>
              <Layers className={`w-4 h-4 ${iconColorClass} shrink-0`} />
              {title}
            </CardTitle>
          )}
          {!title && <div />}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addLayer}
            className={`h-7 text-xs px-2 gap-1 shrink-0 ${addBtnColor}`}
          >
            <Plus className="w-3 h-3" />
            إضافة طبقة
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {layers.map((layer, index) => (
          <LayerRow
            key={index}
            layer={layer}
            index={index}
            total={layers.length}
            onMaterialChange={(v) => updateLayer(index, "materialId", v)}
            onThicknessChange={(v) => updateLayer(index, "thickness", v)}
            onDelete={() => deleteLayer(index)}
          />
        ))}

        <Separator className="my-1" />

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs font-medium text-slate-600">
              معامل الداخلي <span className="text-slate-400 font-mono">(hi)</span>
            </Label>
            <Input
              type="number" step="0.1" value={hi}
              onChange={(e) => onHiChange(parseFloat(e.target.value) || 0)}
              className="h-9 text-xs text-center font-mono" dir="ltr"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-medium text-slate-600">
              معامل الخارجي <span className="text-slate-400 font-mono">(ho)</span>
            </Label>
            <Input
              type="number" step="0.1" value={ho}
              onChange={(e) => onHoChange(parseFloat(e.target.value) || 0)}
              className="h-9 text-xs text-center font-mono" dir="ltr"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ConstructionSection({ inputs, onChange }: Props) {
  return (
    <div className="space-y-4">
      <label htmlFor="considerRoofFloor" className="flex items-center gap-3 cursor-pointer select-none py-1">
        <span className="text-sm font-medium flex-1">أخذ تأثير السقف والأرضية بالحسبان؟</span>
        <input type="checkbox" id="considerRoofFloor"
          checked={inputs.considerRoofFloor === 1}
          onChange={(e) => onChange("considerRoofFloor", e.target.checked ? 1 : 0)}
          className="w-5 h-5 rounded border-gray-300 accent-blue-600 shrink-0"
        />
      </label>

      {inputs.considerRoofFloor === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ConstructionLayerEditor
            title="طبقات السقف"
            colorClass="rose" titleColorClass="text-rose-800" iconColorClass="text-rose-600"
            addBtnColor="border-rose-300 text-rose-700 hover:bg-rose-50"
            layers={inputs.roofLayers} hi={inputs.roofHi} ho={inputs.roofHo}
            onLayersChange={(layers) => onChange("roofLayers", layers as any)}
            onHiChange={(val) => onChange("roofHi", val)}
            onHoChange={(val) => onChange("roofHo", val)}
          />
          <ConstructionLayerEditor
            title="طبقات الأرضية"
            colorClass="emerald" titleColorClass="text-emerald-800" iconColorClass="text-emerald-600"
            addBtnColor="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            layers={inputs.floorLayers} hi={inputs.floorHi} ho={inputs.floorHo}
            onLayersChange={(layers) => onChange("floorLayers", layers as any)}
            onHiChange={(val) => onChange("floorHi", val)}
            onHoChange={(val) => onChange("floorHo", val)}
          />
        </div>
      )}

      <Separator />

      <label htmlFor="considerWalls" className="flex items-center gap-3 cursor-pointer select-none py-1">
        <span className="text-sm font-medium flex-1">أخذ حمل الجدران بالحسبان؟</span>
        <input type="checkbox" id="considerWalls"
          checked={inputs.considerWalls === 1}
          onChange={(e) => onChange("considerWalls", e.target.checked ? 1 : 0)}
          className="w-5 h-5 rounded border-gray-300 accent-blue-600 shrink-0"
        />
      </label>

      {inputs.considerWalls === 1 && (
        <Card className="border-indigo-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-indigo-800 font-display">
              طبقات الجدران (الشمالي / الجنوبي / الشرقي / الغربي)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ConstructionLayerEditor
              title="" colorClass="indigo" titleColorClass="text-indigo-800" iconColorClass="text-indigo-600"
              addBtnColor="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
              layers={inputs.wallLayers} hi={inputs.wallHi} ho={inputs.wallHo}
              onLayersChange={(layers) => onChange("wallLayers", layers as any)}
              onHiChange={(val) => onChange("wallHi", val)}
              onHoChange={(val) => onChange("wallHo", val)}
            />

            <Separator />

            <div>
              <div className="text-xs font-medium text-slate-500 mb-2">قيمة ho لكل اتجاه</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "northWallHo", label: "الشمالي", val: inputs.northWallHo },
                  { key: "southWallHo", label: "الجنوبي", val: inputs.southWallHo },
                  { key: "eastWallHo",  label: "الشرقي",  val: inputs.eastWallHo  },
                  { key: "westWallHo",  label: "الغربي",  val: inputs.westWallHo  },
                ].map(({ key, label, val }) => (
                  <div key={key} className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-600">
                      {label} <span className="text-slate-400 font-mono">(ho)</span>
                    </span>
                    <Input
                      type="number" step="0.1" value={val}
                      onChange={(e) => onChange(key, parseFloat(e.target.value) || 0)}
                      className="h-8 text-xs text-center font-mono w-20 shrink-0" dir="ltr"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
