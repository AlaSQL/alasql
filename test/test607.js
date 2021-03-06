if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '607'; // insert test file number

describe('Test ' + test + ' - TRUNCATE on table in Local Storage', function () {
	before(function () {
		alasql('DROP LOCALSTORAGE DATABASE IF EXISTS test' + test);
		alasql('CREATE LOCALSTORAGE DATABASE test' + test);
		alasql('ATTACH LOCALSTORAGE DATABASE test' + test);
		alasql('USE test' + test);
		alasql('CREATE TABLE one (id INT IDENTITY(3,5), name VARCHAR)');
		alasql("INSERT INTO one (name) VALUES ('one'),('two'),('three'),('four'),('five')");
	});

	after(function () {
		alasql('DROP LOCALSTORAGE DATABASE test' + test);
	});

	it('A) Attempt TRUNCATE on table', function () {
		var res = alasql('TRUNCATE TABLE one');
		assert.equal(res, 1);
	});

	it('B) Make sure table is empty', function () {
		var res = alasql('SELECT id, name FROM one');
		assert.equal(res.length, 0);
	});

	// 	it('C) Insert values and check that identity is reset', function(){
	//BUG At this point the table is empty, resulting from the last TRUNCATE.
	//Using alasql.autoval('one', 'id') expecting no last identity, since
	//table is empty. But method returns -2
	//Using alasql.autoval('one', 'id', true) returns the correct value (3),
	//since the first identity should be 3

	// alasql("INSERT INTO one (name) VALUES ('one'),('two'),('three'),('four'),('five')");
	//BUG The value of the id column for all rows is undefined.
	//Expected values to be 3, 8, 13, 18 and 23

	//BUG At this point the table is filled with 5 rows.
	//Using alasql.autoval('one', 'id') expecting 23 for the fifth row. But
	//method returns -2.
	//Using alasql.autoval('one', 'id', true) to get the next value returns 3,
	//but should have been 28 (the next value after 23)

	//   assert.equal(lastId, 23);
	//  });

	// 	it('D) Check TRUNCATE rolls back in an ABORT', function(){
	//BUG Test fails. Truncate is not rolled back when transaction
	//is aborted.
	//BUG Statement cannot just be'BEGIN', as per documentation.
	//It needs to be 'BEGIN TRANSACTION'. Same goes for 'ROLLBACK'
	//and 'COMMIT'
	//populate the table
	// 	alasql('TRUNCATE TABLE one');
	// 	alasql("INSERT INTO one (name) VALUES ('one'),('two'),('three'),('four'),('five')");
	//
	// 	alasql('BEGIN TRANSACTION');
	// 	alasql('TRUNCATE TABLE one');
	// 	alasql('COMMIT TRANSACTION');
	// 	var rows = alasql('SELECT id FROM one');
	// 	assert.equal(rows.length, 0);
	// });

	it('D) Check TRUNCATE works in a COMMIT', function () {
		//populate the table
		alasql('TRUNCATE TABLE one');
		alasql("INSERT INTO one (name) VALUES ('one'),('two'),('three'),('four'),('five')");

		alasql('BEGIN TRANSACTION');
		alasql('TRUNCATE TABLE one');
		alasql('COMMIT TRANSACTION');
		var rows = alasql('SELECT id FROM one');
		assert.equal(rows.length, 0);
	});
});
