if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 180 - Array as a source', function () {
	var array = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
	var array2 = [0, 1, 2, 3];

	it('1. SELECT', function (done) {
		var res = alasql('SELECT COLUMN * FROM [?] ORDER BY [0]', [array]);
		//      console.log(res);
		assert.deepEqual(res, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		done();
	});

	it('2. JOIN', function (done) {
		var res = alasql('SELECT COLUMN * FROM [?] AS a OUTER JOIN [?] AS b ON a.[0] = b.[0]', [
			array,
			array2,
		]);
		//      console.log(res);
		//      assert.deepEqual(res,[1,2,3,4,5,6,7,8,9,10]);
		done();
	});
});
