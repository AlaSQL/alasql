// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 818 IS condition check on premitives', () => {
	test('should return true on true == true', done => {
		expect(alasql('SELECT TRUE IS TRUE')).toEqual([{'TRUE IS TRUE': true}]);
		done();
	});
	test('should return true on false == false', done => {
		expect(alasql('SELECT FALSE IS FALSE')).toEqual([
			{
				'FALSE IS FALSE': true,
			},
		]);
		done();
	});

	test("shouldn't return true on true === false", done => {
		expect(alasql('SELECT FALSE IS TRUE')).toEqual([
			{
				'FALSE IS TRUE': false,
			},
		]);
		done();
	});

	test('should return true on 0 != true', done => {
		expect(alasql('SELECT 0 IS NOT TRUE')).toEqual([
			{
				'0 IS NOT(TRUE)': true,
			},
		]);
		done();
	});

	test('should return true on 1 == TRUE', done => {
		expect(alasql('SELECT 1 IS TRUE')).toEqual([
			{
				'1 IS TRUE': true,
			},
		]);
		done();
	});

	test('should return false true', done => {
		expect(alasql('SELECT TRUE IS NOT TRUE, TRUE IS NOT FALSE')).toEqual([
			{
				'TRUE IS NOT(TRUE)': false,
				'TRUE IS NOT(FALSE)': true,
			},
		]);
		done();
	});

	// except 0 every other number should be treated as TRUE
	test('should return true false false', done => {
		expect(alasql('SELECT 0 IS NOT TRUE, -1 IS NOT TRUE, 1 IS NOT TRUE')).toEqual([
			{
				'0 IS NOT(TRUE)': true,
				'-1 IS NOT(TRUE)': false,
				'1 IS NOT(TRUE)': false,
			},
		]);
		done();
	});
});
