if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

var test = '1666';
describe('Test'  + test + 'Newline characters in like', function () {
	it('1. LIKE', function (done) {
		var data = [
			{a: 'one', b: 'first'},
			{a: 'two', b: 'second\n\ritem'},
			{a: 'THREE', b: 'THIRD'},
		];

		var res = alasql('SELECT b FROM ? WHERE a LIKE "T%"', [data]);

		//console.log(res);
		assert.deepEqual(res, [{b: 'second\n\ritem'}, {b: 'THIRD'}]);
		done();
	});
});
