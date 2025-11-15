// @ts-ignore
import {describe, test, expect} from 'bun:test';
import alasql from '..';

alasql.options.errorlog = true;
describe('Test 2155 - ROUND should return undefined for null input', () => {
	test('ROUND(null) should return undefined per AlaSQL NULL definition', done => {
		var res = alasql('SELECT ROUND(null) as r FROM ?', [[{id: 1}]]);

		expect(res[0].r).toBe(undefined, 'ROUND(null) should return undefined');
		done();
	});

	test('ROUND("123.4") should return 123', done => {
		var res = alasql('SELECT ROUND(?) as r', ['123.4']);

		expect(res[0].r).toBe(123, 'ROUND("123.4") should round to 123');
		done();
	});

	test('ROUND("abc") should return undefined', done => {
		var res = alasql('SELECT ROUND(?) as r', ['abc']);

		expect(res[0].r).toBe(undefined, 'ROUND("abc") should return undefined for non-numeric');
		done();
	});

	test('ROUND("") should return undefined', done => {
		var res = alasql('SELECT ROUND(?) as r', ['']);

		expect(res[0].r).toBe(undefined, 'ROUND("") should return undefined for empty string');
		done();
	});

	test('ROUND("0") should return 0', done => {
		var res = alasql('SELECT ROUND(?) as r', ['0']);

		expect(res[0].r).toBe(0, 'ROUND("0") should return 0');
		done();
	});

	test('ROUND("null") should return undefined', done => {
		var res = alasql('SELECT ROUND(?) as r', ['null']);

		expect(res[0].r).toBe(undefined, 'ROUND("null") should return undefined for string "null"');
		done();
	});

	test('ROUND("  ") should return undefined', done => {
		var res = alasql('SELECT ROUND(?) as r', ['  ']);

		expect(res[0].r).toBe(undefined, 'ROUND("  ") should return undefined for whitespace');
		done();
	});

	test('ROUND("00") should return 0', done => {
		var res = alasql('SELECT ROUND(?) as r', ['00']);

		expect(res[0].r).toBe(0, 'ROUND("00") should return 0 for variant zero');
		done();
	});

	test('ROUND("0.0") should return 0', done => {
		var res = alasql('SELECT ROUND(?) as r', ['0.0']);

		expect(res[0].r).toBe(0, 'ROUND("0.0") should return 0 for decimal zero');
		done();
	});

	test('ROUND("0 ") should return 0', done => {
		var res = alasql('SELECT ROUND(?) as r', ['0 ']);

		expect(res[0].r).toBe(0, 'ROUND("0 ") should return 0 for spaced zero');
		done();
	});

	test('SUM(ROUND(null)) should return undefined when all values are null', done => {
		var data = [{a: null}, {a: null}];

		var res = alasql('SELECT SUM(ROUND(a)) as sum_a FROM ?', [data]);

		expect(res[0].sum_a).toBe(undefined, 'SUM of all ROUND(null) should be undefined');
		done();
	});

	test('ROUND with mix of null and numbers', done => {
		var data = [{a: null}, {a: 5.7}, {a: null}, {a: 3.2}];

		var res = alasql('SELECT SUM(ROUND(a)) as sum_a FROM ?', [data]);

		expect(res[0].sum_a).toBe(9, 'SUM(ROUND(a)) should sum only non-null values');
		done();
	});

	test('ROUND(string) should return undefined', done => {
		var res = alasql('SELECT ROUND(?) as r', ['XYZ']);

		expect(res[0].r).toBe(undefined, 'ROUND of non-numeric string should return undefined');
		done();
	});

	test('SUM(ROUND(string)) should return undefined when all values are strings', done => {
		var data = [{e: 'XYZ1'}, {e: 'XYZ2'}];

		var res = alasql('SELECT SUM(ROUND(e)) as sum_e FROM ?', [data]);

		expect(res[0].sum_e).toBe(undefined, 'SUM of all ROUND(string) should be undefined');
		done();
	});
});
