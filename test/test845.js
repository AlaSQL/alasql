if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('../dist/alasql');
}

/*
  Test for issue #845
*/

var test = '845'; // insert test file number

describe('Test ' + test + ' - use NOW() function', function () {
	it('1. NOW()', function () {
		var res = alasql('SELECT NOW() AS now');
		//2022-02-25 19:21:27.839
		assert(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}/.test(res[0].now));
	});

	it('2. CONVERT with NOW() as an argument', function () {
		var res = alasql('SELECT CONVERT(STRING,NOW(),1) AS conv');
		//02/25/22
		assert(/\d{2}\/\d{2}\/\d{2}/.test(res[0].conv));
	});

	it('3. NOW() with point', function () {
		var currentSeparator = alasql.options.nowdateseparator;
		alasql.options.nowdateseparator = '.';
		var res = alasql('SELECT NOW() AS now');
		//2022.02.25 19:21:27.839
		assert(/\d{4}.\d{2}.\d{2} \d{2}:\d{2}:\d{2}.\d{3}/.test(res[0].now));
		alasql.options.nowdateseparator = currentSeparator;
	});

	it('4. CONVERT with NOW() with point as an argument', function () {
		var currentSeparator = alasql.options.nowdateseparator;
		alasql.options.nowdateseparator = '.';
		var res = alasql('SELECT CONVERT(STRING,NOW(),1) AS conv');
		//02/25/22
		assert(/\d{2}\/\d{2}\/\d{2}/.test(res[0].conv));
		alasql.options.nowdateseparator = currentSeparator;
	});

	it('5. Reads multiple formats of date strings', function () {
		assert.equal(
			alasql('VALUE OF SELECT DATE("2023-06-10 16:27:36.224Z")').toISOString(),
			'2023-06-10T16:27:36.224Z'
		);

		// Despite ECMA-262 where YYYY-MM-DD must be set in UTC and YYYY-MM-DD HH:ss must not AlaSQL will treat _anything_ with no timezone as local time.

		assert.equal(
			alasql('VALUE OF SELECT DATE("2022-01-10T00:00:00")').toISOString(),
			alasql('VALUE OF SELECT DATE("2022-01-10")').toISOString()
		);

		assert.equal(
			alasql('VALUE OF SELECT DATE("2022-01-20T12:01:02.123456789Z")').toISOString(),
			'2022-01-20T12:01:02.123Z'
		);

		assert.equal(
			alasql('VALUE OF SELECT DATE("2022-01.20 12:00:00.123456789-10:30")').toISOString(),
			'2022-01-20T22:30:00.123Z'
		);

		assert.equal(
			alasql('VALUE OF SELECT DATE("2022-01.20 12:00:00.123456789+10:30")').toISOString(),
			'2022-01-20T01:30:00.123Z'
		);

		assert.equal(
			alasql('VALUE OF SELECT DATE("2022-01.20 12:00+10:30")').toISOString(),
			'2022-01-20T01:30:00.000Z'
		);

		assert.equal(
			alasql('VALUE OF SELECT DATE("2022-01-20T12:00:00.123456789+03:30")').toISOString(),
			'2022-01-20T08:30:00.123Z'
		);

		assert.equal(
			alasql('VALUE OF SELECT DATE("2022-01-20T12:00:00.123456789+03:30")').toISOString(),
			'2022-01-20T08:30:00.123Z'
		);

		/*
		Hmmm. How best to test that this gets converted correclty to locala time (including DST)?
		"2022.01.10 04:10",
		"2022.01.10 04:10:11",
		"2022.01.10 04:10:11.123",
		"2022-01-10 04:10",
		"2022-01-10 04:10:11",
		"2022-01-10 04:10:11.123",
		"2022.1.10",
		"2022-1-1"
		"2022/1/1"

		For now: Lets make sure that it converts to a valid date. 
		*/

		assert(!isNaN(alasql('VALUE OF SELECT DATE("2012.01.10 04:10")')));
		assert(!isNaN(alasql('VALUE OF SELECT DATE("2022.01.10 04:10:11")')));
		assert(!isNaN(alasql('VALUE OF SELECT DATE("2022.01.10 04:10:11.123")')));
		assert(!isNaN(alasql('VALUE OF SELECT DATE("2022.01.10T04:10:11.123")')));
		assert(!isNaN(alasql('VALUE OF SELECT DATE("2022-01-10 04:10")')));
		assert(!isNaN(alasql('VALUE OF SELECT DATE("2022-01-10 04:10:11")')));
		assert(!isNaN(alasql('VALUE OF SELECT DATE("2022-01-10 04:10:11.123")')));
		assert(!isNaN(alasql('VALUE OF SELECT DATE("2022.1.10")')));
		assert(!isNaN(alasql('VALUE OF SELECT DATE("2022-1-1")')));
		assert(!isNaN(alasql('VALUE OF SELECT DATE("2022/1/1")')));
	});

	it('6. Will seek to trim value', function () {
		assert.deepEqual(
			alasql('VALUE OF SELECT DATE(" 2022-01-10T00:00:01")'),
			alasql('VALUE OF SELECT DATE("2022-01-10T00:00:01")')
		);

		assert.deepEqual(
			alasql('VALUE OF SELECT DATE(" 	2022-01-10T00:00:02")'),
			alasql('VALUE OF SELECT DATE("2022-01-10T00:00:02")')
		);

		assert.notDeepEqual(
			alasql('VALUE OF SELECT DATE("xyz 	2022-01-10T00:00:03")'),
			alasql('VALUE OF SELECT DATE("2022-01-10T00:00:03")')
		);

		assert.deepEqual(
			alasql('VALUE OF SELECT DATE("€%&/()\'2022-01-10T00:00:04")'),
			alasql('VALUE OF SELECT DATE("2022-01-10T00:00:04")')
		);

		assert.deepEqual(
			alasql('VALUE OF SELECT DATE("2022-01-10T00:00:05 XXYYYZZZ5678&/(")'),
			alasql('VALUE OF SELECT DATE("2022-01-10T00:00:05")')
		);

		assert.deepEqual(
			alasql('VALUE OF SELECT DATE("2022-01-10T00:00:06 2000-02-20T20:20:20")'),
			alasql('VALUE OF SELECT DATE("2022-01-10T00:00:06")')
		);
	});
});
