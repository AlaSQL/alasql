if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2644 - correlated subquery with an unqualified outer column', function () {
	before(function () {
		alasql('CREATE DATABASE test2644; USE test2644');
		alasql('CREATE TABLE a (id INT, ak INT); INSERT INTO a VALUES (1, 1), (2, 2), (3, 1)');
		alasql('CREATE TABLE b (id INT, bk INT); INSERT INTO b VALUES (1, 1), (2, 2), (3, 2)');
	});

	after(function () {
		alasql('DROP DATABASE test2644');
	});

	it('A) qualified outer column still works', function () {
		var res = alasql('SELECT id FROM a WHERE id IN (SELECT b.id FROM b WHERE b.bk = a.ak)');
		assert.deepEqual(res, [{id: 1}, {id: 2}]);
	});

	it('B) IN with an unqualified outer column', function () {
		var res = alasql('SELECT id FROM a WHERE id IN (SELECT b.id FROM b WHERE bk = ak)');
		assert.deepEqual(res, [{id: 1}, {id: 2}]);
	});

	it('C) NOT IN', function () {
		var res = alasql('SELECT id FROM a WHERE id NOT IN (SELECT b.id FROM b WHERE bk = ak)');
		assert.deepEqual(res, [{id: 3}]);
	});

	it('D) EXISTS', function () {
		var res = alasql('SELECT id FROM a WHERE EXISTS (SELECT * FROM b WHERE bk = ak AND b.id = 3)');
		assert.deepEqual(res, [{id: 2}]);
	});

	it('E) scalar subquery in the select list', function () {
		var res = alasql('SELECT id, (SELECT COUNT(*) FROM b WHERE bk = ak) AS n FROM a');
		assert.deepEqual(res, [
			{id: 1, n: 1},
			{id: 2, n: 2},
			{id: 3, n: 1},
		]);
	});

	it('F) a name both queries have resolves to the subquery', function () {
		var res = alasql('SELECT id FROM a WHERE id IN (SELECT id FROM b WHERE bk = ak)');
		assert.deepEqual(res, [{id: 1}, {id: 2}]);
	});
});
