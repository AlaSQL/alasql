if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 224 Mix JavaScript and SQL', function () {
	it('1. JavaScript Expression', function (done) {
		var res = alasql('SELECT VALUE ``1+1``');
		assert(res == 2);
		done();
	});

	it('2. JavaScript Expression', function (done) {
		var data = [{a: 1}, {a: 2}];
		var res = alasql('SELECT COLUMN ``p.one.a`` AS aa FROM ? one', [data]);
		assert.deepEqual(res, [1, 2]);
		done();
	});

	it('3. JavaScript Operator', function (done) {
		alasql.fn.done = done;
		var res = alasql('``setTimeout(function(){alasql.fn.done()},100);``');
	});
});
