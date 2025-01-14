const alasql = require('../dist/alasql.js');

if (typeof exports === 'object') {
	var assert = require('assert');
}

describe('Test 2007 - SQL cache', function () {
	before(function () {
		alasql('create database test');
		alasql('use test');
	});

	after(function () {
		alasql('drop database test');
	});

	it('A) Execute query and assert cache for `data` afterwards', () => {
		alasql('CREATE TABLE osoby (id INT, meno STRING)');
		alasql('INSERT INTO osoby VALUES (1, "John"), (2, "Jane"), (3, "Jake")');
		var res = alasql('SELECT * FROM osoby');

		assert.deepEqual(alasql.databases["test"].sqlCache["-169125189"].query.data, []);
		assert.equal(res.length, 3);

		// Delete all rows
		alasql('DELETE FROM osoby');

		// Assert that the cache is still empty for "data"
		// Without the fix, the cache would still contain the data from the previous query even though all rows were deleted
		assert.deepEqual(alasql.databases["test"].sqlCache["-169125189"].query.data, []);

		// Insert more rows
		alasql('INSERT INTO osoby VALUES (4, "Jack"), (5, "Paul")');

		// Execute same query from cache again, the cache is hit now
		var res2 = alasql('SELECT * FROM osoby');

		// Cache should still be empty for "data"
		assert.deepEqual(alasql.databases["test"].sqlCache["-169125189"].query.data, []);
		assert.equal(res2.length, 2);
	});
});
