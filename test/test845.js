if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('../dist/alasql');
}

/*
  Test for issue #845
*/

var test = '845'; // insert test file number

describe('Test ' + test + ' - use NOW() function', function () {
	it('1a. NOW() as String', function () {
		var res = alasql('SELECT NOW() AS now');
		//2022-02-25 19:21:27.839
		assert(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}/.test(res[0].now));
	});

	it('1b. NOW() as Date', function () {
		alasql.options.dateAsString = false;
		var res = alasql('SELECT NOW() AS now');
		//2022-02-25 19:21:27.839
		assert(res[0].now instanceof Date);
	});

	it('2. CONVERT with NOW() as an argument', function () {
		var res = alasql('SELECT CONVERT(STRING,NOW(),1) AS conv');
		//02/25/22
		assert(/\d{2}\/\d{2}\/\d{2}/.test(res[0].conv));
	});
});
