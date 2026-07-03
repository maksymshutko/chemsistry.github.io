/* =========================================================
   Гра сортування: Органічні / Неорганічні речовини.
   Структура та призначення полів - див. коментар у metal-nonmetal.js
   ========================================================= */

const GAME_META = {
  id: "organic-inorganic",
  title: "Органічна чи неорганічна?",
  description: "Розподіли речовини на органічні та неорганічні сполуки.",
  icon: "🧪",
  color: "purple",
};

const GAME_CATEGORIES = [
  { id: "organic", label: "Органічна", color: "orange" },
  { id: "inorganic", label: "Неорганічна", color: "green" },
];

const GAME_ITEMS = [
  { content: "CH₄", category: "organic" },
  { content: "NaCl", category: "inorganic" },
  { content: "C₂H₅OH", category: "organic" },
  { content: "H₂O", category: "inorganic" },
  { content: "C₆H₁₂O₆", category: "organic" },
  { content: "CO₂", category: "inorganic" },
  { content: "CH₃COOH", category: "organic" },
  { content: "H₂SO₄", category: "inorganic" },
  { content: "C₂H₄", category: "organic" },
  { content: "NaOH", category: "inorganic" },
  { content: "C₆H₆", category: "organic" },
  { content: "CaCO₃", category: "inorganic" },
];

window.GAME_META = GAME_META;
window.GAME_CATEGORIES = GAME_CATEGORIES;
window.GAME_ITEMS = GAME_ITEMS;
