if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2782 - CREATE DOMAIN and DROP DOMAIN', function () {
	before(function () {
		alasql('CREATE DATABASE test2782; USE test2782');
	});

	after(function () {
		alasql('DROP DATABASE test2782');
	});

	it('a column of the domain type checks the domain CHECK', function () {
		assert.equal(alasql('CREATE DOMAIN esal AS INTEGER CHECK (VALUE > 500)'), 1);
		alasql('CREATE TABLE emp (salary esal)');
		assert.equal(alasql('INSERT INTO emp VALUES (600)'), 1);
		assert.throws(() => alasql('INSERT INTO emp VALUES (100)'), /CHECK constraint/);
		assert.deepEqual(alasql('SELECT * FROM emp'), [{salary: 600}]);
		assert.equal(alasql('SHOW COLUMNS FROM emp')[0].dbtypeid, 'INTEGER');
	});

	it('several checks, no AS, and a default', function () {
		alasql('CREATE DOMAIN smint INTEGER DEFAULT 7 CHECK (1 <= VALUE) CHECK (100 >= VALUE)');
		alasql('CREATE TABLE s (id INT, n smint)');
		alasql('INSERT INTO s VALUES (1, 50)');
		assert.throws(() => alasql('INSERT INTO s VALUES (2, 0)'), /CHECK constraint/);
		assert.throws(() => alasql('INSERT INTO s VALUES (3, 101)'), /CHECK constraint/);
		alasql('INSERT INTO s (id) VALUES (4)');
		assert.deepEqual(alasql('SELECT * FROM s'), [
			{id: 1, n: 50},
			{id: 4, n: 7},
		]);
	});

	it('DROP DOMAIN', function () {
		alasql('CREATE DOMAIN d1 AS VARCHAR(10)');
		assert.equal(alasql('DROP DOMAIN d1 CASCADE'), 1);
		assert.throws(() => alasql('DROP DOMAIN d1'), /does not exist/);
		assert.throws(() => alasql('CREATE DOMAIN esal AS INT'), /already exists/);
	});

	it('toString', function () {
		assert.equal(
			alasql.parse('CREATE DOMAIN esal AS INTEGER CHECK (VALUE > 500)').toString(),
			'CREATE DOMAIN esal AS INTEGER CHECK (VALUE > 500)'
		);
		assert.equal(alasql.parse('DROP DOMAIN esal RESTRICT').toString(), 'DROP DOMAIN esal');
	});

	it('domain stays usable as a name', function () {
		alasql('CREATE TABLE domain (domain STRING)');
		alasql("INSERT INTO domain VALUES ('x')");
		assert.deepEqual(alasql('SELECT domain FROM domain'), [{domain: 'x'}]);
	});
});
