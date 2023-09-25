if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 847 - XSS', function () {
	before(function () {
		alasql('CREATE DATABASE test847;USE test847');
	});

	after(function () {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test847');
	});

	it('1. XSS in WHERE', function (done) {
		var t1 = [
			{id: '1', a: 'one'},
			{id: '2', a: 'two'},
			{id: '4', a: 'four'},
		];

		alasql('CREATE TABLE T1 (id number, a string)');
		alasql.tables['T1'].data = t1;

		var res = alasql('Select a from T1 where a->valueOf("]),console.log(4)]);function g(){};//")');

		var expected = [];

		assert.deepEqual(res, expected);
		done();
	});
});

