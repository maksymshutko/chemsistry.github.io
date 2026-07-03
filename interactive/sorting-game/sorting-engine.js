/* =========================================================
   Движок гри сортування (drag & drop).

   Вимагає, щоб GAME_META, GAME_CATEGORIES, GAME_ITEMS
   (з файлу конкретної гри, напр. games/metal-nonmetal.js)
   були вже завантажені ДО цього файлу.

   Підтримує і мишку (HTML5 Drag and Drop API), і тачскрін
   (Pointer Events) - реалізовано через Pointer Events для ОБОХ,
   що простіше й надійніше за змішування двох різних API.
   ========================================================= */

(function () {
  let items = [];
  let categories = [];
  let correctCount = 0;
  let wrongCount = 0;
  let remainingCount = 0;

  const els = {};
  let draggedEl = null;
  let ghostEl = null;
  let pointerOffsetX = 0;
  let pointerOffsetY = 0;

  function cacheElements() {
    els.tray = document.getElementById('sg-tray');
    els.zonesWrap = document.getElementById('sg-zones');
    els.progressText = document.getElementById('sg-progress-text');
    els.correctCount = document.getElementById('sg-correct-count');
    els.wrongCount = document.getElementById('sg-wrong-count');
    els.gameArea = document.getElementById('sg-game-area');
    els.finishedArea = document.getElementById('sg-finished-area');
    els.finalScore = document.getElementById('sg-final-score');
    els.restartBtn = document.getElementById('sg-restart');
  }

  function shuffle(array) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function renderZones() {
    els.zonesWrap.innerHTML = categories.map(cat => `
      <div class="sg-zone color-${cat.color}" data-category="${cat.id}">
        <div class="sg-zone-label"><span>${cat.label}</span></div>
        <div class="sg-zone-items" data-category-items="${cat.id}"></div>
      </div>
    `).join('');
  }

  function renderTray() {
    if (items.length === 0) {
      els.tray.innerHTML = `<div class="sg-tray-empty-hint">Усі картки розсортовано — переходь до результату нижче.</div>`;
      return;
    }
    els.tray.innerHTML = items.map((item, idx) => `
      <div class="sg-item" data-item-index="${idx}">${item.content}</div>
    `).join('');
    attachDragHandlers();
  }

  function updateProgress() {
    const total = correctCount + wrongAttemptsResolved() + remainingCount;
    els.progressText.textContent = `Залишилось: ${remainingCount}`;
    els.correctCount.textContent = correctCount;
    els.wrongCount.textContent = wrongCount;
  }

  // Кількість карток, які вже ОСТАТОЧНО правильно розміщені
  function wrongAttemptsResolved() {
    return 0; // wrong attempts don't remove the card from the tray, only correct does
  }

  function attachDragHandlers() {
    els.tray.querySelectorAll('.sg-item').forEach(itemEl => {
      itemEl.addEventListener('pointerdown', onPointerDown);
    });
  }

  function onPointerDown(e) {
    e.preventDefault();
    draggedEl = e.currentTarget;
    const rect = draggedEl.getBoundingClientRect();
    pointerOffsetX = e.clientX - (rect.left + rect.width / 2);
    pointerOffsetY = e.clientY - (rect.top + rect.height / 2);

    draggedEl.classList.add('dragging');

    ghostEl = document.createElement('div');
    ghostEl.className = 'sg-item-ghost';
    ghostEl.textContent = draggedEl.textContent;
    document.body.appendChild(ghostEl);
    moveGhost(e.clientX, e.clientY);

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }

  function moveGhost(x, y) {
    if (!ghostEl) return;
    ghostEl.style.left = `${x - pointerOffsetX}px`;
    ghostEl.style.top = `${y - pointerOffsetY}px`;
  }

  function onPointerMove(e) {
    moveGhost(e.clientX, e.clientY);

    // Підсвічуємо зону, над якою зараз курсор/палець
    const zones = els.zonesWrap.querySelectorAll('.sg-zone');
    zones.forEach(zone => {
      const rect = zone.getBoundingClientRect();
      const isOver = e.clientX >= rect.left && e.clientX <= rect.right &&
                      e.clientY >= rect.top && e.clientY <= rect.bottom;
      zone.classList.toggle('drag-over', isOver);
    });
  }

  function onPointerUp(e) {
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);

    const zones = els.zonesWrap.querySelectorAll('.sg-zone');
    let droppedZone = null;
    zones.forEach(zone => {
      const rect = zone.getBoundingClientRect();
      const isOver = e.clientX >= rect.left && e.clientX <= rect.right &&
                      e.clientY >= rect.top && e.clientY <= rect.bottom;
      zone.classList.remove('drag-over');
      if (isOver) droppedZone = zone;
    });

    if (ghostEl) {
      ghostEl.remove();
      ghostEl = null;
    }

    if (draggedEl) {
      draggedEl.classList.remove('dragging');
    }

    if (droppedZone && draggedEl) {
      const itemIndex = parseInt(draggedEl.dataset.itemIndex);
      const item = items[itemIndex];
      const droppedCategoryId = droppedZone.dataset.category;
      handleDrop(item, itemIndex, droppedCategoryId, droppedZone);
    }

    draggedEl = null;
  }

  function handleDrop(item, itemIndex, droppedCategoryId, zoneEl) {
    const isCorrect = item.category === droppedCategoryId;

    if (isCorrect) {
      correctCount++;
      items.splice(itemIndex, 1);
      remainingCount = items.length;

      const placedEl = document.createElement('div');
      placedEl.className = 'sg-item placed-correct';
      placedEl.textContent = item.content;
      zoneEl.querySelector('.sg-zone-items').appendChild(placedEl);

      renderTray();
      updateProgress();

      if (items.length === 0) {
        setTimeout(showFinished, 500);
      }
    } else {
      wrongCount++;
      updateProgress();

      // Знаходимо картку в лотку за актуальним індексом (renderTray не викликався,
      // тож DOM-елемент draggedEl ще валідний) і трясемо її як фідбек помилки
      const itemEl = els.tray.querySelector(`[data-item-index="${itemIndex}"]`);
      if (itemEl) {
        itemEl.classList.add('placed-wrong');
        setTimeout(() => itemEl.classList.remove('placed-wrong'), 400);
      }
    }
  }

  function showFinished() {
    els.gameArea.style.display = 'none';
    els.finishedArea.style.display = 'block';
    const total = correctCount + wrongCount;
    els.finalScore.textContent = `${correctCount} правильно, ${wrongCount} помилок`;
  }

  function restart() {
    items = shuffle(window.GAME_ITEMS);
    categories = window.GAME_CATEGORIES;
    correctCount = 0;
    wrongCount = 0;
    remainingCount = items.length;

    els.gameArea.style.display = 'block';
    els.finishedArea.style.display = 'none';

    renderZones();
    renderTray();
    updateProgress();
  }

  function initSortingGame() {
    cacheElements();

    if (!window.GAME_ITEMS || window.GAME_ITEMS.length === 0) {
      els.gameArea.innerHTML = `<div class="sg-finished"><div class="emoji">🃏</div><p>У цій грі ще немає карток.</p></div>`;
      return;
    }

    els.restartBtn.addEventListener('click', restart);
    restart();
  }

  initSortingGame();
})();
