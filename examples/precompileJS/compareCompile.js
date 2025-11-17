// examples/precompileJS/compareCompile.js
// Compare alasql.compile() (runtime function) vs alasql.compileToJS() (standalone source string)

const alasql = require('../../dist/alasql.fs.js');

const sql =
	'SELECT product, price*100 AS calculated_price FROM ? WHERE price > ? ORDER BY calculated_price DESC';

console.log('SQL:', sql);

// 1) compile() -> returns a function that is wired into AlaSQL's runtime
const compiledFn = alasql.compile(sql);

// 2) compileToJS() -> returns a standalone JS function as *source code*, not yet executed
const jsSource = alasql.compileToIsolateJS(sql, undefined, true); // pretty-printed for readability

console.log('\n=== compiled() function (truncated) ===');
console.log(String(compiledFn).slice(0, 400) + '\n...');

console.log('\n=== compileToJS() source (truncated) ===');
console.log(jsSource.slice(0, 400) + '\n...');

// Sample data
const data = [
	{product: 'Laptop', price: 1200},
	{product: 'Mouse', price: 25},
	{product: 'Keyboard', price: 75},
	{product: 'Monitor', price: 300},
	{product: 'USB Cable', price: 10},
];

const minPrice = 50;
const params = [data, minPrice];

console.log('\n--- Running compiled() ---');
const result1 = compiledFn(params);
console.log(result1);

console.log('\n--- Running standalone (compileToJS) ---');
const standalone = eval(jsSource);
const result2 = standalone(params);
console.log(result2);

console.log(
	'\nResults are structurally the same:',
	JSON.stringify(result1) === JSON.stringify(result2)
);
