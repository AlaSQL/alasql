if (typeof exports === 'object') {
var assert = require('assert');
var alasql = require('.');
}

// Test the issue with INSERT INTO with SELECT subquery
try {
alasql('DROP TABLE IF EXISTS t');
alasql('CREATE TABLE t (report_type string, inv_qty number, week number, month number, year number)');
console.log('Table created');
alasql('INSERT INTO t(report_type,inv_qty,week,month,year) VALUES ((SELECT \'k\',1,2,3,4))');
console.log('Insert executed');
var res = alasql('SELECT * FROM t');
console.log('Result:', JSON.stringify(res));
} catch(e) {
console.log('Error:', e.message);
console.log('Stack:', e.stack);
}
