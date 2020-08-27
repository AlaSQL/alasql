if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage(__dirname + '/test604.json', {strict: false, ws: ''});
}

describe.skip('Test 604 - CREATE VIEW error with localStorage engine #604', function () {
	after(function () {
		localStorage.clear();
	});

	it('* Create database', function (done) {
		this.timeout(5000);
		alasql('SET AUTOCOMMIT OFF');
		assert(!alasql.options.autocommit);
		alasql
			.promise('DROP localStorage DATABASE IF EXISTS db604ls')
			.then(function (res) {
				assert(!localStorage['db604ls']);
				assert(!localStorage['db604ls.one']);
				return alasql.promise('CREATE localStorage DATABASE IF NOT EXISTS db604ls');
			})
			.then(function (res) {
				assert(localStorage['db604ls']);
				done();
			})
			.catch(function (err) {
				setTimeout(function () {
					throw err;
				});
			});
	});

	it('* Show databases', function (done) {
		var res = alasql('SHOW localStorage DATABASES', function (res) {
			var found = false;
			res.forEach(function (d) {
				found = found || d.databaseid == 'db604ls';
			});
			assert(found);
			done();
		});
	});

	it('* Attach localStorage database', function (done) {
		alasql('ATTACH LOCALSTORAGE DATABASE db604ls AS db604', function () {
			assert(alasql.databases.db604);
			assert(alasql.databases.db604.engineid == 'LOCALSTORAGE');
			done();
		});
	});

	it('* Create table', function (done) {
		alasql('CREATE TABLE db604.t1 (a int, b string)', function (res) {
			assert(localStorage['db604ls.t1']);
			assert(JSON.parse(localStorage['db604ls']).tables.t1);
			done();
		});
	});

	it('* Insert values into table', function (done) {
		alasql
			.promise('insert into db604.t1 VALUES (1,"Moscow"), (2, "Kyiv"), (3,"Minsk")')
			.then(function (rows) {
				assert.deepEqual(alasql.databases.db604.tables.t1.data, [
					{a: 1, b: 'Moscow'},
					{a: 2, b: 'Kyiv'},
					{a: 3, b: 'Minsk'},
				]);
				done();
			});
	});

	it('* Select from table', function () {
		var res = alasql('SELECT * FROM db604.t1');
		assert(res.length == 3);
	});

	it('* Create view', function (done) {
		alasql('CREATE VIEW db604.v1 AS SELECT a,b FROM db604.t1', function (res) {
			assert(localStorage['db604ls.v1']);
			assert(JSON.parse(localStorage['db604ls']).tables.v1);
			done();
		});
	});

	it('* Select from view', function () {
		var res = alasql('SELECT * FROM db604.v1');
		assert(res.length == 3);
	});

	it.skip('* Detach database', function () {
		alasql('DETACH DATABASE db604');
		assert(!alasql.databases.db604);
	});

	it.skip('* Reattach database', function () {
		alasql('ATTACH LOCALSTORAGE DATABASE db604ls AS db604');
		assert(alasql.databases.db604);
		assert(alasql.databases.db604.engineid == 'LOCALSTORAGE');
	});

	it.skip('* Reselect from table', function () {
		var res = alasql('SELECT * FROM db604.t1');
		assert(res.length == 3);
	});

	it.skip('* Reselect from view', function (done) {
		alasql.promise('SELECT * FROM db604.v1').then(function (res) {
			assert(res.length == 3);
			done();
		});
	});

	it('* Drop table', function () {
		var res = alasql('DROP TABLE db604.t1');
		assert(!localStorage['db604.t1']);
	});

	it('* Drop view', function () {
		var res = alasql('DROP VIEW db604.v1');
		assert(!localStorage['db604.v1']);
	});

	it('* Detachch database', function () {
		alasql('DETACH DATABASE db604');
		assert(!alasql.databases.db604);
	});

	it('* Drop database', function () {
		alasql('DROP LOCALSTORAGE DATABASE db604ls');
		assert(!localStorage['db605ls']);
	});
});
