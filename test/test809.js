if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

var dbFile = __dirname + '/test_db_fs.json';

var testData = [
	{a: -2, b: -5},
	{a: -2, b: null},
	{a: -2, b: 1},
	{a: null, b: -5},
	{a: null, b: null},
	{a: null, b: 1},
	{a: 3, b: -5},
	{a: 3, b: null},
	{a: 3, b: 1},
];

// Without NULL FIRST/LAST null is sorted as 0
var testDataAscAsc = [
	{a: -2, b: -5},
	{a: -2, b: null},
	{a: -2, b: 1},
	{a: null, b: -5},
	{a: null, b: null},
	{a: null, b: 1},
	{a: 3, b: -5},
	{a: 3, b: null},
	{a: 3, b: 1},
];

var testDataDescDesc = [
	{a: 3, b: 1},
	{a: 3, b: null},
	{a: 3, b: -5},
	{a: null, b: 1},
	{a: null, b: null},
	{a: null, b: -5},
	{a: -2, b: 1},
	{a: -2, b: null},
	{a: -2, b: -5},
];

// Things get better with NULL FIRST/LAST
var testDataAscFirstAscFirst = [
	{a: null, b: null},
	{a: null, b: -5},
	{a: null, b: 1},
	{a: -2, b: null},
	{a: -2, b: -5},
	{a: -2, b: 1},
	{a: 3, b: null},
	{a: 3, b: -5},
	{a: 3, b: 1},
];

var testDataAscFirstAscLast = [
	{a: null, b: -5},
	{a: null, b: 1},
	{a: null, b: null},
	{a: -2, b: -5},
	{a: -2, b: 1},
	{a: -2, b: null},
	{a: 3, b: -5},
	{a: 3, b: 1},
	{a: 3, b: null},
];

var testDataDescFirstAscFirst = [
	{a: null, b: null},
	{a: null, b: -5},
	{a: null, b: 1},
	{a: 3, b: null},
	{a: 3, b: -5},
	{a: 3, b: 1},
	{a: -2, b: null},
	{a: -2, b: -5},
	{a: -2, b: 1},
];

var testDataDescFirstAscLast = [
	{a: null, b: -5},
	{a: null, b: 1},
	{a: null, b: null},
	{a: 3, b: -5},
	{a: 3, b: 1},
	{a: 3, b: null},
	{a: -2, b: -5},
	{a: -2, b: 1},
	{a: -2, b: null},
];

describe('Test 809 - ORDER BY', function () {
	it('without NULLS clause', function (done) {
		var res;
		res = alasql('SELECT a, b FROM ? ORDER BY a ASC, b ASC', [testData]);
		assert.deepEqual(res, testDataAscAsc);
		res = alasql('SELECT a, b FROM ? ORDER BY a DESC, b DESC', [testData]);
		assert.deepEqual(res, testDataDescDesc);
		done();
	});
	it('with NULLS CLAUSE', function (done) {
		var res;
		res = alasql('SELECT a, b FROM ? ORDER BY a ASC NULLS FIRST, b ASC NULLS FIRST', [testData]);
		assert.deepEqual(res, testDataAscFirstAscFirst);
		res = alasql('SELECT a, b FROM ? ORDER BY a ASC NULLS FIRST, b ASC NULLS LAST', [testData]);
		assert.deepEqual(res, testDataAscFirstAscLast);
		res = alasql('SELECT a, b FROM ? ORDER BY a DESC NULLS FIRST, b ASC NULLS FIRST', [testData]);
		assert.deepEqual(res, testDataDescFirstAscFirst);
		res = alasql('SELECT a, b FROM ? ORDER BY a DESC NULLS FIRST, b ASC NULLS LAST', [testData]);
		assert.deepEqual(res, testDataDescFirstAscLast);

		res = alasql('SELECT a, b FROM ? ORDER BY a DESC NULLS LAST, b DESC NULLS LAST', [testData]);
		assert.deepEqual(res, testDataAscFirstAscFirst.slice().reverse());
		res = alasql('SELECT a, b FROM ? ORDER BY a DESC NULLS LAST, b DESC NULLS FIRST', [testData]);
		assert.deepEqual(res, testDataAscFirstAscLast.slice().reverse());
		res = alasql('SELECT a, b FROM ? ORDER BY a ASC NULLS LAST, b DESC NULLS LAST', [testData]);
		assert.deepEqual(res, testDataDescFirstAscFirst.slice().reverse());
		res = alasql('SELECT a, b FROM ? ORDER BY a ASC NULLS LAST, b DESC NULLS FIRST', [testData]);
		assert.deepEqual(res, testDataDescFirstAscLast.slice().reverse());

		done();
	});
});
