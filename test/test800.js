if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 800 - OUTER JOIN missing ids', function () {
	before(function () {
		alasql('CREATE DATABASE test800;USE test800');
	});

	after(function () {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test800');
	});

	it('1. ARRAY()', function (done) {
		var t1 = [
			{id: '1', a: 'one'},
			{id: '2', a: 'two'},
			{id: '4', a: 'four'},
		];
		var t2 = [
			{id: '1', b: 'A'},
			{id: '2', b: 'B'},
			{id: '3', b: 'C'},
		];

		alasql('CREATE TABLE T1 (id number, a string)');
		alasql.tables['T1'].data = t1;

		alasql('CREATE TABLE T2 (id number, b string)');
		alasql.tables['T2'].data = t2;

		var res = alasql('SELECT * FROM T1 OUTER JOIN T2 ON T1.id = T2.id');

		var expected = [
			{id: '1', a: 'one', b: 'A'},
			{id: '2', a: 'two', b: 'B'},
			{id: '4', a: 'four', b: undefined},
			{id: '3', a: undefined, b: 'C'},
		];

		assert.deepEqual(res, expected);
		done();
	});
});
