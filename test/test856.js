if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '856'; // insert test file number

describe('Test ' + test + ' - DELETE without WHERE clause', function () {
	it('1. Create test table', function (done) {
		alasql('DROP TABLE IF EXISTS test856table');
		alasql('CREATE TABLE test856table (id INT, name STRING)');
		done();
	});

	it('2. Insert test data', function (done) {
		alasql('INSERT INTO test856table VALUES (1, "Alice"), (2, "Bob"), (3, "Charlie")');
		var res = alasql('SELECT * FROM test856table');
		assert.equal(res.length, 3);
		done();
	});

	it('3. DELETE without WHERE should delete all rows', function (done) {
		var deletedCount = alasql('DELETE FROM test856table');
		assert.equal(deletedCount, 3, 'Should delete 3 rows');
		
		var res = alasql('SELECT * FROM test856table');
		assert.equal(res.length, 0, 'Table should be empty after DELETE');
		done();
	});

	it('4. Test DELETE without WHERE on fresh data', function (done) {
		alasql('INSERT INTO test856table VALUES (1, "Test1"), (2, "Test2")');
		var res = alasql('SELECT * FROM test856table');
		assert.equal(res.length, 2);
		
		var deletedCount = alasql('DELETE FROM test856table');
		assert.equal(deletedCount, 2, 'Should delete 2 rows');
		
		var res2 = alasql('SELECT * FROM test856table');
		assert.equal(res2.length, 0, 'Table should be empty after DELETE');
		done();
	});

	it('5. Cleanup', function (done) {
		alasql('DROP TABLE test856table');
		done();
	});
});
