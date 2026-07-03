/* =========================================================
   Гра сортування: Вуглеводи

   GAME_META — метадані теми (показуються на сторінці вибору тем).
   GAME_CATEGORIES — рівно 3 категорії-"кошики", куди тягнуть картки.
     id — використовується в полі "category" кожної картки нижче
     label — текст на кошику
     color — "green" або "orange" (для підсвічування кошика)
   GAME_ITEMS — самі картки для сортування. Кожна:
     content — що показано на картці (символ/слово/формула)
     category — id категорії, до якої ця картка НАЛЕЖИТЬ ПРАВИЛЬНО
   ========================================================= */

const GAME_META = {
  id: "carbohydrates",
  title: "Вуглеводи",
  description: "Розподіли речовини на вуглеводи та не вуглеводи.",
  icon: "🍭",
  color: "green",
};

const GAME_CATEGORIES = [
  { id: "monosaccharide", label: "Моносахариди", color: "green" },
  { id: "disaccharide", label: "Дисахариди", color: "orange" },
  { id: "polysaccharide", label: "Полісахариди", color: "blue" },
];

const GAME_ITEMS = [
  { content: "Глюкоза", category: "monosaccharide" },
  { content: "Сахароза", category: "disaccharide" },
  { content: "Крохмаль", category: "polysaccharide" },
  { content: "Фруктоза", category: "monosaccharide" },
  { content: "Лактоза", category: "disaccharide" },
  { content: "Целюлоза", category: "polysaccharide" },
  { content: "Рибоза", category: "monosaccharide" },
  { content: "Мальтоза", category: "disaccharide" },

];

// Явно прикріплюємо до window - інакше скрипти, підключені через
// динамічний <script src="...">, не завжди бачать const як глобальну змінну.
window.GAME_META = GAME_META;
window.GAME_CATEGORIES = GAME_CATEGORIES;
window.GAME_ITEMS = GAME_ITEMS;