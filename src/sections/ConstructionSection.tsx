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
import { Layers, Info } from "lucide-react";
import { MATERIALS, getMaterialK } from "@/data/materials";
import type { CalculationInputs, WallLayer } from "@/types/inputs";

interface Props {
  inputs: CalculationInputs;
  onChange: (field: string, value: number | string) => void;
}

interface LayerEditorProps {
  title: string;
  color: string;
  layers: WallLayer[];
  hi: number;
  ho: number;
  onLayersChange: (layers: WallLayer[]) => void;
  onHiChange: (val: number) => void;
  onHoChange: (val: number) => void;
}

function ConstructionLayerEditor({
  title,
  color,
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

  return (
    <Card className={`border-${color}-200 shadow-sm`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-base flex items-center gap-2 text-${color}-800`}>
          <Layers className={`w-4 h-4 text-${color}-600`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {layers.map((layer, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-7 space-y-1">
              <Label className="text-xs">الطبقة {index + 1}</Label>
              <Select
                value={layer.materialId}
                onValueChange={(v) => updateLayer(index, "materialId", v)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MATERIALS.map((m) => (
                    <SelectItem key={m.id} value={m.id} className="text-xs">
                      {m.name} (k={m.k})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-3 space-y-1">
              <Label className="text-xs">السمك (m)</Label>
              <Input
                type="number"
                step="0.01"
                value={layer.thickness}
                onChange={(e) =>
                  updateLayer(index, "thickness", parseFloat(e.target.value) || 0)
                }
                className="h-8 text-xs text-start"
              />
            </div>
            <div className="col-span-2">
              <Badge variant="outline" className="text-xs w-full justify-center">
                k={layer.k}
              </Badge>
            </div>
          </div>
        ))}

        <Separator className="my-2" />

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1 font-sans">
              <Info className="w-3 h-3" />
              hi (داخلي)
            </Label>
            <Input
              type="number"
              step="0.1"
              value={hi}
              onChange={(e) => onHiChange(parseFloat(e.target.value) || 0)}
              className="h-8 text-xs text-start"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1 font-sans">
              <Info className="w-3 h-3" />
              ho (خارجي)
            </Label>
            <Input
              type="number"
              step="0.1"
              value={ho}
              onChange={(e) => onHoChange(parseFloat(e.target.value) || 0)}
              className="h-8 text-xs text-start"
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
      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          id="considerRoofFloor"
          checked={inputs.considerRoofFloor === 1}
          onChange={(e) =>
            onChange("considerRoofFloor", e.target.checked ? 1 : 0)
          }
          className="w-4 h-4 rounded border-gray-300"
        />
        <Label htmlFor="considerRoofFloor" className="text-sm font-medium cursor-pointer">
          أخذ تأثير السقف والأرضية بالحسبان؟ (1=نعم, 0=لا)
        </Label>
      </div>

      {inputs.considerRoofFloor === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ConstructionLayerEditor
            title="طبقات السقف"
            color="rose"
            layers={inputs.roofLayers}
            hi={inputs.roofHi}
            ho={inputs.roofHo}
            onLayersChange={(layers) => onChange("roofLayers", layers as any)}
            onHiChange={(val) => onChange("roofHi", val)}
            onHoChange={(val) => onChange("roofHo", val)}
          />
          <ConstructionLayerEditor
            title="طبقات الأرضية"
            color="emerald"
            layers={inputs.floorLayers}
            hi={inputs.floorHi}
            ho={inputs.floorHo}
            onLayersChange={(layers) =>
              onChange("floorLayers", layers as any)
            }
            onHiChange={(val) => onChange("floorHi", val)}
            onHoChange={(val) => onChange("floorHo", val)}
          />
        </div>
      )}

      <Separator />

      {/* Walls */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="considerWalls"
            checked={inputs.considerWalls === 1}
            onChange={(e) =>
              onChange("considerWalls", e.target.checked ? 1 : 0)
            }
            className="w-4 h-4 rounded border-gray-300"
          />
          <Label htmlFor="considerWalls" className="text-sm font-medium cursor-pointer">
            أخذ حمل الجدران بالحسبان؟
          </Label>
        </div>

        {inputs.considerWalls === 1 && (
          <Card className="border-indigo-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-indigo-800 font-display">
                طبقات الجدران (الشمالي / الجنوبي / الشرقي / الغربي)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ConstructionLayerEditor
                title=""
                color="indigo"
                layers={inputs.wallLayers}
                hi={inputs.wallHi}
                ho={inputs.wallHo}
                onLayersChange={(layers) =>
                  onChange("wallLayers", layers as any)
                }
                onHiChange={(val) => onChange("wallHi", val)}
                onHoChange={(val) => onChange("wallHo", val)}
              />

              <Separator />

              {/* Direction-specific ho values */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { key: "north", label: "الشمالي", val: inputs.northWallHo },
                  { key: "south", label: "الجنوبي", val: inputs.southWallHo },
                  { key: "east", label: "الشرقي", val: inputs.eastWallHo },
                  { key: "west", label: "الغربي", val: inputs.westWallHo },
                ].map((dir) => (
                  <div key={dir.key} className="space-y-1">
                    <Label className="text-xs">ho {dir.label}</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={dir.val}
                      onChange={(e) =>
                        onChange(
                          `${dir.key}WallHo`,
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="h-8 text-xs text-start"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
