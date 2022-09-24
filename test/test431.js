if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}
describe('Test 431 error in 8 and 108 convert formats', function() {
	it('1. Should format time correctly', function(done) {
		var date = new Date(2016, 0, 1, 0, 0, 0);
		var correctTime = '00:00:00';
		var res = alasql('SELECT VALUE CONVERT(STRING, ?, 108)', [date]);
		assert.equal(res, correctTime);
		res = alasql('SELECT VALUE CONVERT(STRING, ?, 8)', [date]);
		assert.equal(res, correctTime);

		done();
	});
});
