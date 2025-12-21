if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2239 - Limit the impact of using the keyword: CONTENT', function () {
	const test = '2239';

	before(function () {
		alasql('CREATE DATABASE test' + test);
		alasql('USE test' + test);
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	// NOTE: Tests should use assert.deepEqual to verify the complete expected output
	// against the actual result object. This ensures comprehensive validation and
	// makes test failures more informative by showing the full diff.

	it('A) CONTENT as table name - CREATE and SELECT', function () {
		var res = alasql('CREATE TABLE content (id INT, name STRING)');
		assert.equal(res, 1);

		res = alasql('INSERT INTO content VALUES (1, "Alice"), (2, "Bob")');
		assert.equal(res, 2);

		res = alasql('SELECT * FROM content ORDER BY id');
		assert.deepEqual(res, [
			{id: 1, name: 'Alice'},
			{id: 2, name: 'Bob'},
		]);

		res = alasql('DROP TABLE content');
		assert.equal(res, 1);
	});

	it('B) CONTENT as column name - CREATE and SELECT', function () {
		var res = alasql('CREATE TABLE test_table (id INT, content STRING)');
		assert.equal(res, 1);

		res = alasql('INSERT INTO test_table VALUES (1, "Some content"), (2, "More content")');
		assert.equal(res, 2);

		res = alasql('SELECT content FROM test_table ORDER BY id');
		assert.deepEqual(res, [{content: 'Some content'}, {content: 'More content'}]);

		res = alasql('SELECT id, content FROM test_table WHERE content = "Some content"');
		assert.deepEqual(res, [{id: 1, content: 'Some content'}]);

		res = alasql('DROP TABLE test_table');
		assert.equal(res, 1);
	});

	it('C) CONTENT as both table and column name', function () {
		var res = alasql('CREATE TABLE content (id INT, content STRING)');
		assert.equal(res, 1);

		res = alasql('INSERT INTO content VALUES (1, "Test"), (2, "Data")');
		assert.equal(res, 2);

		res = alasql('SELECT content FROM content ORDER BY id');
		assert.deepEqual(res, [{content: 'Test'}, {content: 'Data'}]);

		res = alasql('SELECT content.content FROM content WHERE id = 1');
		assert.deepEqual(res, [{content: 'Test'}]);

		res = alasql('DROP TABLE content');
		assert.equal(res, 1);
	});

	it('D) CONTENT keyword in CREATE VERTEX SET (existing functionality)', function () {
		// This should still work - CONTENT is a keyword in graph operations
		var res = alasql('CREATE CLASS Person');
		assert.equal(res, 1);

		// Using SET (not CONTENT keyword, but for comparison)
		res = alasql('CREATE VERTEX Person SET name = "John", age = 30');
		assert.ok(res); // Returns a vertex reference

		// Clean up
		res = alasql('DROP CLASS Person');
		assert.equal(res, 1);
	});

	it('E) CONTENT keyword in CREATE VERTEX CONTENT (existing functionality)', function () {
		// This should still work - CONTENT is a keyword in graph operations
		var res = alasql('CREATE CLASS Person');
		assert.equal(res, 1);

		// Using CONTENT keyword in its proper context
		res = alasql('CREATE VERTEX Person CONTENT {name:"Alice",age:25}');
		assert.ok(res); // Returns a vertex reference

		// Clean up
		res = alasql('DROP CLASS Person');
		assert.equal(res, 1);
	});

	it('F) CONTENT as alias in SELECT', function () {
		var res = alasql('CREATE TABLE data (id INT, text STRING)');
		assert.equal(res, 1);

		res = alasql('INSERT INTO data VALUES (1, "Hello"), (2, "World")');
		assert.equal(res, 2);

		res = alasql('SELECT text AS content FROM data ORDER BY id');
		assert.deepEqual(res, [{content: 'Hello'}, {content: 'World'}]);

		res = alasql('DROP TABLE data');
		assert.equal(res, 1);
	});

	it('G) CONTENT in JOIN operations', function () {
		var res = alasql('CREATE TABLE content (id INT, text STRING)');
		assert.equal(res, 1);

		res = alasql('CREATE TABLE other (id INT, data STRING)');
		assert.equal(res, 1);

		res = alasql('INSERT INTO content VALUES (1, "A"), (2, "B")');
		assert.equal(res, 2);

		res = alasql('INSERT INTO other VALUES (1, "X"), (2, "Y")');
		assert.equal(res, 2);

		res = alasql(
			'SELECT content.text, other.data FROM content JOIN other ON content.id = other.id ORDER BY content.id'
		);
		assert.deepEqual(res, [
			{text: 'A', data: 'X'},
			{text: 'B', data: 'Y'},
		]);

		res = alasql('DROP TABLE content');
		assert.equal(res, 1);

		res = alasql('DROP TABLE other');
		assert.equal(res, 1);
	});

	it('H) CONTENT in GROUP BY and aggregate functions', function () {
		var res = alasql('CREATE TABLE content (id INT, content STRING, amount INT)');
		assert.equal(res, 1);

		res = alasql(
			'INSERT INTO content VALUES (1, "Type A", 10), (2, "Type A", 20), (3, "Type B", 15)'
		);
		assert.equal(res, 3);

		res = alasql(
			'SELECT content, SUM(amount) as sum_amount FROM content GROUP BY content ORDER BY content'
		);
		assert.deepEqual(res, [
			{content: 'Type A', sum_amount: 30},
			{content: 'Type B', sum_amount: 15},
		]);

		res = alasql('DROP TABLE content');
		assert.equal(res, 1);
	});

	it('I) CONTENT in UPDATE and DELETE operations', function () {
		var res = alasql('CREATE TABLE content (id INT, content STRING)');
		assert.equal(res, 1);

		res = alasql('INSERT INTO content VALUES (1, "Old"), (2, "Data")');
		assert.equal(res, 2);

		res = alasql('UPDATE content SET content = "New" WHERE id = 1');
		assert.equal(res, 1);

		res = alasql('SELECT * FROM content WHERE id = 1');
		assert.deepEqual(res, [{id: 1, content: 'New'}]);

		res = alasql('DELETE FROM content WHERE content = "Data"');
		assert.equal(res, 1);

		res = alasql('SELECT COUNT(*) as cnt FROM content');
		assert.deepEqual(res, [{cnt: 1}]);

		res = alasql('DROP TABLE content');
		assert.equal(res, 1);
	});

	it('J) CONTENT with subqueries', function () {
		var res = alasql('CREATE TABLE content (id INT, amount INT)');
		assert.equal(res, 1);

		res = alasql('INSERT INTO content VALUES (1, 100), (2, 200), (3, 150)');
		assert.equal(res, 3);

		res = alasql(
			'SELECT * FROM content WHERE amount > (SELECT AVG(amount) FROM content) ORDER BY id'
		);
		assert.deepEqual(res, [{id: 2, amount: 200}]);

		res = alasql('DROP TABLE content');
		assert.equal(res, 1);
	});
});
