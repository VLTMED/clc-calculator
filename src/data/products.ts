// ==========================================
// جداول (2-5 إلى 2-8) متطلبات التخزين
// Tables 2-5 to 2-8: Storage Requirements
// crf: Cooling Rate Factor | tf: Freezing Temp °C
// lat: Latent Heat kJ/kg | cp_b: Below freezing kJ/kg.K | cp_a: Above freezing kJ/kg.K
// Table 2-5: Fruits
// ==========================================

export interface Product {
  id: string;
  name: string;
  category: "fruit" | "vegetable" | "meat" | "other";
  crf: number;
  waterContent: number; // %
  storageTime: string;
  tf: number; // Freezing temperature °C
  lat: number; // Latent heat kJ/kg
  cp_b: number; // Below freezing
  cp_a: number; // Above freezing
  humidity: string; // Relative humidity %
  storageTemp: string; // Storage temperature °C
}

export const PRODUCTS: Product[] = [
  // === الفواكه (Fruits) ===
  { id: "apple", name: "تفاح", category: "fruit", crf: 0.67, waterContent: 84, storageTime: "3-8 شهر", tf: -1.1, lat: 280, cp_b: 1.89, cp_a: 3.65, humidity: "90-95", storageTemp: "-1 إلى 4" },
  { id: "apricot", name: "مشمش", category: "fruit", crf: 0.67, waterContent: 85, storageTime: "1-2 أسبوع", tf: -1.1, lat: 284, cp_b: 1.9, cp_a: 3.68, humidity: "90-95", storageTemp: "0" },
  { id: "avocado", name: "أفوكادو-خضراء", category: "fruit", crf: 0.67, waterContent: 65, storageTime: "2-4 أسبوع", tf: -0.3, lat: 217, cp_b: 1.65, cp_a: 3.01, humidity: "85-90", storageTemp: "7 إلى 10" },
  { id: "banana", name: "موز", category: "fruit", crf: 0.1, waterContent: 75, storageTime: "", tf: -0.8, lat: 250, cp_b: 1.78, cp_a: 3.35, humidity: "85-95", storageTemp: "" },
  { id: "blackberry", name: "العليق", category: "fruit", crf: 0.67, waterContent: 85, storageTime: "2-3 يوم", tf: -0.8, lat: 284, cp_b: 1.9, cp_a: 3.68, humidity: "90-100", storageTemp: "0" },
  { id: "blueberry", name: "العنب البري", category: "fruit", crf: 0.67, waterContent: 82, storageTime: "2 أسبوع", tf: -1.6, lat: 274, cp_b: 1.86, cp_a: 3.58, humidity: "90-95", storageTemp: "0" },
  { id: "cantaloupe", name: "كانتيلوب", category: "fruit", crf: 0.9, waterContent: 92, storageTime: "5-15 يوم", tf: -1.2, lat: 307, cp_b: 1.99, cp_a: 3.92, humidity: "90", storageTemp: "2 إلى 4" },
  { id: "watermelon", name: "بطّيخ", category: "fruit", crf: 0.9, waterContent: 93, storageTime: "4-6 أسبوع", tf: -1.1, lat: 310, cp_b: 2, cp_a: 3.95, humidity: "85-95", storageTemp: "7 إلى 10" },
  { id: "coconut", name: "جوز هند", category: "fruit", crf: 0.67, waterContent: 47, storageTime: "1-2 شهر", tf: -0.9, lat: 157, cp_b: 1.43, cp_a: 2.41, humidity: "80-85", storageTemp: "0 إلى 2" },
  { id: "cherry", name: "الكرز", category: "fruit", crf: 0.67, waterContent: 80, storageTime: "2-3 أسبوع", tf: -1.8, lat: 267, cp_b: 1.84, cp_a: 3.51, humidity: "95", storageTemp: "-1 إلى 0" },
  { id: "mulberry", name: "التّوت", category: "fruit", crf: 0.67, waterContent: 87, storageTime: "2-4 شهر", tf: -0.9, lat: 290, cp_b: 1.93, cp_a: 3.75, humidity: "90-95", storageTemp: "2 إلى 4" },
  { id: "raisins", name: "زبيب", category: "fruit", crf: 0.67, waterContent: 85, storageTime: "10-14 يوم", tf: -1, lat: 284, cp_b: 1.9, cp_a: 3.68, humidity: "90-95", storageTemp: "-0.5 إلى 0" },
  { id: "dates", name: "التمر", category: "fruit", crf: 0.67, waterContent: 20, storageTime: "6-12 شهر", tf: -16, lat: 67, cp_b: 1.09, cp_a: 1.5, humidity: "75 أو أقل", storageTemp: "-18 أو 0" },
  { id: "dewberry", name: "دو بيري", category: "fruit", crf: 0.67, waterContent: 85, storageTime: "3 يوم", tf: -1.3, lat: 284, cp_b: 1.9, cp_a: 3.68, humidity: "90-95", storageTemp: "0" },
  { id: "fig_dry", name: "تين جاف", category: "fruit", crf: 0.67, waterContent: 23, storageTime: "9-12 شهر", tf: 0, lat: 77, cp_b: 1.12, cp_a: 1.61, humidity: "50-60", storageTemp: "0 إلى 4" },
  { id: "fig_fresh", name: "تين طازج", category: "fruit", crf: 0.67, waterContent: 78, storageTime: "7-10 يوم", tf: -2.4, lat: 260, cp_b: 1.81, cp_a: 3.45, humidity: "85-90", storageTemp: "-1 إلى 0" },
  { id: "frozen_fruit", name: "فواكة مجمدة", category: "fruit", crf: 1.0, waterContent: 0, storageTime: "6-12 شهر", tf: 0, lat: 0, cp_b: 1.9, cp_a: 3.7, humidity: "90-95", storageTemp: "-23 إلى -18" },
  { id: "gooseberry", name: "الجوز بيري", category: "fruit", crf: 0.67, waterContent: 89, storageTime: "1-2 أسبوع", tf: -1.1, lat: 297, cp_b: 1.95, cp_a: 3.82, humidity: "90-95", storageTemp: "0" },
  { id: "grape", name: "العنب", category: "fruit", crf: 0.8, waterContent: 82, storageTime: "3-6 شهر", tf: -2, lat: 274, cp_b: 1.86, cp_a: 3.58, humidity: "95-100", storageTemp: "-1 إلى 0" },
  { id: "honeydew", name: "الشهد", category: "fruit", crf: 0.9, waterContent: 93, storageTime: "3-4 أسبوع", tf: -0.9, lat: 310, cp_b: 2, cp_a: 3.95, humidity: "90", storageTemp: "7 إلى 10" },
  { id: "lemon", name: "الليمون", category: "fruit", crf: 1, waterContent: 89, storageTime: "1-6 أسبوع", tf: -1.4, lat: 297, cp_b: 1.95, cp_a: 3.82, humidity: "85-90", storageTemp: "15 إلى 8" },
  { id: "lime", name: "الليمون الحامض", category: "fruit", crf: 0.9, waterContent: 86, storageTime: "6-8 أسبوع", tf: -1.6, lat: 287, cp_b: 1.92, cp_a: 3.72, humidity: "85-90", storageTemp: "9 إلى 0" },
  { id: "mango", name: "المانجو", category: "fruit", crf: 0.67, waterContent: 81, storageTime: "2 أسبوع", tf: -0.9, lat: 270, cp_b: 1.85, cp_a: 3.55, humidity: "85-90", storageTemp: "3" },
  { id: "olive", name: "الزيتون", category: "fruit", crf: 0.67, waterContent: 75, storageTime: "4-6 أسبوع", tf: -1.4, lat: 250, cp_b: 1.78, cp_a: 3.35, humidity: "85-90", storageTemp: "7 إلى 10" },
  { id: "orange", name: "برتقال", category: "fruit", crf: 0.7, waterContent: 87, storageTime: "3-12 أسبوع", tf: -0.8, lat: 290, cp_b: 1.93, cp_a: 3.75, humidity: "85-90", storageTemp: "5" },
  { id: "orange_juice", name: "عصير برتقال", category: "fruit", crf: 1, waterContent: 89, storageTime: "3-6 أسبوع", tf: 0, lat: 297, cp_b: 1.95, cp_a: 3.82, humidity: "", storageTemp: "-1 إلى 2" },
  { id: "papaya", name: "ببو", category: "fruit", crf: 0.67, waterContent: 91, storageTime: "1-3 أسبوع", tf: -0.8, lat: 304, cp_b: 1.98, cp_a: 3.88, humidity: "90", storageTemp: "13" },
  { id: "peach", name: "الدّراق", category: "fruit", crf: 0.8, waterContent: 89, storageTime: "2-3 أسبوع", tf: -0.9, lat: 297, cp_b: 1.95, cp_a: 3.82, humidity: "90-95", storageTemp: "0" },
  { id: "pear", name: "كمثرى", category: "fruit", crf: 0.8, waterContent: 83, storageTime: "2-6 شهر", tf: -1.6, lat: 277, cp_b: 1.88, cp_a: 3.61, humidity: "90-95", storageTemp: "-1.6 إلى 0" },
  { id: "melon", name: "الشمام", category: "fruit", crf: 0.9, waterContent: 93, storageTime: "2 أسبوع", tf: -0.8, lat: 310, cp_b: 2, cp_a: 3.95, humidity: "90-95", storageTemp: "7 إلى 10" },
  { id: "persimmon", name: "البريسمون", category: "fruit", crf: 0.67, waterContent: 78, storageTime: "3-4 شهر", tf: -2.2, lat: 260, cp_b: 1.81, cp_a: 3.45, humidity: "90", storageTemp: "-1" },
  { id: "pineapple", name: "أناناس", category: "fruit", crf: 0.67, waterContent: 85, storageTime: "1-4 أسبوع", tf: -1, lat: 284, cp_b: 1.9, cp_a: 3.68, humidity: "85-90", storageTemp: "20" },
  { id: "plum", name: "خوخ", category: "fruit", crf: 0.67, waterContent: 86, storageTime: "1-4 أسبوع", tf: -0.8, lat: 287, cp_b: 1.92, cp_a: 3.72, humidity: "90-95", storageTemp: "-0.5 إلى 0" },
  { id: "pomegranate", name: "الرمان", category: "fruit", crf: 0.67, waterContent: 85, storageTime: "2-4 شهر", tf: -3, lat: 274, cp_b: 1.86, cp_a: 3.58, humidity: "90", storageTemp: "0" },
  { id: "quince", name: "السّفرجل", category: "fruit", crf: 0.67, waterContent: 85, storageTime: "2-3 شهر", tf: -2, lat: 284, cp_b: 1.9, cp_a: 3.68, humidity: "90", storageTemp: "-1 إلى 0" },
  { id: "strawberry", name: "الفراولة", category: "fruit", crf: 0.67, waterContent: 90, storageTime: "5-7 يوم", tf: -0.8, lat: 300, cp_b: 1.97, cp_a: 3.85, humidity: "90-100", storageTemp: "0" },
  { id: "tangerine", name: "اليوسفيّ", category: "fruit", crf: 0.67, waterContent: 87, storageTime: "2-4 أسبوع", tf: -1.1, lat: 290, cp_b: 1.93, cp_a: 3.75, humidity: "90-95", storageTemp: "0" },

  // === الخضروات (Vegetables) ===
  { id: "artichoke", name: "خرشوف", category: "vegetable", crf: 0.67, waterContent: 84, storageTime: "2 أسبوع", tf: -1.2, lat: 280, cp_b: 1.89, cp_a: 3.65, humidity: "95-100", storageTemp: "0" },
  { id: "asparagus", name: "الهليون", category: "vegetable", crf: 0.9, waterContent: 93, storageTime: "2-3 أسبوع", tf: -0.6, lat: 310, cp_b: 2, cp_a: 3.95, humidity: "95-100", storageTemp: "0 إلى 2" },
  { id: "beans_green", name: "فاصوليا خضراء", category: "vegetable", crf: 0.67, waterContent: 93, storageTime: "7-10 أيام", tf: -0.7, lat: 297, cp_b: 1.95, cp_a: 3.82, humidity: "95-100", storageTemp: "7 إلى 10" },
  { id: "broccoli", name: "بروكولي", category: "vegetable", crf: 0.67, waterContent: 85, storageTime: "3-5 أسبوع", tf: -0.8, lat: 284, cp_b: 1.9, cp_a: 3.68, humidity: "95-100", storageTemp: "0" },
  { id: "cabbage", name: "لهانة/ملفوف", category: "vegetable", crf: 0.67, waterContent: 92, storageTime: "1-4 شهر", tf: -0.9, lat: 307, cp_b: 1.99, cp_a: 3.92, humidity: "98-100", storageTemp: "0" },
  { id: "carrot", name: "جزر", category: "vegetable", crf: 0.8, waterContent: 88, storageTime: "4-6 أسبوع", tf: -1.4, lat: 294, cp_b: 1.94, cp_a: 3.78, humidity: "98-100", storageTemp: "0" },
  { id: "cauliflower", name: "قرنابيظ", category: "vegetable", crf: 0.8, waterContent: 92, storageTime: "2-4 أسبوع", tf: -0.8, lat: 307, cp_b: 1.99, cp_a: 3.92, humidity: "95-100", storageTemp: "0" },
  { id: "celery", name: "كرفس", category: "vegetable", crf: 1, waterContent: 94, storageTime: "1-2 شهر", tf: -0.5, lat: 314, cp_b: 2.02, cp_a: 3.98, humidity: "95-100", storageTemp: "0" },
  { id: "corn_sweet", name: "ذرة حلوة", category: "vegetable", crf: 0.67, waterContent: 74, storageTime: "4-8 يوم", tf: -0.6, lat: 247, cp_b: 1.76, cp_a: 3.31, humidity: "95-100", storageTemp: "0" },
  { id: "cucumber", name: "خيار", category: "vegetable", crf: 0.67, waterContent: 96, storageTime: "10-14 يوم", tf: -0.5, lat: 320, cp_b: 2.04, cp_a: 4.05, humidity: "95-100", storageTemp: "10" },
  { id: "eggplant", name: "باذنجان", category: "vegetable", crf: 0.67, waterContent: 93, storageTime: "7 أيام", tf: -0.8, lat: 310, cp_b: 2, cp_a: 3.95, humidity: "90-95", storageTemp: "7 إلى 10" },
  { id: "endive", name: "هندب", category: "vegetable", crf: 0.67, waterContent: 93, storageTime: "2-3 أسبوع", tf: -0.1, lat: 310, cp_b: 2, cp_a: 3.95, humidity: "90-100", storageTemp: "0" },
  { id: "garlic_dry", name: "ثوم-جاف", category: "vegetable", crf: 0.67, waterContent: 61, storageTime: "6-7 شهر", tf: -0.8, lat: 203, cp_b: 1.6, cp_a: 2.88, humidity: "65-70", storageTemp: "0" },
  { id: "leek", name: "كراث اخضر", category: "vegetable", crf: 0.7, waterContent: 87, storageTime: "1-3 أشهر", tf: -0.7, lat: 284, cp_b: 1.9, cp_a: 3.68, humidity: "95", storageTemp: "0" },
  { id: "lettuce", name: "خس", category: "vegetable", crf: 0.67, waterContent: 95, storageTime: "2-3 أسبوع", tf: -0.2, lat: 317, cp_b: 2.03, cp_a: 4.02, humidity: "95-100", storageTemp: "0" },
  { id: "mushroom", name: "فطر", category: "vegetable", crf: 0.67, waterContent: 91, storageTime: "3-4 يوم", tf: -0.9, lat: 304, cp_b: 1.98, cp_a: 3.88, humidity: "95", storageTemp: "0" },
  { id: "onion_dry", name: "بصل جاف", category: "vegetable", crf: 0.3, waterContent: 88, storageTime: "1-8 أشهر", tf: -0.8, lat: 294, cp_b: 1.94, cp_a: 3.78, humidity: "65-70", storageTemp: "0" },
  { id: "parsley", name: "مقدونس", category: "vegetable", crf: 0.67, waterContent: 85, storageTime: "1-2 أشهر", tf: -1.1, lat: 284, cp_b: 1.9, cp_a: 3.68, humidity: "95-100", storageTemp: "0" },
  { id: "peas_green", name: "بازيليا-خضراء", category: "vegetable", crf: 0.67, waterContent: 74, storageTime: "1-2 أسبوع", tf: -0.6, lat: 247, cp_b: 1.76, cp_a: 3.31, humidity: "95-98", storageTemp: "0" },
  { id: "pepper_sweet", name: "فلفل-حلو", category: "vegetable", crf: 0.67, waterContent: 93, storageTime: "2-3 أسبوع", tf: -0.7, lat: 307, cp_b: 1.99, cp_a: 3.92, humidity: "90-95", storageTemp: "7 إلى 13" },
  { id: "potato", name: "بطاطا", category: "vegetable", crf: 0.67, waterContent: 78, storageTime: "4-6 أشهر", tf: -0.7, lat: 260, cp_b: 1.81, cp_a: 3.45, humidity: "90-95", storageTemp: "7" },
  { id: "potato_sweet", name: "بطاطا-حلوة", category: "vegetable", crf: 0.67, waterContent: 69, storageTime: "4-6 أشهر", tf: -1.3, lat: 230, cp_b: 1.7, cp_a: 3.15, humidity: "85-90", storageTemp: "16 إلى 31" },
  { id: "radish", name: "فجل", category: "vegetable", crf: 0.7, waterContent: 95, storageTime: "2-4 أسبوع", tf: -0.7, lat: 317, cp_b: 2.03, cp_a: 4.02, humidity: "90-95", storageTemp: "0" },
  { id: "spinach", name: "سبانغ", category: "vegetable", crf: 0.8, waterContent: 93, storageTime: "1-2 أسبوع", tf: -0.3, lat: 310, cp_b: 2, cp_a: 3.95, humidity: "90-98", storageTemp: "0" },
  { id: "pumpkin", name: "يقطين", category: "vegetable", crf: 0.67, waterContent: 94, storageTime: "3-4 أسبوع", tf: -0.5, lat: 314, cp_b: 2.02, cp_a: 3.98, humidity: "95-100", storageTemp: "0" },
  { id: "tomato", name: "طماطة", category: "vegetable", crf: 0.67, waterContent: 94, storageTime: "3-7 أيام", tf: -0.5, lat: 313, cp_b: 2.02, cp_a: 3.98, humidity: "90-95", storageTemp: "5 إلى 7" },
  { id: "turnip", name: "شلغم", category: "vegetable", crf: 0.67, waterContent: 92, storageTime: "4-5 أشهر", tf: -1.1, lat: 307, cp_b: 1.99, cp_a: 3.92, humidity: "95", storageTemp: "0" },
  { id: "frozen_veg", name: "خضروات مجمدة", category: "vegetable", crf: 1.0, waterContent: 0, storageTime: "6-12 شهر", tf: 0, lat: 0, cp_b: 1.9, cp_a: 3.7, humidity: "", storageTemp: "-23 إلى -18" },

  // === اللحوم والأسماك (Meat & Fish) ===
  { id: "beef_fresh", name: "بقر-طازج", category: "meat", crf: 0.67, waterContent: 77, storageTime: "1-6 أسبوع", tf: -2.7, lat: 257, cp_b: 1.8, cp_a: 3.4, humidity: "88-92", storageTemp: "0 إلى 1" },
  { id: "beef_liver", name: "بقر-كبده", category: "meat", crf: 0.56, waterContent: 70, storageTime: "5 أيام", tf: -1.7, lat: 233, cp_b: 1.71, cp_a: 3.18, humidity: "90", storageTemp: "0" },
  { id: "veal", name: "عجل", category: "meat", crf: 0.56, waterContent: 77, storageTime: "1-7 أسبوع", tf: -2.2, lat: 220, cp_b: 1.66, cp_a: 3.05, humidity: "90", storageTemp: "0 إلى 1" },
  { id: "beef_frozen", name: "بقر-مجمد", category: "meat", crf: 0.67, waterContent: 0, storageTime: "6-12 شهر", tf: 0, lat: 0, cp_b: 1.8, cp_a: 3.4, humidity: "90-95", storageTemp: "-18 إلى -23" },
  { id: "lamb_fresh", name: "ضان-طازج", category: "meat", crf: 0.75, waterContent: 70, storageTime: "5-12 أيام", tf: -2.2, lat: 233, cp_b: 1.7, cp_a: 3.2, humidity: "85-90", storageTemp: "0" },
  { id: "lamb_frozen", name: "ضان-مجمد", category: "meat", crf: 0.75, waterContent: 0, storageTime: "8-12 شهر", tf: 0, lat: 0, cp_b: 1.7, cp_a: 3.2, humidity: "90-95", storageTemp: "-18 إلى -23" },
  { id: "poultry_fresh", name: "دواجن-طازجة", category: "meat", crf: 1, waterContent: 74, storageTime: "1 أسبوع", tf: -2.8, lat: 247, cp_b: 1.76, cp_a: 3.31, humidity: "85-90", storageTemp: "-2 إلى 0" },
  { id: "poultry_frozen", name: "دواجن-مجمدة", category: "meat", crf: 1, waterContent: 0, storageTime: "8-12 شهر", tf: 0, lat: 0, cp_b: 1.76, cp_a: 3.31, humidity: "90-95", storageTemp: "-18 إلى -23" },
  { id: "rabbit", name: "أرانب", category: "meat", crf: 1, waterContent: 68, storageTime: "1-5 أيام", tf: -2.2, lat: 227, cp_b: 1.69, cp_a: 3.11, humidity: "90-95", storageTemp: "0 إلى 1" },
  { id: "fish_fresh", name: "سمك-طازج", category: "meat", crf: 1, waterContent: 81, storageTime: "5-14 يوم", tf: -2.2, lat: 270, cp_b: 1.85, cp_a: 3.55, humidity: "95-100", storageTemp: "-1 إلى 1" },
  { id: "fish_frozen", name: "سمك-مجمد", category: "meat", crf: 1, waterContent: 0, storageTime: "6-12 شهر", tf: 0, lat: 0, cp_b: 1.85, cp_a: 3.55, humidity: "90-95", storageTemp: "-18 إلى -29" },
  { id: "shellfish", name: "المحارات الصدفية", category: "meat", crf: 1, waterContent: 80, storageTime: "12 يوم", tf: -2.2, lat: 267, cp_b: 1.84, cp_a: 3.51, humidity: "90-95", storageTemp: "0 إلى 1" },
  { id: "shrimp", name: "الرّوبيان", category: "meat", crf: 1, waterContent: 76, storageTime: "12-14 يوم", tf: -2.2, lat: 270, cp_b: 1.85, cp_a: 3.55, humidity: "95-100", storageTemp: "-1 إلى 1" },

  // === مواد غذائية أخرى (Other Foods) ===
  { id: "bread_frozen", name: "خبز-مجمد", category: "other", crf: 1, waterContent: 37, storageTime: "3-13 أسبوع", tf: -9, lat: 123, cp_b: 1.27, cp_a: 1.99, humidity: "", storageTemp: "-18" },
  { id: "butter", name: "زبدة", category: "other", crf: 1, waterContent: 16, storageTime: "1 شهر", tf: -20, lat: 53, cp_b: 1.04, cp_a: 1.37, humidity: "75-85", storageTemp: "0 إلى 4" },
  { id: "butter_frozen", name: "زبدة-مجمدة", category: "other", crf: 1, waterContent: 0, storageTime: "12 شهر", tf: 0, lat: 0, cp_b: 1.04, cp_a: 1.37, humidity: "70-85", storageTemp: "-23" },
  { id: "cheese_cheddar", name: "جبن-شدر", category: "other", crf: 1, waterContent: 37, storageTime: "12 شهر", tf: -13, lat: 123, cp_b: 1.3, cp_a: 2.07, humidity: "65", storageTemp: "0 إلى 1" },
  { id: "cheese_shredded", name: "شدر-مبشور", category: "other", crf: 1, waterContent: 37, storageTime: "6 أشهر", tf: -13, lat: 123, cp_b: 1.3, cp_a: 2.07, humidity: "65", storageTemp: "4.4" },
  { id: "cocoa", name: "الكاكاو", category: "other", crf: 1, waterContent: 1, storageTime: "6-12 أشهر", tf: -2.2, lat: 3.3, cp_b: 0.85, cp_a: 0.87, humidity: "40", storageTemp: "-18 إلى 1" },
  { id: "coffee", name: "قهوة", category: "other", crf: 1, waterContent: 15, storageTime: "2-4 أشهر", tf: 0, lat: 50, cp_b: 1.03, cp_a: 1.34, humidity: "80-85", storageTemp: "2 إلى 3" },
  { id: "eggs", name: "بيض", category: "other", crf: 0.85, waterContent: 15, storageTime: "5-6 أشهر", tf: -2.2, lat: 220, cp_b: 1.66, cp_a: 3.05, humidity: "80-85", storageTemp: "-2 إلى 0" },
  { id: "honey", name: "عسل", category: "other", crf: 1, waterContent: 17, storageTime: "12 شهر+", tf: 0, lat: 57, cp_b: 1.05, cp_a: 1.4, humidity: "أقل من 10", storageTemp: "" },
  { id: "milk", name: "حليب", category: "other", crf: 0.85, waterContent: 87, storageTime: "", tf: -0.6, lat: 290, cp_b: 1.93, cp_a: 3.75, humidity: "", storageTemp: "0 إلى 1" },
  { id: "nuts", name: "مكسرات", category: "other", crf: 1, waterContent: 6, storageTime: "8-12 أشهر", tf: 0, lat: 20, cp_b: 0.91, cp_a: 1.04, humidity: "65-75", storageTemp: "0 إلى 1" },
  { id: "corn_dry", name: "ذرة جافة", category: "other", crf: 1, waterContent: 10, storageTime: "4-6 أسبوع", tf: 0, lat: 33, cp_b: 0.96, cp_a: 1.17, humidity: "85", storageTemp: "0 إلى 4" },
];

export const getProductById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getProductsByCategory = (category: Product["category"]): Product[] =>
  PRODUCTS.filter((p) => p.category === category);
