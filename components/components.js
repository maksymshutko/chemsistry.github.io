class SiteHeader extends HTMLElement {
  connectedCallback() {
    const depth = parseInt(this.getAttribute('depth') || '0');
    const root = '../'.repeat(depth);

    this.innerHTML = `
      <header>
        <nav>
          <a href="${root}index.html" class="logo">
            <div class="tile">H₂O</div>
            <span>Кабінет хімії · 10 клас</span>
          </a>
          <div class="navlinks">
            <a href="${root}index.html#topics">Теми</a>
            <a href="${root}index.html#tools">Інструменти</a>
            <a href="${root}pidruchnyk.html">Підручник</a>
            <a href="${root}glossary.html">Глосарій</a>
            <a href="#">Тести</a>
          </div>
        </nav>
      </header>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const depth = parseInt(this.getAttribute('depth') || '0');
    const root = '../'.repeat(depth);

    this.innerHTML = `
      <footer>
        <div class="footer-inner">
          <div class="footer-grid">

            <div class="footer-col">
              <div class="footer-brand">
                <div class="tile">H₂O</div>
                <span>Кабінет хімії · 10 клас</span>
              </div>
              <p>Підручники, презентації, відео та конспекти для вивчення органічної хімії в 10 класі.</p>
            </div>

            <div class="footer-col">
              <h4>Навігація</h4>
              <ul>
                <li><a href="${root}index.html">Головна</a></li>
                <li><a href="${root}index.html#topics">Теми курсу</a></li>
                <li><a href="${root}index.html#tools">Інструменти</a></li>
                <li><a href="${root}pidruchnyk.html">Підручник</a></li>
                <li><a href="${root}glossary.html">Глосарій</a></li>
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
            <span>© 2026 Кабінет хімії · 10 клас</span>
            <span>Матеріали призначені для навчальних цілей</span>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);