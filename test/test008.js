if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 08', function () {
	it('UPDATE WHERE with conditions test ', function (done) {
		var db = new alasql.Database();

		db.exec('CREATE TABLE test (a INT, b INT, c INT)');
		db.exec('INSERT INTO test VALUES (1,10,100)');
		db.exec('INSERT INTO test VALUES (2,20,200)');
		db.exec('INSERT INTO test VALUES (3,30,300)');
		db.exec('INSERT INTO test VALUES (4,40,400)');
		db.exec('INSERT INTO test VALUES (5,50,500)');

		db.exec('UPDATE test SET a=a*100, b=-b WHERE b<=3*10 AND a<>2');

		var res = db.exec('SELECT VALUE SUM(a) FROM test');
		assert.equal(411, res);

		var res = db.exec('SELECT VALUE MIN(b) FROM test');
		assert.equal(-30, res);
		done();
	});
});
