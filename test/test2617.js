if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2617 - toString() keeps brackets around table and column names', function () {
	function roundTrip(sql) {
		var once = alasql.parse(sql).toString();
		assert.equal(alasql.parse(once).toString(), once);
		return once;
	}

	it('CREATE TABLE', function () {
		assert.equal(roundTrip('CREATE TABLE [My T] ([a b] INT)'), 'CREATE TABLE [My T] ([a b] INT)');
		assert.equal(roundTrip('CREATE TABLE "My T" ("a b" INT)'), 'CREATE TABLE [My T] ([a b] INT)');
	});

	it('SELECT, INSERT, UPDATE, DELETE and DROP', function () {
		assert.equal(roundTrip('SELECT [a b] FROM [My T]'), 'SELECT [a b] FROM [My T]');
		assert.equal(
			roundTrip('INSERT INTO [My T] ([a b]) VALUES (1)'),
			'INSERT INTO [My T]([a b]) VALUES (1)'
		);
		assert.match(roundTrip('UPDATE [My T] SET [a b] = 2'), /^UPDATE \[My T\] SET/);
		assert.match(roundTrip('DELETE FROM [My T] WHERE [a b] = 2'), /^DELETE FROM \[My T\] WHERE/);
		assert.equal(roundTrip('DROP TABLE [My T]'), 'DROP TABLE [My T]');
	});

	it('plain names stay as they are', function () {
		assert.equal(roundTrip('SELECT a FROM t'), 'SELECT a FROM t');
		assert.equal(roundTrip('CREATE TABLE t (a INT)'), 'CREATE TABLE t (a INT)');
	});

	it('the text runs', function () {
		alasql('CREATE DATABASE test2617; USE test2617');
		alasql(alasql.parse('CREATE TABLE [My T] ([a b] INT)').toString());
		alasql(alasql.parse('INSERT INTO [My T] ([a b]) VALUES (1)').toString());
		assert.deepEqual(alasql(alasql.parse('SELECT [a b] FROM [My T]').toString()), [{'a b': 1}]);
		alasql('DROP DATABASE test2617');
	});
});
