if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

if(typeof exports != 'object') {

describe('Test 150 - localStorage Engine', function() {

	it("1. Create database", function(done){
		alasql('SET AUTOCOMMIT OFF');
		assert(!alasql.autocommit);

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
		alasql('ATTACH localStorage DATABASE ls149 AS test150');
		assert(alasql.databases.test150);
		assert(alasql.databases.test150.engineid == 'localStorage');
		done();
	});

	it("4. Create localStorage databases", function(done){
		alasql('CREATE TABLE IF NOT EXISTS test150.one (a int, b string)');
//		assert(!alasql.databases.test149.tables.one);
console.log(JSON.parse(localStorage['ls150']));
		assert(JSON.parse(localStorage['ls150']).tables);
//		assert(JSON.parse(localStorage['ls149']).tables.one);
		assert(!localStorage['ls150.one']);
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
		alasql('select * into test150.one from test150a.one');
		assert(alasql.databases.test150.tables.one.data, [{"a":1,"b":"Moscow"},{"a":2,"b":"Kyiv"},{"a":3,"b":"Minsk"}]);

		var res = alasql('select * from test150.one');
		assert(res, [{"a":1,"b":"Moscow"},{"a":2,"b":"Kyiv"},{"a":3,"b":"Minsk"}]);
		done();
	});

/*;	it("6.Select from localStorage table", function(done) {
		var res = alasql('SELECT * FROM test149.one');
		assert(res.length == 3);
		done();
	});
*/

	it("7.Select into localStorage table", function(done) {
		var res = alasql('SELECT a*2 as a, b INTO test150.one FROM test150.one');
		assert(res == 3);
		done();
	});

	it("8.Drop localStorage table", function(done) {
		alasql('DROP TABLE test150.one');
		assert(!localStorage['ls150.one']);
		done();
	});


	it("99. Detach database", function(done){
		alasql('DROP DATABASE test150a');
		assert(!alasql.databases.test149a);
		alasql('DROP DATABASE test150');
		assert(!alasql.databases.test149);
		alasql('DROP localStorage DATABASE ls150');
		assert(!localStorage['ls150']);
		done();
	});
});

}

