if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var Promise = require('es6-promise').Promise;
} else {
	__dirname = '.';
}

describe('Test 291 - Promises:', function () {
	it('.promise', function (done) {
		alasql
			.promise('SELECT VALUE 1')
			.then(function (res) {
				assert.deepEqual(res, 1);
				done();
			})
			.catch(function (err) {
				throw err;
			});
	});

	it('.promise all', function (done) {
		this.timeout(2000); // dont get why this is timing out...

		alasql
			.promise(['SELECT VALUE 1'])
			.then(function (res) {
				assert.deepEqual(res, [1]);
				done();
			})
			.catch(function (err) {
				//console.log(err)
				throw err;
			});
	});

	it('.promise .catch exception', function (done) {
		this.timeout(2000); // dont get why this is timing out...

		alasql.promise('SELECT * FROM tableThatDoesNotExists').catch(function (err) {
			assert(err instanceof Error);
			done();
		});
	});

	it('.promise all .catch exception', function (done) {
		this.timeout(5000); // dont get why this is timing out...

		alasql.promise(['SELECT * FROM tableThatDoesNotExists']).catch(function (err) {
			assert(err instanceof Error);
			done();
		});
	});

	it('.promise all multi + params', function (done) {
		alasql
			.promise(['value of SELECT 1', ['value of select ?', 2]])
			.then(function (res) {
				assert.deepEqual(res, [1, 2]);
				done();
			})
			.catch(function (reason) {
				console.log(reason);
			});
	});

	it('.promise all, lazy notation', function (done) {
		alasql(['value of SELECT 1 --so lazy', ['value of select ?', 2]])
			.then(function (res) {
				assert.deepEqual(res, [1, 2]);
				done();
			})
			.catch(function (reason) {
				console.log(reason);
			});
	});
});
