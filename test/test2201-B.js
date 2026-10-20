if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2201B'; // ALTER TABLE ... RENAME TO and SHOW CREATE TABLE use the table's own database

describe(`Test ${testId} - qualified table names in RENAME TO and SHOW CREATE TABLE`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('create database other' + testId);
		alasql('use test' + testId);
		alasql(`CREATE TABLE other${testId}.t (a INT)`);
		alasql(`INSERT INTO other${testId}.t VALUES (1)`);
	});

	after(function () {
		alasql('drop database test' + testId);
		alasql('drop database other' + testId);
	});

	it('A) SHOW CREATE TABLE db.t', function () {
		assert.strictEqual(alasql(`SHOW CREATE TABLE other${testId}.t`), 'CREATE TABLE t (a INT)');
	});

	it('B) ALTER TABLE db.t RENAME TO t2 renames it in its own database', function () {
		assert.strictEqual(alasql(`ALTER TABLE other${testId}.t RENAME TO t2`), 1);
		assert.deepStrictEqual(Object.keys(alasql.databases['other' + testId].tables), ['t2']);
		assert.deepStrictEqual(Object.keys(alasql.databases['test' + testId].tables), []);
		assert.deepStrictEqual(alasql(`SELECT * FROM other${testId}.t2`), [{a: 1}]);
	});

	it('C) Renaming a table that does not exist throws', function () {
		assert.throws(() => alasql('ALTER TABLE nosuch RENAME TO x'), /does not exist/);
		assert.deepStrictEqual(Object.keys(alasql.databases['test' + testId].tables), []);
	});
});
