# ESM Refactor Step 0: Prerequisites & Safety Nets

**Goal:** Verify the codebase state before refactoring begins.

**Branch:** `esm` (already created from `develop`)

---

## 1. Verify Current State

Before starting, ensure the existing build works:

```bash
# Install dependencies
yarn install

# Build current version
./build.sh

# Run existing tests
yarn test

# Verify dist output
ls -la dist/alasql.js dist/alasql.min.js
node -e "const a = require('./dist/alasql.js'); console.log(a('SELECT 1'));"
```

**Do not proceed if any of these fail.**

---

## 2. Document Current Dependencies

### Critical Files to Understand

| File | Purpose | Dependencies |
|------|---------|--------------|
| `src/05copyright.js` | License header | None |
| `src/10start.js` | IIFE wrapper start | None |
| `src/15utility.js` | Utils (clone, hash, etc.) | None |
| `src/17alasql.js` | Core engine object | Utils |
| `src/20database.js` | Database class | Engine |
| `src/38query.js` | Query compilation | Database, Parser |
| `src/40select.js` | SELECT statement | Query |
| `src/55functions.js` | Aggregators (SUM, AVG) | Engine |
| `src/alasqlparser.jison` | Grammar source | None |
| `src/alasqlparser.js` | Generated parser | None |

### Parser Check

The parser is pre-generated. Verify it works standalone:

```bash
# Check parser exists
ls -la src/alasqlparser.js

# If regeneration needed (rarely):
npx jison src/alasqlparser.jison -o src/alasqlparser.js
```

---

## 3. Identify Circular Dependencies

The current codebase has globals that create implicit dependencies:

```javascript
// These are attached to `alasql` and accessed everywhere:
alasql.databases    // Database instances
alasql.options      // Runtime config
alasql.aggr         // Aggregators
alasql.stdfn        // Standard functions
alasql.from         // FROM handlers
alasql.into         // INTO handlers
yy                  // Parser AST classes (attached to parser)
```

**Strategy:** The new ESM entry point will create the `alasql` object first, then pass it to modules that need to attach to it.

---

## 4. Reference Material

### feature/rollup Branch Pattern

The `feature/rollup` branch shows a prior attempt:

```
src/
├── v0.4/           ← Old numbered files moved here
├── main.ts         ← New entry point
├── utils.ts        ← Extracted utils
├── grammar.ts      ← Parser wrapper
└── features/       ← Modular features
```

We'll use a similar pattern with `src/legacy/`.

### Key Insight from feature/rollup

It uses a `mem` object to share state:

```javascript
const mem = { grammar, alasql };
addOptions(mem);
addDataStruct(mem);
addlogic(mem);
```

Our `.use()` pattern is similar but cleaner — modules receive `alasql` directly.

---

## 5. Risk Mitigation

### Checkpoint Tags

Create git tags at stable points:

```bash
git tag esm-step0-complete
git tag esm-step1-complete
# etc.
```

### Rollback Plan

If things break badly:

```bash
# Return to last working state
git checkout esm-step1-complete

# Or reset to a known good state
git reset --hard esm-step1-complete
```

### Parallel Verification

During transition, both must pass:
- `bun test` — New Bun tests on ESM source
- `yarn test` — Old Mocha tests on built dist (until fully migrated)

---

## 6. Definition of Done for Step 0

- [ ] Current `./build.sh` works
- [ ] Current `yarn test` passes
- [ ] Reviewed `feature/rollup` branch for patterns
- [ ] Understand which files depend on which
- [ ] `git tag esm-step0-complete` created

---

## Next: Step 1

Once Step 0 is complete, proceed to [esm-step1.md](./esm-step1.md) to set up Bun tooling.
