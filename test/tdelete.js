//
// tselect01.js
// Test for select
//

if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require(__dirname+'/../src/alasql.js');
};


describe('DELETE', function(){
	it('DELETE without conditions', function(done) {

		var db = new alasql.Database();

		db.exec('CREATE TABLE test (a int, b int)');
		db.exec('INSERT INTO test VALUES (1,1)');
		db.exec('INSERT INTO test VALUES (1,7)');
		db.exec('INSERT INTO test VALUES (2,2)');
		db.exec('INSERT INTO test VALUES (3,3)');

		var res = db.exec('DELETE FROM test');

		assert.deepEqual([], db.tables.test.recs);
		done();		
	});


	it('DELETE with conditions', function(done) {

		var db = new alasql.Database();

		db.exec('CREATE TABLE test (a int, b int)');
		db.exec('INSERT INTO test VALUES (1,10)');
		db.exec('INSERT INTO test VALUES (2,20)');
		db.exec('INSERT INTO test VALUES (3,30)');
		db.exec('INSERT INTO test VALUES (4,40)');
		db.exec('INSERT INTO test VALUES (5,50)');

		var res = db.exec('DELETE FROM test WHERE b>=30');

		assert.equal(3, res);
		assert.equal(2, db.tables.test.recs.length);

		done();		
	});

});


