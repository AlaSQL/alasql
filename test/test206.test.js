// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 206 IF and BEGIN END', () => {
	test('1. IF BEGIN END', done => {
		var res = alasql('IF TRUE BEGIN SELECT VALUE 1; SELECT VALUE 2 END; SELECT VALUE 3');
		//        console.log(res);
		expect(res).toEqual([[1, 2], 3]);
		done();
	});

	test('2. IF FALSE BEGIN END', done => {
		var res = alasql('IF FALSE BEGIN SELECT VALUE 1; SELECT VALUE 2 END; SELECT VALUE 3');
		//        console.log(res);
		expect(res).toEqual([undefined, 3]);
		done();
	});

	test('3. IF TRUE THEN ELSE ', done => {
		var res = alasql('IF TRUE SELECT VALUE 1 ELSE SELECT VALUE 2');
		//        console.log(res);
		//        expect(res).toEqual([ undefined, 3 ]);
		expect(res == 1).toBe(true);
		done();
	});
	test('4. IF FALSE THEN ELSE ', done => {
		var res = alasql('IF FALSE SELECT VALUE 1 ELSE SELECT VALUE 2');
		//        console.log(res);
		//        expect(res).toEqual([ undefined, 3 ]);
		expect(res == 2).toBe(true);
		done();
	});

	test('5. Nested IFs ', done => {
		var res = alasql(
			'IF TRUE IF TRUE SELECT VALUE 1 \
            ELSE SELECT VALUE 2 ELSE SELECT VALUE 3'
		);
		//        console.log(res);
		//        expect(res).toEqual([ undefined, 3 ]);
		expect(res == 1).toBe(true);
		done();
	});

	test('6. Nested IFs ', done => {
		var res = alasql(
			'IF FALSE IF TRUE SELECT VALUE 1 \
            ELSE SELECT VALUE 2 \
            ELSE SELECT VALUE 3'
		);
		//        console.log(res);
		//        expect(res).toEqual([ undefined, 3 ]);
		expect(res == 3).toBe(true);
		done();
	});

	test('7. Nested IFs ', done => {
		var res = alasql(
			'IF TRUE \
            IF FALSE SELECT VALUE 1 \
            ELSE SELECT VALUE 2 \
            ELSE SELECT VALUE 3'
		);
		//        console.log(res);
		//        expect(res).toEqual([ undefined, 3 ]);
		expect(res == 2).toBe(true);
		done();
	});
});
