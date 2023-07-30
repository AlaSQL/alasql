if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 18', function () {
	it('Subqueries and cross-joins', function (done) {
		var db = new alasql.Database();

		db.exec('CREATE TABLE test (a int)');
		db.exec('INSERT INTO test VALUES (1)');
		db.exec('INSERT INTO test VALUES (2)');
		db.exec('INSERT INTO test VALUES (3)');
		db.exec('INSERT INTO test VALUES (4)');
		db.exec('INSERT INTO test VALUES (5)');
		db.exec('INSERT INTO test VALUES (6)');
		db.exec('INSERT INTO test VALUES (7)');
		var res = db.exec('SELECT VALUE SUM(a*2+1) AS aa FROM (SELECT a FROM test) q');
		assert.equal(res, 63);

		var res = db.exec(
			'SELECT q.x, w.y ' +
				' FROM ' +
				' (SELECT test.a AS x FROM test WHERE a<5) q, ' +
				' (SELECT test.a AS y FROM test WHERE test.a>3) w '
		);
		assert.equal(res.length, 16);

		done();
	});
});
