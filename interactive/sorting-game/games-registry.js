/* =========================================================
   Реєстр усіх ігор сортування (drag & drop).

   Це ЄДИНЕ місце, яке потрібно редагувати, коли додаєте нову гру.
   "color" — один з: green, orange, blue, purple
   (визначає колір картки теми на сторінці вибору)
   ========================================================= */

const GAMES_REGISTRY = [
  {
    id: "metal-nonmetal",
    file: "games/metal-nonmetal.js",
    title: "Метал чи неметал?",
    description: "Розподіли хімічні елементи на метали та неметали.",
    icon: "🧲",
    color: "blue",
  },
  {
    id: "organic-inorganic",
    file: "games/organic-inorganic.js",
    title: "Органічна чи неорганічна?",
    description: "Розподіли речовини на органічні та неорганічні сполуки.",
    icon: "🧪",
    color: "purple",
  },
  {
    id: "acid-base",
    file: "games/acid-base.js",
    title: "Кислота чи основа?",
    description: "Розподіли речовини на кислоти та основи.",
    icon: "⚗️",
    color: "orange",
  },
   {
    id: "carbohydrates",
    file: "games/carbohydrates.js",
    title: "Вуглеводи",
    description: "Розподіли речовини на кислоти та основи.",
    icon: "🍭",
    color: "green",
  },


  // ===== Додавайте нові гри тут за тією ж схемою =====
  // {
  //   id: "acid-base",
  //   file: "games/acid-base.js",
  //   title: "Кислота чи основа?",
  //   description: "...",
  //   icon: "⚗️",
  //   color: "orange",
  // },
];

window.GAMES_REGISTRY = GAMES_REGISTRY;
