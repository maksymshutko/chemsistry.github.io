/* =========================================================
   Движок проходження тесту.

   Вимагає, щоб TEST_QUESTIONS (з файлу конкретного тесту,
   напр. tests/isomeriya.js) був уже завантажений ДО цього файлу.

   Підключення (порядок важливий):
     <script src="tests/isomeriya.js" defer></script>
     <script src="test-engine.js" defer></script>

   Формат TEST_QUESTIONS:
     [{ question: "...", options: ["...","...","...","..."], correct: 1 }, ...]
     "correct" — індекс правильної відповіді в масиві options (з 0).
   ========================================================= */

(function () {
  let questions = [];
  let answers = [];
  let submitted = false;

  const els = {};

  function cacheElements() {
    els.container = document.getElementById('tq-questions');
    els.submitBtn = document.getElementById('tq-submit');
    els.submitHint = document.getElementById('tq-submit-hint');
    els.answeredCount = document.getElementById('tq-answered-count');
    els.result = document.getElementById('tq-result');
    els.resultScore = document.getElementById('tq-result-score');
    els.resultLabel = document.getElementById('tq-result-label');
    els.retryBtn = document.getElementById('tq-retry');
  }

  function renderQuestions() {
    els.container.innerHTML = questions.map((q, qi) => `
      <div class="tq-block" id="tq-block-${qi}">
        <div class="tq-block-num">Питання ${qi + 1} з ${questions.length}</div>
        <div class="tq-block-text">${q.question}</div>
        <div class="tq-options">
          ${q.options.map((opt, oi) => `
            <label class="tq-option" data-qi="${qi}" data-oi="${oi}">
              <input type="radio" name="tq-q${qi}" value="${oi}">
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `).join('');

    els.container.querySelectorAll('.tq-option').forEach(opt => {
      opt.addEventListener('click', () => {
        if (submitted) return;
        const qi = Number(opt.dataset.qi);
        const oi = Number(opt.dataset.oi);
        answers[qi] = oi;
        opt.querySelector('input').checked = true;
        updateSelection(qi);
        updateAnsweredCount();
      });
    });
  }

  function updateSelection(qi) {
    els.container.querySelectorAll(`.tq-option[data-qi="${qi}"]`).forEach(opt => {
      opt.classList.toggle('selected', Number(opt.dataset.oi) === answers[qi]);
    });
  }

  function updateAnsweredCount() {
    const count = answers.filter(a => a !== undefined).length;
    els.answeredCount.textContent = `Відповідено: ${count} з ${questions.length}`;
  }

  function submitTest() {
    submitted = true;
    let score = 0;

    questions.forEach((q, qi) => {
      const block = document.getElementById(`tq-block-${qi}`);
      const selected = answers[qi];
      if (selected === q.correct) score++;
      if (selected === undefined) block.classList.add('unanswered');

      block.querySelectorAll('.tq-option').forEach(opt => {
        const oi = Number(opt.dataset.oi);
        opt.querySelector('input').disabled = true;
        if (oi === q.correct) opt.classList.add('correct');
        else if (oi === selected) opt.classList.add('wrong');
      });
    });

    showResult(score);
    els.submitBtn.disabled = true;
    els.submitHint.style.display = 'none';
  }

  function showResult(score) {
    const total = questions.length;
    const percent = Math.round((score / total) * 100);

    let grade = 'grade-low';
    if (percent >= 80) grade = 'grade-good';
    else if (percent >= 50) grade = 'grade-mid';

    els.result.className = `tq-result show ${grade}`;
    els.resultScore.textContent = `${score} / ${total}`;
    els.resultLabel.textContent = `Правильних відповідей: ${percent}%`;

    els.result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function restart() {
    answers = new Array(questions.length);
    submitted = false;
    els.result.classList.remove('show');
    els.submitBtn.disabled = false;
    els.submitHint.style.display = '';
    renderQuestions();
    updateAnsweredCount();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initTest() {
    cacheElements();

    if (!window.TEST_QUESTIONS || window.TEST_QUESTIONS.length === 0) {
      els.container.innerHTML = `<p style="color:var(--text-dim);">У цьому тесті ще немає запитань.</p>`;
      document.querySelector('.tq-actions').style.display = 'none';
      els.submitHint.style.display = 'none';
      return;
    }

    questions = window.TEST_QUESTIONS;
    answers = new Array(questions.length);

    renderQuestions();
    updateAnsweredCount();

    els.submitBtn.addEventListener('click', submitTest);
    els.retryBtn.addEventListener('click', restart);
  }

  // Цей файл підвантажується ДИНАМІЧНО (через loadScript у test-runner.html)
  // вже ПІСЛЯ того, як подія DOMContentLoaded на сторінці відбулася.
  // Тому викликаємо ініціалізацію напряму, а не чекаємо на цю подію.
  initTest();
})();
