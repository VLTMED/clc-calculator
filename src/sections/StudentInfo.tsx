import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GraduationCap } from "lucide-react";
import type { CLCInputs } from "@/types/inputs";

interface Props {
  inputs: CLCInputs;
  onChange: (partial: Partial<CLCInputs>) => void;
}

export function StudentInfo({ inputs, onChange }: Props) {
  const [enabled, setEnabled] = useState(true);
  const { studentInfo } = inputs;
  const fields = [
    { label: "اسم الطالب", key: "studentName", placeholder: "أدخل الاسم الكامل" },
    { label: "رقم الطالب", key: "studentId",   placeholder: "رقم القيد الجامعي" },
    { label: "الجامعة / المؤسسة", key: "university", placeholder: "اسم الجامعة" },
    { label: "اسم الأستاذ", key: "professorName", placeholder: "اسم الأستاذ المشرف" },
    { label: "اسم المشروع", key: "projectName", placeholder: "اسم أو وصف المشروع" },
    { label: "التاريخ", key: "date", placeholder: "yyyy/mm/dd" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-primary flex items-center justify-between">
          <span className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            بيانات الطالب والمشروع
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-normal text-muted-foreground">
              {enabled ? "إخفاء" : "إظهار"}
            </span>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>
        </CardTitle>
      </CardHeader>
      {enabled && (
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(({ label, key, placeholder }) => (
              <div key={key} className="space-y-1.5">
                <Label className="text-xs font-medium">{label}</Label>
                <Input
                  placeholder={placeholder}
                  className="text-right"
                  value={((studentInfo as unknown) as Record<string, string>)[key] ?? ""}
                  onChange={e => onChange({ studentInfo: { ...studentInfo, [key]: e.target.value } })}
                />
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
