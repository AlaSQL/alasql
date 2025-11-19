if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 884: @ symbol in column name', function () {
	it('1. Should handle @ symbol in column name without backticks', function (done) {
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

		var sql = 'SELECT _id, @version FROM ?';
		var x = alasql(sql, [json]);
		assert.equal(x.length, 2);
		assert.equal(x[0]._id, 'someID');
		assert.equal(x[0]['@version'], '1');
		assert.equal(x[1]._id, 'someID2');
		assert.equal(x[1]['@version'], '2');
		done();
	});

	it('2. Should handle @ symbol in column name with backticks', function (done) {
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
		done();
	});

	it('3. Should handle multiple columns with @ symbol', function (done) {
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
		done();
	});
});
