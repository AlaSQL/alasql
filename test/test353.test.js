// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

// Data for test
var data = [{a: 1}, {a: 2}];

describe('Test 353 Compiled Promised Statements', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test353;USE test353');
		done();
	});
	test('2. Compiled Sync', function (done) {
		var st = alasql.compile('SELECT * FROM ?');
		var res = st([data]);
		assert.deepEqual(res, data);
		done();
	});

	test('3. Compiled Sync with Error', function (done) {
		alasql.fn.iamwrong = function () {
			throw new Error('I am wrong!');
		};
		var st = alasql.compile('SELECT iamwrong() FROM ?');
		assert.throws(function () {
			var res = st([data]);
		}, Error);
		done();
	});
	/*
  test('4. Compiled Sync with Error Log',function(done){
    var st = alasql.compile('SELECT iamwrong() FROM ?');
    alasql.options.errorlog = true;
    var res = st([data]);
    assert(alasql.error instanceof Error);
    alasql.errorlog = false;
    done();
  });
*/
	test('5. Compiles Async', function (done) {
		alasql.fn.iamwrong = function () {
			throw new Error('I am wrong!');
		};
		var st = alasql.compile('SELECT * FROM ?');
		st([data], function (res, err) {
			assert.deepEqual(res, data);
			done();
		});
	});

	/*
  test('6. Compiles Async with Error',function(done){
    var st = alasql.compile('SELECT iamwrong() FROM ?');
    alasql.options.errorlog = true;
    st([data],function(res,err){
      assert(err instanceof Error);
      alasql.options.errorlog = false;
      done();
    });
  });
*/

	test('7. Compile Promise', function (done) {
		var st = alasql.compile('SELECT * FROM ?');
		st.promise([data]).then(function (res) {
			assert.deepEqual(res, data);
			done();
		});
	});

	test('5. Compile With Error', function (done) {
		var st = alasql.compile('SELECT iamwrong() FROM ?');
		st.promise([data])
			.then(function (res) {
				// Should not be here
			})
			.catch(function (err) {
				assert(err instanceof Error);
				done();
			});
	});

	test('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test353');
		done();
	});
});
