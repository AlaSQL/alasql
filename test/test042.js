if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 42', function () {
	describe('MID function', function () {
		var db;
		it('MID Function', function (done) {
			db = new alasql.Database('db');

			db.exec('CREATE TABLE one (a STRING, b FLOAT)');
			db.exec('INSERT INTO one VALUES ("One", 1.234),("Two", 2.9876443343),("Three", 3.3322343)');
			var res = db.exec('SELECT COLUMN MID(a,2,2) AS b FROM one');
			assert.deepEqual(['ne', 'wo', 'hr'], res);
			done();
		});

		it('ROUND Function', function (done) {
			var res = db.exec('SELECT COLUMN ROUND(b) AS b FROM one');
			assert.deepEqual([1, 3, 3], res);

			var res = db.exec('SELECT COLUMN ROUND(b,1) AS b FROM one');
			assert.deepEqual([1.2, 3.0, 3.3], res);

			done();
		});
	});
});
