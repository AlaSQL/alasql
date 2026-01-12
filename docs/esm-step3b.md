# ESM Refactor Step 3b: Extract Database Structures

**Goal:** Extract Database, Table, and View classes from legacy files.

**Prerequisite:** [esm-step3a.md](./esm-step3a.md) complete

**Branch:** `esm`

---

## 1. Dependencies

Database structures depend on:
- Utils (extracted in Step 3a)
- The `alasql` object (for `alasql.databases`, etc.)

**Strategy:** These modules will receive `alasql` as a parameter when registered.

---

## 2. Source Files

| Legacy File | Classes/Functions | Target |
|-------------|-------------------|--------|
| `src/legacy/20database.js` | `Database` class | `src/database/Database.js` |
| `src/legacy/23table.js` | `Table` class | `src/database/Table.js` |
| `src/legacy/25view.js` | `View` class | `src/database/View.js` |

---

## 3. Extract Pattern: Database Class

The Database class needs access to `alasql.databases`. We'll use dependency injection.

### Step 1: Extract class
```javascript
// src/database/Database.js
import { clone } from '../utils/clone.js';

export class Database {
    constructor(databaseid) {
        this.databaseid = databaseid;
        this.tables = {};
        this.views = {};
        this.indices = {};
        this.triggers = {};
        this.procedures = {};
    }

    exec(sql, params, cb) {
        // This will be wired up through alasql
        throw new Error('Database.exec not initialized');
    }
}

// Registration function - called with alasql object
export function registerDatabase(alasql) {
    alasql.Database = Database;
    
    // Wire up exec to use alasql
    Database.prototype.exec = function(sql, params, cb) {
        return alasql.exec(sql, params, cb, this.databaseid);
    };
}
```

### Step 2: Test
```javascript
// test/database/Database.test.js
import { describe, expect, test } from 'bun:test';
import { Database, registerDatabase } from '../../src/database/Database.js';

describe('Database class', () => {
    test('creates database with id', () => {
        const db = new Database('testdb');
        expect(db.databaseid).toBe('testdb');
        expect(db.tables).toStrictEqual({});
    });

    test('registerDatabase attaches to alasql', () => {
        const mockAlasql = {};
        registerDatabase(mockAlasql);
        expect(mockAlasql.Database).toBe(Database);
    });
});
```

---

## 4. Extract Pattern: Table Class

```javascript
// src/database/Table.js
import { clone } from '../utils/clone.js';
import { hash } from '../utils/hash.js';

export class Table {
    constructor(params = {}) {
        this.columns = [];
        this.xcolumns = {};
        this.data = [];
        this.indices = {};
        this.pk = undefined;
        
        // Apply params
        Object.assign(this, params);
    }

    // Column management
    addColumn(column) {
        this.columns.push(column);
        this.xcolumns[column.columnid] = column;
    }

    // Data operations
    insert(record) {
        this.data.push(record);
        return 1;
    }
}

export function registerTable(alasql) {
    alasql.Table = Table;
}
```

```javascript
// test/database/Table.test.js
import { describe, expect, test } from 'bun:test';
import { Table } from '../../src/database/Table.js';

describe('Table class', () => {
    test('creates empty table', () => {
        const table = new Table();
        expect(table.columns).toStrictEqual([]);
        expect(table.data).toStrictEqual([]);
    });

    test('addColumn adds to columns and xcolumns', () => {
        const table = new Table();
        table.addColumn({ columnid: 'name', dbtypeid: 'STRING' });
        expect(table.columns).toHaveLength(1);
        expect(table.xcolumns.name).toBeDefined();
    });

    test('insert adds record', () => {
        const table = new Table();
        table.insert({ id: 1, name: 'Test' });
        expect(table.data).toHaveLength(1);
    });
});
```

---

## 5. Barrel Export

```javascript
// src/database/index.js
export { Database, registerDatabase } from './Database.js';
export { Table, registerTable } from './Table.js';
export { View, registerView } from './View.js';

// Convenience: register all at once
export function registerDatabaseModule(alasql) {
    registerDatabase(alasql);
    registerTable(alasql);
    registerView(alasql);
}
```

---

## 6. Integration Test

Test that the extracted classes work with the full engine:

```javascript
// test/database/integration.test.js
import { describe, expect, test } from 'bun:test';
import alasql from '../../src/alasql.js';  // Still wraps legacy

describe('Database integration', () => {
    test('CREATE DATABASE works', () => {
        const dbName = 'test_' + Date.now();
        alasql(`CREATE DATABASE ${dbName}`);
        expect(alasql.databases[dbName]).toBeDefined();
        alasql(`DROP DATABASE ${dbName}`);
    });

    test('CREATE TABLE works', () => {
        const dbName = 'test_' + Date.now();
        alasql(`CREATE DATABASE ${dbName}; USE ${dbName}`);
        alasql('CREATE TABLE users (id INT, name STRING)');
        expect(alasql.databases[dbName].tables.users).toBeDefined();
        alasql(`DROP DATABASE ${dbName}`);
    });
});
```

---

## 7. Extraction Checklist

- [ ] `src/database/Database.js` extracted and tested
- [ ] `src/database/Table.js` extracted and tested
- [ ] `src/database/View.js` extracted and tested
- [ ] `src/database/index.js` barrel export created
- [ ] Integration tests pass
- [ ] `./build.sh && yarn test` still works

---

## 8. Notes on Complexity

The Database/Table classes have tight coupling to:
- Parser AST classes (`yy.CreateTable`, etc.)
- Query execution
- Indexing

**For now:** Extract the basic class structure. The full wiring happens after statements are extracted in Step 3d.

---

## 9. Definition of Done for Step 3b

- [ ] `src/database/Database.js` created with `registerDatabase`
- [ ] `src/database/Table.js` created with `registerTable`
- [ ] `src/database/View.js` created with `registerView`
- [ ] `src/database/index.js` barrel export
- [ ] Unit tests for each class
- [ ] Integration test passes
- [ ] `git tag esm-step3b-complete` created

---

## Next: Step 3c

Proceed to [esm-step3c.md](./esm-step3c.md) to extract expressions and aggregators.
