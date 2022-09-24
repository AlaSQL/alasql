//
// tselect01.js
// Test for select
//

if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 109 - DELETE', function () {
	it('DELETE without conditions', function (done) {
		var db = new alasql.Database();

		db.exec('CREATE TABLE test (a int, b int)');
		db.exec('INSERT INTO test VALUES (1,1)');
		db.exec('INSERT INTO test VALUES (1,7)');
		db.exec('INSERT INTO test VALUES (2,2)');
		db.exec('INSERT INTO test VALUES (3,3)');

		var res = db.exec('DELETE FROM test');

		assert.deepEqual([], db.tables.test.data);
		done();
	});

	it('DELETE with conditions', function (done) {
		var db = new alasql.Database();

		db.exec('CREATE TABLE test (a int, b int)');
		//		console.log(db);
		db.tables.test.data = [{a: 100, b: 100}];
		//		try{
		db.exec('INSERT INTO test (a,b) VALUES (1,10)');
		//		} catch(err) {console.error(err)};
		//		console.log(db.tables.test);
		db.exec('INSERT INTO test VALUES (2,20)');
		db.exec('INSERT INTO test VALUES (3,30)');
		db.exec('INSERT INTO test VALUES (4,40)');
		db.exec('INSERT INTO test VALUES (5,50)');

		var res = db.exec('DELETE FROM test WHERE b>=30');

		//		console.log(res,1);
		assert.equal(4, res);
		assert.equal(2, db.tables.test.data.length);

		done();
	});
});
