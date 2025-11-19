// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
//	var DOMStorage = require("dom-storage");
//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });

/*
 This sample beased on SQLLOGICTEST
*/

if (typeof window !== 'object') {
	describe.skip('Test 405. IndexDB problem (issue #512)', () => {
		test('1. Parse SQL', done => {
			//      alasql('CREATE INDEXEDDB DATABASE IF NOT EXISTS geo;')
			alasql(
				'CREATE INDEXEDDB DATABASE IF NOT EXISTS geo;\
        ATTACH INDEXEDDB DATABASE geo; \
        USE geo; \
        DROP TABLE IF EXISTS cities; \
        CREATE TABLE cities;\
      ',
				[],
				() => {
					done();
				}
			);
		});

		// done();
	});
}
