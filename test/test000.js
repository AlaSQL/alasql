if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 000', function() {

	it('Very beginning: multiple statements', function(done){
		var res = [];
		res.push(alasql('create database test00'));
		res.push(alasql('use test00'));
		res.push(alasql('create table one (a int)'));
		res.push(alasql('insert into one values (1),(2),(3),(4),(5)'));
		res.push(alasql('select * from one'));
		res.push(alasql('drop database test00'));
		assert.deepEqual(res, [1,1,1,5,[{a:1},{a:2},{a:3},{a:4},{a:5}],1]);
		done();
	});

	it('Very beginning: multiple statements in one string', function(done){
		var sql = 'create database test00;';
		sql += 'use test00;';
		sql += 'create table one (a int);';
		sql += 'insert into one values (1),(2),(3),(4),(5);';
		sql += 'select * from one;';
		sql += 'drop database test00';
		var res = alasql(sql);
		assert.deepEqual(res, [1,1,1,5,[{a:1},{a:2},{a:3},{a:4},{a:5}],1]);
		done();
	});

	it('Very beginning: multiple statements in one string with callback', function(done){
		var sql = 'create database test00;';
		sql += 'use test00;';
		sql += 'create table one (a int);';
		sql += 'insert into one values (1),(2),(3),(4),(5);';
		sql += 'select * from one;';
		sql += 'drop database test00';
		alasql(sql, [], function(res){
			assert.deepEqual(res, [1,1,1,5,[{a:1},{a:2},{a:3},{a:4},{a:5}],1]);
			done();
		});
	});

// TODO - convert to NoSQL interface

 	// it('Very beginning: single expression', function(done){
 	// 	var db = new alasql.Database('test00');
 	// 	alasql.use('test00');
		
// 		alasql.createTable(db, {tableid:'one',columns:[{columnid:'a', dbtypeid:'int'}]);
// 		alasql.insert(db,);
// 		sql += 'insert into one values (1),(2),(3),(4),(5);';
// 		sql += 'select * from one;';

// 		alasql.dropDatabase('test00');
// 		var res2 = alasql(sql);
// 		console.log(res2);

// //		assert.deepEqual(res1,res2);
// 		done();
// 	});


});
