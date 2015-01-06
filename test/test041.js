if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 41', function() {
	describe('CASE WHEN THEN ELSE END', function(){

		var db;
		it('1. CASE Expression WHEN THEN END', function(done){
			db = new alasql.Database("db");

			db.exec('CREATE TABLE one (a INT, d INT)');
			db.exec('INSERT INTO one VALUES (1,10),(2,20),(3,30),(4,40),(5,50)');


//			var ast = alasql.parse("SELECT (CASE a WHEN 2 THEN 20 ELSE 30 END) AS b FROM one");
			var res = db.exec("SELECT CASE a WHEN 2 THEN 20 ELSE 30 END AS b FROM one");
			assert.deepEqual(30,res[0].b);
			assert.deepEqual(20,res[1].b);
			done();
		});

		it('2. CASE and default table (test for defcols)', function(done){
			db.exec('CREATE TABLE two (a INT, e INT)');
			db.exec('INSERT INTO two VALUES (1,10),(2,20),(3,30),(4,40),(5,50)');
			assert.throws(function(){
				var res = db.exec("SELECT CASE a WHEN 2 THEN 20 ELSE 30 END AS b FROM one JOIN two USING a");
			}, Error);

			var res = alasql.utils.flatArray(db.exec("SELECT CASE d WHEN 20 THEN 2000 ELSE 3000 END AS b FROM one JOIN two USING a"));
			assert.deepEqual(res, [3000, 2000, 3000, 3000, 3000]);
			var res = alasql.utils.flatArray(db.exec("SELECT CASE e WHEN 30 THEN 2000 ELSE 3000 END AS b FROM one JOIN two USING a"));
			assert.deepEqual(res, [3000, 3000, 2000, 3000, 3000]);
			done();
		});

	});
});
