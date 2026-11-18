const alasql = require('../');
const assert = require('assert');

describe('Test JOIN on a view after its base table changes (#3065)', function () {
	before(function () {
		alasql('CREATE DATABASE test3065; USE test3065;');
	});

	after(function () {
		alasql('DROP DATABASE test3065;');
	});

	beforeEach(function () {
		alasql('CREATE TABLE a (f1 INT); INSERT INTO a VALUES (1), (2)');
		alasql('CREATE TABLE b (f2 INT); INSERT INTO b VALUES (1), (2)');
		alasql('CREATE VIEW v AS SELECT f2 FROM b');
	});

	afterEach(function () {
		alasql('DROP TABLE a; DROP TABLE b; DROP VIEW v;');
	});

	it('should see rows inserted into the base table after the first JOIN', function () {
		assert.deepStrictEqual(alasql('SELECT * FROM a JOIN v ON f1 = f2'), [
			{f1: 1, f2: 1},
			{f1: 2, f2: 2},
		]);

		alasql('INSERT INTO b VALUES (3)');
		alasql('INSERT INTO a VALUES (3)');

		assert.deepStrictEqual(alasql('SELECT * FROM a JOIN v ON f1 = f2'), [
			{f1: 1, f2: 1},
			{f1: 2, f2: 2},
			{f1: 3, f2: 3},
		]);
	});

	it('should not see rows deleted from the base table after the first JOIN', function () {
		assert.deepStrictEqual(alasql('SELECT * FROM a JOIN v ON f1 = f2'), [
			{f1: 1, f2: 1},
			{f1: 2, f2: 2},
		]);

		alasql('DELETE FROM b WHERE f2 = 2');

		assert.deepStrictEqual(alasql('SELECT * FROM a JOIN v ON f1 = f2'), [{f1: 1, f2: 1}]);
	});

	it('should see rows updated in the base table after the first JOIN', function () {
		assert.deepStrictEqual(alasql('SELECT * FROM a JOIN v ON f1 = f2'), [
			{f1: 1, f2: 1},
			{f1: 2, f2: 2},
		]);

		alasql('UPDATE b SET f2 = 3 WHERE f2 = 2');

		assert.deepStrictEqual(alasql('SELECT * FROM a JOIN v ON f1 = f2'), [{f1: 1, f2: 1}]);
	});
});
