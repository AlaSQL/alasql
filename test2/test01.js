if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 00', function() {

	it('Very beginning: multiple statements', function(done){
		var res1 = [];
		res1.push(alasql('create database test00'));
		res1.push(alasql('use test00'));
		res1.push(alasql('create table one (a int)'));
		res1.push(alasql('insert into one values (1),(2),(3),(4),(5)'));
		res1.push(alasql('select * from one'));
		res1.push(alasql('drop database test00'));
		console.log(res1);
		done();
	});

	it('Very beginning: single expression', function(done){
		var sql = 'create database test00;';
		sql += 'use test00;';
		sql += 'create table one (a int);';
		sql += 'insert into one values (1),(2),(3),(4),(5);';
		sql += 'select * from one;';
		sql += 'drop database test00';
		var res2 = alasql(sql);
		console.log(res2);

//		assert.deepEqual(res1,res2);
		done();
	});

	it('Very beginning: single expression', function(done){
		var db = new alasql.Database('test00');
		alasql.use(db); 
		alasql.use('test00');
		
		alasql.createTable(db, {tableid:'one',columns:[{columnid:'a', dbtypeid:'int'}]);
		alasql.insert(db,);
		sql += 'insert into one values (1),(2),(3),(4),(5);';
		sql += 'select * from one;';

		alasql.dropDatabase('test00');
		var res2 = alasql(sql);
		console.log(res2);

//		assert.deepEqual(res1,res2);
		done();
	});


});
