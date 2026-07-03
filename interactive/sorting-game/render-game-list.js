/* =========================================================
   Рендерить картки тем на сторінці sorting.html
   на основі даних з games-registry.js.

   Кількість карток рахується через fetch() тексту файлу гри
   (без виконання коду) - той самий підхід, що в render-deck-list.js
   для флеш-карт, щоб уникнути конфлікту імен між кількома
   завантаженими файлами на одній сторінці.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('sg-game-grid');
  const registry = window.GAMES_REGISTRY || [];

  if (registry.length === 0) {
    grid.innerHTML = `<div class="sg-empty-registry">Ігор ще не додано.</div>`;
    return;
  }

  grid.innerHTML = registry.map(game => `
    <a href="sorting-game.html?game=${game.id}" class="sg-game-card color-${game.color}">
      <div class="icon">${game.icon}</div>
      <h3>${game.title}</h3>
      <p>${game.description}</p>
      <div class="sg-count" data-game-id="${game.id}">
        <span>🎯</span><span class="sg-count-text">…</span>
      </div>
    </a>
  `).join('');

  registry.forEach(game => {
    fetch(game.file)
      .then(res => res.text())
      .then(text => {
        // Кожна картка для сортування має поле content: "..." (з лапкою
        // одразу після двокрапки) - так відсікаються згадки слова у коментарях.
        const matches = text.match(/content\s*:\s*"/g);
        const count = matches ? matches.length : 0;
        const countEl = grid.querySelector(`[data-game-id="${game.id}"] .sg-count-text`);
        if (countEl) {
          countEl.textContent = `${count} ${count === 1 ? 'картка' : 'карток'}`;
        }
      })
      .catch(() => {
        const countEl = grid.querySelector(`[data-game-id="${game.id}"] .sg-count-text`);
        if (countEl) countEl.textContent = '— карток';
      });
  });
});
