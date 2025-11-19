// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 1871 - n.Term is not a constructor', () => {
	test('Sending xxx random data should give valid error', () => {
		expect(() => alasql('xxx')).toThrow({
			message: "Parse error on line 1:\nxxx\n---^\nExpecting 'COLONDASH', got 'EOF'",
		});
	});
});
