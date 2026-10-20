if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 199 IF statement', function () {
	it('1. Simple Variant', function (done) {
		//        alasql('CREATE DATABASE test199;USE test199');
		var res = alasql('IF TRUE SELECT VALUE 100');
		assert(res == 100);
		//        alasql('DROP DATABASE test199');
		done();
	});
});
