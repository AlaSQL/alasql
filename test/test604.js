if(typeof exports === 'object') {
    var assert = require("assert");
    var alasql = require('..');
} else {
    __dirname = '.';
}

if(typeof exports == 'object') {

    var DOMStorage = require("dom-storage")
    global.localStorage = new DOMStorage("./test604.json", { strict: false, ws: '' });

}

describe('Test 604 - CREATE VIEW error with localStorage engine #604', function() {

	after(function(){
		localStorage.clear();
	})

    it("* Create database", function(){
	alasql('SET AUTOCOMMIT OFF');
	//		console.log(!alasql.options.autocommit);
		assert(!alasql.options.autocommit);
		alasql('DROP localStorage DATABASE IF EXISTS db604ls');
		assert(!localStorage['db604ls']);
		assert(!localStorage['db604ls.one']);
		alasql('CREATE localStorage DATABASE IF NOT EXISTS db604ls');
		assert(localStorage['db604ls']);
    });

    it("* Show databases", function(){
		var res = alasql('SHOW localStorage DATABASES');
		var found = false;
		res.forEach(function(d){ found = found || (d.databaseid == "db604ls")});
		assert(found);
    });

    it("* Attach localStorage database", function(){
		alasql('ATTACH LOCALSTORAGE DATABASE db604ls AS db604');
		assert(alasql.databases.db604);
		assert(alasql.databases.db604.engineid == 'LOCALSTORAGE');
    });

    it("* Create table", function(){
		alasql('CREATE TABLE db604.t1 (a int, b string)');
		assert(localStorage['db604ls.t1']);
		assert(JSON.parse(localStorage['db604ls']).tables.t1);
    });

    it("* Insert values into table", function(done) {
		alasql.promise('insert into db604.t1 VALUES (1,"Moscow"), (2, "Kyiv"), (3,"Minsk")')
		    .then(function (rows) {
				assert.deepEqual(alasql.databases.db604.tables.t1.data, [{"a":1,"b":"Moscow"},{"a":2,"b":"Kyiv"},{"a":3,"b":"Minsk"}]);
				done();
		    })
    });

    it("* Select from table", function() {
		var res = alasql('SELECT * FROM db604.t1');
		assert(res.length == 3);
    });


    it("* Create view", function(){
		alasql('CREATE VIEW db604.v1 AS SELECT a,b FROM db604.t1');
		assert(localStorage['db604ls.v1']);
		assert(JSON.parse(localStorage['db604ls']).tables.v1);
    });

    it("* Select from view", function() {
		var res = alasql('SELECT * FROM db604.v1');
		assert(res.length == 3);
    });


    it.skip("* Detach database", function(){
		alasql('DETACH DATABASE db604');
		assert(!alasql.databases.db604);
    });
    
    it.skip("* Reattach database", function(){
		alasql('ATTACH LOCALSTORAGE DATABASE db604ls AS db604');
		assert(alasql.databases.db604);
		assert(alasql.databases.db604.engineid == 'LOCALSTORAGE');
    });

    it.skip("* Reselect from table", function() {
		var res = alasql('SELECT * FROM db604.t1');
		assert(res.length == 3);
    });

    it.skip("* Reselect from view", function(done) {
		alasql.promise('SELECT * FROM db604.v1')
		    .then(function (res) {
				assert(res.length == 3);
				done();
		    })
    });

    it("* Drop table", function() {
		var res = alasql('DROP TABLE db604.t1');
		assert(!localStorage['db604.t1']);
    });
    
    it("* Drop view", function() {
		var res = alasql('DROP VIEW db604.v1');
		assert(!localStorage['db604.v1']);
    });
    
    it("* Detachch database", function(){
		alasql('DETACH DATABASE db604');
		assert(!alasql.databases.db604);
    });

    it("* Drop database", function(){
		alasql('DROP LOCALSTORAGE DATABASE db604ls');
		assert(!localStorage['db605ls']);
    });

});


