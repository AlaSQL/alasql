if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 36', function () {
	var db;

	it('1. Create Database', function (done) {
		alasql.options.modifier = undefined;
		db = new alasql.Database('db');
		done();
	});

	it('2. INSERT INTO FROM 1', function (done) {
		db.exec('CREATE TABLE test1 (a STRING)');

		var sql = "INSERT INTO test1 (a) VALUES ('Alpha'), ('Beta'), ('Gamma'), ('Delta'), ('Epsilon')";
		db.exec(sql);

		var sql = 'SELECT VALUE COUNT(*) FROM test1';
		assert.equal(5, db.exec(sql));

		done();
	});
	it('3. INSERT INTO FROM 2', function (done) {
		db.exec('CREATE TABLE test2 (a STRING)');

		var sql = "INSERT INTO test2 SELECT * FROM test1 WHERE a LIKE '%mm%'";
		db.exec(sql);

		var res = db.exec('SELECT * FROM test2');
		assert.deepEqual([{a: 'Gamma'}], res);

		done();
	});
	it('4. INSERT INTO FROM 3', function (done) {
		db.exec('CREATE TABLE test3 (a STRING)');

		var sql = "INSERT INTO test3 SELECT * FROM test1 WHERE a NOT LIKE '%e%'";
		db.exec(sql);

		var res = db.exec('SELECT * FROM test3');
		assert.deepEqual([{a: 'Alpha'}, {a: 'Gamma'}], res);

		done();
	});
	it('99. Drop database', function (done) {
		done();
	});
});
