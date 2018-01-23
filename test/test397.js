if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 397 << and >> ', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test397;USE test397');
		done();
	});

	it('2. << and >> and other operations...', function(done) {
		var res = alasql('= 1 << 2');
		assert(res, 4);

		var res = alasql('= 256 >> 4');
		assert(res, 16);

		var res = alasql('= 7 & 3');
		assert(res, 3);

		var res = alasql('= 8 | 1');
		assert(res, 9);

		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test397');
		done();
	});
});
