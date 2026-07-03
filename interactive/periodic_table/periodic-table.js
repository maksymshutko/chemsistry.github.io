/* =========================================================
   Компонент <periodic-table></periodic-table>

   Вимагає, щоб ELEMENTS_DATA (з elements-data.js) був
   завантажений РАНІШЕ цього файлу.

   Використання на сторінці:
     <periodic-table></periodic-table>

   Підключення в <head> (порядок важливий):
     <link rel="stylesheet" href="periodic-table.css">
     <script src="elements-data.js" defer></script>
     <script src="periodic-table.js" defer></script>
   ========================================================= */

const CATEGORY_LABELS = {
  alkali: "Лужні метали",
  alkaline: "Лужноземельні метали",
  transition: "Перехідні метали",
  "post-transition": "Постперехідні метали",
  metalloid: "Металоїди",
  nonmetal: "Неметали",
  halogen: "Галогени",
  noble: "Інертні гази",
  lanthanide: "Лантаноїди",
  actinide: "Актиноїди",
  unknown: "Не визначено",
};

class PeriodicTable extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="pt-wrap">
        <div class="pt-legend" id="pt-legend"></div>
        <div class="pt-layout">
          <div class="pt-tables">
            <div class="pt-grid-wrap">
              <div class="pt-period-labels" id="pt-period-labels"></div>
              <div class="pt-grid" id="pt-grid"></div>
            </div>
            <div class="pt-f-block-wrap">
              <div class="pt-f-block-labels" id="pt-f-block-labels"></div>
              <div class="pt-f-block" id="pt-f-block"></div>
            </div>
          </div>
          <div class="pt-detail" id="pt-detail">
            <div class="pt-detail-empty">Натисніть на елемент, щоб побачити детальну інформацію</div>
          </div>
        </div>
      </div>
    `;

    this.elementsByPosition = new Map();
    this.fBlockByPosition = new Map();

    (window.ELEMENTS_DATA || []).forEach(el => {
      if (el.row) {
        // lanthanide (row 1) or actinide (row 2) strip
        this.fBlockByPosition.set(`${el.row}-${el.number}`, el);
      } else {
        this.elementsByPosition.set(`${el.period}-${el.group}`, el);
      }
    });

    this.renderLegend();
    this.renderPeriodLabels();
    this.renderMainGrid();
    this.renderFBlock();
  }

  renderPeriodLabels() {
    const labels = this.querySelector('#pt-period-labels');
    let html = '';
    for (let period = 1; period <= 7; period++) {
      html += `<div class="pt-period-num">${period}</div>`;
    }
    labels.innerHTML = html;

    const fLabels = this.querySelector('#pt-f-block-labels');
    fLabels.innerHTML = `
      <div class="pt-period-num">6*</div>
      <div class="pt-period-num">7*</div>
    `;
  }

  renderLegend() {
    const legend = this.querySelector('#pt-legend');
    legend.innerHTML = Object.entries(CATEGORY_LABELS).map(([key, label]) => `
      <div class="pt-legend-item cat-${key}">
        <span>${label}</span>
      </div>
    `).join('');
  }

  renderMainGrid() {
    const grid = this.querySelector('#pt-grid');
    let html = '';

    for (let period = 1; period <= 7; period++) {
      for (let group = 1; group <= 18; group++) {
        const el = this.elementsByPosition.get(`${period}-${group}`);

        // Reserve the gap where lanthanides/actinides sit (period 6/7, group 3)
        const isFBlockGap = (period === 6 || period === 7) && group === 3;

        if (el) {
          html += this.cellHTML(el);
        } else if (isFBlockGap) {
          html += `<div class="pt-cell pt-empty" style="grid-column:${group}; grid-row:${period};"></div>`;
        } else {
          html += `<div class="pt-cell pt-empty" style="grid-column:${group}; grid-row:${period};" title="Період ${period}, група ${group} — додайте елемент у elements-data.js"></div>`;
        }
      }
    }
    grid.innerHTML = html;
    this.attachClickHandlers(grid);
  }

  renderFBlock() {
    const fBlock = this.querySelector('#pt-f-block');
    let html = '';

    // Row 1 = lanthanides (57-71), Row 2 = actinides (89-103)
    for (let row = 1; row <= 2; row++) {
      for (let i = 0; i < 15; i++) {
        const expectedNumber = row === 1 ? 57 + i : 89 + i;
        const el = [...this.fBlockByPosition.values()].find(
          e => e.row === row && e.number === expectedNumber
        );
        if (el) {
          html += this.cellHTML(el, row, i + 1);
        } else {
          html += `<div class="pt-cell pt-empty" style="grid-column:${i + 1}; grid-row:${row};" title="${row === 1 ? 'Лантаноїд' : 'Актиноїд'} №${expectedNumber} — додайте в elements-data.js"></div>`;
        }
      }
    }
    fBlock.innerHTML = html;
    this.attachClickHandlers(fBlock);
  }

  cellHTML(el, gridRow, gridCol) {
    const styleAttr = (gridRow && gridCol)
      ? `style="grid-column:${gridCol}; grid-row:${gridRow};"`
      : (el.group ? `style="grid-column:${el.group}; grid-row:${el.period};"` : '');
    return `
      <div class="pt-cell cat-${el.category}" data-number="${el.number}" ${styleAttr}>
        <span class="pt-num">${el.number}</span>
        <span class="pt-symbol">${el.symbol}</span>
        <span class="pt-mass">${el.mass}</span>
      </div>
    `;
  }

  attachClickHandlers(container) {
    container.querySelectorAll('.pt-cell:not(.pt-empty)').forEach(cell => {
      cell.addEventListener('click', () => {
        this.querySelectorAll('.pt-cell.selected').forEach(c => c.classList.remove('selected'));
        cell.classList.add('selected');
        const number = parseInt(cell.dataset.number);
        const el = (window.ELEMENTS_DATA || []).find(e => e.number === number);
        this.showDetail(el);
      });
    });
  }

  showDetail(el) {
    const detail = this.querySelector('#pt-detail');
    if (!el) {
      detail.innerHTML = `<div class="pt-detail-empty">Натисніть на елемент, щоб побачити детальну інформацію</div>`;
      return;
    }

    // Знаходимо сусідів по періоду (попередній/наступний елемент того ж рядка)
    const neighbors = this.findNeighbors(el);

    detail.innerHTML = `
      <div class="pt-detail-head">
        <div class="pt-detail-tile cat-${el.category}">
          <span class="num">${el.number}</span>
          <span class="symbol">${el.symbol}</span>
        </div>
        <div>
          <div class="pt-detail-name">${el.name}</div>
          <div class="pt-detail-category">${CATEGORY_LABELS[el.category] || el.category}</div>
        </div>
      </div>

      <div class="pt-detail-grid">
        <div class="pt-detail-stat">
          <div class="label">Атомна маса</div>
          <div class="value">${el.mass}</div>
        </div>
        <div class="pt-detail-stat">
          <div class="label">Період</div>
          <div class="value">${el.period}</div>
        </div>
        <div class="pt-detail-stat">
          <div class="label">Група</div>
          <div class="value">${el.group ?? '—'}</div>
        </div>
        <div class="pt-detail-stat">
          <div class="label">Категорія</div>
          <div class="value" style="font-size:0.82rem;">${CATEGORY_LABELS[el.category] || el.category}</div>
        </div>
      </div>

      <div class="pt-detail-divider"></div>

      <div class="pt-detail-stat" style="margin-bottom:16px;">
        <div class="label">Електронна конфігурація</div>
        <div class="value pt-detail-econfig">${el.electronConfig || '—'}</div>
      </div>

      ${this.electronShellHTML(el)}

      ${neighbors.length > 0 ? `
        <div class="pt-detail-divider"></div>
        <div class="pt-detail-stat" style="margin-bottom:10px;">
          <div class="label">Сусіди в періоді ${el.period}</div>
        </div>
        <div class="pt-neighbors">
          ${neighbors.map(n => `
            <button class="pt-neighbor-chip cat-${n.category}" data-number="${n.number}">
              <span class="n-num">${n.number}</span>
              <span class="n-symbol">${n.symbol}</span>
            </button>
          `).join('')}
        </div>
      ` : ''}
    `;

    // Клік на сусіда — показує його деталі (і підсвічує в таблиці)
    detail.querySelectorAll('.pt-neighbor-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const number = parseInt(chip.dataset.number);
        const neighborEl = (window.ELEMENTS_DATA || []).find(e => e.number === number);
        const cell = this.querySelector(`.pt-cell[data-number="${number}"]`);
        if (cell) {
          this.querySelectorAll('.pt-cell.selected').forEach(c => c.classList.remove('selected'));
          cell.classList.add('selected');
        }
        this.showDetail(neighborEl);
      });
    });
  }

  /**
   * Дуже наближена візуалізація електронних оболонок (K, L, M...) на основі
   * номера елемента — спрощена модель заповнення 2,8,8,18... для наочності,
   * не повна квантова модель.
   */
  electronShellHTML(el) {
    const shellCapacities = [2, 8, 8, 18, 18, 32, 32];
    let remaining = el.number;
    const shells = [];
    for (const cap of shellCapacities) {
      if (remaining <= 0) break;
      const electronsInShell = Math.min(cap, remaining);
      shells.push(electronsInShell);
      remaining -= electronsInShell;
    }

    if (shells.length === 0) return '';

    return `
      <div class="pt-detail-stat" style="margin-bottom:8px;">
        <div class="label">Електронні оболонки (спрощено)</div>
      </div>
      <div class="pt-shells">
        ${shells.map((count, i) => `
          <div class="pt-shell-ring" title="Оболонка ${i + 1}: ${count} е⁻">
            <span class="pt-shell-count">${count}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  findNeighbors(el) {
    if (!el.group) return []; // f-block elements: skip for simplicity
    const result = [];
    if (this.elementsByPosition.has(`${el.period}-${el.group - 1}`)) {
      result.push(this.elementsByPosition.get(`${el.period}-${el.group - 1}`));
    }
    if (this.elementsByPosition.has(`${el.period}-${el.group + 1}`)) {
      result.push(this.elementsByPosition.get(`${el.period}-${el.group + 1}`));
    }
    return result;
  }
}

customElements.define('periodic-table', PeriodicTable);
