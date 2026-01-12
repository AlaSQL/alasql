# ESM Refactor Step 2: Legacy Isolation & ESM Skeleton

**Goal:** Move numbered files to `src/legacy/`, create ESM entry point, disable old build.

**Prerequisite:** [esm-step1.md](./esm-step1.md) complete

**Branch:** `esm`

---

## 1. The Strategy

1. **Move** numbered files (`05copyright.js`, `10start.js`, etc.) to `src/legacy/`
2. **Create** new ESM entry point (`src/alasql.js`)
3. **Disable** old `build.sh` — we commit to ESM, no parallel builds
4. **Extract** functionality piece by piece (Steps 3a-3e)

This follows the `feature/rollup` pattern where old code went to `src/v0.4/`.

---

## 2. Move Numbered Files to Legacy

```bash
# Create legacy directory
mkdir -p src/legacy

# Move all numbered files
mv src/[0-9][0-9]*.js src/legacy/

# Keep parser in place (it's already modular)
mv src/legacy/alasqlparser.js src/
# Or if it was moved:
# mv src/legacy/*parser*.js src/

# Keep the jison source
mv src/legacy/alasqlparser.jison src/ 2>/dev/null || true
```

### Directory after move:
```
src/
├── alasqlparser.jison      (Grammar source)
├── alasqlparser.js         (Generated parser)
├── legacy/
│   ├── 05copyright.js
│   ├── 10start.js
│   ├── 15utility.js
│   ├── 17alasql.js
│   ├── 20database.js
│   ├── ...
│   └── 99finish.js
```

---

## 3. Disable Old Build

Rename `build.sh` so it's not accidentally used:

```bash
mv build.sh build.sh.disabled
```

We're committing to ESM — no parallel builds.

---

## 4. Create ESM Entry Point

Create the new entry point that will grow as we extract modules:

```javascript
// src/alasql.js
// ESM entry point
// Initially minimal, grows as we extract from legacy/

// Import parser (already modular)
import { parser } from './alasqlparser.js';

// Create the alasql function
const alasql = function(sql, params, cb) {
    return alasql.exec(sql, params, cb);
};

// Attach parser
alasql.yy = parser.yy;
alasql.parser = parser;

// Initialize core structures
alasql.databases = {};
alasql.options = {};
alasql.aggr = {};
alasql.stdfn = {};
alasql.from = {};
alasql.into = {};
alasql.external = {};

// .use() API for plugins
alasql.use = function(...plugins) {
    for (const plugin of plugins) {
        if (typeof plugin === 'function') {
            plugin(alasql);
        } else if (typeof plugin === 'object') {
            if (plugin.aggr) Object.assign(alasql.aggr, plugin.aggr);
            if (plugin.stdfn) Object.assign(alasql.stdfn, plugin.stdfn);
            if (plugin.from) Object.assign(alasql.from, plugin.from);
            if (plugin.into) Object.assign(alasql.into, plugin.into);
            if (plugin.xlsx) alasql.external.xlsx = plugin.xlsx;
            if (plugin.fs) alasql.external.fs = plugin.fs;
        }
    }
    return alasql;
};

// TODO: exec, parse, compile will be added as we extract
alasql.exec = function(sql, params, cb) {
    // Placeholder - implement in Step 3
    throw new Error('Not yet implemented - extract from legacy/');
};

export default alasql;
```

**Note:** This entry point won't work yet! That's okay — we'll make it functional as we extract modules in Step 3.

---

## 5. Create Target Directory Structure

Prepare the folders where extracted modules will go:

```bash
mkdir -p src/utils
mkdir -p src/database  
mkdir -p src/query
mkdir -p src/statements
mkdir -p src/expressions
mkdir -p src/aggregators
mkdir -p src/plugins
```

### Target structure (will be populated in Step 3):
```
src/
├── alasql.js              (ESM entry - grows as we extract)
├── alasql.node.js         (Node entry with fs)
├── alasqlparser.js        (Parser - stays here)
│
├── legacy/                (Shrinks as we extract)
│   ├── 05copyright.js
│   ├── ...
│   └── 99finish.js
│
├── utils/                 (Empty - populated in Step 3a)
├── database/              (Empty - populated in Step 3b)
├── query/                 (Empty - populated in Step 3b)
├── statements/            (Empty - populated in Step 3d)
├── expressions/           (Empty - populated in Step 3c)
├── aggregators/           (Empty - populated in Step 3c)
└── plugins/               (Empty - populated in Step 3e)
```

---

## 6. Update package.json

```json
{
    "name": "alasql",
    "type": "module",
    "main": "./src/alasql.js",
    "exports": {
        ".": "./src/alasql.js",
        "./aggregators": "./src/aggregators/index.js",
        "./plugins/*": "./src/plugins/*.js"
    },
    "scripts": {
        "test": "bun test",
        "test-legacy": "mocha test_legacy/ --reporter dot",
        "format": "biome format --write src/",
        "check": "biome check src/"
    }
}
```

---

## 7. Initial Tests

Test the skeleton structure (not full functionality yet):

```javascript
// test/esm-entry.test.js
import { describe, expect, test } from 'bun:test';
import alasql from '../src/alasql.js';

describe('ESM Entry (skeleton)', () => {
    test('alasql is a function', () => {
        expect(typeof alasql).toBe('function');
    });

    test('.use() exists and is chainable', () => {
        const result = alasql.use({});
        expect(result).toBe(alasql);
    });

    test('.use() accepts function plugin', () => {
        const plugin = (a) => { a.testFlag = true; };
        alasql.use(plugin);
        expect(alasql.testFlag).toBe(true);
    });

    test('parser is attached', () => {
        expect(alasql.parser).toBeDefined();
        expect(alasql.yy).toBeDefined();
    });
});
```

---

## 8. Verification

```bash
# ESM skeleton tests pass
bun test test/esm-entry.test.js

# Biome checks pass
bun run check
```

---

## 9. Definition of Done for Step 2

- [ ] `src/legacy/` contains all numbered files
- [ ] `build.sh` renamed to `build.sh.disabled`
- [ ] `src/alasql.js` ESM entry created (skeleton)
- [ ] `.use()` API implemented
- [ ] Empty target directories created (`src/utils/`, etc.)
- [ ] `bun test test/esm-entry.test.js` passes
- [ ] `git tag esm-step2-complete` created

---

## Architecture Reference

See [esm-architecture.md](./esm-architecture.md) for:
- How AlaSQL's code generation works
- The `.use()` plugin pattern details
- Final target module structure

---

## Next: Step 3a

Proceed to [esm-step3a.md](./esm-step3a.md) to extract utility functions.
