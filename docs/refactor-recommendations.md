# AlaSQL Modernization Recommendations

## Summary of Previous Attempts

| Branch | Approach | Completeness | Reusable |
|--------|----------|--------------|----------|
| feature/rollup | TypeScript + Rollup modules | ~30% | Module structure design |
| mwulff/esm | File reorganization prep | ~5% | Nothing significant |
| bun/testdriver | Bun tooling (no source changes) | ~90% | Test infrastructure |

## Recommended Path Forward

### Phase 1: Adopt Bun Tooling (from bun/testdriver)

**Why:** Fast feedback loop is critical for large refactors.

**Actions:**
1. Merge `bun/testdriver` into develop
2. Keep: Bun test runner, Biome formatter, bun.lock
3. All tests must pass before proceeding

---

### Phase 2: Create Module Entry Points

**Why:** Gradual migration without breaking existing build.

**Actions:**
1. Create `src/index.js` as new entry point
2. Use esbuild (already in rollup branch) for bundling
3. Keep `build.sh` concatenation as fallback during migration

---

### Phase 3: Extract Modules (use rollup branch structure)

**Order matters. Extract in this sequence:**

1. **Utils first** - no dependencies on alasql internals
   ```
   src/utils/
   ├── environment.js  (browser/node detection)
   ├── general.js      (clone, extend, etc.)
   ├── sql.js          (escapeString, etc.)
   └── index.js        (re-exports)
   ```

2. **Data structures** - minimal dependencies
   ```
   src/data/
   ├── Database.js
   ├── Table.js
   ├── Query.js
   └── index.js
   ```

3. **Parser** - already isolated
   ```
   src/parser/
   ├── alasqlparser.jison
   ├── alasqlparser.js  (generated)
   └── index.js
   ```

4. **Statements** - depends on parser + data
   ```
   src/statements/
   ├── select.js
   ├── insert.js
   ├── update.js
   ├── delete.js
   └── ...
   ```

5. **Features** - optional, lazy-loaded
   ```
   src/features/
   ├── xlsx.js
   ├── indexeddb.js
   └── ...
   ```

---

### Phase 4: Remove Concatenation

**When:** All modules extracted and tests pass.

**Actions:**
1. Delete numbered source files (`src/10start.js`, etc.)
2. Remove `build.sh` concatenation logic
3. Use esbuild only

---

## File Naming Convention

- Use **lowercase with hyphens** for files: `sql-utils.js`
- Use **PascalCase** for classes: `Database.js`
- No numeric prefixes

---

## Module Pattern

Use **named exports** with barrel files:

```javascript
// src/utils/general.js
export function clone(obj) { ... }
export function extend(a, b) { ... }

// src/utils/index.js
export * from './general.js';
export * from './environment.js';

// src/index.js
import * as utils from './utils/index.js';
```

---

## Do NOT

- Use TypeScript (adds complexity, not needed)
- Change public API
- Refactor logic while restructuring
- Skip tests between phases

---

## Definition of Done

1. Single entry point: `src/index.js`
2. All code in ES modules with `import`/`export`
3. esbuild produces: `dist/alasql.js`, `dist/alasql.min.js`, `dist/alasql.fs.js`
4. All existing tests pass
5. No concatenation in build process
