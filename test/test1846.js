if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var fs = require('fs');
}

let testId = '1846'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - REFERENCES in FILESTORAGE`, function () {
	const fsdbid = 'test' + testId + 'fs';
	const filename = 'test' + testId + '.db';

	function attach(done) {
		alasql('ATTACH FILESTORAGE DATABASE ' + fsdbid + '("' + filename + '")', function () {
			alasql('USE ' + fsdbid);
			done();
		});
	}

	function detach() {
		alasql('USE alasql');
		alasql('DETACH DATABASE ' + fsdbid);
	}

	before(function (done) {
		if (fs.existsSync(filename)) fs.unlinkSync(filename);
		alasql('CREATE FILESTORAGE DATABASE ' + fsdbid + '("' + filename + '")', function () {
			attach(done);
		});
	});

	after(function (done) {
		detach();
		alasql('DROP FILESTORAGE DATABASE ' + fsdbid, function () {
			done();
		});
	});

	it('A) Column REFERENCES to a table in the same session', function () {
		let res = [];
		res.push(
			alasql(`CREATE TABLE IF NOT EXISTS banks (
				name STRING PRIMARY KEY,
				is_open BOOLEAN DEFAULT true,
				[key] STRING
			)`)
		);
		res.push(
			alasql(`CREATE TABLE IF NOT EXISTS pigs (
				id STRING PRIMARY KEY,
				bank STRING REFERENCES banks(name),
				ready BOOLEAN
			)`)
		);
		// Creating a table must not remove the primary key of the other tables
		res.push(alasql.databases[fsdbid].tables.banks.pk.columns);
		res.push(alasql.databases[fsdbid].tables.pigs.xcolumns.bank.foreignkey);
		assert.deepStrictEqual(res, [1, 1, ['name'], {tableid: 'banks', columnid: 'name'}]);
	});

	it('B) Column REFERENCES to a table after the database is attached again', function (done) {
		detach();
		attach(function () {
			let res = [];
			res.push(
				alasql(`CREATE TABLE IF NOT EXISTS piglets (
					id STRING PRIMARY KEY,
					bank STRING REFERENCES banks(name)
				)`)
			);
			res.push(alasql.databases[fsdbid].tables.piglets.xcolumns.bank.foreignkey);
			assert.deepStrictEqual(res, [1, {tableid: 'banks', columnid: 'name'}]);
			done();
		});
	});
});

describe(`Test ${testId} - REFERENCES in memory`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('C) Column REFERENCES is still enforced', function () {
		let res = [];
		res.push(alasql('CREATE TABLE banks (name STRING PRIMARY KEY)'));
		res.push(alasql('CREATE TABLE pigs (id STRING, bank STRING REFERENCES banks(name))'));
		res.push(alasql("INSERT INTO banks VALUES ('Bank1')"));
		res.push(alasql("INSERT INTO pigs VALUES ('pig1', 'Bank1')"));
		assert.throws(
			() => alasql("INSERT INTO pigs VALUES ('pig2', 'NoBank')"),
			/Foreign key "NoBank" not found in table "banks"/
		);
		res.push(alasql('SELECT * FROM pigs'));
		assert.deepStrictEqual(res, [1, 1, 1, 1, [{id: 'pig1', bank: 'Bank1'}]]);
	});

	it('D) REFERENCES to another column name still checks the primary key, as before', function () {
		let res = [];
		res.push(alasql('CREATE TABLE owners (id INT PRIMARY KEY)'));
		res.push(alasql('INSERT INTO owners VALUES (1)'));
		res.push(alasql('CREATE TABLE cats (owner INT REFERENCES owners(Id))'));
		res.push(alasql('CREATE TABLE dogs (owner INT REFERENCES owners(owner_id))'));
		res.push(alasql('INSERT INTO cats VALUES (1)'));
		res.push(alasql('INSERT INTO dogs VALUES (1)'));
		assert.throws(() => alasql('INSERT INTO cats VALUES (2)'), /Foreign key "2" not found/);
		assert.deepStrictEqual(res, [1, 1, 1, 1, 1, 1]);
	});
});

describe(`Test ${testId} - FILESTORAGE with autocommit off`, function () {
	const fsdbid = 'test' + testId + 'nc';
	const filename = 'test' + testId + 'nc.db';
	let autocommit;

	function attach(done) {
		alasql('ATTACH FILESTORAGE DATABASE ' + fsdbid + '("' + filename + '")', function () {
			alasql('USE ' + fsdbid);
			done();
		});
	}

	before(function (done) {
		autocommit = alasql.options.autocommit;
		alasql.options.autocommit = false;
		if (fs.existsSync(filename)) fs.unlinkSync(filename);
		alasql('CREATE FILESTORAGE DATABASE ' + fsdbid + '("' + filename + '")', function () {
			attach(done);
		});
	});

	after(function (done) {
		alasql('USE alasql');
		alasql('DETACH DATABASE ' + fsdbid);
		alasql.options.autocommit = autocommit;
		alasql('DROP FILESTORAGE DATABASE ' + fsdbid, function () {
			done();
		});
	});

	it('E) INSERT and SELECT work, also after the database is attached again', function (done) {
		let res = [];
		res.push(alasql('CREATE TABLE banks (name STRING PRIMARY KEY)'));
		res.push(alasql('CREATE TABLE pigs (id STRING, bank STRING REFERENCES banks(name))'));
		res.push(alasql("INSERT INTO banks VALUES ('Bank1')"));
		res.push(alasql("INSERT INTO pigs VALUES ('pig1', 'Bank1')"));
		res.push(alasql('SELECT * FROM pigs'));
		res.push(alasql('COMMIT TRANSACTION'));
		assert.deepStrictEqual(res, [1, 1, 1, 1, [{id: 'pig1', bank: 'Bank1'}], 1]);
		alasql('USE alasql');
		alasql('DETACH DATABASE ' + fsdbid);
		attach(function () {
			assert.deepStrictEqual(alasql('SELECT * FROM pigs'), [{id: 'pig1', bank: 'Bank1'}]);
			done();
		});
	});
});
