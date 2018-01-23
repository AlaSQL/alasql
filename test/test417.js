if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #379
*/

var test = 417;

describe('Test ' + test + ' Add JSON data directly to the table', function() {
	before(function() {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function() {
		alasql('DROP DATABASE test' + test);
	});

	it('1. Create table', function(done) {
		alasql('CREATE TABLE one (a INT PRIMARY KEY, b INT)');
		alasql.tables.one.data = [{a: 1, b: 10}, {a: 2, b: 20}];
		alasql.tables.one.indexColumns();
		done();
	});

	it.skip('2. Test inserr', function(done) {
		assert.throws(Error, function() {
			alasql('INSERT INTO one VALUES (3,30)');
		});
		done();
	});

	// it('3. Test wrong insert',function(done){
	//   alasql('INSERT INTO one VALUES (1,40)');
	//   var res = alasql('select * from one');
	//   console.log(res);
	//   done();
	// });
});
