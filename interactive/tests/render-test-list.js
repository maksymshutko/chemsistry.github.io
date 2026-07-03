/* =========================================================
   Рендерить картки тестів на сторінці tests.html
   на основі даних з tests-registry.js.

   Кількість запитань рахується через fetch() тексту файлу тесту
   і пошук кількості входжень "question:" (без виконання файлу
   як коду) — той самий прийом, що й у render-deck-list.js.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('test-grid');
  const registry = window.TESTS_REGISTRY || [];

  if (registry.length === 0) {
    grid.innerHTML = `<div class="test-empty-registry">Тестів ще не додано.</div>`;
    return;
  }

  grid.innerHTML = registry.map(test => `
    <a href="test-runner.html?test=${test.id}" class="test-card color-${test.color}">
      <div class="icon">${test.icon}</div>
      <h3>${test.title}</h3>
      <p>${test.description}</p>
      <div class="test-count" data-test-id="${test.id}">
        <span>📝</span><span class="test-count-text">…</span>
      </div>
    </a>
  `).join('');

  registry.forEach(test => {
    fetch(test.file)
      .then(res => res.text())
      .then(text => {
        const matches = text.match(/question\s*:\s*"/g);
        const count = matches ? matches.length : 0;
        const countEl = grid.querySelector(`[data-test-id="${test.id}"] .test-count-text`);
        if (countEl) {
          countEl.textContent = `${count} запитань`;
        }
      })
      .catch(() => {
        const countEl = grid.querySelector(`[data-test-id="${test.id}"] .test-count-text`);
        if (countEl) countEl.textContent = '— запитань';
      });
  });
});
