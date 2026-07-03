/* =========================================================
   Рендерить картки ланцюжків на сторінці chains.html
   на основі даних з chains-registry.js.

   Кількість кроків рахується через fetch() тексту файлу ланцюжка
   і пошук кількості входжень "product:" (без виконання файлу
   як коду) — той самий прийом, що й у render-deck-list.js.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('chain-grid');
  const registry = window.CHAINS_REGISTRY || [];

  if (registry.length === 0) {
    grid.innerHTML = `<div class="chain-empty-registry">Ланцюжків ще не додано.</div>`;
    return;
  }

  grid.innerHTML = registry.map(chain => `
    <a href="chain-runner.html?chain=${chain.id}" class="chain-card color-${chain.color}">
      <div class="icon">${chain.icon}</div>
      <h3>${chain.title}</h3>
      <p>${chain.description}</p>
      <div class="chain-count" data-chain-id="${chain.id}">
        <span>🔗</span><span class="chain-count-text">…</span>
      </div>
    </a>
  `).join('');

  registry.forEach(chain => {
    fetch(chain.file)
      .then(res => res.text())
      .then(text => {
        const matches = text.match(/product\s*:\s*"/g);
        const count = matches ? matches.length : 0;
        const countEl = grid.querySelector(`[data-chain-id="${chain.id}"] .chain-count-text`);
        if (countEl) {
          countEl.textContent = `${count} ${count === 1 ? 'крок' : 'кроки'}`;
        }
      })
      .catch(() => {
        const countEl = grid.querySelector(`[data-chain-id="${chain.id}"] .chain-count-text`);
        if (countEl) countEl.textContent = '— кроків';
      });
  });
});
