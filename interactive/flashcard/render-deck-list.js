/* =========================================================
   Рендерить картки тем на сторінці flashcards.html
   на основі даних з decks-registry.js.

   Кількість карток рахується через fetch() тексту файлу колоди
   і пошук кількості об'єктів у масиві DECK_CARDS (рахуємо
   входження "front:" - воно є рівно один раз на картку).
   Це НЕ виконує сам файл колоди як код, тому кілька колод
   можна "переглянути" на одній сторінці без конфлікту імен
   (на відміну від підключення через <script src="...">,
   де кожен файл оголошує однакові const DECK_META/DECK_CARDS).
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('fc-deck-grid');
  const registry = window.DECKS_REGISTRY || [];

  if (registry.length === 0) {
    grid.innerHTML = `<div class="fc-empty-registry">Тем ще не додано.</div>`;
    return;
  }

  grid.innerHTML = registry.map(deck => `
    <a href="flashcards-deck.html?deck=${deck.id}" class="fc-deck-card color-${deck.color}">
      <div class="icon">${deck.icon}</div>
      <h3>${deck.title}</h3>
      <p>${deck.description}</p>
      <div class="fc-count" data-deck-id="${deck.id}">
        <span>📇</span><span class="fc-count-text">…</span>
      </div>
    </a>
  `).join('');

  registry.forEach(deck => {
    fetch(deck.file)
      .then(res => res.text())
      .then(text => {
        // Кожна картка має рівно одне поле front: "..." (з лапкою одразу після
        // двокрапки) - так відсікаються згадки слова "front" у коментарях файлу.
        const matches = text.match(/front\s*:\s*"/g);
        const count = matches ? matches.length : 0;
        const countEl = grid.querySelector(`[data-deck-id="${deck.id}"] .fc-count-text`);
        if (countEl) {
          countEl.textContent = `${count} ${count === 1 ? 'картка' : 'карток'}`;
        }
      })
      .catch(() => {
        const countEl = grid.querySelector(`[data-deck-id="${deck.id}"] .fc-count-text`);
        if (countEl) countEl.textContent = '— карток';
      });
  });
});
