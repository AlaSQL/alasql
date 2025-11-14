// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

// Data for test
var data = [{a: 1}, {a: 2}];

describe('Test 354 PIVOT', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test354;USE test354');
		done();
	});

	/* Source: http://blogs.msdn.com/b/spike/archive/2009/03/03/pivot-tables-in-sql-server-a-simple-sample.aspx */
	test('2. Prepare Data', function (done) {
		alasql(
			'create table DailyIncome(VendorId nvarchar(10), IncomeDay nvarchar(10), IncomeAmount int)'
		);

		alasql(`
    insert into DailyIncome values ('SPIKE', 'FRI', 100);
    insert into DailyIncome values ('SPIKE', 'MON', 300);
    insert into DailyIncome values ('FREDS', 'SUN', 400);
    insert into DailyIncome values ('SPIKE', 'WED', 500);
    insert into DailyIncome values ('SPIKE', 'TUE', 200);
    insert into DailyIncome values ('JOHNS', 'WED', 900);
    insert into DailyIncome values ('SPIKE', 'FRI', 100);
    insert into DailyIncome values ('JOHNS', 'MON', 300);
    insert into DailyIncome values ('SPIKE', 'SUN', 400);
    insert into DailyIncome values ('JOHNS', 'FRI', 300);
    insert into DailyIncome values ('FREDS', 'TUE', 500);
    insert into DailyIncome values ('FREDS', 'TUE', 200);
    insert into DailyIncome values ('SPIKE', 'MON', 900);
    insert into DailyIncome values ('FREDS', 'FRI', 900);
    insert into DailyIncome values ('FREDS', 'MON', 500);
    insert into DailyIncome values ('JOHNS', 'SUN', 600);
    insert into DailyIncome values ('SPIKE', 'FRI', 300);
    insert into DailyIncome values ('SPIKE', 'WED', 500);
    insert into DailyIncome values ('SPIKE', 'FRI', 300);
    insert into DailyIncome values ('JOHNS', 'THU', 800);
    insert into DailyIncome values ('JOHNS', 'SAT', 800);
    insert into DailyIncome values ('SPIKE', 'TUE', 100);
    insert into DailyIncome values ('SPIKE', 'THU', 300);
    insert into DailyIncome values ('FREDS', 'WED', 500);
    insert into DailyIncome values ('SPIKE', 'SAT', 100);
    insert into DailyIncome values ('FREDS', 'SAT', 500);
    insert into DailyIncome values ('FREDS', 'THU', 800);
    insert into DailyIncome values ('JOHNS', 'TUE', 600)
  `);

		done();
	});

	test('3. Pivot Query', function (done) {
		alasql(`
    select * from DailyIncome
    pivot (avg (IncomeAmount) for IncomeDay)
  `);

		done();
	});

	test('4. Pivot Query with specific days', function (done) {
		alasql(`
    select * from DailyIncome
    pivot (avg (IncomeAmount) for IncomeDay 
      in ([MON],[TUE],[WED],[THU],[FRI],[SAT],[SUN])) as AvgIncomePerDay
  `);

		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test354');
		done();
	});
});
