if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

if(typeof exports != 'object') {

describe('Test 149 - localStorage Engine with AUTOCOMMIT ON', function() {

	it("1. Create database", function(done){
		alasql('SET AUTOCOMMIT ON');
		assert(alasql.autocommit);

		alasql('DROP localStorage DATABASE IF EXISTS ls149');
		assert(!localStorage['ls149']);
		assert(!localStorage['ls149.one']);
		alasql('CREATE localStorage DATABASE IF NOT EXISTS ls149');
		assert(localStorage['ls149']);
		done();
	});

	it("2. Show databases", function(done){
		var res = alasql('SHOW localStorage DATABASES');
		var found = false;
		res.forEach(function(d){ found = found || (d.databaseid == "ls149")});
		assert(found);
		done();
	});

	it("3. Attach localStorage database", function(done){
		alasql('ATTACH localStorage DATABASE ls149 AS test149');
		assert(alasql.databases.test149);
		assert(alasql.databases.test149.engineid == 'localStorage');
		done();
	});

	it("4. Create localStorage databases", function(done){
		alasql('CREATE TABLE IF NOT EXISTS test149.one (a int, b string)');
//		assert(!alasql.databases.test149.tables.one);
		assert(JSON.parse(localStorage['ls149']).tables);
		assert(JSON.parse(localStorage['ls149']).tables.one);
		assert(JSON.parse(localStorage['ls149.one']));
		var tb = JSON.parse(localStorage['ls149']).tables.one;
		assert(tb.columns);
		assert(tb.columns[0].columnid == 'a');
		assert(tb.columns[1].columnid == 'b');
		done();
	});

	it("5.Insert values into localStorage database", function(done) {
		alasql('create database test149a');
		alasql('CREATE TABLE test149a.one (a int, b string)');

		alasql('insert into test149a.one VALUES (1,"Moscow"), (2, "Kyiv"), (3,"Minsk")');
		alasql('select * into test149.one from test149a.one');
		assert.deepEqual(JSON.parse(localStorage['ls149.one']), [{"a":1,"b":"Moscow"},{"a":2,"b":"Kyiv"},{"a":3,"b":"Minsk"}]);

		var res = alasql('select * from test149.one');
		assert.deepEqual(res, [{"a":1,"b":"Moscow"},{"a":2,"b":"Kyiv"},{"a":3,"b":"Minsk"}]);
//		assert(alasql.engines.localStorage.get('ls149.one').length == 3);
		done();
	});

	// it("6.Select from localStorage table", function(done) {
	// 	var res = alasql('SELECT * FROM test149.one');
	// 	assert(res.length == 3);
	// 	done();
	// });
//if(false) {

	it("7.Select into localStorage table", function(done) {
		var res = alasql('select * from test149.one');
		assert(res.length == 3);
		var res = alasql('SELECT a*2 as a, b FROM test149.one');
		assert(res.length == 3);
		var res = alasql('SELECT a*2 as a, b INTO test149.one FROM test149.one');
		assert(res == 3);
		done();
	});
//}
	it("8.Drop localStorage table", function(done) {
		alasql('DROP TABLE test149.one');
		assert(!localStorage['ls149.one']);
		done();
	});


	it("99. Detach database", function(done){
		alasql('DROP DATABASE test149a');
		assert(!alasql.databases.test149a);
		alasql('DROP DATABASE test149');
		assert(!alasql.databases.test149);
		alasql('DROP localStorage DATABASE ls149');
		assert(!localStorage['ls149']);
		done();
	});
});

}

