if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 925 - UNIQUE JSON property', function () {
	const test = '925';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) UNIQUE with JSON property using -> operator should work', function () {
		alasql('CREATE TABLE BOM1(name JSON, UNIQUE(name->test))');

		// First insert should work
		alasql('INSERT INTO BOM1 VALUES (@{test:1})');

		// Second insert with same value should fail
		var didThrow = false;
		try {
			alasql('INSERT INTO BOM1 VALUES (@{test:1})');
		} catch (e) {
			didThrow = true;
		}
		assert(didThrow, 'Should throw constraint violation for duplicate value');

		// Insert with different value should work
		alasql('INSERT INTO BOM1 VALUES (@{test:2})');

		var res = alasql('SELECT * FROM BOM1');
		assert.deepEqual(res, [{name: {test: 1}}, {name: {test: 2}}]);
	});

	it('B) UNIQUE with JSON property using . operator should work', function () {
		alasql('CREATE TABLE BOM2(name JSON, UNIQUE(name.test))');

		// First insert should work
		alasql('INSERT INTO BOM2 VALUES (@{test:1})');

		// Second insert with same value should fail
		var didThrow = false;
		try {
			alasql('INSERT INTO BOM2 VALUES (@{test:1})');
		} catch (e) {
			didThrow = true;
		}
		assert(didThrow, 'Should throw constraint violation for duplicate value');

		// Insert with different value should work
		alasql('INSERT INTO BOM2 VALUES (@{test:2})');

		var res = alasql('SELECT * FROM BOM2');
		assert.deepEqual(res, [{name: {test: 1}}, {name: {test: 2}}]);
	});

	it('C) CREATE UNIQUE INDEX with JSON property should check uniqueness', function () {
		alasql('CREATE TABLE BOM3(name JSON)');
		alasql('CREATE UNIQUE INDEX xx on BOM3(name->test)');

		// First insert should work
		alasql('INSERT INTO BOM3 VALUES (@{test:1})');

		// Second insert with same value should fail
		var didThrow = false;
		try {
			alasql('INSERT INTO BOM3 VALUES (@{test:1})');
		} catch (e) {
			didThrow = true;
		}
		assert(didThrow, 'Should throw constraint violation for duplicate value');

		// Insert with different value should work
		alasql('INSERT INTO BOM3 VALUES (@{test:2})');

		var res = alasql('SELECT * FROM BOM3');
		assert.deepEqual(res, [{name: {test: 1}}, {name: {test: 2}}]);
	});

	it('D) Regular (non-unique) index with JSON property allows duplicates', function () {
		alasql('CREATE TABLE BOM4(name JSON)');
		alasql('CREATE INDEX idx_regular on BOM4(name->test)');

		// Insert same value multiple times - should all succeed
		alasql('INSERT INTO BOM4 VALUES (@{test:1})');
		alasql('INSERT INTO BOM4 VALUES (@{test:1})');
		alasql('INSERT INTO BOM4 VALUES (@{test:2})');
		alasql('INSERT INTO BOM4 VALUES (@{test:2})');

		var res = alasql('SELECT * FROM BOM4');
		assert.equal(res.length, 4, 'Should allow duplicate values in regular index');
		assert.deepEqual(res, [
			{name: {test: 1}},
			{name: {test: 1}},
			{name: {test: 2}},
			{name: {test: 2}},
		]);
	});

	it('E) Multiple indexes (unique and regular) on same table', function () {
		alasql('CREATE TABLE BOM5(id INT, data JSON)');
		alasql('CREATE UNIQUE INDEX idx_id on BOM5(id)');
		alasql('CREATE INDEX idx_data on BOM5(data->value)');

		// Insert records with unique id but duplicate data->value
		alasql('INSERT INTO BOM5 VALUES (1, @{value:100})');
		alasql('INSERT INTO BOM5 VALUES (2, @{value:100})'); // Same data->value, different id - OK
		alasql('INSERT INTO BOM5 VALUES (3, @{value:200})');

		var res = alasql('SELECT * FROM BOM5 ORDER BY id');
		assert.equal(res.length, 3);
		assert.deepEqual(res, [
			{id: 1, data: {value: 100}},
			{id: 2, data: {value: 100}},
			{id: 3, data: {value: 200}},
		]);

		// Try to insert duplicate id - should fail
		var didThrow = false;
		try {
			alasql('INSERT INTO BOM5 VALUES (1, @{value:300})');
		} catch (e) {
			didThrow = true;
		}
		assert(didThrow, 'Should throw constraint violation for duplicate unique index');
	});

	it('F) Multiple unique indexes on different JSON properties', function () {
		alasql('CREATE TABLE BOM6(data JSON)');
		alasql('CREATE UNIQUE INDEX idx_prop1 on BOM6(data->prop1)');
		alasql('CREATE UNIQUE INDEX idx_prop2 on BOM6(data->prop2)');

		// Insert records
		alasql('INSERT INTO BOM6 VALUES (@{prop1:1, prop2:"a"})');
		alasql('INSERT INTO BOM6 VALUES (@{prop1:2, prop2:"b"})');

		// Try to insert duplicate prop1 - should fail
		var didThrow1 = false;
		try {
			alasql('INSERT INTO BOM6 VALUES (@{prop1:1, prop2:"c"})');
		} catch (e) {
			didThrow1 = true;
		}
		assert(didThrow1, 'Should throw for duplicate prop1');

		// Try to insert duplicate prop2 - should fail
		var didThrow2 = false;
		try {
			alasql('INSERT INTO BOM6 VALUES (@{prop1:3, prop2:"a"})');
		} catch (e) {
			didThrow2 = true;
		}
		assert(didThrow2, 'Should throw for duplicate prop2');

		// Insert with unique values for both - should succeed
		alasql('INSERT INTO BOM6 VALUES (@{prop1:3, prop2:"c"})');

		var res = alasql('SELECT * FROM BOM6');
		assert.equal(res.length, 3);
	});

	it('G) Mixed unique constraints: table-level and index-level', function () {
		alasql('CREATE TABLE BOM7(id INT, name JSON, UNIQUE(id))');
		alasql('CREATE UNIQUE INDEX idx_name on BOM7(name->value)');

		// Insert records
		alasql('INSERT INTO BOM7 VALUES (1, @{value:"x"})');
		alasql('INSERT INTO BOM7 VALUES (2, @{value:"y"})');

		// Try to insert duplicate id (table constraint) - should fail
		var didThrow1 = false;
		try {
			alasql('INSERT INTO BOM7 VALUES (1, @{value:"z"})');
		} catch (e) {
			didThrow1 = true;
		}
		assert(didThrow1, 'Should throw for duplicate id (table constraint)');

		// Try to insert duplicate name->value (index constraint) - should fail
		var didThrow2 = false;
		try {
			alasql('INSERT INTO BOM7 VALUES (3, @{value:"x"})');
		} catch (e) {
			didThrow2 = true;
		}
		assert(didThrow2, 'Should throw for duplicate name->value (index constraint)');

		// Insert with unique values for both - should succeed
		alasql('INSERT INTO BOM7 VALUES (3, @{value:"z"})');

		var res = alasql('SELECT * FROM BOM7 ORDER BY id');
		assert.equal(res.length, 3);
		assert.deepEqual(res, [
			{id: 1, name: {value: 'x'}},
			{id: 2, name: {value: 'y'}},
			{id: 3, name: {value: 'z'}},
		]);
	});
});
