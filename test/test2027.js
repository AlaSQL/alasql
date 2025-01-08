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
		alasql('SELECT * FROM osoby');

		assert.deepEqual(alasql.databases["test"].sqlCache["-169125189"].query.data, []);

		// Execute same query from cache again, the cache is hit now
		alasql('SELECT * FROM osoby');

		// Cache should still be empty for "data"
		assert.deepEqual(alasql.databases["test"].sqlCache["-169125189"].query.data, []);
	});
});
