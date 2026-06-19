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
            <a href="${root}index.html#resources">Матеріали</a>
            <a href="${root}pidruchnyk.html">Підручник</a>
            <a href="#">Тести</a>
          </div>
        </nav>
      </header>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        Електронний кабінет хімії · 10 клас · 2026
      </footer>
    `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);