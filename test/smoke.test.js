import {describe, expect, test} from 'bun:test';

// Initially test against dist (the legacy build)
// Later we'll switch to src/alasql.js
import alasql from '../dist/alasql.fs.js';

describe('Smoke test', () => {
	test('SELECT literal', () => {
		const res = alasql('SELECT 1 as a');
		expect(res).toStrictEqual([{a: 1}]);
	});

	test('SELECT from array', () => {
		const data = [{x: 1}, {x: 2}];
		const res = alasql('SELECT * FROM ?', [data]);
		expect(res).toStrictEqual(data);
	});
});
