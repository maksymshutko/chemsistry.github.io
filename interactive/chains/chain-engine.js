/* =========================================================
   Движок ланцюжка перетворень.

   Вимагає, щоб CHAIN_DATA (з файлу конкретного ланцюжка,
   напр. chains/etan-etanal.js) був уже завантажений ДО цього файлу.

   Формат CHAIN_DATA:
     {
       start: "Етан",
       steps: [{ reagent: "...", product: "..." }, ...],
       distractors: ["...", ...],
     }

   Підключення (порядок важливий):
     <script src="chains/etan-etanal.js" defer></script>
     <script src="chain-engine.js" defer></script>
   ========================================================= */

(function () {
  let steps = [];
  let currentStep = 0;
  let mistakes = 0;
  let poolWords = [];

  const els = {};

  function cacheElements() {
    els.flow = document.getElementById('cn-flow');
    els.pool = document.getElementById('cn-pool');
    els.progress = document.getElementById('cn-progress');
    els.mistakesEl = document.getElementById('cn-mistakes');
    els.result = document.getElementById('cn-result');
    els.resultText = document.getElementById('cn-result-text');
    els.retryBtn = document.getElementById('cn-retry');
  }

  function shuffle(array) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function renderFlow() {
    let html = `<div class="cn-node start">${window.CHAIN_DATA.start}</div>`;

    steps.forEach((step, i) => {
      html += `
        <div class="cn-arrow">
          <span class="cn-arrow-line">↓</span>
          <span class="cn-reagent">${step.reagent}</span>
        </div>
        <div class="cn-node ${i < currentStep ? 'filled' : 'pending'}" id="cn-node-${i}">
          ${i < currentStep ? step.product : '?'}
        </div>
      `;
    });

    els.flow.innerHTML = html;
  }

  function renderPool() {
    els.pool.innerHTML = poolWords.map(word => `
      <button class="cn-tile" data-word="${word}">${word}</button>
    `).join('');

    els.pool.querySelectorAll('.cn-tile').forEach(tile => {
      tile.addEventListener('click', () => handleTileClick(tile));
    });
  }

  function updateProgress() {
    els.progress.textContent = currentStep >= steps.length
      ? `Готово: ${steps.length} з ${steps.length}`
      : `Крок ${currentStep + 1} з ${steps.length}`;
    els.mistakesEl.textContent = mistakes > 0 ? `Помилок: ${mistakes}` : '';
  }

  function handleTileClick(tile) {
    if (currentStep >= steps.length) return;

    const word = tile.dataset.word;
    const correctWord = steps[currentStep].product;

    if (word === correctWord) {
      const node = document.getElementById(`cn-node-${currentStep}`);
      node.textContent = correctWord;
      node.classList.remove('pending');
      node.classList.add('filled');

      tile.classList.add('used');
      poolWords = poolWords.filter(w => w !== word);

      currentStep++;
      updateProgress();

      if (currentStep >= steps.length) {
        setTimeout(showResult, 300);
      }
    } else {
      mistakes++;
      updateProgress();
      tile.classList.add('wrong');
      setTimeout(() => tile.classList.remove('wrong'), 400);
    }
  }

  function showResult() {
    els.result.classList.add('show');
    els.resultText.textContent = mistakes === 0
      ? `Ідеально — жодної помилки!`
      : `Готово, з ${mistakes} ${mistakes === 1 ? 'помилкою' : 'помилками'}.`;
    els.result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function restart() {
    currentStep = 0;
    mistakes = 0;
    els.result.classList.remove('show');

    const products = steps.map(s => s.product);
    poolWords = shuffle([...products, ...(window.CHAIN_DATA.distractors || [])]);

    renderFlow();
    renderPool();
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initChain() {
    cacheElements();

    if (!window.CHAIN_DATA || !window.CHAIN_DATA.steps || window.CHAIN_DATA.steps.length === 0) {
      els.flow.innerHTML = `<p style="color:var(--text-dim);">У цьому ланцюжку ще немає кроків.</p>`;
      document.querySelector('.cn-pool-label').style.display = 'none';
      return;
    }

    steps = window.CHAIN_DATA.steps;

    els.retryBtn.addEventListener('click', restart);
    restart();
  }

  // Цей файл підвантажується ДИНАМІЧНО (через loadScript у chain-runner.html)
  // вже ПІСЛЯ того, як подія DOMContentLoaded на сторінці відбулася.
  // Тому викликаємо ініціалізацію напряму, а не чекаємо на цю подію.
  initChain();
})();
