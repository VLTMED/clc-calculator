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

function FieldRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm font-medium text-slate-700 leading-snug">{label}</div>
      <div className="w-28 shrink-0">{children}</div>
    </div>
  );
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

      {/* ── Product ── */}
      <Card className="border-violet-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-violet-800 font-display">
            <Package className="w-5 h-5 text-violet-600 shrink-0" />
            حمل المنتج (التبريد/التجميد)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label htmlFor="productEnabled"
            className="flex items-center gap-3 cursor-pointer select-none py-1">
            <span className="flex-1 text-sm font-medium">هناك حمل منتج؟</span>
            <input type="checkbox" id="productEnabled"
              checked={inputs.productEnabled === 1}
              onChange={(e) => onChange("productEnabled", e.target.checked ? 1 : 0)}
              className="w-5 h-5 shrink-0 rounded accent-violet-600" />
          </label>

          {inputs.productEnabled === 1 && (
            <>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">اختر المنتج</Label>
                <Select value={inputs.productId} onValueChange={handleProductChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="max-h-80">
                    <SelectItem value="custom" disabled className="font-bold bg-slate-100">— الفواكه —</SelectItem>
                    {PRODUCTS.filter((p) => p.category === "fruit").map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                    <SelectItem value="custom2" disabled className="font-bold bg-slate-100">— الخضروات —</SelectItem>
                    {PRODUCTS.filter((p) => p.category === "vegetable").map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                    <SelectItem value="custom3" disabled className="font-bold bg-slate-100">— اللحوم والأسماك —</SelectItem>
                    {PRODUCTS.filter((p) => p.category === "meat").map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                    <SelectItem value="custom4" disabled className="font-bold bg-slate-100">— مواد غذائية أخرى —</SelectItem>
                    {PRODUCTS.filter((p) => p.category === "other").map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <FieldRow label="كتلة المنتج (kg)">
                <Input type="number" value={inputs.productMass}
                  onChange={(e) => onChange("productMass", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>

              {selectedProduct && (
                <div className="bg-violet-50 border border-violet-200 rounded-lg p-3">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="secondary" className="bg-white">
                      <Snowflake className="w-3 h-3 me-1" />
                      تجميد: {selectedProduct.tf}°C
                    </Badge>
                    <Badge variant="secondary" className="bg-white">حرارة كامنة: {selectedProduct.lat} kJ/kg</Badge>
                    <Badge variant="secondary" className="bg-white">Cp فوق: {selectedProduct.cp_a}</Badge>
                    <Badge variant="secondary" className="bg-white">Cp تحت: {selectedProduct.cp_b}</Badge>
                    <Badge variant="secondary" className="bg-white">CRF: {selectedProduct.crf}</Badge>
                    <Badge variant="secondary" className="bg-white">رطوبة: {selectedProduct.humidity}%</Badge>
                  </div>
                </div>
              )}

              <Separator />

              <FieldRow label={<span className="flex items-center gap-1"><Thermometer className="w-3.5 h-3.5" />حرارة دخول المنتج (°C)</span>}>
                <Input type="number" value={inputs.productEnterTemp}
                  onChange={(e) => onChange("productEnterTemp", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label={<span className="flex items-center gap-1"><Snowflake className="w-3.5 h-3.5" />درجة الانجماد (°C)</span>}>
                <Input type="number" step="0.1" value={inputs.freezeTemp}
                  onChange={(e) => onChange("freezeTemp", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label={<span className="flex items-center gap-1"><Timer className="w-3.5 h-3.5" />زمن التبريد (ساعة)</span>}>
                <Input type="number" value={inputs.coolTime}
                  onChange={(e) => onChange("coolTime", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>

              <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                <div className="text-xs font-medium text-slate-500">ثوابت المنتج</div>
                {[
                  { label: "Cp فوق التجميد", field: "cpAbove", val: inputs.cpAbove, step: "0.1" },
                  { label: "Cp تحت التجميد", field: "cpBelow", val: inputs.cpBelow, step: "0.1" },
                  { label: "الحرارة الكامنة (kJ/kg)", field: "latentHeat", val: inputs.latentHeat, step: "1" },
                  { label: "CRF", field: "crf", val: inputs.crf, step: "0.01" },
                ].map(({ label, field, val, step }) => (
                  <div key={field} className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 flex-1">{label}</span>
                    <Input type="number" step={step} value={val}
                      onChange={(e) => onChange(field, parseFloat(e.target.value) || 0)}
                      className="h-8 text-xs text-center font-mono w-24 shrink-0" dir="ltr" />
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* ── Packaging ── */}
      <Card className="border-teal-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-teal-800 font-display">حمل مواد التغليف</CardTitle>
        </CardHeader>
        <CardContent>
          <label htmlFor="packagingEnabled"
            className="flex items-center gap-3 cursor-pointer select-none mb-4 py-1">
            <span className="flex-1 text-sm font-medium">هناك حمل تغليف؟</span>
            <input type="checkbox" id="packagingEnabled"
              checked={inputs.packagingEnabled === 1}
              onChange={(e) => onChange("packagingEnabled", e.target.checked ? 1 : 0)}
              className="w-5 h-5 shrink-0 rounded accent-teal-600" />
          </label>

          {inputs.packagingEnabled === 1 && (
            <div className="space-y-3">
              <FieldRow label="عدد الصناديق">
                <Input type="number" value={inputs.boxesCount}
                  onChange={(e) => onChange("boxesCount", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label="وزن كل صندوق (kg)">
                <Input type="number" step="0.1" value={inputs.boxWeight}
                  onChange={(e) => onChange("boxWeight", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label="ساعات أمان إضافية">
                <Input type="number" value={inputs.packagingSafetyHours}
                  onChange={(e) => onChange("packagingSafetyHours", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">مادة التغليف</Label>
                <Select value={inputs.packagingCp.toString()}
                  onValueChange={(v) => onChange("packagingCp", parseFloat(v))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PACKAGING_MATERIALS.map((pm) => (
                      <SelectItem key={pm.id} value={pm.cp.toString()}>
                        {pm.name} (Cp={pm.cp})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Defrost ── */}
      <Card className="border-red-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-red-800 font-display">حمل أذابة الصقيع (Defrost)</CardTitle>
        </CardHeader>
        <CardContent>
          <label htmlFor="defrostEnabled"
            className="flex items-center gap-3 cursor-pointer select-none mb-4 py-1">
            <span className="flex-1 text-sm font-medium">هناك حمل أذابة صقيع؟</span>
            <input type="checkbox" id="defrostEnabled"
              checked={inputs.defrostEnabled === 1}
              onChange={(e) => onChange("defrostEnabled", e.target.checked ? 1 : 0)}
              className="w-5 h-5 shrink-0 rounded accent-red-600" />
          </label>

          {inputs.defrostEnabled === 1 && (
            <div className="space-y-3">
              <FieldRow label="عدد السخانات">
                <Input type="number" value={inputs.heatersCount}
                  onChange={(e) => onChange("heatersCount", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label="قدرة كل سخان (W)">
                <Input type="number" value={inputs.heaterPower}
                  onChange={(e) => onChange("heaterPower", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label="معامل الاستخدام">
                <Input type="number" step="0.1" value={inputs.heaterUsageFactor}
                  onChange={(e) => onChange("heaterUsageFactor", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Usage Method ── */}
      <Card className="border-pink-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-pink-800 font-display">الطريقة المختصرة (Usage Factor)</CardTitle>
        </CardHeader>
        <CardContent>
          <label htmlFor="usageEnabled"
            className="flex items-center gap-3 cursor-pointer select-none mb-4 py-1">
            <span className="flex-1 text-sm font-medium">استخدام الطريقة المختصرة؟</span>
            <input type="checkbox" id="usageEnabled"
              checked={inputs.usageEnabled === 1}
              onChange={(e) => onChange("usageEnabled", e.target.checked ? 1 : 0)}
              className="w-5 h-5 shrink-0 rounded accent-pink-600" />
          </label>

          {inputs.usageEnabled === 1 && (
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">معامل الاستخدام</Label>
              <Select value={inputs.usageFactor.toString()}
                onValueChange={(v) => onChange("usageFactor", parseFloat(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {/* جدول (2-22) كامل — ثقيل */}
                  <SelectItem value="3.97">0.6 م³ — ثقيل (3.97)</SelectItem>
                  <SelectItem value="3.57">0.85 م³ — ثقيل (3.57)</SelectItem>
                  <SelectItem value="2.76">1.5 م³ — ثقيل (2.76)</SelectItem>
                  <SelectItem value="2.24">2 م³ — ثقيل (2.24)</SelectItem>
                  <SelectItem value="1.96">3 م³ — ثقيل (1.96)</SelectItem>
                  <SelectItem value="1.72">6 م³ — ثقيل (1.72)</SelectItem>
                  <SelectItem value="1.61">8.5 م³ — ثقيل (1.61)</SelectItem>
                  <SelectItem value="1.52">11 م³ — ثقيل (1.52)</SelectItem>
                  <SelectItem value="1.45">14 م³ — ثقيل (1.45)</SelectItem>
                  <SelectItem value="1.44">17 م³ — ثقيل (1.44)</SelectItem>
                  <SelectItem value="1.37">23 م³ — ثقيل (1.37)</SelectItem>
                  <SelectItem value="1.30">28 م³ — ثقيل (1.30)</SelectItem>
                  <SelectItem value="1.23">34 م³ — ثقيل (1.23)</SelectItem>
                  <SelectItem value="1.16">43 م³ — ثقيل (1.16)</SelectItem>
                  {/* جدول (2-22) كامل — متوسط */}
                  <SelectItem value="3.63">0.6 م³ — متوسط (3.63)</SelectItem>
                  <SelectItem value="2.56">0.85 م³ — متوسط (2.56)</SelectItem>
                  <SelectItem value="1.77">1.5 م³ — متوسط (1.77)</SelectItem>
                  <SelectItem value="1.44">2 م³ — متوسط (1.44)</SelectItem>
                  <SelectItem value="1.25">3 م³ — متوسط (1.25)</SelectItem>
                  <SelectItem value="1.07">6 م³ — متوسط (1.07)</SelectItem>
                  <SelectItem value="1.01">8.5 م³ — متوسط (1.01)</SelectItem>
                  <SelectItem value="0.96">11 م³ — متوسط (0.96)</SelectItem>
                  <SelectItem value="0.94">14 م³ — متوسط (0.94)</SelectItem>
                  <SelectItem value="0.91">17 م³ — متوسط (0.91)</SelectItem>
                  <SelectItem value="0.86">23 م³ — متوسط (0.86)</SelectItem>
                  <SelectItem value="0.85">28 م³ — متوسط (0.85)</SelectItem>
                  <SelectItem value="0.77">34 م³ — متوسط (0.77)</SelectItem>
                  <SelectItem value="0.71">43 م³ — متوسط (0.71)</SelectItem>
                  <SelectItem value="0.65">57 م³ — متوسط (0.65)</SelectItem>
                  <SelectItem value="0.58">85 م³ — متوسط (0.58)</SelectItem>
                  <SelectItem value="0.45">140+ م³ — متوسط (0.45)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
