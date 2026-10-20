if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 609 - Insert into table ', function () {
	it('values', function () {
		alasql.parse('insert into abc values (1,2,3)');
	});

	it('value', function () {
		alasql.parse('insert into abc value (1,2,3)');
	});

	it('(skip values)', function () {
		alasql.parse('insert into abc (1,2,3)');
	});
});
