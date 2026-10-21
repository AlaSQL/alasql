if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '1978';

describe(`Test ${testId} - LIKE ESCAPE`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE cities (city string, population string)');
		alasql(
			"INSERT INTO cities VALUES ('%','1'), ('1%','2'), ('%1','3'), ('1%1','4'), ('_1','5'), ('1^1','6'), ('1!1','7')"
		);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Backslash as escape character in utils.like', function () {
		const res = [
			alasql.utils.like('%\\%%', '100%', '\\'),
			alasql.utils.like('%\\%%', '100', '\\'),
			alasql.utils.like('%\\_%', '100_', '\\'),
			alasql.utils.like('%\\_%', '1000', '\\'),
		];
		assert.deepStrictEqual(res, [true, false, true, false]);
	});

	it('B) Other escape characters in utils.like', function () {
		const res = [
			alasql.utils.like('%^%%', '100%', '^'),
			alasql.utils.like('%^%%', '100', '^'),
			alasql.utils.like('%!%%', '100%', '!'),
			alasql.utils.like('%!%%', '100', '!'),
			alasql.utils.like('%~_%', '100_', '~'),
			alasql.utils.like('%~_%', '1000', '~'),
		];
		assert.deepStrictEqual(res, [true, false, true, false, true, false]);
	});

	it('C) Backslash ESCAPE in SQL', function () {
		const res = alasql(
			"SELECT * FROM cities WHERE city LIKE '%\\%%' ESCAPE '\\' ORDER BY population DESC"
		);
		assert.deepStrictEqual(res, [
			{city: '1%1', population: '4'},
			{city: '%1', population: '3'},
			{city: '1%', population: '2'},
			{city: '%', population: '1'},
		]);
	});

	it('D) ESCAPE on two LIKE expressions in one query', function () {
		const res = alasql(
			"SELECT * FROM cities WHERE (city LIKE '%^%%' ESCAPE '^') OR (population LIKE '2^%' ESCAPE '^') ORDER BY population DESC"
		);
		assert.deepStrictEqual(res, [
			{city: '1%1', population: '4'},
			{city: '%1', population: '3'},
			{city: '1%', population: '2'},
			{city: '%', population: '1'},
		]);
	});

	it('E) ESCAPE longer than one character is ignored, as in 4.20.1 (an error comes in 5.0)', function () {
		assert.strictEqual(alasql.utils.like('%\\%%', '100%', '\\\\'), false);
		assert.strictEqual(alasql.utils.like('%^%%', '100%', '^^'), true);
		assert.strictEqual(
			alasql("SELECT * FROM cities WHERE city LIKE '%^%%' ESCAPE '^^'").length,
			7 // every row
		);
		assert.deepStrictEqual(
			alasql("SELECT * FROM cities WHERE city LIKE '%\\%%' ESCAPE '\\\\'"),
			[]
		);
	});

	it('F) Same pattern with and without ESCAPE', function () {
		const res = [
			alasql("SELECT city FROM cities WHERE city LIKE '%!%%' ORDER BY population"),
			alasql("SELECT city FROM cities WHERE city LIKE '%!%%' ESCAPE '!' ORDER BY population"),
			alasql("SELECT city FROM cities WHERE city LIKE '%!%%' ORDER BY population"),
		];
		assert.deepStrictEqual(res, [
			[{city: '1!1'}],
			[{city: '%'}, {city: '1%'}, {city: '%1'}, {city: '1%1'}],
			[{city: '1!1'}],
		]);
	});
});
