/* =========================================================
   Реєстр усіх колод флеш-карт.

   Це ЄДИНЕ місце, яке потрібно редагувати, коли додаєте нову тему.
   Кожен запис: { id, file, title, description, icon, color }

   "file" — шлях до файлу колоди (відносно цього файлу).
   "color" — один з: green, orange, blue, purple (визначає
             колір картки теми на сторінці вибору, див. flashcard-style.css)

   Сторінка вибору тем (flashcards.html) читає САМЕ цей файл,
   а не лазить по decks/ автоматично — це означає, що нова тема
   з'явиться на сайті тільки після того, як ви додасте сюди запис.
   ========================================================= */

const DECKS_REGISTRY = [
  {
    id: "elements",
    file: "decks/elements.js",
    title: "Хімічні елементи",
    description: "Символи, атомні номери, маси та цікаві факти про елементи.",
    icon: "⚛️",
    color: "green",
  },
  {
    id: "organic",
    file: "decks/organic.js",
    title: "Органічні речовини",
    description: "Формули, назви та властивості основних класів органічних сполук.",
    icon: "⚗️",
    color: "orange",
  },
  {
    id: "functional_group",
    file: "decks/functional_group.js",
    title: "Функціональні групи",
    description: "Основні функціональні групи органічних сполук та їхні властивості.",
    icon: "🧬",
    color: "purple",
  },
  {
    id: "bonds",
    file: "decks/bonds.js",
    title: "Хімічні зв'язки",
    description: "Основні типи хімічних зв'язків та їхні властивості.",
    icon: "🔗",
    color: "blue",
  },
  {
    id: "reactions",
    file: "decks/reactions.js",
    title: "Хімічні реакції",
    description: "Основні типи хімічних реакцій та їхні властивості.",
    icon: "🧪",
    color: "green",
  },
  {
    id: "polymers",
    file: "decks/polymers.js",
    title: "Полімери",
    description: "Основні типи полімерів, їхні властивості та застосування.",
    icon: "🧵",
    color: "orange",
  },

  // ===== Додавайте нові теми тут за тією ж схемою =====
  // {
  //   id: "ions",
  //   file: "decks/ions.js",
  //   title: "Йони та заряди",
  //   description: "...",
  //   icon: "🔋",
  //   color: "blue",
  // },
];

// Явно прикріплюємо до window - інакше скрипти, підключені через
// динамічний <script src="..."> (без type="module"), не завжди
// бачать const/let з іншого файлу як глобальну змінну.
window.DECKS_REGISTRY = DECKS_REGISTRY;
