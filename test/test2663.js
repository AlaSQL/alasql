if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2663'; // Foreign key errors name the table

describe(`Test ${testId} - foreign key errors name the table`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE p (a INT, b INT, PRIMARY KEY (a, b))');
		alasql('INSERT INTO p VALUES (1, 1)');
		alasql('CREATE TABLE c (x INT, y INT, FOREIGN KEY (x, y) REFERENCES p (a, b))');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) NULL in some columns is refused, and the error names the table', function () {
		assert.throws(
			() => alasql('INSERT INTO c VALUES (1, NULL)'),
			/Invalid foreign key on table c$/
		);
		assert.strictEqual(alasql('INSERT INTO c VALUES (NULL, NULL)'), 1);
	});

	it('B) A key without NULL is still checked', function () {
		assert.strictEqual(alasql('INSERT INTO c VALUES (1, 1)'), 1);
		assert.throws(
			() => alasql('INSERT INTO c VALUES (1, 2)'),
			/Foreign key "1, 2" not found in table "p"/
		);
	});

	it('C) The error at CREATE TABLE names the table', function () {
		assert.throws(
			() => alasql('CREATE TABLE e (x INT, FOREIGN KEY (x) REFERENCES p (a, b))'),
			/Invalid foreign key on table e/
		);
	});
});
