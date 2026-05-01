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

function FieldRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-sm font-medium text-slate-700 flex-1 leading-snug">{label}</div>
      <div className="w-32 shrink-0">{children}</div>
    </div>
  );
}

export function GlassSection({ inputs, onChange }: Props) {
  return (
    <div className="space-y-4">

      {/* ── Solar ── */}
      <Card className="border-amber-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-amber-800 font-display">
            <Sun className="w-5 h-5 text-amber-600 shrink-0" />
            تأثير الإشعاع الشمسي على الجدران والسقف
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label htmlFor="considerSolar"
            className="flex items-center gap-3 cursor-pointer select-none py-1">
            <span className="flex-1 text-sm font-medium">أخذ تأثير الأشعة الشمسية بالحسبان؟</span>
            <input type="checkbox" id="considerSolar"
              checked={inputs.considerSolar === 1}
              onChange={(e) => onChange("considerSolar", e.target.checked ? 1 : 0)}
              className="w-5 h-5 shrink-0 rounded accent-amber-600" />
          </label>

          {inputs.considerSolar === 1 && (
            <>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> معامل الامتصاص (a)
                </Label>
                <Select value={inputs.absorptance.toString()}
                  onValueChange={(v) => onChange("absorptance", parseFloat(v))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.89">الأسفلت (0.89)</SelectItem>
                    <SelectItem value="0.65">الخرسانة (0.65)</SelectItem>
                    <SelectItem value="0.77">الطوب الأحمر (0.77)</SelectItem>
                    <SelectItem value="0.26">الطوب الأبيض (0.26)</SelectItem>
                    <SelectItem value="0.57">المونة الأسمنتية (0.57)</SelectItem>
                    <SelectItem value="0.40">المونة الجبسية (0.40)</SelectItem>
                    <SelectItem value="0.91">العازل الحراري (0.91)</SelectItem>
                    <SelectItem value="0.90">البيتومين (0.90)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FieldRow label="شدة الإشعاع الشمسي (W/m²)">
                <Input type="number" value={inputs.radiation}
                  onChange={(e) => onChange("radiation", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>
            </>
          )}
        </CardContent>
      </Card>

      {/* ── Glass ── */}
      <Card className="border-sky-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-sky-800 font-display">
            <GlassWater className="w-5 h-5 text-sky-600 shrink-0" />
            أحمال النوافذ الزجاجية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label htmlFor="glassEnabled"
            className="flex items-center gap-3 cursor-pointer select-none py-1">
            <span className="flex-1 text-sm font-medium">أخذ حمل الزجاج بالحسبان؟</span>
            <input type="checkbox" id="glassEnabled"
              checked={inputs.glassEnabled === 1}
              onChange={(e) => onChange("glassEnabled", e.target.checked ? 1 : 0)}
              className="w-5 h-5 shrink-0 rounded accent-sky-600" />
          </label>

          {inputs.glassEnabled === 1 && (
            <>
              <FieldRow label="مساحة الزجاج (m²)">
                <Input type="number" value={inputs.glassArea}
                  onChange={(e) => onChange("glassArea", parseFloat(e.target.value) || 0)}
                  dir="ltr" className="text-center font-mono" />
              </FieldRow>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">U-Value الزجاج</Label>
                <Select value={inputs.glassU.toString()}
                  onValueChange={(v) => onChange("glassU", parseFloat(v))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {GLASS_U_VALUES.map((g) => (
                      <SelectItem key={g.id} value={g.uSummer.toString()}>
                        {g.description} ({g.uSummer})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">الاتجاه</Label>
                <Select value={inputs.glassDirection}
                  onValueChange={(v) => onChange("glassDirection", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="شمالي">شمالي</SelectItem>
                    <SelectItem value="جنوبي">جنوبي</SelectItem>
                    <SelectItem value="شرقي">شرقي</SelectItem>
                    <SelectItem value="غربي">غربي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 space-y-3">
                <div className="text-sm font-medium text-sky-800">طريقة حساب حمل الزجاج</div>

                <label htmlFor="useSCMethod"
                  className="flex items-center gap-3 cursor-pointer select-none py-1">
                  <span className="flex-1 text-sm">استخدام طريقة SC × SHGF × CLF</span>
                  <input type="checkbox" id="useSCMethod"
                    checked={inputs.useSCMethod === 1}
                    onChange={(e) => onChange("useSCMethod", e.target.checked ? 1 : 0)}
                    className="w-5 h-5 shrink-0 rounded accent-sky-600" />
                </label>

                {inputs.useSCMethod === 1 ? (
                  <div className="space-y-2">
                    {[
                      { label: "معامل التظليل SC", field: "scValue", val: inputs.scValue, step: "0.01" },
                      { label: "SHGF", field: "shgfValue", val: inputs.shgfValue, step: "1" },
                      { label: "معامل الحمل الشمسي CLF", field: "clfValue", val: inputs.clfValue, step: "0.01" },
                    ].map(({ label, field, val, step }) => (
                      <div key={field} className="flex items-center gap-2">
                        <span className="text-xs text-slate-600 flex-1">{label}</span>
                        <Input type="number" step={step} value={val}
                          onChange={(e) => onChange(field, parseFloat(e.target.value) || 0)}
                          className="h-8 text-xs text-center font-mono w-24 shrink-0"
                          dir="ltr" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-600 flex-1">حرارة مكتسبة للزجاج (W/m²)</span>
                      <Input type="number" value={inputs.glassSHGF}
                        onChange={(e) => onChange("glassSHGF", parseFloat(e.target.value) || 0)}
                        className="h-8 text-xs text-center font-mono w-24 shrink-0" dir="ltr" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-slate-600">معامل التضليل (SC)</Label>
                      <Select value={inputs.shadingCoefficient.toString()}
                        onValueChange={(v) => onChange("shadingCoefficient", parseFloat(v))}>
                        <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {SHADING_COEFFICIENTS.map((sc, i) => (
                            <SelectItem key={i} value={sc.noShading.toString()}>
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
