if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test162.json', {strict: false, ws: ''});
} else {
	__dirname = '.';
}

describe('Test 162 - PRIMARY & FOREIGN KEYS in memory, localStorage & IndexedDB', function () {
	it('1. ...', function (done) {
		// TODO - finish the test
		done();
	});
});

//}
