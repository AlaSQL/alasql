if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 247 UNARY PLUS', function() {
	it('1. Simple tests', function(done) {
		var res = alasql('SELECT VALUE + -1');
		assert(res, -1);
		var res = alasql('SELECT VALUE 70 * +1');
		assert(res, 70);

		var data = [{col0: 10, col1: 1, col2: 100}, {col0: 20, col1: 2, col2: 200}];
		var res = alasql('SELECT COLUMN + col1 + 4 FROM ?', [data]);
		assert.deepEqual(res, [5, 6]);

		var res = alasql('SELECT COLUMN - col1 + 4 FROM ?', [data]);
		assert.deepEqual(res, [3, 2]);

		var res = alasql('SELECT COLUMN col1 - + - col0 FROM ?', [data]);
		assert.deepEqual(res, [11, 22]);

		var res = alasql('SELECT COLUMN col1 * + col2 FROM ?', [data]);
		assert.deepEqual(res, [100, 400]);

		var res = alasql('SELECT COLUMN DISTINCT + col1 * + 5 FROM ?', [data]);
		assert.deepEqual(res, [5, 10]);

		var res = alasql('SELECT VALUE + 36 * + ( + 16 )');
		assert(res, 36 * 16);

		done();
	});
});
