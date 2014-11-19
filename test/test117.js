if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 117 - Table name resolution', function() {
	it('One table', function(done){
		alasql('create database test117');
		alasql('use test117');
		alasql('create table one (a int, b int)');
		alasql('insert into one values (10,100), (20,200), (30,300)');
		alasql('create table two (a int, b int, c int)');
		alasql('insert into two values (10,1,1), (20,2,2), (30,3,3)');
		done();
	});

	it('One table', function(done){
		var res = alasql.value('select sum(b) from one join two using a');
		assert(res == 600);
		var res = alasql.value('select sum(one.b) from one join two using a');
		assert(res == 600);
		var res = alasql.value('select sum(two.b) from one join two using a');
		assert(res == 6);
		var res = alasql.value('select sum(c) from one join two using a');
		assert(res == 6);
		alasql('drop database test117');
		done();
	});


});
