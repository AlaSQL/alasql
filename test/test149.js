if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

if(typeof exports != 'object') {

describe('Test 149 - localStorage Engine', function() {

	it("1. Create database", function(done){
		alasql('CREATE localStorage DATABASE ls149');
		assert(localStorage['ls149']);
		// alasql('USE test148');
		// alasql('CREATE TABLE one (a INT)');
		// alasql('INSERT INTO one VALUES (1),(2),(3)');
		// var res = alasql('EXPLAIN SELECT * FROM one WHERE a IN (SELECT * FROM one) ORDER BY a');
		// console.table(res);
		done();
	});

	it("99. Detach database", function(done){
		alasql('DROP localStorage DATABASE ls148');
		assert(!localStorage['ls149']);
		done();
	});
});

}

