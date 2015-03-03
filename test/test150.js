if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

if(typeof exports == 'object') {

	var DOMStorage = require("dom-storage")
	global.localStorage = new DOMStorage("./test150.json", { strict: false, ws: '' });

};

describe('Test 150 - localStorage Engine', function() {

	it("1. Create database", function(done){
		alasql('SET AUTOCOMMIT OFF');
//		console.log(!alasql.options.autocommit);
		assert(!alasql.options.autocommit);

//delete localStorage['ls150.one'];

		alasql('DROP localStorage DATABASE IF EXISTS ls150');
		assert(!localStorage['ls150']);
		assert(!localStorage['ls150.one']);
		alasql('CREATE localStorage DATABASE IF NOT EXISTS ls150');
		assert(localStorage['ls150']);
		done();
	});

	it("2. Show databases", function(done){
		var res = alasql('SHOW localStorage DATABASES');
		var found = false;
		res.forEach(function(d){ found = found || (d.databaseid == "ls150")});
		assert(found);
		done();
	});

	it("3. Attach localStorage database", function(done){
		alasql('ATTACH LOCALSTORAGE DATABASE ls150 AS test150');
		assert(alasql.databases.test150);
		assert(alasql.databases.test150.engineid == 'LOCALSTORAGE');
		done();
	});

	it("4. Create localStorage databases", function(done){
		alasql('CREATE TABLE IF NOT EXISTS test150.one (a int, b string)');
//		assert(!alasql.databases.test149.tables.one);
//console.log(JSON.parse(localStorage['ls150']));
		assert(localStorage['ls150.one']);
		assert(JSON.parse(localStorage['ls150']).tables.one);
//		assert(JSON.parse(localStorage['ls149']).tables.one);
		// var tb = JSON.parse(localStorage['ls149']).tables.one;
		// assert(tb.columns);
		// assert(tb.columns[0].columnid == 'a');
		// assert(tb.columns[1].columnid == 'b');
		done();
	});

	it("5.Insert values into localStorage database", function(done) {
		alasql('create database test150a');
		alasql('CREATE TABLE test150a.one (a int, b string)');

		alasql('insert into test150a.one VALUES (1,"Moscow"), (2, "Kyiv"), (3,"Minsk")');
		var res = alasql('select * into test150.one from test150a.one');
//		console.log(alasql.databases.test150.tables);
		assert.deepEqual(alasql.databases.test150.tables.one.data, [{"a":1,"b":"Moscow"},{"a":2,"b":"Kyiv"},{"a":3,"b":"Minsk"}]);

		var res = alasql('select * from test150.one');
//		console.log(res);
		assert.deepEqual(res, [{"a":1,"b":"Moscow"},{"a":2,"b":"Kyiv"},{"a":3,"b":"Minsk"}]);
		done();
	});

	it("6.Select from localStorage table", function(done) {
		var res = alasql('SELECT * FROM test150.one');
//		console.log(res);
		assert(res.length == 3);
		done();
	});

	it("7.Select into localStorage table", function(done) {
		var res = alasql('SELECT a*2 as a, b INTO test150.one FROM test150.one');
		assert(res == 3);
		var res = alasql('SELECT * FROM test150.one');
		assert(res.length == 6);
		done();
	});

	it("8.Select into localStorage table", function(done) {
		alasql('USE test150');
		var res = alasql('COMMIT TRANSACTION');
//		console.log(res);
		assert(res,1);

		var res = alasql('SELECT * FROM test150.one');
		assert(res.length == 6);
		done();
	});


	it("8.Drop localStorage table", function(done) {
		var res = alasql('DROP TABLE test150.one');
//		alasql('COMMIT TRANSACTION');
		assert(!localStorage['ls150.one']);
		done();
	});


	it("99. Detach database", function(done){
		alasql('DROP DATABASE test150a');
		assert(!alasql.databases.test150a);
		alasql('DETACH DATABASE test150');
		assert(!alasql.databases.test150);
		alasql('DROP LOCALSTORAGE DATABASE ls150');
		assert(!localStorage['ls150']);
		done();
	});

});


