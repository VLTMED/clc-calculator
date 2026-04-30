// ==========================================
// جدول (2-9) معدل حرارة التنفس للفواكه [W/Tonne]
// Table 2-9: Respiration Heat of Fruits
// ==========================================

export interface RespirationRate {
  productId: string;
  productName: string;
  rates: { [temp: number]: [number, number] }; // temp°C: [min, max]
}

export const FRUIT_RESPIRATION: RespirationRate[] = [
  {
    productId: "apple",
    productName: "التّفاح",
    rates: { 20: [45, 95], 15: [35, 80], 10: [13, 20], 5: [6, 10], 0: [0, 0] },
  },
  {
    productId: "plum",
    productName: "البرقوق",
    rates: { 20: [87, 155], 15: [63, 102], 10: [33, 56], 5: [19, 27], 0: [16, 17] },
  },
  {
    productId: "avocado",
    productName: "أفوكادو أخضر",
    rates: { 20: [195, 915], 15: [160, 415], 10: [0, 0], 5: [53, 80], 0: [0, 0] },
  },
  {
    productId: "blackberry",
    productName: "العلائق",
    rates: { 20: [582, 388], 15: [209, 432], 10: [155, 281], 5: [85, 136], 0: [47, 68] },
  },
  {
    productId: "blueberry",
    productName: "بوليبيريس",
    rates: { 20: [259, 154], 15: [101, 183], 10: [0, 0], 5: [27, 36], 0: [7, 32] },
  },
  {
    productId: "cantaloupe",
    productName: "كانتيلوب",
    rates: { 20: [192, 132], 15: [100, 114], 10: [46, 46], 5: [26, 30], 0: [0, 0] },
  },
  {
    productId: "cherry",
    productName: "حلوى كرزِ",
    rates: { 20: [195, 83], 15: [74, 133], 10: [28, 42], 5: [12, 16], 0: [0, 0] },
  },
  {
    productId: "cranberry",
    productName: "كرانبيريس",
    rates: { 20: [33, 54], 15: [0, 0], 10: [0, 0], 5: [12, 14], 0: [0, 0] },
  },
  {
    productId: "fig_fresh",
    productName: "تين طازجة",
    rates: { 20: [169, 282], 15: [146, 188], 10: [66, 68], 5: [33, 39], 0: [0, 0] },
  },
  {
    productId: "gooseberry",
    productName: "الكشمش",
    rates: { 20: [0, 0], 15: [65, 96], 10: [36, 40], 5: [20, 26], 0: [0, 0] },
  },
  {
    productId: "grape",
    productName: "العنب",
    rates: { 20: [52, 52], 15: [38, 38], 10: [0, 0], 5: [8, 16], 0: [4, 7] },
  },
  {
    productId: "honeydew",
    productName: "البطيخ الحلو",
    rates: { 20: [59, 71], 15: [35, 47], 10: [24, 24], 5: [0, 0], 0: [0, 0] },
  },
  {
    productId: "lemon",
    productName: "اللّيمون",
    rates: { 20: [67, 67], 15: [47, 47], 10: [0, 0], 5: [0, 0], 0: [0, 0] },
  },
  {
    productId: "lime",
    productName: "الكلس",
    rates: { 20: [20, 55], 15: [18, 31], 10: [8, 17], 5: [0, 0], 0: [0, 0] },
  },
  {
    productId: "mango",
    productName: "المانجو",
    rates: { 20: [223, 449], 15: [133, 133], 10: [0, 0], 5: [0, 0], 0: [0, 0] },
  },
  {
    productId: "olive",
    productName: "زيتون طازج",
    rates: { 20: [114, 145], 15: [65, 116], 10: [0, 0], 5: [0, 0], 0: [0, 0] },
  },
  {
    productId: "orange",
    productName: "البرتقال",
    rates: { 20: [60, 90], 15: [35, 60], 10: [10, 19], 5: [5, 13], 0: [0, 0] },
  },
  {
    productId: "papaya",
    productName: "باباو",
    rates: { 20: [0, 0], 15: [40, 60], 10: [11, 16], 5: [0, 0], 0: [0, 0] },
  },
  {
    productId: "peach",
    productName: "الدّراق",
    rates: { 20: [176, 304], 15: [98, 126], 10: [19, 27], 5: [12, 19], 0: [0, 0] },
  },
  {
    productId: "pear",
    productName: "الأجاص",
    rates: { 20: [101, 231], 15: [76, 155], 10: [23, 59], 5: [18, 39], 0: [8, 15] },
  },
  {
    productId: "persimmon",
    productName: "فواكه الكاكي",
    rates: { 20: [59, 71], 15: [35, 42], 10: [18, 18], 5: [0, 0], 0: [0, 0] },
  },
  {
    productId: "pineapple",
    productName: "الأناناس",
    rates: { 20: [65, 105], 15: [35, 50], 10: [4, 7], 5: [0, 0], 0: [0, 0] },
  },
  {
    productId: "plum2",
    productName: "الخوخ",
    rates: { 20: [53, 77], 15: [35, 37], 10: [27, 34], 5: [12, 27], 0: [6, 8] },
  },
  {
    productId: "raspberry",
    productName: "راسفبيريس",
    rates: { 20: [340, 727], 15: [244, 301], 10: [82, 165], 5: [92, 114], 0: [52, 74] },
  },
  {
    productId: "strawberry",
    productName: "الشّليك",
    rates: { 20: [303, 281], 15: [211, 274], 10: [146, 281], 5: [49, 98], 0: [36, 52] },
  },
  {
    productId: "watermelon",
    productName: "البطيخ",
    rates: { 20: [51, 74], 15: [0, 0], 10: [22, 22], 5: [0, 0], 0: [0, 0] },
  },
];

// ==========================================
// جدول (2-10) معدل حرارة التنفس للخضراوات [W/Tonne]
// Table 2-10: Respiration Heat of Vegetables
// ==========================================

export const VEGETABLE_RESPIRATION: RespirationRate[] = [
  {
    productId: "artichoke",
    productName: "خرشوفِ",
    rates: { 20: [404, 692], 15: [229, 430], 10: [162, 292], 5: [95, 178], 0: [67, 133] },
  },
  {
    productId: "asparagus",
    productName: "الهليون",
    rates: { 20: [809, 1484], 15: [472, 971], 10: [318, 904], 5: [162, 404], 0: [81, 238] },
  },
  {
    productId: "beans_green",
    productName: "فاصولياء خضراء",
    rates: { 20: [351, 386], 15: [252, 276], 10: [162, 173], 5: [101, 104], 0: [0, 0] },
  },
  {
    productId: "beet_topped",
    productName: "بنجر مُتَوَّج",
    rates: { 20: [0, 0], 15: [50, 69], 10: [35, 40], 5: [27, 28], 0: [16, 21] },
  },
  {
    productId: "cauliflower",
    productName: "القرنبيط",
    rates: { 20: [825, 1011], 15: [515, 1008], 10: [0, 0], 5: [102, 475], 0: [55, 64] },
  },
  {
    productId: "brussels",
    productName: "يُورقُ بروكسل",
    rates: { 20: [267, 564], 15: [283, 317], 10: [187, 251], 5: [96, 144], 0: [46, 71] },
  },
  {
    productId: "cabbage_white",
    productName: "ملفوف أبيض",
    rates: { 20: [0, 0], 15: [58, 170], 10: [36, 98], 5: [22, 64], 0: [15, 40] },
  },
  {
    productId: "carrot_topped",
    productName: "جزر مُتَوَّج",
    rates: { 20: [209, 209], 15: [117, 117], 10: [93, 93], 5: [58, 58], 0: [46, 46] },
  },
  {
    productId: "cauliflower2",
    productName: "القرنابيط",
    rates: { 20: [238, 238], 15: [137, 137], 10: [100, 100], 5: [61, 61], 0: [53, 53] },
  },
  {
    productId: "celery",
    productName: "الكرفس",
    rates: { 20: [170, 170], 15: [100, 100], 10: [0, 0], 5: [30, 30], 0: [20, 20] },
  },
  {
    productId: "corn_sweet",
    productName: "ذرةِ الحلوة",
    rates: { 20: [855, 855], 15: [483, 483], 10: [332, 332], 5: [230, 230], 0: [126, 126] },
  },
  {
    productId: "cucumber",
    productName: "الخيار",
    rates: { 20: [92, 143], 15: [71, 98], 10: [68, 86], 5: [0, 0], 0: [0, 0] },
  },
  {
    productId: "garlic_dried",
    productName: "الثّوم المجفّفُ",
    rates: { 20: [30, 54], 15: [33, 81], 10: [27, 29], 5: [18, 29], 0: [9, 32] },
  },
  {
    productId: "horseradish",
    productName: "هورسيراديش",
    rates: { 20: [132, 132], 15: [97, 97], 10: [78, 78], 5: [32, 32], 0: [24, 24] },
  },
  {
    productId: "cabbage",
    productName: "الكرنب",
    rates: { 20: [0, 0], 15: [146, 146], 10: [93, 93], 5: [49, 49], 0: [30, 30] },
  },
  {
    productId: "leek",
    productName: "الكّراث",
    rates: { 20: [245, 347], 15: [159, 202], 10: [58, 86], 5: [28, 49], 0: [0, 0] },
  },
  {
    productId: "lettuce",
    productName: "الخسِ",
    rates: { 20: [178, 178], 15: [114, 121], 10: [81, 119], 5: [40, 59], 0: [27, 50] },
  },
  {
    productId: "mushroom",
    productName: "الفطر",
    rates: { 20: [782, 939], 15: [0, 0], 10: [0, 0], 5: [210, 210], 0: [83, 130] },
  },
  {
    productId: "onion_dried",
    productName: "البصل المجفّفُ",
    rates: { 20: [50, 50], 15: [33, 33], 10: [21, 21], 5: [10, 10], 0: [9, 9] },
  },
  {
    productId: "parsley",
    productName: "البقدنوس",
    rates: { 20: [582, 757], 15: [427, 662], 10: [389, 487], 5: [196, 252], 0: [98, 137] },
  },
  {
    productId: "parsnip",
    productName: "الجزر",
    rates: { 20: [0, 0], 15: [96, 127], 10: [61, 78], 5: [26, 52], 0: [34, 46] },
  },
  {
    productId: "peas_green",
    productName: "بازلاء خضراء",
    rates: { 20: [728, 1072], 15: [530, 600], 10: [0, 0], 5: [163, 227], 0: [90, 139] },
  },
  {
    productId: "pepper_sweet",
    productName: "فلفلِ حلو",
    rates: { 20: [130, 130], 15: [68, 68], 10: [43, 43], 5: [0, 0], 0: [0, 0] },
  },
  {
    productId: "potato_immature",
    productName: "بطاطة غير ناضجة",
    rates: { 20: [54, 134], 15: [42, 92], 10: [42, 62], 5: [35, 35], 0: [0, 0] },
  },
  {
    productId: "potato",
    productName: "بطاطة ناضج",
    rates: { 20: [20, 47], 15: [20, 35], 10: [20, 30], 5: [18, 20], 0: [0, 0] },
  },
  {
    productId: "radish",
    productName: "فجل",
    rates: { 20: [142, 146], 15: [82, 97], 10: [45, 45], 5: [23, 24], 0: [16, 18] },
  },
  {
    productId: "rhubarb",
    productName: "نبات راونّد",
    rates: { 20: [119, 169], 15: [92, 135], 10: [0, 0], 5: [33, 54], 0: [24, 39] },
  },
  {
    productId: "rutabaga",
    productName: "روتاباجا",
    rates: { 20: [0, 0], 15: [32, 47], 10: [0, 0], 5: [14, 15], 0: [6, 8] },
  },
  {
    productId: "spinach",
    productName: "سبانخ",
    rates: { 20: [682, 682], 15: [531, 531], 10: [328, 328], 5: [136, 136], 0: [0, 0] },
  },
  {
    productId: "tomato_ripe",
    productName: "طماطم ناضجة",
    rates: { 20: [65, 115], 15: [65, 75], 10: [0, 0], 5: [16, 16], 0: [0, 0] },
  },
  {
    productId: "tomato_green",
    productName: "الطّماطم خضراء",
    rates: { 20: [75, 110], 15: [43, 75], 10: [0, 0], 5: [13, 22], 0: [0, 0] },
  },
  {
    productId: "turnip",
    productName: "جذّورُ اللّفتُ",
    rates: { 20: [71, 74], 15: [64, 71], 10: [28, 30], 5: [26, 26], 0: [0, 0] },
  },
];

// Get respiration rate at specific temperature (returns average of min/max)
export const getRespirationRate = (
  rates: RespirationRate[],
  productId: string,
  temp: number
): number => {
  const product = rates.find((r) => r.productId === productId);
  if (!product || !product.rates[temp]) return 0;
  const [min, max] = product.rates[temp];
  return (min + max) / 2;
};
