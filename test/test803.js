if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var testData = [
	[
		[1, 6, 'Sam', 'Manager', 2],
		[2, 6, 'Sam', 'Manager', 2],
		[3, 7, 'Sam', 'Associate', 10],
		[4, 6, 'Kyle', 'Associate', 2],
		[5, 7, 'Kyle', 'Manager', 15],
	],
	[
		[6, 'HarperDB', 50],
		[7, 'HarperDB', 100],
	],
];

var test = '803'; // insert test file number

describe(
	'Test ' +
		test +
		' - JOIN GROUP BY with columns in same index position within nested arrays params',
	function () {
		it('A) Multiple table SELECT w/ Group By returns all data', function (done) {
			var sql =
				'SELECT `b`.[0] AS `comp_id`, `b`.[1] AS `companyname`, `a`.[2] AS `emp_name`, `b`.[2] AS `num_emp`, SUM(`a`.[4]) AS `num_of_roles` FROM ? AS `a` INNER JOIN ? AS `b` ON `a`.[1] = `b`.[0] GROUP BY `b`.[0], `b`.[1], `a`.[2], `b`.[2]';
			var expectedResult = [
				{comp_id: 6, companyname: 'HarperDB', emp_name: 'Sam', num_emp: 50, num_of_roles: 4},
				{comp_id: 7, companyname: 'HarperDB', emp_name: 'Sam', num_emp: 100, num_of_roles: 10},
				{comp_id: 6, companyname: 'HarperDB', emp_name: 'Kyle', num_emp: 50, num_of_roles: 2},
				{comp_id: 7, companyname: 'HarperDB', emp_name: 'Kyle', num_emp: 100, num_of_roles: 15},
			];

			alasql.promise(sql, testData).then(function (data) {
				assert.deepStrictEqual(data, expectedResult);
				done();
			});
		});

		it('B) Another multiple table SELECT w/ Group By returns all data', function (done) {
			var sql =
				'SELECT `a`.[2] AS `emp_name`, `b`.[2] AS `num_emp`, SUM(`a`.[4]) AS `num_of_roles` FROM ? AS `a` INNER JOIN ? AS `b` ON `a`.[1] = `b`.[0] GROUP BY `a`.[2], `b`.[2]';
			var expectedResult = [
				{emp_name: 'Sam', num_emp: 50, num_of_roles: 4},
				{emp_name: 'Sam', num_emp: 100, num_of_roles: 10},
				{emp_name: 'Kyle', num_emp: 50, num_of_roles: 2},
				{emp_name: 'Kyle', num_emp: 100, num_of_roles: 15},
			];
			alasql.promise(sql, testData).then(function (data) {
				assert.deepStrictEqual(data, expectedResult);
				done();
			});
		});

		it('C) Single table SELECT w/ Group By returns all data', function (done) {
			var sql =
				'SELECT `a`.[2] AS `emp_name`, `b`.[2] AS `num_emp`, SUM(`a`.[4]) AS `num_of_roles` FROM ? AS `a` INNER JOIN ? AS `b` ON `a`.[1] = `b`.[0] GROUP BY `a`.[2], `b`.[2]';
			var expectedResult = [
				{emp_name: 'Sam', num_emp: 50, num_of_roles: 4},
				{emp_name: 'Sam', num_emp: 100, num_of_roles: 10},
				{emp_name: 'Kyle', num_emp: 50, num_of_roles: 2},
				{emp_name: 'Kyle', num_emp: 100, num_of_roles: 15},
			];
			alasql.promise(sql, testData).then(function (data) {
				assert.deepStrictEqual(data, expectedResult);
				done();
			});
		});
	}
);
