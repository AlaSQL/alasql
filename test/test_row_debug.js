var alasql = require('..');

alasql('create database test214debug;use test214debug');
alasql('create table one (a int, b int)');
alasql('insert into one values (1,10),(1,20),(1,30),(2,40),(2,50),(3,60)');

console.log('Test 1: SELECT ROW sum(a),sum(b)');
var res1 = alasql('select row sum(a),sum(b) from one');
console.log('Result:', JSON.stringify(res1, null, 2));
console.log('Expected: [10, 210]');

console.log('\nTest 2: SELECT ROW sum(a),sum(a)');
var res2 = alasql('select row sum(a),sum(a) from one');
console.log('Result:', JSON.stringify(res2, null, 2));
console.log('Expected: [10, 10]');

alasql('drop database test214debug');
