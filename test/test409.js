if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
 This sample beased on this article:

	http://stackoverflow.com/questions/30442969/group-by-in-angularjs

*/

describe('Test 409 Backup and restore database', function () {
	alasql.storeDatabase = function (databaseid) {
		databaseid = databaseid || alasql.useid;
		var db = alasql.databases[databaseid];
		var obj = {};
		//Step 1 - basic fields
		obj.databaseid = db.databaseid;
		obj.dbversion = db.dbversion;
		//Step 2 - tables
		obj.tables = {};
		for (var t in db.tables) {
			var table = (obj.tables[t] = {});
			// Step 2.1
			table.data = alasql.utils.deepClone(db.tables[t].data);
			console.log(24, table);
			// Step 2.2
			// or replace with JSON.parse(stringigy(db.tables[t].data));
		}
		// Step 3 - views
		// Step 3.1 - columns
		// Step 3.2 - query...

		// Step 4 - triggers
		// Step 5 - indices

		// Step 6 - objects + counter

		return obj;
	};

	alasql.restoreDatabase = function (obj, databaseid) {};

	it('2. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test409;USE test409');
		done();
	});

	it.skip('2. CREATE DATABASE', function (done) {
		alasql('CREATE TABLE one (a INT UNIQUE); INSERT INTO one VALUES (1),(2),(3)');
		var obj1 = alasql.storeDatabase();
		alasql('DROP DATABASE test409');
		var obj2 = JSON.parse(JSON.stringify(obj1));
		alasql.restoreDatabase(obj2);
		alasql('USE test409');
		alasql('INSERT INTO one VALUES (4)');
		var res = alasql('SELECT * FROM one');
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 3}, {a: 4}]);

		assert.throws(new Error(), function () {
			alasql('INSERT INTO one VALUES (1)');
		});

		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test409');
		done();
	});
});
