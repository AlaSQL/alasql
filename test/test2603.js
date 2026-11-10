if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2603';

describe(`Test ${testId} - Statement cache after DROP TABLE and CREATE TABLE`, function () {
	let dbCount = 0;

	// Run fn in a new database and return its result
	function inNewDatabase(fn) {
		const dbid = 'test' + testId + '_' + dbCount++;
		alasql('create database ' + dbid);
		alasql('use ' + dbid);
		try {
			return fn(alasql.databases[dbid]);
		} finally {
			alasql('use alasql');
			alasql('drop database ' + dbid);
		}
	}

	// Return the results of fn with the statement cache on and off
	function withCacheOnAndOff(fn) {
		const results = [];
		for (const cache of [true, false]) {
			alasql.options.cache = cache;
			try {
				results.push(inNewDatabase(fn));
			} finally {
				alasql.options.cache = true;
			}
		}
		return results;
	}

	it('A) SELECT after DROP TABLE and CREATE TABLE with more columns', function () {
		const results = withCacheOnAndOff(function () {
			alasql('CREATE TABLE x (a INT)');
			alasql('INSERT INTO x VALUES (1)');
			alasql('SELECT * FROM x');

			alasql('DROP TABLE x');
			alasql('CREATE TABLE x (a INT, b INT)');
			alasql('INSERT INTO x (a,b) VALUES (1,2)');
			return alasql('SELECT * FROM x');
		});
		assert.deepStrictEqual(results, [[{a: 1, b: 2}], [{a: 1, b: 2}]]);
	});

	it('B) INSERT after DROP TABLE and CREATE TABLE with another column type', function () {
		const [cached, uncached] = withCacheOnAndOff(function (db) {
			alasql('CREATE TABLE y (b INT)');
			alasql('INSERT INTO y VALUES (NULL)');

			alasql('DROP TABLE y');
			alasql('CREATE TABLE y (b STRING)');
			alasql('INSERT INTO y VALUES (NULL)');
			return db.tables.y.data.map(r => r.b);
		});
		assert.deepStrictEqual(cached, uncached);
		assert.strictEqual(cached[0], undefined);
	});

	it('C) SELECT from a view after DROP VIEW and CREATE VIEW', function () {
		const results = withCacheOnAndOff(function () {
			alasql('CREATE TABLE t (a INT, b INT)');
			alasql('INSERT INTO t VALUES (1,2)');
			alasql('CREATE VIEW v AS SELECT a FROM t');
			alasql('SELECT * FROM v');

			alasql('DROP VIEW v');
			alasql('CREATE VIEW v AS SELECT b FROM t');
			return alasql('SELECT * FROM v');
		});
		assert.deepStrictEqual(results, [[{b: 2}], [{b: 2}]]);
	});

	it('D) Schema statements change dbversion, so cached statements are compiled again', function () {
		inNewDatabase(function (db) {
			let version = db.dbversion;
			const changed = function () {
				const result = db.dbversion !== version;
				version = db.dbversion;
				return result;
			};

			alasql('CREATE TABLE z (a INT)');
			assert.ok(changed(), 'CREATE TABLE');
			alasql('INSERT INTO z VALUES (1)');
			alasql('SELECT * FROM z');
			assert.ok(!changed(), 'INSERT and SELECT do not change the schema');
			alasql('CREATE INDEX iz ON z (a)');
			assert.ok(changed(), 'CREATE INDEX');
			alasql('DROP TABLE z');
			assert.ok(changed(), 'DROP TABLE');
		});
	});

	it('E) ALTER TABLE in the same millisecond does not bring back an old cached statement', function () {
		const now = Date.now;
		Date.now = () => 1000;
		try {
			const res = inNewDatabase(function () {
				alasql('CREATE TABLE q (z INT)');
				alasql('CREATE TABLE x (a INT)');
				alasql('INSERT INTO x VALUES (1)');
				alasql('ALTER TABLE q RENAME TO q2');
				alasql('SELECT * FROM x');

				alasql('DROP TABLE x');
				alasql('CREATE TABLE x (a INT, b INT)');
				alasql('INSERT INTO x VALUES (1,2)');
				alasql('ALTER TABLE q2 RENAME TO q');
				return alasql('SELECT * FROM x');
			});
			assert.deepStrictEqual(res, [{a: 1, b: 2}]);
		} finally {
			Date.now = now;
		}
	});
});
