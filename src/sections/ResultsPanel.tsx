import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Thermometer,
  Sun,
  GlassWater,
  Users,
  Package,
  Wind,
  Zap,
  TrendingUp,
  Snowflake,
} from "lucide-react";
import type { DetailedResults } from "@/engine/calculator";
import type { CalculationInputs } from "@/types/inputs";

interface Props {
  results: DetailedResults;
  inputs: CalculationInputs;
}

interface ResultRowProps {
  label: string;
  value: number;
  unit?: string;
  highlight?: boolean;
}

function ResultRow({ label, value, unit = "W", highlight }: ResultRowProps) {
  return (
    <TableRow className={highlight ? "bg-blue-50/50 font-medium" : ""}>
      <TableCell className="py-2">{label}</TableCell>
      <TableCell className="py-2 text-start font-mono" dir="ltr">
        {value.toFixed(2)}
      </TableCell>
      <TableCell className="py-2 text-start">{unit}</TableCell>
    </TableRow>
  );
}

export function ResultsPanel({ results, inputs }: Props) {
  return (
    <Card className="border-2 border-blue-200 shadow-xl bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg pb-4">
        <CardTitle className="text-xl flex items-center gap-2 font-display">
          <TrendingUp className="w-6 h-6" />
          لوحة النتائج المفصلة
        </CardTitle>
        <p className="text-blue-100 text-sm font-sans font-light">
          جميع الأحمال المحسوبة بدقة 100%
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[80vh]">
          {/* System Capacity Summary */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
            <h3 className="text-lg font-black text-amber-800 mb-3 text-center font-display">
              السعة النهائية للمنظومة
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 text-center shadow-sm border border-amber-200">
                <div className="text-2xl font-black text-amber-700 font-sans">
                  {results.tons.toFixed(2)}
                </div>
                <div className="text-xs text-amber-600">طن تبريد (Ton)</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm border border-amber-200">
                <div className="text-2xl font-black text-amber-700 font-sans">
                  {results.kw.toFixed(2)}
                </div>
                <div className="text-xs text-amber-600">كيلوواط (kW)</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm border border-amber-200">
                <div className="text-2xl font-black text-amber-700 font-sans">
                  {results.grandTotal.toFixed(2)}
                </div>
                <div className="text-xs text-amber-600">
                  الحمل الإجمالي (W)
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm border border-amber-200">
                <div className="text-2xl font-black text-amber-700 font-sans">
                  {results.requiredCapacity.toFixed(2)}
                </div>
                <div className="text-xs text-amber-600">
                  السعة المطلوبة (W)
                </div>
              </div>
            </div>
            <div className="mt-3 text-center text-xs text-amber-700 bg-white rounded p-2 border border-amber-200">
              معامل الأمان: {inputs.safetyFactor}% | ساعات التشغيل: {" "}
              {inputs.operationHours}h/يوم
            </div>
          </div>

          {/* Detailed Results Table */}
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100">
                <TableHead className="text-start font-bold">بند الحمل</TableHead>
                <TableHead className="text-start font-bold" dir="ltr">
                  القيمة
                </TableHead>
                <TableHead className="text-start font-bold">الوحدة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Section 1: Transmission */}
              <TableRow className="bg-blue-100">
                <TableCell
                  colSpan={3}
                  className="py-2 font-bold text-blue-800 flex items-center gap-2"
                >
                  <Thermometer className="w-4 h-4" />
                  1. أحمال التوصيل (Transmission)
                </TableCell>
              </TableRow>
              <ResultRow label="السقف" value={results.roofLoad} />
              <ResultRow label="الأرضية" value={results.floorLoad} />
              <ResultRow label="الجدار الشمالي" value={results.northWallLoad} />
              <ResultRow label="الجدار الجنوبي" value={results.southWallLoad} />
              <ResultRow label="الجدار الشرقي" value={results.eastWallLoad} />
              <ResultRow label="الجدار الغربي" value={results.westWallLoad} />
              <ResultRow
                label="المجموع"
                value={results.totalTransmission}
                highlight
              />

              {/* Section 2: Solar */}
              <TableRow className="bg-amber-100">
                <TableCell
                  colSpan={3}
                  className="py-2 font-bold text-amber-800 flex items-center gap-2"
                >
                  <Sun className="w-4 h-4" />
                  2. أحمال الإشعاع الشمسي (Solar Radiation)
                </TableCell>
              </TableRow>
              <ResultRow label="إشعاع السقف" value={results.solarRoof} />
              <ResultRow label="إشعاع الشمالي" value={results.solarNorth} />
              <ResultRow label="إشعاع الجنوبي" value={results.solarSouth} />
              <ResultRow label="إشعاع الشرقي" value={results.solarEast} />
              <ResultRow label="إشعاع الغربي" value={results.solarWest} />
              <ResultRow label="المجموع" value={results.totalSolar} highlight />

              {/* Section 3: Glass */}
              <TableRow className="bg-sky-100">
                <TableCell
                  colSpan={3}
                  className="py-2 font-bold text-sky-800 flex items-center gap-2"
                >
                  <GlassWater className="w-4 h-4" />
                  3. أحمال الزجاج (Glass)
                </TableCell>
              </TableRow>
              <ResultRow label="توصيل الزجاج" value={results.glassTransmission} />
              <ResultRow label="إشعاع الزجاج" value={results.glassSolar} />
              <ResultRow label="المجموع" value={results.totalGlass} highlight />

              {/* Section 4: Internal */}
              <TableRow className="bg-emerald-100">
                <TableCell
                  colSpan={3}
                  className="py-2 font-bold text-emerald-800 flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  4. الأحمال الداخلية (Internal)
                </TableCell>
              </TableRow>
              <ResultRow label="الإضاءة" value={results.lightingLoad} />
              <ResultRow label="الأشخاص" value={results.peopleLoad} />
              <ResultRow label="المعدات" value={results.equipmentLoad} />
              <ResultRow label="المجموع" value={results.totalInternal} highlight />

              {/* Section 5: Product */}
              <TableRow className="bg-violet-100">
                <TableCell
                  colSpan={3}
                  className="py-2 font-bold text-violet-800 flex items-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  5. أحمال المنتج (Product)
                </TableCell>
              </TableRow>
              <ResultRow
                label="فوق التجميد (Sensible)"
                value={results.productAboveFreezing}
              />
              <ResultRow
                label="تحت التجميد"
                value={results.productBelowFreezing}
              />
              <ResultRow
                label="الحرارة الكامنة (Latent)"
                value={results.latentHeatLoad}
              />
              <ResultRow
                label="حرارة التنفس"
                value={results.respirationLoad}
              />
              <ResultRow label="التغليف" value={results.packagingLoad} />
              <ResultRow label="المجموع" value={results.totalProduct} highlight />

              {/* Section 6: Air */}
              <TableRow className="bg-cyan-100">
                <TableCell
                  colSpan={3}
                  className="py-2 font-bold text-cyan-800 flex items-center gap-2"
                >
                  <Wind className="w-4 h-4" />
                  6. أحمال الهواء (Air Infiltration & Ventilation)
                </TableCell>
              </TableRow>
              <ResultRow label="التسرب" value={results.infiltrationLoad} />
              <ResultRow label="التهوية" value={results.ventilationLoad} />
              <ResultRow label="تغيير الهواء" value={results.airChangeLoad} />
              <ResultRow label="المجموع" value={results.totalAir} highlight />

              {/* Section 7: Other */}
              <TableRow className="bg-rose-100">
                <TableCell
                  colSpan={3}
                  className="py-2 font-bold text-rose-800 flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  7. أحمال أخرى
                </TableCell>
              </TableRow>
              <ResultRow label="أذابة الصقيع" value={results.defrostLoad} />
              <ResultRow
                label="الطريقة المختصرة"
                value={results.usageLoad}
              />

              {/* Grand Total */}
              <Separator />
              <TableRow className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <TableCell className="py-3 font-bold text-lg">
                  الحمل الإجمالي
                </TableCell>
                <TableCell className="py-3 text-start font-bold text-lg font-mono" dir="ltr">
                  {results.grandTotal.toFixed(2)}
                </TableCell>
                <TableCell className="py-3 font-bold">W</TableCell>
              </TableRow>
              <TableRow className="bg-amber-50">
                <TableCell className="py-2 font-medium">
                  مع معامل الأمان ({inputs.safetyFactor}%)
                </TableCell>
                <TableCell className="py-2 text-start font-bold font-mono" dir="ltr">
                  {results.totalWithSafety.toFixed(2)}
                </TableCell>
                <TableCell className="py-2">W</TableCell>
              </TableRow>
              <TableRow className="bg-amber-50">
                <TableCell className="py-2 font-medium">
                  السعة المطلوبة ({inputs.operationHours}h تشغيل)
                </TableCell>
                <TableCell className="py-2 text-start font-bold font-mono" dir="ltr">
                  {results.requiredCapacity.toFixed(2)}
                </TableCell>
                <TableCell className="py-2">W</TableCell>
              </TableRow>
              <TableRow className="bg-amber-100">
                <TableCell className="py-2 font-bold">
                  <Snowflake className="w-4 h-4 inline me-1" />
                  السعة بالكيلوواط
                </TableCell>
                <TableCell className="py-2 text-start font-bold text-lg font-mono" dir="ltr">
                  {results.kw.toFixed(2)}
                </TableCell>
                <TableCell className="py-2 font-bold">kW</TableCell>
              </TableRow>
              <TableRow className="bg-amber-200">
                <TableCell className="py-3 font-bold text-lg">
                  <Snowflake className="w-5 h-5 inline me-1" />
                  السعة بالطن
                </TableCell>
                <TableCell className="py-3 text-start font-bold text-xl font-mono text-amber-800" dir="ltr">
                  {results.tons.toFixed(2)}
                </TableCell>
                <TableCell className="py-3 font-bold text-lg">Ton</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
