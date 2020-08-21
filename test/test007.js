if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 007', function () {
	it('UPDATE WHERE test ', function (done) {
		var db = new alasql.Database('test007');

		db.exec('CREATE TABLE test (a INT, b INT, c INT)');
		db.exec('INSERT INTO test VALUES (1,10,100)');
		db.exec('INSERT INTO test VALUES (2,20,200)');
		db.exec('INSERT INTO test VALUES (3,30,300)');
		db.exec('INSERT INTO test VALUES (4,40,400)');
		db.exec('INSERT INTO test VALUES (5,50,500)');

		db.exec('UPDATE test SET a=c*100 WHERE b<=3*10');

		//		console.log(db.exec('SELECT * FROM test'))
		var res = db.exec('SELECT VALUE SUM(a) FROM test');

		assert.equal(60009, res);
		alasql('DROP DATABASE test007');
		done();
	});
});
