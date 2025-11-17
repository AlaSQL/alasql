# AlaSQL Precompile Module

The precompile module provides the `compileToJS` function to compile SQL queries into JavaScript code that skips SQL parsing on repeated executions.

## Installation

```bash
npm install alasql
```

## Usage

Import the precompile module separately to keep it out of your main bundle:

```javascript
const alasql = require('alasql');
const { compileToJS } = require('alasql/precompile');
```

Or with ES modules:

```javascript
import alasql from 'alasql';
import { compileToJS } from 'alasql/precompile';
```

## API

### `compileToJS(sql, databaseid)`

Compiles an SQL statement into JavaScript source code that skips SQL parsing.

**Parameters:**
- `sql` (string): The SQL statement to compile
- `databaseid` (string, optional): Database identifier

**Returns:** String containing the generated JavaScript function

**Example:**

```javascript
const { compileToJS } = require('alasql/precompile');

// Compile the SQL once
const sql = 'SELECT product, price FROM ? WHERE price > ?';
const jsCode = compileToJS(sql);

// Create the compiled function
const compiledFn = new Function('return ' + jsCode)().bind(alasql);

// Execute many times - NO SQL parsing!
const data = [{product: 'Book', price: 5}, {product: 'Pen', price: 1}];
const result1 = compiledFn([data, 2]);
const result2 = compiledFn([data, 3]);
```


## Use Cases

### 1. Performance-Critical Code

When you need to execute the same SQL query thousands of times:

```javascript
const { compileToJS } = require('alasql/precompile');

// Compile once
const jsCode = compileToJS('SELECT * FROM ? WHERE active = true');
const compiledFn = new Function('return ' + jsCode)().bind(alasql);

// Execute many times (no parsing overhead!)
for (let i = 0; i < 10000; i++) {
  const result = compiledFn([users]);
  // process result...
}
```

### 2. Build-Time Optimization

Generate optimized query functions at build time:

```javascript
const { compileToJS } = require('alasql/precompile');
const fs = require('fs');

const sql = 'SELECT product, price*100 AS cents FROM products WHERE price > 2';
const jsCode = compileToJS(sql);

// Save to file
fs.writeFileSync('queries/getProducts.js', `
  const alasql = require('alasql');
  module.exports = ${jsCode}.bind(alasql);
`);
```

### 3. Reduced Bundle Size

Keep precompile functionality separate from your main bundle:

```javascript
// In your build tool, only import precompile during build
import { compileToJS } from 'alasql/precompile';

// Main app only needs alasql, not precompile
import alasql from 'alasql';
```

## Differences from `alasql.compile()`

| Feature | `alasql.compile()` | `compileToJS()` |
|---------|-------------------|-----------------|
| Returns | Function | String (source code) |
| Portable | No | Yes (requires alasql) |
| SQL parsing | Once | Once |
| Database tables | ✓ | ✓ |
| Parameterized queries | ✓ | ✓ |

## Notes

- The generated code from `compileToJS()` must be bound to an `alasql` instance
- SQL is parsed once during compilation; execution skips the parsing step
- Both database tables and parameterized queries are supported
