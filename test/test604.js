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

    it("* Create database", function(done){
	alasql('SET AUTOCOMMIT OFF');
	//		console.log(!alasql.options.autocommit);
	assert(!alasql.options.autocommit);


	alasql('DROP localStorage DATABASE IF EXISTS db604ls');
	assert(!localStorage['db604ls']);
	assert(!localStorage['db604ls.one']);
	alasql('CREATE localStorage DATABASE IF NOT EXISTS db604ls');
	assert(localStorage['db604ls']);
	done();
    });

    it("* Show databases", function(done){
	var res = alasql('SHOW localStorage DATABASES');
	var found = false;
	res.forEach(function(d){ found = found || (d.databaseid == "db604ls")});
	assert(found);
	done();
    });

    it("* Attach localStorage database", function(done){
	alasql('ATTACH LOCALSTORAGE DATABASE db604ls AS db604');
	assert(alasql.databases.db604);
	assert(alasql.databases.db604.engineid == 'LOCALSTORAGE');
	done();
    });

    it("* Create table", function(done){
	alasql('CREATE TABLE db604.t1 (a int, b string)');
	assert(localStorage['db604ls.t1']);
	assert(JSON.parse(localStorage['db604ls']).tables.t1);
	done();
    });

    it("* Insert values into table", function(done) {
	alasql.promise('insert into db604.t1 VALUES (1,"Moscow"), (2, "Kyiv"), (3,"Minsk")')
	    .then(function (rows) {
		assert.deepEqual(alasql.databases.db604.tables.t1.data, [{"a":1,"b":"Moscow"},{"a":2,"b":"Kyiv"},{"a":3,"b":"Minsk"}]);
		done();
	    })
	    .catch(done);

    });

    it("* Select from table", function(done) {
	var res = alasql('SELECT * FROM db604.t1');
	assert(res.length == 3);
	done();
    });


    it("* Create view", function(done){
	alasql('CREATE VIEW db604.v1 AS SELECT a,b FROM db604.t1');
	assert(localStorage['db604ls.v1']);
	assert(JSON.parse(localStorage['db604ls']).tables.v1);
	done();
    });

    it("* Select from view", function(done) {
	var res = alasql('SELECT * FROM db604.v1');
	assert(res.length == 3);
	done();
    });


    it("* Detach database", function(done){
	alasql('DETACH DATABASE db604');
	assert(!alasql.databases.db604);
	done();
    });
    
    it("* Reattach database", function(done){
	alasql('ATTACH LOCALSTORAGE DATABASE db604ls AS db604');
	assert(alasql.databases.db604);
	assert(alasql.databases.db604.engineid == 'LOCALSTORAGE');
	done();
    });

    it("* Reselect from table", function(done) {
	var res = alasql('SELECT * FROM db604.t1');
	assert(res.length == 3);
	done();
    });

    it("* Reselect from view", function(done) {
	alasql.promise('SELECT * FROM db604.v1')
	    .then(function (res) {
//		console.log(res);
		assert(res.length == 3);
		done();
	    })
	    .catch(done);
    });

    it("* Drop table", function(done) {
	var res = alasql('DROP TABLE db604.t1');
	//		alasql('COMMIT TRANSACTION');
	assert(!localStorage['db604.t1']);
	done();
    });
    
    it("* Detachch database", function(done){
	alasql('DETACH DATABASE db604');
	assert(!alasql.databases.db604);
	done();
    });
    it("* Drop database", function(done){
	alasql('DROP LOCALSTORAGE DATABASE db604ls');
	assert(!localStorage['db605ls']);
	done();
    });

});


