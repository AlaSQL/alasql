//
// tselect01.js
// Test for select
//

if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require(__dirname+'/../lib/alasql.js');
};


describe('Create Database', function(){
	it('Create Database', function(done) {
		var db = new alasql.Database();
		assert.deepEqual(db.tables, {});
		done();		
	});
});



describe('Select *', function(){
	it('Simple select 1', function(done) {
		var db = new alasql.Database();
		db.tables.one = {};
		db.tables.one.recs = [
			{two:1, three:2}, 
			{two:4, three:5}
		];
		var res = db.exec('SELECT * FROM one');
		assert.deepEqual(db.tables.one.recs, res);
		done();		
	});
});

describe('Create Table and Select ', function(){
	it('Complex 1', function(done) {

		var db = new alasql.Database();

		db.exec('CREATE TABLE test (a int, b int)');
		db.exec('INSERT INTO test VALUES (1,1)');
		db.exec('INSERT INTO test VALUES (1,7)');
		db.exec('INSERT INTO test VALUES (2,2)');
		db.exec('INSERT INTO test VALUES (3,3)');

		db.exec('CREATE TABLE test1 (a int, c int)');
		db.exec('INSERT INTO test1 VALUES (1,5)');
		db.exec('INSERT INTO test1 VALUES (2,6)');

		var res = db.exec('SELECT SUM(b) AS sb,a,test1.c FROM test LEFT JOIN test1 ON test.a = test1.a GROUP BY c,a');

		assert.equal(8, res[0].sb);
		assert.equal(2, res[1].sb);
		assert.equal(3, res[2].sb);
		done();		
	});
});


