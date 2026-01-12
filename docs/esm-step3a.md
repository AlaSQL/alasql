# ESM Refactor Step 3a: Extract Utils

**Goal:** Extract utility functions from `src/legacy/15utility.js` to `src/utils/`.

**Prerequisite:** [esm-step2.md](./esm-step2.md) complete

**Branch:** `esm`

---

## 1. Why Utils First?

Utils have **no dependencies** on other AlaSQL code. They're pure functions that can be extracted and tested in isolation.

---

## 2. Identify Functions to Extract

Review `src/legacy/15utility.js` for utility functions:

| Function | Purpose | Target File |
|----------|---------|-------------|
| `clone` | Deep clone objects | `src/utils/clone.js` |
| `hash` | Generate hash from object | `src/utils/hash.js` |
| `extend` | Extend object properties | `src/utils/extend.js` |
| `escapeq` | Escape quotes in strings | `src/utils/escapeq.js` |
| `cutbom` | Remove BOM from string | `src/utils/cutbom.js` |
| `loadFile` | Load file (sync/async) | `src/utils/loadFile.js` |

---

## 3. Extract Pattern

For each utility function:

### Step 1: Create ESM module
```javascript
// src/utils/clone.js
export function clone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    const temp = obj.constructor();
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp[key] = clone(obj[key]);
        }
    }
    return temp;
}
```

### Step 2: Create index file
```javascript
// src/utils/index.js
export { clone } from './clone.js';
export { hash } from './hash.js';
export { extend } from './extend.js';
export { escapeq } from './escapeq.js';
export { cutbom } from './cutbom.js';
```

### Step 3: Write test
```javascript
// test/utils/clone.test.js
import { describe, expect, test } from 'bun:test';
import { clone } from '../../src/utils/clone.js';

describe('clone', () => {
    test('clones object', () => {
        const obj = { a: 1, b: { c: 2 } };
        const cloned = clone(obj);
        expect(cloned).toStrictEqual(obj);
        expect(cloned).not.toBe(obj);
        expect(cloned.b).not.toBe(obj.b);
    });

    test('handles null', () => {
        expect(clone(null)).toBeNull();
    });

    test('handles primitives', () => {
        expect(clone(42)).toBe(42);
        expect(clone('hello')).toBe('hello');
    });

    test('clones arrays', () => {
        const arr = [1, 2, { x: 3 }];
        const cloned = clone(arr);
        expect(cloned).toStrictEqual(arr);
        expect(cloned).not.toBe(arr);
    });
});
```

### Step 4: Run test
```bash
bun test test/utils/clone.test.js
```

### Step 5: Commit
```bash
git add src/utils/clone.js test/utils/clone.test.js
git commit -m "Extract: clone to src/utils/clone.js"
```

---

## 4. Extraction Checklist

Work through each utility. Extract, test, commit.

- [ ] `clone` → `src/utils/clone.js`
- [ ] `hash` → `src/utils/hash.js`
- [ ] `extend` → `src/utils/extend.js`
- [ ] `escapeq` → `src/utils/escapeq.js`
- [ ] `cutbom` → `src/utils/cutbom.js`
- [ ] Create `src/utils/index.js` barrel export

---

## 5. Example: hash Function

```javascript
// src/utils/hash.js
export function hash(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    
    const type = typeof value;
    if (type === 'boolean' || type === 'number' || type === 'string') {
        return type.charAt(0) + ':' + value;
    }
    
    if (Array.isArray(value)) {
        return '[' + value.map(hash).join(',') + ']';
    }
    
    if (type === 'object') {
        const keys = Object.keys(value).sort();
        return '{' + keys.map(k => k + ':' + hash(value[k])).join(',') + '}';
    }
    
    return String(value);
}
```

```javascript
// test/utils/hash.test.js
import { describe, expect, test } from 'bun:test';
import { hash } from '../../src/utils/hash.js';

describe('hash', () => {
    test('hashes primitives', () => {
        expect(hash(42)).toBe('n:42');
        expect(hash('hello')).toBe('s:hello');
        expect(hash(true)).toBe('b:true');
    });

    test('hashes null/undefined', () => {
        expect(hash(null)).toBe('null');
        expect(hash(undefined)).toBe('undefined');
    });

    test('hashes arrays', () => {
        expect(hash([1, 2])).toBe('[n:1,n:2]');
    });

    test('hashes objects deterministically', () => {
        const obj1 = { b: 2, a: 1 };
        const obj2 = { a: 1, b: 2 };
        expect(hash(obj1)).toBe(hash(obj2));
    });
});
```

---

## 6. Wire Up to ESM Entry (Optional at This Stage)

At this point, the ESM entry (`src/alasql.js`) still wraps the legacy build. The extracted utils aren't wired in yet — that happens when we have enough modules to replace the legacy build entirely.

For now, just verify the modules work independently:

```bash
# Test individual utils
bun test test/utils/

# Legacy still works
./build.sh && yarn test
```

---

## 7. DO NOT Delete from Legacy Yet

The legacy files in `src/legacy/` are still used by `build.sh`. Do NOT remove code from them until Step 4 (Cleanup).

---

## 8. Definition of Done for Step 3a

- [ ] `src/utils/clone.js` extracted and tested
- [ ] `src/utils/hash.js` extracted and tested
- [ ] `src/utils/extend.js` extracted and tested
- [ ] `src/utils/escapeq.js` extracted and tested
- [ ] `src/utils/cutbom.js` extracted and tested
- [ ] `src/utils/index.js` barrel export created
- [ ] `bun test test/utils/` all pass
- [ ] `git tag esm-step3a-complete` created

---

## Next: Step 3b

Proceed to [esm-step3b.md](./esm-step3b.md) to extract Database and Table structures.
