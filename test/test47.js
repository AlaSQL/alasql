if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 47', function() {
	describe('No error on subquery without alias', function(){
		it('Query without alias', function(done){

			alasql('create database test47');
			alasql('use test47');
			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT)');
			alasql('INSERT INTO one VALUES (1),(2),(3),(4),(5)');

			var res = alasql('SELECT COLUMN * FROM (SELECT * FROM one WHERE a < 3)');
			assert.deepEqual([1,2],res);
			done();
		});

		it('Subsubqueries without alias', function(done) {
			var res = alasql('SELECT VALUE SUM(a) FROM (SELECT * FROM one WHERE a < 3)');
			assert.equal(3,res);
			var res = alasql('SELECT VALUE COUNT(*) FROM (SELECT * FROM one WHERE a < 3)');
			assert.equal(2,res);

			alasql('drop database test47');
			done();
		});

	});
});
