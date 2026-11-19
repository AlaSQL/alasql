if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2824 - CREATE TABLE AS SELECT and SELECT INTO a new table', function () {
	before(function () {
		alasql('CREATE DATABASE test2824; USE test2824');
		alasql('CREATE TABLE src (a INT, b STRING)');
		alasql('INSERT INTO src VALUES (1, "x"), (2, "y")');
	});

	after(function () {
		alasql('DROP DATABASE test2824');
	});

	function columns(tableid) {
		return alasql('SHOW COLUMNS FROM ' + tableid).map(function (c) {
			return c.columnid + ' ' + c.dbtypeid;
		});
	}

	it('A) CREATE TABLE AS SELECT', function () {
		assert.equal(alasql('CREATE TABLE dst AS SELECT * FROM src'), 1);
		assert.deepEqual(alasql('SELECT * FROM dst'), [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
		]);
		assert.deepEqual(columns('dst'), ['a INT', 'b STRING']);
		alasql('INSERT INTO dst VALUES (3, "z")');
		assert.equal(alasql('SELECT COUNT(*) AS n FROM src')[0].n, 2);
	});

	it('B) SELECT INTO a table that does not exist', function () {
		assert.equal(alasql('SELECT * INTO dst2 FROM src'), 2);
		assert.deepEqual(alasql('SELECT * FROM dst2'), [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
		]);
		assert.deepEqual(columns('dst2'), ['a INT', 'b STRING']);
	});

	it('C) without rows, the table still gets the columns', function () {
		alasql('CREATE TABLE e AS SELECT a FROM src WHERE a > 5');
		alasql('SELECT a INTO e2 FROM src WHERE a > 5');
		assert.deepEqual(alasql('SELECT * FROM e'), []);
		assert.deepEqual(columns('e'), ['a INT']);
		assert.deepEqual(columns('e2'), ['a INT']);
	});

	it('D) SELECT INTO an existing table and IF NOT EXISTS are unchanged', function () {
		alasql('CREATE TABLE dst3 (a INT)');
		assert.equal(alasql('SELECT a INTO dst3 FROM src'), 2);
		assert.equal(alasql('CREATE TABLE IF NOT EXISTS dst AS SELECT * FROM src'), 0);
		assert.equal(alasql('SELECT COUNT(*) AS n FROM dst')[0].n, 3);
	});
});
