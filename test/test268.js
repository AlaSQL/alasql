// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage(__dirname + '/restest267.json', {
		strict: false,
		ws: '',
	});
}

describe('Test 268 INNER JOIN stress test', function () {
	test('1. Create database', function (done) {
		alasql('CREATE DATABASE test268; USE test268');
		done();
	});

	var data1 = [
		{a: 1, b: 10},
		{a: 2, b: 20},
	];
	var data2 = [
		{b: 10, c: 100},
		{b: 20, c: 200},
	];

	test('2. INNER JOIN on Array', function (done) {
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 INNER JOIN ? t2 USING b', [data1, data2]);
		assert.deepEqual(res, [
			{a: 1, b: 10, c: 100},
			{a: 2, b: 20, c: 200},
		]);
		done();
	});

	test('3. INNER JOIN on Tables', function (done) {
		alasql('CREATE TABLE table1(a INT, b INT);');
		alasql('SELECT * INTO table1 FROM ?', [data1]);
		alasql('CREATE TABLE table2(b INT, c INT);');
		alasql('INSERT INTO table2 SELECT * FROM ?', [data2]);
		var res = alasql('SELECT t1.*,t2.* FROM table1 t1 INNER JOIN table2 t2 USING b', [
			data1,
			data2,
		]);
		assert.deepEqual(res, [
			{a: 1, b: 10, c: 100},
			{a: 2, b: 20, c: 200},
		]);
		done();
	});

	var t1 = [];
	for (var i = 0; i < 5000; i++) {
		t1.push({a: i, b: i, bb: i});
	}

	var t1000 = 100;
	var t50000 = 200;
	var t2 = [];
	for (var i = 1; i < t50000; i++) {
		t2.push({b: i, bb: i % 2, c: i * 100});
	}
	/* 
  for(var i=1;i<t50000;i++) {
    t2.push({b:(i*2)%t1000,bb:i%3,c:i*100});
  }
  for(var i=1;i<t50000;i++) {
    t2.push({b:(i*i*i)%t1000,bb:i%4,c:i*100});
  }
  */
	//console.log(t2);

	test('4. INNER JOIN on Big Array', function (done) {
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 INNER JOIN ? t2 ON t1.b = t2.b', [t1, t2]);
		/// console.log('INNER =',res.length);
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 LEFT JOIN ? t2 ON t1.b = t2.b', [t1, t2]);
		/// console.log('LEFT =',res.length);
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 RIGHT JOIN ? t2 ON t1.b = t2.b', [t1, t2]);
		/// console.log('RIGHT =',res.length);
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 ON t1.b = t2.b', [t1, t2]);
		/// console.log('OUTER =',res.length);
		// assert.deepEqual(res.,
		//   [ { a: 1, b: 10, c: 100 }, { a: 2, b: 20, c: 200 } ]
		// );
		done();
	});

	test('99. Drop phase', function (done) {
		alasql('DROP DATABASE test268');
		done();
	});
});
