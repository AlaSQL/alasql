# ESM Refactor Step 3c: Extract Expressions & Aggregators

**Goal:** Extract expression classes and aggregator functions.

**Prerequisite:** [esm-step3b.md](./esm-step3b.md) complete

**Branch:** `esm`

---

## 1. Why Together?

Expressions and aggregators are both:
- Used during query compilation
- Relatively self-contained
- Don't depend on statements (but statements depend on them)

---

## 2. Aggregators Source

From `src/legacy/55functions.js`:

| Aggregator | Description | Target |
|------------|-------------|--------|
| `SUM` | Sum of values | `src/aggregators/sum.js` |
| `AVG` | Average | `src/aggregators/avg.js` |
| `COUNT` | Count rows | `src/aggregators/count.js` |
| `MIN` | Minimum value | `src/aggregators/min.js` |
| `MAX` | Maximum value | `src/aggregators/max.js` |
| `FIRST` | First value | `src/aggregators/first.js` |
| `LAST` | Last value | `src/aggregators/last.js` |
| `ARRAY` | Collect to array | `src/aggregators/array.js` |

---

## 3. Aggregator Pattern

Aggregators use a 3-stage pattern:
- **Stage 1:** Initialize accumulator
- **Stage 2:** Accumulate value
- **Stage 3:** Finalize (return result)

### Extract SUM
```javascript
// src/aggregators/sum.js
export function sum(alasql) {
    alasql.aggr.SUM = function(value, accumulator, stage) {
        if (stage === 1) {
            // Initialize
            return value;
        }
        if (stage === 2) {
            // Accumulate
            return (accumulator || 0) + (value || 0);
        }
        // Finalize
        return accumulator;
    };
}
```

### Extract AVG
```javascript
// src/aggregators/avg.js
export function avg(alasql) {
    alasql.aggr.AVG = function(value, accumulator, stage) {
        if (stage === 1) {
            return { sum: value, count: 1 };
        }
        if (stage === 2) {
            return {
                sum: accumulator.sum + (value || 0),
                count: accumulator.count + 1
            };
        }
        return accumulator.count ? accumulator.sum / accumulator.count : null;
    };
}
```

### Extract COUNT
```javascript
// src/aggregators/count.js
export function count(alasql) {
    alasql.aggr.COUNT = function(value, accumulator, stage) {
        if (stage === 1) {
            return value !== null && value !== undefined ? 1 : 0;
        }
        if (stage === 2) {
            return accumulator + (value !== null && value !== undefined ? 1 : 0);
        }
        return accumulator;
    };
}
```

---

## 4. Aggregator Tests

```javascript
// test/aggregators/sum.test.js
import { describe, expect, test, beforeEach } from 'bun:test';
import alasql from '../../src/alasql.js';

describe('SUM aggregator', () => {
    test('sums numbers', () => {
        const data = [{ x: 1 }, { x: 2 }, { x: 3 }];
        const res = alasql('SELECT SUM(x) as total FROM ?', [data]);
        expect(res).toStrictEqual([{ total: 6 }]);
    });

    test('handles NULL values', () => {
        const data = [{ x: 1 }, { x: null }, { x: 3 }];
        const res = alasql('SELECT SUM(x) as total FROM ?', [data]);
        expect(res).toStrictEqual([{ total: 4 }]);
    });

    test('returns NULL for empty set', () => {
        const res = alasql('SELECT SUM(x) as total FROM ?', [[]]);
        expect(res[0].total).toBeNull();
    });

    test('works with GROUP BY', () => {
        const data = [
            { dept: 'A', salary: 100 },
            { dept: 'A', salary: 200 },
            { dept: 'B', salary: 150 }
        ];
        const res = alasql('SELECT dept, SUM(salary) as total FROM ? GROUP BY dept ORDER BY dept', [data]);
        expect(res).toStrictEqual([
            { dept: 'A', total: 300 },
            { dept: 'B', total: 150 }
        ]);
    });
});
```

```javascript
// test/aggregators/avg.test.js
import { describe, expect, test } from 'bun:test';
import alasql from '../../src/alasql.js';

describe('AVG aggregator', () => {
    test('calculates average', () => {
        const data = [{ x: 1 }, { x: 2 }, { x: 3 }];
        const res = alasql('SELECT AVG(x) as avg FROM ?', [data]);
        expect(res).toStrictEqual([{ avg: 2 }]);
    });

    test('handles decimals', () => {
        const data = [{ x: 1 }, { x: 2 }];
        const res = alasql('SELECT AVG(x) as avg FROM ?', [data]);
        expect(res).toStrictEqual([{ avg: 1.5 }]);
    });
});
```

---

## 5. Barrel Export for Aggregators

```javascript
// src/aggregators/index.js
export { sum } from './sum.js';
export { avg } from './avg.js';
export { count } from './count.js';
export { min } from './min.js';
export { max } from './max.js';
export { first } from './first.js';
export { last } from './last.js';
export { array } from './array.js';

// Register all standard aggregators
export function registerAggregators(alasql) {
    sum(alasql);
    avg(alasql);
    count(alasql);
    min(alasql);
    max(alasql);
    first(alasql);
    last(alasql);
    array(alasql);
}
```

---

## 6. Standard Functions (stdfn)

Also in `src/legacy/55functions.js`:

| Function | SQL | Target |
|----------|-----|--------|
| `UPPER` | `UPPER(str)` | `src/stdfn/upper.js` |
| `LOWER` | `LOWER(str)` | `src/stdfn/lower.js` |
| `ABS` | `ABS(num)` | `src/stdfn/abs.js` |
| `ROUND` | `ROUND(num)` | `src/stdfn/round.js` |
| `COALESCE` | `COALESCE(a,b)` | `src/stdfn/coalesce.js` |

```javascript
// src/stdfn/upper.js
export function upper(alasql) {
    alasql.stdfn.UPPER = function(s) {
        return s === null ? null : String(s).toUpperCase();
    };
}

// src/stdfn/index.js
export { upper } from './upper.js';
export { lower } from './lower.js';
// ... etc

export function registerStandardFunctions(alasql) {
    upper(alasql);
    lower(alasql);
    // ... etc
}
```

---

## 7. Expressions (Advanced)

Expression classes are in the parser AST (`yy`). These are trickier because they're used in code generation.

**Defer full extraction** until statements are done. For now, note the key classes:

| Class | Purpose | Location |
|-------|---------|----------|
| `yy.Column` | Column reference | `src/legacy/18sqlexpr.js` |
| `yy.Literal` | Literal value | `src/legacy/18sqlexpr.js` |
| `yy.Op` | Binary operation | `src/legacy/18sqlexpr.js` |
| `yy.FuncValue` | Function call | `src/legacy/18sqlexpr.js` |
| `yy.AggrValue` | Aggregation | `src/legacy/18sqlexpr.js` |

---

## 8. Extraction Checklist

### Aggregators
- [ ] `src/aggregators/sum.js`
- [ ] `src/aggregators/avg.js`
- [ ] `src/aggregators/count.js`
- [ ] `src/aggregators/min.js`
- [ ] `src/aggregators/max.js`
- [ ] `src/aggregators/first.js`
- [ ] `src/aggregators/last.js`
- [ ] `src/aggregators/array.js`
- [ ] `src/aggregators/index.js` barrel

### Standard Functions (if time)
- [ ] `src/stdfn/upper.js`
- [ ] `src/stdfn/lower.js`
- [ ] `src/stdfn/abs.js`
- [ ] `src/stdfn/round.js`
- [ ] `src/stdfn/index.js` barrel

---

## 9. Definition of Done for Step 3c

- [ ] All aggregators extracted to `src/aggregators/`
- [ ] `src/aggregators/index.js` with `registerAggregators()`
- [ ] Aggregator tests pass
- [ ] Standard functions extracted to `src/stdfn/` (optional)
- [ ] `git tag esm-step3c-complete` created

---

## Next: Step 3d

Proceed to [esm-step3d.md](./esm-step3d.md) to extract statements (SELECT, INSERT, etc.).
