# Branch Analysis: feature/rollup (& mwulff/modular)

**Status:** Incomplete. 6 commits ahead of develop.  
**Base:** develop (v0.4.6 era)  
**Note:** `mwulff/modular` points to same commit as `feature/rollup`.

## Goal

Convert concatenated source files to ES modules using TypeScript + Rollup.

## What Was Done

1. **TypeScript entry point:** `src/main.ts`
2. **Build tools:**
   - Rollup config for UMD bundles (browser, node, minified)
   - esbuild alternative for fast builds
3. **Module structure created:**
   - `src/utils/` - split utilities into: `general.ts`, `enviroment.js`, `transformation.ts`, `sqlTools.ts`, `files.js`, `domTools.js`, `excelTools.js`
   - `src/dataStruct/` - `database.ts`, `query.ts`, `table.ts`
   - `src/grammar/` - SQL grammar pieces: `base.ts`, `statements.js`, `select.js`, `expression.js`, etc.
   - `src/logic/` - `aggr.ts`, `stdfn.ts`, `stdlib.ts`
   - `src/features/` - optional features (xlsx, indexeddb, websql, etc.)
4. **Dependency injection pattern:** Uses `mem` object passed to modules

## Architecture Pattern

```
main.ts imports:
├── options.ts
├── utils.ts (aggregates utils/*)
├── alasqlparser.js (jison output)
├── grammar.ts (aggregates grammar/*)
├── dataStruct.ts (aggregates dataStruct/*)
└── logic.ts (aggregates logic/*)
```

Each module exports a function that receives `mem` object and attaches functionality.

## Why Incomplete

- Mix of `.ts` and `.js` files
- Not all source files migrated
- Old numbered files still exist in `src/v0.4/`
- Tests not updated for new structure
