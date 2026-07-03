/* =========================================================
   Гра сортування: Кислоти чи основа

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
  id: "acid-base",
  title: "Кислота чи основа?",
  description: "Розподіли речовини на кислоти та основи.",
  icon: "⚗️",
  color: "orange",
};

const GAME_CATEGORIES = [
  { id: "acid", label: "Кислота", color: "orange" },
  { id: "base", label: "Основа", color: "green" },
];

const GAME_ITEMS = [
  { content: "HCl", category: "acid" },
  { content: "NaOH", category: "base" },
  { content: "H2SO4", category: "acid" },
  { content: "KOH", category: "base" },
  { content: "HNO3", category: "acid" },
  { content: "Ca(OH)2", category: "base" },
  { content: "HI", category: "acid" },
  { content: "Ba(OH)2", category: "base" },

];

// Явно прикріплюємо до window - інакше скрипти, підключені через
// динамічний <script src="...">, не завжди бачать const як глобальну змінну.
window.GAME_META = GAME_META;
window.GAME_CATEGORIES = GAME_CATEGORIES;
window.GAME_ITEMS = GAME_ITEMS;