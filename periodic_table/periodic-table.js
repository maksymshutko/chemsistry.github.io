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
        <div class="pt-grid" id="pt-grid"></div>
        <div class="pt-f-block" id="pt-f-block"></div>
        <div class="pt-detail" id="pt-detail"></div>
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
    this.renderMainGrid();
    this.renderFBlock();
  }

  renderLegend() {
    const legend = this.querySelector('#pt-legend');
    legend.innerHTML = Object.entries(CATEGORY_LABELS).map(([key, label]) => `
      <div class="pt-legend-item">
        <span class="pt-legend-swatch cat-${key}"></span>
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
      detail.classList.remove('show');
      return;
    }

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
          <div class="label">Електронна конфігурація</div>
          <div class="value" style="font-family:'JetBrains Mono'; font-size:0.85rem;">${el.electronConfig || '—'}</div>
        </div>
      </div>
    `;
    detail.classList.add('show');
  }
}

customElements.define('periodic-table', PeriodicTable);
