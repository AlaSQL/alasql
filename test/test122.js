if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
};

describe('Test 122 - PRIMARY KEY, CREATE INDEX UNIQUE', function() {

	it('1. Create Index', function(done){
		alasql('create database test122');
		alasql('use test122');
		
		alasql('create table one (a int, b int)');

		alasql('create unique index onea on one(a)');
//		console.log(alasql.databases.test122.tables.one);

		alasql('create index oneb on one(b)');

		alasql('insert into one values (1,10), (2,20), (3,30)');


		done();
		return;
		alasql('insert into one values (1), (2), (3)');

		assert.throws(function(){
			alasql('insert into one values (1)');
		}, Error);

		var res = alasql.value('select count(*) from one');
		assert.deepEqual(res, 3);

		done();
	});


	it('99.Clear database', function(done){
		alasql('drop database test122');
		done();
	});

});
