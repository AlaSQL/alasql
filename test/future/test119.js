if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
};

describe('Test 119 - PRIMARY KEY, CREATE INDEX UNIQUE', function() {

	it('PRIMARY KEY', function(done){
		alasql('create database test119');
		alasql('use test119');
		
		alasql('create table one (a int primary key)');
		alasql('insert into one values (1), (2), (3)');

		assert.throws(function(){
			alasql('insert into one values (1)');
		}, Error);

		var res = alasql.value('select count(*) from one');
		assert.deepEqual(res, 3);

		done();
	});

	it('UNIQUE INDEX-1 before insert', function(done){
		
		alasql('create table two (a int)');
		alasql('create unique index twoa on two(a)')
		alasql('insert into two values (1), (2), (3)');

		assert.throws(function(){
			alasql('insert into two values (1)');
		}, Error);

		var res = alasql.value('select count(*) from two');
		assert.deepEqual(res, 3);

		done();
	});

	it('UNIQUE INDEX-2 after insert', function(done){
		
		alasql('create table three (a int)');
		alasql('insert into three values (1), (2), (3), (1)');
		assert.throws(function(){
			alasql('create unique index threea on three(a)')
		}, Error);

		var res = alasql.value('select count(*) from three');
		assert.deepEqual(res, 4);

		done();
	});

	it('UNIQUE INDEX-3 two unique indices and primary key', function(done){
		
		alasql('create table four (a int PRIMARY KEY, b int)');
		alasql('create unique index foura on four(a)')
		alasql('insert into four values (1,10), (2,20)');

		assert.throws(function(){
			alasql('insert into four values (1,10)');
		}, Error);

		var res = alasql.value('select count(*) from three');
		assert.deepEqual(res, 4);

		done();
	});


	it('Clear database', function(done){
		alasql('drop database test119');
		done();
	});

});
