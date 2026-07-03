/* =========================================================
   Движок "Хімічного вордла".

   Вимагає, щоб WORDLE_WORDS (з wordle-words.js) був уже
   завантажений ДО цього файлу.

   Логіка:
   - Слово дня обирається детерміновано за календарною датою,
     тому всі відвідувачі бачать те саме слово в один день.
   - Прогрес поточного дня та загальна статистика зберігаються
     в localStorage (це реальний сайт, а не Claude-артефакт,
     тому localStorage тут доречний і очікуваний).
   ========================================================= */

(function () {
  const MAX_ATTEMPTS = 6;
  const STORAGE_PREFIX = "chem-wordle-";
  const STATS_KEY = STORAGE_PREFIX + "stats";

  // Український (ЙЦУКЕН) розклад клавіатури для екранної клавіатури
  const KEYBOARD_ROWS = [
    ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ї"],
    ["Ф", "І", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Є"],
    ["ENTER", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "BACKSPACE"],
  ];

  let todayWord = "";
  let todayHint = "";
  let todayKey = ""; // дата у форматі YYYY-MM-DD, використовується як ключ localStorage
  let wordLength = 5;
  let guesses = [];       // масив уже надісланих здогадок (рядки)
  let currentGuess = "";
  let gameOver = false;

  const els = {};

  function cacheElements() {
    els.grid = document.getElementById("wd-grid");
    els.keyboard = document.getElementById("wd-keyboard");
    els.message = document.getElementById("wd-message");
    els.dayLabel = document.getElementById("wd-day-label");
    els.statsPanel = document.getElementById("wd-stats");
    els.statsText = document.getElementById("wd-stats-text");
  }

  /* ===== Визначення слова дня ===== */
  function getTodayInfo() {
    const now = new Date();
    const dateKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    const epoch = new Date(2026, 0, 1); // 1 січня 2026 — точка відліку
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dayIndexRaw = Math.round((todayMidnight - epoch) / 86400000);

    const bank = window.WORDLE_WORDS || [];
    const len = bank.length;
    const dayIndex = ((dayIndexRaw % len) + len) % len;

    return { entry: bank[dayIndex], dateKey, dayIndexRaw };
  }

  /* ===== localStorage: прогрес дня ===== */
  function loadDayProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + todayKey);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveDayProgress() {
    try {
      localStorage.setItem(STORAGE_PREFIX + todayKey, JSON.stringify({
        guesses,
        status: gameOver ? (guesses[guesses.length - 1] === todayWord ? "won" : "lost") : "playing",
      }));
    } catch (e) { /* localStorage недоступний - гра просто не збережеться */ }
  }

  /* ===== localStorage: загальна статистика ===== */
  function loadStats() {
    try {
      const raw = localStorage.getItem(STATS_KEY);
      return raw ? JSON.parse(raw) : { played: 0, wins: 0, currentStreak: 0, maxStreak: 0, lastWinDateKey: null };
    } catch (e) {
      return { played: 0, wins: 0, currentStreak: 0, maxStreak: 0, lastWinDateKey: null };
    }
  }

  function saveStats(stats) {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (e) { /* ignore */ }
  }

  function updateStatsOnFinish(won) {
    const stats = loadStats();
    stats.played += 1;
    if (won) {
      stats.wins += 1;
      stats.currentStreak += 1;
      stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
      stats.lastWinDateKey = todayKey;
    } else {
      stats.currentStreak = 0;
    }
    saveStats(stats);
    renderStats(stats);
  }

  function renderStats(stats) {
    const winRate = stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0;
    els.statsText.textContent = `Зіграно: ${stats.played} · Перемог: ${winRate}% · Поточна серія: ${stats.currentStreak} · Найкраща серія: ${stats.maxStreak}`;
    els.statsPanel.classList.add("show");
  }

  /* ===== Рендеринг сітки ===== */
  function buildGrid() {
    els.grid.innerHTML = "";
    els.grid.style.setProperty("--wd-cols", wordLength);

    for (let r = 0; r < MAX_ATTEMPTS; r++) {
      const row = document.createElement("div");
      row.className = "wd-row";
      row.id = `wd-row-${r}`;
      for (let c = 0; c < wordLength; c++) {
        const cell = document.createElement("div");
        cell.className = "wd-cell";
        cell.id = `wd-cell-${r}-${c}`;
        row.appendChild(cell);
      }
      els.grid.appendChild(row);
    }
  }

  function buildKeyboard() {
    els.keyboard.innerHTML = KEYBOARD_ROWS.map(row => `
      <div class="wd-key-row">
        ${row.map(key => {
          if (key === "ENTER") return `<button class="wd-key wd-key-wide" data-key="ENTER">Enter</button>`;
          if (key === "BACKSPACE") return `<button class="wd-key wd-key-wide" data-key="BACKSPACE">⌫</button>`;
          return `<button class="wd-key" data-key="${key}">${key}</button>`;
        }).join("")}
      </div>
    `).join("");

    els.keyboard.querySelectorAll(".wd-key").forEach(btn => {
      btn.addEventListener("click", () => handleKey(btn.dataset.key));
    });
  }

  /* ===== Ігрова логіка ===== */
  function handleKey(key) {
    if (gameOver) return;

    if (key === "ENTER") {
      submitGuess();
    } else if (key === "BACKSPACE") {
      currentGuess = currentGuess.slice(0, -1);
      renderCurrentRow();
    } else if (currentGuess.length < wordLength) {
      currentGuess += key;
      renderCurrentRow();
    }
  }

  function renderCurrentRow() {
    const rowIndex = guesses.length;
    for (let c = 0; c < wordLength; c++) {
      const cell = document.getElementById(`wd-cell-${rowIndex}-${c}`);
      if (!cell) continue;
      cell.textContent = currentGuess[c] || "";
      cell.classList.toggle("filled", !!currentGuess[c]);
    }
  }

  function showMessage(text, isTemporary) {
    els.message.textContent = text;
    els.message.classList.add("show");
    if (isTemporary) {
      setTimeout(() => {
        if (els.message.textContent === text) els.message.classList.remove("show");
      }, 1800);
    }
  }

  // Стандартний алгоритм Wordle - коректно обробляє повторювані літери
  function evaluateGuess(guess, answer) {
    const result = new Array(guess.length).fill("absent");
    const remaining = {};

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === answer[i]) {
        result[i] = "correct";
      } else {
        remaining[answer[i]] = (remaining[answer[i]] || 0) + 1;
      }
    }
    for (let i = 0; i < guess.length; i++) {
      if (result[i] === "correct") continue;
      if (remaining[guess[i]] > 0) {
        result[i] = "present";
        remaining[guess[i]] -= 1;
      }
    }
    return result;
  }

  function applyRowResult(rowIndex, guess, result) {
    for (let c = 0; c < guess.length; c++) {
      const cell = document.getElementById(`wd-cell-${rowIndex}-${c}`);
      cell.textContent = guess[c];
      cell.classList.remove("filled");
      cell.classList.add(result[c]);
    }
    updateKeyboardColors(guess, result);
  }

  function updateKeyboardColors(guess, result) {
    const rank = { absent: 0, present: 1, correct: 2 };
    for (let c = 0; c < guess.length; c++) {
      const btn = els.keyboard.querySelector(`.wd-key[data-key="${guess[c]}"]`);
      if (!btn) continue;
      const current = btn.dataset.status || "";
      if (rank[result[c]] > rank[current || "absent"] || !current) {
        btn.dataset.status = result[c];
        btn.classList.remove("absent", "present", "correct");
        btn.classList.add(result[c]);
      }
    }
  }

  function submitGuess() {
    if (currentGuess.length < wordLength) {
      showMessage("Замало літер", true);
      shakeCurrentRow();
      return;
    }

    const rowIndex = guesses.length;
    const result = evaluateGuess(currentGuess, todayWord);
    applyRowResult(rowIndex, currentGuess, result);
    guesses.push(currentGuess);

    const won = currentGuess === todayWord;
    const outOfAttempts = guesses.length >= MAX_ATTEMPTS;

    if (won || outOfAttempts) {
      gameOver = true;
      saveDayProgress();
      updateStatsOnFinish(won);
      if (won) {
        showMessage(`🎉 Правильно! ${todayHint}`, false);
      } else {
        showMessage(`Слово було: ${todayWord}. ${todayHint}`, false);
      }
    } else {
      saveDayProgress();
    }

    currentGuess = "";
  }

  function shakeCurrentRow() {
    const row = document.getElementById(`wd-row-${guesses.length}`);
    if (!row) return;
    row.classList.add("shake");
    setTimeout(() => row.classList.remove("shake"), 400);
  }

  /* ===== Відновлення прогресу поточного дня ===== */
  function restoreProgress(saved) {
    guesses = saved.guesses.slice();
    guesses.forEach((guess, rowIndex) => {
      const result = evaluateGuess(guess, todayWord);
      applyRowResult(rowIndex, guess, result);
    });

    if (saved.status === "won" || saved.status === "lost") {
      gameOver = true;
      if (saved.status === "won") {
        showMessage(`🎉 Уже розгадано сьогодні! ${todayHint}`, false);
      } else {
        showMessage(`Уже зіграно сьогодні. Слово було: ${todayWord}. ${todayHint}`, false);
      }
    }
  }

  function handlePhysicalKeydown(e) {
    if (gameOver) return;
    const key = e.key;

    if (key === "Enter") {
      handleKey("ENTER");
    } else if (key === "Backspace") {
      handleKey("BACKSPACE");
    } else if (/^[а-яїієґ]$/i.test(key)) {
      handleKey(key.toUpperCase());
    }
  }

  function initWordle() {
    cacheElements();

    const { entry, dateKey } = getTodayInfo();
    if (!entry) {
      els.grid.innerHTML = `<p style="color:var(--text-dim);">Банк слів порожній.</p>`;
      return;
    }

    todayWord = entry.word;
    todayHint = entry.hint;
    todayKey = dateKey;
    wordLength = todayWord.length;

    els.dayLabel.textContent = `Слово дня · ${wordLength} літер · ${dateKey}`;

    buildGrid();
    buildKeyboard();

    const saved = loadDayProgress();
    if (saved && saved.guesses && saved.guesses.length) {
      restoreProgress(saved);
    }

    const stats = loadStats();
    renderStats(stats);

    document.addEventListener("keydown", handlePhysicalKeydown);
  }

  document.addEventListener("DOMContentLoaded", initWordle);
})();
