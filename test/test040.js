if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 40', function() {
	var db;
	it('Prepare database', function(done){
		db = new alasql.Database("db");
		db.exec('CREATE TABLE one (a INT, b FLOAT)');
		db.exec('INSERT INTO one VALUES (-1,-10.1),(-2,-20.2345678),(3,30.12), (-4,40.00)');			
		done();
	});

	describe('Float numbers', function(){

		it('Float and negative numbers', function(done){
			var res = db.exec("SELECT a,b,-1.1*a AS c FROM one ORDER BY a");
//			console.log();
			assert.deepEqual(4.4,res[0].c);
			done();
		});
	});

	describe('Strings', function(){

		it('Strings with single and double quaters', function(done){
			db.exec('CREATE TABLE five (a STRING)');
			db.exec('INSERT INTO five VALUES ("One")');
			db.exec("INSERT INTO five VALUES ('Two')");
			var res = db.exec("SELECT COLUMN a FROM five");
//			console.log();
			assert.deepEqual(["One", "Two"],res);
			done();
		});
	});

	describe('Strings', function(){

		it('Strings with single and double quaters like keywords', function(done){
			alasql('create database test40; use test40');
			alasql('CREATE TABLE six (a STRING)');
			alasql('INSERT INTO six VALUES ("One")');
			alasql("INSERT INTO six VALUES ('Two')");
			var res = alasql("SELECT a, 'into', 'as' FROM six");
//			console.log();
			assert.deepEqual([{"'into'":'into', "'as'":'as', a:"One"}, {"'into'":'into', "'as'":'as', a:"Two"}],res);
			alasql('drop database test40');
			done();
		});
	});


});
