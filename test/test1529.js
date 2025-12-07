if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1529 - SELECT null [not] IN ()', function () {
	it('1. null IN () should return false', function (done) {
		var res = alasql('SELECT VALUE null IN ()');
		assert.strictEqual(res, false, 'null IN () should return false, got ' + res);
		done();
	});

	it('2. null NOT IN () should return true', function (done) {
		var res = alasql('SELECT VALUE null NOT IN ()');
		assert.strictEqual(res, true, 'null NOT IN () should return true, got ' + res);
		done();
	});

	it('3. Verify non-null values still work correctly', function (done) {
		var res1 = alasql('SELECT VALUE 1 IN ()');
		assert.strictEqual(res1, false, '1 IN () should return false');

		var res2 = alasql('SELECT VALUE 1 NOT IN ()');
		assert.strictEqual(res2, true, '1 NOT IN () should return true');

		done();
	});
});
