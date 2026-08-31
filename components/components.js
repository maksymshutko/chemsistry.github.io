const GRADE_LABEL = { '10': '10 клас', '11': '11 клас' };

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const depth = parseInt(this.getAttribute('depth') || '0');
    const grade = this.getAttribute('grade');
    const root = '../'.repeat(depth);
    const gradeBase = grade ? `${root}${grade}-klas/` : '';
    const brand = grade ? `Кабінет хімії · ${GRADE_LABEL[grade]}` : 'Кабінет хімії';

    const gradeLinks = ['10', '11'].map(g =>
      `<a href="${root}${g}-klas/index.html"${g === grade ? ' class="active"' : ''}>${GRADE_LABEL[g]}</a>`
    ).join('\n            ');

    const gradeNavLinks = grade ? `
            <a href="${gradeBase}index.html#topics">Теми</a>
            <a href="${gradeBase}pidruchnyk.html">Підручник</a>
            <a href="${gradeBase}glossary.html">Глосарій</a>` : '';

    this.innerHTML = `
      <header>
        <nav>
          <a href="${root}index.html" class="logo">
            <div class="tile">H₂O</div>
            <span>${brand}</span>
          </a>
          <div class="navlinks">${gradeNavLinks}
            ${gradeLinks}
            <a href="${root}interactive/tests/tests.html">Тести</a>
          </div>
        </nav>
      </header>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const depth = parseInt(this.getAttribute('depth') || '0');
    const grade = this.getAttribute('grade');
    const root = '../'.repeat(depth);
    const gradeBase = grade ? `${root}${grade}-klas/` : '';
    const brand = grade ? `Кабінет хімії · ${GRADE_LABEL[grade]}` : 'Кабінет хімії';

    const gradeNavItems = grade ? `
                <li><a href="${gradeBase}index.html#topics">Теми курсу</a></li>
                <li><a href="${gradeBase}pidruchnyk.html">Підручник</a></li>
                <li><a href="${gradeBase}glossary.html">Глосарій</a></li>` : `
                <li><a href="${root}10-klas/index.html">10 клас</a></li>
                <li><a href="${root}11-klas/index.html">11 клас</a></li>`;

    this.innerHTML = `
      <footer>
        <div class="footer-inner">
          <div class="footer-grid">

            <div class="footer-col">
              <div class="footer-brand">
                <div class="tile">H₂O</div>
                <span>${brand}</span>
              </div>
              <p>Підручники, презентації, відео та конспекти з хімії для 10–11 класу.</p>
            </div>

            <div class="footer-col">
              <h4>Навігація</h4>
              <ul>
                <li><a href="${root}index.html">Головна</a></li>${gradeNavItems}
                <li><a href="${root}interactive/tests/tests.html">Тести</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Контакти</h4>
              <div class="footer-contact-item">
                ✉️ <span>maksimshutko5@gmail.com</span>
              </div>
              <div class="footer-contact-item">
                🏫 <span>Назва школи</span>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <span>© 2026 ${brand}</span>
            <span>Матеріали призначені для навчальних цілей</span>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
