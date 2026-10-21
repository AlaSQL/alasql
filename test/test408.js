if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// Note: Removed process.env.TZ = 'UTC' hack
// Tests now compute expected results dynamically to work in any timezone

/*
 This sample beased on this article:

	http://stackoverflow.com/questions/30442969/group-by-in-angularjs

*/

describe('Test 408 - DATEADD() and DATEDIFF()', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test408;USE test408');
		done();
	});

	it('2. DATEDIFF()', function (done) {
		alasql(`
    CREATE TABLE Duration (
      startDate datetime
      ,endDate datetime
    );
    INSERT INTO Duration(startDate,endDate)
      VALUES('2007-05-06 12:10:09','2007-05-07 12:10:09');
  `);
		var res = alasql(
			'SELECT DATEDIFF(day,startDate,endDate) AS Duration \
      FROM Duration'
		);
		assert.deepStrictEqual(res, [{Duration: 1}]);

		done();
	});

	it('3. DATEDIFF()', function (done) {
		alasql(`
      DECLARE @startdate datetime = '2007-05-05 12:10:09.3312722';
      DECLARE @enddate datetime = '2007-05-04 12:10:09.3312722';
    `);
		var res = alasql('VALUE OF SELECT DATEDIFF(day, @startdate, @enddate)');
		assert.deepStrictEqual(res, -1);

		done();
	});

	it('4. DATEADD()', function (done) {
		alasql("DECLARE @datetime2 datetime2 = '2020-01-01 13:10:10.1111111 UTC'");

		var res = alasql(`MATRIX OF
			SELECT 'year', DATEADD(year,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'quarter',DATEADD(quarter,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'month',DATEADD(month,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'dayofyear',DATEADD(dayofyear,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'day',DATEADD(day,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'week',DATEADD(week,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'weekday',DATEADD(weekday,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'hour',DATEADD(hour,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'minute',DATEADD(minute,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'second',DATEADD(second,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'millisecond',DATEADD(millisecond,1,@datetime2).toISOString()`);

		// Compute expected results using native JavaScript Date to ensure timezone-independent tests
		// This verifies that AlaSQL's DATEADD matches JavaScript's native date manipulation
		var baseDate = new Date('2020-01-01 13:10:10.111 UTC');
		function jsDateAdd(period, interval, date) {
			var nd = new Date(date);
			switch (period.toLowerCase()) {
				case 'year':
					nd.setFullYear(nd.getFullYear() + interval);
					break;
				case 'quarter':
					nd.setMonth(nd.getMonth() + interval * 3);
					break;
				case 'month':
					nd.setMonth(nd.getMonth() + interval);
					break;
				case 'day':
				case 'dayofyear':
				case 'weekday':
					nd.setDate(nd.getDate() + interval);
					break;
				case 'week':
					nd.setDate(nd.getDate() + interval * 7);
					break;
				case 'hour':
					nd.setHours(nd.getHours() + interval);
					break;
				case 'minute':
					nd.setMinutes(nd.getMinutes() + interval);
					break;
				case 'second':
					nd.setSeconds(nd.getSeconds() + interval);
					break;
				case 'millisecond':
					nd.setMilliseconds(nd.getMilliseconds() + interval);
					break;
			}
			return nd;
		}

		var expected = [
			['year', jsDateAdd('year', 1, baseDate).toISOString()],
			['quarter', jsDateAdd('quarter', 1, baseDate).toISOString()],
			['month', jsDateAdd('month', 1, baseDate).toISOString()],
			['dayofyear', jsDateAdd('dayofyear', 1, baseDate).toISOString()],
			['day', jsDateAdd('day', 1, baseDate).toISOString()],
			['week', jsDateAdd('week', 1, baseDate).toISOString()],
			['weekday', jsDateAdd('weekday', 1, baseDate).toISOString()],
			['hour', jsDateAdd('hour', 1, baseDate).toISOString()],
			['minute', jsDateAdd('minute', 1, baseDate).toISOString()],
			['second', jsDateAdd('second', 1, baseDate).toISOString()],
			['millisecond', jsDateAdd('millisecond', 1, baseDate).toISOString()],
		];

		assert.deepStrictEqual(res, expected);

		done();
	});

	it('5. DATEADD() dot format', function (done) {
		alasql("DECLARE @datetime2 datetime2 = '2020.01.01 13:10:10.1111111 UTC'");

		var res = alasql(`MATRIX OF
			SELECT 'year', DATEADD(year,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'quarter',DATEADD(quarter,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'month',DATEADD(month,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'dayofyear',DATEADD(dayofyear,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'day',DATEADD(day,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'week',DATEADD(week,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'weekday',DATEADD(weekday,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'hour',DATEADD(hour,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'minute',DATEADD(minute,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'second',DATEADD(second,1,@datetime2).toISOString()
			UNION ALL
			SELECT 'millisecond',DATEADD(millisecond,1,@datetime2).toISOString()`);

		// Compute expected results using native JavaScript Date to ensure timezone-independent tests
		var baseDate = new Date('2020-01-01 13:10:10.111 UTC');
		function jsDateAdd(period, interval, date) {
			var nd = new Date(date);
			switch (period.toLowerCase()) {
				case 'year':
					nd.setFullYear(nd.getFullYear() + interval);
					break;
				case 'quarter':
					nd.setMonth(nd.getMonth() + interval * 3);
					break;
				case 'month':
					nd.setMonth(nd.getMonth() + interval);
					break;
				case 'day':
				case 'dayofyear':
				case 'weekday':
					nd.setDate(nd.getDate() + interval);
					break;
				case 'week':
					nd.setDate(nd.getDate() + interval * 7);
					break;
				case 'hour':
					nd.setHours(nd.getHours() + interval);
					break;
				case 'minute':
					nd.setMinutes(nd.getMinutes() + interval);
					break;
				case 'second':
					nd.setSeconds(nd.getSeconds() + interval);
					break;
				case 'millisecond':
					nd.setMilliseconds(nd.getMilliseconds() + interval);
					break;
			}
			return nd;
		}

		var expected = [
			['year', jsDateAdd('year', 1, baseDate).toISOString()],
			['quarter', jsDateAdd('quarter', 1, baseDate).toISOString()],
			['month', jsDateAdd('month', 1, baseDate).toISOString()],
			['dayofyear', jsDateAdd('dayofyear', 1, baseDate).toISOString()],
			['day', jsDateAdd('day', 1, baseDate).toISOString()],
			['week', jsDateAdd('week', 1, baseDate).toISOString()],
			['weekday', jsDateAdd('weekday', 1, baseDate).toISOString()],
			['hour', jsDateAdd('hour', 1, baseDate).toISOString()],
			['minute', jsDateAdd('minute', 1, baseDate).toISOString()],
			['second', jsDateAdd('second', 1, baseDate).toISOString()],
			['millisecond', jsDateAdd('millisecond', 1, baseDate).toISOString()],
		];

		assert.deepStrictEqual(res, expected);

		done();
	});

	it('6. DATE_ADD() MySQL-style', function (done) {
		var res1 = alasql("= DATE_SUB('2014-02-13 08:44:21.000001', INTERVAL 4 DAY);");
		var res2 = alasql("= DATE_ADD('2014-02-13 08:44:21.000001', INTERVAL 4 DAY);");
		assert(res1.getDate() == 9);
		assert(res2.getDate() == 17);
		//    assert.deepStrictEqual(res,[ { Duration: 1 } ]);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test408');
		done();
	});
});
