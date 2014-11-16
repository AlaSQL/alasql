if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 41', function() {
	describe('CASE WHEN THEN ELSE END', function(){

		it('CASE Expression WHEN THEN END', function(done){
			var db = new alasql.Database("db");

			db.exec('CREATE TABLE one (a INT)');
			db.exec('INSERT INTO one VALUES (1),(2),(3),(4),(5)');


			var ast = alasql.parse("SELECT (CASE a WHEN 2 THEN 20 ELSE 30 END) AS b FROM one");
			var res = db.exec("SELECT CASE a WHEN 2 THEN 20 ELSE 30 END AS b FROM one");
			assert.deepEqual(30,res[0].b);
			assert.deepEqual(20,res[1].b);
			done();
		});


	});
});
