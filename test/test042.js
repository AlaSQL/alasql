if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 42', function () {
	describe('MID function', function () {
		var db;
		it('MID Function', function (done) {
			db = new alasql.Database('db');

			db.exec('CREATE TABLE one (a STRING, b FLOAT)');
			db.exec('INSERT INTO one VALUES ("One", 1.234),("Two", 2.9876443343),("Three", 3.3322343)');
			var res = db.exec('SELECT COLUMN MID(a,2,2) AS b FROM one');
			assert.deepStrictEqual(['ne', 'wo', 'hr'], res);
			done();
		});

		it('ROUND Function', function (done) {
			var res = db.exec('SELECT COLUMN ROUND(b) AS b FROM one');
			assert.deepStrictEqual([1, 3, 3], res);

			var res = db.exec('SELECT COLUMN ROUND(b,1) AS b FROM one');
			assert.deepStrictEqual([1.2, 3.0, 3.3], res);

			done();
		});

		it('should follow SQLite behavior for zero and negative starting positions', function () {
			const res = alasql(
				"SELECT SUBSTRING('abcdef', 0, 3) AS zero, " + "SUBSTRING('abcdef', -1, 3) AS negative"
			);
			assert.deepStrictEqual(res, [{zero: 'ab', negative: 'f'}]);
		});

		it('should parse num correctly', function () {
			const numericResult = alasql('SELECT SUBSTRING(12345, 2, 2) AS result');

			assert.deepStrictEqual(numericResult, [{result: '23'}]);
		});

		it('should handle SQLite SUBSTRING edge cases', function () {
			const res = alasql(
				'SELECT ' +
					"SUBSTRING('abcdef', -2) AS negativeNoLength, " +
					"SUBSTRING('abcdef', -2, 1) AS negativeLength, " +
					"SUBSTRING('abcdef', -7, 3) AS beyondStart"
			);

			assert.deepStrictEqual(res, [
				{
					negativeNoLength: 'ef',
					negativeLength: 'e',
					beyondStart: 'ab',
				},
			]);
		});

		it('should support both SUBSTRING syntaxes', function () {
			const res = alasql(
				'SELECT ' +
					"SUBSTRING('abcdef', 2, 3) AS commaSyntax, " +
					"SUBSTRING('abcdef' FROM 2 FOR 3) AS standardSyntax, " +
					"SUBSTRING('abcdef' FROM 2) AS standardSyntaxNoLength"
			);

			assert.deepStrictEqual(res, [
				{
					commaSyntax: 'bcd',
					standardSyntax: 'bcd',
					standardSyntaxNoLength: 'bcdef',
				},
			]);
		});
	});
});
