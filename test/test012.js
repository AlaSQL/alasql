if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 12', function () {
	it('store and restore - test not ready yet! ', function (done) {
		if (false) {
			var db = alasql.restore('mydb');
			//	console.log(!!db);
			if (!db) db = new alasql.Database('mydb');
			//	console.log(db);

			db.exec('CREATE TABLE IF NOT EXISTS students (studentid INT, studentname STRING)');
			db.exec("INSERT INTO students VALUES (1,'John Johnson')");
			db.exec("INSERT INTO students VALUES (2,'Peter Peterson')");

			//			console.table(db.exec('SELECT * FROM students'));
			//			console.log(db.queryValue('SELECT COUNT(*) FROM students'));
			alasql.store('mydb');
		}
		done();
	});
});
