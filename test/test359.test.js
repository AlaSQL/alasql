// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

// Data for test
var data = [{a: 1}, {a: 2}];

describe('Test 359 UNPIVOT', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test359;USE test359');
		done();
	});

	/* Source: https://msdn.microsoft.com/en-us/library/ms177410(SQL.105).aspx */
	test('2. Prepare Data', done => {
		alasql(
			'CREATE TABLE pvt (VendorID int, Emp1 int, Emp2 int,\
    Emp3 int, Emp4 int, Emp5 int);'
		);

		alasql(`
    INSERT INTO pvt VALUES (1,4,3,5,4,4);
    INSERT INTO pvt VALUES (2,4,1,5,5,5);
    INSERT INTO pvt VALUES (3,4,3,5,4,4);
    INSERT INTO pvt VALUES (4,4,2,5,5,4);
    INSERT INTO pvt VALUES (5,5,1,5,5,5);
  `);

		done();
	});

	test('3. Unpivot Query', done => {
		// var res = alasql(function(){
		//   SELECT VendorID, Employee, Orders
		//   FROM
		//      (SELECT VendorID, Emp1, Emp2, Emp3, Emp4, Emp5
		//      FROM pvt) p
		//   UNPIVOT
		//      (Orders FOR Employee IN
		//         (Emp1, Emp2, Emp3, Emp4, Emp5)
		//   )AS unpvt;
		// });

		var res = alasql(`
    SELECT VendorID, Emp1, Emp2, Emp3, Emp4, Emp5
       FROM pvt
    UNPIVOT
       (Orders FOR Employee IN 
          (Emp1, Emp2, Emp3, Emp4, Emp5)
    )AS unpvt;
  `);

		expect(res).toEqual([
			{VendorID: 1, Employee: 'Emp1', Orders: 4},
			{VendorID: 1, Employee: 'Emp2', Orders: 3},
			{VendorID: 1, Employee: 'Emp3', Orders: 5},
			{VendorID: 1, Employee: 'Emp4', Orders: 4},
			{VendorID: 1, Employee: 'Emp5', Orders: 4},
			{VendorID: 2, Employee: 'Emp1', Orders: 4},
			{VendorID: 2, Employee: 'Emp2', Orders: 1},
			{VendorID: 2, Employee: 'Emp3', Orders: 5},
			{VendorID: 2, Employee: 'Emp4', Orders: 5},
			{VendorID: 2, Employee: 'Emp5', Orders: 5},
			{VendorID: 3, Employee: 'Emp1', Orders: 4},
			{VendorID: 3, Employee: 'Emp2', Orders: 3},
			{VendorID: 3, Employee: 'Emp3', Orders: 5},
			{VendorID: 3, Employee: 'Emp4', Orders: 4},
			{VendorID: 3, Employee: 'Emp5', Orders: 4},
			{VendorID: 4, Employee: 'Emp1', Orders: 4},
			{VendorID: 4, Employee: 'Emp2', Orders: 2},
			{VendorID: 4, Employee: 'Emp3', Orders: 5},
			{VendorID: 4, Employee: 'Emp4', Orders: 5},
			{VendorID: 4, Employee: 'Emp5', Orders: 4},
			{VendorID: 5, Employee: 'Emp1', Orders: 5},
			{VendorID: 5, Employee: 'Emp2', Orders: 1},
			{VendorID: 5, Employee: 'Emp3', Orders: 5},
			{VendorID: 5, Employee: 'Emp4', Orders: 5},
			{VendorID: 5, Employee: 'Emp5', Orders: 5},
		]);

		done();
	});

	test('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test359');
		done();
	});
});
