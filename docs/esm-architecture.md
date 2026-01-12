# AlaSQL ESM Architecture Reference

This document explains AlaSQL's internal architecture to help understand the refactoring.

---

## 1. How AlaSQL Works

AlaSQL is a **code generator**, not a simple interpreter.

```
SQL string → Parse (jison) → AST → Compile (.toJS()) → JS string → new Function() → Execute
```

### Example Flow

```javascript
alasql('SELECT name FROM ? WHERE age > 30', [data]);
```

1. **Parse:** Jison parser creates AST: `{ type: 'Select', columns: [...], from: [...], where: {...} }`
2. **Compile:** `.toJS()` methods generate JavaScript code as a string
3. **Create Function:** `new Function('p,params,alasql', generatedCode)`
4. **Execute:** Call the function with data and runtime context

### Generated Code Example

For `SELECT name FROM ? WHERE age > 30`:

```javascript
// Generated (simplified)
function(p, params, alasql) {
    var data = params[0];
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        if (row.age > 30) {  // WHERE clause
            result.push({ name: row.name });  // SELECT clause
        }
    }
    return result;
}
```

---

## 2. Why `alasql` is Passed to Generated Code

The generated function receives `alasql` as a parameter because it needs access to:

```javascript
alasql.databases    // Database instances
alasql.options      // Runtime config
alasql.aggr.*       // Aggregators (SUM, AVG, etc.)
alasql.stdfn.*      // Standard functions (UPPER, LOWER, etc.)
alasql.from.*       // FROM handlers (XLSX, CSV, etc.)
alasql.into.*       // INTO handlers
```

This is why plugins attach to `alasql.*` — the generated code looks them up at runtime.

---

## 3. The Parser (yy)

The Jison parser uses a `yy` object for AST node constructors:

```javascript
// In grammar: $$ = new yy.Select({columns: $2, from: $4});

yy.Select = function(params) {
    this.columns = params.columns;
    this.from = params.from;
    // ...
};

yy.Select.prototype.toJS = function() {
    // Generate JavaScript code
};

yy.Select.prototype.compile = function(databaseid) {
    // Compile to executable function
};
```

---

## 4. The `.use()` Pattern

Plugins register functionality on the `alasql` object:

```javascript
// Plugin as function
function myPlugin(alasql) {
    alasql.stdfn.MYFUNC = (x) => x * 2;
    alasql.aggr.MYAGG = (v, s, stage) => { /* ... */ };
}

alasql.use(myPlugin);

// Plugin as object
alasql.use({
    stdfn: { MYFUNC: (x) => x * 2 },
    aggr: { MYAGG: (v, s, stage) => { /* ... */ } }
});
```

### Implementation

```javascript
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
    return alasql;  // Chainable
};
```

---

## 5. Aggregator 3-Stage Pattern

Aggregators (SUM, AVG, COUNT) use a 3-stage lifecycle:

```javascript
alasql.aggr.SUM = function(value, accumulator, stage) {
    if (stage === 1) {
        // Initialize: first row
        return value;
    }
    if (stage === 2) {
        // Accumulate: subsequent rows
        return accumulator + value;
    }
    // Stage 3: Finalize and return
    return accumulator;
};

alasql.aggr.AVG = function(value, accumulator, stage) {
    if (stage === 1) {
        return { sum: value, count: 1 };
    }
    if (stage === 2) {
        return { 
            sum: accumulator.sum + value, 
            count: accumulator.count + 1 
        };
    }
    return accumulator.sum / accumulator.count;
};
```

---

## 6. FROM/INTO Handlers

Custom data sources register handlers:

```javascript
// FROM handler: read data
alasql.from.XLSX = function(filename, opts, cb, idx, query) {
    const XLSX = alasql.external.xlsx;
    const workbook = XLSX.readFile(filename);
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[...]);
    
    if (cb) return cb(data, idx, query);
    return data;
};

// INTO handler: write data
alasql.into.XLSX = function(filename, opts, data, columns, cb) {
    const XLSX = alasql.external.xlsx;
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, filename);
    
    if (cb) return cb(data.length);
    return data.length;
};
```

---

## 7. Module Registration Pattern

Each module exports a registration function:

```javascript
// src/aggregators/sum.js
export function sum(alasql) {
    alasql.aggr.SUM = function(value, accumulator, stage) {
        if (stage === 1) return value;
        if (stage === 2) return accumulator + value;
        return accumulator;
    };
}

// src/aggregators/index.js
export { sum } from './sum.js';
export { avg } from './avg.js';

export function registerAggregators(alasql) {
    sum(alasql);
    avg(alasql);
    // ...
}
```

### Usage in main entry:

```javascript
// src/alasql.js
import { registerAggregators } from './aggregators/index.js';

const alasql = function(sql, params, cb) { /* ... */ };

registerAggregators(alasql);

export default alasql;
```

---

## 8. Database & Table Structure

```javascript
alasql.databases = {
    'alasql': {          // Default database
        databaseid: 'alasql',
        tables: {
            'users': {
                columns: [
                    { columnid: 'id', dbtypeid: 'INT' },
                    { columnid: 'name', dbtypeid: 'STRING' }
                ],
                data: [
                    { id: 1, name: 'Alice' },
                    { id: 2, name: 'Bob' }
                ],
                indices: {}
            }
        },
        views: {}
    }
};
```

---

## 9. Key Globals

| Global | Purpose |
|--------|---------|
| `alasql.databases` | All database instances |
| `alasql.useid` | Current database name |
| `alasql.options` | Runtime configuration |
| `alasql.yy` | Parser AST constructors |
| `alasql.aggr` | Aggregator functions |
| `alasql.stdfn` | Standard SQL functions |
| `alasql.from` | FROM data handlers |
| `alasql.into` | INTO data handlers |
| `alasql.external` | External libraries (xlsx, fs) |

---

## 10. File Organization

### Current (Legacy)
```
src/
├── 05copyright.js      ← License
├── 10start.js          ← IIFE start
├── 15utility.js        ← Utils
├── 17alasql.js         ← Core engine
├── 20database.js       ← Database class
├── 38query.js          ← Query class
├── 40select.js         ← SELECT
├── 55functions.js      ← Aggregators + stdfn
├── 70insert.js         ← INSERT
├── 833xlsx.js          ← XLSX plugin
└── 99finish.js         ← IIFE end
```

### Target (ESM)
```
src/
├── alasql.js           ← Main entry
├── alasql.node.js      ← Node entry (with fs)
├── alasqlparser.js     ← Generated parser
├── utils/              ← Utility functions
├── database/           ← Database, Table, View
├── query/              ← Query compilation
├── statements/         ← SQL statements
├── aggregators/        ← SUM, AVG, etc.
├── stdfn/              ← UPPER, LOWER, etc.
└── plugins/            ← XLSX, IndexedDB, etc.
```
