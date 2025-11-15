// @ts-ignore
import {describe, expect, test, beforeAll, afterAll, beforeEach} from 'bun:test';
import alasql from '..';
import fs from 'fs';
import path from 'path';

describe('Test 1400 - CSV', () => {
	var filecontents;

	beforeEach(() => {
		filecontents = fs.readFileSync(path.resolve('test/test1400a.csv'), 'utf8');
	});

	describe('with headers', () => {
		test('should be able to load up raw values if option is passed', () => {
			const res = alasql('SELECT * FROM CSV(?, {headers:true, raw:true})', [filecontents]);
			expect(res).toEqual([
				{
					'Payment Method': 'Method 3',
					'Account Number': '07312512451',
					'Account Name': 'Account 3',
					'Corporate Account': 'False',
				},
				{
					'Payment Method': 'Method 4',
					'Account Number': '08831502151',
					'Account Name': 'Account 4',
					'Corporate Account': 'True',
				},
				{
					'Payment Method': 'Method 1',
					'Account Number': '51235123124',
					'Account Name': 'Account 1',
					'Corporate Account': 'True',
				},
				{
					'Payment Method': 'Method 2',
					'Account Number': '88311052124',
					'Account Name': 'Account 2',
					'Corporate Account': 'False',
				},
			]);
		});

		test('should be able to load up values and numerical values would be parsed', () => {
			const res2 = alasql('SELECT * FROM CSV(?, {headers:true})', [filecontents]);
			expect(res2).toEqual([
				{
					'Payment Method': 'Method 3',
					'Account Number': 7312512451,
					'Account Name': 'Account 3',
					'Corporate Account': 'False',
				},
				{
					'Payment Method': 'Method 4',
					'Account Number': 8831502151,
					'Account Name': 'Account 4',
					'Corporate Account': 'True',
				},
				{
					'Payment Method': 'Method 1',
					'Account Number': 51235123124,
					'Account Name': 'Account 1',
					'Corporate Account': 'True',
				},
				{
					'Payment Method': 'Method 2',
					'Account Number': 88311052124,
					'Account Name': 'Account 2',
					'Corporate Account': 'False',
				},
			]);
		});
	});

	describe('without headers', () => {
		var filecontents;
		beforeEach(() => {
			filecontents = fs.readFileSync(path.resolve('test/test1400b.csv'), 'utf8');
		});

		test('should be able to load up raw values without header', () => {
			const res = alasql('SELECT * FROM CSV(?, {headers:false, raw:true})', [filecontents]);
			expect(res).toEqual([
				{
					0: 'Method 3',
					1: '07312512451',
					2: 'Account 3',
					3: 'False',
				},
				{
					0: 'Method 4',
					1: '08831502151',
					2: 'Account 4',
					3: 'True',
				},
				{
					0: 'Method 1',
					1: '51235123124',
					2: 'Account 1',
					3: 'True',
				},
				{
					0: 'Method 2',
					1: '88311052124',
					2: 'Account 2',
					3: 'False',
				},
			]);
		});

		test('should be able to load up values without header and numerical values will be parsed', () => {
			const res2 = alasql('SELECT * FROM CSV(?, {headers:false})', [filecontents]);

			expect(res2).toEqual([
				{
					0: 'Method 3',
					1: 7312512451,
					2: 'Account 3',
					3: 'False',
				},
				{
					0: 'Method 4',
					1: 8831502151,
					2: 'Account 4',
					3: 'True',
				},
				{
					0: 'Method 1',
					1: 51235123124,
					2: 'Account 1',
					3: 'True',
				},
				{
					0: 'Method 2',
					1: 88311052124,
					2: 'Account 2',
					3: 'False',
				},
			]);
		});
	});
});
