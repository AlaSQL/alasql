if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2789'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - named column constraints and table constraints first`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE p (a INT PRIMARY KEY)');
		alasql('INSERT INTO p VALUES (1)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// NOTE: Always assert.deepStrictEqual the final and complete output of the last call to alasql

	it('A) CONSTRAINT name REFERENCES', function () {
		alasql('CREATE TABLE c1 (a INT CONSTRAINT c1 REFERENCES p)');
		alasql('INSERT INTO c1 VALUES (1)');
		assert.throws(() => alasql('INSERT INTO c1 VALUES (2)'));
		assert.deepStrictEqual(alasql('SELECT * FROM c1'), [{a: 1}]);
	});

	it('B) CONSTRAINT name NOT NULL marks the column like NOT NULL', function () {
		alasql('CREATE TABLE c2 (a INT CONSTRAINT c2 NOT NULL)');
		alasql('CREATE TABLE c2b (a INT NOT NULL)');
		const db = alasql.databases['test' + testId];
		assert.deepStrictEqual(db.tables.c2.columns, db.tables.c2b.columns);
	});

	it('C) CONSTRAINT name CHECK and UNIQUE', function () {
		alasql('CREATE TABLE c3 (a INT CONSTRAINT c3 CHECK (a > 0) CONSTRAINT c3u UNIQUE)');
		alasql('INSERT INTO c3 VALUES (1)');
		assert.throws(() => alasql('INSERT INTO c3 VALUES (-1)'));
		assert.throws(() => alasql('INSERT INTO c3 VALUES (1)'));
		assert.deepStrictEqual(alasql('SELECT * FROM c3'), [{a: 1}]);
	});

	it('D) CONSTRAINT after DEFAULT with a function', function () {
		alasql('CREATE TABLE c4 (a INT, b INT DEFAULT ABS(-5) CONSTRAINT c4 NOT NULL)');
		alasql('INSERT INTO c4 (a) VALUES (1)');
		assert.deepStrictEqual(alasql('SELECT * FROM c4'), [{a: 1, b: 5}]);
	});

	it('E) table constraint before the columns', function () {
		alasql('CREATE TABLE c5 (PRIMARY KEY (id), naam CHAR(10), id INT)');
		alasql("INSERT INTO c5 VALUES ('x', 1)");
		assert.throws(() => alasql("INSERT INTO c5 VALUES ('y', 1)"));
		assert.deepStrictEqual(alasql('SELECT * FROM c5'), [{naam: 'x', id: 1}]);
	});

	it('F) table constraints before and after the columns', function () {
		alasql('CREATE TABLE c6 (PRIMARY KEY (id), id INT, b INT, UNIQUE (b))');
		alasql('INSERT INTO c6 VALUES (1, 1)');
		assert.throws(() => alasql('INSERT INTO c6 VALUES (2, 1)'));
		assert.deepStrictEqual(alasql('SELECT * FROM c6'), [{id: 1, b: 1}]);
	});
});
