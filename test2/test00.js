if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 00', function() {
	it('Single statement CREATE, USE and DROP DATABASE', function(done){
		alasql('create database test00');
		assert(!!alasql.databases.test00);
		alasql('use test00');
		assert(alasql.useid == "test00");
		alasql('drop database test00');
		assert(!alasql.databases.test00);
		assert(alasql.useid == 'alasql');
		done();
	});

	it('Single statement CREATE, USE and DROP CREATE TABLE ', function(done){
		alasql('create database test00');
		alasql('use test00');
		alasql('create table one (a int)');
		assert(!!alasql.tables.one);
		alasql('insert into one values (10)')
		assert(alasql.tables.one.data.length == 1);
		var res = alasql.value('select sum(a) from one');
		assert(res == 10);
		console.log(alasql.databases.test00.sqlCache);
		done();
	});

	it('Single statement CREATE, USE and DROP CREATE TABLE ', function(done){
		alasql('create database test00');
		alasql('use test00');
		alasql('create table one (a int)');
		var ins = alasql.compile('insert into one values (10)')
		ins();
		assert(alasql.tables.one.data.length == 1);
		var sel = alasql.compile("value",'select sum(a) from one where a = ?');
		var res = sel([10]);
		console.log(sel);
		var res = alasql.value('select sum(a) from one');
		assert(res == 10);
		console.log(alasql.databases.test00.sqlCache);
		done();
	});


});
