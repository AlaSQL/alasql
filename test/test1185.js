if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1185 - Table names starting with numbers', function () {
	const test = '1185'; // insert test file number

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Table name starting with number (e.g., 50ks)', function () {
		alasql('CREATE TABLE `50ks` (id INT, name STRING)');
		alasql('INSERT INTO `50ks` VALUES (1, "test")');
		var res = alasql('SELECT * FROM `50ks`');
		assert.deepEqual(res, [{id: 1, name: 'test'}]);
	});

	it('B) Table name starting with number without backticks', function () {
		alasql('CREATE TABLE `50k` (id INT, name STRING)');
		alasql('INSERT INTO `50k` VALUES (2, "test2")');
		// This should work without backticks after the fix
		var res = alasql('SELECT * FROM 50k');
		assert.deepEqual(res, [{id: 2, name: 'test2'}]);
	});

	it('C) Table name with schema prefix starting with number', function () {
		// This is the specific case from the issue: csv.50k where csv is schema, 50k is table
		// Create a separate database called 'csv'
		alasql('CREATE DATABASE csv');
		alasql('USE csv');
		alasql('CREATE TABLE `50k` (id INT, name STRING)');
		alasql('INSERT INTO `50k` VALUES (3, "test3")');
		// Query with schema.table notation where table starts with number
		var res = alasql('SELECT * FROM csv.50k');
		assert.deepEqual(res, [{id: 3, name: 'test3'}]);
		// Cleanup
		alasql('USE test1185');
		alasql('DROP DATABASE csv');
	});
});
