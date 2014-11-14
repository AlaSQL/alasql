if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 00', function() {
	it('Very beginning', function(done){
		var sql = 'create database test00;';
		sql += 'use test00;';
		sql += 'create table one (a int);';
		sql += 'insert into one values (1),(2),(3),(4),(5)';
		alasql(sql);

		done();
	});

});
