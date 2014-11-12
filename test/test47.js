if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 47', function() {
	describe('No error on subquery without alias', function(){

		alasql('DROP TABLE IF EXISTS one');
		alasql('CREATE TABLE one (a INT)');
		alasql('INSERT INTO one VALUES (1),(2),(3),(4),(5)');

//		it('Throws error', function(done){
//			assert.throws(function() {alasql('SELECT * FROM (SELECT * FROM one WHERE a < 3)');},Error);
//			done();
//		});
		var res = alasql.queryValue('SELECT SUM(*) FROM (SELECT * FROM one WHERE a < 3)');
		assert.equal(3,res);
		done();

	});
});
