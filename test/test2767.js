if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2767'; // -x, +x and ABS(x) of NULL are NULL inside an aggregate

describe(`Test ${testId} - -x, +x and ABS(x) of NULL`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE u (x)');
		alasql('INSERT INTO u VALUES (1), (NULL), (3)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) COUNT and AVG skip the NULL row', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT COUNT(x) AS a, COUNT(-x) AS b, COUNT(+x) AS c, COUNT(ABS(x)) AS d, COUNT(DISTINCT -x) AS e FROM u'
			),
			[{a: 2, b: 2, c: 2, d: 2, e: 2}]
		);
		assert.deepStrictEqual(alasql('SELECT AVG(-x) AS a, AVG(ABS(x)) AS b, SUM(-x) AS c FROM u'), [
			{a: -2, b: 2, c: -4},
		]);
	});

	it('B) NULL from parameter data', function () {
		var data = [{x: -1}, {x: null}, {x: undefined}];
		assert.deepStrictEqual(alasql('SELECT COUNT(-x) AS a, COUNT(ABS(x)) AS b FROM ?', [data]), [
			{a: 1, b: 1},
		]);
	});

	it('C) Values and constants as before', function () {
		assert.deepStrictEqual(alasql('SELECT -x AS a, +x AS b, ABS(-x) AS c FROM u'), [
			{a: -1, b: 1, c: 1},
			{a: undefined, b: undefined, c: undefined},
			{a: -3, b: 3, c: 3},
		]);
		assert.deepStrictEqual(alasql('SELECT VALUE -(2 + 3)'), -5);
		assert.deepStrictEqual(alasql('SELECT VALUE COUNT(-NULL)'), 0);
		assert.deepStrictEqual(alasql('SELECT VALUE ABS(-4)'), 4);
	});
});
