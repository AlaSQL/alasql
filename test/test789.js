if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '789'; // insert test file number

describe('Test ' + test + ' - convert decimal', function () {
	it('1. DECIMAL', function (done) {
		alasql('SELECT VALUE CONVERT(DECIMAL(10,2),"123.456")', [], function (res) {
			assert(res === 123.46);
			done();
		});
	});

	it('2. DECIMAL', function (done) {
		alasql('SELECT VALUE CONVERT(DECIMAL(10,3),"123.456")', [], function (res) {
			assert(res === 123.456);
			done();
		});
	});

	it('3. DECIMAL', function (done) {
		alasql('SELECT VALUE CONVERT(DECIMAL(10,0),"123.456")', [], function (res) {
			assert(res === 123);
			done();
		});
	});

	it('4. DECIMAL', function (done) {
		alasql('SELECT VALUE CONVERT(DECIMAL(3,0),123.456)', [], function (res) {
			assert(res === 123);
			done();
		});
	});

	it('5. DECIMAL', function (done) {
		alasql('SELECT VALUE CONVERT(DECIMAL(3,0),"stuff")', [], function (res) {
			assert(res === undefined);
			done();
		});
	});
});
