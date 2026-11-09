const alasql = require('../');
const assert = require('assert');

describe('Test JOIN index cache invalidation on UPDATE (#2919)', function () {
	before(function () {
		alasql('CREATE DATABASE test2919; USE test2919;');
	});

	after(function () {
		alasql('DROP DATABASE test2919;');
	});

	it('should invalidate join index cache after UPDATE statement', function () {
		alasql('CREATE TABLE a (id INT)');
		alasql('CREATE TABLE b (id INT, v INT)');

		alasql.tables.a.data = [{id: 1}, {id: 2}];
		alasql.tables.b.data = [
			{id: 1, v: 10},
			{id: 2, v: 20},
		];

		const res1 = alasql('SELECT a.id, b.v FROM a JOIN b ON a.id = b.id');
		assert.deepEqual(res1, [
			{id: 1, v: 10},
			{id: 2, v: 20},
		]);

		alasql('UPDATE b SET id = 3 WHERE id = 2');

		const res2 = alasql('SELECT a.id, b.v FROM a JOIN b ON a.id = b.id');

		assert.deepEqual(res2, [{id: 1, v: 10}]);
	});
});
