var alasql = require('.');

// Test parsing the problematic query
var parsed = alasql.parse('INSERT INTO t(report_type,inv_qty,week,month,year) VALUES ((SELECT \'k\',1,2,3,4))');
console.log('Parsed:', JSON.stringify(parsed, null, 2));
