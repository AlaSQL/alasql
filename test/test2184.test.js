import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 2184 CREATE INDEX with qualified table name', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test403');
		done();
	});

	test('2. Create table and index before insert with qualified name (no USE)', function (done) {
		alasql('CREATE TABLE test403.one (a INT)');
		alasql('CREATE INDEX xone ON test403.one (a)');
		alasql('INSERT INTO test403.one (a) VALUES (100), (200), (300)');
		done();
	});

	test('3. Create table and index after insert with qualified name (no USE)', function (done) {
		alasql('CREATE TABLE test403.two (a INT)');
		alasql('INSERT INTO test403.two (a) VALUES (100), (200), (300)');
		alasql('CREATE INDEX xtwo ON test403.two (a)');
		done();
	});

	test('4. Create unique index with qualified name (before insert)', function (done) {
		alasql('CREATE TABLE test403.three (a INT)');
		alasql('CREATE UNIQUE INDEX xthree ON test403.three (a)');
		alasql('INSERT INTO test403.three (a) VALUES (100), (200), (300)');
		done();
	});

	test('5. REINDEX from test403 database', function (done) {
		alasql('USE test403');
		var res = alasql('REINDEX xone');
		expect(res == 1);
		var res = alasql('REINDEX xtwo');
		expect(res == 1);
		done();
	});

	test('5. REINDEX from test403 database', function (done) {
		alasql('USE test403');
		var res = alasql('REINDEX test403.xone');
		expect(res == 1);
		var res = alasql('REINDEX test403.xtwo');
		expect(res == 1);
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test403');
		done();
	});
});
