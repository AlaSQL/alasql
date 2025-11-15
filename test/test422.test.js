// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
  Test for issue #379
*/

var testNum = 422;

describe('Test ' + testNum + ' Test for JOINSTAR', () => {
	beforeAll(() => {
		alasql('CREATE DATABASE test' + testNum + ';USE test' + testNum);
	});

	afterAll(() => {
		alasql('DROP DATABASE test' + testNum);
	});

	test('1. Create tables', done => {
		var ast = alasql.parse('SELECT * FROM table1 WHERE a = b AND a->fn(b->c) > 0');
		//console.log(JSON.stringify(ast.statements[0].where));
		done();
	});
});
