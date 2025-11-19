// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

// Data for test
var data = [{a: 1}, {a: 2}];

describe('Test 353 Compiled Promised Statements', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test353;USE test353');
		done();
	});
	test('2. Compiled Sync', done => {
		var st = alasql.compile('SELECT * FROM ?');
		var res = st([data]);
		expect(res).toEqual(data);
		done();
	});

	test('3. Compiled Sync with Error', done => {
		alasql.fn.iamwrong = () => {
			throw new Error('I am wrong!');
		};
		var st = alasql.compile('SELECT iamwrong() FROM ?');
		expect(() => {
			var res = st([data]);
		}).toThrow(Error);
		done();
	});
	/*
  test('4. Compiled Sync with Error Log',function(done){
    var st = alasql.compile('SELECT iamwrong() FROM ?');
    alasql.options.errorlog = true;
    var res = st([data]);
    expect(alasql.error instanceof Error).toBe(true);
    alasql.errorlog = false;
    done();
  });
*/
	test('5. Compiles Async', done => {
		alasql.fn.iamwrong = () => {
			throw new Error('I am wrong!');
		};
		var st = alasql.compile('SELECT * FROM ?');
		st([data], function (res, err) {
			expect(res).toEqual(data);
			done();
		});
	});

	/*
  test('6. Compiles Async with Error',function(done){
    var st = alasql.compile('SELECT iamwrong() FROM ?');
    alasql.options.errorlog = true;
    st([data],function(res,err){
      expect(err instanceof Error).toBe(true);
      alasql.options.errorlog = false;
      done();
    });
  });
*/

	test('7. Compile Promise', done => {
		var st = alasql.compile('SELECT * FROM ?');
		st.promise([data]).then(function (res) {
			expect(res).toEqual(data);
			done();
		});
	});

	test('5. Compile With Error', done => {
		var st = alasql.compile('SELECT iamwrong() FROM ?');
		st.promise([data])
			.then(function (res) {
				// Should not be here
			})
			.catch(function (err) {
				expect(err instanceof Error).toBe(true);
				done();
			});
	});

	test('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test353');
		done();
	});
});
