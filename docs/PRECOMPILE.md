
### Transform SQL to JavaScript code

If you want to fiddle with speed you can pre-generate the JS code that will be running your query. 

The returned function has the signature `function(params, cb)` and is designed to be called with `alasql` as context.

```js
import alasql from 'alasql';
import {compileToJS} from 'alasql/precompile';

const jsCode = compileToJS('SELECT * FROM ? WHERE pop > 1000000', 'my_db');

const selectPop = new Function('return ' + jsCode)().bind(alasql);

// Now you can call it like a regular alasql function, but without the SQL
let data = [{city: 'Copenhagen', pop: 1300000}, {city: 'Aarhus', pop: 300000}];
let res = selectPop([data]);
// res will be [{city: 'Copenhagen', pop: 1300000}]
```

This example is not useful in it self, as it is all done during exeuction time (you could just as well have used alasql.compile() directly). However, if you precompile the function at build time, it can be a significant performance boost as the execution don't have to parse the SQL. There is an example of how to do this with Bun in [examples/precompileJS](https://github.com/AlaSQL/alasql/tree/develop/examples/precompileJS)


---------


# AlaSQL Precompile Module

This module provides SQL compilation functionality that allows you to pre-compile SQL queries into JavaScript code, skipping SQL parsing on execution.

The functionality is experimental - so proceed with caution and expect changes.

## Installation

```javascript
import { compileToJS } from 'alasql/precompile';
```

## Functions

### `compileToJS(sql, databaseid?)` - Precompile

Compiles a SQL statement to JavaScript source code that expects an AlaSQL engine as `this`. This is useful for performance optimization as it eliminates SQL parsing overhead at runtime.

**Parameters:**
- `sql` (string): SQL statement to compile
- `databaseid` (string, optional): Database identifier

**Returns:** Generated JavaScript source code string

## Usage Example

```javascript
import { compileToJS } from 'alasql/precompile';

const sql = 'SELECT name, age FROM users WHERE age > ?';
const jsCode = compileToJS(sql);

// Create a function from the compiled code
const queryFn = new Function('return ' + jsCode)().bind(alasql);

// Execute the function (requires AlaSQL)
const result = queryFn([users, 18]);
```

## Build-time Compilation

You can use this function with build tools like Bun, Vite, or Webpack to compile SQL queries at build time:

```javascript
// Using Bun macro for precompile
import { compileToJS } from './my-queries.js' with { type: 'macro' };

const queryFn = new Function('return ' + compileToJS('SELECT * FROM users'))().bind(alasql);
```

## Benefits

- **Performance**: Eliminate SQL parsing overhead at runtime
- **Flexibility**: Still has access to full AlaSQL functionality
- **Debugging**: Can still use AlaSQL debugging tools
- **Works with database tables**: Supports both parameterized queries and database tables
