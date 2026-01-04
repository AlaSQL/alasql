if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2070 - RECORDSET OF with wildcard and additional columns', function () {
	it('1. RECORDSET OF SELECT t.*, additional_column returns all columns', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
			{a: 1, b: 30},
		];
		var res = alasql('RECORDSET OF SELECT t.*, 1 as rn FROM ? t', [data]);

		var expected = {
			columns: [{columnid: 'rn'}, {columnid: 'a'}, {columnid: 'b'}],
			data: [
				{rn: 1, a: 1, b: 10},
				{rn: 1, a: 2, b: 20},
				{rn: 1, a: 1, b: 30},
			],
		};

		assert.deepStrictEqual(res.columns, expected.columns);
		assert.deepStrictEqual(res.data, expected.data);
		done();
	});

	it('2. RECORDSET OF SELECT *, additional_column returns all columns', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		var res = alasql('RECORDSET OF SELECT *, 1 as rn FROM ? t', [data]);

		var expected = {
			columns: [{columnid: 'rn'}, {columnid: 'a'}, {columnid: 'b'}],
			data: [
				{rn: 1, a: 1, b: 10},
				{rn: 1, a: 2, b: 20},
			],
		};

		assert.deepStrictEqual(res.columns, expected.columns);
		assert.deepStrictEqual(res.data, expected.data);
		done();
	});

	it('3. RECORDSET OF SELECT t.* still works correctly', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		var res = alasql('RECORDSET OF SELECT t.* FROM ? t', [data]);

		var expected = {
			columns: [{columnid: 'a'}, {columnid: 'b'}],
			data: [
				{a: 1, b: 10},
				{a: 2, b: 20},
			],
		};

		assert.deepStrictEqual(res.columns, expected.columns);
		assert.deepStrictEqual(res.data, expected.data);
		done();
	});

	it('4. RECORDSET OF SELECT explicit columns works correctly', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		var res = alasql('RECORDSET OF SELECT a, b, 1 as rn FROM ? t', [data]);

		var expected = {
			columns: [{columnid: 'a'}, {columnid: 'b'}, {columnid: 'rn'}],
			data: [
				{a: 1, b: 10, rn: 1},
				{a: 2, b: 20, rn: 1},
			],
		};

		assert.deepStrictEqual(res.columns, expected.columns);
		assert.deepStrictEqual(res.data, expected.data);
		done();
	});

	it('5. RECORDSET OF SELECT with multiple additional columns', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		var res = alasql('RECORDSET OF SELECT t.*, 1 as rn, 2 as seq FROM ? t', [data]);

		var expected = {
			columns: [{columnid: 'rn'}, {columnid: 'seq'}, {columnid: 'a'}, {columnid: 'b'}],
			data: [
				{rn: 1, seq: 2, a: 1, b: 10},
				{rn: 1, seq: 2, a: 2, b: 20},
			],
		};

		assert.deepStrictEqual(res.columns, expected.columns);
		assert.deepStrictEqual(res.data, expected.data);
		done();
	});
});
