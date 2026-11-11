if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2795'; // A subquery in JOIN ... ON

describe(`Test ${testId} - a subquery in JOIN ... ON`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE staff (empnum CHAR(3), grade INT)');
		alasql("INSERT INTO staff VALUES ('E1', 12), ('E2', 10)");
		alasql('CREATE TABLE works (empnum CHAR(3), hours INT)');
		alasql("INSERT INTO works VALUES ('E1', 40), ('E2', 20)");
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) LEFT JOIN', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT s.empnum, w.hours FROM staff s LEFT JOIN works w ON s.empnum = w.empnum AND w.hours > (SELECT MIN(hours) FROM works)'
			),
			[
				{empnum: 'E1', hours: 40},
				{empnum: 'E2', hours: undefined},
			]
		);
	});

	it('B) INNER JOIN', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT s.empnum, w.hours FROM staff s JOIN works w ON s.empnum = w.empnum AND w.hours > (SELECT MIN(hours) FROM works)'
			),
			[{empnum: 'E1', hours: 40}]
		);
	});

	it('C) A subquery that reads a joined row', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT s.empnum, w.hours FROM staff s LEFT JOIN works w ON s.empnum = w.empnum AND w.hours > (SELECT grade FROM staff WHERE staff.empnum = w.empnum) * 3'
			),
			[
				{empnum: 'E1', hours: 40},
				{empnum: 'E2', hours: undefined},
			]
		);
	});

	it('D) The subquery is the only condition', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT s.empnum, w.hours FROM staff s JOIN works w ON w.hours = (SELECT MAX(hours) FROM works)'
			),
			[
				{empnum: 'E1', hours: 40},
				{empnum: 'E2', hours: 40},
			]
		);
	});
});
