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
import { ThermometerSun, MapPin, Building2 } from "lucide-react";
import { SAUDI_CITIES } from "@/data/cities";
import type { CalculationInputs } from "@/types/inputs";

interface Props {
  inputs: CalculationInputs;
  onChange: (field: string, value: number | string) => void;
}

export function DimensionsSection({ inputs, onChange }: Props) {
  return (
    <div className="space-y-4">
      {/* Room Dimensions */}
      <Card className="border-blue-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-800 font-display">
            <Building2 className="w-5 h-5 text-blue-600" />
            أبعاد الحيز المبرد/المكيف
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="length" className="text-sm font-medium font-sans">
                الطول (m)
              </Label>
              <Input
                id="length"
                type="number"
                value={inputs.length}
                onChange={(e) =>
                  onChange("length", parseFloat(e.target.value) || 0)
                }
                className="text-start"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width" className="text-sm font-medium font-sans">
                العرض (m)
              </Label>
              <Input
                id="width"
                type="number"
                value={inputs.width}
                onChange={(e) =>
                  onChange("width", parseFloat(e.target.value) || 0)
                }
                className="text-start"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height" className="text-sm font-medium font-sans">
                الارتفاع (m)
              </Label>
              <Input
                id="height"
                type="number"
                value={inputs.height}
                onChange={(e) =>
                  onChange("height", parseFloat(e.target.value) || 0)
                }
                className="text-start"
              />
            </div>
          </div>

          <Separator />

          {/* Quick info badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              المساحة: {(inputs.length * inputs.width).toFixed(1)} m²
            </Badge>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              الحجم: {(
                inputs.length *
                inputs.width *
                inputs.height
              ).toFixed(1)} m³
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Temperature & Location */}
      <Card className="border-amber-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-amber-800 font-display">
            <ThermometerSun className="w-5 h-5 text-amber-600" />
            الظروف الحرارية والموقع
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tempIn" className="text-sm font-medium font-sans">
                درجة حرارة الداخل (°C)
              </Label>
              <Input
                id="tempIn"
                type="number"
                value={inputs.tempIn}
                onChange={(e) =>
                  onChange("tempIn", parseFloat(e.target.value) || 0)
                }
                className="text-start"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tempOut" className="text-sm font-medium font-sans">
                درجة حرارة الخارج (°C)
              </Label>
              <Input
                id="tempOut"
                type="number"
                value={inputs.tempOut}
                onChange={(e) =>
                  onChange("tempOut", parseFloat(e.target.value) || 0)
                }
                className="text-start"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="groundTemp" className="text-sm font-medium font-sans">
                حرارة الأرض/الهواء (°C)
              </Label>
              <Input
                id="groundTemp"
                type="number"
                value={inputs.groundTemp}
                onChange={(e) =>
                  onChange("groundTemp", parseFloat(e.target.value) || 0)
                }
                className="text-start"
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                المدينة
              </Label>
              <Select
                value={inputs.location}
                onValueChange={(value) => onChange("location", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  {SAUDI_CITIES.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name} (جافة: {city.dryTemp}°C | رطبة: {city.wetTemp}°C)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="isGroundFloor" className="text-sm font-medium font-sans">
                موقع الحيز
              </Label>
              <Select
                value={inputs.isGroundFloor.toString()}
                onValueChange={(value) =>
                  onChange("isGroundFloor", parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">الأرض (Ground Floor)</SelectItem>
                  <SelectItem value="0">مختلف (Not Ground)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* CLTD Display */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="font-medium text-amber-800">
                فرق الحرارة (CLTD):{" "}
                <span className="text-lg font-bold">
                  {inputs.tempOut - inputs.tempIn}°C
                </span>
              </span>
              <span className="text-amber-600">
                حرارة الأرض - الداخل: {inputs.groundTemp - inputs.tempIn}°C
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
