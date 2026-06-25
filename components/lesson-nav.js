class LessonNav extends HTMLElement {
  connectedCallback() {
    const temaId = this.getAttribute('tema');
    const lessonHref = this.getAttribute('lesson');

    const temaIndex = SITE_MAP.findIndex(t => t.id === temaId);
    const tema = SITE_MAP[temaIndex];

    if (!tema) {
      this.innerHTML = '<!-- lesson-nav: тему не знайдено -->';
      return;
    }

    const lessonIndex = tema.lessons.findIndex(l => l.href === lessonHref);

    let prevHref, prevLabel, prevTitle;
    let nextHref, nextLabel, nextTitle;

    if (lessonIndex > 0) {
      prevHref = tema.lessons[lessonIndex - 1].href;
      prevLabel = '← Попередній';
      prevTitle = tema.lessons[lessonIndex - 1].title;
    } else {
      prevHref = '../' + tema.href;
      prevLabel = '← Усі уроки';
      prevTitle = tema.title;
    }

    if (lessonIndex < tema.lessons.length - 1) {
      nextHref = tema.lessons[lessonIndex + 1].href;
      nextLabel = 'Наступний урок →';
      nextTitle = tema.lessons[lessonIndex + 1].title;
    } else {
      const nextTema = SITE_MAP[temaIndex + 1];
      if (nextTema) {
        nextHref = '../' + nextTema.href;
        nextLabel = 'Наступна тема →';
        nextTitle = nextTema.title;
      } else {
        nextHref = null;
      }
    }

    const prevBtn = `
      <a href="${prevHref}" class="nav-btn">
        <span class="dir">${prevLabel}</span>
        <span class="ttl">${prevTitle}</span>
      </a>`;

    const nextBtn = nextHref ? `
      <a href="${nextHref}" class="nav-btn next">
        <span class="dir">${nextLabel}</span>
        <span class="ttl">${nextTitle}</span>
      </a>` : '';

    this.innerHTML = `<div class="lesson-nav">${prevBtn}${nextBtn}</div>`;
  }
}

customElements.define('lesson-nav', LessonNav);