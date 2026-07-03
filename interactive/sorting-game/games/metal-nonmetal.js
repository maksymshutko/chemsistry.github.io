/* =========================================================
   Гра сортування: Метали / Неметали.

   GAME_META — метадані теми (показуються на сторінці вибору тем).
   GAME_CATEGORIES — рівно 2 категорії-"корзини", куди тягнуть картки.
     id — використовується в полі "category" кожної картки нижче
     label — текст на корзині
     color — "green" або "orange" (для підсвічування корзини)
   GAME_ITEMS — самі картки для сортування. Кожна:
     content — що показано на картці (символ/слово/формула)
     category — id категорії, до якої ця картка НАЛЕЖИТЬ ПРАВИЛЬНО
   ========================================================= */

const GAME_META = {
  id: "metal-nonmetal",
  title: "Метал чи неметал?",
  description: "Розподіли хімічні елементи на метали та неметали.",
  icon: "🧲",
  color: "blue",
};

const GAME_CATEGORIES = [
  { id: "metal", label: "Метал", color: "orange" },
  { id: "nonmetal", label: "Неметал", color: "green" },
];

const GAME_ITEMS = [
  { content: "Fe", category: "metal" },
  { content: "O", category: "nonmetal" },
  { content: "Na", category: "metal" },
  { content: "Cl", category: "nonmetal" },
  { content: "Cu", category: "metal" },
  { content: "N", category: "nonmetal" },
  { content: "Au", category: "metal" },
  { content: "S", category: "nonmetal" },
  { content: "Ca", category: "metal" },
  { content: "H", category: "nonmetal" },
  { content: "Zn", category: "metal" },
  { content: "C", category: "nonmetal" },
];

// Явно прикріплюємо до window - інакше скрипти, підключені через
// динамічний <script src="...">, не завжди бачать const як глобальну змінну.
window.GAME_META = GAME_META;
window.GAME_CATEGORIES = GAME_CATEGORIES;
window.GAME_ITEMS = GAME_ITEMS;
