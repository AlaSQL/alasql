// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 811 - String / Number objects', () => {
	beforeAll(() => {
		alasql('CREATE DATABASE test811;USE test811');
	});

	afterAll(() => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test811');
	});

	test('1. MEDIAN()', done => {
		var t1 = [
			{value: new Number(5)},
			{value: new Number(6)},
			{value: new Number(9)},
			{value: new Number(1)},
		];

		var res = alasql('SELECT MEDIAN(`value`) AS `median` FROM ?', [t1]);

		var expected = [{median: 5.5}];

		expect(res).toEqual(expected);
		done();
	});

	test('2. DISTINCT()', done => {
		var t1 = [
			{name: new String('A')},
			{name: new String('B')},
			{name: new String('B')},
			{name: new String('A')},
		];

		var res = alasql('SELECT ARRAY(DISTINCT(SELECT `name` FROM ?)) AS `array` FROM ?', [t1, t1]);

		expect(res[0].array).toEqual(['A']);
		done();
	});

	test('3. Inner Select', done => {
		var t1 = [{Email: new String('A')}, {Email: new String('B')}];
		var t2 = [
			{Email: new String('A'), Study: new String('s1')},
			{Email: new String('B'), Study: new String('s2')},
			{Email: new String('B'), Study: new String('s3')},
		];
		var t3 = [
			{Name: new String('n1'), ID: new String('s1')},
			{Name: new String('n2'), ID: new String('s2')},
			{Name: new String('n3'), ID: new String('s3')},
		];
		alasql('CREATE TABLE T1 (Email string)');
		alasql.tables['T1'].data = t1;

		alasql('CREATE TABLE T2 (Email string, Study string)');
		alasql.tables['T2'].data = t2;
		alasql('CREATE TABLE T3 (Name string, ID string)');
		alasql.tables['T3'].data = t3;

		var res = alasql(
			'SELECT T2.`Study`, (SELECT T3.`Name` FROM T3 JOIN T2 WHERE T2.`Study` === T3.`ID`) AS `Focus` ' +
				'FROM T1 LEFT JOIN T2 ON T1.`Email` === T2.`Email`'
		);

		expect(res.length).toEqual(3);
		expect(res[0].Study).toEqual(new String('s1'));
		expect(res[1].Study).toEqual(new String('s2'));
		expect(res[2].Study).toEqual(new String('s3'));
		expect(res[0].Focus).toEqual('n1');
		expect(res[1].Focus).toEqual('n1');
		expect(res[2].Focus).toEqual('n1');
		done();
	});

	test('4. Join Using', done => {
		var t1 = [
			{Email: 'A', ID: new String('s1')},
			{Email: 'B', ID: new String('s2')},
			{Email: 'B', ID: new String('s3')},
		];
		var t2 = [
			{Name: 'n1', ID: new String('s1')},
			{Name: 'n2', ID: new String('s2')},
			{Name: 'n3', ID: new String('s3')},
		];

		var res = alasql('SELECT * FROM ? JOIN ? AS T2 USING ID', [t1, t2]);

		expect(res.length).toEqual(3);
		expect(res[0].Email).toEqual('A');
		expect(res[0].Name).toEqual('n1');

		done();
	});

	test('5a. Where In', done => {
		var t1 = [{ID: new String('s1')}, {ID: new String('s2')}, {ID: new String('s3')}];

		var res = alasql('SELECT * FROM ? WHERE ID IN("s1", "s3")', [t1]);

		expect(res.length).toEqual(2);
		expect(res[0].ID).toEqual(new String('s1'));
		expect(res[1].ID).toEqual(new String('s3'));

		done();
	});

	test('5b. Where In (literals)', done => {
		var t1 = [{ID: 's1'}, {ID: 's2'}, {ID: 's3'}];

		var res = alasql('SELECT * FROM ? WHERE ID IN("s1", "s3")', [t1]);

		expect(res.length).toEqual(2);
		expect(res[0].ID).toEqual('s1');
		expect(res[1].ID).toEqual('s3');

		done();
	});

	test('5c. Where NOT In', done => {
		var t1 = [{ID: new String('s1')}, {ID: new String('s2')}, {ID: new String('s3')}];

		var res = alasql('SELECT * FROM ? WHERE ID NOT IN("s1", "s3")', [t1]);

		expect(res.length).toEqual(1);
		expect(res[0].ID).toEqual(new String('s2'));

		done();
	});

	test('5d. Where NOT In (literals)', done => {
		var t1 = [{ID: 's1'}, {ID: 's2'}, {ID: 's3'}];

		var res = alasql('SELECT * FROM ? WHERE ID NOT IN("s1", "s3")', [t1]);

		expect(res.length).toEqual(1);
		expect(res[0].ID).toEqual('s2');

		done();
	});

	test('6. ORDER BY two columns', done => {
		var t4 = [
			{Email: new String('A'), ID: new String('s1')},
			{Email: new String('B'), ID: new String('s2')},
			{Email: new String('A'), ID: new String('s3')},
		];
		//alasql.options.valueof = true;
		alasql('CREATE TABLE T4 (Email string, ID string)');
		alasql.tables['T4'].data = t4;

		var res = alasql('SELECT * FROM T4 ORDER BY Email ASC, ID ASC', [t4]);

		expect(res[0].Email.valueOf()).toEqual('A');
		expect(res[0].ID.valueOf()).toEqual('s1');

		done();
	});
});
