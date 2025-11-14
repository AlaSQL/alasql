// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 308 sub SEARCH', function () {
	test.skip('1. Create database ', function (done) {
		alasql('CREATE DATABASE test308;USE test308');
		done();
	});

	test.skip('2. SET selector', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		var res = alasql('SET @q = (SEARCH / b FROM ?)', [data]);
		assert.deepEqual(alasql.vars.q, [10, 20]);
		done();
	});

	test.skip('3. SUM and other aggregators', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
			{a: 2, b: 30},
		];
		var res = alasql('SEARCH SUM(/b) FROM ?', [data]);
		assert.deepEqual(res, [60]);
		var res = alasql('SEARCH AVG(/b) FROM ?', [data]);
		assert.deepEqual(res, [20]);
		var res = alasql('SEARCH ARRAY(/b) FROM ?', [data]);
		assert.deepEqual(res, [[10, 20, 30]]);
		var res = alasql('SEARCH ARRAY(/b) @(LEN(_))FROM ?', [data]);
		assert.deepEqual(res, [3]);
		var res = alasql('SEARCH COUNT(/b) FROM ?', [data]);
		assert.deepEqual(res, [3]);
		var res = alasql('SEARCH MIN(/b) FROM ?', [data]);
		assert.deepEqual(res, [10]);
		var res = alasql('SEARCH MAX(/b) FROM ?', [data]);
		assert.deepEqual(res, [30]);
		var res = alasql('SEARCH FIRST(/b) FROM ?', [data]);
		assert.deepEqual(res, [10]);
		var res = alasql('SEARCH LAST(/b) FROM ?', [data]);
		assert.deepEqual(res, [30]);
		done();
	});

	test.skip('4. SUM with nested selector', function (done) {
		var data = [{a: 1, b: {c: 100}}, {a: 2}, {a: 2, b: {c: 300}}];
		var res = alasql('SEARCH SUM(/b c) FROM ?', [data]);
		assert.deepEqual(res, [400]);
		done();
	});

	test.skip('5. Complex SUM with tree selector', function (done) {
		var data = [{a: 1, b: {c: 100}}, {c: 200}, {a: 2, b: {d: [{c: 300}]}}];
		var res = alasql('SEARCH SUM((/)*c) FROM ?', [data]);
		assert.deepEqual(res, [600]);
		done();
	});

	test.skip('6. SUM over graph', function (done) {
		alasql('SET @olga = (CREATE VERTEX "Olga" SET age=19)');
		alasql('SET @helen = (CREATE VERTEX "Helen" SET age=42)');
		alasql('SET @pablo = (CREATE VERTEX "Pablo" SET age=35)');
		alasql('SET @andrey = (CREATE VERTEX "Andrey" SET age=44)');
		alasql('SET @sofia = (CREATE VERTEX "Sofia" SET age=23)');
		alasql('CREATE EDGE FROM @olga TO @pablo');
		alasql('CREATE EDGE FROM @helen TO @andrey');
		alasql('CREATE EDGE FROM @pablo TO @sofia');
		alasql('CREATE EDGE FROM @andrey TO @sofia');
		done();
	});
	test.skip('7. SUM over graph', function (done) {
		var res = alasql('SEARCH SUM(/ "Olga" (>>)+ age)');
		//    console.log(res);
		assert.deepEqual(res, [58]);
		done();
	});
	test.skip('8. SUM over graph', function (done) {
		var res = alasql('SEARCH / "Olga" SUM((>>)+ age)');
		//    console.log(res);
		assert.deepEqual(res, [58]);
		done();
	});
	test.skip('9. SUM over graph', function (done) {
		var res = alasql('SEARCH COUNT(/ "Olga" (>>)+ age)');
		//    console.log(res);
		assert.deepEqual(res, [2]);
		done();
	});
	test.skip('10. SUM over graph', function (done) {
		var res = alasql(
			'SEARCH / AS @person \
      SUM((>>)+ age) AS @age \
      WHERE(@age > 50) \
      @person RETURNS(name,@age AS age)'
		);
		assert.deepEqual(res, [
			{name: 'Olga', age: 58},
			{name: 'Helen', age: 67},
		]);
		done();
	});
	test.skip('11. SUM over graph', function (done) {
		var res = alasql(
			'SEARCH / AS @person \
      COUNT((>>)+ age) AS @n \
      WHERE(@n > 1) \
      @(@person->name)'
		);
		assert.deepEqual(res, ['Olga', 'Helen']);

		//   console.log(res);
		//    assert.deepEqual(res, [58]);

		done();
	});

	test.skip('99. Drop database ', function (done) {
		alasql('DROP DATABASE test308');
		done();
	});
});
