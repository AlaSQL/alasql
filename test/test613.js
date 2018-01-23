if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '613';

describe(
	'Test ' + test + ' - SHOW COLUMNS and SHOW INDEX operations call the callback when provided',
	function() {
		it('1. Prepare databases', function(done) {
			alasql('CREATE DATABASE test613; USE test613');
			alasql('CREATE TABLE one0 (a INT)');
			alasql('CREATE TABLE one1');
			alasql('CREATE INDEX test613_a ON one0(a)');
			alasql.options.modifier = 'RECORDSET';
			done();
		});

		it('2.1. Synchronous SHOW COLUMNS (operation still works when no callback is provided)', function() {
			var res = alasql('SHOW COLUMNS FROM one0');
			assert.deepEqual(res, [
				{
					columnid: 'a',
					dbsize: undefined,
					dbtypeid: 'INT',
				},
			]);
		});

		it('2.2.1. Async SHOW COLUMNS (operation works when callback is provided, and no sql params)', function(done) {
			//
			alasql.promise('SHOW COLUMNS FROM one0').then(function(res) {
				assert.deepEqual(res, [
					{
						columnid: 'a',
						dbsize: undefined,
						dbtypeid: 'INT',
					},
				]);
				done();
			});
		});

		it('2.2.2. Async SHOW COLUMNS (operation works when callback is provided, and empty sql params)', function(done) {
			//
			alasql.promise('SHOW COLUMNS FROM one0', []).then(function(res) {
				assert.deepEqual(res, [
					{
						columnid: 'a',
						dbsize: undefined,
						dbtypeid: 'INT',
					},
				]);
				done();
			});
		});

		it('2.2.3. Async SHOW COLUMNS for a table with no columns (empty array result when callback is provided)', function(done) {
			//
			alasql.promise('SHOW COLUMNS FROM one1').then(function(res) {
				assert.equal(0, res.length);
				done();
			});
		});

		it('2.2.4. Async SHOW COLUMNS for non-existent table (empty array result when callback is provided)', function(done) {
			//
			alasql.promise('SHOW COLUMNS FROM one2').then(function(res) {
				assert.equal(0, res.length);
				done();
			});
		});

		it('3.1. Synchronous SHOW INDEX (operation still works when no callback is provided)', function() {
			var res = alasql('SHOW INDEX FROM one0');
			assert.equal(1, res.length);
			assert.equal(0, res[0].len);
			assert.ok(!!res[0].hh, 'hash is truthy');
		});

		it('3.2.1. Async SHOW INDEX (operation works when callback is provided, and no sql params)', function(done) {
			//
			alasql.promise('SHOW INDEX FROM one0').then(function(res) {
				assert.equal(1, res.length);
				assert.equal(0, res[0].len);
				assert.ok(!!res[0].hh, 'hash is truthy');
				done();
			});
		});

		it('3.2.2. Async SHOW INDEX (operation works when callback is provided, and empty sql params)', function(done) {
			//
			alasql.promise('SHOW INDEX FROM one0', []).then(function(res) {
				assert.equal(1, res.length);
				assert.equal(0, res[0].len);
				assert.ok(!!res[0].hh, 'hash is truthy');
				done();
			});
		});

		it('3.2.3. Async SHOW INDEX on a table with no columns (operation works when callback is provided, and empty sql params)', function(done) {
			//
			alasql.promise('SHOW INDEX FROM one1', []).then(function(res) {
				assert.equal(0, res.length);
				done();
			});
		});

		it('3.2.4. Async SHOW INDEX on non-existent table (operation works when callback is provided, and empty sql params)', function(done) {
			//
			alasql.promise('SHOW INDEX FROM one2', []).then(function(res) {
				assert.equal(0, res.length);
				done();
			});
		});

		it('4. DROP DATABASE', function(done) {
			alasql.options.modifier = undefined;
			alasql('DROP DATABASE test613');
			done();
		});
	}
);
