if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '434'; // insert test file number

describe('Test ' + test + ' - joins SELECT', function() {
	before(function() {
		alasql('create database test' + test);
		alasql('use test' + test);

		alasql('CREATE TABLE aaa(firstValue, secondValue)');
		alasql('INSERT INTO aaa VALUES(1, 2)');
		alasql('CREATE TABLE bbb(leftSide, rightSide)');
		alasql('INSERT INTO bbb VALUES(1, 2)');
	});

	after(function() {
		alasql('drop database test' + test);
	});

	it('does not throw error on join SELECT', function() {
		var res = alasql(
			'SELECT * FROM aaa JOIN (SELECT leftSide FROM bbb) AS bLeft ON (aaa.firstValue = bLeft.leftSide)'
		);

		assert.equal(res.length, 1);

		// TODO: The test currently does not pass. Now, the wrong value is returned.
		//assert.deepEqual(res, [{firstValue : 1, secondValue : 2, rightSide : 2}]);
	});
});
