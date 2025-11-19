// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 62 - ALTER TABLE', () => {
	test('Create new table', done => {
		alasql('create database test62');
		alasql('use test62');
		alasql('CREATE TABLE test (a INT AUTO_INCREMENT, b INT)');
		alasql('insert into test (b) values (10),(20),(30)');
		done();
	});

	test('ADD COLUMN', done => {
		alasql('alter table test add column name string');
		alasql('insert into test (b,name) values (40,"Kosovo"),(50,"Belgrad"),(60,"Prague")');
		var res = alasql('select * from test');
		done();
	});

	test('MODIFY COLUMN', done => {
		alasql('alter table test modify column name int');
		var res = alasql('select * from test');
		done();
	});

	test('DROP COLUMN', done => {
		alasql('alter table test drop column b');
		var res = alasql('select * from test');
		alasql('drop database test62');
		done();
	});
});
