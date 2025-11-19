// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 59 - Other operators', () => {
	test('CREATE DATABASE', done => {
		alasql('CREATE DATABASE mybase');
		expect(alasql.databases.mybase instanceof alasql.Database).toBe(true);
		done();
	});

	test('USE DATABASE', done => {
		alasql('USE DATABASE mybase');
		expect(alasql.useid).toEqual('mybase');
		done();
	});

	test('DROP current DATABASE', done => {
		alasql('DROP DATABASE mybase');
		expect(!alasql.databases.mybase).toBe(true);
		expect(alasql.useid == 'alasql').toBe(true);
		done();
	});
	test('DROP non-current DATABASE', done => {
		alasql('CREATE DATABASE mybase');
		alasql('USE DATABASE mybase');
		expect(alasql.useid == 'mybase').toBe(true);
		alasql('USE DATABASE alasql');
		alasql('DROP DATABASE mybase');
		expect(!alasql.databases.mybase).toBe(true);
		expect(alasql.useid == 'alasql').toBe(true);
		done();
	});

	test('CREATE DATABASE if exists', done => {
		alasql('CREATE DATABASE mybase');
		expect(() => {
			alasql('CREATE DATABASE mybase');
		}).toThrow(Error);
		done();
	});

	test('DROP DATABASE if not exists', done => {
		alasql('DROP DATABASE mybase');
		expect(() => {
			alasql('DROP DATABASE mybase');
		}).toThrow(Error);
		done();
	});
});
