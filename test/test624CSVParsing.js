if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// valid csv headers no data no newline character so should force a file read attempt
var TEST_NO_DATA = 'a, b, c, d';
var TEST_VALID_DATA = 'a, b, c, d\n1,2,3,4';
var BAD_FILE_PATH = '/tmp/largemargesentme.csv';
var BAD_URL = 'http://lzkdjf;zldkfj';

describe('Test PromiseExec', function () {
	var res;

	it('A) csvload with no csv data, expect rejected promise', function () {
		res = alasql
			.promise('SELECT * FROM CSV(?, {headers:true, separator:","})', [TEST_NO_DATA])
			.then(function () {
				//no-op, expect exception
			})
			.catch(function (e) {
				res = e;
				assert.ok(res instanceof Error === true, 'Expected exception');
			});
	});
	it('B) csvload with valid data, expect array length 1', function () {
		res = alasql
			.promise('SELECT * FROM CSV(?, {headers:true, separator:","})', [TEST_VALID_DATA])
			.then(function (res) {
				assert.ok(res.length === 1, 'Expected array of size 1 returned');
			})
			.catch(function (e) {
				throw e;
			});
	});
	it('C) csvload with bad file path, expect exception', function () {
		res = alasql
			.promise('SELECT * FROM CSV(?, {headers:true, separator:","})', BAD_FILE_PATH)
			.then(function () {
				//no-op, expect exception
			})
			.catch(function (e) {
				res = e;
				assert.ok(res instanceof Error === true, 'Expected exception');
			});
	});
	it('D) csvload with bad URL, expect some kind of response', function () {
		// ISPs deal with bad URL's differently.  Some will return a 400, while others won't do anything.
		// This is testing that the promise functionality doesn't swallow errors, so it should be OK to just test for
		// a non null response.
		res = alasql
			.promise('SELECT * FROM CSV(?, {headers:true, separator:","})', BAD_URL)
			.then(function (res) {
				assert.ok(res !== undefined, 'Expected resppnse');
			})
			.catch(function (e) {
				assert.ok(e instanceof Error === true, 'Expected exception');
			});
	});
});
