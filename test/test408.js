if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

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
		alasql(function () {
			/*
    CREATE TABLE Duration (
      startDate datetime
      ,endDate datetime
    );
    INSERT INTO Duration(startDate,endDate)
      VALUES('2007-05-06 12:10:09','2007-05-07 12:10:09');
  */
		});
		var res = alasql('SELECT DATEDIFF(day,startDate,endDate) AS Duration \
      FROM Duration');
		assert.deepEqual(res, [{Duration: 1}]);

		done();
	});

	it('3. DATEDIFF()', function (done) {
		alasql(function () {
			/*
      DECLARE @startdate datetime = '2007-05-05 12:10:09.3312722';
      DECLARE @enddate datetime = '2007-05-04 12:10:09.3312722';   
    */
		});
		var res = alasql('VALUE OF SELECT DATEDIFF(day, @startdate, @enddate)');
		assert.deepEqual(res, -1);

		done();
	});

	it('4. DATEADD()', function (done) {
		alasql("DECLARE @datetime2 datetime2 = '2007-01-01 13:10:10.1111111'");
		var res = alasql(function () {
			/*
      MATRIX OF
SELECT 'year', DATEADD(year,1,@datetime2)
UNION ALL
SELECT 'quarter',DATEADD(quarter,1,@datetime2)
UNION ALL
SELECT 'month',DATEADD(month,1,@datetime2)
UNION ALL
SELECT 'dayofyear',DATEADD(dayofyear,1,@datetime2)
UNION ALL
SELECT 'day',DATEADD(day,1,@datetime2)
UNION ALL
SELECT 'week',DATEADD(week,1,@datetime2)
UNION ALL
SELECT 'weekday',DATEADD(weekday,1,@datetime2)
UNION ALL
SELECT 'hour',DATEADD(hour,1,@datetime2)
UNION ALL
SELECT 'minute',DATEADD(minute,1,@datetime2)
UNION ALL
SELECT 'second',DATEADD(second,1,@datetime2)
UNION ALL
SELECT 'millisecond',DATEADD(millisecond,1,@datetime2)
    */
		});
		//    console.log(res);
		//    assert.deepEqual(res,[ { Duration: 1 } ]);
		done();
	});

	it('4. DATE_ADD() MySQL-style', function (done) {
		var res1 = alasql("= DATE_SUB('2014-02-13 08:44:21.000001', INTERVAL 4 DAY);");
		var res2 = alasql("= DATE_ADD('2014-02-13 08:44:21.000001', INTERVAL 4 DAY);");
		assert(res1.getDate() == 9);
		assert(res2.getDate() == 17);
		//    assert.deepEqual(res,[ { Duration: 1 } ]);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test408');
		done();
	});
});
