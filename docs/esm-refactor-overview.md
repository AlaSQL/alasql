# ESM Refactor: Overview

This document provides an overview of the ESM migration plan for AlaSQL.

---

## Goals

1. **Modernize** — Move from concatenated IIFE to ESM modules
2. **Modularize** — Clean separation of concerns
3. **Plugin API** — `.use()` for opt-in functionality
4. **Testability** — Fast Bun-based test runner
5. **Maintainability** — No more numbered file concatenation

---

## Step Summary

| Step | Focus | Key Deliverable |
|------|-------|-----------------|
| [Step 0](./esm-step0.md) | Prerequisites | Branch strategy, verify current build |
| [Step 1](./esm-step1.md) | Tooling | Bun, Biome, test infrastructure |
| [Step 2](./esm-step2.md) | Isolation | Move to `src/legacy/`, create ESM skeleton |
| [Step 3a](./esm-step3a.md) | Extract Utils | `src/utils/*.js` |
| [Step 3b](./esm-step3b.md) | Extract Database | `src/database/*.js` |
| [Step 3c](./esm-step3c.md) | Extract Aggregators | `src/aggregators/*.js` |
| [Step 3d](./esm-step3d.md) | Extract Statements | `src/statements/*.js` |
| [Step 3e](./esm-step3e.md) | Extract Plugins | `src/plugins/*.js` |
| [Step 4](./esm-step4.md) | Cleanup | Delete legacy, finalize structure |
| [Step 5](./esm-step5.md) | Release | Types, docs, npm publish |

---

## Migration Strategy

```
┌─────────────────────────────────────────────────────────────┐
│  Step 0-1: Setup tooling, keep legacy build working         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Step 2: Move numbered files to src/legacy/                 │
│          Create ESM entry that wraps legacy dist            │
│          Both builds work in parallel                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Step 3a-3e: Extract modules one by one                     │
│              src/legacy/ shrinks                            │
│              src/{utils,database,aggregators,...}/ grows    │
│              Tests added for each extraction                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Step 4: ESM entry imports from modules (not dist)          │
│          Delete src/legacy/                                 │
│          Delete build.sh                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Step 5: Update types, docs, release v5.0.0                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Principles

### 1. Parallel Operation
The legacy build (`build.sh`) continues working until Step 4. This provides a safety net.

### 2. Incremental Extraction
Extract one module at a time. Test. Commit. Repeat.

### 3. Test-Driven
Each extraction includes tests. Both legacy and new tests must pass.

### 4. No Big Bang
No step requires rewriting everything at once. Each step is independently completable.

---

## Time Estimates

| Step | Effort | Notes |
|------|--------|-------|
| Step 0 | 1 hour | Setup |
| Step 1 | 2 hours | Tooling |
| Step 2 | 2-3 hours | Isolation + skeleton |
| Step 3a | 2-3 hours | Utils (simple) |
| Step 3b | 4-6 hours | Database (medium) |
| Step 3c | 4-6 hours | Aggregators (medium) |
| Step 3d | 8-16 hours | Statements (complex) |
| Step 3e | 4-6 hours | Plugins (medium) |
| Step 4 | 2-3 hours | Cleanup |
| Step 5 | 2-3 hours | Release |

**Total estimate:** 30-50 hours over multiple sessions

---

## Reference Documents

- [esm-architecture.md](./esm-architecture.md) — How AlaSQL works internally
- `feature/rollup` branch — Previous modularization attempt (reference)

---

## Checkpoints

Use git tags to mark stable points:

```bash
git tag esm-step0-complete
git tag esm-step1-complete
git tag esm-step2-complete
git tag esm-step3a-complete
git tag esm-step3b-complete
git tag esm-step3c-complete
git tag esm-step3d-complete
git tag esm-step3e-complete
git tag esm-step4-complete
git tag v5.0.0
```

---

## Getting Started

```bash
# 1. Read Step 0 first
cat docs/esm-step0.md

# 2. Create feature branch
git checkout -b esm

# 3. Follow steps in order
# Each step has a "Definition of Done" checklist

---

## Master Checklist

### [Step 0: Prerequisites](./esm-step0.md)
- [x] Current `./build.sh` works
- [x] Current `yarn test` passes
- [x] Reviewed `feature/rollup` branch for patterns
- [x] Understand which files depend on which
- [x] `git tag esm-step0-complete` created

### [Step 1: Tooling](./esm-step1.md)
- [x] Bun installed (`bun --version` works)
- [x] `bunfig.toml` created
- [x] `biome.json` created
- [x] `test/` directory created with smoke test
- [x] `./build.sh` still works
- [x] `yarn test` still passes (existing Mocha tests)
- [x] `bun test test/` passes
- [x] `git tag esm-step1-complete` created

### [Step 2: Isolation](./esm-step2.md)
- [x] `src/legacy/` contains all numbered files
- [x] `build.sh` renamed to `build.sh.disabled`
- [x] `src/alasql.js` ESM entry created (skeleton)
- [x] `.use()` API implemented
- [x] Empty target directories created (`src/utils/`, etc.)
- [x] `bun test test/esm-entry.test.js` passes
- [x] `git tag esm-step2-complete` created

### [Step 3a: Extract Utils](./esm-step3a.md)
- [x] `src/utils/clone.js` extracted and tested
- [x] `src/utils/hash.js` extracted and tested
- [x] `src/utils/extend.js` extracted and tested
- [x] `src/utils/escapeq.js` extracted and tested
- [x] `src/utils/cutbom.js` extracted and tested
- [x] `src/utils/index.js` barrel export created
- [x] `bun test test/utils/` all pass
- [x] `git tag esm-step3a-complete` created

### [Step 3b: Extract Database](./esm-step3b.md)
- [x] `src/database/Database.js` created with `registerDatabase`
- [x] `src/database/Table.js` created with `registerTable`
- [x] `src/database/View.js` created with `registerView`
- [x] `src/database/index.js` barrel export
- [x] Unit tests for each class
- [x] Integration test passes
- [x] `git tag esm-step3b-complete` created

### [Step 3c: Extract Aggregators](./esm-step3c.md)
- [x] All aggregators extracted to `src/aggregators/`
- [x] `src/aggregators/index.js` with `registerAggregators()`
- [x] Aggregator tests pass
- [x] Standard functions extracted to `src/stdfn/` (optional)
- [x] `git tag esm-step3c-complete` created

### [Step 3d: Extract Statements](./esm-step3d.md)
- [x] Query class extracted
- [x] SELECT statement extracted and tested
- [x] INSERT statement extracted and tested
- [x] UPDATE statement extracted and tested
- [x] DELETE statement extracted and tested
- [x] CREATE/DROP TABLE extracted and tested
- [ ] All statement tests pass
- [ ] `git tag esm-step3d-complete` created

### [Step 3e: Extract Plugins](./esm-step3e.md)
- [ ] All plugins extracted to `src/plugins/`
- [ ] Each plugin uses dependency injection pattern
- [ ] Plugin tests pass (with mocks where needed)
- [ ] `git tag esm-step3e-complete` created

### [Step 4: Cleanup](./esm-step4.md)
- [ ] `src/alasql.js` imports from modules, not from dist
- [ ] `src/legacy/` deleted
- [ ] `build.sh` deleted
- [ ] Old lint configs deleted
- [ ] `bun test` passes (all tests)
- [ ] `bun run build` creates dist files
- [ ] `npm pack --dry-run` shows correct files
- [ ] `git tag esm-step4-complete` created

### [Step 5: Release](./esm-step5.md)
- [ ] TypeScript types updated for `.use()` API
- [ ] README.md updated with new examples
- [ ] MIGRATION.md created
- [ ] CHANGELOG.md updated
- [ ] Tests pass in fresh environment
- [ ] npm publish successful
- [ ] GitHub tag created
- [ ] Documentation updated
```
