if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

if (typeof exports == 'object') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test1848.json', {
		strict: false,
		ws: '',
	});
}

describe('Test 1848 - Default values in FILESTORAGE and LOCALSTORAGE', function () {
	const test = '1848';

	// Test for LOCALSTORAGE
	describe('LOCALSTORAGE', function () {
		var lsdbid = 'test' + test + 'ls';

		before(function () {
			// Ensure clean state
			localStorage.clear();
		});

		after(function () {
			// Cleanup
			try {
				alasql('DETACH DATABASE ' + lsdbid);
				alasql('DROP LOCALSTORAGE DATABASE ' + lsdbid);
			} catch (e) {
				// Database might not exist
			}
			localStorage.clear();
		});

		it('A) Should apply DEFAULT values on INSERT in LOCALSTORAGE', function (done) {
			alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS ' + lsdbid);
			alasql('ATTACH LOCALSTORAGE DATABASE ' + lsdbid);
			alasql('USE ' + lsdbid);

			alasql(`CREATE TABLE banks (
				name STRING PRIMARY KEY,
				is_open BOOLEAN DEFAULT true,
				[key] STRING
			)`);

			alasql(`CREATE TABLE pigs (
				id STRING PRIMARY KEY,
				bank STRING DEFAULT null,
				ready BOOLEAN DEFAULT false,
				dream STRING,
				notes STRING,
				kind STRING
			)`);

			// Insert without specifying all columns
			alasql("INSERT INTO banks (name, [key]) VALUES ('Bank1', 'abc123')");
			alasql("INSERT INTO pigs (id, dream) VALUES ('pig1', 'fly')");

			var banksResult = alasql('SELECT * FROM banks');
			var pigsResult = alasql('SELECT * FROM pigs');

			// Check that defaults were applied
			assert.deepStrictEqual(banksResult, [{name: 'Bank1', is_open: true, key: 'abc123'}]);
			assert.deepStrictEqual(pigsResult, [
				{
					id: 'pig1',
					bank: undefined,
					ready: false,
					dream: 'fly',
					notes: undefined,
					kind: undefined,
				},
			]);

			alasql('DETACH DATABASE ' + lsdbid);
			alasql('DROP LOCALSTORAGE DATABASE ' + lsdbid);
			done();
		});

		it('B) Should apply CURRENT_TIMESTAMP DEFAULT in LOCALSTORAGE', function (done) {
			alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS ' + lsdbid);
			alasql('ATTACH LOCALSTORAGE DATABASE ' + lsdbid);
			alasql('USE ' + lsdbid);

			alasql(`CREATE TABLE events (
				id STRING PRIMARY KEY,
				timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
			)`);

			// Insert without specifying timestamp
			var beforeInsert = new Date();
			alasql("INSERT INTO events (id) VALUES ('event1')");
			var afterInsert = new Date();

			var result = alasql('SELECT * FROM events');

			assert.equal(result.length, 1);
			assert.equal(result[0].id, 'event1');
			assert.ok(
				result[0].timestamp !== undefined,
				'timestamp should be set with DEFAULT CURRENT_TIMESTAMP'
			);
			// Check that timestamp is a Date or string that can be converted to Date
			var timestamp = new Date(result[0].timestamp);
			assert.ok(
				timestamp >= beforeInsert && timestamp <= afterInsert,
				'timestamp should be within the expected range'
			);

			alasql('DETACH DATABASE ' + lsdbid);
			alasql('DROP LOCALSTORAGE DATABASE ' + lsdbid);
			done();
		});
	});

	// Test for FILESTORAGE
	describe('FILESTORAGE', function () {
		var fsdbid = 'test' + test + 'fs';
		var filename = 'test' + test + '.db';

		beforeEach(function () {
			// Clean up file before each test
			try {
				var fs = require('fs');
				if (fs.existsSync(filename)) {
					fs.unlinkSync(filename);
				}
			} catch (e) {
				// File might not exist
			}
		});

		afterEach(function () {
			// Cleanup after each test
			try {
				alasql('DROP DATABASE ' + fsdbid);
			} catch (e) {
				// Database might not exist
			}
			try {
				var fs = require('fs');
				if (fs.existsSync(filename)) {
					fs.unlinkSync(filename);
				}
			} catch (e) {
				// File might not exist
			}
		});

		it('C) Should apply DEFAULT values on INSERT in FILESTORAGE', function (done) {
			// Use synchronous mode for simplicity in testing
			alasql.options.autocommit = true;

			alasql('CREATE FILESTORAGE DATABASE ' + fsdbid + '("' + filename + '")', function () {
				alasql('ATTACH FILESTORAGE DATABASE ' + fsdbid + '("' + filename + '")', function () {
					alasql('USE ' + fsdbid);

					alasql(`CREATE TABLE banks (
						name STRING PRIMARY KEY,
						is_open BOOLEAN DEFAULT true,
						[key] STRING
					)`);

					alasql(`CREATE TABLE pigs (
						id STRING PRIMARY KEY,
						bank STRING DEFAULT null,
						ready BOOLEAN DEFAULT false,
						dream STRING,
						notes STRING,
						kind STRING
					)`);

					// Insert without specifying all columns
					alasql("INSERT INTO banks (name, [key]) VALUES ('Bank1', 'abc123')");
					alasql("INSERT INTO pigs (id, dream) VALUES ('pig1', 'fly')");

					var banksResult = alasql('SELECT * FROM banks');
					var pigsResult = alasql('SELECT * FROM pigs');

					// Check that defaults were applied
					assert.deepStrictEqual(banksResult, [{name: 'Bank1', is_open: true, key: 'abc123'}]);
					assert.deepStrictEqual(pigsResult, [
						{
							id: 'pig1',
							bank: undefined,
							ready: false,
							dream: 'fly',
							notes: undefined,
							kind: undefined,
						},
					]);

					alasql('DETACH DATABASE ' + fsdbid);
					alasql('DROP DATABASE ' + fsdbid);
					done();
				});
			});
		});

		it('D) Should apply CURRENT_TIMESTAMP DEFAULT in FILESTORAGE', function (done) {
			// Use synchronous mode for simplicity in testing
			alasql.options.autocommit = true;

			alasql('CREATE FILESTORAGE DATABASE ' + fsdbid + '("' + filename + '")', function () {
				alasql('ATTACH FILESTORAGE DATABASE ' + fsdbid + '("' + filename + '")', function () {
					alasql('USE ' + fsdbid);

					alasql(`CREATE TABLE events (
						id STRING PRIMARY KEY,
						timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
					)`);

					// Insert without specifying timestamp
					var beforeInsert = new Date();
					alasql("INSERT INTO events (id) VALUES ('event1')");
					var afterInsert = new Date();

					var result = alasql('SELECT * FROM events');

					assert.equal(result.length, 1);
					assert.equal(result[0].id, 'event1');
					assert.ok(
						result[0].timestamp !== undefined,
						'timestamp should be set with DEFAULT CURRENT_TIMESTAMP'
					);
					// Check that timestamp is a Date or string that can be converted to Date
					var timestamp = new Date(result[0].timestamp);
					assert.ok(
						timestamp >= beforeInsert && timestamp <= afterInsert,
						'timestamp should be within the expected range'
					);

					alasql('DETACH DATABASE ' + fsdbid);
					alasql('DROP DATABASE ' + fsdbid);
					done();
				});
			});
		});
	});
});
