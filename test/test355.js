if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

// Data for test
var data = [{a: 1}, {a: 2}];

describe('Test 355 PIVOT', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test355;USE test355');
		done();
	});

	/* Source: http://blog.sqlauthority.com/2008/06/07/sql-server-pivot-and-unpivot-table-examples/ */
	it('2. Prepare Data', function (done) {
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

	it('3. Select Query', function (done) {
		var res = alasql(function () {
			/*
    SELECT *
    FROM Product  
  */
		});

		assert.equal(res.length, 7);
		done();
	});

	it('4. Pivot Table ordered by PRODUCT', function (done) {
		var res = alasql(function () {
			/*
    SELECT * FROM Product
    PIVOT (SUM(QTY) FOR Cust IN (FRED, KATE))
    ORDER BY Product
 */
		});

		assert.deepEqual(res, [
			{Product: 'BEER', FRED: 24, KATE: 12},
			{Product: 'MILK', FRED: 3, KATE: 1},
			{Product: 'SODA', KATE: 6},
			{Product: 'VEG', KATE: 5},
		]);

		done();
	});

	it('5. Pivot Table ordered by CUST', function (done) {
		var res = alasql(function () {
			/*
    SELECT * FROM Product
    PIVOT (SUM(QTY) FOR Product IN (VEG, SODA, MILK, BEER, CHIPS))
    ORDER BY Cust
 */
		});

		assert.deepEqual(res, [
			{Cust: 'FRED', MILK: 3, BEER: 24},
			{Cust: 'KATE', VEG: 5, SODA: 6, MILK: 1, BEER: 12},
		]);

		done();
	});

	it('6. UnPivot Query', function (done) {
		// First create a pivoted table
		alasql('CREATE TABLE pivoted (Cust STRING, VEG INT, SODA INT, MILK INT, BEER INT, CHIPS INT)');
		alasql(
			'INSERT INTO pivoted SELECT * FROM Product PIVOT (SUM(QTY) FOR Product IN (VEG, SODA, MILK, BEER, CHIPS))'
		);

		var res = alasql(function () {
			/*
    SELECT *
    FROM pivoted
    UNPIVOT (QTY FOR Product IN (VEG, SODA, MILK, BEER, CHIPS))
  */
		});

		// Should have 10 rows (2 custs * 5 products)
		assert.equal(res.length, 10);
		// Check that all rows have Cust, Product, and QTY
		res.forEach(function (row) {
			assert(row.Cust);
			assert(row.Product);
			assert(row.hasOwnProperty('QTY'));
		});

		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test355');
		done();
	});
});
