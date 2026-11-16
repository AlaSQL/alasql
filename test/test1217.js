if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 1217 - DELETE FROM an IndexedDB table without WHERE', function () {
	var realDeleteFromTable;
	var calls;

	beforeEach(function () {
		calls = [];
		realDeleteFromTable = alasql.engines.INDEXEDDB.deleteFromTable;
		alasql.engines.INDEXEDDB.deleteFromTable = function (databaseid, tableid, wherefn, params, cb) {
			calls.push({databaseid: databaseid, tableid: tableid, wherefn: wherefn});
			if (cb) cb(2);
			return 2;
		};
		alasql('CREATE TABLE t1217 (id INT, name STRING)');
		alasql("INSERT INTO t1217 VALUES (1, 'a'), (2, 'b')");
		alasql.databases.alasql.engineid = 'INDEXEDDB';
	});

	afterEach(function () {
		alasql.databases.alasql.engineid = undefined;
		alasql.engines.INDEXEDDB.deleteFromTable = realDeleteFromTable;
		alasql('DROP TABLE IF EXISTS t1217');
	});

	// The IndexedDB engine defines deleteFromTable but no loadTableData, so a DELETE
	// without a WHERE clause threw "loadTableData is not a function" (#1217) and never
	// reached the engine that owns the store.
	it('deletes through the engine instead of calling loadTableData', function () {
		var res = alasql('DELETE FROM t1217');

		assert.strictEqual(res, 2);
		assert.strictEqual(calls.length, 1);
		assert.strictEqual(calls[0].tableid, 't1217');
		assert.strictEqual(calls[0].wherefn, null);
	});
});
