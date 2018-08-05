if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #379
*/

var test = 425;

describe('Test ' + test + ' Arrow and DOT', function() {
	before(function() {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function() {
		alasql('DROP DATABASE test' + test);
	});

	it('1. DOT outside SELECT', function(done) {
		var files = ['home_01.ai', 'home_02.ai', 'home_03.ai', 'imprint_01.ai', 'imprint_02.ai'];

		var res = alasql('COLUMN OF SELECT ARRAY(_) FROM ? GROUP BY _->split("_")->0', [files]);
		assert.deepEqual(res, [
			['home_01.ai', 'home_02.ai', 'home_03.ai'],
			['imprint_01.ai', 'imprint_02.ai'],
		]);
		done();
	});
});
