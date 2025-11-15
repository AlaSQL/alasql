// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 119 - PRIMARY KEY, CREATE INDEX UNIQUE', () => {
	test('PRIMARY KEY', done => {
		alasql('create database test119');
		alasql('use test119');

		alasql('create table one (a int primary key)');
		alasql('insert into one values (1), (2), (3)');

		expect(() => {
			alasql('insert into one values (1)');
		}).toThrow(Error);

		var res = alasql('select value count(*) from one');
		expect(res).toEqual(3);

		done();
	});

	if (false) {
		test('UNIQUE INDEX-1 before insert', done => {
			alasql('create table two (a int)');
			alasql('create unique index twoa on two(a)');
			alasql('insert into two values (1), (2), (3)');

			expect(() => {
				alasql('insert into two values (1)');
			}).toThrow(Error);

			var res = alasql('select value count(*) from two');
			expect(res).toEqual(3);

			done();
		});
	}

	test('UNIQUE INDEX-2 after insert', done => {
		alasql('create table three (a int)');
		alasql('insert into three values (1), (2), (3), (1)');
		expect(() => {
			alasql('create unique index threea on three(a)');
		}).toThrow(Error);

		var res = alasql('select value count(*) from three');
		expect(res).toEqual(4);

		done();
	});

	test('UNIQUE INDEX-3 two unique indices and primary key', done => {
		alasql('create table four (a int PRIMARY KEY, b int)');
		alasql('create unique index foura on four(a)');
		alasql('insert into four values (1,10), (2,20)');

		expect(() => {
			alasql('insert into four values (1,10)');
		}).toThrow(Error);

		var res = alasql('select value count(*) from three');
		expect(res).toEqual(4);

		done();
	});

	test('Clear database', done => {
		alasql('drop database test119');
		done();
	});
});
