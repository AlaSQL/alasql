if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var md5 = require('blueimp-md5').md5;
} else {
	__dirname = '.';
}

describe('Test 295 TestDatabase', function() {
	it.skip('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test295;USE test295');

		done();
	});

	// Taken from here
	// https://www3.ntu.edu.sg/home/ehchua/programming/sql/MySQL_Beginner.html

	it.skip('2. CREATE TABLES', function(done) {
		alasql(function() {
			/*

SHOW DATABASES;

CREATE DATABASE southwind;

DROP DATABASE southwind;

CREATE DATABASE IF NOT EXISTS southwind;

DROP DATABASE IF EXISTS southwind;

CREATE DATABASE IF NOT EXISTS southwind;

SHOW CREATE DATABASE southwind \G;

DROP DATABASE IF EXISTS southwind;

CREATE DATABASE southwind;

SHOW DATABASES;

USE southwind;

 SELECT DATABASE();

 SHOW TABLES;

 CREATE TABLE IF NOT EXISTS products (
         productID    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
         productCode  CHAR(3)       NOT NULL DEFAULT '',
         name         VARCHAR(30)   NOT NULL DEFAULT '',
         quantity     INT UNSIGNED  NOT NULL DEFAULT 0,
         price        DECIMAL(7,2)  NOT NULL DEFAULT 99999.99,
         PRIMARY KEY  (productID)
       );

       SHOW TABLES;

 DESCRIBE products;

 SHOW CREATE TABLE products \G;

 INSERT INTO products VALUES (1001, 'PEN', 'Pen Red', 5000, 1.23);

 INSERT INTO products VALUES
         (NULL, 'PEN', 'Pen Blue',  8000, 1.25),
         (NULL, 'PEN', 'Pen Black', 2000, 1.25);

INSERT INTO products (productCode, name, quantity, price) VALUES
         ('PEC', 'Pencil 2B', 10000, 0.48),
         ('PEC', 'Pencil 2H', 8000, 0.49);

 INSERT INTO products (productCode, name) VALUES ('PEC', 'Pencil HB');

 INSERT INTO products values (NULL, NULL, NULL, NULL, NULL);

 SELECT * FROM products;

 DELETE FROM products WHERE productID = 1006;

 SELECT name, price FROM products;

 SELECT * FROM products;

 SELECT 1+1;

  SELECT NOW();

  SELECT 1+1, NOW();

  SELECT name, price FROM products WHERE price < 1.0;

  SELECT name, quantity FROM products WHERE quantity <= 2000;

  SELECT name, price FROM products WHERE productCode = 'PEN';

  SELECT name, price FROM products WHERE name LIKE 'PENCIL%';

   SELECT name, price FROM products WHERE name LIKE 'P__ %';

   SELECT * FROM products WHERE quantity >= 5000 AND name LIKE 'Pen %';

   SELECT * FROM products WHERE quantity >= 5000 AND price < 1.24 AND name LIKE 'Pen %';

   SELECT * FROM products WHERE NOT (quantity >= 5000 AND name LIKE 'Pen %');

   SELECT * FROM products WHERE name IN ('Pen Red', 'Pen Black');

   SELECT * FROM products 
       WHERE (price BETWEEN 1.0 AND 2.0) AND (quantity BETWEEN 1000 AND 2000);

  SELECT * FROM products WHERE productCode IS NULL;                         

  SELECT * FROM products WHERE name LIKE 'Pen %' ORDER BY price DESC;

SELECT * FROM products WHERE name LIKE 'Pen %' ORDER BY price DESC, quantity;

SELECT * FROM products ORDER BY RAND();

SELECT * FROM products ORDER BY price LIMIT 2;

SELECT * FROM products ORDER BY price LIMIT 2, 1;

SELECT productID AS ID, productCode AS Code,
              name AS Description, price AS `Unit Price`  -- Define aliases to be used as display names
       FROM products
       ORDER BY ID;  -- Use alias ID as reference

SELECT CONCAT(productCode, ' - ', name) AS `Product Description`, price FROM products;

SELECT price FROM products;

SELECT DISTINCT price AS `Distinct Price` FROM products;

SELECT DISTINCT price, name FROM products;

SELECT * FROM products ORDER BY productCode, productID;

SELECT * FROM products GROUP BY productCode;

SELECT COUNT(*) AS `Count` FROM products;

SELECT productCode, COUNT(*) FROM products GROUP BY productCode;

SELECT productCode, COUNT(*) AS count 
       FROM products 
       GROUP BY productCode
       ORDER BY count DESC;

       SELECT MAX(price), MIN(price), AVG(price), STD(price), SUM(quantity)
       FROM products;

SELECT productCode, MAX(price) AS `Highest Price`, MIN(price) AS `Lowest Price`
       FROM products
       GROUP BY productCode;

       SELECT productCode, MAX(price), MIN(price),
              CAST(AVG(price) AS DECIMAL(7,2)) AS `Average`,
              CAST(STD(price) AS DECIMAL(7,2)) AS `Std Dev`,
              SUM(quantity)
       FROM products
       GROUP BY productCode;

SELECT
          productCode AS `Product Code`,
          COUNT(*) AS `Count`,
          CAST(AVG(price) AS DECIMAL(7,2)) AS `Average`
       FROM products 
       GROUP BY productCode
       HAVING Count >=3;

SELECT 
          productCode, 
          MAX(price), 
          MIN(price), 
          CAST(AVG(price) AS DECIMAL(7,2)) AS `Average`,
          SUM(quantity)
       FROM products
       GROUP BY productCode
       WITH ROLLUP;        -- Apply aggregate functions to all groups


UPDATE products SET price = price * 1.1;

SELECT * FROM products;

UPDATE products SET quantity = quantity - 100 WHERE name = 'Pen Red';

SELECT * FROM products WHERE name = 'Pen Red';

UPDATE products SET quantity = quantity + 50, price = 1.23 WHERE name = 'Pen Red';

 SELECT * FROM products WHERE name = 'Pen Red';

 DELETE FROM products WHERE name LIKE 'Pencil%';

  SELECT * FROM products;

  DELETE FROM products;

  SELECT * FROM products;


DELETE FROM products;
INSERT INTO products VALUES (2001, 'PEC', 'Pencil 3B', 500, 0.52),
                            (NULL, 'PEC', 'Pencil 4B', 200, 0.62),
                            (NULL, 'PEC', 'Pencil 5B', 100, 0.73),
                            (NULL, 'PEC', 'Pencil 6B', 500, 0.47);
SELECT * FROM products;


  */
		});
		done();
	});

	// Following

	// Taken from here
	// https://www3.ntu.edu.sg/home/ehchua/programming/sql/MySQL_Beginner.html

	it.skip('3. CREATE TABLES', function(done) {
		alasql(function() {
			/*

USE southwind;

DROP TABLE IF EXISTS suppliers;

 CREATE TABLE suppliers (
         supplierID  INT UNSIGNED  NOT NULL AUTO_INCREMENT, 
         name        VARCHAR(30)   NOT NULL DEFAULT '', 
         phone       CHAR(8)       NOT NULL DEFAULT '',
         PRIMARY KEY (supplierID)
       );

INSERT INTO suppliers VALUE
          (501, 'ABC Traders', '88881111'), 
          (502, 'XYZ Company', '88882222'), 
          (503, 'QQ Corp', '88883333');

SELECT * FROM suppliers;

ALTER TABLE products
       ADD COLUMN supplierID INT UNSIGNED NOT NULL;

DESCRIBE products;

UPDATE products SET supplierID = 501;

ALTER TABLE products
       ADD FOREIGN KEY (supplierID) REFERENCES suppliers (supplierID);

 DESCRIBE products;

 UPDATE products SET supplierID = 502 WHERE productID  = 2004;

SELECT * FROM products;

SELECT products.name, price, suppliers.name 
       FROM products 
          JOIN suppliers ON products.supplierID = suppliers.supplierID
       WHERE price < 0.6;

 SELECT products.name, price, suppliers.name 
       FROM products, suppliers 
       WHERE products.supplierID = suppliers.supplierID
          AND price < 0.6;

SELECT products.name AS `Product Name`, price, suppliers.name AS `Supplier Name` 
       FROM products 
          JOIN suppliers ON products.supplierID = suppliers.supplierID
       WHERE price < 0.6;

SELECT p.name AS `Product Name`, p.price, s.name AS `Supplier Name` 
       FROM products AS p 
          JOIN suppliers AS s ON p.supplierID = s.supplierID
       WHERE p.price < 0.6;

 CREATE TABLE products_suppliers (
         productID   INT UNSIGNED  NOT NULL,
         supplierID  INT UNSIGNED  NOT NULL,
                     -- Same data types as the parent tables
         PRIMARY KEY (productID, supplierID),
                     -- uniqueness
         FOREIGN KEY (productID)  REFERENCES products  (productID),
         FOREIGN KEY (supplierID) REFERENCES suppliers (supplierID)
       );

DESCRIBE products_suppliers;

INSERT INTO products_suppliers VALUES (2001, 501), (2002, 501),
       (2003, 501), (2004, 502), (2001, 503);

SELECT * FROM products_suppliers;

SHOW CREATE TABLE products \G;

ALTER TABLE products DROP FOREIGN KEY products_ibfk_1;

SHOW CREATE TABLE products \G;

ALTER TABLE products DROP supplierID;

DESC products;

SELECT products.name AS `Product Name`, price, suppliers.name AS `Supplier Name`
       FROM products_suppliers 
          JOIN products  ON products_suppliers.productID = products.productID
          JOIN suppliers ON products_suppliers.supplierID = suppliers.supplierID
       WHERE price < 0.6;

SELECT p.name AS `Product Name`, s.name AS `Supplier Name`
       FROM products_suppliers AS ps 
          JOIN products AS p ON ps.productID = p.productID
          JOIN suppliers AS s ON ps.supplierID = s.supplierID
       WHERE p.name = 'Pencil 3B';

SELECT p.name AS `Product Name`, s.name AS `Supplier Name`
       FROM products AS p, products_suppliers AS ps, suppliers AS s
       WHERE p.productID = ps.productID
          AND ps.supplierID = s.supplierID
          AND s.name = 'ABC Traders';

 CREATE TABLE product_details (
          productID  INT UNSIGNED   NOT NULL,
                     -- same data type as the parent table
          comment    TEXT  NULL,
                     -- up to 64KB
          PRIMARY KEY (productID),
          FOREIGN KEY (productID) REFERENCES products (productID)
       );

DESCRIBE product_details;

SHOW CREATE TABLE product_details \G

                                                                            



  */
		});
		done();
	});

	it.skip('4. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test295');
		done();
	});
});
