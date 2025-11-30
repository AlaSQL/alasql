if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1455 - REPLACE function', function () {
	it('A) REPLACE with string target', function () {
		var res = alasql("SELECT REPLACE('123', '2', '_') AS result");
		assert.deepEqual(res, [{result: '1_3'}]);
	});

	it('B) REPLACE with number target', function () {
		var res = alasql("SELECT REPLACE(123, '2', '_') AS result");
		assert.deepEqual(res, [{result: '1_3'}]);
	});

	it('C) REPLACE with string and number returning same result', function () {
		var res = alasql(
			"SELECT REPLACE('123', '2', '_') AS str_result, REPLACE(123, '2', '_') AS num_result"
		);
		assert.deepEqual(res, [{str_result: '1_3', num_result: '1_3'}]);
	});

	it('D) REPLACE with number in pattern', function () {
		var res = alasql("SELECT REPLACE('123', 2, '_') AS result");
		assert.deepEqual(res, [{result: '1_3'}]);
	});

	it('E) REPLACE with number in replacement', function () {
		var res = alasql("SELECT REPLACE('1_3', '_', 2) AS result");
		assert.deepEqual(res, [{result: '123'}]);
	});

	it('F) REPLACE with all numbers', function () {
		var res = alasql('SELECT REPLACE(123, 2, 9) AS result');
		assert.deepEqual(res, [{result: '193'}]);
	});
});
