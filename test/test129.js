//
// tselect01.js
// Test for select
//

if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 129 - * /STAR / MULTIPLICATION', function () {
	it('UPDATE WHERE with multiplication in assignment and conditions', function (done) {
		var db = new alasql.Database();

		db.exec('CREATE TABLE test (a INT, b INT, c INT)');
		db.exec('INSERT INTO test VALUES (1,10,100)');
		db.exec('INSERT INTO test VALUES (2,20,200)');
		db.exec('INSERT INTO test VALUES (3,30,300)');
		db.exec('INSERT INTO test VALUES (4,40,400)');
		db.exec('INSERT INTO test VALUES (5,50,500)');

		//		console.log('There is a bug in parser')

		var res = db.exec('UPDATE test SET a = (c*100) WHERE b<=(3*10)');

		// console.log(res);
		// console.log(db.tables.test.recs);

		assert.equal(3, res);
		assert.equal(10000, db.tables.test.data[0].a);
		assert.equal(20000, db.tables.test.data[1].a);
		assert.equal(30000, db.tables.test.data[2].a);
		assert.equal(4, db.tables.test.data[3].a);
		assert.equal(5, db.tables.test.data[4].a);

		done();
	});
});
