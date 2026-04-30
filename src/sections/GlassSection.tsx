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
import { Sun, GlassWater, Info } from "lucide-react";
import { GLASS_U_VALUES, SHADING_COEFFICIENTS } from "@/data/ventilation";
import type { CalculationInputs } from "@/types/inputs";

interface Props {
  inputs: CalculationInputs;
  onChange: (field: string, value: number | string) => void;
}

export function GlassSection({ inputs, onChange }: Props) {
  return (
    <div className="space-y-4">
      {/* Solar Settings */}
      <Card className="border-amber-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-amber-800">
            <Sun className="w-5 h-5 text-amber-600" />
            تأثير الإشعاع الشمسي على الجدران والسقف
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="considerSolar"
              checked={inputs.considerSolar === 1}
              onChange={(e) =>
                onChange("considerSolar", e.target.checked ? 1 : 0)
              }
              className="w-4 h-4"
            />
            <Label htmlFor="considerSolar" className="cursor-pointer">
              أخذ تأثير الأشعة الشمسية بالحسبان؟
            </Label>
          </div>

          {inputs.considerSolar === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  معامل الامتصاص (a)
                </Label>
                <Select
                  value={inputs.absorptance.toString()}
                  onValueChange={(v) =>
                    onChange("absorptance", parseFloat(v))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.89">الأسفلت (0.89)</SelectItem>
                    <SelectItem value="0.65">الخرسانة (0.65)</SelectItem>
                    <SelectItem value="0.77">الطوب الأحمر (0.77)</SelectItem>
                    <SelectItem value="0.26">الطوب الأبيض (0.26)</SelectItem>
                    <SelectItem value="0.57">
                      المونة الأسمنتية (0.57)
                    </SelectItem>
                    <SelectItem value="0.40">
                      المونة الجبسية (0.40)
                    </SelectItem>
                    <SelectItem value="0.91">العازل الحراري (0.91)</SelectItem>
                    <SelectItem value="0.90">البيتومين (0.90)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">
                  شدة الإشعاع الشمسي (W/m²)
                </Label>
                <Input
                  type="number"
                  value={inputs.radiation}
                  onChange={(e) =>
                    onChange("radiation", parseFloat(e.target.value) || 0)
                  }
                  className="text-left"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Glass Loads */}
      <Card className="border-sky-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-sky-800">
            <GlassWater className="w-5 h-5 text-sky-600" />
            أحمال النوافذ الزجاجية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="glassEnabled"
              checked={inputs.glassEnabled === 1}
              onChange={(e) =>
                onChange("glassEnabled", e.target.checked ? 1 : 0)
              }
              className="w-4 h-4"
            />
            <Label htmlFor="glassEnabled" className="cursor-pointer">
              أخذ حمل الزجاج بالحسبان؟
            </Label>
          </div>

          {inputs.glassEnabled === 1 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">مساحة الزجاج (m²)</Label>
                  <Input
                    type="number"
                    value={inputs.glassArea}
                    onChange={(e) =>
                      onChange("glassArea", parseFloat(e.target.value) || 0)
                    }
                    className="text-left"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">U-Value الزجاج</Label>
                  <Select
                    value={inputs.glassU.toString()}
                    onValueChange={(v) =>
                      onChange("glassU", parseFloat(v))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {GLASS_U_VALUES.map((g) => (
                        <SelectItem key={g.id} value={g.uSummer.toString()}>
                          {g.description} ({g.uSummer})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">الاتجاه</Label>
                  <Select
                    value={inputs.glassDirection}
                    onValueChange={(v) => onChange("glassDirection", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="شمالي">شمالي</SelectItem>
                      <SelectItem value="جنوبي">جنوبي</SelectItem>
                      <SelectItem value="شرقي">شرقي</SelectItem>
                      <SelectItem value="غربي">غربي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
                <h4 className="text-sm font-medium text-sky-800 mb-2">
                  طريقة حساب حمل الزجاج
                </h4>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="checkbox"
                    id="useSCMethod"
                    checked={inputs.useSCMethod === 1}
                    onChange={(e) =>
                      onChange("useSCMethod", e.target.checked ? 1 : 0)
                    }
                    className="w-4 h-4"
                  />
                  <Label htmlFor="useSCMethod" className="text-sm cursor-pointer">
                    استخدام طريقة SC × SHGF × CLF
                  </Label>
                </div>

                {inputs.useSCMethod === 1 ? (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">SC</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={inputs.scValue}
                        onChange={(e) =>
                          onChange("scValue", parseFloat(e.target.value) || 0)
                        }
                        className="h-8 text-xs text-left"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">SHGF</Label>
                      <Input
                        type="number"
                        value={inputs.shgfValue}
                        onChange={(e) =>
                          onChange("shgfValue", parseFloat(e.target.value) || 0)
                        }
                        className="h-8 text-xs text-left"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">CLF</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={inputs.clfValue}
                        onChange={(e) =>
                          onChange("clfValue", parseFloat(e.target.value) || 0)
                        }
                        className="h-8 text-xs text-left"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">
                        حرارة مكتسبة للزجاج (W/m²)
                      </Label>
                      <Input
                        type="number"
                        value={inputs.glassSHGF}
                        onChange={(e) =>
                          onChange(
                            "glassSHGF",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="h-8 text-xs text-left"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">معامل التضليل (SC)</Label>
                      <Select
                        value={inputs.shadingCoefficient.toString()}
                        onValueChange={(v) =>
                          onChange("shadingCoefficient", parseFloat(v))
                        }
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SHADING_COEFFICIENTS.map((sc, i) => (
                            <SelectItem
                              key={i}
                              value={sc.noShading.toString()}
                            >
                              {sc.glassType} - بدون تضليل ({sc.noShading})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
