/* =========================================================
   Реєстр усіх тестів сайту.

   Це ЄДИНЕ місце, яке потрібно редагувати, коли додаєте новий
   тест до вже написаного уроку/теми.
   Кожен запис: { id, file, title, description, icon, color, topicHref }

   "file"      — шлях до файлу тесту (відносно цього файлу).
   "color"     — один з: green, orange, blue, purple.
   "topicHref" — (опційно) посилання на сторінку теми уроків,
                 якій відповідає цей тест.

   Сторінка вибору тестів (tests.html) читає САМЕ цей файл,
   а не лазить по tests/ автоматично — новий тест з'явиться
   на сайті тільки після того, як ви додасте сюди запис.
   ========================================================= */

const TESTS_REGISTRY = [
  {
    id: "isomeriya",
    file: "tests/isomeriya.js",
    title: "Тема 1 · Ізомерія",
    description: "Явище ізомерії, типи ізомерів та карбон-карбонові зв'язки.",
    icon: "🧬",
    color: "green",
    topicHref: "../../topics/topic1.html",
  },
  {
    id: "alkany",
    file: "tests/alkany.js",
    title: "Тема 2 · Алкани",
    description: "Загальна формула, номенклатура, ізомерія та властивості алканів.",
    icon: "⛓️",
    color: "blue",
    topicHref: "../../topics/topic2.html",
  },

  // ===== Додавайте нові тести тут за тією ж схемою =====
  // {
  //   id: "alkeny",
  //   file: "tests/alkeny.js",
  //   title: "Тема 2 · Алкени",
  //   description: "...",
  //   icon: "🧪",
  //   color: "orange",
  //   topicHref: "../../topics/topic2.html",
  // },
];

// Явно прикріплюємо до window - інакше скрипти, підключені через
// динамічний <script src="..."> (без type="module"), не завжди
// бачать const/let з іншого файлу як глобальну змінну.
window.TESTS_REGISTRY = TESTS_REGISTRY;
