if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2222 - PATH keyword limitations', function () {
	const test = '2222'; // insert test file number

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	// NOTE: Tests should use assert.deepEqual to verify the complete expected output
	// against the actual result object. This ensures comprehensive validation and
	// makes test failures more informative by showing the full diff.

	describe('PATH as table name', function () {
		it('A) CREATE TABLE with name "path"', function () {
			var res = alasql('CREATE TABLE path (id INT, data STRING)');
			assert.equal(res, 1);
		});

		it('B) INSERT INTO table named "path"', function () {
			var res = alasql('INSERT INTO path VALUES (1, "test1"), (2, "test2")');
			assert.equal(res, 2);
		});

		it('C) SELECT FROM table named "path"', function () {
			var res = alasql('SELECT * FROM path ORDER BY id');
			assert.deepEqual(res, [
				{id: 1, data: 'test1'},
				{id: 2, data: 'test2'},
			]);
		});

		it('D) UPDATE table named "path"', function () {
			var res = alasql('UPDATE path SET data = "updated" WHERE id = 1');
			assert.equal(res, 1);
			var check = alasql('SELECT data FROM path WHERE id = 1');
			assert.deepEqual(check, [{data: 'updated'}]);
		});

		it('E) DELETE FROM table named "path"', function () {
			var res = alasql('DELETE FROM path WHERE id = 2');
			assert.equal(res, 1);
		});

		it('F) DROP TABLE named "path"', function () {
			var res = alasql('DROP TABLE path');
			assert.equal(res, 1);
		});
	});

	describe('PATH as column name', function () {
		it('A) CREATE TABLE with "path" column', function () {
			var res = alasql('CREATE TABLE files (id INT, path STRING, size INT)');
			assert.equal(res, 1);
		});

		it('B) INSERT with "path" column', function () {
			var res = alasql(
				'INSERT INTO files VALUES (1, "/home/user", 100), (2, "/tmp", 200), (3, "/var/log", 300)'
			);
			assert.equal(res, 3);
		});

		it('C) SELECT "path" column', function () {
			var res = alasql('SELECT path FROM files ORDER BY id');
			assert.deepEqual(res, [{path: '/home/user'}, {path: '/tmp'}, {path: '/var/log'}]);
		});

		it('D) WHERE clause with "path" column', function () {
			var res = alasql('SELECT * FROM files WHERE path = "/tmp"');
			assert.deepEqual(res, [{id: 2, path: '/tmp', size: 200}]);
		});

		it('E) ORDER BY "path" column', function () {
			var res = alasql('SELECT path FROM files ORDER BY path');
			assert.deepEqual(res, [{path: '/home/user'}, {path: '/tmp'}, {path: '/var/log'}]);
		});

		it('F) GROUP BY "path" column', function () {
			alasql('INSERT INTO files VALUES (4, "/tmp", 150)');
			var res = alasql('SELECT path, SUM(size) as sumsize FROM files GROUP BY path');
			assert.equal(res.length, 3);
			var tmpRow = res.find(r => r.path === '/tmp');
			assert.equal(tmpRow.sumsize, 350); // 200 + 150
		});

		it('Z) Cleanup', function () {
			alasql('DROP TABLE files');
		});
	});

	describe('PATH as column alias', function () {
		it('A) SELECT with "path" as alias', function () {
			var res = alasql('SELECT 1 as path');
			assert.deepEqual(res, [{path: 1}]);
		});

		it('B) SELECT with "path" alias from data', function () {
			var data = [{location: '/home'}, {location: '/tmp'}];
			var res = alasql('SELECT location as path FROM ?', [data]);
			assert.deepEqual(res, [{path: '/home'}, {path: '/tmp'}]);
		});
	});

	describe('PATH in parameter queries', function () {
		it('A) Query with "path" column from parameter array', function () {
			var data = [
				{id: 1, path: '/a'},
				{id: 2, path: '/b'},
			];
			var res = alasql('SELECT path FROM ?', [data]);
			assert.deepEqual(res, [{path: '/a'}, {path: '/b'}]);
		});

		it('B) WHERE clause with "path" column from parameters', function () {
			var data = [
				{id: 1, path: '/a'},
				{id: 2, path: '/b'},
			];
			var res = alasql('SELECT * FROM ? WHERE path = ?', [data, '/a']);
			assert.deepEqual(res, [{id: 1, path: '/a'}]);
		});

		it('C) ORDER BY "path" from parameters', function () {
			var data = [{path: 'z'}, {path: 'a'}, {path: 'm'}];
			var res = alasql('SELECT path FROM ? ORDER BY path', [data]);
			assert.deepEqual(res, [{path: 'a'}, {path: 'm'}, {path: 'z'}]);
		});
	});

	describe('PATH in graph search (should continue to work)', function () {
		before(function () {
			alasql('CREATE DATABASE test_graph_path; USE test_graph_path');
		});

		after(function () {
			alasql('DROP DATABASE test_graph_path');
		});

		it('A) PATH selector in SEARCH query', function () {
			alasql(
				'CREATE GRAPH Napoleon, Josephine, Pablo, \
        #Napoleon > "loves" > #Josephine, \
        #Josephine > "knows" > #Pablo'
			);

			var res = alasql('SEARCH PATH(#Josephine) name FROM #Napoleon');
			assert.deepEqual(res, ['loves', 'Josephine']);
		});

		it('B) PATH with EDGE selector', function () {
			var res = alasql('SEARCH PATH(#Josephine) EDGE name FROM #Napoleon');
			assert.deepEqual(res, ['loves']);
		});

		it('C) PATH to find longer paths', function () {
			var res = alasql('SEARCH PATH(#Pablo) name FROM #Napoleon');
			assert.deepEqual(res, ['loves', 'Josephine', 'knows', 'Pablo']);
		});

		it('D) PATH within DISTINCT', function () {
			alasql('CREATE GRAPH Alice, Bob, #Alice >> #Bob, #Alice >> #Bob');
			var res = alasql('SEARCH DISTINCT(PATH(#Bob) name) FROM #Alice');
			// Should work even with PATH inside DISTINCT
			assert(Array.isArray(res));
		});
	});

	describe('PATH keyword edge cases', function () {
		it('A) Mixed case variations', function () {
			// Test that PATH works with different casing (if case-insensitive mode)
			var data = [{PATH: 'value1'}, {Path: 'value2'}, {path: 'value3'}];
			var res = alasql('SELECT * FROM ?', [data]);
			assert.equal(res.length, 3);
		});

		it('B) PATH in JOIN', function () {
			alasql('CREATE TABLE t1 (id INT, path STRING)');
			alasql('CREATE TABLE t2 (id INT, path STRING)');
			alasql('INSERT INTO t1 VALUES (1, "/a")');
			alasql('INSERT INTO t2 VALUES (1, "/b")');

			var res = alasql(
				'SELECT t1.path as path1, t2.path as path2 FROM t1 JOIN t2 ON t1.id = t2.id'
			);
			assert.deepEqual(res, [{path1: '/a', path2: '/b'}]);

			alasql('DROP TABLE t1');
			alasql('DROP TABLE t2');
		});

		it('C) PATH in subquery', function () {
			var data = [
				{id: 1, path: '/x'},
				{id: 2, path: '/y'},
			];
			var res = alasql('SELECT path FROM (SELECT path FROM ?) WHERE path = "/x"', [data]);
			assert.deepEqual(res, [{path: '/x'}]);
		});

		it('D) PATH in UNION', function () {
			var data1 = [{path: 'a'}];
			var data2 = [{path: 'b'}];
			var res = alasql('SELECT path FROM ? UNION SELECT path FROM ?', [data1, data2]);
			assert.equal(res.length, 2);
		});
	});
});
