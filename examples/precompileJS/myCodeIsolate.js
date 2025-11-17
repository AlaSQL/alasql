import {compileToIsolateJS} from './mySQL.js' with {type: 'macro'};

const sql =
	'SELECT product, price*100 AS calculated_price FROM ? where price > ? ORDER BY calculated_price DESC';

// Precompile to a fully isolated JS function that does not depend on `this`
const selectProductsIsolated = new Function(
	'return ' +
		compileToIsolateJS(
			'SELECT product, price*100 AS calculated_price FROM ? where price > ? ORDER BY calculated_price DESC'
		)
)();

const data = [
	{product: 'Ball', price: 3},
	{product: 'Pen', price: 1.5},
];

const minPrice = 2;

const result = selectProductsIsolated([data, minPrice]);

console.log(result);
