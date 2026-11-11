if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2797 - SET TRANSACTION and SET SESSION AUTHORIZATION', function () {
	before(function () {
		alasql('CREATE DATABASE test2797; USE test2797');
		alasql('CREATE TABLE t (a INT)');
		alasql('INSERT INTO t VALUES (1), (2)');
	});

	after(function () {
		alasql('ROLLBACK WORK');
		alasql('DROP DATABASE test2797');
	});

	it('READ ONLY blocks INSERT, UPDATE and DELETE until COMMIT', function () {
		assert.equal(alasql('SET TRANSACTION READ ONLY'), 1);
		assert.throws(() => alasql('INSERT INTO t VALUES (3)'), /READ ONLY/);
		assert.throws(() => alasql('UPDATE t SET a = 5'), /READ ONLY/);
		assert.throws(() => alasql('DELETE FROM t WHERE a = 1'), /READ ONLY/);
		assert.throws(() => alasql('DELETE FROM t'), /READ ONLY/);
		assert.deepEqual(alasql('SELECT a FROM t'), [{a: 1}, {a: 2}]);
		alasql('COMMIT WORK');
		alasql('INSERT INTO t VALUES (3)');
		assert.deepEqual(alasql('SELECT VALUE COUNT(*) FROM t'), 3);
	});

	it('ROLLBACK and READ WRITE end READ ONLY', function () {
		alasql('SET TRANSACTION READ ONLY');
		alasql('ROLLBACK TRANSACTION');
		alasql('DELETE FROM t WHERE a = 3');
		alasql('SET TRANSACTION READ ONLY');
		alasql('SET TRANSACTION READ WRITE');
		alasql('UPDATE t SET a = a');
	});

	it('isolation level and diagnostics size are accepted', function () {
		assert.equal(alasql('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE'), 1);
		assert.equal(alasql('SET TRANSACTION ISOLATION LEVEL READ COMMITTED, READ WRITE'), 1);
		assert.equal(alasql('SET TRANSACTION READ ONLY, ISOLATION LEVEL REPEATABLE READ'), 1);
		assert.throws(() => alasql('INSERT INTO t VALUES (4)'), /READ ONLY/);
		alasql('COMMIT WORK');
		assert.equal(alasql('SET TRANSACTION DIAGNOSTICS SIZE 5'), 1);
	});

	it('SET SESSION AUTHORIZATION is accepted', function () {
		assert.equal(alasql("SET SESSION AUTHORIZATION 'CTS2'"), 1);
	});

	it('toString', function () {
		assert.equal(
			alasql.parse('SET TRANSACTION READ ONLY, ISOLATION LEVEL READ UNCOMMITTED').toString(),
			'SET TRANSACTION READ ONLY, ISOLATION LEVEL READ UNCOMMITTED'
		);
		assert.equal(
			alasql.parse("SET SESSION AUTHORIZATION 'X'").toString(),
			"SET SESSION AUTHORIZATION 'X'"
		);
	});

	it('names stay usable', function () {
		alasql('CREATE TABLE isolation (level INT, diagnostics INT)');
		alasql('INSERT INTO isolation VALUES (1, 2)');
		assert.deepEqual(alasql('SELECT level, diagnostics FROM isolation'), [
			{level: 1, diagnostics: 2},
		]);
		alasql('SET session = 1');
	});
});
