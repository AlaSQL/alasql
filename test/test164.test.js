// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import DOMStorage from 'dom-storage';

global.localStorage = new DOMStorage('./test162.json', {
	strict: false,
	ws: '',
});

describe.skip('Test 164 - NeDB', () => {
	test('1. NeDB support', done => {
		// TODO - finish the test
		done();
	});
});
