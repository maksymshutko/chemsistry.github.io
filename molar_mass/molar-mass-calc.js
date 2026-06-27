/* =========================================================
   Калькулятор молярної маси.

   Парсить хімічну формулу (підтримує дужки та вкладені групи,
   напр. Ca(OH)2, Al2(SO4)3, (NH4)2SO4) і обчислює молярну масу
   на основі даних з elements-data.js.

   Вимагає, щоб ELEMENTS_DATA вже був завантажений (window.ELEMENTS_DATA).
   ========================================================= */

class FormulaParseError extends Error {}

function buildElementLookup() {
  const lookup = {};
  (window.ELEMENTS_DATA || []).forEach(el => {
    lookup[el.symbol] = el;
  });
  return lookup;
}

/**
 * Parses a chemical formula string into a flat map of { symbol: count }.
 * Supports nested parentheses/brackets with multipliers, e.g.:
 *   "Ca(OH)2"      -> { Ca: 1, O: 2, H: 2 }
 *   "Al2(SO4)3"    -> { Al: 2, S: 3, O: 12 }
 *   "(NH4)2SO4"    -> { N: 2, H: 8, S: 1, O: 4 }
 *   "CH3COOH"      -> { C: 2, H: 4, O: 2 }
 */
function parseFormula(formula) {
  const clean = formula.replace(/\s/g, '');
  if (!clean) {
    throw new FormulaParseError('Введіть формулу.');
  }

  let pos = 0;

  function peekChar() {
    return clean[pos];
  }

  function readNumber() {
    let numStr = '';
    while (pos < clean.length && /[0-9]/.test(clean[pos])) {
      numStr += clean[pos];
      pos++;
    }
    return numStr === '' ? 1 : parseInt(numStr, 10);
  }

  function readElementSymbol() {
    // Element symbols: one uppercase letter, optionally followed by lowercase letters
    if (!/[A-ZА-Я]/.test(clean[pos])) {
      throw new FormulaParseError(`Неочікуваний символ "${clean[pos]}" у позиції ${pos + 1}.`);
    }
    let symbol = clean[pos];
    pos++;
    while (pos < clean.length && /[a-zа-я]/.test(clean[pos])) {
      symbol += clean[pos];
      pos++;
    }
    return symbol;
  }

  // Parses a sequence of (element|group) tokens until end of string or a closing bracket
  function parseSequence() {
    const counts = {};

    while (pos < clean.length && clean[pos] !== ')' && clean[pos] !== ']') {
      let groupCounts;

      if (clean[pos] === '(' || clean[pos] === '[') {
        const closing = clean[pos] === '(' ? ')' : ']';
        pos++; // skip opening bracket
        groupCounts = parseSequence();
        if (clean[pos] !== closing) {
          throw new FormulaParseError(`Не знайдено закриваючу дужку "${closing}".`);
        }
        pos++; // skip closing bracket
        const multiplier = readNumber();
        for (const sym in groupCounts) {
          counts[sym] = (counts[sym] || 0) + groupCounts[sym] * multiplier;
        }
      } else {
        const symbol = readElementSymbol();
        const count = readNumber();
        counts[symbol] = (counts[symbol] || 0) + count;
      }
    }

    return counts;
  }

  const result = parseSequence();

  if (pos !== clean.length) {
    throw new FormulaParseError(`Неочікуваний символ у позиції ${pos + 1}: "${clean[pos]}".`);
  }
  if (Object.keys(result).length === 0) {
    throw new FormulaParseError('Формулу не вдалося розпізнати.');
  }

  return result;
}

/**
 * Calculates molar mass breakdown for a parsed formula.
 * Returns { totalMass, breakdown: [{symbol, name, count, atomicMass, contribution, percent}], unknownSymbols }
 */
function calculateMolarMass(counts) {
  const lookup = buildElementLookup();
  const breakdown = [];
  const unknownSymbols = [];
  let totalMass = 0;

  for (const symbol in counts) {
    const count = counts[symbol];
    const el = lookup[symbol];
    if (!el) {
      unknownSymbols.push(symbol);
      continue;
    }
    const contribution = el.mass * count;
    totalMass += contribution;
    breakdown.push({
      symbol,
      name: el.name,
      count,
      atomicMass: el.mass,
      contribution,
    });
  }

  breakdown.forEach(item => {
    item.percent = totalMass > 0 ? (item.contribution / totalMass) * 100 : 0;
  });

  // Sort by contribution descending (largest mass share first)
  breakdown.sort((a, b) => b.contribution - a.contribution);

  return { totalMass, breakdown, unknownSymbols };
}

/**
 * High-level helper: formula string -> full result, or throws FormulaParseError.
 */
function computeFormula(formulaStr) {
  const counts = parseFormula(formulaStr);
  return calculateMolarMass(counts);
}
