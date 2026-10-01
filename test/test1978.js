if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 1978 - LIKE ESCAPE with backslash', function () {
	it('supports backslash as ESCAPE character in utils.like', function (done) {
		assert(alasql.utils.like('%\\%%', '100%', '\\'));
		assert(!alasql.utils.like('%\\%%', '1000', '\\'));

		assert(alasql.utils.like('%\\%%', '100%', '\\\\'));
		assert(!alasql.utils.like('%\\%%', '1000', '\\\\'));

		assert(alasql.utils.like('%\\_%', '100_', '\\'));
		assert(!alasql.utils.like('%\\_%', '1000', '\\'));

		done();
	});

	it('supports backslash ESCAPE in SQL queries', function (done) {
		alasql('CREATE TABLE cities (city string, population string)');

		alasql(
			"INSERT INTO cities VALUES ('%','1'), ('1%','2'), ('%1','3'), ('1%1','4'), ('_1','5'), ('1^1','6'), ('1!1','7')"
		);

		var res = alasql(
			"SELECT * FROM cities WHERE (city LIKE '%\\%%' ESCAPE '\\\\') OR (population LIKE '2\\%' ESCAPE '\\\\') ORDER BY population DESC"
		);

		assert.deepStrictEqual(res, [
			{city: '1%1', population: '4'},
			{city: '%1', population: '3'},
			{city: '1%', population: '2'},
			{city: '%', population: '1'},
		]);

		alasql('DROP TABLE cities');

		done();
	});
});
