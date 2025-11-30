if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1455 - REPLACE function', function () {
	it('A) REPLACE with string target', function () {
		var res = alasql("SELECT REPLACE('123', '2', '_')");
		assert.deepEqual(res, [{["REPLACE('123','2','_')"]: '1_3'}]);
	});

	it('B) REPLACE with numeric target (converted to string)', function () {
		var res = alasql("SELECT REPLACE(123, '2', '_')");
		assert.deepEqual(res, [{["REPLACE(123,'2','_')"]: '1_3'}]);
	});

	it('C) Both string and numeric in same query', function () {
		var res = alasql("SELECT REPLACE('123', '2', '_'), REPLACE(123, '2', '_')");
		assert.deepEqual(res, [
			{
				["REPLACE('123','2','_')"]: '1_3',
				["REPLACE(123,'2','_')"]: '1_3',
			},
		]);
	});

	it('D) REPLACE with numeric search and replacement', function () {
		var res = alasql('SELECT REPLACE(12321, 2, 9)');
		assert.deepEqual(res, [{['REPLACE(12321,2,9)']: '19391'}]);
	});
});
