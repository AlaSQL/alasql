// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 140 JavaScript Functions', () => {
	test('1. Simple Date functions', done => {
		alasql('CREATE DATABASE test140; use test140');

		var res = alasql('SELECT * FROM ?', [[{d: new Date(2014, 0, 1)}, {d: new Date(2015, 11, 31)}]]);
		expect(res.length == 2).toBe(true);
		expect(res[0].d.getFullYear).toBeTruthy(); // be aware This can cause same year for both data here depending on locale settings

		var res = alasql('SELECT COLUMN d->getFullYear() FROM ?', [
			[{d: new Date(2014, 6, 1)}, {d: new Date(2015, 6, 31)}],
		]);
		expect(res).toEqual([2014, 2015]);

		var res = alasql('SELECT d->getFullYear() AS d FROM ?', [
			[{d: new Date(2014, 6, 1)}, {d: new Date(2015, 6, 31)}],
		]);
		expect(res).toEqual([{d: 2014}, {d: 2015}]);

		done();
	});

	test('2. Simple String functions', done => {
		var res = alasql('SELECT COLUMN d->substr(e) FROM ?', [
			[
				{d: 'abcd', e: 1},
				{d: 'ABCD', e: 2},
			],
		]);
		expect(res).toEqual(['bcd', 'CD']);

		var res = alasql('SELECT COLUMN d->substr(e,e) FROM ?', [
			[
				{d: 'abcd', e: 1},
				{d: 'ABCD', e: 2},
			],
		]);
		expect(res).toEqual(['b', 'CD']);

		done();
	});

	test('3. NEW keyword', done => {
		alasql.fn.Date = Date;

		var res = alasql('SELECT VALUE new Date(2014,6,1)');
		expect(res.getFullYear() == 2014).toBe(true);

		var res = alasql('SELECT VALUE new Date(2014,6,1)->getFullYear()');
		expect(res == 2014).toBe(true);

		done();
	});

	test('4. Create table with Date', done => {
		alasql.fn.Date = Date;

		alasql('CREATE TABLE one (d Date)');

		alasql('INSERT INTO one VALUES (new Date(2014,6,1)), (new Date(2015,6,2))');

		var res = alasql('SELECT COLUMN d->getFullYear() FROM one');
		expect(res).toEqual([2014, 2015]);

		var res = alasql('SELECT COLUMN d->getFullYear() FROM one WHERE d === new Date(2015,6,1)');
		expect(res).toEqual([]);

		var res = alasql('SELECT COLUMN d->getFullYear() FROM one WHERE d === new Date(2015,6,2)');
		expect(res).toEqual([2015]);
		done();
	});

	test('5. Create table with default conversion Date', done => {
		alasql('CREATE TABLE two (d DATE)');

		alasql('INSERT INTO two VALUES ("2014-06-01"), ("2015-06-02")');

		var res = alasql('SELECT COLUMN d FROM two');
		expect(res).toEqual(['2014-06-01', '2015-06-02']);
		//		expect(res).toEqual([2014,2015]);
		//		console.log(res);

		var res = alasql('SELECT COLUMN d FROM two');
		expect(res).toEqual(['2014-06-01', '2015-06-02']);
		done();
	});

	test('6. Create table with default conversion Date', done => {
		alasql('CREATE TABLE three (d Date)');

		alasql('INSERT INTO three VALUES ("2014-06-01"), ("2015-06-02")');

		var res = alasql('SELECT COLUMN d->getFullYear() FROM three');
		expect(res).toEqual([2014, 2015]);
		done();
	});

	test('7. Create table with default conversion Date', done => {
		delete alasql.fn.Date;
		alasql('CREATE TABLE four (d Date)');

		alasql('INSERT INTO four VALUES ("2014-06-02"), ("2015-06-03")');

		var res = alasql('SELECT COLUMN YEAR(d) FROM four');
		expect(res).toEqual([2014, 2015]);

		var res = alasql('SELECT COLUMN MONTH(d) FROM four');
		expect(res).toEqual([6, 6]);

		var res = alasql('SELECT COLUMN DAY(d) FROM four');
		expect(res).toEqual([new Date('2014-06-02').getDate(), new Date('2014-06-03').getDate()]);

		//		console.log(res);
		var res = alasql('SELECT COLUMN d FROM four');
		expect(res).toEqual(['2014-06-02', '2015-06-03']);

		done();
	});

	test('99. Drop database', done => {
		alasql('DROP DATABASE test140');
		done();
	});
});
