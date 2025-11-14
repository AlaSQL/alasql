// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window === 'object') {
	describe('Test 225 File Storage', function () {
		test('1. CREATE FILE DATABASE', function (done) {
			alasql('DROP FILE DATABASE IF EXISTS "' + __dirname + '/test225.json"', [], function (res) {
				//			console.log(res);
				alasql('CREATE FILE DATABASE "' + __dirname + '/test225.json"', [], function (res) {
					//				console.log('PASS1');
					assert(res == 1);
					alasql(
						'CREATE FILE DATABASE IF NOT EXISTS "' + __dirname + '/test225.json"',
						[],
						function (res) {
							//					console.log('PASS2');
							assert(res == 0);
							alasql(
								'DROP FILE DATABASE IF EXISTS "' + __dirname + '/test225.json"',
								[],
								function (res) {
									//						console.log(res);
									assert(res == 1);
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
