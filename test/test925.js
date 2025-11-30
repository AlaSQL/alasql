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

	it('A) UNIQUE with JSON property using -> operator should work', () => {
		alasql('CREATE TABLE BOM1(name JSON, UNIQUE(name->test))');

		// First insert should work
		alasql('INSERT INTO BOM1 VALUES (@{test:1})');

		// Second insert with same value should fail
		assert.throws(() => {
			alasql('INSERT INTO BOM1 VALUES (@{test:1})');
		}, Error);

		// Insert with different value should work
		alasql('INSERT INTO BOM1 VALUES (@{test:2})');

		var res = alasql('SELECT * FROM BOM1');
		assert.deepEqual(res, [{name: {test: 1}}, {name: {test: 2}}]);
	});

	it('B) UNIQUE with JSON property using . operator should work', () => {
		alasql('CREATE TABLE BOM2(name JSON, UNIQUE(name.test))');

		// First insert should work
		alasql('INSERT INTO BOM2 VALUES (@{test:1})');

		// Second insert with same value should fail
		assert.throws(() => {
			alasql('INSERT INTO BOM2 VALUES (@{test:1})');
		}, Error);

		// Insert with different value should work
		alasql('INSERT INTO BOM2 VALUES (@{test:2})');

		var res = alasql('SELECT * FROM BOM2');
		assert.deepEqual(res, [{name: {test: 1}}, {name: {test: 2}}]);
	});

	it('C) CREATE UNIQUE INDEX with JSON property should check uniqueness', () => {
		alasql('CREATE TABLE BOM3(name JSON)');
		alasql('CREATE UNIQUE INDEX xx on BOM3(name->test)');

		// First insert should work
		alasql('INSERT INTO BOM3 VALUES (@{test:1})');

		// Second insert with same value should fail
		assert.throws(() => {
			alasql('INSERT INTO BOM3 VALUES (@{test:1})');
		}, Error);

		// Insert with different value should work
		alasql('INSERT INTO BOM3 VALUES (@{test:2})');

		var res = alasql('SELECT * FROM BOM3');
		assert.deepEqual(res, [{name: {test: 1}}, {name: {test: 2}}]);
	});

	it('D) Regular (non-unique) index with JSON property allows duplicates', () => {
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

	it('E) Multiple indexes (unique and regular) on same table', () => {
		alasql('CREATE TABLE BOM5(id INT, data JSON)');
		alasql('CREATE UNIQUE INDEX idx_id on BOM5(id)');
		alasql('CREATE INDEX idx_data on BOM5(data->amount)');

		// Insert records with unique id but duplicate data->amount
		alasql('INSERT INTO BOM5 VALUES (1, @{amount:100})');
		alasql('INSERT INTO BOM5 VALUES (2, @{amount:100})'); // Same data->amount, different id - OK
		alasql('INSERT INTO BOM5 VALUES (3, @{amount:200})');

		var res = alasql('SELECT * FROM BOM5 ORDER BY id');
		assert.equal(res.length, 3);
		assert.deepEqual(res, [
			{id: 1, data: {amount: 100}},
			{id: 2, data: {amount: 100}},
			{id: 3, data: {amount: 200}},
		]);

		// Try to insert duplicate id - should fail
		assert.throws(() => {
			alasql('INSERT INTO BOM5 VALUES (1, @{amount:300})');
		}, Error);
	});

	it('F) Multiple unique indexes on different JSON properties', () => {
		alasql('CREATE TABLE BOM6(data JSON)');
		alasql('CREATE UNIQUE INDEX idx_prop1 on BOM6(data->prop1)');
		alasql('CREATE UNIQUE INDEX idx_prop2 on BOM6(data->prop2)');

		// Insert records
		alasql('INSERT INTO BOM6 VALUES (@{prop1:1, prop2:"a"})');
		alasql('INSERT INTO BOM6 VALUES (@{prop1:2, prop2:"b"})');

		// Try to insert duplicate prop1 - should fail
		assert.throws(() => {
			alasql('INSERT INTO BOM6 VALUES (@{prop1:1, prop2:"c"})');
		}, Error);

		// Try to insert duplicate prop2 - should fail
		assert.throws(() => {
			alasql('INSERT INTO BOM6 VALUES (@{prop1:3, prop2:"a"})');
		}, Error);

		// Insert with unique values for both - should succeed
		alasql('INSERT INTO BOM6 VALUES (@{prop1:3, prop2:"c"})');

		var res = alasql('SELECT * FROM BOM6');
		assert.equal(res.length, 3);
	});

	it('G) Mixed unique constraints: table-level and index-level', () => {
		alasql('CREATE TABLE BOM7(id INT, name JSON, UNIQUE(id))');
		alasql('CREATE UNIQUE INDEX idx_name on BOM7(name->val)');

		// Insert records
		alasql('INSERT INTO BOM7 VALUES (1, @{val:"x"})');
		alasql('INSERT INTO BOM7 VALUES (2, @{val:"y"})');

		// Try to insert duplicate id (table constraint) - should fail
		assert.throws(() => {
			alasql('INSERT INTO BOM7 VALUES (1, @{val:"z"})');
		}, Error);

		// Try to insert duplicate name->val (index constraint) - should fail
		assert.throws(() => {
			alasql('INSERT INTO BOM7 VALUES (3, @{val:"x"})');
		}, Error);

		// Insert with unique values for both - should succeed
		alasql('INSERT INTO BOM7 VALUES (3, @{val:"z"})');

		var res = alasql('SELECT * FROM BOM7 ORDER BY id');
		assert.equal(res.length, 3);
		assert.deepEqual(res, [
			{id: 1, name: {val: 'x'}},
			{id: 2, name: {val: 'y'}},
			{id: 3, name: {val: 'z'}},
		]);
	});
});
