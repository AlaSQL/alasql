if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2853'; // CAST of a number to DATETIME or DATE

describe(`Test ${testId} - CAST of a number to DATETIME or DATE`, function () {
	it('A) A number with 14 digits is YYYYMMDDhhmmss', function () {
		assert.deepStrictEqual(alasql('SELECT CAST(19961121194027 AS DATETIME) AS d'), [
			{d: '1996.11.21 19:40:27.000'},
		]);
		assert.deepStrictEqual(alasql('SELECT CAST(NULLIF(19961121194027, 0) AS DATETIME) AS d'), [
			{d: '1996.11.21 19:40:27.000'},
		]);
	});

	it('B) A number with 8 digits is YYYYMMDD', function () {
		assert.deepStrictEqual(alasql('SELECT CAST(20200102 AS DATETIME) AS d'), [
			{d: '2020.01.02 00:00:00.000'},
		]);
		assert.deepStrictEqual(
			alasql("SELECT CAST(20200102 AS DATE) AS a, CAST('20200102' AS DATE) AS b"),
			alasql("SELECT CAST('20200102' AS DATE) AS a, CAST('20200102' AS DATE) AS b")
		);
		assert.deepStrictEqual(alasql('SELECT CONVERT(STRING, 20200102, 112) AS d'), [{d: '20200102'}]);
	});

	it('C) The text forms work as before', function () {
		assert.deepStrictEqual(
			alasql(
				"SELECT CAST('1996-11-21 19:40:27' AS DATETIME) AS a, CAST('19961121' AS DATETIME) AS b"
			),
			[{a: '1996.11.21 19:40:27.000', b: '1996.11.21 00:00:00.000'}]
		);
	});
});
