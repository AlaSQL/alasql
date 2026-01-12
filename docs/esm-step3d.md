# ESM Refactor Step 3d: Extract Statements

**Goal:** Extract SQL statement handlers (SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, etc.).

**Prerequisite:** [esm-step3c.md](./esm-step3c.md) complete

**Branch:** `esm`

---

## 1. This is the Hard Part

Statements are the most complex extraction because:
- They have many interdependencies
- They use code generation (`.toJS()` methods)
- They reference parser AST classes (`yy.*`)
- They access `alasql` globals at runtime

**Strategy:** Extract incrementally, testing after each statement type.

---

## 2. Statement Dependency Graph

```
Parser (yy.*)
    ↓
SELECT ←→ Query (compile, execute)
    ↓
INSERT (uses SELECT for INSERT...SELECT)
    ↓
UPDATE (uses WHERE from SELECT)
    ↓
DELETE (uses WHERE from SELECT)
    ↓
CREATE TABLE (uses column definitions)
    ↓
DROP TABLE (simple)
```

**Extract order:** Start with simpler statements, build up.

---

## 3. Source Files

| Legacy File | Statements | Target |
|-------------|-----------|--------|
| `src/legacy/38query.js` | Query class | `src/query/Query.js` |
| `src/legacy/40select.js` | SELECT, FROM | `src/statements/Select.js` |
| `src/legacy/422where.js` | WHERE clause | `src/statements/Where.js` |
| `src/legacy/423groupby.js` | GROUP BY | `src/statements/GroupBy.js` |
| `src/legacy/424orderby.js` | ORDER BY | `src/statements/OrderBy.js` |
| `src/legacy/70insert.js` | INSERT | `src/statements/Insert.js` |
| `src/legacy/72update.js` | UPDATE | `src/statements/Update.js` |
| `src/legacy/74delete.js` | DELETE | `src/statements/Delete.js` |
| `src/legacy/60createtable.js` | CREATE TABLE | `src/statements/CreateTable.js` |
| `src/legacy/61droptable.js` | DROP TABLE | `src/statements/DropTable.js` |

---

## 4. Understanding Code Generation

Statements use `.toJS()` to generate JavaScript code as strings:

```javascript
// From src/legacy/422where.js
yy.Where.prototype.toJS = function(context, tableid, defcols) {
    var s = this.expression.toJS(context, tableid, defcols);
    return s;
};

// The generated code becomes:
new Function('p,params,alasql', 'var y;return ' + generatedCode);
```

**Key insight:** The generated function receives `alasql` as a parameter, so it can access `alasql.databases`, `alasql.aggr`, etc. at runtime.

---

## 5. Extract Pattern: Query Class

```javascript
// src/query/Query.js
export class Query {
    constructor(params = {}) {
        this.columns = [];
        this.sources = [];
        this.where = null;
        this.group = null;
        this.having = null;
        this.order = null;
        this.limit = null;
        this.offset = null;
        
        Object.assign(this, params);
    }
}

export function registerQuery(alasql) {
    alasql.Query = Query;
    
    // Attach compilation methods
    Query.prototype.compile = function(databaseid) {
        // Compilation logic from src/legacy/38query.js
    };
    
    Query.prototype.exec = function(params, cb) {
        // Execution logic
    };
}
```

---

## 6. Extract Pattern: SELECT Statement

SELECT is the most complex. Extract in parts:

### Part 1: Basic SELECT (no FROM)
```javascript
// src/statements/Select.js
export function registerSelect(alasql) {
    const yy = alasql.yy;
    
    yy.Select = function(params) {
        Object.assign(this, params);
    };
    
    yy.Select.prototype.toString = function() {
        let s = 'SELECT ';
        if (this.distinct) s += 'DISTINCT ';
        // ... build SQL string
        return s;
    };
    
    yy.Select.prototype.toJS = function(context, tableid, defcols) {
        // Code generation
    };
    
    yy.Select.prototype.compile = function(databaseid) {
        // Compile to executable function
    };
    
    yy.Select.prototype.exec = function(params, cb) {
        // Execute query
    };
}
```

### Part 2: FROM clause
```javascript
// src/statements/From.js
export function registerFrom(alasql) {
    const yy = alasql.yy;
    
    yy.From = function(params) {
        Object.assign(this, params);
    };
    
    // FROM handlers for different sources
    alasql.from.JSON = function(filename, opts, cb, idx, query) {
        // Load JSON file
    };
    
    alasql.from.CSV = function(filename, opts, cb, idx, query) {
        // Load CSV file
    };
}
```

---

## 7. Testing Incrementally

After extracting each statement, run targeted tests:

```javascript
// test/statements/select.test.js
import { describe, expect, test } from 'bun:test';
import alasql from '../../src/alasql.js';

describe('SELECT statement', () => {
    test('SELECT literal', () => {
        expect(alasql('SELECT 1')).toStrictEqual([{ 1: 1 }]);
    });

    test('SELECT with alias', () => {
        expect(alasql('SELECT 1 as x')).toStrictEqual([{ x: 1 }]);
    });

    test('SELECT from array', () => {
        const data = [{ a: 1 }, { a: 2 }];
        expect(alasql('SELECT * FROM ?', [data])).toStrictEqual(data);
    });

    test('SELECT with WHERE', () => {
        const data = [{ x: 1 }, { x: 2 }, { x: 3 }];
        expect(alasql('SELECT * FROM ? WHERE x > 1', [data]))
            .toStrictEqual([{ x: 2 }, { x: 3 }]);
    });

    test('SELECT with ORDER BY', () => {
        const data = [{ x: 3 }, { x: 1 }, { x: 2 }];
        expect(alasql('SELECT * FROM ? ORDER BY x', [data]))
            .toStrictEqual([{ x: 1 }, { x: 2 }, { x: 3 }]);
    });

    test('SELECT with GROUP BY', () => {
        const data = [
            { dept: 'A', val: 1 },
            { dept: 'A', val: 2 },
            { dept: 'B', val: 3 }
        ];
        expect(alasql('SELECT dept, SUM(val) as total FROM ? GROUP BY dept ORDER BY dept', [data]))
            .toStrictEqual([
                { dept: 'A', total: 3 },
                { dept: 'B', total: 3 }
            ]);
    });
});
```

---

## 8. Extraction Checklist

### Core Query
- [ ] `src/query/Query.js` — Query class

### SELECT parts
- [ ] `src/statements/Select.js` — SELECT
- [ ] `src/statements/From.js` — FROM handlers
- [ ] `src/statements/Where.js` — WHERE
- [ ] `src/statements/GroupBy.js` — GROUP BY
- [ ] `src/statements/Having.js` — HAVING
- [ ] `src/statements/OrderBy.js` — ORDER BY
- [ ] `src/statements/Limit.js` — LIMIT/OFFSET

### Data modification
- [ ] `src/statements/Insert.js` — INSERT
- [ ] `src/statements/Update.js` — UPDATE
- [ ] `src/statements/Delete.js` — DELETE

### DDL
- [ ] `src/statements/CreateDatabase.js`
- [ ] `src/statements/DropDatabase.js`
- [ ] `src/statements/CreateTable.js`
- [ ] `src/statements/DropTable.js`
- [ ] `src/statements/AlterTable.js`

### Barrel
- [ ] `src/statements/index.js`

---

## 9. Handling the Parser (yy)

The parser creates AST nodes using `yy.*` classes. After extraction:

```javascript
// src/alasql.js (eventually)
import { parser } from './alasqlparser.js';
import { registerSelect } from './statements/Select.js';
import { registerInsert } from './statements/Insert.js';
// ...

const alasql = function(sql, params, cb) {
    return alasql.exec(sql, params, cb);
};

alasql.yy = parser.yy;

// Register all statements
registerSelect(alasql);
registerInsert(alasql);
// ...

export default alasql;
```

---

## 10. Reality Check

Statement extraction is a **large effort**. It may take multiple sessions.

**Milestone checkpoints:**
1. SELECT from literals works
2. SELECT from arrays works
3. WHERE filtering works
4. GROUP BY with aggregators works
5. ORDER BY works
6. INSERT works
7. CREATE/DROP TABLE works

Commit after each milestone.

---

## 11. Definition of Done for Step 3d

- [ ] Query class extracted
- [ ] SELECT statement extracted and tested
- [ ] INSERT statement extracted and tested
- [ ] UPDATE statement extracted and tested
- [ ] DELETE statement extracted and tested
- [ ] CREATE/DROP TABLE extracted and tested
- [ ] All statement tests pass
- [ ] `git tag esm-step3d-complete` created

---

## Next: Step 3e

Proceed to [esm-step3e.md](./esm-step3e.md) to extract plugins (XLSX, IndexedDB, etc.).
