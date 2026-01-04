if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// only run in browser
if (typeof exports != 'object') {
	describe('Test 2361 - IndexedDB transactions support', function () {
		const SCHEMA_NAME = 'test2361db';

		before(function () {
			// Clean up any existing database
			return alasql.promise('DROP INDEXEDDB DATABASE IF EXISTS ' + SCHEMA_NAME);
		});

		after(function () {
			// Clean up after tests
			return alasql.promise('DROP INDEXEDDB DATABASE IF EXISTS ' + SCHEMA_NAME);
		});

		it('1. BEGIN TRANSACTION should work with IndexedDB', function (done) {
			const queriesAttach = [
				'CREATE INDEXEDDB DATABASE ' + SCHEMA_NAME,
				'ATTACH INDEXEDDB DATABASE ' + SCHEMA_NAME,
				'USE ' + SCHEMA_NAME,
			];

			alasql
				.promise(queriesAttach)
				.then(() => alasql.promise('CREATE TABLE test_table'))
				.then(() => alasql.promise('BEGIN TRANSACTION'))
				.then(res => {
					assert.equal(res, 1);
					done();
				})
				.catch(error => {
					done(error);
				});
		});

		it('2. COMMIT TRANSACTION should work with IndexedDB', function (done) {
			alasql
				.promise('USE ' + SCHEMA_NAME)
				.then(() => alasql.promise('BEGIN TRANSACTION'))
				.then(() => alasql.promise('COMMIT TRANSACTION'))
				.then(res => {
					assert.equal(res, 1);
					done();
				})
				.catch(error => {
					done(error);
				});
		});

		it('3. ROLLBACK TRANSACTION should work with IndexedDB', function (done) {
			alasql
				.promise('USE ' + SCHEMA_NAME)
				.then(() => alasql.promise('BEGIN TRANSACTION'))
				.then(() => alasql.promise('ROLLBACK TRANSACTION'))
				.then(res => {
					assert.equal(res, 1);
					done();
				})
				.catch(error => {
					done(error);
				});
		});

		it('4. Full transaction workflow with INSERT', function (done) {
			const query = "INSERT INTO test_table VALUES ('test1'), ('test2')";

			alasql
				.promise('USE ' + SCHEMA_NAME)
				.then(() => alasql.promise('BEGIN TRANSACTION'))
				.then(() => alasql.promise(query))
				.then(() => alasql.promise('COMMIT TRANSACTION'))
				.then(res => {
					assert.equal(res, 1);
					done();
				})
				.catch(error => {
					done(error);
				});
		});

		it('5. Transaction workflow as described in issue', function (done) {
			const queriesAttach = ['ATTACH INDEXEDDB DATABASE ' + SCHEMA_NAME, 'USE ' + SCHEMA_NAME];

			const query = 'SELECT * FROM test_table';

			alasql
				.promise(queriesAttach)
				.then(() => alasql.promise('BEGIN TRANSACTION'))
				.then(() => alasql.promise(query))
				.then(() => alasql.promise('COMMIT TRANSACTION'))
				.then(res => {
					// Should succeed without throwing the error:
					// "l.engines[l.databases[l.useid].engineid].begin is not a function"
					assert.equal(res, 1);
					done();
				})
				.catch(error => {
					done(error);
				});
		});
	});
}
