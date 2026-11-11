if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var fs = require('fs');
}

let testId = '2846'; // Use the ID of the issue being fixed by this PR

(alasql.utils.isNode ? describe : describe.skip)(
	`Test ${testId} - FILESTORAGE ATTACH and CREATE TABLE errors`,
	function () {
		const missing = 'test' + testId + '-missing.json';
		const filename = 'test' + testId + '.json';

		afterEach(function () {
			alasql('USE alasql');
			['fs' + testId, 'fsa' + testId, 'fsb' + testId].forEach(function (id) {
				delete alasql.databases[id];
			});
			if (fs.existsSync(filename)) fs.unlinkSync(filename);
		});

		it('A) ATTACH of a missing file throws a clear error and does not keep the database', function () {
			assert.throws(function () {
				alasql('ATTACH FILESTORAGE DATABASE fsa' + testId + '("' + missing + '")');
			}, /Cannot attach FileStorage database, because file "test2846-missing.json" can not be read/);
			assert.strictEqual(alasql.databases['fsa' + testId], undefined);
		});

		it('B) ATTACH of a missing file with a callback passes the error to the callback', function (done) {
			alasql(
				'ATTACH FILESTORAGE DATABASE fsb' + testId + '("' + missing + '")',
				function (res, err) {
					assert.strictEqual(res, null);
					assert.match(err.message, /can not be read/);
					assert.strictEqual(alasql.databases['fsb' + testId], undefined);
					done();
				}
			);
		});

		it('C) CREATE TABLE names the database when the table data is already in the file', function () {
			// Rows of "one" without its schema: the live table does not exist, so the engine's own check runs
			fs.writeFileSync(filename, JSON.stringify({tables: {}, one: []}));
			alasql('ATTACH FILESTORAGE DATABASE fs' + testId + '("' + filename + '")');
			alasql('USE fs' + testId);
			assert.throws(function () {
				alasql('CREATE TABLE one (a INT)');
			}, /Table "one" already exists in the database "fs2846"/);
		});

		it('D) ATTACH of a corrupted file throws and does not keep the database', function () {
			['garbage', 'null', '{}'].forEach(function (content) {
				fs.writeFileSync(filename, content);
				assert.throws(function () {
					alasql('ATTACH FILESTORAGE DATABASE fs' + testId + '("' + filename + '")');
				}, /Data in FileStorage database are corrupted/);
				assert.strictEqual(alasql.databases['fs' + testId], undefined);
			});
		});

		it('E) ATTACH AS an alias of a missing file does not keep the alias', function () {
			assert.throws(function () {
				alasql('ATTACH FILESTORAGE DATABASE fs' + testId + '("' + missing + '") AS fsa' + testId);
			}, /can not be read/);
			assert.strictEqual(alasql.databases['fsa' + testId], undefined);
			assert.strictEqual(alasql.databases['fs' + testId], undefined);
		});
	}
);
