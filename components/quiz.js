function initQuiz() {
  document.querySelectorAll('.quiz-question').forEach(question => {
    if (question.dataset.initialized) return;
    question.dataset.initialized = 'true';

    const correct = question.dataset.correct;
    const options = question.querySelectorAll('.q-option');
    const feedback = question.querySelector('.q-feedback');

    options.forEach(option => {
      option.addEventListener('click', () => {
        if (question.dataset.answered) return;
        question.dataset.answered = 'true';

        options.forEach(o => o.disabled = true);

        if (option.dataset.option === correct) {
          option.classList.add('correct');
          feedback.textContent = '✅ Правильно!';
        } else {
          option.classList.add('wrong');
          feedback.textContent = '❌ Неправильно.';
          question.querySelector(`[data-option="${correct}"]`).classList.add('correct');
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initQuiz);