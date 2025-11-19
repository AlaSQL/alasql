// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 270 RECORDSET tests', () => {
	const pluck = (arr, key) => arr.map(e => e[key]);

	var emptydata = [];
	var data1 = [
		{a: 1, b: 10},
		{a: 2, b: 20},
		{a: 3, b: 30},
	];
	var data2 = [
		{b: 10, c: 100},
		{b: 20, c: 200},
		{b: 40, c: 400},
	];

	test.skip('1. Create database', done => {
		alasql('CREATE DATABASE test270; USE test270');
		alasql('CREATE TABLE test270.one(a INT, b INT)');
		alasql('CREATE TABLE test270.two(b INT, c INT)');
		alasql('CREATE TABLE test270.three');
		alasql('CREATE TABLE test270.four');
		alasql.options.modifier = 'RECORDSET';
		done();
	});

	test.skip('2. Empty test on param throws error', done => {
		expect(() => {
			var res = alasql('SELECT * FROM ?', []);
		}).toThrow(Error);
		done();
	});

	test.skip('3. Empty test on param throws error', done => {
		var res = alasql('SELECT * FROM ?', [emptydata]);
		expect(res).toEqual({data: [], columns: []});
		done();
	});

	test.skip('4. Empty test on table with columns', done => {
		var res = alasql('SELECT * FROM test270.one');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b']);
		done();
	});

	test.skip('5. Test on empty table without column definitions', done => {
		var res = alasql('SELECT * FROM test270.three');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual([]);
		done();
	});

	test.skip('6. Test on empty table without column definitions', done => {
		alasql('SELECT * INTO test270.three FROM ?', [data1]);
		var res = alasql('SELECT * FROM test270.three');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b']);
		done();
	});

	test.skip('7. Test on empty table without column definitions', done => {
		var res = alasql('SELECT a,b FROM test270.three');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b']);
		done();
	});

	test.skip('8. Test on empty table without column definitions', done => {
		var res = alasql('SELECT b,a FROM test270.three');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['b', 'a']);
		done();
	});

	test.skip('9. Test on empty table without column definitions', done => {
		var res = alasql('SELECT a,b,a*a AS a2 FROM test270.three');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b', 'a2']);
		done();
	});

	test.skip('9a. Test on table without column definitions', done => {
		var res = alasql('SELECT a,a*a AS a2,b FROM test270.three');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'a2', 'b']);
		done();
	});

	test.skip('9b. Test on table without column definitions', done => {
		var res = alasql('SELECT a,* FROM test270.three');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b']);
		done();
	});

	test.skip('9c. Test on table without column definitions', done => {
		var res = alasql('SELECT *,a FROM test270.three');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b']);
		done();
	});

	test.skip('9c1. Test on table without column definitions', done => {
		var res = alasql('SELECT b,*,a FROM test270.three');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['b', 'a']);
		done();
	});

	test.skip('9d. Test on table without column definitions', done => {
		var res = alasql('SELECT a,*,a*a AS a2 FROM test270.three');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'a', 'b', 'a2']);
		done();
	});

	test.skip('10. Array on param with *', done => {
		var res = alasql('SELECT * FROM ?', [data1]);
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b']);
		done();
	});

	test.skip('11. Array with column', done => {
		var res = alasql('SELECT a,b FROM ?', [data1]);
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b']);
		done();
	});

	test.skip('11a. Array with column', done => {
		var res = alasql('SELECT b,a FROM ?', [data1]);
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['b', 'a']);
		done();
	});

	test.skip('11b. Array with column', done => {
		var res = alasql('SELECT *,b,a FROM ?', [data1]);
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b', 'b', 'a']);
		done();
	});

	test.skip('12. Array with column', done => {
		var res = alasql('SELECT a,a*a AS a2 FROM ?', [data1]);
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'a2']);
		done();
	});

	test.skip('12a. Array with column', done => {
		var res = alasql('SELECT a,a*a AS a2,b FROM ?', [data1]);
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'a2', 'b']);
		done();
	});

	test.skip('13. Array with column from table', done => {
		var res = alasql('SELECT a,a*a AS a2 FROM test270.one');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'a2']);
		done();
	});

	test.skip('14. Array with column in reversed order', done => {
		var res = alasql('SELECT a*a AS a2,a FROM ?', [data1]);
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a2', 'a']);
		done();
	});

	test.skip('15. Array with column in reversed order', done => {
		var res = alasql('SELECT a*a AS a2,a FROM ?', [data1]);
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a2', 'a']);
		done();
	});

	test.skip('16. JOIN params', done => {
		var res = alasql('SELECT one.*,two.* FROM ? one JOIN ? two USING b', [data1, data2]);
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b', 'c']);
		done();
	});

	test.skip('17. JOIN tables', done => {
		alasql('SELECT * INTO test270.one FROM ?', [data1]);
		alasql('SELECT * INTO test270.two FROM ?', [data2]);
		var res = alasql('SELECT one.*,two.* FROM test270.one AS one JOIN test270.two AS two USING b');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b', 'b', 'c']);
		done();
	});

	test.skip('18. JOIN params', done => {
		var res = alasql('SELECT one.*,two.* FROM ? one JOIN ? two USING b', [data1, data2]);
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b', 'c']);
		done();
	});

	/*
  test.skip('3. VALUE', function(done) {
	alasql.options.modifier = 'VALUE';
	var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b',[data1,data2]);
	expect(res).toEqual(1);

	done();
  });

  test.skip('4. ROW', function(done) {
	alasql.options.modifier = 'ROW';
	var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b',[data1,data2]);
	expect(res).toEqual([1,10,100]);

	done();
  });

  test.skip('5. COLUMN', function(done) {
	alasql.options.modifier = 'COLUMN';
	var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b',[data1,data2]);
	expect(res).toEqual([1,2,3,undefined]);

	done();
  });


  test.skip('6. MATRIX', function(done) {
	alasql.options.modifier = 'MATRIX';
	var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b',[data1,data2]);
//console.log(res);
	// Wrong with reduced rows
	expect(res).toEqual([[1,10,100],[2,20,200],[3,30,undefined],[undefined,40,400]]);

	done();
  });

  test.skip('6a. MATRIX', function(done) {
	alasql.options.modifier = 'MATRIX';
	var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b \
	  ORDER BY a',[data1,data2]);
//console.log(res);
	// Wrong with reduced rows
	expect(res).toEqual([[undefined,40,400],[1,10,100],[2,20,200],[3,30,undefined]]);

	done();
  });


  test.skip('7. RECORDSET', function(done) {
	alasql.options.modifier = "RECORDSET";
	var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b',[data1,data2]);
//console.log(res);
	// Wrong with reduced rows
	expect(res).toEqual({data:
	 [ { a: 1, b: 10, c: 100 },
	 { a: 2, b: 20, c: 200 },
	 { a: 3, b: 30 },
	 { b: 40, c: 400 } ],
	 columns: [{columnid:'a'},{columnid:'b'},{columnid:'c'}]}
	);
	done();
  });

  test.skip('8. INDEX', function(done) {
	alasql.options.modifier = 'INDEX';
	var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b',[data1,data2]);
	expect(res).toEqual({ '1': 10, '2': 20, '3': 30, undefined: 40 });

	done();
  });

  test.skip('9. TEXTSTRING', function(done) {
	alasql.options.modifier = 'TEXTSTRING';
	var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b',[data1,data2]);
	expect(res).toEqual('1\n2\n3\n');

	done();
  });
*/
	test.skip('99. Drop phase', done => {
		delete alasql.options.modifier;
		alasql('DROP DATABASE test270');
		done();
	});
});
