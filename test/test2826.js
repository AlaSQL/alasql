if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2826 - RETURNING after INSERT, UPDATE and DELETE', function () {
	before(function () {
		alasql('CREATE DATABASE test2826; USE test2826');
		alasql('CREATE TABLE rt (k INT, v STRING)');
	});

	after(function () {
		alasql('DROP DATABASE test2826');
	});

	it('INSERT returns the new rows', function () {
		assert.deepEqual(alasql("INSERT INTO rt VALUES (1, 'a') RETURNING *"), [{k: 1, v: 'a'}]);
		assert.deepEqual(alasql("INSERT INTO rt VALUES (2, 'b') RETURNING k AS id"), [{id: 2}]);
	});

	it('UPDATE returns the changed rows with the new values', function () {
		assert.deepEqual(alasql("UPDATE rt SET v = 'c' WHERE k = 2 RETURNING k, v"), [{k: 2, v: 'c'}]);
	});

	it('DELETE returns the deleted rows', function () {
		assert.deepEqual(alasql('DELETE FROM rt WHERE k = 2 RETURNING k'), [{k: 2}]);
		assert.deepEqual(alasql('SELECT * FROM rt'), [{k: 1, v: 'a'}]);
	});

	it('toString', function () {
		assert.equal(
			alasql.parse('DELETE FROM rt WHERE k = 2 RETURNING k').toString(),
			'DELETE FROM rt WHERE k = 2 RETURNING k'
		);
	});

	it('returning stays usable as a name', function () {
		alasql('CREATE TABLE r2 (returning INT)');
		alasql('INSERT INTO r2 VALUES (7)');
		assert.deepEqual(alasql('SELECT returning FROM r2'), [{returning: 7}]);
	});
});
