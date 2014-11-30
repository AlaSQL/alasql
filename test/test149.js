if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

if(typeof exports != 'object') {

describe('Test 149 - localStorage Engine', function() {

	it("1. Create database", function(done){
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
	//	assert(alasql.databases.test149.tables.one);
		assert(JSON.parse(localStorage['ls149']).tables);
		assert(JSON.parse(localStorage['ls149']).tables.one);
		assert(JSON.parse(localStorage['ls149.one']));
		done();
	});

	it("5.Insert values into localStorage database", function(done) {
		alasql('create database test149a');
		alasql('insert into test149a.one VALUES (1,"Moscow"), (2, "Kyiv"), (3,"Minsk")');
		assert(alasql.engines.localStorage.get('ls149.one').length == 3);
		done();
	});

/*	it("6.Select from localStorage table", function(done) {
		var res = alasql('SELECT * FROM test149.one');
		assert(res.length == 3);
		done();
	});
*/
	it("7.Select into localStorage table", function(done) {
		var res = alasql('SELECT a*2 as a, b INTO test149.one FROM test149.one');
		assert(res == 3);
		done();
	});

	it("8.Drop localStorage table", function(done) {
		alasql('DROP TABLE ls149.one');
		assert(!localStorage['ls149.one']);
		done();
	});


	it("99. Detach database", function(done){
		alasql('DROP localStorage DATABASE ls149');
		assert(!localStorage['ls149']);
		done();
	});
});

}

