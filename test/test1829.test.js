// @ts-ignore
import {describe, expect, test, beforeAll, afterAll, beforeEach, afterEach} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 1829 - WHERE (NOT) IN Regression when using refs', () => {
	beforeEach(() => {
		alasql(`CREATE TABLE test1829 (
			id varchar(50) NOT NULL,
			text varchar(10) NOT NULL,
			PRIMARY KEY (id)
		  )`);
	});

	afterEach(() => {
		alasql('DROP TABLE test1829');
	});

	test('1. Where IN with refs', done => {
		const rowId1 = 'id#1';
		const rowId2 = 'id#2';

		alasql('insert into test1829(id, text) values (?, ?)', [rowId1, 'first text']);
		alasql('insert into test1829(id, text) values (?, ?)', [rowId2, 'second text']);

		const selectedByIdRows = alasql(
			`select entity.id, entity.text from test1829 as entity where entity.id IN (?,?)`,
			[rowId1, rowId2]
		);
		expect(selectedByIdRows.length).toEqual(2);
		expect(selectedByIdRows[0].id).toEqual(rowId1);
		expect(selectedByIdRows[1].id).toEqual(rowId2);

		done();
	});

	test('2. Where NOT IN with refs', done => {
		const rowId1 = 'id#1';
		const rowId2 = 'id#2';

		alasql('insert into test1829(id, text) values (?, ?)', [rowId1, 'first text']);
		alasql('insert into test1829(id, text) values (?, ?)', [rowId2, 'second text']);

		const selectedByIdRows = alasql(
			`select entity.id, entity.text from test1829 as entity where entity.id NOT IN (?)`,
			[rowId1]
		);
		expect(selectedByIdRows.length).toEqual(1);
		expect(selectedByIdRows[0].id).toEqual(rowId2);
		done();
	});
});
