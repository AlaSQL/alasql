if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1645', function () {
	it('Captures error when callback for user function error', done => {
		try {
			alasql('SELECT medain(8) ', (data, err) => {
				if (err) done();
			});
		} catch (e) {
			throw 'error';
		}
	});

	it('Throws error when callback for user function error', done => {
		try {
			alasql('SELECT medain(8)');
		} catch (e) {
			done();
		}

		throw 'error';
	});

	it('Catches error when promise for user function error', done => {
		alasql.promise('SELECT medain(8)').catch(() => done());
	});
});
