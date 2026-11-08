if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 862 - Date-only strings retain their calendar date', function () {
	it('Preserve date fields in negative and positive UTC offsets', function () {
		if (typeof process === 'undefined') {
			return;
		}

		var previousTz = process.env.TZ;
		var timezones = ['America/New_York', 'Pacific/Kiritimati'];
		var cases = [
			{value: '2017-01-01', year: 2017, month: 1, day: 1, hour: 0},
			{value: '2017-02-01', year: 2017, month: 2, day: 1, hour: 0},
			{value: '1997-09-22', year: 1997, month: 9, day: 22, hour: 0},
			{value: '2017-02-01 12:00:00', year: 2017, month: 2, day: 1, hour: 12},
			{value: '2017-02-01T00:00:00', year: 2017, month: 2, day: 1, hour: 0},
		];

		try {
			timezones.forEach(function (timezone) {
				process.env.TZ = timezone;
				cases.forEach(function (testCase) {
					var res = alasql('SELECT YEAR(?) AS y, MONTH(?) AS m, DAY(?) AS d, HOUR(?) AS h', [
						testCase.value,
						testCase.value,
						testCase.value,
						testCase.value,
					]);
					assert.deepStrictEqual(
						res,
						[{y: testCase.year, m: testCase.month, d: testCase.day, h: testCase.hour}],
						testCase.value + ' in ' + timezone
					);
				});
			});
		} finally {
			if (previousTz === undefined) {
				delete process.env.TZ;
			} else {
				process.env.TZ = previousTz;
			}
		}
	});
});
