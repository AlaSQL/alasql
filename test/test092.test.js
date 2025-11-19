// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 92 - Std Functions (STD, etc.)', () => {
	test('1. STD()', done => {
		var data = [1, 2, 3];
		var res = alasql('SELECT VALUE STD(_) FROM ?', [data]);
		expect(res > 0.816496580927725 && res < 0.816496580927727).toBe(true);
		done();
	});

	test('2. STD(DISTINCT) and STD(ALL)', done => {
		var data = [1, 2, 3, 1];
		var res = alasql('SELECT VALUE STD(_) FROM ?', [data]);
		expect(res > 0.8291561975888 && res < 0.8291561975889).toBe(true);
		var res = alasql('SELECT VALUE STD(ALL _) FROM ?', [data]);
		expect(res > 0.8291561975888 && res < 0.8291561975889).toBe(true);

		var res = alasql('SELECT VALUE STD(DISTINCT _) FROM ?', [data]);
		expect(res > 0.816496580927725 && res < 0.816496580927727).toBe(true);

		done();
	});

	/*

ABSVAL
CEIL
FLOOR
ROUND
TRUNC
ASCII
CHAR
CONCAT
CONCAT_WS
LEFT
LPAD
SUBSTR
SUBSTRING
TRIM
COALESCE
VALUE

*/
	//	test('localStorage', function(done){
	//		done();
	//	});
});
