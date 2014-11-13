//
// tselect01.js
// Test for select
//

if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};


describe('Callback', function(){
	it('exec(sql, callback)', function(done) {

		alasql('drop table if exists test');
		alasql.exec('CREATE TABLE test (a INT, b INT)');

		alasql.exec('INSERT INTO test VALUES (1,1)');

		alasql.exec('SELECT * FROM test', [], function(res) {
			assert.equal(1, res[0].a);
			done();		
		});

	});

});


