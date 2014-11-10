if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 45', function() {
	describe('table AS alias', function(){

		alasql('CREATE TABLE one (a INT)');
		alasql('INSERT INTO one VALUES (1),(2),(3),(4),(5)');

		it('CASE Expression WHEN THEN END', function(done){
			assert.equal(5, alasql("SELECT a FROM one").length);
			assert.equal(5, alasql("SELECT one.a FROM one").length);
			assert.equal(5, alasql("SELECT t.a FROM one t").length);
			assert.equal(5, alasql("SELECT t.a FROM one AS t").length);
			done();
		});


	});
});
