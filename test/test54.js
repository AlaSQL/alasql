if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 54 - SELECT Number', function() {
	it('SELECT number', function(done){
	var db = new alasql.Database();
		var res = db.exec('SELECT 10');
		console.log(res);
		var res = db.exec('SELECT 10,20');
		console.log(res);
		var res = db.exec('SELECT "Peter"');
		console.log(res);
		var res = db.exec('SELECT a FROM (SELECT 10) AS t');
		console.log(res);
		var res = db.exec('SELECT a FROM (SELECT 10)');
		console.log(res);
		var res = db.exec('SELECT a FROM (SELECT 10) UNION ALL (SELECT 20)');
		console.log(res);
//		assert.equal(6,res);
		done();
	});
});
