if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2852'; // String functions read a number as its text

describe(`Test ${testId} - string functions on a number`, function () {
	it('A) SUBSTRING, MID, TRIM, LTRIM, RTRIM and LENGTH', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT SUBSTRING(12345, 2, 3) AS a, SUBSTR(12345, 4) AS b, MID(12345, 2, 3) AS c, TRIM(1) AS d, LTRIM(1) AS e, RTRIM(1) AS f, LENGTH(123) AS g, LEN(1.5) AS h'
			),
			[{a: '234', b: '45', c: '234', d: '1', e: '1', f: '1', g: 3, h: 3}]
		);
	});

	it('B) ASCII', function () {
		assert.deepStrictEqual(alasql('SELECT ASCII(61) AS a, ASCII("A") AS b, ASCII(NULL) AS c'), [
			{a: 54, b: 65, c: undefined},
		]);
	});

	it('C) Text, NULL and arrays work as before', function () {
		var data = [{s: ' ab '}, {s: undefined}];
		assert.deepStrictEqual(
			alasql('SELECT TRIM(s) AS t, LENGTH(s) AS l, SUBSTRING(s, 2, 2) AS u FROM ?', [data]),
			[
				{t: 'ab', l: 4, u: 'ab'},
				{t: undefined, l: undefined, u: undefined},
			]
		);
		assert.deepStrictEqual(alasql('SELECT VALUE LEN(@[1, 2, 3])'), 3);
	});
});
