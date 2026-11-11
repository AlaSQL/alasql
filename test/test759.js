if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test759.json', {
		strict: false,
		ws: '',
	});
}

var test = '759';

describe('Test ' + test + ' - localStorage database with a missing record', function () {
	beforeEach(function () {
		alasql('CREATE localStorage DATABASE IF NOT EXISTS ls' + test);
		localStorage.removeItem('ls' + test);
	});

	afterEach(function () {
		if (alasql.databases['ls' + test]) alasql('DETACH DATABASE ls' + test);
		alasql('DROP localStorage DATABASE IF EXISTS ls' + test);
		localStorage.clear();
	});

	it('A) CREATE IF NOT EXISTS restores the record so ATTACH works', function () {
		assert.strictEqual(alasql('CREATE localStorage DATABASE IF NOT EXISTS ls' + test), 0);
		assert.strictEqual(alasql('ATTACH localStorage DATABASE ls' + test), 1);
		assert.deepStrictEqual(alasql('SHOW TABLES FROM ls' + test), []);
	});

	it('B) ATTACH throws a clear error when the record is missing', function () {
		assert.throws(function () {
			alasql('ATTACH localStorage DATABASE ls' + test);
		}, /Cannot attach database "ls759" because there is no such database/);
		assert.strictEqual(alasql.databases['ls' + test], undefined);
	});

	it('C) ATTACH throws a clear error when the database was never created', function () {
		assert.throws(function () {
			alasql('ATTACH localStorage DATABASE nodb' + test);
		}, /Cannot attach database "nodb759" because there is no such database/);
		assert.strictEqual(alasql.databases['nodb' + test], undefined);
	});

	it('D) DROP removes a database whose record is missing', function () {
		assert.strictEqual(alasql('DROP localStorage DATABASE ls' + test), 1);
		var ids = alasql('SHOW localStorage DATABASES').map(function (d) {
			return d.databaseid;
		});
		assert.strictEqual(ids.indexOf('ls' + test), -1);
	});
});
