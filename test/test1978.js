if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 1978 - LIKE ESCAPE with backslash', function () {
	it('supports backslash as ESCAPE character in utils.like', function (done) {
		// Single backslash escape (the correct runtime value)
		assert(alasql.utils.like('%\\%%', '100%', '\\'));
		assert(!alasql.utils.like('%\\%%', '100', '\\'));

		// Double backslash (arrives from parser escaping layer)
		assert(alasql.utils.like('%\\%%', '100%', '\\\\'));
		assert(!alasql.utils.like('%\\%%', '1000', '\\\\'));

		// Triple and quadruple backslashes (additional escaping layers)
		assert(alasql.utils.like('%\\%%', '100%', '\\\\\\'));
		assert(!alasql.utils.like('%\\%%', '1000', '\\\\\\'));

		assert(alasql.utils.like('%\\%%', '100%', '\\\\\\\\'));
		assert(!alasql.utils.like('%\\%%', '1000', '\\\\\\\\'));

		// Underscore wildcard escaping with backslash
		assert(alasql.utils.like('%\\_%', '100_', '\\'));
		assert(!alasql.utils.like('%\\_%', '1000', '\\'));

		assert(alasql.utils.like('%\\_%', '100_', '\\\\'));
		assert(!alasql.utils.like('%\\_%', '1000', '\\\\'));

		done();
	});

	it('supports non-backslash ESCAPE characters in utils.like', function (done) {
		// Caret escape
		assert(alasql.utils.like('%^%%', '100%', '^'));
		assert(!alasql.utils.like('%^%%', '100', '^'));

		// Exclamation mark escape
		assert(alasql.utils.like('%!%%', '100%', '!'));
		assert(!alasql.utils.like('%!%%', '100', '!'));

		// Tilde escape
		assert(alasql.utils.like('%~_%', '100_', '~'));
		assert(!alasql.utils.like('%~_%', '1000', '~'));

		done();
	});

	it('supports backslash ESCAPE in SQL queries', function (done) {
		alasql('CREATE TABLE cities1978 (city string, population string)');

		alasql(
			"INSERT INTO cities1978 VALUES ('%','1'), ('1%','2'), ('%1','3'), ('1%1','4'), ('_1','5'), ('1^1','6'), ('1!1','7')"
		);

		// Using backslash ESCAPE in SQL with two LIKE columns (the original issue)
		var res = alasql(
			"SELECT * FROM cities1978 WHERE (city LIKE '%\\%%' ESCAPE '\\\\') OR (population LIKE '2\\%' ESCAPE '\\\\') ORDER BY population DESC"
		);

		assert.deepStrictEqual(res, [
			{city: '1%1', population: '4'},
			{city: '%1', population: '3'},
			{city: '1%', population: '2'},
			{city: '%', population: '1'},
		]);

		// Also verify with quadruple backslashes in SQL ESCAPE
		var resQuad = alasql(
			"SELECT * FROM cities1978 WHERE (city LIKE '%\\%%' ESCAPE '\\\\\\\\') OR (population LIKE '2\\%' ESCAPE '\\\\\\\\') ORDER BY population DESC"
		);

		assert.deepStrictEqual(resQuad, [
			{city: '1%1', population: '4'},
			{city: '%1', population: '3'},
			{city: '1%', population: '2'},
			{city: '%', population: '1'},
		]);

		// Using caret ESCAPE (should also work with multiple LIKE columns)
		var res2 = alasql(
			"SELECT * FROM cities1978 WHERE (city LIKE '%^%%' ESCAPE '^') OR (population LIKE '2^%' ESCAPE '^') ORDER BY population DESC"
		);

		assert.deepStrictEqual(res2, [
			{city: '1%1', population: '4'},
			{city: '%1', population: '3'},
			{city: '1%', population: '2'},
			{city: '%', population: '1'},
		]);

		alasql('DROP TABLE cities1978');

		done();
	});
});
