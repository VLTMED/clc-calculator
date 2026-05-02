import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumericInput } from "@/components/ui/numeric-input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, Package } from "lucide-react";
import type { CLCInputs, ProductLoad } from "@/types/inputs";
import { PRODUCTS } from "@/data/products";
import { PACKAGING_MATERIALS } from "@/data/tables";

interface Props {
  inputs: CLCInputs;
  onChange: (partial: Partial<CLCInputs>) => void;
}

const CATEGORIES: { key: string; label: string }[] = [
  { key: "fruit",     label: "فواكه" },
  { key: "vegetable", label: "خضراوات" },
  { key: "meat",      label: "لحوم وأسماك" },
  { key: "dairy",     label: "ألبان" },
  { key: "other",     label: "أخرى" },
];

function ProductRow({
  prod, index, onUpdate, onRemove
}: {
  prod: ProductLoad;
  index: number;
  onUpdate: (patch: Partial<ProductLoad>) => void;
  onRemove: () => void;
}) {
  const product = PRODUCTS.find(p => p.id === prod.productId);

  const tf = product?.tf ?? -1;
  const cpAbove = product?.cpAbove ?? 3.7;
  const cpBelow = product?.cpBelow ?? 1.9;
  const lh = product?.lh ?? 280;
  const n = prod.pulldownHours || 1;
  const M = prod.massKg;
  const crf = prod.crf > 0 ? prod.crf : (product?.crf ?? 0.67);

  let qAbove = 0, qLatent = 0, qBelow = 0;
  if (prod.aboveFreezeEnabled && prod.enterTemp > tf) {
    const dT = prod.enterTemp - Math.max(tf, prod.storageTemp);
    if (dT > 0) qAbove = (M * cpAbove * dT * 1000) / (3600 * n * crf);
  }
  if (prod.latentEnabled && prod.enterTemp > tf && prod.storageTemp < tf) {
    qLatent = (M * lh * 1000) / (3600 * n);
  }
  if (prod.belowFreezeEnabled && prod.storageTemp < tf) {
    const dT = tf - prod.storageTemp;
    if (dT > 0) qBelow = (M * cpBelow * dT * 1000) / (3600 * n);
  }
  const total = qAbove + qLatent + qBelow;

  return (
    <div className="border rounded-lg p-3 space-y-3 bg-muted/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Switch checked={prod.enabled} onCheckedChange={v => onUpdate({ enabled: v })} />
          <span className="text-sm font-medium">منتج {index + 1}</span>
          {total > 0 && <Badge variant="outline" className="text-xs font-mono">{total.toFixed(1)} W</Badge>}
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onRemove}>
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
        </Button>
      </div>

      {prod.enabled && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">الفئة</Label>
              <Select
                value={PRODUCTS.find(p => p.id === prod.productId)?.category ?? "fruit"}
                onValueChange={v => {
                  const first = PRODUCTS.find(p => p.category === v);
                  if (first) onUpdate({ productId: first.id, crf: first.crf });
                }}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(c => <SelectItem key={c.key} value={c.key}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">المنتج (جداول 2-5 إلى 2-8)</Label>
              <Select value={prod.productId}
                onValueChange={v => {
                  const p = PRODUCTS.find(x => x.id === v);
                  onUpdate({ productId: v, crf: p?.crf ?? 0.67 });
                }}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PRODUCTS
                    .filter(p => p.category === (PRODUCTS.find(x => x.id === prod.productId)?.category ?? "fruit"))
                    .map(p => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.nameAr} (Tf={p.tf}°C)
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {product && (
            <div className="text-xs bg-muted/50 rounded-lg p-2.5 grid grid-cols-3 gap-1.5">
              <span>Tf = {product.tf}°C</span>
              <span>Cp↑ = {product.cpAbove} kJ/kg·K</span>
              <span>Cp↓ = {product.cpBelow} kJ/kg·K</span>
              <span>LH = {product.lh} kJ/kg</span>
              <span>CRF = {product.crf}</span>
              <span>رطوبة: {product.humid}%</span>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "الكتلة (kg)", key: "massKg", step: 10, min: 0, fallback: 0 },
              { label: "درجة الدخول (°C)", key: "enterTemp", step: 0.5, min: undefined, fallback: 0 },
              { label: "درجة التخزين (°C)", key: "storageTemp", step: 0.5, min: undefined, fallback: 0 },
              { label: "وقت التبريد (ساعة)", key: "pulldownHours", step: 0.5, min: 0.5, fallback: 1 },
              { label: "معامل التبريد CRF", key: "crf", step: 0.01, min: 0.01, fallback: 0.67 },
            ].map(({ label, key, step, min, fallback }) => (
              <div key={key} className="space-y-1.5">
                <Label className="text-xs font-medium">{label}</Label>
                <NumericInput className="h-8 text-xs" step={step} min={min} fallback={fallback}
                  value={((prod as unknown) as Record<string, number>)[key]}
                  onChange={v => onUpdate({ [key]: v })} />
              </div>
            ))}
          </div>

          <div className="border-t pt-3 space-y-2">
            <Label className="text-xs font-semibold">تبديلات الحمل الحراري (مستقلة)</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg border p-2.5">
                <div className="flex items-center gap-3">
                  <Switch checked={prod.aboveFreezeEnabled}
                    onCheckedChange={v => onUpdate({ aboveFreezeEnabled: v })} />
                  <Label className="text-xs">حمل فوق التجميد (Cp↑ × ΔT)</Label>
                </div>
                <span className="text-xs font-mono text-primary">{qAbove.toFixed(1)} W</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-2.5">
                <div className="flex items-center gap-3">
                  <Switch checked={prod.latentEnabled}
                    onCheckedChange={v => onUpdate({ latentEnabled: v })} />
                  <Label className="text-xs">حرارة التجميد الكامنة (LH)</Label>
                </div>
                <span className="text-xs font-mono text-primary">{qLatent.toFixed(1)} W</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-2.5">
                <div className="flex items-center gap-3">
                  <Switch checked={prod.belowFreezeEnabled}
                    onCheckedChange={v => onUpdate({ belowFreezeEnabled: v })} />
                  <Label className="text-xs">حمل تحت التجميد (Cp↓ × ΔT)</Label>
                </div>
                <span className="text-xs font-mono text-primary">{qBelow.toFixed(1)} W</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function ProductSection({ inputs, onChange }: Props) {
  const addProduct = () => {
    onChange({
      products: [
        ...inputs.products,
        {
          enabled: true,
          productId: "تفاح",
          massKg: 1000,
          enterTemp: 25,
          storageTemp: inputs.tempIn,
          aboveFreezeEnabled: true,
          latentEnabled: false,
          belowFreezeEnabled: false,
          pulldownHours: 12,
          crf: 0.67,
        } satisfies ProductLoad,
      ],
    });
  };

  const updateProduct = (i: number, patch: Partial<ProductLoad>) => {
    onChange({
      products: inputs.products.map((p, idx) => idx === i ? { ...p, ...patch } : p),
    });
  };

  const removeProduct = (i: number) => {
    onChange({ products: inputs.products.filter((_, idx) => idx !== i) });
  };

  const { packaging } = inputs;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-primary flex items-center gap-2">
          <Package className="h-4 w-4" />
          حمل المنتج والتغليف وإزالة الصقيع
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/30 p-2.5 rounded-lg">
          جداول 2-5 إلى 2-8 — خصائص المنتج | الحساب: Q = M × Cp × ΔT × 1000 / (3600 × n × CRF)
        </p>

        {inputs.products.map((p, i) => (
          <ProductRow key={i} prod={p} index={i}
            onUpdate={patch => updateProduct(i, patch)}
            onRemove={() => removeProduct(i)} />
        ))}

        <Button variant="outline" className="w-full gap-2 text-sm" onClick={addProduct}>
          <PlusCircle className="h-4 w-4" /> إضافة منتج
        </Button>

        {/* التغليف */}
        <div className="border rounded-lg p-3 space-y-3">
          <div className="flex items-center gap-3">
            <Switch checked={packaging.enabled}
              onCheckedChange={v => onChange({ packaging: { ...packaging, enabled: v } })} />
            <span className="text-sm font-semibold">التغليف — جدول 2-19</span>
          </div>
          {packaging.enabled && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <Label className="text-xs font-medium">مادة التغليف</Label>
                <Select value={packaging.packagingMaterialId}
                  onValueChange={v => onChange({ packaging: { ...packaging, packagingMaterialId: v } })}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PACKAGING_MATERIALS.map(m => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.nameAr} (Cp={m.cp} kJ/kg·K)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {[
                { label: "عدد الصناديق", key: "boxCount", step: 1, fallback: 0 },
                { label: "وزن الصندوق (kg)", key: "massPerBoxKg", step: 0.1, fallback: 0 },
                { label: "درجة الدخول (°C)", key: "enterTemp", step: 0.5, fallback: 0 },
                { label: "درجة التخزين (°C)", key: "storageTemp", step: 0.5, fallback: 0 },
                { label: "وقت التبريد (h)", key: "pulldownHours", step: 0.5, fallback: 1 },
              ].map(({ label, key, step, fallback }) => (
                <div key={key} className="space-y-1.5">
                  <Label className="text-xs font-medium">{label}</Label>
                  <NumericInput className="h-8 text-xs" step={step} fallback={fallback}
                    value={((packaging as unknown) as Record<string, number>)[key]}
                    onChange={v => onChange({ packaging: { ...packaging, [key]: v } })} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* إزالة الصقيع */}
        <div className="border rounded-lg p-3 space-y-3">
          <div className="flex items-center gap-3">
            <Switch checked={inputs.defrost.enabled}
              onCheckedChange={v => onChange({ defrost: { ...inputs.defrost, enabled: v } })} />
            <span className="text-sm font-semibold">إزالة الصقيع (Defrost)</span>
          </div>
          {inputs.defrost.enabled && (
            <>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "عدد السخانات", key: "heaterCount", step: 1, fallback: 0 },
                  { label: "قدرة كل سخان (W)", key: "powerEachW", step: 100, fallback: 0 },
                  { label: "معامل الاستخدام", key: "usageFactor", step: 0.05, fallback: 0 },
                ].map(({ label, key, step, fallback }) => (
                  <div key={key} className="space-y-1.5">
                    <Label className="text-xs font-medium">{label}</Label>
                    <NumericInput className="h-8 text-xs" step={step} min={0} fallback={fallback}
                      value={((inputs.defrost as unknown) as Record<string, number>)[key]}
                      onChange={v => onChange({ defrost: { ...inputs.defrost, [key]: v } })} />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-2">
                Q = {inputs.defrost.heaterCount} × {inputs.defrost.usageFactor} × {inputs.defrost.powerEachW}
                = <span className="font-bold text-primary">{(inputs.defrost.heaterCount * inputs.defrost.usageFactor * inputs.defrost.powerEachW).toFixed(1)} W</span>
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
