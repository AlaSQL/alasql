if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

// Data for test
var data = [{a: 1}, {a: 2}];

describe('Test 355 PIVOT', function () {
	it.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test355;USE test355');
		done();
	});

	/* Source: http://blog.sqlauthority.com/2008/06/07/sql-server-pivot-and-unpivot-table-examples/ */
	it.skip('2. Prepare Data', function (done) {
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

	it.skip('3. Select Query', function (done) {
		alasql(function () {
			/*
    SELECT *
    FROM Product  
  */
		});

		done();
	});

	it.skip('4. Pivot Table ordered by PRODUCT', function (done) {
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

	it.skip('5. Pivot Table ordered by CUST', function (done) {
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

	it.skip('6. UnPivot Query', function (done) {
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

	it.skip('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test355');
		done();
	});
});
