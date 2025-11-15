// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 814 - XXS or RCE from BRALITERAL', () => {
	var testId = '814'; // insert test file number

	beforeAll(() => {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE table i_am_a_table;');
		//alasql(`INSERT INTO i_am_a_table VALUES (1337);`);
		//alasql('INSERT INTO i_am_a_table VALUES (1337);')
		// Reset errorlog to ensure security tests throw exceptions
		alasql.options.errorlog = false;
	});

	afterAll(() => {
		alasql('drop database test' + testId);
		alasql.options.errorlog = false;
	});

	const genPayload = command => `
	console.log(${JSON.stringify(command)})
	`;

	//

	test('A) Update SET', () => {
		expect(() =>
			alasql(`UPDATE i_am_a_table SET [0'+${genPayload('>&2 echo UPDATE pwned $(whoami)')}+']=42;`)
		).toThrow();
	});

	test('B) Compare fields', () => {
		expect(() =>
			alasql(
				`SELECT * from i_am_a_table where whatever=['+${genPayload(
					'>&2 echo SELECT pwned $(whoami)'
				)}+'];`
			)
		).toThrow();
	});

	test('C) Select field', () => {
		expect(() =>
			alasql(
				`SELECT \`'+${genPayload(
					'>&2 echo SELECT pwned again, back-quote works too. $(whoami)'
				)}+'\` from i_am_a_table where 1;`
			)
		).toThrow();
	});

	test('D) Function name', () => {
		expect(() =>
			alasql(`SELECT [whatever||${genPayload('>&2 echo calling function pwned')}||]('whatever');`)
		).toThrow();
	});

	/*
	test('C) Multiple statements in one string with callback', (done) => {
		// Please note that first parameter (here `done`) must be called if defined - and is needed when testing async code
		var sql = 'create table three (a int);';
		sql += 'insert into three values (1),(2),(3),(4),(5);';
		sql += 'select * from three;';
		alasql(sql, function (res) {
			expect(res).toEqual([1, 5, [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]]);
			done();
		});
	});
	*/
});
