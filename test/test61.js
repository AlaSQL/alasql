if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 61 - Increment', function() {

	it('AUTO_INCREMENT', function(done){
		alasql("DROP TABLE IF EXISTS test");
		alasql("CREATE TABLE test (a INT AUTO_INCREMENT, b INT)");
		alasql('insert into test (b) values (10),(20),(30)');
		var res = alasql('select * from test');
		done();
	});

	it('IDENTITY', function(done){
		alasql("DROP TABLE IF EXISTS test");
		alasql("CREATE TABLE test (a INT IDENTITY(1,1), b INT)");
		alasql('insert into test (b) values (10),(20),(30)');
		var res = alasql('select * from test');
		done();
	});


});
