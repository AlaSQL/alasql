if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 
*/

describe('Test 398 GLOB ', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test398;USE test398');
		done();
	});

	it('2. GLOB tests', function (done) {
		var res = alasql('="abcde" GLOB "abcde"');
		assert(res);
		var res = alasql('="abcde" GLOB "a*"');
		assert(res);
		var res = alasql('="abcde" GLOB "a????"');
		assert(res);
		var res = alasql('="abcde" GLOB "a?"');
		assert(!res);
		var res = alasql('="abcde" GLOB "*b*"');
		assert(res);
		var res = alasql('="abcde" GLOB "*g*"');
		assert(!res);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test398');
		done();
	});
});
