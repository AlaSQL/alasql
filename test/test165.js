if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test162.json', {strict: false, ws: ''});
} else {
	__dirname = '.';
}

if (typeof exports === 'object' && false) {
	describe('Test 165 - WebSQL database', function () {
		it('1. WebSQL database', function (done) {
			alasql(
				'create websql database if not exists test165; attach websql database test165',
				[],
				function (res) {
					assert.deepEqual(res, [1, 1]);
					alasql('select * from test165(select * from one)');
					done();
				}
			);

			// TODO - finish the test
			done();
		});
	});
}
