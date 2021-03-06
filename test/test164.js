if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test162.json', {strict: false, ws: ''});
} else {
	__dirname = '.';
}

if (typeof exports === 'object') {
	describe('Test 164 - NeDB', function () {
		it('1. NeDB support', function (done) {
			// TODO - finish the test
			done();
		});
	});
}
