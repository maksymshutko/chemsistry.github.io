/* =========================================================
   Реєстр усіх інтерактивних розділів сайту.

   Це ЄДИНЕ місце, яке потрібно редагувати, коли додаєте новий
   інтерактивний розділ (нову гру, новий інструмент тощо).

   Кожен запис:
     id          — унікальний ідентифікатор (латиницею)
     href        — посилання на сторінку розділу (відносно кореня сайту)
     title       — назва картки
     description — короткий опис під назвою
     icon        — emoji-іконка
     color       — один з: green, orange, blue, purple
     badge       — (опційно) короткий текст-позначка, напр. "2 теми", "Новинка"
   ========================================================= */

const INTERACTIVE_HUB_REGISTRY = [
  {
    id: "flashcards",
    href: "flashcard/flashcards.html",
    title: "Флеш-карти",
    description: "Повторюй терміни й формули у форматі карток: натисни, щоб перевернути.",
    icon: "🃏",
    color: "green",
    badge: "6 тем",
  },
  {
    id: "sorting-game",
    href: "sorting-game/sorting.html",
    title: "Сортування",
    description: "Розподіляй картки за категоріями, перетягуючи їх мишкою або пальцем.",
    icon: "🎯",
    color: "blue",
    badge: "2 теми",
  },
  {
    id: "periodic-table",
    href: "periodic_table/periodic-table.html",
    title: "Періодична таблиця",
    description: "Інтерактивна таблиця Менделєєва з усіма елементами та їх властивостями.",
    icon: "⚛️",
    color: "purple",
  },
  {
    id: "molar-mass",
    href: "molar_mass/molar-mass.html",
    title: "Калькулятор молярної маси",
    description: "Введи хімічну формулу — миттєво дізнайся молярну масу та частки елементів.",
    icon: "🧮",
    color: "orange",
  },
  {
    id: "tests",
    href: "tests/tests.html",
    title: "Тести",
    description: "Перевір знання з теми — 12 запитань з автоматичним підрахунком результату.",
    icon: "📝",
    color: "green",
    badge: "2 теми",
  },
  {
    id: "wordle",
    href: "wordle/wordle.html",
    title: "Хімічний вордл",
    description: "Вгадай хімічний термін за 6 спроб. Нове слово щодня, однакове для всіх.",
    icon: "🔤",
    color: "purple",
    badge: "Слово дня",
  },

  // ===== Додавайте нові розділи тут за тією ж схемою =====
  // {
  //   id: "new-tool",
  //   href: "new-tool/index.html",
  //   title: "Назва інструменту",
  //   description: "Короткий опис.",
  //   icon: "🔬",
  //   color: "green",
  // },
];

window.INTERACTIVE_HUB_REGISTRY = INTERACTIVE_HUB_REGISTRY;
