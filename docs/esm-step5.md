# ESM Refactor Step 5: Release Preparation

**Goal:** Prepare for npm release. Update documentation, TypeScript types, and create release.

**Prerequisite:** [esm-step4.md](./esm-step4.md) complete

**Branch:** `esm` → merge to `develop` → `main`

---

## 1. Version Strategy

This is a **major version bump** (breaking change):

- Old: `4.x.x` (CommonJS, concatenated build)
- New: `5.0.0` (ESM, modular, `.use()` API)

**Breaking changes:**
- XLSX/plugins now require explicit opt-in
- `require('alasql')` needs dist file or bundler
- Some internal APIs removed

---

## 2. Update TypeScript Types

Update `types/alasql.d.ts` for new API:

```typescript
// types/alasql.d.ts
declare module 'alasql' {
    interface AlaSQL {
        (sql: string, params?: any[], callback?: Function): any;
        
        // Core properties
        databases: { [name: string]: Database };
        options: Options;
        yy: any;
        parser: any;
        
        // Plugin registration
        use(...plugins: Array<Plugin | PluginConfig>): AlaSQL;
        
        // Core methods
        exec(sql: string, params?: any[], callback?: Function): any;
        parse(sql: string): any;
        compile(sql: string): CompiledQuery;
        
        // Extensibility points
        aggr: { [name: string]: AggregatorFunction };
        stdfn: { [name: string]: Function };
        from: { [name: string]: FromHandler };
        into: { [name: string]: IntoHandler };
        external: ExternalLibraries;
        
        // Classes
        Database: typeof Database;
        Table: typeof Table;
    }
    
    type Plugin = (alasql: AlaSQL) => void;
    
    interface PluginConfig {
        aggr?: { [name: string]: AggregatorFunction };
        stdfn?: { [name: string]: Function };
        from?: { [name: string]: FromHandler };
        into?: { [name: string]: IntoHandler };
        xlsx?: any;
        fs?: any;
    }
    
    interface ExternalLibraries {
        xlsx?: any;
        fs?: any;
    }
    
    interface Options {
        casesensitive: boolean;
        logtarget: string;
        logprompt: boolean;
        modifier: string;
        dateformat: string;
        autocommit: boolean;
    }
    
    interface Database {
        databaseid: string;
        tables: { [name: string]: Table };
        views: { [name: string]: any };
        exec(sql: string, params?: any[], callback?: Function): any;
    }
    
    interface Table {
        columns: Column[];
        data: any[];
        indices: { [name: string]: any };
    }
    
    interface Column {
        columnid: string;
        dbtypeid?: string;
        notnull?: boolean;
        primarykey?: boolean;
    }
    
    type AggregatorFunction = (value: any, accumulator: any, stage: 1 | 2 | 3) => any;
    type FromHandler = (source: string, opts: any, cb: Function, idx: number, query: any) => any;
    type IntoHandler = (target: string, opts: any, data: any[], columns: string[], cb: Function) => any;
    
    interface CompiledQuery {
        (params?: any[], callback?: Function): any;
    }
    
    const alasql: AlaSQL;
    export default alasql;
}

// Submodule exports
declare module 'alasql/aggregators' {
    import { AlaSQL } from 'alasql';
    export function sum(alasql: AlaSQL): void;
    export function avg(alasql: AlaSQL): void;
    export function count(alasql: AlaSQL): void;
    export function min(alasql: AlaSQL): void;
    export function max(alasql: AlaSQL): void;
    export function registerAggregators(alasql: AlaSQL): void;
}

declare module 'alasql/plugins/xlsx' {
    import { AlaSQL } from 'alasql';
    export function xlsx(alasql: AlaSQL): void;
}

declare module 'alasql/plugins/csv' {
    import { AlaSQL } from 'alasql';
    export function csv(alasql: AlaSQL): void;
}
```

---

## 3. Update README.md

```markdown
# AlaSQL

JavaScript SQL database for browser and Node.js.

## Installation

```bash
npm install alasql
```

## Basic Usage

```javascript
import alasql from 'alasql';

// Query arrays
const data = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 }
];

const result = alasql('SELECT * FROM ? WHERE age > 26', [data]);
// [{ name: 'Alice', age: 30 }]
```

## Using Plugins

Plugins like XLSX require explicit opt-in:

```javascript
import alasql from 'alasql';
import * as XLSX from 'xlsx';
import { xlsx } from 'alasql/plugins/xlsx';

// Provide the XLSX library
alasql.use({ xlsx: XLSX });

// Enable the plugin
alasql.use(xlsx);

// Now you can use XLSX
const data = alasql('SELECT * FROM XLSX("employees.xlsx")');
alasql('SELECT * INTO XLSX("output.xlsx") FROM ?', [data]);
```

## CommonJS / require()

For CommonJS environments, use the dist file:

```javascript
const alasql = require('alasql/dist/alasql.cjs');
```

## Migration from v4

See [MIGRATION.md](./MIGRATION.md) for details on breaking changes.
```

---

## 4. Create MIGRATION.md

```markdown
# Migration Guide: v4 → v5

## Breaking Changes

### 1. XLSX Plugin Now Requires Opt-In

**Before (v4):**
```javascript
const alasql = require('alasql');
alasql('SELECT * FROM XLSX("file.xlsx")'); // Just worked
```

**After (v5):**
```javascript
import alasql from 'alasql';
import * as XLSX from 'xlsx';
import { xlsx } from 'alasql/plugins/xlsx';

alasql.use({ xlsx: XLSX });
alasql.use(xlsx);

alasql('SELECT * FROM XLSX("file.xlsx")');
```

### 2. ESM by Default

The package is now ESM-first. For CommonJS:

```javascript
// Use the dist file
const alasql = require('alasql/dist/alasql.cjs');
```

### 3. Node.js File System

File operations in Node.js require the node entry:

```javascript
import alasql from 'alasql/node';
```

### 4. Removed Internal APIs

The following internal APIs have been removed or renamed:
- `alasql.utils.*` — Use exported utils from 'alasql/utils'
- `alasql.fn` — Renamed to `alasql.stdfn`

## New Features

### The `.use()` API

Register plugins and extensions:

```javascript
// Function plugin
alasql.use((a) => {
    a.stdfn.MYFUNC = (x) => x * 2;
});

// Object plugin
alasql.use({
    aggr: { MYSUM: (v, s, stage) => /* ... */ },
    stdfn: { MYFUNC: (x) => x * 2 }
});

// Chainable
alasql.use(plugin1).use(plugin2);
```

### Modular Imports

Import only what you need:

```javascript
import alasql from 'alasql';
import { sum, avg } from 'alasql/aggregators';

alasql.use(sum).use(avg);
```
```

---

## 5. Update CHANGELOG.md

```markdown
# Changelog

## [5.0.0] - 2024-XX-XX

### Breaking Changes
- **ESM First:** Package is now ESM by default. CommonJS users should use `alasql/dist/alasql.cjs`
- **XLSX Plugin:** Requires explicit opt-in via `.use()` API
- **IndexedDB Plugin:** Requires explicit opt-in
- **LocalStorage Plugin:** Requires explicit opt-in

### Added
- `.use()` API for plugin registration
- Modular imports: `alasql/aggregators`, `alasql/plugins/xlsx`
- TypeScript types for new API
- Bun test runner support

### Changed
- Source code restructured to ESM modules
- Build system changed from concatenation to Bun
- Linting moved from ESLint to Biome

### Removed
- `build.sh` concatenation build
- Gulp build system
- Old numbered source files (moved to modular structure)

### Migration
See [MIGRATION.md](./MIGRATION.md) for upgrade instructions.
```

---

## 6. Final Testing

```bash
# Run all tests
bun test

# Test in fresh environment
cd /tmp
mkdir test-alasql && cd test-alasql
npm init -y
npm install /path/to/alasql

# Test ESM
echo 'import alasql from "alasql"; console.log(alasql("SELECT 1+1"));' > test.mjs
node test.mjs

# Test CommonJS
echo 'const alasql = require("alasql/dist/alasql.cjs"); console.log(alasql("SELECT 1+1"));' > test.cjs
node test.cjs
```

---

## 7. Release Process

```bash
# 1. Ensure on feature branch
git checkout esm

# 2. Run all checks
bun test
bun run build
npm pack --dry-run

# 3. Merge to develop
git checkout develop
git merge esm
git push origin develop

# 4. Create release branch
git checkout -b release/5.0.0

# 5. Bump version
npm version major  # 4.x.x → 5.0.0

# 6. Build dist
bun run build

# 7. Commit
git add -A
git commit -m "Release 5.0.0"

# 8. Merge to main
git checkout main
git merge release/5.0.0
git tag v5.0.0
git push origin main --tags

# 9. Publish to npm
npm publish

# 10. Merge back to develop
git checkout develop
git merge main
git push origin develop
```

---

## 8. Post-Release

- [ ] Verify npm package works: `npm install alasql@5.0.0`
- [ ] Update GitHub releases page
- [ ] Announce on social media / Discord
- [ ] Monitor issues for migration problems
- [ ] Update documentation site (if any)

---

## 9. Definition of Done for Step 5

- [ ] TypeScript types updated for `.use()` API
- [ ] README.md updated with new examples
- [ ] MIGRATION.md created
- [ ] CHANGELOG.md updated
- [ ] Tests pass in fresh environment
- [ ] npm publish successful
- [ ] GitHub tag created
- [ ] Documentation updated

---

## Summary

The ESM refactor is complete! The codebase is now:

✅ **Pure ESM** — Modern JavaScript modules  
✅ **Modular** — Clean separation of concerns  
✅ **Plugin-based** — `.use()` API for extensions  
✅ **Testable** — Fast Bun test runner  
✅ **Maintainable** — No more concatenated build  
✅ **Tree-shakeable** — Import only what you need
