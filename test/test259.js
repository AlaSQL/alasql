if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 259 SqlLogic Parser Test #2', function () {
	before(function () {
		alasql('CREATE DATABASE test259');
		alasql('USE test259');
	});

	after(function () {
		alasql('DROP DATABASE test259');
	});

	it.skip('1. Sqllogic', function (done) {
		done();
	});

	it('2. FROM JOIN / CROSS JOIN syntax ', function (done) {
		alasql('CREATE TABLE tab0; CREATE TABLE tab2');

		alasql(
			'SELECT DISTINCT * FROM tab2 cor0 JOIN tab2 cor1 ON + ( 90 ) \
          IS NOT NULL, tab0 AS cor2 '
		);

		//        alasql('SELECT DISTINCT * FROM tab2 cor0 JOIN tab2 cor1 ON + ( 90 ) \
		//          IS NOT NULL CROSS JOIN tab0 AS cor2 ');

		alasql('DROP TABLE tab0; DROP TABLE tab2; ');
		done();
	});

	it('3. SELECT ALL', function (done) {
		alasql('CREATE TABLE tab1;CREATE TABLE tab2');
		var res = alasql('SELECT ALL * FROM tab1 cor0 CROSS JOIN tab1, tab2 AS cor1');
		assert(Array.isArray(res));
		alasql('DROP TABLE tab1;DROP TABLE tab2');
		done();
	});

	it.skip('99. Drop Database', function (done) {
		done();
	});
});
