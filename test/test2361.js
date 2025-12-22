if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// only run in browser
if (typeof exports != 'object') {
	describe('Test 2361 - IndexedDB transactions support', function () {
		const SCHEMA_NAME = 'test2361db';
		const TABLE_NAME = 'test_table';

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
				.then(() => alasql.promise('CREATE TABLE ' + TABLE_NAME + ' (name STRING)'))
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
			const query = 'INSERT INTO ' + TABLE_NAME + " VALUES ('test1'), ('test2')";

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

			const query = 'SELECT * FROM ' + TABLE_NAME;

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

		it('6. Transaction with autocommit OFF - COMMIT should persist data', function (done) {
			alasql('SET AUTOCOMMIT OFF');
			alasql
				.promise('USE ' + SCHEMA_NAME)
				.then(() => alasql.promise('BEGIN TRANSACTION'))
				.then(() => alasql.promise('INSERT INTO ' + TABLE_NAME + " VALUES ('test3'), ('test4')"))
				.then(() => alasql.promise('COMMIT TRANSACTION'))
				.then(() => alasql.promise('SELECT * FROM ' + TABLE_NAME))
				.then(res => {
					// Should have at least the new rows
					assert(res.length >= 2, 'Should have at least 2 rows after commit');
					alasql('SET AUTOCOMMIT ON');
					done();
				})
				.catch(error => {
					alasql('SET AUTOCOMMIT ON');
					done(error);
				});
		});

		it('7. Transaction with autocommit OFF - ROLLBACK should discard changes', function (done) {
			alasql('SET AUTOCOMMIT OFF');
			alasql
				.promise('USE ' + SCHEMA_NAME)
				.then(() => alasql.promise('SELECT * FROM ' + TABLE_NAME))
				.then(initialRes => {
					const initialCount = initialRes.length;
					return alasql
						.promise('BEGIN TRANSACTION')
						.then(() =>
							alasql.promise('INSERT INTO ' + TABLE_NAME + " VALUES ('test5'), ('test6')")
						)
						.then(() => alasql.promise('SELECT * FROM ' + TABLE_NAME))
						.then(midRes => {
							// Should see the new rows before rollback
							assert.equal(
								midRes.length,
								initialCount + 2,
								'Should have 2 more rows before rollback'
							);
							return alasql.promise('ROLLBACK TRANSACTION');
						})
						.then(() => alasql.promise('SELECT * FROM ' + TABLE_NAME))
						.then(finalRes => {
							// After rollback, should have original count
							assert.equal(
								finalRes.length,
								initialCount,
								'Should have original count after rollback'
							);
							alasql('SET AUTOCOMMIT ON');
							done();
						});
				})
				.catch(error => {
					alasql('SET AUTOCOMMIT ON');
					done(error);
				});
		});
	});
}
