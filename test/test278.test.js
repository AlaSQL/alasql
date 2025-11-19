// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage(__dirname + '/restest278.json', {
		strict: false,
		ws: '',
	});
}

describe('Test 278 Errors catching', () => {
	test('1. Prepare databases', done => {
		alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS Atlas');
		alasql('SET AUTOCOMMIT OFF');
		alasql('ATTACH LOCALSTORAGE DATABASE Atlas AS MyAtlas');
		alasql('USE MyAtlas;');
		alasql('CREATE TABLE IF NOT EXISTS transactions (transid, payee, amount)');
		done();
	});

	test('2. Select from wrong database without errolog', done => {
		expect(() => {
			alasql('SELECT * FROM addresses');
		}).toThrow(Error);
		done();
	});

	test('2. Select from wrong database with errolog', done => {
		alasql.options.errorlog = true;
		alasql('SELECT * FROM addresses', [], function (res, err) {
			/// console.log(err);
			done();
		});
	});

	test('99. Drop databases', done => {
		alasql.options.errorlog = false;
		alasql('DETACH DATABASE MyAtlas');
		done();
	});
});
