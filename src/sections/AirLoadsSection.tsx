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
import { Wind, DoorOpen, RefreshCw, Users } from "lucide-react";
import { INFILTRATION_RATES } from "@/data/infiltration";
import { VENTILATION_RATES } from "@/data/ventilation";
import type { CalculationInputs } from "@/types/inputs";

interface Props {
  inputs: CalculationInputs;
  onChange: (field: string, value: number | string) => void;
}

export function AirLoadsSection({ inputs, onChange }: Props) {
  return (
    <div className="space-y-4">
      {/* Infiltration */}
      <Card className="border-sky-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-sky-800">
            <DoorOpen className="w-5 h-5 text-sky-600" />
            حمل تسرب الهواء (Infiltration)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="infiltrationEnabled"
              checked={inputs.infiltrationEnabled === 1}
              onChange={(e) =>
                onChange("infiltrationEnabled", e.target.checked ? 1 : 0)
              }
              className="w-4 h-4"
            />
            <Label htmlFor="infiltrationEnabled" className="cursor-pointer">
              هناك حمل تسرب؟
            </Label>
          </div>

          {inputs.infiltrationEnabled === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">معدل التسرب (l/s)</Label>
                <Select
                  value={inputs.infiltrationRate.toString()}
                  onValueChange={(v) =>
                    onChange("infiltrationRate", parseFloat(v))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {INFILTRATION_RATES.map((rate, i) => (
                      <SelectItem key={i} value={rate.rateAboveZero.toString()}>
                        حجم {rate.roomVolume}m³ → {rate.rateAboveZero} l/s (أعلى من
                        صفر) / {rate.rateBelowZero} l/s (أقل من صفر)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">
                  كمية الحرارة مع الهواء (kJ/l)
                </Label>
                <Input
                  type="number"
                  step="0.0001"
                  value={inputs.enthalpyDiff}
                  onChange={(e) =>
                    onChange(
                      "enthalpyDiff",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="text-start"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ventilation */}
      <Card className="border-cyan-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-cyan-800">
            <Wind className="w-5 h-5 text-cyan-600" />
            حمل التهوية (Ventilation)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="ventilationEnabled"
              checked={inputs.ventilationEnabled === 1}
              onChange={(e) =>
                onChange("ventilationEnabled", e.target.checked ? 1 : 0)
              }
              className="w-4 h-4"
            />
            <Label htmlFor="ventilationEnabled" className="cursor-pointer">
              هناك حمل تهوية؟
            </Label>
          </div>

          {inputs.ventilationEnabled === 1 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    نوع الاستخدام
                  </Label>
                  <Select
                    value={inputs.ventRatePerPerson.toString()}
                    onValueChange={(v) =>
                      onChange("ventRatePerPerson", parseFloat(v))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {VENTILATION_RATES.map((v) => (
                        <SelectItem key={v.id} value={v.ratePreferred.toString()}>
                          {v.name} ({v.ratePreferred} L/s)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">عدد الأشخاص</Label>
                  <Input
                    type="number"
                    value={inputs.peopleCountVent}
                    onChange={(e) =>
                      onChange(
                        "peopleCountVent",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="text-start"
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">hi داخلي (kJ/kg)</Label>
                  <Input
                    type="number"
                    value={inputs.ventHi}
                    onChange={(e) =>
                      onChange("ventHi", parseFloat(e.target.value) || 0)
                    }
                    className="h-8 text-xs text-start"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">ho خارجي (kJ/kg)</Label>
                  <Input
                    type="number"
                    value={inputs.ventHo}
                    onChange={(e) =>
                      onChange("ventHo", parseFloat(e.target.value) || 0)
                    }
                    className="h-8 text-xs text-start"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">الحجم النوعي (m³/kg)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={inputs.specificVolume}
                    onChange={(e) =>
                      onChange(
                        "specificVolume",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="h-8 text-xs text-start"
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Air Change */}
      <Card className="border-indigo-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-indigo-800">
            <RefreshCw className="w-5 h-5 text-indigo-600" />
            حمل تغيير الهواء (Air Change)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="airChangeEnabled"
              checked={inputs.airChangeEnabled === 1}
              onChange={(e) =>
                onChange("airChangeEnabled", e.target.checked ? 1 : 0)
              }
              className="w-4 h-4"
            />
            <Label htmlFor="airChangeEnabled" className="cursor-pointer">
              هناك حمل تغيير هواء؟
            </Label>
          </div>

          {inputs.airChangeEnabled === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">
                    عدد مرات تغيير الهواء/24 ساعة
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={inputs.airChangesPer24h}
                    onChange={(e) =>
                      onChange(
                        "airChangesPer24h",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="text-start"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">حجم الحيز (m³)</Label>
                  <Input
                    type="number"
                    value={inputs.airChangeVolume || inputs.length * inputs.width * inputs.height}
                    onChange={(e) =>
                      onChange(
                        "airChangeVolume",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="text-start"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">hi داخلي (kJ/kg)</Label>
                  <Input
                    type="number"
                    value={inputs.airChangeHi}
                    onChange={(e) =>
                      onChange(
                        "airChangeHi",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="h-8 text-xs text-start"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">ho خارجي (kJ/kg)</Label>
                  <Input
                    type="number"
                    value={inputs.airChangeHo}
                    onChange={(e) =>
                      onChange(
                        "airChangeHo",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="h-8 text-xs text-start"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">الحجم النوعي (m³/kg)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={inputs.airChangeSpecificVolume}
                    onChange={(e) =>
                      onChange(
                        "airChangeSpecificVolume",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="h-8 text-xs text-start"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
