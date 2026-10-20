//
// tselect01.js
// Test for select
//

if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 130 - UPDATE', function () {
	it('UPDATE without conditions', function (done) {
		var db = new alasql.Database();

		db.exec('CREATE TABLE test (a int, b int)');
		db.exec('INSERT INTO test VALUES (1,1)');
		db.exec('INSERT INTO test VALUES (1,7)');
		db.exec('INSERT INTO test VALUES (2,2)');
		db.exec('INSERT INTO test VALUES (3,3)');

		var res = db.exec('UPDATE test SET a = (b+100)');

		assert.equal(4, res);
		assert.equal(101, db.tables.test.data[0].a);
		done();
	});

	it('UPDATE WHERE with conditions', function (done) {
		var db = new alasql.Database();

		db.exec('CREATE TABLE test (a INT, b INT, c INT)');
		db.exec('INSERT INTO test VALUES (1,10,100)');
		db.exec('INSERT INTO test VALUES (2,20,200)');
		db.exec('INSERT INTO test VALUES (3,30,300)');
		db.exec('INSERT INTO test VALUES (4,40,400)');
		db.exec('INSERT INTO test VALUES (5,50,500)');

		var res = db.exec('UPDATE test SET a = c WHERE b<=30');

		// console.log(res);
		// console.log(db.tables.test.recs);

		assert.equal(3, res);
		assert.equal(100, db.tables.test.data[0].a);
		assert.equal(200, db.tables.test.data[1].a);
		assert.equal(300, db.tables.test.data[2].a);
		assert.equal(4, db.tables.test.data[3].a);
		assert.equal(5, db.tables.test.data[4].a);

		done();
	});
});
