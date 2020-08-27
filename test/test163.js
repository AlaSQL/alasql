if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test162.json', {strict: false, ws: ''});
} else {
	__dirname = '.';
}

if (false) {
	describe('Test 163 - Streaming', function () {
		if (typeof exports === 'object') {
			it('1. Select from stdin', function (done) {
				// TODO - finish the test
				alasql('select [0] from txt() where [0] like "M%"', [], function (res) {
					done();
				});
			});

			it('2. Select to stdout', function (done) {
				// TODO - finish the test
				alasql('select [0] into txt() from ?', [], function (res) {
					done();
				});
			});

			it('3. Select from stream', function (done) {
				// TODO - finish the test
				alasql('select [0] into stream txt() from stream txt() where [0] like "M%" ');
				done();
			});
		}

		it('4. Select from database as a stream', function (done) {
			// TODO - finish the test
			alasql(
				'select [0] into stream txt() from stream mssql(select * from one) where [0] like "M%" '
			);
			done();
		});
	});
}
