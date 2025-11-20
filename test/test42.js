if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 42 - NULL values in INTO SQL()', function () {
	it('1. Should output NULL for null values', () => {
		var data = [
			{a: 1, b: 'test', c: null, d: 3},
			{a: 2, b: null, c: 4, d: null},
			{a: null, b: 'value', c: null, d: null},
		];
		var res = alasql('SELECT * INTO SQL({tableid:"test_table"}) FROM ?', [data]);

		var expected =
			"INSERT INTO test_table(a,b,c,d) VALUES (1,'test',NULL,3);\n" +
			'INSERT INTO test_table(a,b,c,d) VALUES (2,NULL,4,NULL);\n' +
			"INSERT INTO test_table(a,b,c,d) VALUES (NULL,'value',NULL,NULL);\n";

		assert.deepEqual(res, expected);
	});

	it('2. Should handle undefined values as NULL', () => {
		var data = [
			{a: 1, b: 'test'},
			{a: 2, b: undefined, c: 4},
		];
		var res = alasql('SELECT * INTO SQL({tableid:"test_table"}) FROM ?', [data]);

		var expected =
			"INSERT INTO test_table(a,b) VALUES (1,'test');\n" +
			'INSERT INTO test_table(a,b) VALUES (2,NULL);\n';

		assert.deepEqual(res, expected);
	});

	it('3. Should handle mixed NULL, undefined, and empty strings', () => {
		var data = [{a: 1, b: '', c: null, d: undefined}];
		var res = alasql('SELECT * INTO SQL({tableid:"test_table"}) FROM ?', [data]);

		var expected = "INSERT INTO test_table(a,b,c,d) VALUES (1,'',NULL,NULL);\n";

		assert.deepEqual(res, expected);
	});
});
