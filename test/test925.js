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
});
