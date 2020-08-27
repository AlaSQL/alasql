if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = 626;

describe('Test ' + test + ' join on CSV file', function () {
	before(function () {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('1. can select with a join on a CSV file', function (done) {
		alasql(
			'SELECT EN.n, EN.en, FR.fr from ? EN LEFT JOIN CSV("' +
				__dirname +
				'/test626.csv") FR on EN.n = FR.n',
			[
				[
					{n: 1, en: 'one'},
					{n: 2, en: 'two'},
				],
			],
			function (res) {
				assert.deepEqual(res, [
					{n: 1, en: 'one', fr: 'un'},
					{n: 2, en: 'two', fr: 'deux'},
				]);
				done();
			}
		);
	});
});
