if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2803'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - UNIQUE (subquery) predicate`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE s (g INT)');
		alasql('INSERT INTO s VALUES (1), (1), (2)');
		alasql('CREATE TABLE n (g INT, h INT)');
		alasql('INSERT INTO n VALUES (1, NULL), (1, NULL), (2, 3)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// NOTE: Always assert.deepStrictEqual the final and complete output of the last call to alasql

	it('A) UNIQUE and NOT UNIQUE from the issue', function () {
		let res = [];
		res.push(alasql('SELECT COUNT(*) AS n FROM s WHERE UNIQUE (SELECT g FROM s)'));
		res.push(alasql('SELECT COUNT(*) AS n FROM s WHERE NOT UNIQUE (SELECT g FROM s)'));
		assert.deepStrictEqual(res, [[{n: 0}], [{n: 3}]]);
	});

	it('B) rows with a NULL never count as equal', function () {
		assert.deepStrictEqual(
			alasql('SELECT COUNT(*) AS n FROM s WHERE unique (select g, h from n)'),
			[{n: 3}]
		);
	});

	it('C) correlated subquery', function () {
		assert.deepStrictEqual(
			alasql('SELECT DISTINCT a.g FROM s a WHERE UNIQUE (SELECT b.g FROM s b WHERE b.g = a.g)'),
			[{g: 2}]
		);
	});

	it('D) SELECT UNIQUE is still the modifier', function () {
		assert.deepStrictEqual(alasql('SELECT UNIQUE g FROM s'), [{g: 1}, {g: 2}]);
	});
});
