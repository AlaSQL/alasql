if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2883'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - foreign key to a primary key with a prefix length`, function () {
	let db;

	beforeEach(function () {
		db = new alasql.Database();
		db.exec('CREATE TABLE p (a STRING, PRIMARY KEY (a(2)))');
		db.exec("INSERT INTO p VALUES ('abc')");
	});

	it('A) A column REFERENCES compares the whole value', function () {
		db.exec('CREATE TABLE c (x STRING REFERENCES p(a))');
		assert.throws(function () {
			db.exec("INSERT INTO c VALUES ('abzzz')");
		}, /Foreign key "abzzz" not found in table "p"/);
		assert.strictEqual(db.exec("INSERT INTO c VALUES ('abc')"), 1);
		assert.deepStrictEqual(db.exec('SELECT * FROM c'), [{x: 'abc'}]);
	});

	it('B) A FOREIGN KEY constraint compares the whole value', function () {
		db.exec('CREATE TABLE c (x STRING, FOREIGN KEY (x) REFERENCES p(a))');
		assert.throws(function () {
			db.exec("INSERT INTO c VALUES ('abzzz')");
		}, /Foreign key "abzzz" not found in table "p"/);
		assert.strictEqual(db.exec("INSERT INTO c VALUES ('abc')"), 1);
		assert.deepStrictEqual(db.exec('SELECT * FROM c'), [{x: 'abc'}]);
	});

	it('C) A shorter value with the same prefix and an UPDATE are refused', function () {
		db.exec('CREATE TABLE c (x STRING REFERENCES p(a))');
		assert.throws(function () {
			db.exec("INSERT INTO c VALUES ('ab')");
		}, /Foreign key "ab" not found in table "p"/);
		db.exec("INSERT INTO c VALUES ('abc')");
		assert.throws(function () {
			db.exec("UPDATE c SET x = 'abzzz'");
		}, /Foreign key "abzzz" not found in table "p"/);
		assert.deepStrictEqual(db.exec('SELECT * FROM c'), [{x: 'abc'}]);
	});

	it('D) A composite foreign key compares the whole values', function () {
		db.exec('CREATE TABLE q (a STRING, b INT, PRIMARY KEY (a(2), b))');
		db.exec("INSERT INTO q VALUES ('abc', 1)");
		db.exec('CREATE TABLE d (x STRING, y INT, FOREIGN KEY (x, y) REFERENCES q(a, b))');
		assert.throws(function () {
			db.exec("INSERT INTO d VALUES ('abzzz', 1)");
		}, /Foreign key "abzzz, 1" not found in table "q"/);
		assert.strictEqual(db.exec("INSERT INTO d VALUES ('abc', 1)"), 1);
		assert.deepStrictEqual(db.exec('SELECT * FROM d'), [{x: 'abc', y: 1}]);
	});
});
