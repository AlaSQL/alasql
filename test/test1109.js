if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1109 - Export empty tables to excel sheets', function () {
	const test = '1109';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Export empty tables to excel sheets', function () {
		var res = [];
		var opts = [{sheetid: 'a'}, {sheetid: 'b'}];
		res.push(
			alasql('SELECT INTO XLSX("' + __dirname + '/restest1109.xlsx",?) FROM ?', [opts, [[], []]])
		);
		assert.deepEqual(res, [1]);
	});
});
