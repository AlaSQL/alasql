if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

// Test is based on
// https://msdn.microsoft.com/en-us/library/ms190349.aspx
//
describe('Test 235 SELECT INSIDE IF', function () {
	it('1. Prepare database', function (done) {
		alasql('CREATE DATABASE test235; USE test235;');
		done();
	});

	it('2. Throw error', function (done) {
		var data = [{a: 1}, {a: 2}];
		var res = alasql('IF EXISTS(SELECT * FROM ? WHERE a = 2) SELECT VALUE 1 ELSE SELECT VALUE 2', [
			data,
		]);
		assert(res == 1);
		var res = alasql('IF EXISTS(SELECT * FROM ? WHERE a = 3) SELECT VALUE 1 ELSE SELECT VALUE 2', [
			data,
		]);
		assert(res == 2);
		//        console.log(res);
		done();
	});

	it('99. DROP', function (done) {
		alasql('DROP DATABASE test235');
		done();
	});
});
