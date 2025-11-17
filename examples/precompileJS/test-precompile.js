import {compileToJS, compileToIsolateJS} from 'alasql/precompile';

const sql =
	'SELECT product, price*100 AS calculated_price FROM ? where price > ? ORDER BY calculated_price DESC';

console.log('Testing compileToJS (precompile - needs AlaSQL engine):');
const jsCode = compileToJS(sql);
console.log('Generated JS code:');
console.log(jsCode);
console.log('\n');

console.log('Testing compileToIsolateJS (isolate - standalone, no AlaSQL needed):');
const isolateJsCode = compileToIsolateJS(sql);
console.log('Generated standalone JS code:');
console.log(isolateJsCode.substring(0, 500) + '...'); // Show first 500 chars
