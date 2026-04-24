if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (false) {
	// Functionality discontinued
	// AG 20.04.2015
	describe('Test 222 TD TH syntax', function () {
		it('1. TD', function (done) {
			alasql('SELECT _ TD {className:"red"} FROM RANGE(1,2)');
			done();
		});
	});
}
