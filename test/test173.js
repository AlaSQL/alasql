if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 173 - SELECT Short Syntax', function () {
	if (false) {
		it('1. FROM without select', function (done) {
			var data = [{a: 1}, {a: 2}, {a: 3}];
			alasql('FROM ?', [data], function (res) {
				/// console.log(res);
				assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 3}]);
				done();
			});
		});
	}
});

//};
