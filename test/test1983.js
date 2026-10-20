if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

const test = '1983'; // insert test file number

describe('Test 1983 - multiple statements', function () {
	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
		alasql('CREATE TABLE a (anything string);');
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('USING followed by name', function () {
		assert.doesNotThrow(() => alasql('SELECT * FROM a a1 JOIN a a2 USING c;'));
	});

	it('USING followed by name in parathesis', function () {
		assert.doesNotThrow(() => alasql('SELECT * FROM a a1 JOIN a a2 USING (c);'));
	});
});
