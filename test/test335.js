// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//

//http://stackoverflow.com/questions/18811265/sql-creating-temporary-variables
//
describe('Test 335 WITH RECURSIVE CTE', function () {
	test.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test335;USE test335');

		done();
	});

	test.skip('2. Create table', function (done) {
		var res = alasql(function () {
			/*
      -- Create an Employee table.
      CREATE TABLE dbo.MyEmployees
      (
      EmployeeID smallint NOT NULL,
      FirstName nvarchar(30)  NOT NULL,
      LastName  nvarchar(40) NOT NULL,
      Title nvarchar(50) NOT NULL,
      DeptID smallint NOT NULL,
      ManagerID int NULL,
       CONSTRAINT PK_EmployeeID PRIMARY KEY CLUSTERED (EmployeeID ASC) 
      );
      -- Populate the table with values.
      INSERT INTO dbo.MyEmployees VALUES 
       (1, N'Ken', N'Sánchez', N'Chief Executive Officer',16,NULL)
      ,(273, N'Brian', N'Welcker', N'Vice President of Sales',3,1)
      ,(274, N'Stephen', N'Jiang', N'North American Sales Manager',3,273)
      ,(275, N'Michael', N'Blythe', N'Sales Representative',3,274)
      ,(276, N'Linda', N'Mitchell', N'Sales Representative',3,274)
      ,(285, N'Syed', N'Abbas', N'Pacific Sales Manager',3,273)
      ,(286, N'Lynn', N'Tsoflias', N'Sales Representative',3,285)
      ,(16,  N'David',N'Bradley', N'Marketing Manager', 4, 273)
      ,(23,  N'Mary', N'Gibson', N'Marketing Specialist', 4, 16);
    */
		});
		assert.deepEqual(res, [1, 1]);
		done();
	});

	test.skip('3. WITH SELECT', function (done) {
		var res = alasql(function () {
			/*

WITH DirectReports(ManagerID, EmployeeID, Title, EmployeeLevel) AS 
(
    SELECT ManagerID, EmployeeID, Title, 0 AS EmployeeLevel
    FROM dbo.MyEmployees 
    WHERE ManagerID IS NULL
    UNION ALL
    SELECT e.ManagerID, e.EmployeeID, e.Title, EmployeeLevel + 1
    FROM dbo.MyEmployees AS e
        INNER JOIN DirectReports AS d
        ON e.ManagerID = d.EmployeeID 
)
SELECT ManagerID, EmployeeID, Title, EmployeeLevel 
FROM DirectReports
ORDER BY ManagerID;

    */
		});
		console.log(res);
		assert.deepEqual(res, []);

		done();
	});

	test.skip('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test335');
		done();
	});
});
