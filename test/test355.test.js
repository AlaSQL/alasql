// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

// Data for test
var data = [{a: 1}, {a: 2}];

describe('Test 355 PIVOT', function () {
	test.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test355;USE test355');
		done();
	});

	/* Source: http://blog.sqlauthority.com/2008/06/07/sql-server-pivot-and-unpivot-table-examples/ */
	test.skip('2. Prepare Data', function (done) {
		alasql('CREATE TABLE Product(Cust VARCHAR(25), Product VARCHAR(20), QTY INT)');

		alasql(function () {
			/*
    INSERT INTO Product(Cust, Product, QTY)
      VALUES('KATE','VEG',2);
    INSERT INTO Product(Cust, Product, QTY)
      VALUES('KATE','SODA',6);
    INSERT INTO Product(Cust, Product, QTY)
      VALUES('KATE','MILK',1);
    INSERT INTO Product(Cust, Product, QTY)
      VALUES('KATE','BEER',12);
    INSERT INTO Product(Cust, Product, QTY)
      VALUES('FRED','MILK',3);
    INSERT INTO Product(Cust, Product, QTY)
      VALUES('FRED','BEER',24);
    INSERT INTO Product(Cust, Product, QTY)
      VALUES('KATE','VEG',3);
  */
		});

		done();
	});

	test.skip('3. Select Query', function (done) {
		alasql(function () {
			/*
    SELECT *
    FROM Product  
  */
		});

		done();
	});

	test.skip('4. Pivot Table ordered by PRODUCT', function (done) {
		alasql(function () {
			/*
    SELECT PRODUCT, FRED, KATE
    FROM (
    SELECT CUST, PRODUCT, QTY
    FROM Product) up
    PIVOT (SUM(QTY) FOR CUST IN (FRED, KATE)) AS pvt
    ORDER BY PRODUCT
 */
		});

		done();
	});

	test.skip('5. Pivot Table ordered by CUST', function (done) {
		alasql(function () {
			/*
    SELECT CUST, VEG, SODA, MILK, BEER, CHIPS
    FROM (
    SELECT CUST, PRODUCT, QTY
    FROM Product) up
    PIVOT (SUM(QTY) FOR PRODUCT IN (VEG, SODA, MILK, BEER, CHIPS)) AS pvt
    ORDER BY CUST
 */
		});

		done();
	});

	test.skip('6. UnPivot Query', function (done) {
		alasql(function () {
			/*
    SELECT CUST, PRODUCT, QTY
    FROM
    (
    SELECT CUST, VEG, SODA, MILK, BEER, CHIPS
    FROM (
    SELECT CUST, PRODUCT, QTY
    FROM Product) up
    PIVOT
    ( SUM(QTY) FOR PRODUCT IN (VEG, SODA, MILK, BEER, CHIPS)) AS pvt) p
    UNPIVOT
    (QTY FOR PRODUCT IN (VEG, SODA, MILK, BEER, CHIPS)
    ) AS Unpvt    
  */
		});

		done();
	});

	test.skip('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test355');
		done();
	});
});
