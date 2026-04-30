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
import { Package, Thermometer, Snowflake, Timer } from "lucide-react";
import { PRODUCTS, getProductById } from "@/data/products";
import { PACKAGING_MATERIALS } from "@/data/ventilation";
import type { CalculationInputs } from "@/types/inputs";
import { useMemo } from "react";

interface Props {
  inputs: CalculationInputs;
  onChange: (field: string, value: number | string) => void;
}

export function ProductSection({ inputs, onChange }: Props) {
  const selectedProduct = useMemo(
    () => getProductById(inputs.productId),
    [inputs.productId]
  );

  const handleProductChange = (productId: string) => {
    const product = getProductById(productId);
    if (product) {
      onChange("productId", productId);
      onChange("freezeTemp", product.tf);
      onChange("cpAbove", product.cp_a);
      onChange("cpBelow", product.cp_b);
      onChange("latentHeat", product.lat);
      onChange("crf", product.crf);
    }
  };

  return (
    <div className="space-y-4">
      {/* Product Selection */}
      <Card className="border-violet-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-violet-800">
            <Package className="w-5 h-5 text-violet-600" />
            حمل المنتج (التبريد/التجميد)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="productEnabled"
              checked={inputs.productEnabled === 1}
              onChange={(e) =>
                onChange("productEnabled", e.target.checked ? 1 : 0)
              }
              className="w-4 h-4"
            />
            <Label htmlFor="productEnabled" className="cursor-pointer font-medium">
              هناك حمل منتج؟
            </Label>
          </div>

          {inputs.productEnabled === 1 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">اختر المنتج</Label>
                  <Select
                    value={inputs.productId}
                    onValueChange={handleProductChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      <SelectItem value="custom" disabled className="font-bold bg-slate-100">
                        — الفواكه —
                      </SelectItem>
                      {PRODUCTS.filter((p) => p.category === "fruit").map(
                        (p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        )
                      )}
                      <SelectItem value="custom2" disabled className="font-bold bg-slate-100">
                        — الخضروات —
                      </SelectItem>
                      {PRODUCTS.filter((p) => p.category === "vegetable").map(
                        (p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        )
                      )}
                      <SelectItem value="custom3" disabled className="font-bold bg-slate-100">
                        — اللحوم والأسماك —
                      </SelectItem>
                      {PRODUCTS.filter((p) => p.category === "meat").map(
                        (p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        )
                      )}
                      <SelectItem value="custom4" disabled className="font-bold bg-slate-100">
                        — مواد غذائية أخرى —
                      </SelectItem>
                      {PRODUCTS.filter((p) => p.category === "other").map(
                        (p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">كتلة المنتج (kg)</Label>
                  <Input
                    type="number"
                    value={inputs.productMass}
                    onChange={(e) =>
                      onChange("productMass", parseFloat(e.target.value) || 0)
                    }
                    className="text-start"
                  />
                </div>
              </div>

              {selectedProduct && (
                <div className="bg-violet-50 border border-violet-200 rounded-lg p-3">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="secondary" className="bg-white">
                      <Snowflake className="w-3 h-3 me-1" />
                      تجميد: {selectedProduct.tf}°C
                    </Badge>
                    <Badge variant="secondary" className="bg-white">
                      حرارة كامنة: {selectedProduct.lat} kJ/kg
                    </Badge>
                    <Badge variant="secondary" className="bg-white">
                      Cp فوق: {selectedProduct.cp_a}
                    </Badge>
                    <Badge variant="secondary" className="bg-white">
                      Cp تحت: {selectedProduct.cp_b}
                    </Badge>
                    <Badge variant="secondary" className="bg-white">
                      CRF: {selectedProduct.crf}
                    </Badge>
                    <Badge variant="secondary" className="bg-white">
                      رطوبة: {selectedProduct.humidity}%
                    </Badge>
                  </div>
                </div>
              )}

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5" />
                    حرارة دخول المنتج (°C)
                  </Label>
                  <Input
                    type="number"
                    value={inputs.productEnterTemp}
                    onChange={(e) =>
                      onChange(
                        "productEnterTemp",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="text-start"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-1">
                    <Snowflake className="w-3.5 h-3.5" />
                    درجة الانجماد (°C)
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={inputs.freezeTemp}
                    onChange={(e) =>
                      onChange("freezeTemp", parseFloat(e.target.value) || 0)
                    }
                    className="text-start"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5" />
                    زمن التبريد (ساعة)
                  </Label>
                  <Input
                    type="number"
                    value={inputs.coolTime}
                    onChange={(e) =>
                      onChange("coolTime", parseFloat(e.target.value) || 0)
                    }
                    className="text-start"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Cp فوق التجميد</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={inputs.cpAbove}
                    onChange={(e) =>
                      onChange("cpAbove", parseFloat(e.target.value) || 0)
                    }
                    className="h-8 text-xs text-start"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Cp تحت التجميد</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={inputs.cpBelow}
                    onChange={(e) =>
                      onChange("cpBelow", parseFloat(e.target.value) || 0)
                    }
                    className="h-8 text-xs text-start"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">الحرارة الكامنة</Label>
                  <Input
                    type="number"
                    value={inputs.latentHeat}
                    onChange={(e) =>
                      onChange("latentHeat", parseFloat(e.target.value) || 0)
                    }
                    className="h-8 text-xs text-start"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">CRF</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={inputs.crf}
                    onChange={(e) =>
                      onChange("crf", parseFloat(e.target.value) || 0)
                    }
                    className="h-8 text-xs text-start"
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Packaging */}
      <Card className="border-teal-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-teal-800">
            حمل مواد التغليف
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="packagingEnabled"
              checked={inputs.packagingEnabled === 1}
              onChange={(e) =>
                onChange("packagingEnabled", e.target.checked ? 1 : 0)
              }
              className="w-4 h-4"
            />
            <Label htmlFor="packagingEnabled" className="cursor-pointer">
              هناك حمل تغليف؟
            </Label>
          </div>

          {inputs.packagingEnabled === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">عدد الصناديق</Label>
                <Input
                  type="number"
                  value={inputs.boxesCount}
                  onChange={(e) =>
                    onChange("boxesCount", parseFloat(e.target.value) || 0)
                  }
                  className="h-8 text-xs text-start"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">وزن كل صندوق (kg)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={inputs.boxWeight}
                  onChange={(e) =>
                    onChange("boxWeight", parseFloat(e.target.value) || 0)
                  }
                  className="h-8 text-xs text-start"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">مادة التغليف</Label>
                <Select
                  value={inputs.packagingCp.toString()}
                  onValueChange={(v) =>
                    onChange("packagingCp", parseFloat(v))
                  }
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PACKAGING_MATERIALS.map((pm) => (
                      <SelectItem
                        key={pm.id}
                        value={pm.cp.toString()}
                      >
                        {pm.name} (Cp={pm.cp})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">ساعات أمان إضافية</Label>
                <Input
                  type="number"
                  value={inputs.packagingSafetyHours}
                  onChange={(e) =>
                    onChange(
                      "packagingSafetyHours",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="h-8 text-xs text-start"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Defrost */}
      <Card className="border-red-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-red-800">
            حمل أذابة الصقيع (Defrost)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="defrostEnabled"
              checked={inputs.defrostEnabled === 1}
              onChange={(e) =>
                onChange("defrostEnabled", e.target.checked ? 1 : 0)
              }
              className="w-4 h-4"
            />
            <Label htmlFor="defrostEnabled" className="cursor-pointer">
              هناك حمل أذابة صقيع؟
            </Label>
          </div>

          {inputs.defrostEnabled === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">عدد السخانات</Label>
                <Input
                  type="number"
                  value={inputs.heatersCount}
                  onChange={(e) =>
                    onChange("heatersCount", parseFloat(e.target.value) || 0)
                  }
                  className="h-8 text-xs text-start"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">قدرة كل سخان (W)</Label>
                <Input
                  type="number"
                  value={inputs.heaterPower}
                  onChange={(e) =>
                    onChange("heaterPower", parseFloat(e.target.value) || 0)
                  }
                  className="h-8 text-xs text-start"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">معامل الاستخدام</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={inputs.heaterUsageFactor}
                  onChange={(e) =>
                    onChange(
                      "heaterUsageFactor",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="h-8 text-xs text-start"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Method */}
      <Card className="border-pink-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-pink-800">
            الطريقة المختصرة (Usage Factor)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="usageEnabled"
              checked={inputs.usageEnabled === 1}
              onChange={(e) =>
                onChange("usageEnabled", e.target.checked ? 1 : 0)
              }
              className="w-4 h-4"
            />
            <Label htmlFor="usageEnabled" className="cursor-pointer">
              استخدام الطريقة المختصرة؟
            </Label>
          </div>

          {inputs.usageEnabled === 1 && (
            <div className="space-y-2">
              <Label className="text-xs">معامل الاستخدام</Label>
              <Select
                value={inputs.usageFactor.toString()}
                onValueChange={(v) =>
                  onChange("usageFactor", parseFloat(v))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3.97">شاقة - تخزين طويل (3.97)</SelectItem>
                  <SelectItem value="3.63">متوسطة - تخزين طويل (3.63)</SelectItem>
                  <SelectItem value="3.57">شاقة - خدمة (3.57)</SelectItem>
                  <SelectItem value="2.56">متوسطة - خدمة (2.56)</SelectItem>
                  <SelectItem value="1.18">مختصرة - عام (1.18)</SelectItem>
                  <SelectItem value="0.6">تخزين طويل - حجم (0.6)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
