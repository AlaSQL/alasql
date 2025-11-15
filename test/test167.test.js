// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import DOMStorage from 'dom-storage';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

global.localStorage = new DOMStorage('./test167.json', {
	strict: false,
	ws: '',
});

if (typeof window === 'object' && false) {
	describe('Test 167 - database in database', () => {
		test('1. Temporary tables', done => {
			var res = alasql('insert into #city values {city:"Oslo"}, {city:"Helsinki"}');
			expect(alasql.temp.city).toEqual([{city: 'Oslo'}, {city: 'Helsinki'}]);

			var res = alasql('select * from #city where city like "Os%"');
			expect(res).toEqual([{city: 'Oslo'}]);

			var res = alasql('select * into #sweden_capital from #city where city like "Os%"');
			expect(res).toEqual(1);
			expect(alasql.templ.sweden_capital).toEqual([{city: 'Oslo'}]);

			// TODO - finish the test
			done();
		});
	});
}
