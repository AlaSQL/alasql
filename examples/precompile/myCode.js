import alasql from '../../dist/alasql.fs.js';

// Import the pre-compiled function source code using a Bun macro.
// This will execute compileToJS(sql) at build time and inline the result.
import {compileToJS} from 'alasql/precompile' with {type: 'macro'};

const sql =
	'SELECT product, price*100 AS calculated_price FROM ? where price > ? ORDER BY calculated_price DESC';

// Create a function from the source code.
// We bind `alasql` to `this` so the compiled function can find it.
const selectProducts = new Function('return ' + compileToJS(sql))().bind(alasql);

const data = [
	{product: 'Ball', price: 3},
	{product: 'Pen', price: 1.5},
];

// Example of howto pass parameters to the compiled function
const minPrice = 2;

// Execute the function
const result = selectProducts([data, minPrice]);

console.log(result);
