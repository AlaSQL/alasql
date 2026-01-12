# ESM Refactor Step 4: Cleanup & Finalization

**Goal:** Delete `src/legacy/` directory, remove old build system, finalize ESM-only structure.

**Prerequisite:** All Step 3 extractions complete (3a, 3b, 3c, 3d, 3e)

**Branch:** `esm`

---

## 1. Pre-Cleanup Verification

Before deleting anything, verify the new ESM structure works completely:

```bash
# 1. All new ESM tests pass
bun test test/

# 2. ESM entry works directly
bun -e "import alasql from './src/alasql.js'; console.log(alasql('SELECT 1 as x'));"

# 3. Node ESM works
node --experimental-vm-modules -e "
import('./src/alasql.node.js').then(m => console.log(m.default('SELECT 1')));
"

# 4. .use() API works
bun -e "
import alasql from './src/alasql.js';
alasql.use({});
console.log('use() works:', typeof alasql.use);
"
```

**Do NOT proceed if any of these fail.**

---

## 2. Update ESM Entry to Be Self-Contained

The `src/alasql.js` should now import from extracted modules, NOT from `dist/`:

```javascript
// src/alasql.js - FINAL VERSION
import { parser } from './alasqlparser.js';
import { clone, hash, extend, escapeq } from './utils/index.js';
import { registerDatabase, registerTable, registerView } from './database/index.js';
import { registerAggregators } from './aggregators/index.js';
import { registerStandardFunctions } from './stdfn/index.js';
import { registerSelect, registerInsert, registerUpdate, registerDelete } from './statements/index.js';
import { registerCreateTable, registerDropTable } from './statements/index.js';

// Create the alasql function
const alasql = function(sql, params, cb) {
    return alasql.exec(sql, params, cb);
};

// Attach parser
alasql.yy = parser.yy;
alasql.parser = parser;

// Initialize structures
alasql.databases = {};
alasql.options = { /* defaults */ };
alasql.aggr = {};
alasql.stdfn = {};
alasql.from = {};
alasql.into = {};
alasql.external = {};

// Attach utils
alasql.utils = { clone, hash, extend, escapeq };

// .use() API
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

// Register all modules
registerDatabase(alasql);
registerTable(alasql);
registerView(alasql);
registerAggregators(alasql);
registerStandardFunctions(alasql);
registerSelect(alasql);
registerInsert(alasql);
registerUpdate(alasql);
registerDelete(alasql);
registerCreateTable(alasql);
registerDropTable(alasql);

// Create default database
alasql.exec('CREATE DATABASE alasql; USE alasql');

export default alasql;
```

---

## 3. Delete Legacy Directory

Once ESM entry is self-contained and tests pass:

```bash
# Verify nothing in src/ imports from legacy
grep -r "from.*legacy" src/
grep -r "require.*legacy" src/

# If clean, delete legacy
rm -rf src/legacy/

# Commit
git add -A
git commit -m "Remove src/legacy/ - fully migrated to ESM modules"
```

---

## 4. Delete Old Build System

```bash
# Delete concatenation build
rm -f build.sh

# Delete gulp (if present)
rm -f gulpfile.js
rm -rf gulp/

# Delete old linting configs (replaced by biome)
rm -f .jshintrc
rm -f .eslintrc*
rm -f .prettierrc
rm -f tslint.json

# Commit
git add -A
git commit -m "Remove legacy build system"
```

---

## 5. Migrate Tests

Move relevant tests from `test/` (Mocha) to `test/` (Bun):

```bash
# Option A: Convert tests to Bun format
# (Manual process - update imports, use bun:test)

# Option B: Keep both temporarily
# test/       → Legacy Mocha tests (deprecated)
# test/   → New Bun tests (primary)

# Eventually:
mv test test_mocha_deprecated
mv test test
```

---

## 6. Final Directory Structure

```
alasql/
├── src/
│   ├── alasql.js              (Main ESM entry)
│   ├── alasql.node.js         (Node entry with fs)
│   ├── alasqlparser.js        (Generated parser)
│   ├── alasqlparser.jison     (Grammar source)
│   │
│   ├── utils/
│   │   ├── index.js
│   │   ├── clone.js
│   │   ├── hash.js
│   │   └── ...
│   │
│   ├── database/
│   │   ├── index.js
│   │   ├── Database.js
│   │   ├── Table.js
│   │   └── View.js
│   │
│   ├── aggregators/
│   │   ├── index.js
│   │   ├── sum.js
│   │   ├── avg.js
│   │   └── ...
│   │
│   ├── stdfn/
│   │   ├── index.js
│   │   └── ...
│   │
│   ├── statements/
│   │   ├── index.js
│   │   ├── Select.js
│   │   ├── Insert.js
│   │   └── ...
│   │
│   └── plugins/
│       ├── xlsx.js
│       ├── csv.js
│       └── ...
│
├── test/                      (Bun tests)
├── dist/                      (Built for npm publish)
├── types/
│   └── alasql.d.ts
├── scripts/
│   └── build-dist.js
│
├── biome.json
├── bunfig.toml
└── package.json
```

---

## 7. Final package.json

```json
{
    "name": "alasql",
    "version": "5.0.0",
    "description": "JavaScript SQL database",
    "type": "module",
    "main": "./dist/alasql.cjs",
    "module": "./src/alasql.js",
    "browser": "./dist/alasql.min.js",
    "types": "./types/alasql.d.ts",
    "exports": {
        ".": {
            "bun": "./src/alasql.js",
            "import": "./src/alasql.js",
            "require": "./dist/alasql.cjs",
            "default": "./src/alasql.js"
        },
        "./node": "./src/alasql.node.js",
        "./aggregators": "./src/aggregators/index.js",
        "./plugins/xlsx": "./src/plugins/xlsx.js",
        "./plugins/csv": "./src/plugins/csv.js"
    },
    "files": ["src/", "dist/", "types/"],
    "scripts": {
        "test": "bun test",
        "build": "bun run scripts/build-dist.js",
        "format": "biome format --write src/",
        "check": "biome check src/",
        "prepublishOnly": "bun test && bun run build"
    }
}
```

---

## 8. Create Distribution Build Script

```javascript
// scripts/build-dist.js
const pkg = await Bun.file('./package.json').json();
const year = new Date().getFullYear();
const banner = `/*! AlaSQL v${pkg.version} | © 2014-${year} | MIT License */`;

// Browser minified
await Bun.build({
    entrypoints: ['./src/alasql.js'],
    outdir: './dist',
    naming: 'alasql.min.js',
    target: 'browser',
    minify: true,
});

// Node CommonJS (for require())
await Bun.build({
    entrypoints: ['./src/alasql.node.js'],
    outdir: './dist',
    naming: 'alasql.cjs',
    target: 'node',
    format: 'cjs',
    external: ['fs', 'path'],
});

console.log('Build complete:');
console.log('  dist/alasql.min.js - Browser (minified)');
console.log('  dist/alasql.cjs    - Node (CommonJS)');
```

---

## 9. Verification Checklist

```bash
# No legacy files
ls src/legacy 2>/dev/null && echo "FAIL: legacy still exists" || echo "OK"
ls build.sh 2>/dev/null && echo "FAIL: build.sh still exists" || echo "OK"

# Tests pass
bun test

# Direct import works  
bun -e "import a from './src/alasql.js'; console.log(a('SELECT 1+1 as x'));"

# Build works
bun run build
ls -la dist/

# npm pack looks right
npm pack --dry-run
```

---

## 10. Definition of Done for Step 4

- [ ] `src/alasql.js` imports from modules, not from dist
- [ ] `src/legacy/` deleted
- [ ] `build.sh` deleted
- [ ] Old lint configs deleted
- [ ] `bun test` passes (all tests)
- [ ] `bun run build` creates dist files
- [ ] `npm pack --dry-run` shows correct files
- [ ] `git tag esm-step4-complete` created

---

## Next: Step 5

Proceed to [esm-step5.md](./esm-step5.md) for release preparation.
