if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (false) {
	describe('Test 135 a la NoSQL', function () {
		var test135;
		it('1. Insert NoSQL', function (done) {
			var test135 = alasql.create('test135');
			var one = test135.create('one');
			one.insert({a: 1, b: 2}, function (res) {
				assert(res == 1);
				one.find({a: 1}, function (res) {
					assert.deepEqual(res, {a: 1, b: 2});
					done();
				});
			});
		});

		it('99. Clear database', function (done) {
			test135.drop();
			done();
		});
	});
}
