if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 92 - Std Functions (STD, etc.)', function () {
	it('1. STD()', function (done) {
		var data = [1, 2, 3];
		var res = alasql('SELECT VALUE STD(_) FROM ?', [data]);
		assert(res > 0.816496580927725 && res < 0.816496580927727);
		done();
	});

	it('2. STD(DISTINCT) and STD(ALL)', function (done) {
		var data = [1, 2, 3, 1];
		var res = alasql('SELECT VALUE STD(_) FROM ?', [data]);
		assert(res > 0.8291561975888 && res < 0.8291561975889);
		var res = alasql('SELECT VALUE STD(ALL _) FROM ?', [data]);
		assert(res > 0.8291561975888 && res < 0.8291561975889);

		var res = alasql('SELECT VALUE STD(DISTINCT _) FROM ?', [data]);
		assert(res > 0.816496580927725 && res < 0.816496580927727);

		done();
	});

	/*

ABSVAL
CEIL
FLOOR
ROUND
TRUNC
ASCII
CHAR
CONCAT
CONCAT_WS
LEFT
LPAD
SUBSTR
SUBSTRING
TRIM
COALESCE
VALUE

*/
	//	it('localStorage', function(done){
	//		done();
	//	});
});
