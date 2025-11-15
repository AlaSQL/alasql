// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 626 join on CSV file', () => {
	var testId = 626;

	beforeAll(() => {
		alasql('CREATE DATABASE test' + testId + ';USE test' + testId);
	});

	afterAll(() => {
		alasql('DROP DATABASE test' + testId);
	});

	test('1. can select with a join on a CSV file', done => {
		alasql(
			'SELECT EN.n, EN.en, FR.fr from ? EN LEFT JOIN CSV("' +
				__dirname +
				'/test626.csv") FR on EN.n = FR.n',
			[
				[
					{n: 1, en: 'one'},
					{n: 2, en: 'two'},
				],
			],
			function (res) {
				expect(res).toEqual([
					{n: 1, en: 'one', fr: 'un'},
					{n: 2, en: 'two', fr: 'deux'},
				]);
				done();
			}
		);
	});
});
