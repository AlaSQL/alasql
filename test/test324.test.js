// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 324 Roads samples', () => {
	test.skip('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test324a; USE test324a');
		done();
	});

	test.skip('2. OBJECT_ID()', done => {
		alasql('CREATE TABLE dbo.Employees(id INT, name STRING)');
		alasql('INSERT INTO dbo.Employees VALUES (1,"Tomas"),(2,"Lisa")');
		expect(alasql('SELECT * FROM dbo.Employees')).toEqual([
			{id: 1, name: 'Tomas'},
			{id: 2, name: 'Lisa'},
		]);
		expect(alasql('SELECT VALUE OBJECT_ID("dbo.Employees")')).toEqual('test324a.Employees');
		var res = alasql(
			'IF OBJECT_ID("dbo.Employees") IS NOT NULL\
      DROP TABLE dbo.Employees;'
		);
		expect(!alasql.databases.dbo.tables.Employees).toBe(true);
		expect(res).toEqual(1);
		done();
	});

	test.skip('3. DROP DATABASE', done => {
		alasql('DROP DATABASE test324a');
		done();
	});

	test.skip('2. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test324b; USE test324b');
		done();
	});

	test.skip('3. CREATE TABLE with constraints', done => {
		var res = alasql(() => {
			/*
      CREATE TABLE dbo.Employees
      (
        empid   INT         NOT NULL PRIMARY KEY,
        mgrid   INT         NULL     REFERENCES dbo.Employees,
        empname VARCHAR(25) NOT NULL,
        salary  MONEY       NOT NULL,
        CHECK (empid <> mgrid)
      );
  */
		});
		expect(res == 1).toBe(true);
		expect(alasql.databases.dbo.tables.Employees).toBe(true);
		done();
	});

	test.skip('4. INSERT INTO table with constraints', done => {
		var res = alasql(() => {
			/*
	  INSERT INTO dbo.Employees(empid, mgrid, empname, salary) VALUES
		(1,  NULL, 'David'  , 10000.00),
		(2,  1,    'Eitan'  ,  7000.00)
  */
		});
		expect(res == 2).toBe(true);
		expect(alasql('SELECT * FROM dbo.Employees')).toEqual([
			{empid: 1, mgrid: undefined, empname: 'David', salary: 10000},
			{empid: 2, mgrid: 1, empname: 'Eitan', salary: 7000},
		]);
		done();
	});

	test.skip('5. INSERT INTO table with same primary key', done => {
		expect(() => {
			var res = alasql(() => {
				/*
		INSERT INTO dbo.Employees(empid, mgrid, empname, salary) VALUES
		  (1,  NULL, 'David'  , 10000.00),
		  (2,  1,    'Eitan'  ,  7000.00)
	  */
			});
		}).toThrow(Error);
		done();
	});

	test.skip('6. INSERT INTO wrong NULL in NOT NULL column', done => {
		expect(() => {
			var res = alasql(() => {
				/*
		INSERT INTO dbo.Employees(empid, mgrid, empname, salary) VALUES
		  (NULL,  3, 'Samson'  , 45000.00)
	  */
			});
		}).toThrow(Error);
		done();
	});

	test.skip('7. UPDATE wrong NULL in NOT NULL column', done => {
		expect(() => {
			var res = alasql('UPDATE dbo.Employees SET empid = NULL WHERE empid = 1');
		}).toThrow(Error);
		done();
	});

	test.skip('8. UPDATE wrong NULL in NOT NULL column', done => {
		var res = alasql('UPDATE dbo.Employees SET mgrid = NULL WHERE empid = 2');
		expect(res == 1).toBe(true);
		done();
	});

	test.skip('9. UPDATE wrong NULL in NOT NULL column', done => {
		expect(() => {
			var res = alasql('UPDATE dbo.Employees SET mgrid = 3 WHERE empid = 2');
		}).toThrow(Error);
		done();
	});

	test.skip('10. INSERT INTO table with constraints violation', done => {
		//    console.log(alasql.databases.dbo.tables.Employees);
		expect(() => {
			var res = alasql(
				"INSERT INTO dbo.Employees(empid, mgrid, empname, salary) \
            VALUES (3,  3, 'Samson'  , 45000.00)"
			);
		}).toThrow(Error);
		//  console.log(res);
		done();
	});

	test.skip('11. INSERT INTO table with constraints violation', done => {
		//    console.log(alasql.databases.dbo.tables.Employees);
		var res = alasql(
			"INSERT INTO dbo.Employees(empid, mgrid, empname, salary) \
            VALUES (3,  1, 'Samson'  , 45000.00)"
		);
		expect(res == 1).toBe(true);
		//  console.log(res);
		done();
	});

	test.skip('12. UPDATE wrong NULL in NOT NULL column', done => {
		var res = alasql('UPDATE dbo.Employees SET mgrid = 3 WHERE empid = 2');
		expect(res == 1).toBe(true);
		done();
	});

	test.skip('13. UPDATE table with constraints violation', done => {
		//    console.log(alasql.databases.dbo.tables.Employees);
		expect(() => {
			var res = alasql('UPDATE dbo.Employees SET mgrid = 1 WHERE empid = 1');
		}).toThrow(Error);
		//  console.log(res);
		done();
	});

	test.skip('14. CURRENT_TIMESTAMP', done => {
		var res = alasql('SELECT VALUE CURRENT_TIMESTAMP');
		expect(res.length == '2015.05.11 07:58:20.078'.length).toBe(true);
		expect(res.substr(0, 2) == '20').toBe(true);
		done();
	});
	test.skip('19. DROP DATABASE', done => {
		alasql('DROP DATABASE test324b');
		done();
	});

	test.skip('20. Full example', done => {
		alasql('SOURCE "test324.sql"');
		// Check NO COUNT
		alasql.options.nocount = false;
		done();
	});
});
