// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

// Test is based on
// https://msdn.microsoft.com/en-us/library/ms190349.aspx
//
describe('Test 236 MERGE', () => {
	test('1. Prepare database and tables', done => {
		alasql('CREATE DATABASE test236; USE test236;');

		var sql = `
            CREATE TABLE [Target](EmployeeID int, EmployeeName varchar(10), 
                 CONSTRAINT Target_PK PRIMARY KEY(EmployeeID));
            CREATE TABLE [Source](EmployeeID int, EmployeeName varchar(10), 
                 CONSTRAINT Source_PK PRIMARY KEY(EmployeeID));

            INSERT [Target](EmployeeID, EmployeeName) VALUES(100, 'Mary');
            INSERT [Target](EmployeeID, EmployeeName) VALUES(101, 'Sara');
            INSERT [Target](EmployeeID, EmployeeName) VALUES(102, 'Stefano');

            INSERT [Source](EmployeeID, EmployeeName) Values(103, 'Bob');
            INSERT [Source](EmployeeID, EmployeeName) Values(104, 'Steve');
			`;

		alasql(sql);
		var res = alasql('SELECT * FROM [Target]');
		expect(res).toEqual([
			{EmployeeID: 100, EmployeeName: 'Mary'},
			{EmployeeID: 101, EmployeeName: 'Sara'},
			{EmployeeID: 102, EmployeeName: 'Stefano'},
		]);
		//        console.log(res);

		res = alasql('SELECT * FROM [Source]');
		expect(res).toEqual([
			{EmployeeID: 103, EmployeeName: 'Bob'},
			{EmployeeID: 104, EmployeeName: 'Steve'},
		]);
		//        console.log(res);

		done();
	});

	test('2. Merge', done => {
		var sql = `

        MERGE [Target] AS T
        USING [Source] AS S
        ON (T.EmployeeID = S.EmployeeID) 
        WHEN NOT MATCHED BY TARGET AND S.EmployeeName LIKE 'S%' 
            THEN INSERT(EmployeeID, EmployeeName) VALUES(S.EmployeeID, S.EmployeeName)
        WHEN MATCHED 
            THEN UPDATE SET T.EmployeeName = S.EmployeeName
        WHEN NOT MATCHED BY SOURCE AND T.EmployeeName LIKE 'S%'
            THEN DELETE

   `;
		// console.log(alasql.parse(sql).toString());

		//        console.log(res);
		done();
	});

	test('99. DROP', done => {
		alasql('DROP DATABASE test236');
		done();
	});
});
