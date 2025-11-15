// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 61 - Increment', () => {
	test('AUTO_INCREMENT', done => {
		alasql('DROP TABLE IF EXISTS test');
		alasql('CREATE TABLE test (a INT AUTO_INCREMENT, b INT)');
		alasql('insert into test (b) values (10),(20),(30)');
		var res = alasql('select * from test');
		done();
	});

	test('IDENTITY', done => {
		alasql('DROP TABLE IF EXISTS test');
		alasql('CREATE TABLE test (a INT IDENTITY(1,1), b INT)');
		alasql('insert into test (b) values (10),(20),(30)');
		var res = alasql('select * from test');
		done();
	});
});
