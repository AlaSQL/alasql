if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2779 - foreign key to a table without a primary key', function () {
	before(function () {
		alasql('CREATE DATABASE test2779; USE test2779');
	});

	after(function () {
		alasql('DROP DATABASE test2779');
	});

	it('column-level REFERENCES to a UNIQUE column', function () {
		alasql('CREATE TABLE p (u INT UNIQUE)');
		alasql('CREATE TABLE c (v INT REFERENCES p(u), w INT)');
		alasql('INSERT INTO p VALUES (1)');
		assert.equal(alasql('INSERT INTO c VALUES (1, 2)'), 1);
		assert.equal(alasql('INSERT INTO c VALUES (NULL, 3)'), 1);
		assert.throws(() => alasql('INSERT INTO c VALUES (5, 4)'), /Foreign key "5" not found/);
		assert.deepEqual(alasql('SELECT w FROM c'), [{w: 2}, {w: 3}]);
	});

	it('table-level FOREIGN KEY to a UNIQUE column', function () {
		alasql('CREATE TABLE p2 (u INT, UNIQUE (u))');
		alasql('CREATE TABLE c2 (v INT, FOREIGN KEY (v) REFERENCES p2(u))');
		alasql('INSERT INTO p2 VALUES (1)');
		assert.equal(alasql('INSERT INTO c2 VALUES (1)'), 1);
		assert.throws(() => alasql('INSERT INTO c2 VALUES (2)'), /Foreign key "2" not found/);
	});

	it('text column without any key', function () {
		alasql('CREATE TABLE p3 (name STRING)');
		alasql('CREATE TABLE c3 (x STRING REFERENCES p3(name))');
		alasql("INSERT INTO p3 VALUES ('a')");
		assert.equal(alasql("INSERT INTO c3 VALUES ('a')"), 1);
		assert.throws(() => alasql("INSERT INTO c3 VALUES ('b')"), /not found/);
	});

	it('composite key', function () {
		alasql('CREATE TABLE p4 (a INT, b INT, UNIQUE (a, b))');
		alasql('CREATE TABLE c4 (x INT, y INT, FOREIGN KEY (x, y) REFERENCES p4(a, b))');
		alasql('INSERT INTO p4 VALUES (1, 2)');
		assert.equal(alasql('INSERT INTO c4 VALUES (1, 2)'), 1);
		assert.throws(() => alasql('INSERT INTO c4 VALUES (2, 1)'), /not found/);
	});

	it('no columns named and no primary key is still refused', function () {
		alasql('CREATE TABLE p5 (u INT)');
		assert.throws(
			() => alasql('CREATE TABLE c5 (v INT, FOREIGN KEY (v) REFERENCES p5)'),
			/PRIMARY KEY/
		);
	});
});
