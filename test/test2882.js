if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2882'; // Short T-SQL date parts (dd, mm, yy, hh, mi ...) in DATEDIFF, DATEADD and TIMESTAMPDIFF

describe(`Test ${testId} - short date parts in DATEDIFF, DATEADD and TIMESTAMPDIFF`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		// test203 empties alasql.fn, so register the mysql TIMESTAMPDIFF again (src/822mysql.js)
		alasql.fn.TIMESTAMPDIFF = function (unit, date1, date2) {
			return alasql.stdfn.DATEDIFF(unit, date1, date2);
		};
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	const abbreviations = {
		year: ['yy', 'yyyy'],
		quarter: ['qq', 'q'],
		month: ['mm', 'm'],
		dayofyear: ['dy', 'y'],
		day: ['dd', 'd'],
		week: ['wk', 'ww'],
		weekday: ['dw', 'w'],
		hour: ['hh'],
		minute: ['mi', 'n'],
		second: ['ss', 's'],
		millisecond: ['ms'],
		microsecond: ['mcs'],
	};
	const parts = Object.entries(abbreviations).flatMap(([long, shorts]) =>
		shorts.map(short => ({short, long}))
	);
	// DATEDIFF truncates to 32 bits, so milli- and microseconds need a narrow range
	const fine = ['millisecond', 'microsecond'];
	const coarseParts = parts.filter(p => !fine.includes(p.long));
	const fineParts = parts.filter(p => fine.includes(p.long));

	const value = sql => alasql('VALUE OF SELECT ' + sql);

	function assertSameAsLongForm(partsToCheck, call) {
		partsToCheck.forEach(({short, long}) => {
			assert.deepStrictEqual(value(call(short)), value(call(long)), short);
		});
	}

	it('A) DATEDIFF with a short part gives the long form result', function () {
		assertSameAsLongForm(
			coarseParts,
			part => `DATEDIFF(${part}, '2018-03-04T05:06:07Z', '2020-07-09T10:11:12Z')`
		);
	});

	it('B) DATEDIFF with a short milli- or microsecond part gives the long form result', function () {
		assertSameAsLongForm(
			fineParts,
			part => `DATEDIFF(${part}, '2020-01-01T00:00:00.000Z', '2020-01-01T00:01:30.500Z')`
		);
	});

	it('C) DATEDIFF counts the reported queries', function () {
		const res = alasql(`SELECT
			DATEDIFF(dd, '2020-01-01', '2020-01-03') AS days,
			DATEDIFF(hh, '2020-01-01', '2020-01-03') AS hours,
			DATEDIFF(mi, '2020-01-01', '2020-01-03') AS minutes,
			DATEDIFF(yy, '2018-01-01', '2020-01-02') AS years`);
		assert.deepStrictEqual(res, [{days: 2, hours: 48, minutes: 2880, years: 2}]);
	});

	it('D) TIMESTAMPDIFF with a short part gives the long form result', function () {
		assertSameAsLongForm(
			coarseParts,
			part => `TIMESTAMPDIFF(${part}, '2018-03-04T05:06:07Z', '2020-07-09T10:11:12Z')`
		);
	});

	it('E) DATEADD with a short part gives the long form result', function () {
		assertSameAsLongForm(parts, part => `DATEADD(${part}, 1, '2020-01-15T00:00:00Z')`);
	});

	it('F) DATEADD adds calendar months and years, not a fixed number of days', function () {
		const res = [
			value(`DATEADD(mm, 1, '2020-01-15T00:00:00Z')`).toISOString(),
			value(`DATEADD(yy, 1, '2020-01-15T00:00:00Z')`).toISOString(),
		];
		assert.deepStrictEqual(res, ['2020-02-15T00:00:00.000Z', '2021-01-15T00:00:00.000Z']);
	});

	it('G) Short parts are case insensitive and can be quoted', function () {
		const res = ['DD', "'dd'", '"dd"', "'DD'"].map(part =>
			value(`DATEDIFF(${part}, '2020-01-01', '2020-01-03')`)
		);
		assert.deepStrictEqual(res, [2, 2, 2, 2]);
	});

	it('H) An unknown date part still throws', function () {
		const calls = [
			"DATEADD(xx, 1, '2020-01-01')",
			"DATEDIFF(xx, '2020-01-01', '2020-01-03')",
			"TIMESTAMPDIFF(xx, '2020-01-01', '2020-01-03')",
		];
		calls.forEach(call => assert.throws(() => value(call), /Unknown date part: xx/, call));
	});
});
