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


describe('SQL Parser', function(){
	it('Parser is attached', function(done) {
		var db = new alasql.Database();
		assert.deepEqual(db.tables, db.parse());
		done();		
	});
});


describe('Select *', function(){
	it('Simple select 1', function(done) {
		var db = new alasql.Database();
		db.tables.one = [
			{two:1, three:2}, 
			{two:4, three:5}
		];
		var res = db.exec('SELECT * FROM one');
		assert.equal(db.tables.one, res);
		done();		
	});
});

