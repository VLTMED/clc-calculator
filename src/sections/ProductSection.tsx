import { useState } from "react";
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
import {
  Package, Thermometer, Snowflake, Timer,
  Lock, Unlock, AlertTriangle, Info, XCircle,
} from "lucide-react";
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
      <div className="text-sm font-medium text-slate-700 leading-snug flex-1">{label}</div>
      <div className="w-28 shrink-0">{children}</div>
    </div>
  );
}

function SectionToggle({
  id, label, checked, onToggle, accentClass,
}: {
  id: string; label: string; checked: boolean;
  onToggle: (v: boolean) => void; accentClass: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-center justify-between gap-3 cursor-pointer select-none bg-white border border-slate-200 rounded-xl px-4 py-3 hover:border-slate-300 transition-colors"
    >
      <span className="text-sm font-medium text-slate-800 leading-snug">{label}</span>
      <input type="checkbox" id={id} checked={checked}
        onChange={(e) => onToggle(e.target.checked)}
        className={`w-5 h-5 shrink-0 rounded ${accentClass} cursor-pointer`} />
    </label>
  );
}

function DisabledBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500">
      <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
      <span>{label} = <span className="font-mono font-bold">0 W</span> (غير محسوب)</span>
    </div>
  );
}

export function ProductSection({ inputs, onChange }: Props) {
  const [productFieldsLocked, setProductFieldsLocked] = useState(true);

  const selectedProduct = useMemo(
    () => getProductById(inputs.productId),
    [inputs.productId]
  );

  const isFrozenProduct = selectedProduct &&
    (selectedProduct.lat === 0 || selectedProduct.id.includes("frozen"));

  const tempWarning = inputs.productEnabled === 1 &&
    inputs.productEnterTemp < inputs.storageTemp;

  const handleProductChange = (productId: string) => {
    const product = getProductById(productId);
    if (product) {
      onChange("productId", productId);
      onChange("freezeTemp", product.tf);
      onChange("cpAbove", product.cp_a);
      onChange("cpBelow", product.cp_b);
      onChange("latentHeat", product.lat);
      onChange("crf", product.crf);
      setProductFieldsLocked(true);
    }
  };

  return (
    <div className="space-y-4">

      {/* ── Product ── */}
      <Card className={`border-violet-200 shadow-sm ${inputs.productEnabled === 0 ? "opacity-75" : ""}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-violet-800 font-display">
            <Package className="w-5 h-5 text-violet-600 shrink-0" />
            حمل المنتج (التبريد/التجميد)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <SectionToggle
            id="productEnabled"
            label="هناك حمل منتج؟"
            checked={inputs.productEnabled === 1}
            onToggle={(v) => onChange("productEnabled", v ? 1 : 0)}
            accentClass="accent-violet-600"
          />

          {inputs.productEnabled === 1 && (
            <>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">اختر المنتج</Label>
                <Select value={inputs.productId} onValueChange={handleProductChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="max-h-80">
                    <SelectItem value="__fruit" disabled className="font-bold text-slate-400 text-xs">— الفواكه —</SelectItem>
                    {PRODUCTS.filter((p) => p.category === "fruit").map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                    <SelectItem value="__veg" disabled className="font-bold text-slate-400 text-xs">— الخضروات —</SelectItem>
                    {PRODUCTS.filter((p) => p.category === "vegetable").map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                    <SelectItem value="__meat" disabled className="font-bold text-slate-400 text-xs">— اللحوم والأسماك —</SelectItem>
                    {PRODUCTS.filter((p) => p.category === "meat").map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                    <SelectItem value="__other" disabled className="font-bold text-slate-400 text-xs">— أخرى —</SelectItem>
                    {PRODUCTS.filter((p) => p.category === "other").map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Frozen product notice */}
              {isFrozenProduct && (
                <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5">
                  <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    هذا المنتج <strong>مجمد مسبقاً</strong> — لا يوجد حمل تجميد. يُحسب فقط
                    حمل الصيانة (التبريد للحفاظ على درجة التجميد).
                  </p>
                </div>
              )}

              {/* Product properties badges */}
              {selectedProduct && (
                <div className="bg-violet-50 border border-violet-200 rounded-xl p-3">
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    <Badge variant="secondary" className="bg-white">
                      <Snowflake className="w-3 h-3 me-1" />tf = {selectedProduct.tf}°C
                    </Badge>
                    <Badge variant="secondary" className="bg-white">Cp↑ = {selectedProduct.cp_a}</Badge>
                    <Badge variant="secondary" className="bg-white">Cp↓ = {selectedProduct.cp_b}</Badge>
                    <Badge variant="secondary" className="bg-white">L = {selectedProduct.lat} kJ/kg</Badge>
                    <Badge variant="secondary" className="bg-white">CRF = {selectedProduct.crf}</Badge>
                    <Badge variant="secondary" className="bg-white">رطوبة {selectedProduct.humidity}%</Badge>
                  </div>
                </div>
              )}

              <FieldRow label="كتلة المنتج (kg)">
                <Input type="number" min="0" value={inputs.productMass}
                  onChange={(e) => onChange("productMass", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>

              <Separator />

              {/* Storage temperatures */}
              <FieldRow label={<span className="flex items-center gap-1"><Thermometer className="w-3.5 h-3.5" />درجة دخول المنتج (°C)</span>}>
                <Input type="number" value={inputs.productEnterTemp}
                  onChange={(e) => onChange("productEnterTemp", parseFloat(e.target.value) || 0)}
                  dir="ltr" className={`text-center font-mono ${tempWarning ? "border-amber-400 bg-amber-50" : ""}`} />
              </FieldRow>

              <FieldRow label={<span className="flex items-center gap-1"><Snowflake className="w-3.5 h-3.5" />درجة التخزين (°C)</span>}>
                <Input type="number" step="0.5" value={inputs.storageTemp}
                  onChange={(e) => onChange("storageTemp", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>

              {/* Temperature warning */}
              {tempWarning && (
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-300 rounded-xl px-3 py-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700">
                    درجة دخول المنتج ({inputs.productEnterTemp}°C) أقل من درجة التخزين ({inputs.storageTemp}°C).
                    هذا غير منطقي — تحقق من القيم.
                  </p>
                </div>
              )}

              <FieldRow label={<span className="flex items-center gap-1"><Snowflake className="w-3.5 h-3.5 text-blue-400" />درجة الانجماد (°C)</span>}>
                <Input type="number" step="0.1" value={inputs.freezeTemp}
                  onChange={(e) => onChange("freezeTemp", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>

              <FieldRow label={<span className="flex items-center gap-1"><Timer className="w-3.5 h-3.5" />زمن التبريد (ساعة)</span>}>
                <Input type="number" min="1" value={inputs.coolTime}
                  onChange={(e) => onChange("coolTime", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>

              <Separator />

              {/* Product thermal constants — locked by default */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">ثوابت المنتج الحرارية</span>
                  <button
                    type="button"
                    onClick={() => setProductFieldsLocked(!productFieldsLocked)}
                    className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      productFieldsLocked
                        ? "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                        : "bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-200"
                    }`}
                  >
                    {productFieldsLocked
                      ? <><Lock className="w-3 h-3" />مؤمّن — انقر للتعديل</>
                      : <><Unlock className="w-3 h-3" />وضع التعديل اليدوي</>
                    }
                  </button>
                </div>

                <div className={`rounded-xl border p-3 space-y-2 transition-all ${
                  productFieldsLocked ? "bg-slate-50 border-slate-100" : "bg-violet-50 border-violet-200"
                }`}>
                  {[
                    { label: "Cp فوق التجميد (kJ/kg·K)", field: "cpAbove", val: inputs.cpAbove, step: "0.1" },
                    { label: "Cp تحت التجميد (kJ/kg·K)", field: "cpBelow", val: inputs.cpBelow, step: "0.1" },
                    { label: "الحرارة الكامنة (kJ/kg)", field: "latentHeat", val: inputs.latentHeat, step: "1" },
                    { label: "CRF", field: "crf", val: inputs.crf, step: "0.01" },
                  ].map(({ label, field, val, step }) => (
                    <div key={field} className="flex items-center gap-2">
                      <span className="text-xs text-slate-600 flex-1">{label}</span>
                      {productFieldsLocked ? (
                        <span className="text-xs font-mono font-bold text-slate-700 w-24 text-center">{val}</span>
                      ) : (
                        <Input type="number" step={step} value={val}
                          onChange={(e) => onChange(field, parseFloat(e.target.value) || 0)}
                          className="h-9 text-xs text-center font-mono w-24 shrink-0" dir="ltr" />
                      )}
                    </div>
                  ))}
                </div>

                {productFieldsLocked && (
                  <p className="text-xs text-slate-400">
                    مُعبّأة تلقائياً من جداول 2-5 إلى 2-8. انقر "تعديل" للتغيير.
                  </p>
                )}
              </div>
            </>
          )}

          {inputs.productEnabled === 0 && (
            <DisabledBadge label="حمل المنتج" />
          )}
        </CardContent>
      </Card>

      {/* ── Packaging ── */}
      <Card className={`border-teal-200 shadow-sm ${inputs.packagingEnabled === 0 ? "opacity-75" : ""}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-teal-800 font-display">حمل مواد التغليف</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <SectionToggle
            id="packagingEnabled"
            label="هناك حمل للتغليف؟"
            checked={inputs.packagingEnabled === 1}
            onToggle={(v) => onChange("packagingEnabled", v ? 1 : 0)}
            accentClass="accent-teal-600"
          />

          {inputs.packagingEnabled === 1 ? (
            <div className="space-y-3">
              <FieldRow label="عدد الصناديق">
                <Input type="number" min="0" value={inputs.boxesCount}
                  onChange={(e) => onChange("boxesCount", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label="وزن كل صندوق (kg)">
                <Input type="number" step="0.1" min="0" value={inputs.boxWeight}
                  onChange={(e) => onChange("boxWeight", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label="ساعات أمان إضافية">
                <Input type="number" min="0" value={inputs.packagingSafetyHours}
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
                        {pm.name} (Cp = {pm.cp})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <DisabledBadge label="حمل التغليف" />
          )}
        </CardContent>
      </Card>

      {/* ── Defrost ── */}
      <Card className={`border-red-200 shadow-sm ${inputs.defrostEnabled === 0 ? "opacity-75" : ""}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-red-800 font-display">حمل إزالة الصقيع (Defrost)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <SectionToggle
            id="defrostEnabled"
            label="هناك حمل إزالة صقيع؟"
            checked={inputs.defrostEnabled === 1}
            onToggle={(v) => onChange("defrostEnabled", v ? 1 : 0)}
            accentClass="accent-red-600"
          />

          {inputs.defrostEnabled === 1 ? (
            <div className="space-y-3">
              <FieldRow label="عدد السخانات">
                <Input type="number" min="0" value={inputs.heatersCount}
                  onChange={(e) => onChange("heatersCount", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label="قدرة كل سخان (W)">
                <Input type="number" min="0" value={inputs.heaterPower}
                  onChange={(e) => onChange("heaterPower", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
              <FieldRow label="معامل الاستخدام">
                <Input type="number" step="0.1" min="0" max="1" value={inputs.heaterUsageFactor}
                  onChange={(e) => onChange("heaterUsageFactor", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
            </div>
          ) : (
            <DisabledBadge label="حمل إزالة الصقيع" />
          )}
        </CardContent>
      </Card>

      {/* ── Usage Method ── */}
      <Card className={`border-pink-200 shadow-sm ${inputs.usageEnabled === 0 ? "opacity-75" : ""}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-pink-800 font-display">الطريقة المختصرة (Usage Factor)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <SectionToggle
            id="usageEnabled"
            label="استخدام الطريقة المختصرة؟"
            checked={inputs.usageEnabled === 1}
            onToggle={(v) => onChange("usageEnabled", v ? 1 : 0)}
            accentClass="accent-pink-600"
          />

          {inputs.usageEnabled === 1 ? (
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">معامل الاستخدام</Label>
              <Select value={inputs.usageFactor.toString()}
                onValueChange={(v) => onChange("usageFactor", parseFloat(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
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
          ) : (
            <DisabledBadge label="الطريقة المختصرة" />
          )}
        </CardContent>
      </Card>

    </div>
  );
}
