if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
}

var test = 0;

describe('Test '+test+' - multiple statements', function() {
	
	before(function(){
		alasql('create database test'+test);
		alasql('use test'+test);
	})

	after(function(){
		alasql('drop database test'+test);
	})

	it('A. From single lines', function(done){
		var res = [];
		res.push(alasql('create table one (a int)'));
		res.push(alasql('insert into one values (1),(2),(3),(4),(5)'));
		res.push(alasql('select * from one'));
		assert.deepEqual(res, [1,5,[{a:1},{a:2},{a:3},{a:4},{a:5}]]);
		done();
	});

	it('B. Multiple statements in one string', function(){
		var sql = 'create table two (a int);';
		sql += 'insert into two values (1),(2),(3),(4),(5);';
		sql += 'select * from two;';
		var res = alasql(sql);
		assert.deepEqual(res, [1,5,[{a:1},{a:2},{a:3},{a:4},{a:5}]]);
	});

	it('C. Multiple statements in one string with callback', function(done){
		var sql = 'create table three (a int);';
		sql += 'insert into three values (1),(2),(3),(4),(5);';
		sql += 'select * from three;';
		alasql(sql, function(res){
			assert.deepEqual(res, [1,5,[{a:1},{a:2},{a:3},{a:4},{a:5}]]);
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
