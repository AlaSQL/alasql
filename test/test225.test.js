// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window === 'object') {
	describe('Test 225 File Storage', () => {
		test('1. CREATE FILE DATABASE', done => {
			alasql('DROP FILE DATABASE IF EXISTS "' + __dirname + '/test225.json"', [], function (res) {
				//			console.log(res);
				alasql('CREATE FILE DATABASE "' + __dirname + '/test225.json"', [], function (res) {
					//				console.log('PASS1');
					expect(res == 1).toBe(true);
					alasql(
						'CREATE FILE DATABASE IF NOT EXISTS "' + __dirname + '/test225.json"',
						[],
						function (res) {
							//					console.log('PASS2');
							expect(res == 0).toBe(true);
							alasql(
								'DROP FILE DATABASE IF EXISTS "' + __dirname + '/test225.json"',
								[],
								function (res) {
									//						console.log(res);
									expect(res == 1).toBe(true);
									done();
								}
							);
						}
					);
				});
			});
		});
	});
}
