# ESM Refactor Step 1: Tooling & Test Foundation

**Goal:** Establish Bun-based development environment. Keep existing build working in parallel.

**Prerequisite:** [esm-step0.md](./esm-step0.md) complete

**Branch:** `esm`

---

## 1. Install Bun

```bash
# macOS / Linux
curl -fsSL https://bun.sh/install | bash

# Verify installation
bun --version
```

---

## 2. Configuration Files

### bunfig.toml
```toml
[test]
coveragePathIgnorePatterns = ["modules/**", "test_legacy/**", "src/legacy/**"]

[install]
peer = false
```

### biome.json
```json
{
    "formatter": {
        "indentStyle": "tab",
        "lineWidth": 100
    },
    "javascript": {
        "formatter": {
            "quoteStyle": "single",
            "trailingCommas": "es5"
        }
    },
    "linter": {
        "enabled": true,
        "rules": {
            "correctness": { "recommended": true },
            "suspicious": { "recommended": true }
        }
    },
    "files": {
        "include": ["src/**/*.js"],
        "ignore": ["dist/**", "src/legacy/**", "test_legacy/**", "node_modules/**"]
    }
}
```

### package.json scripts (add to existing)
```json
{
    "scripts": {
        "build-legacy": "./build.sh",
        "test-legacy": "mocha ./test_legacy --reporter dot",
        "test-bun": "bun test --bail",
        "test-all": "yarn test-legacy && bun run test-bun",
        "format": "bun --bun ./node_modules/.bin/biome format --write",
        "check": "bun --bun ./node_modules/.bin/biome check"
    }
}
```

**Note:** We keep `build-legacy` and `test-legacy` working throughout the migration.

---

## 3. Test Directory Strategy

**Do NOT move existing tests yet.** They stay in `test/` and run via Mocha on the built dist.

Create a new directory for Bun tests that run on ESM source:

```bash
mkdir test
```

### Directory layout after Step 1:
```
test_legacy/    ← Existing Mocha tests (moved here)
test/           ← New Bun tests (on src/alasql.js ESM)
```

---

## 4. First Bun Test (Smoke Test)

Create a minimal test that imports the **current built dist** to verify Bun works:

```javascript
// test/smoke.test.js
import { describe, expect, test } from 'bun:test';

// Initially test against dist (the legacy build)
// Later we'll switch to src/alasql.js
import alasql from '../dist/alasql.fs.js';

describe('Smoke test', () => {
    test('SELECT literal', () => {
        const res = alasql('SELECT 1 as a');
        expect(res).toStrictEqual([{ a: 1 }]);
    });

    test('SELECT from array', () => {
        const data = [{ x: 1 }, { x: 2 }];
        const res = alasql('SELECT * FROM ?', [data]);
        expect(res).toStrictEqual(data);
    });
});
```

```bash
# Build first (need dist/)
./build.sh

# Run Bun tests
bun test test/
```

---

## 5. Verification Commands

```bash
# Legacy build still works
./build.sh

# Legacy tests still pass  
yarn test

# Bun smoke test passes
bun test test/

# Biome works
bun run check
```

---

## 6. Definition of Done for Step 1

- [ ] Bun installed (`bun --version` works)
- [ ] `bunfig.toml` created
- [ ] `biome.json` created  
- [ ] `test/` directory created with smoke test
- [ ] `./build.sh` still works
- [ ] `yarn test` still passes (existing Mocha tests)
- [ ] `bun test test/` passes
- [ ] `git tag esm-step1-complete` created

---

## Next: Step 2

Proceed to [esm-step2.md](./esm-step2.md) to isolate legacy code and create the ESM skeleton.
