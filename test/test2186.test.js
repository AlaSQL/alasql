// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 2186 - Qualified Names in ON Clause', () => {
	beforeAll(() => {
		alasql('CREATE DATABASE test2186');
		alasql('CREATE TABLE test2186.A_2186 (id INT, val STRING)');
		alasql('CREATE TABLE test2186.B_2186 (id INT, val STRING)');
		alasql('INSERT INTO test2186.A_2186 VALUES (1, "A"), (2, "B")');
		alasql('INSERT INTO test2186.B_2186 VALUES (1, "X"), (2, "Y")');
	});

	afterAll(() => {
		alasql('DROP DATABASE test2186');
	});

	test('1. Qualified names WITHOUT USE', () => {
		// Ensure we are not in test2186 DB
		alasql('USE alasql');
		const res = alasql(`
            SELECT test2186.A_2186.val AS v1, test2186.B_2186.val AS v2 
            FROM test2186.A_2186 
            JOIN test2186.B_2186 
            ON test2186.A_2186.id = test2186.B_2186.id
        `);
		expect(res).toEqual([
			{v1: 'A', v2: 'X'},
			{v1: 'B', v2: 'Y'},
		]);
	});

	test('2. Unqualified names WITH USE', () => {
		alasql('USE test2186');
		const res = alasql(`
            SELECT A_2186.val AS v1, B_2186.val AS v2 
            FROM A_2186 
            JOIN B_2186 
            ON A_2186.id = B_2186.id
        `);
		expect(res).toEqual([
			{v1: 'A', v2: 'X'},
			{v1: 'B', v2: 'Y'},
		]);
	});

	test('3. Aliased tables with qualified FROM', () => {
		alasql('USE alasql');
		const res = alasql(`
            SELECT t1.val AS v1, t2.val AS v2 
            FROM test2186.A_2186 AS t1 
            JOIN test2186.B_2186 AS t2 
            ON t1.id = t2.id
        `);
		expect(res).toEqual([
			{v1: 'A', v2: 'X'},
			{v1: 'B', v2: 'Y'},
		]);
	});

	test('4. Qualified names in ON clause (Explicit check)', () => {
		alasql('USE alasql');
		const res = alasql(`
            SELECT test2186.A_2186.val AS v1 
            FROM test2186.A_2186 
            JOIN test2186.B_2186 
            ON test2186.A_2186.id = test2186.B_2186.id
         `);
		expect(res).toEqual([{v1: 'A'}, {v1: 'B'}]);
	});
});
