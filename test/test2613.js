if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2613';

describe(`Test ${testId} - Compiled SQL is compiled again after a schema change in any database`, function () {
	let dbCount = 0;

	after(function () {
		alasql.options.cache = true;
		alasql('use alasql');
	});

	// Run fn with the statement cache on and off, each time in new databases a and b with a in use
	function withCacheOnAndOff(fn) {
		const results = [];
		for (const cache of [true, false]) {
			alasql.options.cache = cache;
			const a = 'test' + testId + 'a' + dbCount;
			const b = 'test' + testId + 'b' + dbCount++;
			alasql('create database ' + a);
			alasql('create database ' + b);
			alasql('use ' + a);
			try {
				results.push(fn(b));
			} finally {
				alasql.options.cache = true;
				alasql('use alasql');
				alasql('drop database ' + a);
				alasql('drop database ' + b);
			}
		}
		return results;
	}

	const expected = [{x: 1, y: 2}];

	it('A) Statement cache, table in another database', function () {
		const results = withCacheOnAndOff(function (b) {
			alasql(`CREATE TABLE ${b}.t (x INT)`);
			alasql(`SELECT * FROM ${b}.t`);

			alasql(`DROP TABLE ${b}.t`);
			alasql(`CREATE TABLE ${b}.t (x INT, y INT)`);
			alasql(`INSERT INTO ${b}.t VALUES (1,2)`);
			return alasql(`SELECT * FROM ${b}.t`);
		});
		assert.deepStrictEqual(results, [expected, expected]);
	});

	it('B) Statement from alasql.compile()', function () {
		const results = withCacheOnAndOff(function () {
			alasql('CREATE TABLE c (x INT)');
			const st = alasql.compile('SELECT * FROM c');
			st();

			alasql('DROP TABLE c');
			alasql('CREATE TABLE c (x INT, y INT)');
			alasql('INSERT INTO c VALUES (1,2)');
			return st();
		});
		assert.deepStrictEqual(results, [expected, expected]);
	});

	it('C) View', function () {
		const results = withCacheOnAndOff(function () {
			alasql('CREATE TABLE t (x INT)');
			alasql('CREATE VIEW v AS SELECT * FROM t');
			alasql('SELECT * FROM v');

			alasql('DROP TABLE t');
			alasql('CREATE TABLE t (x INT, y INT)');
			alasql('INSERT INTO t VALUES (1,2)');
			return alasql('SELECT * FROM v');
		});
		assert.deepStrictEqual(results, [expected, expected]);
	});

	it('D) Statement from alasql.compile() keeps working without a schema change', function () {
		const results = withCacheOnAndOff(function () {
			alasql('CREATE TABLE d (x INT, y INT)');
			alasql('INSERT INTO d VALUES (1,2)');
			const st = alasql.compile('SELECT * FROM d WHERE x = ?');
			return [st([1]), st([2])];
		});
		assert.deepStrictEqual(results, [
			[expected, []],
			[expected, []],
		]);
	});

	it('E) Statement from alasql.compile() still has promise()', async function () {
		alasql('create database test' + testId + 'e');
		alasql('use test' + testId + 'e');
		try {
			alasql('CREATE TABLE e (x INT, y INT)');
			alasql('INSERT INTO e VALUES (1,2)');
			const st = alasql.compile('SELECT * FROM e');
			assert.deepStrictEqual(await st.promise(), expected);
		} finally {
			alasql('use alasql');
			alasql('drop database test' + testId + 'e');
		}
	});
});
