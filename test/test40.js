if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 40', function() {
	describe('Float numbers', function(){

		var db = alasql.Database("db");

		db.exec('CREATE TABLE one (a INT, b FLOAT)');
		db.exec('INSERT INTO one VALUES (-1,-10.1),(-2,-20.2345678),(3,30.12), (-4,40.00)');


		it('Float and negative numbers', function(done){
			var res = db.exec("SELECT a,b,-1.1*a AS c FROM one ORDER BY a");
//			console.log();
			assert.deepEqual(4.4,res[0].c);
			done();
		});


	});

	describe('Strings', function(){

		var db = alasql.Database("db");

		db.exec('CREATE TABLE one (a STRING)');
		db.exec('INSERT INTO one VALUES ("One")');
		db.exec("INSERT INTO one VALUES ('Two')");


		it('Strings with single and double quaters', function(done){
			var res = db.queryArray("SELECT a FROM one");
//			console.log();
			assert.deepEqual(["One", "Two"],res);
			done();
		});


	});
});
