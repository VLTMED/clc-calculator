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
import { Lightbulb, Users, Wrench, Clock } from "lucide-react";
import { PEOPLE_HEAT_AC, getPeopleHeatRefrig } from "@/data/ventilation";
import type { CalculationInputs } from "@/types/inputs";

interface Props {
  inputs: CalculationInputs;
  onChange: (field: string, value: number | string) => void;
}

export function InternalLoadsSection({ inputs, onChange }: Props) {
  return (
    <div className="space-y-4">
      {/* Lighting */}
      <Card className="border-yellow-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-yellow-800">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            حمل الإضاءة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">عدد المصابيح</Label>
              <Input
                type="number"
                value={inputs.lightsCount}
                onChange={(e) =>
                  onChange("lightsCount", parseFloat(e.target.value) || 0)
                }
                className="text-left"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">قدرة كل منها (W)</Label>
              <Input
                type="number"
                value={inputs.lightsWatt}
                onChange={(e) =>
                  onChange("lightsWatt", parseFloat(e.target.value) || 0)
                }
                className="text-left"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                ساعات الاستخدام/يوم
              </Label>
              <Input
                type="number"
                value={inputs.lightsHours}
                onChange={(e) =>
                  onChange("lightsHours", parseFloat(e.target.value) || 0)
                }
                className="text-left"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* People */}
      <Card className="border-emerald-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-emerald-800">
            <Users className="w-5 h-5 text-emerald-600" />
            حمل الأشخاص
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">عدد الأشخاص</Label>
              <Input
                type="number"
                value={inputs.peopleCount}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  onChange("peopleCount", val);
                  onChange("peopleCountVent", val);
                }}
                className="text-left"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">نشاط الأشخاص</Label>
              <Select
                value={inputs.peopleQt.toString()}
                onValueChange={(v) =>
                  onChange("peopleQt", parseFloat(v))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PEOPLE_HEAT_AC.map((p) => (
                    <SelectItem key={p.id} value={p.qt.toString()}>
                      {p.activity} - {p.qt}W
                    </SelectItem>
                  ))}
                  <SelectItem
                    value={getPeopleHeatRefrig(inputs.tempIn).toString()}
                  >
                    مخزن تبريد عند {inputs.tempIn}°C (
                    {getPeopleHeatRefrig(inputs.tempIn).toFixed(0)}W)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                ساعات الحضور/يوم
              </Label>
              <Input
                type="number"
                value={inputs.peopleHours}
                onChange={(e) =>
                  onChange("peopleHours", parseFloat(e.target.value) || 0)
                }
                className="text-left"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipment */}
      <Card className="border-orange-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-orange-800">
            <Wrench className="w-5 h-5 text-orange-600" />
            حمل المعدات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="equipmentEnabled"
              checked={inputs.equipmentEnabled === 1}
              onChange={(e) =>
                onChange("equipmentEnabled", e.target.checked ? 1 : 0)
              }
              className="w-4 h-4"
            />
            <Label htmlFor="equipmentEnabled" className="cursor-pointer">
              هناك حمل للمعدات؟
            </Label>
          </div>

          {inputs.equipmentEnabled === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">
                  معدل الكسب الحراري (W)
                </Label>
                <Input
                  type="number"
                  value={inputs.equipmentHeatRate}
                  onChange={(e) =>
                    onChange(
                      "equipmentHeatRate",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="text-left"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">عدد المعدات</Label>
                <Input
                  type="number"
                  value={inputs.equipmentCount}
                  onChange={(e) =>
                    onChange(
                      "equipmentCount",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="text-left"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  ساعات التشغيل/يوم
                </Label>
                <Input
                  type="number"
                  value={inputs.equipmentHours}
                  onChange={(e) =>
                    onChange(
                      "equipmentHours",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="text-left"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
