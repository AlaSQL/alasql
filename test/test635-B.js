if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 635-B - INTERSECT/EXCEPT with ORDER BY', function () {
	const test = '635B';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) INTERSECT with ORDER BY on column', function () {
		var data = [{eventStart: 1}, {eventStart: 100}, {eventStart: 10}];
		var res = alasql(
			'SELECT eventStart FROM $0 INTERSECT SELECT eventStart FROM $0 ORDER BY eventStart',
			[data]
		);
		assert.deepEqual(res, [{eventStart: 1}, {eventStart: 10}, {eventStart: 100}]);
	});

	it('B) EXCEPT with ORDER BY on column', function () {
		var data = [{eventStart: 1}, {eventStart: 100}, {eventStart: 10}, {eventStart: 60}];
		var res = alasql(
			'SELECT eventStart FROM $0 WHERE eventStart < 100 EXCEPT SELECT eventStart FROM $0 WHERE eventStart > 50 ORDER BY eventStart',
			[data]
		);
		assert.deepEqual(res, [{eventStart: 1}, {eventStart: 10}]);
	});

	it('C) INTERSECT with SELECT * and ORDER BY', function () {
		alasql('CREATE TABLE Persons (eventStart INT, eventEnd INT)');
		alasql('INSERT INTO Persons VALUES (1000000, 1000100), (1000050, 1000150), (1000200, 1000300)');
		var res = alasql(
			'SELECT * FROM Persons INTERSECT SELECT * FROM Persons WHERE eventStart BETWEEN 1000000 AND 1000100 OR eventEnd BETWEEN 1000000 AND 1000100 ORDER BY eventStart'
		);
		assert.deepEqual(res, [
			{eventStart: 1000000, eventEnd: 1000100},
			{eventStart: 1000050, eventEnd: 1000150},
		]);
		alasql('DROP TABLE Persons');
	});

	it('D) EXCEPT with SELECT * and ORDER BY', function () {
		alasql('CREATE TABLE Persons (eventStart INT, eventEnd INT)');
		alasql('INSERT INTO Persons VALUES (1000000, 1000100), (1000050, 1000150), (1000200, 1000300)');
		var res = alasql(
			'SELECT * FROM Persons EXCEPT SELECT * FROM Persons WHERE eventStart > 1000100 ORDER BY eventStart'
		);
		assert.deepEqual(res, [
			{eventStart: 1000000, eventEnd: 1000100},
			{eventStart: 1000050, eventEnd: 1000150},
		]);
		alasql('DROP TABLE Persons');
	});

	it('E) INTERSECT with multiple WHERE clauses and ORDER BY (from issue)', function () {
		// This test validates the fix for issue #635 where ORDER BY with INTERSECT caused
		// "Unable to get property 'modifier' of undefined" error
		alasql('CREATE TABLE Persons (eventStart INT, eventEnd INT)');
		alasql('INSERT INTO Persons VALUES (1000000, 1000100), (1000050, 1000150), (1000200, 1000300)');
		// Testing the exact scenario from the issue: INTERSECT with WHERE and ORDER BY
		var res = alasql(
			'SELECT * FROM Persons INTERSECT SELECT * FROM Persons WHERE eventStart BETWEEN 1000000 AND 1000100 OR eventEnd BETWEEN 1000000 AND 1000100 ORDER BY eventStart'
		);
		// Should return rows where BOTH conditions are true (INTERSECT) and ordered by eventStart
		// The INTERSECT of all rows with filtered rows should give us the filtered rows
		assert.deepEqual(res, [
			{eventStart: 1000000, eventEnd: 1000100},
			{eventStart: 1000050, eventEnd: 1000150},
		]);
		alasql('DROP TABLE Persons');
	});

	it('F) INTERSECT with ORDER BY DESC', function () {
		var data = [{eventStart: 1}, {eventStart: 100}, {eventStart: 10}];
		var res = alasql(
			'SELECT eventStart FROM $0 INTERSECT SELECT eventStart FROM $0 ORDER BY eventStart DESC',
			[data]
		);
		assert.deepEqual(res, [{eventStart: 100}, {eventStart: 10}, {eventStart: 1}]);
	});
});
