//
// tselect01.js
// Test for select
//

if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../src/alasql.js');
};


describe('Callback', function(){
	it('exec(sql, callback)', function(done) {

		var db = new alasql.Database();

		db.exec('CREATE TABLE test (a INT, b INT)');
		db.exec('INSERT INTO test VALUES (1,1)');

		db.exec('SELECT * FROM test', [], function(res) {
			assert.equal(1, res[0].a);
			done();		
		});

	});

});


