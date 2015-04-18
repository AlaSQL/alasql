
if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
};


describe('CREATE TABLE', function(){
	it('Create table with same name twice', function(done) {
		var db = new alasql.Database();
		db.exec('CREATE TABLE test (a int, b int)');
		assert.throws(function(){
			db.exec('CREATE TABLE test (a int, c int)');
		},Error);
		done();
	});
});

describe('CREATE TABLE IF EXISTS', function(){
	it('Try to create table if it already exists', function(done) {
		var db = new alasql.Database();
		db.exec('CREATE TABLE test (a int, b int)');
		db.exec('CREATE TABLE IF NOT EXISTS test (c int)');
		assert.equal("a", db.tables.test.columns[0].columnid);
		done();		
	});

	it('Create table if it does not exist', function(done) {
		var db = new alasql.Database();
		db.exec('CREATE TABLE IF NOT EXISTS test (a int, c int)');
		assert.equal(true, !!db.tables.test);
		done();		
	});
});


