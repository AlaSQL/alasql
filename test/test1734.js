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
			{a: 'THREE', b: 'THI\n\rRD'},
		];

		var res = alasql('SELECT b FROM ? WHERE b LIKE "t%"', [data]);

		//console.log(res);
		assert.deepEqual(res, [{b: 'THI\n\rRD'}]);
		done();
	});

	it('2. LIKE', function (done) {
		var data = [
			{a: 'one', b: 'Nine'},
			{a: 'two', b: 'second\n\ritem'},
			{a: 'THREE', b: 'THIRD'},
			{a: 'FOUR', b: '\n\rFifth'},
			{a: 'FIVE', b: 'Six\nth'},
		];

		var res = alasql('SELECT b FROM ? WHERE b LIKE "%T%"', [data]);

		//console.log(res);
		assert.deepEqual(res, [{b: 'second\n\ritem'}, {b: 'THIRD'}, {b: '\n\rFifth'}, {b: 'Six\nth'}]);
		done();
	});
});
