if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 820 - Where is Empty', function () {
	before(function () {
		alasql('CREATE DATABASE test820;USE test820');
		const t1 = [
			{id: '1', a: 'one'},
			{id: '2', a: ''},
			{id: '3', a: null},
			{id: '4'},
			{id: '5', a: undefined},
		];
		alasql('CREATE TABLE T1 (id number, a string)');
		alasql.tables['T1'].data = t1;
	});

	after(function () {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test820');
	});

	it('1. IS EMPTY', function (done) {
		var res = alasql('SELECT * FROM T1 WHERE T1.a IS EMPTY');

		var expected = [
			{id: '3', a: null},
			{id: '4', a: undefined},
			{id: '5', a: undefined},
		];

		assert.deepEqual(res, expected);
		done();
	});

	it('2. IS NOT EMPTY', function (done) {
		var res = alasql('SELECT * FROM T1 WHERE T1.a IS NOT EMPTY');

		var expected = [
			{id: '1', a: 'one'},
			{id: '2', a: ''},
		];

		assert.deepEqual(res, expected);
		done();
	});
});
