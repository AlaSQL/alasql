// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 206 IF and BEGIN END', function () {
	test('1. IF BEGIN END', function (done) {
		var res = alasql('IF TRUE BEGIN SELECT VALUE 1; SELECT VALUE 2 END; SELECT VALUE 3');
		//        console.log(res);
		assert.deepEqual(res, [[1, 2], 3]);
		done();
	});

	test('2. IF FALSE BEGIN END', function (done) {
		var res = alasql('IF FALSE BEGIN SELECT VALUE 1; SELECT VALUE 2 END; SELECT VALUE 3');
		//        console.log(res);
		assert.deepEqual(res, [undefined, 3]);
		done();
	});

	test('3. IF TRUE THEN ELSE ', function (done) {
		var res = alasql('IF TRUE SELECT VALUE 1 ELSE SELECT VALUE 2');
		//        console.log(res);
		//        assert.deepEqual(res,[ undefined, 3 ]);
		assert(res == 1);
		done();
	});
	test('4. IF FALSE THEN ELSE ', function (done) {
		var res = alasql('IF FALSE SELECT VALUE 1 ELSE SELECT VALUE 2');
		//        console.log(res);
		//        assert.deepEqual(res,[ undefined, 3 ]);
		assert(res == 2);
		done();
	});

	test('5. Nested IFs ', function (done) {
		var res = alasql(
			'IF TRUE IF TRUE SELECT VALUE 1 \
            ELSE SELECT VALUE 2 ELSE SELECT VALUE 3'
		);
		//        console.log(res);
		//        assert.deepEqual(res,[ undefined, 3 ]);
		assert(res == 1);
		done();
	});

	test('6. Nested IFs ', function (done) {
		var res = alasql(
			'IF FALSE IF TRUE SELECT VALUE 1 \
            ELSE SELECT VALUE 2 \
            ELSE SELECT VALUE 3'
		);
		//        console.log(res);
		//        assert.deepEqual(res,[ undefined, 3 ]);
		assert(res == 3);
		done();
	});

	test('7. Nested IFs ', function (done) {
		var res = alasql(
			'IF TRUE \
            IF FALSE SELECT VALUE 1 \
            ELSE SELECT VALUE 2 \
            ELSE SELECT VALUE 3'
		);
		//        console.log(res);
		//        assert.deepEqual(res,[ undefined, 3 ]);
		assert(res == 2);
		done();
	});
});
