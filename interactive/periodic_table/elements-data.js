/* =========================================================
   Дані хімічних елементів для інтерактивної періодичної таблиці.

   ДОДАНО: кілька елементів з кожної категорії (як приклад).
   Решту 118 елементів додавайте за цією ж схемою — просто
   копіюйте об'єкт нижче і змінюйте значення.

   ПОЛЯ:
   - number:    атомний номер (порядковий)
   - symbol:    хімічний символ (Н, He, Li...)
   - name:      повна назва українською
   - mass:      атомна маса (зазвичай з 2-4 знаками після коми)
   - period:    номер періоду (рядок таблиці, 1-7)
   - group:     номер групи (стовпець, 1-18). Для лантаноїдів/
                актиноїдів використовуйте null (вони рендеряться
                в окремому блоці під таблицею)
   - category:  категорія елемента — визначає КОЛІР клітинки.
                Можливі значення (мають співпадати з CSS-класами
                в periodic-table.css):
                  "alkali"        — лужні метали (група 1)
                  "alkaline"      — лужноземельні метали (група 2)
                  "transition"    — перехідні метали
                  "post-transition" — постперехідні метали
                  "metalloid"     — металоїди (напівметали)
                  "nonmetal"      — неметали
                  "halogen"       — галогени (група 17)
                  "noble"         — інертні (благородні) гази (група 18)
                  "lanthanide"    — лантаноїди
                  "actinide"      — актиноїди
                  "unknown"       — властивості не визначені
   - electronConfig: електронна конфігурація (рядок, спрощено)
   - row:       лише для лантаноїдів/актиноїдів — 1 (лантаноїди) або 2 (актиноїди),
                визначає окремий рядок під основною таблицею.
                Для звичайних елементів просто не вказуйте це поле.
   ========================================================= */

const ELEMENTS_DATA = [

  // ===== Період 1 =====
  {
    number: 1, symbol: "H", name: "Гідроген", mass: 1.008,
    period: 1, group: 1, category: "nonmetal",
    electronConfig: "1s¹"
  },
  {
    number: 2, symbol: "He", name: "Гелій", mass: 4.0026,
    period: 1, group: 18, category: "noble",
    electronConfig: "1s²"
  },

  // ===== Період 2 =====
  {
    number: 3, symbol: "Li", name: "Літій", mass: 6.94,
    period: 2, group: 1, category: "alkali",
    electronConfig: "[He] 2s¹"
  },
  {
    number: 4, symbol: "Be", name: "Берилій", mass: 9.0122,
    period: 2, group: 2, category: "alkaline",
    electronConfig: "[He] 2s²"
  },
  {
    number: 5, symbol: "B", name: "Бор", mass: 10.81,
    period: 2, group: 13, category: "metalloid",
    electronConfig: "[He] 2s² 2p¹"
  },
  {
    number: 6, symbol: "C", name: "Карбон", mass: 12.011,
    period: 2, group: 14, category: "nonmetal",
    electronConfig: "[He] 2s² 2p²"
  },
  {
    number: 7, symbol: "N", name: "Нітроген", mass: 14.007,
    period: 2, group: 15, category: "nonmetal",
    electronConfig: "[He] 2s² 2p³"
  },
  {
    number: 8, symbol: "O", name: "Оксиген", mass: 15.999,
    period: 2, group: 16, category: "nonmetal",
    electronConfig: "[He] 2s² 2p⁴"
  },
  {
    number: 9, symbol: "F", name: "Флуор", mass: 18.998,
    period: 2, group: 17, category: "halogen",
    electronConfig: "[He] 2s² 2p⁵"
  },
  {
    number: 10, symbol: "Ne", name: "Неон", mass: 20.180,
    period: 2, group: 18, category: "noble",
    electronConfig: "[He] 2s² 2p⁶"
  },

  // ===== Період 3 (приклад — додайте решту 11-18 самостійно) =====
  {
    number: 11, symbol: "Na", name: "Натрій", mass: 22.990,
    period: 3, group: 1, category: "alkali",
    electronConfig: "[Ne] 3s¹"
  },
  {
    number: 12, symbol: "Mg", name: "Магній", mass: 24.305,
    period: 3, group: 2, category: "alkaline",
    electronConfig: "[Ne] 3s²"
  },
  {
    number: 13, symbol: "Al", name: "Алюміній", mass: 26.982,
    period: 3, group: 13, category: "post-transition",
    electronConfig: "[Ne] 3s² 3p¹"
  },
  {
    number: 14, symbol: "Si", name: "Силіцій", mass: 28.085,
    period: 3, group: 14, category: "metalloid",
    electronConfig: "[Ne] 3s² 3p²"
  },
  {
    number: 15, symbol: "P", name: "Фосфор", mass: 30.974,
    period: 3, group: 15, category: "nonmetal",
    electronConfig: "[Ne] 3s² 3p³"
  },
  {
    number: 16, symbol: "S", name: "Сульфур", mass: 32.06,
    period: 3, group: 16, category: "nonmetal",
    electronConfig: "[Ne] 3s² 3p⁴"
  },
  {
    number: 17, symbol: "Cl", name: "Хлор", mass: 35.45,
    period: 3, group: 17, category: "halogen",
    electronConfig: "[Ne] 3s² 3p⁵"
  },
  {
    number: 18, symbol: "Ar", name: "Аргон", mass: 39.948,
    period: 3, group: 18, category: "noble",
    electronConfig: "[Ne] 3s² 3p⁶"
  },

  // ===== Період 4 (приклад перехідного металу) =====
  {
    number: 19, symbol: "K", name: "Калій", mass: 39.098,
    period: 4, group: 1, category: "alkali",
    electronConfig: "[Ar] 4s¹"
  },
  {
    number: 20, symbol: "Ca", name: "Кальцій", mass: 40.078,
    period: 4, group: 2, category: "alkaline",
    electronConfig: "[Ar] 4s²"
  },
  {
    number: 21, symbol: "Sc", name: "Скандій", mass: 44.956,
    period: 4, group: 3, category: "transition",
    electronConfig: "[Ar] 3d² 4s¹"
  },
  {
    number: 22, symbol: "Ti", name: "Титан", mass: 47.867,
    period: 4, group: 4, category: "transition",
    electronConfig: "[Ar] 3d² 4s²"
  },
  {
    number: 23, symbol: "V", name: "Ванадій", mass: 50.942,
    period: 4, group: 5, category: "transition",
    electronConfig: "[Ar] 3d3 4s²"
  },
  {
    number: 24, symbol: "Cr", name: "Хром", mass: 51.996,
    period: 4, group: 6, category: "transition",
    electronConfig: "[Ar] 3d⁵ 4s¹" // Провал електрона
  },
  {
    number: 25, symbol: "Mn", name: "Манган", mass: 54.938,
    period: 4, group: 7, category: "transition",
    electronConfig: "[Ar] 3d⁵ 4s²"
  },
  {
    number: 26, symbol: "Fe", name: "Ферум", mass: 55.845,
    period: 4, group: 8, category: "transition",
    electronConfig: "[Ar] 3d⁶ 4s²"
  },
  {
    number: 27, symbol: "Co", name: "Кобальт", mass: 58.933,
    period: 4, group: 9, category: "transition",
    electronConfig: "[Ar] 3d⁷ 4s²"
  },
  {
    number: 28, symbol: "Ni", name: "Нікель", mass: 58.693,
    period: 4, group: 10, category: "transition",
    electronConfig: "[Ar] 3d⁸ 4s²"
  },
  {
    number: 29, symbol: "Cu", name: "Купрум", mass: 63.546,
    period: 4, group: 11, category: "transition",
    electronConfig: "[Ar] 3d¹⁰ 4s¹" // Провал електрона
  },
  {
    number: 30, symbol: "Zn", name: "Цинк", mass: 65.38,
    period: 4, group: 12, category: "transition",
    electronConfig: "[Ar] 3d¹⁰ 4s²"
  },
  {
    number: 31, symbol: "Ga", name: "Галій", mass: 69.723,
    period: 4, group: 13, category: "post-transition",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p¹"
  },
  {
    number: 32, symbol: "Ge", name: "Германій", mass: 72.630,
    period: 4, group: 14, category: "metalloid",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p²"
  },
  {
    number: 33, symbol: "As", name: "Арсен", mass: 74.922,
    period: 4, group: 15, category: "metalloid",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p³"
  },
  {
    number: 34, symbol: "Se", name: "Селен", mass: 78.971,
    period: 4, group: 16, category: "nonmetal",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁴"
  },
  {
    number: 35, symbol: "Br", name: "Бром", mass: 79.904,
    period: 4, group: 17, category: "halogen",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁵"
  },
  {
    number: 36, symbol: "Kr", name: "Криптон", mass: 83.798,
    period: 4, group: 18, category: "noble",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁶"
  },

  // ===== Період 5 =====
  {
    number: 37, symbol: "Rb", name: "Рубідій", mass: 85.468,
    period: 5, group: 1, category: "alkali",
    electronConfig: "[Kr] 5s¹"
  },
  {
    number: 38, symbol: "Sr", name: "Стронцій", mass: 87.62,
    period: 5, group: 2, category: "alkaline",
    electronConfig: "[Kr] 5s²"
  },
  {
    number: 39, symbol: "Y", name: "Ітрій", mass: 88.906,
    period: 5, group: 3, category: "transition",
    electronConfig: "[Kr] 4d¹ 5s²"
  },
  {
    number: 40, symbol: "Zr", name: "Цирконій", mass: 91.224,
    period: 5, group: 4, category: "transition",
    electronConfig: "[Kr] 4d² 5s²"
  },
  {
    number: 41, symbol: "Nb", name: "Ніобій", mass: 92.906,
    period: 5, group: 5, category: "transition",
    electronConfig: "[Kr] 4d⁴ 5s¹" // Провал електрона
  },
  {
    number: 42, symbol: "Mo", name: "Молібден", mass: 95.95,
    period: 5, group: 6, category: "transition",
    electronConfig: "[Kr] 4d⁵ 5s¹" // Провал електрона
  },
  {
    number: 43, symbol: "Tc", name: "Технецій", mass: 98,
    period: 5, group: 7, category: "transition",
    electronConfig: "[Kr] 4d⁵ 5s²"
  },
  {
    number: 44, symbol: "Ru", name: "Рутеній", mass: 101.07,
    period: 5, group: 8, category: "transition",
    electronConfig: "[Kr] 4d⁷ 5s¹" // Провал електрона
  },
  {
    number: 45, symbol: "Rh", name: "Родій", mass: 102.91,
    period: 5, group: 9, category: "transition",
    electronConfig: "[Kr] 4d⁸ 5s¹" // Провал електрона
  },
  {
    number: 46, symbol: "Pd", name: "Паладій", mass: 106.42,
    period: 5, group: 10, category: "transition",
    electronConfig: "[Kr] 4d¹⁰" // Подвійний провал електрона (на 5s нуль)
  },
  {
    number: 47, symbol: "Ag", name: "Аргентум", mass: 107.87,
    period: 5, group: 11, category: "transition",
    electronConfig: "[Kr] 4d¹⁰ 5s¹" // Провал електрона
  },
  {
    number: 48, symbol: "Cd", name: "Кадмій", mass: 112.41,
    period: 5, group: 12, category: "transition",
    electronConfig: "[Kr] 4d¹⁰ 5s²"
  },
  {
    number: 49, symbol: "In", name: "Індій", mass: 114.82,
    period: 5, group: 13, category: "post-transition",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p¹"
  },
  {
    number: 50, symbol: "Sn", name: "Станум", mass: 118.71,
    period: 5, group: 14, category: "post-transition",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p²"
  },
  {
    number: 51, symbol: "Sb", name: "Стибій", mass: 121.76,
    period: 5, group: 15, category: "metalloid",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p³"
  },
  {
    number: 52, symbol: "Te", name: "Телур", mass: 127.60,
    period: 5, group: 16, category: "metalloid",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁴"
  },
  {
    number: 53, symbol: "I", name: "Йод", mass: 126.90,
    period: 5, group: 17, category: "halogen",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵"
  },
  {
    number: 54, symbol: "Xe", name: "Ксенон", mass: 131.29,
    period: 5, group: 18, category: "noble",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁶"
  },


// ===== ПЕРІОД 6: Основні елементи (групи 1, 2) =====
  {
    number: 55, symbol: "Cs", name: "Цезій", mass: 132.91,
    period: 6, group: 1, category: "alkali",
    electronConfig: "[Xe] 6s¹"
  },
  {
    number: 56, symbol: "Ba", name: "Барій", mass: 137.33,
    period: 6, group: 2, category: "alkaline",
    electronConfig: "[Xe] 6s²"
  },
  {
    number: '57', symbol: "La", name: "Лантан", mass: 138.91,
    period: 6, group: 3, category: "lanthanide"
  },


  // ===== ЛАНТАНОЇДИ (Окремий рядок під таблицею, row: 1) =====
  {
    number: 57, symbol: "La", name: "Лантан", mass: 138.91,
    period: 6, group: null, category: "lanthanide", row: 1,
    electronConfig: "[Xe] 5d¹ 6s²"
  },
  {
    number: 58, symbol: "Ce", name: "Церій", mass: 140.12,
    period: 6, group: null, category: "lanthanide", row: 1,
    electronConfig: "[Xe] 4f¹ 5d¹ 6s²"
  },
  {
    number: 59, symbol: "Pr", name: "Празеодим", mass: 140.91,
    period: 6, group: null, category: "lanthanide", row: 1,
    electronConfig: "[Xe] 4f³ 6s²"
  },
  {
    number: 60, symbol: "Nd", name: "Неодим", mass: 144.24,
    period: 6, group: null, category: "lanthanide", row: 1,
    electronConfig: "[Xe] 4f⁴ 6s²"
  },
  {
    number: 61, symbol: "Pm", name: "Прометій", mass: 145,
    period: 6, group: null, category: "lanthanide", row: 1,
    electronConfig: "[Xe] 4f⁵ 6s²"
  },
  {
    number: 62, symbol: "Sm", name: "Самарій", mass: 150.36,
    period: 6, group: null, category: "lanthanide", row: 1,
    electronConfig: "[Xe] 4f⁶ 6s²"
  },
  {
    number: 63, symbol: "Eu", name: "Європій", mass: 151.96,
    period: 6, group: null, category: "lanthanide", row: 1,
    electronConfig: "[Xe] 4f⁷ 6s²"
  },
  {
    number: 64, symbol: "Gd", name: "Гадоліній", mass: 157.25,
    period: 6, group: null, category: "lanthanide", row: 1,
    electronConfig: "[Xe] 4f⁷ 5d¹ 6s²"
  },
  {
    number: 65, symbol: "Tb", name: "Тербій", mass: 158.93,
    period: 6, group: null, category: "lanthanide", row: 1,
    electronConfig: "[Xe] 4f⁹ 6s²"
  },
  {
    number: 66, symbol: "Dy", name: "Диспрозій", mass: 162.50,
    period: 6, group: null, category: "lanthanide", row: 1,
    electronConfig: "[Xe] 4f¹⁰ 6s²"
  },
  {
    number: 67, symbol: "Ho", name: "Гольмій", mass: 164.93,
    period: 6, group: null, category: "lanthanide", row: 1,
    electronConfig: "[Xe] 4f¹¹ 6s²"
  },
  {
    number: 68, symbol: "Er", name: "Ербій", mass: 167.26,
    period: 6, group: null, category: "lanthanide", row: 1,
    electronConfig: "[Xe] 4f¹² 6s²"
  },
  {
    number: 69, symbol: "Tm", name: "Тулій", mass: 168.93,
    period: 6, group: null, category: "lanthanide", row: 1,
    electronConfig: "[Xe] 4f¹³ 6s²"
  },
  {
    number: 70, symbol: "Yb", name: "Іттербій", mass: 173.05,
    period: 6, group: null, category: "lanthanide", row: 1,
    electronConfig: "[Xe] 4f¹⁴ 6s²"
  },
  {
    number: 71, symbol: "Lu", name: "Лютецій", mass: 174.97,
    period: 6, group: null, category: "lanthanide", row: 1,
    electronConfig: "[Xe] 4f¹⁴ 5d¹ 6s²"
  },

  // ===== ПЕРІОД 6: Продовження основної таблиці (групи 4-18) =====
  {
    number: 72, symbol: "Hf", name: "Гафній", mass: 178.49,
    period: 6, group: 4, category: "transition",
    electronConfig: "[Xe] 4f¹⁴ 5d² 6s²"
  },
  {
    number: 73, symbol: "Ta", name: "Тантал", mass: 180.95,
    period: 6, group: 5, category: "transition",
    electronConfig: "[Xe] 4f¹⁴ 5d³ 6s²"
  },
  {
    number: 74, symbol: "W", name: "Вольфрам", mass: 183.84,
    period: 6, group: 6, category: "transition",
    electronConfig: "[Xe] 4f¹⁴ 5d⁴ 6s²"
  },
  {
    number: 75, symbol: "Re", name: "Реній", mass: 186.21,
    period: 6, group: 7, category: "transition",
    electronConfig: "[Xe] 4f¹⁴ 5d⁵ 6s²"
  },
  {
    number: 76, symbol: "Os", name: "Осмій", mass: 190.23,
    period: 6, group: 8, category: "transition",
    electronConfig: "[Xe] 4f¹⁴ 5d⁶ 6s²"
  },
  {
    number: 77, symbol: "Ir", name: "Іридій", mass: 192.22,
    period: 6, group: 9, category: "transition",
    electronConfig: "[Xe] 4f¹⁴ 5d⁷ 6s²"
  },
  {
    number: 78, symbol: "Pt", name: "Платина", mass: 195.08,
    period: 6, group: 10, category: "transition",
    electronConfig: "[Xe] 4f¹⁴ 5d⁹ 6s¹" // Провал електрона
  },
  {
    number: 79, symbol: "Au", name: "Аурум", mass: 196.97,
    period: 6, group: 11, category: "transition",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹" // Провал електрона
  },
  {
    number: 80, symbol: "Hg", name: "Меркурій", mass: 200.59,
    period: 6, group: 12, category: "transition",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s²"
  },
  {
    number: 81, symbol: "Tl", name: "Талій", mass: 204.38,
    period: 6, group: 13, category: "post-transition",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹"
  },
  {
    number: 82, symbol: "Pb", name: "Плюмбум", mass: 207.2,
    period: 6, group: 14, category: "post-transition",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²"
  },
  {
    number: 83, symbol: "Bi", name: "Вісмут", mass: 208.98,
    period: 6, group: 15, category: "post-transition",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³"
  },
  {
    number: 84, symbol: "Po", name: "Полоній", mass: 209,
    period: 6, group: 16, category: "metalloid",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴"
  },
  {
    number: 85, symbol: "At", name: "Астат", mass: 210,
    period: 6, group: 17, category: "halogen",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵"
  },
  {
    number: 86, symbol: "Rn", name: "Радон", mass: 222,
    period: 6, group: 18, category: "noble",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶"
  },

  // ===== ПЕРІОД 7: Основні елементи (групи 1, 2) =====
  {
    number: 87, symbol: "Fr", name: "Францій", mass: 223,
    period: 7, group: 1, category: "alkali",
    electronConfig: "[Rn] 7s¹"
  },
  {
    number: 88, symbol: "Ra", name: "Радій", mass: 226,
    period: 7, group: 2, category: "alkaline",
    electronConfig: "[Rn] 7s²"
  },
  {
    number: 89, symbol: "Ac", name: "Актиній", mass: 227,
    period: 7, group: 3, category: "actinide",
    electronConfig: "[Rn] 6d¹ 7s²"
  },

  // ===== АКТИНОЇДИ (Окремий рядок під таблицею, row: 2) =====
  {
    number: 89, symbol: "Ac", name: "Актиній", mass: 227,
    period: 7, group: null, category: "actinide", row: 2,
    electronConfig: "[Rn] 6d¹ 7s²"
  },
  {
    number: 90, symbol: "Th", name: "Торій", mass: 232.04,
    period: 7, group: null, category: "actinide", row: 2,
    electronConfig: "[Rn] 6d² 7s²"
  },
  {
    number: 91, symbol: "Pa", name: "Протактиній", mass: 231.04,
    period: 7, group: null, category: "actinide", row: 2,
    electronConfig: "[Rn] 5f² 6d¹ 7s²"
  },
  {
    number: 92, symbol: "U", name: "Уран", mass: 238.03,
    period: 7, group: null, category: "actinide", row: 2,
    electronConfig: "[Rn] 5f³ 6d¹ 7s²"
  },
  {
    number: 93, symbol: "Np", name: "Нептуній", mass: 237,
    period: 7, group: null, category: "actinide", row: 2,
    electronConfig: "[Rn] 5f⁴ 6d¹ 7s²"
  },
  {
    number: 94, symbol: "Pu", name: "Плутоній", mass: 244,
    period: 7, group: null, category: "actinide", row: 2,
    electronConfig: "[Rn] 5f⁶ 7s²"
  },
  {
    number: 95, symbol: "Am", name: "Америцій", mass: 243,
    period: 7, group: null, category: "actinide", row: 2,
    electronConfig: "[Rn] 5f⁷ 7s²"
  },
  {
    number: 96, symbol: "Cm", name: "Кюрій", mass: 247,
    period: 7, group: null, category: "actinide", row: 2,
    electronConfig: "[Rn] 5f⁷ 6d¹ 7s²"
  },
  {
    number: 97, symbol: "Bk", name: "Берклій", mass: 247,
    period: 7, group: null, category: "actinide", row: 2,
    electronConfig: "[Rn] 5f⁹ 7s²"
  },
  {
    number: 98, symbol: "Cf", name: "Каліфорній", mass: 251,
    period: 7, group: null, category: "actinide", row: 2,
    electronConfig: "[Rn] 5f¹⁰ 7s²"
  },
  {
    number: 99, symbol: "Es", name: "Ейнштейній", mass: 252,
    period: 7, group: null, category: "actinide", row: 2,
    electronConfig: "[Rn] 5f¹¹ 7s²"
  },
  {
    number: 100, symbol: "Fm", name: "Фермій", mass: 257,
    period: 7, group: null, category: "actinide", row: 2,
    electronConfig: "[Rn] 5f¹² 7s²"
  },
  {
    number: 101, symbol: "Md", name: "Менделєєвій", mass: 258,
    period: 7, group: null, category: "actinide", row: 2,
    electronConfig: "[Rn] 5f¹³ 7s²"
  },
  {
    number: 102, symbol: "No", name: "Нобелій", mass: 259,
    period: 7, group: null, category: "actinide", row: 2,
    electronConfig: "[Rn] 5f¹⁴ 7s²"
  },
  {
    number: 103, symbol: "Lr", name: "Лоуренсій", mass: 266,
    period: 7, group: null, category: "actinide", row: 2,
    electronConfig: "[Rn] 5f¹⁴ 7s² 7p¹"
  },

  // ===== ПЕРІОД 7: Продовження основної таблиці (групи 4-18) =====
  {
    number: 104, symbol: "Rf", name: "Резерфордій", mass: 267,
    period: 7, group: 4, category: "transition",
    electronConfig: "[Rn] 5f¹⁴ 6d² 7s²"
  },
  {
    number: 105, symbol: "Db", name: "Дубній", mass: 268,
    period: 7, group: 5, category: "transition",
    electronConfig: "[Rn] 5f¹⁴ 6d³ 7s²"
  },
  {
    number: 106, symbol: "Sg", name: "Сіборгій", mass: 269,
    period: 7, group: 6, category: "transition",
    electronConfig: "[Rn] 5f¹⁴ 6d⁴ 7s²"
  },
  {
    number: 107, symbol: "Bh", name: "Борій", mass: 270,
    period: 7, group: 7, category: "transition",
    electronConfig: "[Rn] 5f¹⁴ 6d⁵ 7s²"
  },
  {
    number: 108, symbol: "Hs", name: "Гасій", mass: 277,
    period: 7, group: 8, category: "transition",
    electronConfig: "[Rn] 5f¹⁴ 6d⁶ 7s²"
  },
  {
    number: 109, symbol: "Mt", name: "Майтнерій", mass: 278,
    period: 7, group: 9, category: "transition",
    electronConfig: "[Rn] 5f¹⁴ 6d⁷ 7s²"
  },
  {
    number: 110, symbol: "Ds", name: "Дармштадтій", mass: 281,
    period: 7, group: 10, category: "transition",
    electronConfig: "[Rn] 5f¹⁴ 6d⁹ 7s¹"
  },
  {
    number: 111, symbol: "Rg", name: "Рентгеній", mass: 282,
    period: 7, group: 11, category: "transition",
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s¹"
  },
  {
    number: 112, symbol: "Cn", name: "Коперницій", mass: 285,
    period: 7, group: 12, category: "transition",
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s²"
  },
  {
    number: 113, symbol: "Nh", name: "Ніхоній", mass: 286,
    period: 7, group: 13, category: "post-transition",
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹"
  },
  {
    number: 114, symbol: "Fl", name: "Флеровій", mass: 289,
    period: 7, group: 14, category: "post-transition",
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²"
  },
  {
    number: 115, symbol: "Mc", name: "Московій", mass: 290,
    period: 7, group: 15, category: "post-transition",
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³"
  },
  {
    number: 116, symbol: "Lv", name: "Ліверморій", mass: 293,
    period: 7, group: 16, category: "post-transition",
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴"
  },
  {
    number: 117, symbol: "Ts", name: "Теннессін", mass: 294,
    period: 7, group: 17, category: "halogen",
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵"
  },
  {
    number: 118, symbol: "Og", name: "Оганесон", mass: 294,
    period: 7, group: 18, category: "noble",
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶"
  },

];

// Явно прикріплюємо до window, щоб periodic-table.js міг це знайти
// незалежно від того, як файли підключені (script tag, module тощо).
window.ELEMENTS_DATA = ELEMENTS_DATA;
