import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, GraduationCap, School, BookOpen } from "lucide-react";
import { useState } from "react";

export function StudentInfo() {
  const [info, setInfo] = useState({
    name: "",
    id: "",
    college: "",
    department: "",
    course: "",
    doctor: "",
  });

  return (
    <Card className="border-slate-300 shadow-sm print:border-2 print:border-black">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-slate-700">
          <GraduationCap className="w-5 h-5 text-slate-500" />
          بيانات الطالب
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1">
              <User className="w-3 h-3" />
              اسم الطالب
            </Label>
            <Input
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              placeholder="أدخل اسم الطالب"
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">رقم القيد</Label>
            <Input
              value={info.id}
              onChange={(e) => setInfo({ ...info, id: e.target.value })}
              placeholder="رقم القيد"
              className="h-8 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1">
              <School className="w-3 h-3" />
              الكلية
            </Label>
            <Input
              value={info.college}
              onChange={(e) => setInfo({ ...info, college: e.target.value })}
              placeholder="أدخل اسم الكلية"
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">القسم</Label>
            <Input
              value={info.department}
              onChange={(e) =>
                setInfo({ ...info, department: e.target.value })
              }
              placeholder="أدخل اسم القسم"
              className="h-8 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              المقرر
            </Label>
            <Input
              value={info.course}
              onChange={(e) => setInfo({ ...info, course: e.target.value })}
              placeholder="أدخل اسم المقرر"
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">اسم الدكتور</Label>
            <Input
              value={info.doctor}
              onChange={(e) => setInfo({ ...info, doctor: e.target.value })}
              placeholder="أدخل اسم الدكتور"
              className="h-8 text-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
