//
// tselect01.js
// Test for select
//

if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require(__dirname+'/../lib/alasql.js');
};


describe('SELECT', function(){
	it('Select *', function(done) {
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



