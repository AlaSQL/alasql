if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 13', function () {
	it('Transactions', function (done) {
		var db = new alasql.Database('mydb');

		db.exec('CREATE TABLE students (studentid INT, studentname STRING)');

		for (var i = 0; i < 1000; i++) {
			db.exec("INSERT INTO students VALUES (2,'Peter Peterson')");
		}
		var res = db.exec('SELECT VALUE COUNT(*) FROM students');
		assert.equal(1000, res);

		db.transaction(function (tx) {
			for (var i = 0; i < 1000; i++) {
				tx.exec("INSERT INTO students VALUES (3,'Alemu Abebe')");
			}
			//console.log(1);
			var res = tx.exec('SELECT VALUE COUNT(*) FROM students');
			assert.equal(2000, res);

			tx.rollback();

			var res = tx.exec('SELECT VALUE COUNT(*) FROM students');
			assert.equal(1000, res);

			done();
		});
	});
});
