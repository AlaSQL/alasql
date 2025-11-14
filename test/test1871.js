// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 1871 - n.Term is not a constructor', function () {
	test('Sending xxx random data should give valid error', function () {
		assert.throws(() => alasql('xxx'), {
			message: "Parse error on line 1:\nxxx\n---^\nExpecting 'COLONDASH', got 'EOF'",
		});
	});
});
