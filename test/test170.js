// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window === 'object' && false) {

describe('Test 170 - INTO result variable', function () {
	test('1. Write TXT file into stdout', function (done) {
		var data = [
			{city: 'Rome', population: 3400000},
			{city: 'Astana', population: 800000},
		];
		var res = alasql('select * into txt() from ?', [data], function (res) {
			assert(res == 'Rome\nAstana');
			done();
		});
	});

	test('2. Write CSV file into stdout', function (done) {
		var data = [
			{city: 'Rome', population: 3400000},
			{city: 'Astana', population: 800000},
		];
		var res = alasql(
			'select * into csv({headers:true, utf8Bom:false}) from ?',
			[data],
			function (res) {
				assert.equal(res, '"city";"population"\r\n"Rome";3400000\r\n"Astana";800000\r\n');
				done();
			}
		);
	});
});
//}
