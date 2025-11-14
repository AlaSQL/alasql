// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 303 SEARCH over JSON', function () {
	test('0. Create database ', function (done) {
		var res = alasql('CREATE DATABASE test303;USE test303');
		done();
	});

	test('1. Simple Search Primitives', function (done) {
		var res = alasql('SEARCH FROM TRUE');
		assert.deepEqual(res, true);
		var res = alasql('SEARCH FROM 1');
		assert.deepEqual(res, 1);
		var res = alasql('SEARCH FROM "John"');
		assert.deepEqual(res, 'John');
		var res = alasql('SEARCH FROM {a:1}');
		assert.deepEqual(res, {a: 1});
		var res = alasql('SEARCH FROM @[1,2,3]');
		assert.deepEqual(res, [1, 2, 3]);
		done();
	});

	test('2. PROP() Selector', function (done) {
		var res = alasql('SEARCH name FROM {name:"John"}');
		assert.deepEqual(res, ['John']);

		var res = alasql(
			'SEARCH location city FROM {name:"John",location:{city:"Milan",country:"Italy"}}'
		);
		assert.deepEqual(res, ['Milan']);

		var res = alasql('SEARCH 2 FROM @[10,20,30]');
		assert.deepEqual(res, [30]);

		done();
	});

	test('3. Basic Selector', function (done) {
		alasql.srch.DOUBLE = function (val, args) {
			return {status: 1, values: [val * 2]};
		};
		var res = alasql('SEARCH DOUBLE() FROM 1');
		assert.deepEqual(res, [2]);

		alasql.srch.TRIPLE = function (val, args) {
			return {status: 1, values: [val, val * 2, val * 3]};
		};
		var res = alasql('SEARCH TRIPLE() FROM 2');
		assert.deepEqual(res, [2, 4, 6]);

		done();
	});

	test('4. CHILD() and KEYS() selectors', function (done) {
		var res = alasql('SEARCH CHILD() FROM @[10,20,30]');
		assert.deepEqual(res, [10, 20, 30]);

		var res = alasql('SEARCH CHILD() FROM {a:1,b:2}');
		assert.deepEqual(res, [1, 2]);

		var res = alasql('SEARCH KEYS() FROM @[10,20,30]');
		assert.deepEqual(res, ['0', '1', '2']);

		var res = alasql('SEARCH KEYS() FROM {a:1,b:2}');
		assert.deepEqual(res, ['a', 'b']);

		var res = alasql('SEARCH / name FROM {john:{name:"John"},mary:{name:"Mary"}}');
		assert.deepEqual(res, ['John', 'Mary']);

		var res = alasql('SEARCH / name FROM @[{name:"John",age:25},{name:"Mary",age:18}]');
		assert.deepEqual(res, ['John', 'Mary']);

		done();
	});

	test('4. Test expression', function (done) {
		var res = alasql(
			'SEARCH / where(name = "John") age FROM @[{name:"John",age:25},{name:"Mary",age:18}]'
		);
		assert.deepEqual(res, [25]);

		var res = alasql(
			'SEARCH / where(name = "Mary") age FROM @[{name:"John",age:25},{name:"Mary",age:18}]'
		);
		assert.deepEqual(res, [18]);

		done();
	});

	test('5. Transform expression', function (done) {
		var res = alasql('SEARCH / EX(age*2) FROM @[{name:"John",age:25},{name:"Mary",age:18}]');
		assert.deepEqual(res, [50, 36]);

		// Self variable
		var res = alasql(
			'SEARCH / EX(age+LEN(_->name)) FROM @[{name:"John",age:25},{name:"Mary",age:18}]'
		);
		assert.deepEqual(res, [29, 22]);

		done();
	});

	test('6. AS function ', function (done) {
		var res = alasql(
			'SEARCH / AS @p EX(age+LEN(@p->name)) \
         FROM @[{name:"John",age:25},{name:"Mary",age:18}]'
		);
		assert.deepEqual(res, [29, 22]);

		done();
	});

	test('99. Create database ', function (done) {
		var res = alasql('DROP DATABASE test303');
		done();
	});
});
