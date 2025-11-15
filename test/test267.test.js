// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import DOMStorage from 'dom-storage';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof global === 'object') {
	global.localStorage = new DOMStorage(__dirname + '/restest267.json', {
		strict: false,
		ws: '',
	});
}

describe('Test 267 LocalStorage test', () => {
	test('1. First pass', done => {
		var data = [{name: 'first'}];
		alasql('CREATE localStorage DATABASE IF NOT EXISTS db');
		alasql('ATTACH localStorage DATABASE db');
		alasql('USE db');
		alasql('CREATE TABLE IF NOT EXISTS test');
		alasql('SELECT * INTO test FROM ?', [data]);
		var res = alasql('SELECT * FROM test');
		/// console.log(res);
		done();
	});

	test('2. Second pass', done => {
		var data = [{name: 'second'}];
		alasql('CREATE localStorage DATABASE IF NOT EXISTS db');
		alasql('ATTACH localStorage DATABASE db');
		alasql('USE db');
		alasql('CREATE TABLE IF NOT EXISTS test');
		alasql('SELECT * INTO test FROM ?', [data]);
		var res = alasql('SELECT * FROM test');
		/// console.log(res);
		done();
	});

	test('3. Detach', done => {
		alasql('DETACH DATABASE db');
		done();
	});

	test('4. Third pass', done => {
		var data = [{name: 'third'}];
		alasql('CREATE localStorage DATABASE IF NOT EXISTS db');
		alasql('ATTACH localStorage DATABASE db');
		alasql('USE db');
		alasql('CREATE TABLE IF NOT EXISTS test');
		alasql('SELECT * INTO test FROM ?', [data]);
		var res = alasql('SELECT * FROM test');
		/// console.log(res);
		done();
	});

	test('5. Fifth pass', done => {
		var data = [{name: 'fifth'}];
		alasql('CREATE localStorage DATABASE IF NOT EXISTS db');
		alasql('ATTACH localStorage DATABASE db');
		alasql('USE db');
		alasql('CREATE TABLE IF NOT EXISTS test');
		alasql('SELECT * INTO test FROM ?', [data]);
		var res = alasql('SELECT * FROM test');
		/// console.log(res);
		done();
	});

	test('6. Drop phase', done => {
		alasql('DETACH DATABASE db');
		alasql('DROP LOCALSTORAGE DATABASE db');
		done();
	});

	test('7. Second phase phase', done => {
		alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS test267');
		alasql('ATTACH LOCALSTORAGE DATABASE test267');
		alasql('USE test267');
		alasql('CREATE TABLE IF NOT EXISTS test');
		alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS test267');
		alasql('ATTACH LOCALSTORAGE DATABASE test267');
		alasql('USE test267');
		alasql('CREATE TABLE IF NOT EXISTS test');
		done();
	});

	test('8. Drop phase', done => {
		//    alasql('DETACH DATABASE db1');
		//    alasql('DROP LOCALSTORAGE DATABASE db1');
		done();
	});
});
