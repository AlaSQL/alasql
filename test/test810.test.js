// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 810 - yy.Op for BETWEEN returning correct toString() result', () => {
	test('yy.Op.toString() returns correct value when op === BETWEEN', () => {
		var expectedResult = 'id BETWEEN 1 AND 3';

		var betweenOp = new alasql.yy.Op({
			left: new alasql.yy.Column({columnid: 'id'}),
			op: 'BETWEEN',
			right1: new alasql.yy.NumValue({value: 1}),
			right2: new alasql.yy.NumValue({value: 3}),
		});

		var result = betweenOp.toString();

		expect(result).toEqual(expectedResult);
	});

	test('yy.Op.toString() returns correct value when op === NOT BETWEEN', () => {
		var expectedResult = 'id NOT BETWEEN 1 AND 3';

		var betweenOp = new alasql.yy.Op({
			left: new alasql.yy.Column({columnid: 'id'}),
			op: 'NOT BETWEEN',
			right1: new alasql.yy.NumValue({value: 1}),
			right2: new alasql.yy.NumValue({value: 3}),
		});

		var result = betweenOp.toString();

		expect(result).toEqual(expectedResult);
	});
});
