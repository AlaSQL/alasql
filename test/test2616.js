if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2616'; // Quoted date part in DATEADD, DATEDIFF and TIMESTAMPDIFF

describe(`Test ${testId} - quoted date part in DATEADD, DATEDIFF and TIMESTAMPDIFF`, function () {
	before(function () {
		// test203 empties alasql.fn, so register the mysql TIMESTAMPDIFF again (src/822mysql.js)
		alasql.fn.TIMESTAMPDIFF = function (unit, date1, date2) {
			return alasql.stdfn.DATEDIFF(unit, date1, date2);
		};
	});

	const parts = ['day', "'day'", '"day"', 'DAY', "'DAY'"];

	it('A) DATEADD gives the same date for every form', function () {
		parts.forEach(function (p) {
			var res = alasql(`VALUE OF SELECT DATEADD(${p}, 1, '2020-01-01T00:00:00Z')`);
			assert.strictEqual(res.toISOString(), '2020-01-02T00:00:00.000Z', p);
		});
	});

	it('B) DATEDIFF gives the same number for every form', function () {
		parts.forEach(function (p) {
			var res = alasql(`VALUE OF SELECT DATEDIFF(${p}, '2020-01-01', '2020-01-03')`);
			assert.strictEqual(res, 2, p);
		});
	});

	it('C) TIMESTAMPDIFF gives the same number for every form', function () {
		parts.forEach(function (p) {
			var res = alasql(`VALUE OF SELECT TIMESTAMPDIFF(${p}, '2020-01-01', '2020-01-03')`);
			assert.strictEqual(res, 2, p);
		});
	});

	it('D) Month and year in quotes', function () {
		assert.strictEqual(
			alasql(`VALUE OF SELECT DATEADD('month', 1, '2020-01-15T00:00:00Z')`).toISOString(),
			'2020-02-15T00:00:00.000Z'
		);
		assert.strictEqual(alasql(`VALUE OF SELECT DATEDIFF('year', '2018-01-01', '2020-01-02')`), 2);
	});

	it('E) The date part keeps working in a query over a table', function () {
		var res = alasql(`SELECT DATEDIFF('day', a, b) AS d FROM ?`, [
			[{a: '2020-01-01', b: '2020-01-05'}],
		]);
		assert.deepStrictEqual(res, [{d: 4}]);
	});

	it('F) An unknown date part throws, quoted or not', function () {
		[
			"DATEADD('fortnight', 1, '2020-01-01')",
			"DATEDIFF('fortnight', '2020-01-01', '2020-01-03')",
			"TIMESTAMPDIFF('fortnight', '2020-01-01', '2020-01-03')",
			"DATEDIFF(fortnight, '2020-01-01', '2020-01-03')",
			"DATEDIFF('constructor', '2020-01-01', '2020-01-03')",
		].forEach(function (call) {
			assert.throws(() => alasql('VALUE OF SELECT ' + call), /Unknown date part: /, call);
		});
	});
});
