if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test380.json', {strict: false, ws: ''});
}

/*
 This sample beased on this article:

 http://blogs.msdn.com/b/spike/archive/2009/03/03/pivot-tables-in-sql-server-a-simple-sample.aspx

*/

describe('Test 380 - PIVOT', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test380;USE test380');
		done();
	});

	it('1. Create table', function(done) {
		alasql(function() {
			/*

			create table DailyIncome(VendorId nvarchar(10), IncomeDay nvarchar(10), IncomeAmount int);

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
			insert into DailyIncome values ('JOHNS', 'TUE', 600);

		*/
		});

		done();
	});

	it('2. Simple pivot without IN', function(done) {
		var res = alasql('select * from DailyIncome  \
		pivot (AVG(IncomeAmount) for IncomeDay)');

		assert.deepEqual(res, [
			{
				VendorId: 'SPIKE',
				FRI: 200,
				MON: 600,
				WED: 500,
				TUE: 150,
				SUN: 400,
				THU: 300,
				SAT: 100,
			},
			{
				VendorId: 'FREDS',
				SUN: 400,
				TUE: 350,
				FRI: 900,
				MON: 500,
				WED: 500,
				SAT: 500,
				THU: 800,
			},
			{
				VendorId: 'JOHNS',
				WED: 900,
				MON: 300,
				FRI: 300,
				SUN: 600,
				THU: 800,
				SAT: 800,
				TUE: 600,
			},
		]);
		done();
	});

	it('3. Simple pivot with IN', function(done) {
		var res = alasql(
			'RECORDSET OF SELECT * FROM DailyIncome  \
		PIVOT (AVG(IncomeAmount) FOR IncomeDay IN ([MON],[TUE]))'
		);

		assert.deepEqual(
			res,

			{
				data: [
					{VendorId: 'SPIKE', MON: 600, TUE: 150},
					{VendorId: 'JOHNS', MON: 300, TUE: 600},
					{VendorId: 'FREDS', TUE: 350, MON: 500},
				],
				columns: [
					{
						columnid: 'VendorId',
						dbtypeid: 'NVARCHAR',
						dbsize: 10,
						dbprecision: undefined,
						dbenum: undefined,
					},
					{
						columnid: 'MON',
						dbtypeid: 'INT',
						dbsize: undefined,
						dbprecision: undefined,
						dbenum: undefined,
					},
					{
						columnid: 'TUE',
						dbtypeid: 'INT',
						dbsize: undefined,
						dbprecision: undefined,
						dbenum: undefined,
					},
				],
			}
		);
		done();
	});

	it('4. PIVOT and WHERE', function(done) {
		var res = alasql(function() {
			/*
		select * from DailyIncome
		pivot (max (IncomeAmount) for IncomeDay in ([MON],[TUE],[WED],[THU],[FRI],[SAT],[SUN])) as MaxIncomePerDay
		where VendorId in ('SPIKE')

		*/
		});

		assert.deepEqual(res, [
			{
				VendorId: 'SPIKE',
				FRI: 300,
				MON: 900,
				WED: 500,
				TUE: 200,
				SUN: 400,
				THU: 300,
				SAT: 100,
			},
		]);

		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test380');
		done();
	});
});
