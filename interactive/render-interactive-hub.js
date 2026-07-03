/* =========================================================
   Рендерить картки розділів на сторінці interactive.html
   на основі даних з interactive-hub-registry.js.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('ih-grid');
  const registry = window.INTERACTIVE_HUB_REGISTRY || [];

  if (registry.length === 0) {
    grid.innerHTML = `<div class="ih-empty">Розділів ще не додано.</div>`;
    return;
  }

  grid.innerHTML = registry.map(item => `
    <a href="${item.href}" class="ih-card color-${item.color}">
      <div class="ih-card-top">
        <div class="icon">${item.icon}</div>
        ${item.badge ? `<span class="ih-badge">${item.badge}</span>` : ''}
      </div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </a>
  `).join('');
});
