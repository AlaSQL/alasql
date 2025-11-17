
### Transform SQL to JavaScript code

If you want to fiddle with speed you can pre-generate the JS code that will be running your query. 

The returned function has the signature `function(params, cb)` and is designed to be called with `alasql` as context.

```js
// alasql.compileToJS(sql, databaseid, prettyPrint=true)
const jsCode = alasql.compileToJS('SELECT * FROM ? WHERE pop > 1000000', 'my_db');

const selectPop = new Function('return ' + jsCode)().bind(alasql);

// Now you can call it like a regular alasql function, but without the SQL
let data = [{city: 'Copenhagen', pop: 1300000}, {city: 'Aarhus', pop: 300000}];
let res = selectPop([data]);
// res will be [{city: 'Copenhagen', pop: 1300000}]
```

This example is not useful in it self, as it is all done during exeuction time (you could just as well have used alasql.compile() directly). However, if you precompile the function at build time, it can be a significant performance boost as the execution don't have to parse the SQL. There is an example of how to do this with Bun in [examples/precompileJS](https://github.com/AlaSQL/alasql/tree/develop/examples/precompileJS)


---------


# AlaSQL Precompile and Isolate Module

This module provides two types of SQL compilation functionality for AlaSQL.

The functinality is experimental - so proceed with caution and expect changes.

## Installation

```javascript
import { compileToJS, compileToIsolateJS } from 'alasql/precompile';
```

## Functions

### `compileToJS(sql, databaseid?, prettyPrint?)` - Precompile

Compiles a SQL statement to JavaScript source code that expects an AlaSQL engine as `this`. This is useful for performance optimization but still requires AlaSQL at runtime.

**Parameters:**
- `sql` (string): SQL statement to compile
- `databaseid` (string, optional): Database identifier
- `prettyPrint` (boolean, optional, default: true): Whether to format the output

**Returns:** Generated JavaScript source code string

### `compileToIsolateJS(sql, databaseid?, prettyPrint?)` - Isolate

Compiles a SQL statement to a fully standalone JavaScript function that can run without the AlaSQL engine. This creates completely isolated code with no external dependencies.

**Parameters:**
- `sql` (string): SQL statement to compile
- `databaseid` (string, optional): Database identifier  
- `prettyPrint` (boolean, optional, default: false): Whether to format the output

**Returns:** Generated standalone JavaScript source code string

## Usage Examples

### Precompile Usage (still needs AlaSQL)

```javascript
import { compileToJS } from 'alasql/precompile';

const sql = 'SELECT name, age FROM users WHERE age > ?';
const jsCode = compileToJS(sql);

// Create a function from the compiled code
const queryFn = new Function('return ' + jsCode)().bind(alasql);

// Execute the function (requires AlaSQL)
const result = queryFn([users, 18]);
```

### Isolate Usage (completely standalone)

```javascript
import { compileToIsolateJS } from 'alasql/precompile';

const sql = 'SELECT name, age FROM users WHERE age > ?';
const standaloneCode = compileToIsolateJS(sql);

// Create a standalone function (no AlaSQL required)
const queryFn = new Function('return ' + standaloneCode)();

// Execute with just data - no AlaSQL dependency
const result = queryFn([users, 18]);
```

## Build-time Compilation

You can use these functions with build tools like Bun, Vite, or Webpack to compile SQL queries at build time:

```javascript
// Using Bun macro for precompile
import { compileToJS } from './my-queries.js' with { type: 'macro' };

const queryFn = new Function('return ' + compileToJS('SELECT * FROM users'))().bind(alasql);

// Using Bun macro for isolate
import { compileToIsolateJS } from './my-queries.js' with { type: 'macro' };

const queryFn = new Function('return ' + compileToIsolateJS('SELECT * FROM users'))();
```

## Key Differences

| Feature | Precompile (`compileToJS`) | Isolate (`compileToIsolateJS`) |
|---------|---------------------------|--------------------------------|
| **Runtime Dependency** | Requires AlaSQL engine | No dependencies |
| **Bundle Size** | AlaSQL + compiled code | Only compiled code |
| **Performance** | Eliminates parsing overhead | Maximum performance |
| **Use Case** | Performance optimization | Deployment to constrained environments |
| **Function Access** | Full AlaSQL function library | Limited to compiled query functions |

## Benefits

### Precompile Benefits:
- **Performance**: Eliminate SQL parsing overhead at runtime
- **Flexibility**: Still has access to full AlaSQL functionality
- **Debugging**: Can still use AlaSQL debugging tools

### Isolate Benefits:
- **Zero Dependencies**: Completely standalone execution
- **Minimal Bundle Size**: Only include the compiled query logic
- **Maximum Performance**: No runtime overhead
- **Security**: No SQL injection risks with compiled queries
- **Portability**: Can run in any JavaScript environment
