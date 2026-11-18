if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage(null, {strict: false});
}

describe('Test 3070 - CREATE LOCALSTORAGE DATABASE must not overwrite an existing database when the index record is missing', function () {
	var lsdbid = 'test' + 3070;
	var prevAutocommit;

	before(function () {
		prevAutocommit = alasql.options.autocommit;
	});

	after(function () {
		alasql.options.autocommit = prevAutocommit;
	});

	beforeEach(function () {
		// CREATE TABLE / INSERT must reach localStorage right away, whatever
		// an earlier test file left autocommit as
		alasql.options.autocommit = true;
		localStorage.clear();
		alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS ' + lsdbid);
		alasql('ATTACH LOCALSTORAGE DATABASE ' + lsdbid);
		alasql('CREATE TABLE ' + lsdbid + '.t1 (a INT)');
		alasql('INSERT INTO ' + lsdbid + '.t1 VALUES (1),(2)');
		alasql('DETACH DATABASE ' + lsdbid);
		// Only the index record is gone; the database record and its rows stay
		localStorage.removeItem('alasql');
	});

	afterEach(function () {
		try {
			alasql('USE alasql');
			alasql('DETACH DATABASE ' + lsdbid);
		} catch (e) {
			// Database might not be attached
		}
		localStorage.clear();
	});

	function indexHasDatabase() {
		var ls = JSON.parse(localStorage.getItem('alasql'));
		return !!(ls && ls.databases && ls.databases[lsdbid]);
	}

	it('1. CREATE IF NOT EXISTS is a no-op and repairs the index record', function (done) {
		assert.strictEqual(alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS ' + lsdbid), 0);
		assert.ok(indexHasDatabase(), 'index record should list the database again');
		// The database record must not have been overwritten with an empty one
		assert.deepStrictEqual(JSON.parse(localStorage.getItem(lsdbid)).tables, {t1: true});
		alasql('ATTACH LOCALSTORAGE DATABASE ' + lsdbid);
		var res = alasql('SELECT * FROM ' + lsdbid + '.t1');
		assert.deepStrictEqual(res, [{a: 1}, {a: 2}]);
		done();
	});

	it('2. CREATE without IF NOT EXISTS throws and repairs the index record', function (done) {
		assert.throws(function () {
			alasql('CREATE LOCALSTORAGE DATABASE ' + lsdbid);
		}, /already exists/);
		assert.ok(indexHasDatabase(), 'index record should list the database again');
		// The database record must not have been overwritten with an empty one
		assert.deepStrictEqual(JSON.parse(localStorage.getItem(lsdbid)).tables, {t1: true});
		alasql('ATTACH LOCALSTORAGE DATABASE ' + lsdbid);
		var res = alasql('SELECT * FROM ' + lsdbid + '.t1');
		assert.deepStrictEqual(res, [{a: 1}, {a: 2}]);
		done();
	});

	it('3. A key of another app with the same name is not taken as a database', function () {
		// Only a record with the shape of a database counts, not any JSON value
		var appkey = 'settings' + 3070;
		localStorage.setItem(appkey, JSON.stringify({theme: 'dark'}));
		assert.strictEqual(alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS ' + appkey), 1);
		alasql('ATTACH LOCALSTORAGE DATABASE ' + appkey);
		alasql('CREATE TABLE ' + appkey + '.t (a INT)');
		alasql('INSERT INTO ' + appkey + '.t VALUES (1)');
		assert.deepStrictEqual(alasql('SELECT * FROM ' + appkey + '.t'), [{a: 1}]);
		alasql('DETACH DATABASE ' + appkey);
	});
});
