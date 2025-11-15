// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('CREATE TABLE', () => {
	test('Create table with same name twice', done => {
		var db = new alasql.Database();
		db.exec('CREATE TABLE test (a int, b int)');
		expect(() => {
			db.exec('CREATE TABLE test (a int, c int)');
		}).toThrow(Error);
		done();
	});
});

describe('CREATE TABLE IF EXISTS', () => {
	test('Try to create table if it already exists', done => {
		var db = new alasql.Database();
		db.exec('CREATE TABLE test (a int, b int)');
		db.exec('CREATE TABLE IF NOT EXISTS test (c int)');
		expect('a').toEqual(db.tables.test.columns[0].columnid);
		done();
	});

	test('Create table if it does not exist', done => {
		var db = new alasql.Database();
		db.exec('CREATE TABLE IF NOT EXISTS test (a int, c int)');
		expect(true).toEqual(!!db.tables.test);
		done();
	});
});
