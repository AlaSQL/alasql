if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
	Test for issue #1919
*/
describe(`Test 1919 Load data from JSONL file`, function () {
	const expectedResult = [
		{
			a: 'foo',
			b: 5,
			c: true,
			d: null,
		},
		{
			a: 'bar',
			b: 8,
			c: false,
			d: null,
		},
	];
	it('1. Load JSONL', function (done) {
		alasql('SELECT * FROM JSONL("' + __dirname + '/test1919")', [], function (res) {
			assert.deepEqual(res, expectedResult);
			done();
		});
	});

	it('2. Load NDJSON', function (done) {
		alasql('SELECT * FROM NDJSON("' + __dirname + '/test1919")', [], function (res) {
			assert.deepEqual(res, expectedResult);
			done();
		});
	});

	it('3. Load NDJSON - will accept file with different  extension', function (done) {
		alasql('SELECT * FROM NDJSON("' + __dirname + '/test1919.jsonl")', [], function (res) {
			assert.deepEqual(res, expectedResult);
			done();
		});
	});

	it('4. Load JSONL - will accept file with different extension', function (done) {
		alasql('SELECT * FROM JSONL("' + __dirname + '/test1919.ndjson")', [], function (res) {
			assert.deepEqual(res, expectedResult);
			done();
		});
	});
});
