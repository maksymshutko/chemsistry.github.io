/* =========================================================
   Движок гри флеш-карт.

   Вимагає, щоб DECK_META і DECK_CARDS (з файлу конкретної
   колоди, напр. decks/elements.js) були вже завантажені
   ДО цього файлу.

   Підключення (порядок важливий):
     <script src="decks/elements.js" defer></script>
     <script src="flashcard-engine.js" defer></script>
   ========================================================= */

(function () {
  let cards = [];
  let currentIndex = 0;
  let isFlipped = false;

  const els = {};

  function cacheElements() {
    els.stage = document.getElementById('fc-card-stage');
    els.card = document.getElementById('fc-card');
    els.symbol = document.getElementById('fc-symbol');
    els.backTitle = document.getElementById('fc-back-title');
    els.facts = document.getElementById('fc-facts');
    els.note = document.getElementById('fc-note');
    els.progressText = document.getElementById('fc-progress-text');
    els.progressBar = document.getElementById('fc-progress-bar');
    els.prevBtn = document.getElementById('fc-prev');
    els.nextBtn = document.getElementById('fc-next');
    els.shuffleBtn = document.getElementById('fc-shuffle');
    els.gameArea = document.getElementById('fc-game-area');
    els.finishedArea = document.getElementById('fc-finished-area');
    els.restartBtn = document.getElementById('fc-restart');
  }

  function shuffle(array) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function renderCard() {
    const card = cards[currentIndex];
    if (!card) return;

    els.symbol.textContent = card.front;
    els.backTitle.textContent = card.title;

    els.facts.innerHTML = card.facts.map(f => `
      <div class="fc-fact-row">
        <span class="fc-fact-label">${f.label}</span>
        <span class="fc-fact-value">${f.value}</span>
      </div>
    `).join('');

    if (card.note) {
      els.note.textContent = card.note;
      els.note.style.display = 'block';
    } else {
      els.note.style.display = 'none';
    }

    updateProgress();
    updateNavButtons();
  }

  function updateProgress() {
    els.progressText.textContent = `Картка ${currentIndex + 1} з ${cards.length}`;
    const percent = ((currentIndex + 1) / cards.length) * 100;
    els.progressBar.style.width = `${percent}%`;
  }

  function updateNavButtons() {
    els.prevBtn.disabled = currentIndex === 0;
  }

  function flipCard() {
    isFlipped = !isFlipped;
    els.card.classList.toggle('flipped', isFlipped);
  }

  function unflip() {
    isFlipped = false;
    els.card.classList.remove('flipped');
  }

  function goNext() {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      unflip();
      renderCard();
    } else {
      showFinished();
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      currentIndex--;
      unflip();
      renderCard();
    }
  }

  function showFinished() {
    els.gameArea.style.display = 'none';
    els.finishedArea.style.display = 'block';
  }

  function restart(reshuffle) {
    cards = reshuffle ? shuffle(window.DECK_CARDS) : window.DECK_CARDS.slice();
    currentIndex = 0;
    isFlipped = false;
    els.gameArea.style.display = 'block';
    els.finishedArea.style.display = 'none';
    renderCard();
  }

  function initFlashcards() {
    cacheElements();

    if (!window.DECK_CARDS || window.DECK_CARDS.length === 0) {
      els.gameArea.innerHTML = `<div class="fc-finished"><div class="emoji">🃏</div><p>У цій колоді ще немає карток.</p></div>`;
      return;
    }

    cards = window.DECK_CARDS.slice();

    els.card.addEventListener('click', flipCard);
    els.nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goNext(); });
    els.prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goPrev(); });
    els.shuffleBtn.addEventListener('click', (e) => { e.stopPropagation(); restart(true); });
    els.restartBtn.addEventListener('click', () => restart(false));

    // Keyboard navigation: ← → for prev/next, Space/Enter to flip
    document.addEventListener('keydown', (e) => {
      if (els.gameArea.style.display === 'none') return;
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        flipCard();
      }
    });

    renderCard();
  }

  // Цей файл підвантажується ДИНАМІЧНО (через loadScript у flashcards-deck.html)
  // вже ПІСЛЯ того, як подія DOMContentLoaded на сторінці відбулася.
  // Тому викликаємо ініціалізацію напряму, а не чекаємо на цю подію -
  // вона б ніколи не спрацювала повторно.
  initFlashcards();
})();
