if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

describe('Test 132 Alasql + NoSQL', function() {

	it("1. Prepare database", function(done){
		alasql('CREATE DATABASE test132; USE test132');
		alasql('CREATE TABLE one (a INT, b STRING)');
		alasql('CREATE TABLE two');
		// alasql('CREATE TABLE three ?',[{columnid:"a"},{columnid:"b"}]);
		done();
	});

	it("2. INSERT", function(done) {
		alasql('INSERT INTO one VALUES (1,"One"), (2,"Two")');
		alasql('INSERT INTO one VALUES @{a:3,b:"Three"}, @{a:4,b:"Four"}, (5,"Five")');
		alasql('INSERT INTO one VALUES ?,?,(?,?)',[{a:6,b:'Six'}, {a:7,b:'Seven'}, 8, "Eight"]);
		alasql.tables.one.insert({a:9,b:"Nine"});
		alasql.tables.two.insert({a:1,b:[2,{c:3},4]});
		alasql.tables.two.insert({a:1,b:[2,{c:5},4]});
		alasql.tables.two.insert({a:1,b:[2,{c:6},4]});
		done();
	});

	it("3. SELECT", function(done) {
		var res1 = alasql('SELECT * FROM one WHERE b IN (2,3)');
		var res2 = alasql('SELECT * FROM one WHERE @{b:@[2,3]}');
		var res3 = alasql.tables.one.find({b:[2,3]});
		assert.deepEqual(res1,res2);
		assert.deepEqual(res1,res3);

		var res1 = alasql('SELECT (a = 2) AS alpha FROM one WHERE b IN (2,3)');
		var res2 = alasql('SELECT @{a:2} AS alpha FROM one WHERE @{b:[2,3]}');
		assert.deepEqual(res1,res2);

		done();
	});


	it("4. DEEP SELECT...", function(done) {
//		var res2 = alasql('SELECT * FROM two WHERE ...');

		done();
	});

	it("5. UPDATE", function(done) {
		alasql('UPDATE one SET {a:2} WHERE {a:3}');
		alasql('UPDATE one SET a=2 WHERE a=3');
		alasql.tables.one.update({a:2}, {a:3});
		done();
	});

	it("6. UPDATE", function(done) {
		alasql('DELETE FROM one WHERE @{a:2}');
		alasql('DELETE FROM one WHERE a=2');
		alasql.tables.one.remove({a:2})
		done();
	});

	it("99. UPDATE", function(done) {
		alasql('DROP DATABASE test132');
		done();
	});

});
