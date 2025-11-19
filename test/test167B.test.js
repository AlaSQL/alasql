// @ts-ignore
import {describe, expect, test} from 'bun:test';
import alasql from '..';

describe('Test 167B - SEARCH DISTINCT and SELECT DISTINCT functions', function () {
	test('1. Basic DISTINCT comparison', () => {
		var data = [{a: 1}, {a: 2}, {a: 1}];

		var res1 = alasql('SELECT * FROM ?', [data]);
		var res2 = alasql('SELECT DISTINCT * FROM ?', [data]);
		var res3 = alasql('SELECT COLUMN DISTINCT _ FROM ?', [data]);
		var res4 = alasql('SEARCH DISTINCT(/) FROM ?', [data]);

		// res1 should have all 3 items
		expect(res1.length).toBe(3);

		// res2, res3, res4 should all have 2 distinct items
		expect(res2.length).toBe(2);
		expect(res3.length).toBe(2);
		expect(res4.length).toBe(2);
	});

	test('2. DISTINCT with different middle value (issue b)', () => {
		var data = [{a: 1}, {b: 2}, {a: 1}];

		var res3 = alasql('SELECT COLUMN DISTINCT _ FROM ?', [data]);
		var res4 = alasql('SEARCH DISTINCT(/) FROM ?', [data]);

		// Should return 2 distinct objects: {a:1} and {b:2}
		expect(res3.length).toBe(2);
		expect(res4.length).toBe(2);

		// Check that we have both distinct objects
		var hasA1 = res3.some(function (item) {
			return item.a === 1 && !item.b;
		});
		var hasB2 = res3.some(function (item) {
			return item.b === 2 && !item.a;
		});

		expect(hasA1).toBe(true);
		expect(hasB2).toBe(true);
	});

	test('3. SEARCH DISTINCT vs SELECT DISTINCT consistency', () => {
		var data = [{a: 1}, {b: 2}, {a: 1}];

		var res2 = alasql('SELECT DISTINCT * FROM ?', [data]);
		var res4 = alasql('SEARCH DISTINCT(/) FROM ?', [data]);

		// Results should be the same
		expect(res2).toEqual(res4);
	});

	test('4. SELECT COLUMN DISTINCT _ with arrays', () => {
		var data = [1, 2, 1, 3, 2];

		var res = alasql('SELECT COLUMN DISTINCT _ FROM ?', [data]);

		// Should return distinct values: [1, 2, 3]
		expect(res.length).toBe(3);
		expect(res).toContain(1);
		expect(res).toContain(2);
		expect(res).toContain(3);
	});
});
