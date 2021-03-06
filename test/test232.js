if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

var test = 232;

describe('Test 232 Errors handling', function () {
	before(function () {
		alasql('CREATE DATABASE test' + test + '; USE test' + test + ';');
	});

	after(function () {
		alasql('set errorlog off');
		alasql('DROP DATABASE test' + test + '');
	});

	it('2. Throw error', function () {
		alasql('set errorlog off');
		assert.throws(function () {
			alasql('SELECT * FROM faultyName', [], function (data, err) {});
		}, Error);
	});

	it('3. Log error async', function (done) {
		alasql('set errorlog on');
		alasql('SELECT * FROM faultyName', [], function (data, err) {
			assert(/^Table does not exist\:/.test(err.message));
			done();
		});
	});

	it('4. Log error sync', function () {
		alasql('set errorlog on');
		alasql('SELECT * FROM faultyName');
		assert(/^Table does not exist\:/.test(alasql.error.message));
		alasql('SELECT * FROM ?', [{a: 1}, {a: 2}]);
		assert(!alasql.error);
	});
});
