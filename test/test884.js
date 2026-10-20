if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 884: @ symbol in column name', () => {
	it('1. Should handle @ symbol in column name with backticks', () => {
		var json = [
			{
				_id: 'someID',
				'@version': '1',
			},
			{
				_id: 'someID2',
				'@version': '2',
			},
		];

		var sql = 'SELECT `_id`, `@version` FROM ?';
		var x = alasql(sql, [json]);
		assert.equal(x.length, 2);
		assert.equal(x[0]._id, 'someID');
		assert.equal(x[0]['@version'], '1');
		assert.equal(x[1]._id, 'someID2');
		assert.equal(x[1]['@version'], '2');
	});

	it('2. Should handle qualified @ column (table.@column)', () => {
		// When we have table aliases, we can use table.@column syntax
		var json = [
			{
				_id: 'someID',
				'@version': '1',
			},
			{
				_id: 'someID2',
				'@version': '2',
			},
		];

		var sql = 'SELECT t._id, t.@version FROM ? AS t';
		var x = alasql(sql, [json]);
		assert.equal(x.length, 2);
		assert.equal(x[0]._id, 'someID');
		assert.equal(x[0]['@version'], '1');
		assert.equal(x[1]._id, 'someID2');
		assert.equal(x[1]['@version'], '2');
	});

	it('3. Should handle multiple columns with @ symbol', () => {
		var json = [
			{
				_id: 'someID',
				'@version': '1',
				'@type': 'test',
			},
		];

		var sql = 'SELECT `_id`, `@version`, `@type` FROM ?';
		var x = alasql(sql, [json]);
		assert.equal(x.length, 1);
		assert.equal(x[0]._id, 'someID');
		assert.equal(x[0]['@version'], '1');
		assert.equal(x[0]['@type'], 'test');
	});

	it('4. Should handle @ in middle or end of column name with backticks', () => {
		var json = [
			{
				'col@middle': 'value1',
				'end@': 'value2',
				'@start@end': 'value3',
			},
		];

		var sql = 'SELECT `col@middle`, `end@`, `@start@end` FROM ?';
		var x = alasql(sql, [json]);
		assert.equal(x.length, 1);
		assert.equal(x[0]['col@middle'], 'value1');
		assert.equal(x[0]['end@'], 'value2');
		assert.equal(x[0]['@start@end'], 'value3');
	});
});
