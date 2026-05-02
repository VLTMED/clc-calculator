// ═══════════════════════════════════════════════════════════════════
// جداول المنتجات 2-5 إلى 2-8
// المصدر: ورقة الجداول
// crf = معامل معدل التبريد
// water = نسبة الماء %
// tf = درجة حرارة الانجماد (°C)
// lh = الحرارة الكامنة (kJ/kg)
// cpAbove = الحرارة النوعية فوق التجميد (kJ/kg·K)
// cpBelow = الحرارة النوعية تحت التجميد (kJ/kg·K)
// ═══════════════════════════════════════════════════════════════════

export interface Product {
  id: string;
  nameAr: string;
  category: "fruit" | "vegetable" | "meat" | "dairy" | "other";
  crf: number;
  water: number;
  tf: number;
  lh: number;
  cpAbove: number;
  cpBelow: number;
  humid: string;
  storageTemp: string;
}

export const PRODUCTS: Product[] = [
  // ═══ الفواكه — جدول 2-5 ═══
  { id: "تفاح",         nameAr: "تفاح",              category: "fruit",     crf: 0.67, water: 84,  tf: -1.1,  lh: 280, cpAbove: 3.65, cpBelow: 1.89, humid: "90-95",   storageTemp: "-1 إلى 4"  },
  { id: "مشمش",         nameAr: "مشمش",              category: "fruit",     crf: 0.67, water: 85,  tf: -1.1,  lh: 284, cpAbove: 3.68, cpBelow: 1.90, humid: "90-95",   storageTemp: "0"         },
  { id: "افوكادو",      nameAr: "افوكادو-خضراء",     category: "fruit",     crf: 0.67, water: 65,  tf: -0.3,  lh: 217, cpAbove: 3.01, cpBelow: 1.65, humid: "85-90",   storageTemp: "7-10"      },
  { id: "موز",          nameAr: "موز",               category: "fruit",     crf: 0.10, water: 75,  tf: -0.8,  lh: 250, cpAbove: 3.35, cpBelow: 1.78, humid: "85-95",   storageTemp: "0"         },
  { id: "عليق",         nameAr: "العليق",             category: "fruit",     crf: 0.67, water: 85,  tf: -0.8,  lh: 284, cpAbove: 3.68, cpBelow: 1.90, humid: "90-100",  storageTemp: "0"         },
  { id: "عنب_بري",      nameAr: "العنب البري",        category: "fruit",     crf: 0.67, water: 82,  tf: -1.6,  lh: 274, cpAbove: 3.58, cpBelow: 1.86, humid: "90-95",   storageTemp: "0"         },
  { id: "كانتيلوب",     nameAr: "كانتيلوب",           category: "fruit",     crf: 0.90, water: 92,  tf: -1.2,  lh: 307, cpAbove: 3.92, cpBelow: 1.99, humid: "90",      storageTemp: "2-4"       },
  { id: "بطيخ",         nameAr: "بطّيخ",              category: "fruit",     crf: 0.90, water: 93,  tf: -1.1,  lh: 310, cpAbove: 3.95, cpBelow: 2.00, humid: "85-95",   storageTemp: "7-10"      },
  { id: "جوز_هند",      nameAr: "جوز هند",            category: "fruit",     crf: 0.67, water: 47,  tf: -0.9,  lh: 157, cpAbove: 2.41, cpBelow: 1.43, humid: "80-85",   storageTemp: "0-2"       },
  { id: "كرز",          nameAr: "الكرز",              category: "fruit",     crf: 0.67, water: 80,  tf: -1.8,  lh: 267, cpAbove: 3.51, cpBelow: 1.84, humid: "95",      storageTemp: "-1-0"      },
  { id: "توت",          nameAr: "التّوت",             category: "fruit",     crf: 0.67, water: 87,  tf: -0.9,  lh: 290, cpAbove: 3.75, cpBelow: 1.93, humid: "90-95",   storageTemp: "2-4"       },
  { id: "زبيب",         nameAr: "زبيب",               category: "fruit",     crf: 0.67, water: 85,  tf: -1.0,  lh: 284, cpAbove: 3.68, cpBelow: 1.90, humid: "90-95",   storageTemp: "-0.5-0"    },
  { id: "تمر",          nameAr: "التمر",              category: "fruit",     crf: 0.67, water: 20,  tf: -16.0, lh:  67, cpAbove: 1.50, cpBelow: 1.09, humid: "≤75",     storageTemp: "-18-0"     },
  { id: "تين_جاف",      nameAr: "تين جاف",            category: "fruit",     crf: 0.67, water: 23,  tf: -1.0,  lh:  77, cpAbove: 1.61, cpBelow: 1.12, humid: "50-60",   storageTemp: "0-4"       },
  { id: "تين_طازج",     nameAr: "تين طازج",           category: "fruit",     crf: 0.67, water: 78,  tf: -2.4,  lh: 260, cpAbove: 3.45, cpBelow: 1.81, humid: "85-90",   storageTemp: "-1-0"      },
  { id: "جوز_بيري",     nameAr: "الجوز بيري",         category: "fruit",     crf: 0.67, water: 89,  tf: -1.1,  lh: 297, cpAbove: 3.82, cpBelow: 1.95, humid: "90-95",   storageTemp: "0"         },
  { id: "عنب",          nameAr: "العنب",               category: "fruit",     crf: 0.80, water: 82,  tf: -2.0,  lh: 274, cpAbove: 3.58, cpBelow: 1.86, humid: "95-100",  storageTemp: "-1-0"      },
  { id: "شهد",          nameAr: "الشهد",               category: "fruit",     crf: 0.67, water: 93,  tf: -0.9,  lh: 310, cpAbove: 3.95, cpBelow: 2.00, humid: "90",      storageTemp: "7-10"      },
  { id: "ليمون",        nameAr: "الليمون",             category: "fruit",     crf: 1.00, water: 89,  tf: -1.4,  lh: 297, cpAbove: 3.82, cpBelow: 1.95, humid: "85-90",   storageTemp: "15-18"     },
  { id: "ليمون_حامض",   nameAr: "الليمون الحامض",     category: "fruit",     crf: 0.90, water: 86,  tf: -1.6,  lh: 287, cpAbove: 3.72, cpBelow: 1.92, humid: "85-90",   storageTemp: "9-10"      },
  { id: "مانجو",        nameAr: "المانجو",             category: "fruit",     crf: 0.67, water: 81,  tf: -0.9,  lh: 270, cpAbove: 3.55, cpBelow: 1.85, humid: "85-90",   storageTemp: "13"        },
  { id: "زيتون",        nameAr: "الزيتون",             category: "fruit",     crf: 0.67, water: 75,  tf: -1.4,  lh: 250, cpAbove: 3.35, cpBelow: 1.78, humid: "85-90",   storageTemp: "7-10"      },
  { id: "برتقال",       nameAr: "برتقال",              category: "fruit",     crf: 0.70, water: 87,  tf: -0.8,  lh: 290, cpAbove: 3.75, cpBelow: 1.93, humid: "85-90",   storageTemp: "5"         },
  { id: "ببو",          nameAr: "ببو",                 category: "fruit",     crf: 0.67, water: 91,  tf: -0.8,  lh: 304, cpAbove: 3.88, cpBelow: 1.98, humid: "90",      storageTemp: "13"        },
  { id: "دراق",         nameAr: "الدّراق",             category: "fruit",     crf: 0.80, water: 89,  tf: -0.9,  lh: 297, cpAbove: 3.82, cpBelow: 1.95, humid: "90-95",   storageTemp: "0"         },
  { id: "كمثرى",        nameAr: "كمثرى",               category: "fruit",     crf: 0.80, water: 83,  tf: -1.6,  lh: 277, cpAbove: 3.61, cpBelow: 1.88, humid: "90-95",   storageTemp: "-1.6-0"    },
  { id: "شمام",         nameAr: "الشمام",               category: "fruit",     crf: 0.90, water: 93,  tf: -0.8,  lh: 310, cpAbove: 3.95, cpBelow: 2.00, humid: "90-95",   storageTemp: "7-10"      },
  { id: "بريسمون",      nameAr: "البريسمون",            category: "fruit",     crf: 0.67, water: 78,  tf: -2.2,  lh: 260, cpAbove: 3.45, cpBelow: 1.81, humid: "90",      storageTemp: "-1"        },
  { id: "اناناس",       nameAr: "انناس",                category: "fruit",     crf: 0.67, water: 85,  tf: -1.0,  lh: 284, cpAbove: 3.68, cpBelow: 1.90, humid: "85-90",   storageTemp: "20"        },
  { id: "خوخ",          nameAr: "خوخ",                 category: "fruit",     crf: 0.67, water: 86,  tf: -0.8,  lh: 287, cpAbove: 3.72, cpBelow: 1.92, humid: "90-95",   storageTemp: "-0.5-0"    },
  { id: "برقوق",        nameAr: "البرقوق",              category: "fruit",     crf: 0.67, water: 86,  tf: -0.8,  lh: 287, cpAbove: 3.72, cpBelow: 1.92, humid: "90-95",   storageTemp: "-0.5-0"    },
  { id: "رمان",         nameAr: "الرمان",               category: "fruit",     crf: 0.67, water: 85,  tf: -3.0,  lh: 274, cpAbove: 3.58, cpBelow: 1.86, humid: "90",      storageTemp: "0"         },
  { id: "سفرجل",        nameAr: "السّفرجل",             category: "fruit",     crf: 0.67, water: 85,  tf: -2.0,  lh: 284, cpAbove: 3.68, cpBelow: 1.90, humid: "90",      storageTemp: "-1-0"      },
  { id: "فراولة",       nameAr: "الفراولة",             category: "fruit",     crf: 0.67, water: 90,  tf: -0.8,  lh: 300, cpAbove: 3.85, cpBelow: 1.97, humid: "90-100",  storageTemp: "0"         },
  { id: "يوسفي",        nameAr: "اليوسفيّ",             category: "fruit",     crf: 0.67, water: 87,  tf: -1.1,  lh: 290, cpAbove: 3.75, cpBelow: 1.93, humid: "90-95",   storageTemp: "0"         },

  // ═══ الخضراوات — جدول 2-6 ═══
  { id: "خرشوف",        nameAr: "خرشوف",               category: "vegetable", crf: 0.67, water: 84,  tf: -1.2,  lh: 280, cpAbove: 3.65, cpBelow: 1.89, humid: "95-100",  storageTemp: "0"         },
  { id: "هليون",        nameAr: "الهليون",              category: "vegetable", crf: 0.90, water: 93,  tf: -0.6,  lh: 310, cpAbove: 3.95, cpBelow: 2.00, humid: "95-100",  storageTemp: "0-2"       },
  { id: "فاصوليا",      nameAr: "فاصوليا/خ",           category: "vegetable", crf: 0.67, water: 93,  tf: -0.7,  lh: 297, cpAbove: 3.82, cpBelow: 1.95, humid: "95-100",  storageTemp: "7-10"      },
  { id: "بروكولي",      nameAr: "بروكولي",              category: "vegetable", crf: 0.67, water: 85,  tf: -0.8,  lh: 284, cpAbove: 3.68, cpBelow: 1.90, humid: "95-100",  storageTemp: "0"         },
  { id: "لهانة",        nameAr: "لهانة",                category: "vegetable", crf: 0.67, water: 92,  tf: -0.9,  lh: 307, cpAbove: 3.92, cpBelow: 1.99, humid: "98-100",  storageTemp: "0"         },
  { id: "جزر",          nameAr: "جزر",                  category: "vegetable", crf: 0.80, water: 88,  tf: -1.4,  lh: 294, cpAbove: 3.78, cpBelow: 1.94, humid: "98-100",  storageTemp: "0"         },
  { id: "قرنابيط",      nameAr: "قرنابيظ",              category: "vegetable", crf: 0.80, water: 92,  tf: -0.8,  lh: 307, cpAbove: 3.92, cpBelow: 1.99, humid: "95-100",  storageTemp: "0"         },
  { id: "كرفس",         nameAr: "كرفس",                 category: "vegetable", crf: 1.00, water: 94,  tf: -0.5,  lh: 314, cpAbove: 3.98, cpBelow: 2.02, humid: "95-100",  storageTemp: "0"         },
  { id: "ذرة_حلوة",     nameAr: "ذرة حلوة",             category: "vegetable", crf: 0.67, water: 74,  tf: -0.6,  lh: 247, cpAbove: 3.31, cpBelow: 1.76, humid: "95-100",  storageTemp: "0"         },
  { id: "خيار",         nameAr: "خيار",                 category: "vegetable", crf: 0.67, water: 96,  tf: -0.5,  lh: 320, cpAbove: 4.05, cpBelow: 2.04, humid: "95-100",  storageTemp: "10"        },
  { id: "باذنجان",      nameAr: "باذنجان",              category: "vegetable", crf: 0.67, water: 93,  tf: -0.8,  lh: 310, cpAbove: 3.95, cpBelow: 2.00, humid: "90-95",   storageTemp: "7-10"      },
  { id: "هندب",         nameAr: "هندب",                 category: "vegetable", crf: 0.67, water: 93,  tf: -0.1,  lh: 310, cpAbove: 3.95, cpBelow: 2.00, humid: "90-100",  storageTemp: "0"         },
  { id: "ثوم_جاف",      nameAr: "ثوم-جاف",              category: "vegetable", crf: 0.67, water: 61,  tf: -0.8,  lh: 203, cpAbove: 2.88, cpBelow: 1.60, humid: "65-70",   storageTemp: "0"         },
  { id: "ملفوف",        nameAr: "الملفوف",              category: "vegetable", crf: 0.70, water: 87,  tf: -0.5,  lh: 290, cpAbove: 3.75, cpBelow: 1.93, humid: "95",      storageTemp: "0"         },
  { id: "كراث",         nameAr: "كراث اخضر",            category: "vegetable", crf: 0.70, water: 85,  tf: -0.7,  lh: 284, cpAbove: 3.68, cpBelow: 1.90, humid: "95",      storageTemp: "0"         },
  { id: "خس",           nameAr: "خس",                   category: "vegetable", crf: 0.67, water: 95,  tf: -0.2,  lh: 317, cpAbove: 4.02, cpBelow: 2.03, humid: "95-100",  storageTemp: "0"         },
  { id: "فطر",          nameAr: "فطر",                  category: "vegetable", crf: 0.67, water: 91,  tf: -0.9,  lh: 304, cpAbove: 3.88, cpBelow: 1.98, humid: "95",      storageTemp: "0"         },
  { id: "بصل_جاف",      nameAr: "بصل جاف",              category: "vegetable", crf: 0.30, water: 88,  tf: -0.8,  lh: 294, cpAbove: 3.78, cpBelow: 1.94, humid: "65-70",   storageTemp: "0"         },
  { id: "بقدونس",       nameAr: "مقدونس",               category: "vegetable", crf: 0.67, water: 85,  tf: -1.1,  lh: 284, cpAbove: 3.68, cpBelow: 1.90, humid: "95-100",  storageTemp: "0"         },
  { id: "بازلاء_خضراء", nameAr: "بازيليا-خضراء",       category: "vegetable", crf: 0.67, water: 74,  tf: -0.6,  lh: 247, cpAbove: 3.31, cpBelow: 1.76, humid: "95-98",   storageTemp: "0"         },
  { id: "فلفل_حلو",     nameAr: "فلفل-حلو",             category: "vegetable", crf: 0.67, water: 93,  tf: -0.7,  lh: 307, cpAbove: 3.92, cpBelow: 1.99, humid: "90-95",   storageTemp: "7-13"      },
  { id: "بطاطا",        nameAr: "بطاطا",                category: "vegetable", crf: 0.67, water: 78,  tf: -0.7,  lh: 260, cpAbove: 3.45, cpBelow: 1.81, humid: "90-95",   storageTemp: "7"         },
  { id: "بطاطا_حلوة",   nameAr: "بطاطا-حلوة",           category: "vegetable", crf: 0.67, water: 69,  tf: -1.3,  lh: 230, cpAbove: 3.15, cpBelow: 1.70, humid: "85-90",   storageTemp: "16-31"     },
  { id: "قرع",          nameAr: "قرع",                  category: "vegetable", crf: 0.67, water: 91,  tf: -0.8,  lh: 304, cpAbove: 3.88, cpBelow: 1.98, humid: "85-90",   storageTemp: "31"        },
  { id: "فجل",          nameAr: "فجل",                  category: "vegetable", crf: 0.70, water: 95,  tf: -0.7,  lh: 317, cpAbove: 4.02, cpBelow: 2.03, humid: "90-95",   storageTemp: "0"         },
  { id: "طماطم",        nameAr: "طماطم ناضجة",          category: "vegetable", crf: 0.67, water: 93,  tf: -0.8,  lh: 310, cpAbove: 3.95, cpBelow: 2.00, humid: "90-95",   storageTemp: "0"         },

  // ═══ اللحوم والأسماك — جدول 2-7 ═══
  { id: "بقر",          nameAr: "بقر-طازج",             category: "meat",      crf: 0.67, water: 77,  tf: -2.7,  lh: 257, cpAbove: 3.40, cpBelow: 1.80, humid: "88-92",   storageTemp: "0-1"       },
  { id: "كبد_بقر",      nameAr: "بقر-كبده",             category: "meat",      crf: 0.56, water: 70,  tf: -1.7,  lh: 233, cpAbove: 3.18, cpBelow: 1.71, humid: "90",      storageTemp: "0"         },
  { id: "عجل",          nameAr: "عجل",                  category: "meat",      crf: 0.56, water: 77,  tf: -1.0,  lh: 220, cpAbove: 3.05, cpBelow: 1.66, humid: "90",      storageTemp: "0-1"       },
  { id: "ضان",          nameAr: "ضان-طازج",             category: "meat",      crf: 0.75, water: 70,  tf: -2.2,  lh: 233, cpAbove: 3.20, cpBelow: 1.70, humid: "85-90",   storageTemp: "0"         },
  { id: "دواجن",        nameAr: "دواجن-طازجة",          category: "meat",      crf: 1.00, water: 74,  tf: -2.8,  lh: 247, cpAbove: 3.31, cpBelow: 1.76, humid: "85-90",   storageTemp: "-2-0"      },
  { id: "ارانب",        nameAr: "أرانب",                 category: "meat",      crf: 0.67, water: 68,  tf: -1.0,  lh: 227, cpAbove: 3.11, cpBelow: 1.69, humid: "90-95",   storageTemp: "0-1"       },
  { id: "سمك",          nameAr: "سمك-طازج",             category: "meat",      crf: 0.67, water: 81,  tf: -2.2,  lh: 270, cpAbove: 3.55, cpBelow: 1.85, humid: "95-100",  storageTemp: "-1-1"      },
  { id: "محار",         nameAr: "المحارات الصدفية",     category: "meat",      crf: 0.67, water: 80,  tf: -2.2,  lh: 267, cpAbove: 3.51, cpBelow: 1.84, humid: "90-95",   storageTemp: "0-1"       },
  { id: "روبيان",       nameAr: "الرّوبيان",             category: "meat",      crf: 0.67, water: 76,  tf: -2.2,  lh: 270, cpAbove: 3.55, cpBelow: 1.85, humid: "95-100",  storageTemp: "-1-1"      },

  // ═══ منتجات ألبان وأخرى — جدول 2-8 ═══
  { id: "زبدة",         nameAr: "زبدة",                 category: "dairy",     crf: 0.67, water: 16,  tf: -20.0, lh:  53, cpAbove: 1.37, cpBelow: 1.04, humid: "75-85",   storageTemp: "0-4"       },
  { id: "جبن_شدر",      nameAr: "جبن-شدر",              category: "dairy",     crf: 0.67, water: 37,  tf: -13.0, lh: 123, cpAbove: 2.07, cpBelow: 1.30, humid: "65",      storageTemp: "0-1"       },
  { id: "كاكاو",        nameAr: "الكاكاو",               category: "other",     crf: 0.67, water:  1,  tf: -1.0,  lh:   3, cpAbove: 0.87, cpBelow: 0.85, humid: "40",      storageTemp: "-18-1"     },
  { id: "قهوة",         nameAr: "قهوة",                 category: "other",     crf: 0.67, water: 15,  tf: -1.0,  lh:  50, cpAbove: 1.34, cpBelow: 1.03, humid: "80-85",   storageTemp: "2-3"       },
  { id: "بيض",          nameAr: "بيض",                  category: "dairy",     crf: 0.85, water: 15,  tf: -2.2,  lh: 220, cpAbove: 3.05, cpBelow: 1.66, humid: "80-85",   storageTemp: "-2-0"      },
  { id: "عسل",          nameAr: "عسل",                  category: "other",     crf: 0.67, water: 17,  tf: -1.0,  lh:  57, cpAbove: 1.40, cpBelow: 1.05, humid: "65-75",   storageTemp: "<10"       },
  { id: "حليب",         nameAr: "حليب",                 category: "dairy",     crf: 0.85, water: 87,  tf: -0.6,  lh: 290, cpAbove: 3.75, cpBelow: 1.93, humid: "85-95",   storageTemp: "0-1"       },
  { id: "مكسرات",       nameAr: "مكسرات",               category: "other",     crf: 0.67, water:  6,  tf: -1.0,  lh:  20, cpAbove: 1.04, cpBelow: 0.91, humid: "65-75",   storageTemp: "0-10"      },
  { id: "ذرة_جافة",     nameAr: "ذرة",                  category: "other",     crf: 0.67, water: 10,  tf: -1.0,  lh:  33, cpAbove: 1.17, cpBelow: 0.96, humid: "85",      storageTemp: "0-4"       },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductsByCategory(cat: Product["category"]): Product[] {
  return PRODUCTS.filter(p => p.category === cat);
}
