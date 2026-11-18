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
			// The real engine returns nothing and passes the count to the callback
			if (cb) cb(2);
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
	it('deletes through the engine instead of calling loadTableData', function (done) {
		alasql('DELETE FROM t1217', [], function (res) {
			assert.strictEqual(res, 2);
			assert.strictEqual(calls.length, 1);
			assert.strictEqual(calls[0].tableid, 't1217');
			assert.strictEqual(calls[0].wherefn, null);
			done();
		});
	});

	it('still loads and saves the table for an engine registered by the user', function () {
		var saved;
		alasql.engines.MYENGINE1217 = function () {};
		alasql.engines.MYENGINE1217.loadTableData = function (databaseid, tableid) {
			alasql.databases[databaseid].tables[tableid].data = [{id: 1}, {id: 2}];
		};
		alasql.engines.MYENGINE1217.saveTableData = function (databaseid, tableid) {
			saved = alasql.databases[databaseid].tables[tableid].data;
		};
		var autocommit = alasql.options.autocommit;
		alasql.options.autocommit = true;
		try {
			alasql('CREATE DATABASE my1217; CREATE TABLE my1217.t (id INT)');
			alasql.databases.my1217.engineid = 'MYENGINE1217';
			assert.strictEqual(alasql('DELETE FROM my1217.t'), 2);
			assert.deepStrictEqual(saved, []);
		} finally {
			alasql.options.autocommit = autocommit;
			alasql.databases.my1217.engineid = undefined;
			alasql('DROP DATABASE my1217');
			delete alasql.engines.MYENGINE1217;
		}
	});
});
