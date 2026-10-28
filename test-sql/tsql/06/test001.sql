---------------------------------------------------------------------
-- Inside Microsoft SQL Server 2008: T-SQL Querying (MSPress, 2009)
-- Chapter 06 - Subqueries, Table Expressions and Ranking Functions
-- Copyright Itzik Ben-Gan, 2009
-- All Rights Reserved
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Subqueries
---------------------------------------------------------------------

-- Scalar subquery
SET NOCOUNT ON;
USE InsideTSQL2008;

SELECT orderid, custid
FROM Sales.Orders
WHERE orderid = (SELECT MAX(orderid) FROM Sales.Orders);

-- Correlated subquery
SELECT orderid, custid
FROM Sales.Orders AS O1
WHERE orderid = (SELECT MAX(O2.orderid)
                 FROM Sales.Orders AS O2
                 WHERE O2.custid = O1.custid);

-- Multivalued subquery
SELECT custid, companyname
FROM Sales.Customers
WHERE custid IN (SELECT custid FROM Sales.Orders);

-- Table subquery
SELECT orderyear, MAX(orderid) AS max_orderid
FROM (SELECT orderid, YEAR(orderdate) AS orderyear
      FROM Sales.Orders) AS D
GROUP BY orderyear;

---------------------------------------------------------------------
-- Self-Contained Subqueries
---------------------------------------------------------------------

-- Scalar subquery example
SELECT orderid FROM Sales.Orders
WHERE empid = 
  (SELECT empid FROM HR.Employees
   -- also try with N'Kollar' and N'D%'
   WHERE lastname LIKE N'Davis');

-- Customers with orders handled by all employees from the USA
-- using literals
SELECT custid
FROM Sales.Orders
WHERE empid IN(1, 2, 3, 4, 8)
GROUP BY custid
HAVING COUNT(DISTINCT empid) = 5;

-- Customers with orders handled by all employees from the USA
-- using subqueries
SELECT custid
FROM Sales.Orders
WHERE empid IN
  (SELECT empid FROM HR.Employees
   WHERE country = N'USA')
GROUP BY custid
HAVING COUNT(DISTINCT empid) =
  (SELECT COUNT(*) FROM HR.Employees
   WHERE country = N'USA');

-- Orders placed on last actual order date of the month
SELECT orderid, custid, empid, orderdate
FROM Sales.Orders
WHERE orderdate IN
  (SELECT MAX(orderdate)
   FROM Sales.Orders
   GROUP BY YEAR(orderdate), MONTH(orderdate));
GO

---------------------------------------------------------------------
-- Correlated Subqueries
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Tiebreaker
---------------------------------------------------------------------

-- Index for tiebreaker problems
CREATE UNIQUE INDEX idx_eid_od_oid 
  ON Sales.Orders(empid, orderdate, orderid);
CREATE UNIQUE INDEX idx_eid_od_rd_oid 
  ON Sales.Orders(empid, orderdate, requireddate, orderid);
GO

-- Orders with the maximum orderdate for each employee
-- Incorrect solution
SELECT orderid, custid, empid, orderdate, requireddate 
FROM Sales.Orders
WHERE orderdate IN
  (SELECT MAX(orderdate) FROM Sales.Orders
   GROUP BY empid);

-- Orders with maximum orderdate for each employee
SELECT orderid, custid, empid, orderdate, requireddate 
FROM Sales.Orders AS O1
WHERE orderdate =
  (SELECT MAX(orderdate)
   FROM Sales.Orders AS O2
   WHERE O2.empid = O1.empid);

-- Most recent order for each employee
-- Tiebreaker: max order id
SELECT orderid, custid, empid, orderdate, requireddate 
FROM Sales.Orders AS O1
WHERE orderdate =
  (SELECT MAX(orderdate)
   FROM Sales.Orders AS O2
   WHERE O2.empid = O1.empid)
  AND orderid =
  (SELECT MAX(orderid)
   FROM Sales.Orders AS O2
   WHERE O2.empid = O1.empid
     AND O2.orderdate = O1.orderdate);

-- Most recent order for each employee, nesting subqueries
-- Tiebreaker: max order id
SELECT orderid, custid, empid, orderdate, requireddate 
FROM Sales.Orders AS O1
WHERE orderid = 
  (SELECT MAX(orderid)
   FROM Sales.Orders AS O2
   WHERE O2.empid = O1.empid
     AND O2.orderdate = 
       (SELECT MAX(orderdate)
        FROM Sales.Orders AS O3
        WHERE O3.empid = O1.empid));

-- Most recent order for each employee
-- Tiebreaker: max requireddate, max orderid
SELECT orderid, custid, empid, orderdate, requireddate 
FROM Sales.Orders AS O1
WHERE orderdate =
  (SELECT MAX(orderdate)
   FROM Sales.Orders AS O2
   WHERE O2.empid = O1.empid)
  AND requireddate =
  (SELECT MAX(requireddate)
   FROM Sales.Orders AS O2
   WHERE O2.empid = O1.empid
     AND O2.orderdate = O1.orderdate)
  AND orderid =
  (SELECT MAX(orderid)
   FROM Sales.Orders AS O2
   WHERE O2.empid = O1.empid
     AND O2.orderdate = O1.orderdate
     AND O2.requireddate = O1.requireddate);

-- Cleanup
DROP INDEX Sales.Orders.idx_eid_od_oid;
DROP INDEX Sales.Orders.idx_eid_od_rd_oid;
GO

---------------------------------------------------------------------
-- EXISTS
---------------------------------------------------------------------

-- Customers from Spain that made orders
-- Using EXISTS
SELECT custid, companyname
FROM Sales.Customers AS C
WHERE country = N'Spain'
  AND EXISTS
    (SELECT * FROM Sales.Orders AS O
     WHERE O.custid = C.custid);

---------------------------------------------------------------------
-- EXISTS vs. IN
---------------------------------------------------------------------

-- Customers from Spain that made orders
-- Using IN
SELECT custid, companyname
FROM Sales.Customers AS C
WHERE country = N'Spain'
  AND custid IN(SELECT custid FROM Sales.Orders);

---------------------------------------------------------------------
-- NOT EXISTS vs. NOT IN
---------------------------------------------------------------------

-- Customers from Spain who made no Orders
-- Using EXISTS
SELECT custid, companyname
FROM Sales.Customers AS C
WHERE country = N'Spain'
  AND NOT EXISTS
    (SELECT * FROM Sales.Orders AS O
     WHERE O.custid = C.custid);

-- Customers from Spain who made no Orders
-- Using IN, try 1
SELECT custid, companyname
FROM Sales.Customers AS C
WHERE country = N'Spain'
  AND custid NOT IN(SELECT custid FROM Sales.Orders);

-- Add a row to Orders with a NULL customer id
INSERT INTO Sales.Orders
  (custid, empid, orderdate, requireddate, shippeddate, shipperid,
   freight, shipname, shipaddress, shipcity, shipregion,
   shippostalcode, shipcountry)
  VALUES(NULL, 1, '20090212', '20090212',
         '20090212', 1, 123.00, N'abc', N'abc', N'abc',
         N'abc', N'abc', N'abc');

-- Customers from Spain that made no Orders
-- Using IN, try 2
SELECT custid, companyname
FROM Sales.Customers AS C
WHERE country = N'Spain'
  AND custid NOT IN(SELECT custid FROM Sales.Orders
                    WHERE custid IS NOT NULL);

-- Remove the row from Orders with the NULL customer id
DELETE FROM Sales.Orders WHERE custid IS NULL;
DBCC CHECKIDENT('Sales.Orders', RESEED, 11077);
GO

---------------------------------------------------------------------
-- Min missing value
---------------------------------------------------------------------

-- Listing 6-1: Creating and Populating the Table T1
USE tempdb;
GO
IF OBJECT_ID('dbo.T1') IS NOT NULL
  DROP TABLE dbo.T1;
GO

CREATE TABLE dbo.T1
(
  keycol  INT         NOT NULL PRIMARY KEY CHECK(keycol > 0),
  datacol VARCHAR(10) NOT NULL
);
INSERT INTO dbo.T1(keycol, datacol) VALUES
  (3, 'a'),
  (4, 'b'),
  (6, 'c'),
  (7, 'd');

-- Incomplete CASE expression for minimum missing value query
/*
SELECT
  CASE
    WHEN NOT EXISTS(SELECT * FROM dbo.T1 WHERE keycol = 1) THEN 1
    ELSE (...subquery returning minimum missing value...)
  END;
*/

-- Minimum missing value query
SELECT MIN(A.keycol) + 1 as missing
FROM dbo.T1 AS A
WHERE NOT EXISTS
  (SELECT * FROM dbo.T1 AS B
   WHERE B.keycol = A.keycol + 1);

-- Complete CASE expression for minimum missing value query
SELECT
  CASE
    WHEN NOT EXISTS(SELECT * FROM dbo.T1 WHERE keycol = 1) THEN 1
    ELSE (SELECT MIN(A.keycol) + 1
          FROM dbo.T1 AS A
          WHERE NOT EXISTS
            (SELECT * FROM dbo.T1 AS B
             WHERE B.keycol = A.keycol + 1))
  END;

-- Populating T1 with more rows
INSERT INTO dbo.T1(keycol, datacol) VALUES(1, 'e'),(2, 'f');

-- Embedding the CASE expression in an INSERT SELECT statement
INSERT INTO dbo.T1(keycol, datacol)
  SELECT 
    CASE
      WHEN NOT EXISTS(SELECT * FROM dbo.T1 WHERE keycol = 1) THEN 1
      ELSE (SELECT MIN(A.keycol) + 1
            FROM dbo.T1 AS A
            WHERE NOT EXISTS
              (SELECT * FROM dbo.T1 AS B
               WHERE B.keycol = A.keycol + 1))
    END,
    'g';

-- Examining the content of T1 after the INSERT
SELECT * FROM dbo.T1;

-- Merging the two cases into one query
SELECT COALESCE(MIN(A.keycol) + 1, 1)
FROM dbo.T1 AS A
WHERE
  NOT EXISTS(
    SELECT * FROM dbo.T1 AS B
    WHERE B.keycol= A.keycol + 1)
  AND  EXISTS(
    SELECT * FROM dbo.T1
    WHERE keycol = 1);
GO

---------------------------------------------------------------------
-- Reverse Logic applied to Relational Division Problems
---------------------------------------------------------------------

-- Return all customers with orders handled by all employees from the USA
USE InsideTSQL2008;

SELECT custid FROM Sales.Customers AS C
WHERE NOT EXISTS
  (SELECT * FROM HR.Employees AS E
   WHERE country = N'USA'
     AND NOT EXISTS
       (SELECT * FROM Sales.Orders AS O
        WHERE O.custid = C.custid
          AND O.empid = E.empid));
GO

---------------------------------------------------------------------
-- Misbehaving Subqueries
---------------------------------------------------------------------

-- Create and populate table Sales.MyShippers
IF OBJECT_ID('Sales.MyShippers', 'U') IS NOT NULL
  DROP TABLE Sales.MyShippers;

CREATE TABLE Sales.MyShippers
(
  shipper_id  INT          NOT NULL,
  companyname NVARCHAR(40) NOT NULL,
  phone       NVARCHAR(24) NOT NULL,
  CONSTRAINT PK_MyShippers PRIMARY KEY(shipper_id)
);

INSERT INTO Sales.MyShippers(shipper_id, companyname, phone)
  VALUES(1, N'Shipper GVSUA', N'(503) 555-0137'),
        (2, N'Shipper ETYNR', N'(425) 555-0136'),
        (3, N'Shipper ZHISN', N'(415) 555-0138');

-- Shippers that did not ship orders to customer 43
-- Bug
SELECT shipper_id, companyname
FROM Sales.MyShippers
WHERE shipper_id NOT IN
  (SELECT shipper_id FROM Sales.Orders
   WHERE custid = 43);

-- Bug apparent when explictly specifying aliases
SELECT shipper_id, companyname
FROM Sales.MyShippers AS S
WHERE shipper_id NOT IN
  (SELECT S.shipper_id FROM Sales.Orders AS O
   WHERE O.custid = 43);

-- Logically equivalent non-existence query
SELECT shipper_id, companyname
FROM Sales.MyShippers
WHERE NOT EXISTS
  (SELECT * FROM Sales.Orders
   WHERE custid = 43);

-- Bug corrected
SELECT shipper_id, companyname
FROM Sales.MyShippers AS S
WHERE shipper_id NOT IN
  (SELECT shipperid FROM Sales.Orders AS O
   WHERE custid = 43);
GO

-- The safe way using aliases, bug identified
SELECT shipper_id, companyname
FROM Sales.MyShippers AS S
WHERE shipper_id NOT IN
  (SELECT O.shipper_id FROM Sales.Orders AS O
   WHERE O.custid = 43);
GO

-- The safe way using aliases, bug corrected
SELECT shipper_id, companyname
FROM Sales.MyShippers AS S
WHERE shipper_id NOT IN
  (SELECT O.shipperid FROM Sales.Orders AS O
   WHERE O.custid = 43);
GO

-- Cleanup
IF OBJECT_ID('Sales.MyShippers', 'U') IS NOT NULL
  DROP TABLE Sales.MyShippers;
GO

---------------------------------------------------------------------
-- Uncommon Predicates
---------------------------------------------------------------------

-- Order with minimum order id for each employee
-- ANY
SELECT orderid, custid, empid, orderdate
FROM Sales.Orders AS O1
WHERE NOT orderid >
  ANY(SELECT orderid
      FROM Sales.Orders AS O2
      WHERE O2.empid = O1.empid);

-- ALL
SELECT orderid, custid, empid, orderdate
FROM Sales.Orders AS O1
WHERE orderid <=
  ALL(SELECT orderid
      FROM Sales.Orders AS O2
      WHERE O2.empid = O1.empid);

-- The Natural Way
SELECT orderid, custid, empid, orderdate
FROM Sales.Orders AS O1
WHERE orderid =
  (SELECT MIN(orderid)
   FROM Sales.Orders AS O2
   WHERE O2.empid = O1.empid);
GO

---------------------------------------------------------------------
-- Table Expressions
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Derived Tables
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Column Aliases
---------------------------------------------------------------------

-- Following fails
SELECT
  YEAR(orderdate) AS orderyear,
  COUNT(DISTINCT custid) AS numcusts
FROM Sales.Orders
GROUP BY orderyear;
GO

-- Inline column aliasing
SELECT orderyear, COUNT(DISTINCT custid) AS numcusts
FROM (SELECT YEAR(orderdate) AS orderyear, custid
      FROM Sales.Orders) AS D
GROUP BY orderyear;

-- External column aliasing
SELECT orderyear, COUNT(DISTINCT custid) AS numcusts
FROM (SELECT YEAR(orderdate), custid
      FROM Sales.Orders) AS D(orderyear, custid)
GROUP BY orderyear;
GO

---------------------------------------------------------------------
-- Using Arguments
---------------------------------------------------------------------

-- Yearly Count of Customers handled by Employee 3
DECLARE @empid AS INT = 3; -- use separate DECLARE and SET prior to 2008

SELECT orderyear, COUNT(DISTINCT custid) AS numcusts
FROM (SELECT YEAR(orderdate) AS orderyear, custid
      FROM Sales.Orders
      WHERE empid = @empid) AS D
GROUP BY orderyear;
GO

---------------------------------------------------------------------
-- Nesting
---------------------------------------------------------------------

-- Order Years and Number of Customers for Years with more than
-- 70 Active Customers
SELECT orderyear, numcusts
FROM (SELECT orderyear, COUNT(DISTINCT custid) AS numcusts
      FROM (SELECT YEAR(orderdate) AS orderyear, custid
            FROM Sales.Orders) AS D1
      GROUP BY orderyear) AS D2
WHERE numcusts > 70;

---------------------------------------------------------------------
-- Multiple References
---------------------------------------------------------------------

-- Comparing Current to Previous Year’s Number of Customers
SELECT Cur.orderyear, 
  Cur.numcusts AS curnumcusts, Prv.numcusts AS prvnumcusts,
  Cur.numcusts - Prv.numcusts AS growth
FROM (SELECT YEAR(orderdate) AS orderyear,
        COUNT(DISTINCT custid) AS numcusts
      FROM Sales.Orders
      GROUP BY YEAR(orderdate)) AS Cur
  LEFT OUTER JOIN
     (SELECT YEAR(orderdate) AS orderyear,
        COUNT(DISTINCT custid) AS numcusts
      FROM Sales.Orders
      GROUP BY YEAR(orderdate)) AS Prv
    ON Cur.orderyear = Prv.orderyear + 1;
GO

---------------------------------------------------------------------
-- Common Table Expressions (CTE)
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Reusing Aliases
---------------------------------------------------------------------

-- Inline column aliasing
WITH C AS
(
  SELECT YEAR(orderdate) AS orderyear, custid
  FROM Sales.Orders
)
SELECT orderyear, COUNT(DISTINCT custid) AS numcusts
FROM C
GROUP BY orderyear;

-- External column aliasing
WITH C(orderyear, custid) AS
(
  SELECT YEAR(orderdate), custid
  FROM Sales.Orders
)
SELECT orderyear, COUNT(DISTINCT custid) AS numcusts
FROM C
GROUP BY orderyear;
GO

---------------------------------------------------------------------
-- Using Arguments
---------------------------------------------------------------------

-- Using arguments
DECLARE @empid AS INT = 3;

WITH C AS
(
  SELECT YEAR(orderdate) AS orderyear, custid
  FROM Sales.Orders
  WHERE empid = @empid
)
SELECT orderyear, COUNT(DISTINCT custid) AS numcusts
FROM C
GROUP BY orderyear;
GO

---------------------------------------------------------------------
-- Multiple CTEs
---------------------------------------------------------------------

-- Defining multiple CTEs
WITH C1 AS
(
  SELECT YEAR(orderdate) AS orderyear, custid
  FROM Sales.Orders
),
C2 AS
(
  SELECT orderyear, COUNT(DISTINCT custid) AS numcusts
  FROM C1
  GROUP BY orderyear
)
SELECT orderyear, numcusts
FROM C2
WHERE numcusts > 70;

---------------------------------------------------------------------
-- Multiple References
---------------------------------------------------------------------

-- Multiple references
WITH YearlyCount AS
(
  SELECT YEAR(orderdate) AS orderyear,
    COUNT(DISTINCT custid) AS numcusts
  FROM Sales.Orders
  GROUP BY YEAR(orderdate)
)
SELECT Cur.orderyear, 
  Cur.numcusts AS curnumcusts, Prv.numcusts AS prvnumcusts,
  Cur.numcusts - Prv.numcusts AS growth
FROM YearlyCount AS Cur
  LEFT OUTER JOIN YearlyCount AS Prv
    ON Cur.orderyear = Prv.orderyear + 1;
GO

---------------------------------------------------------------------
-- Modifying Data
---------------------------------------------------------------------

-- Listing 6-2: Creating and Populating the CustomersDups Table
IF OBJECT_ID('Sales.CustomersDups') IS NOT NULL
  DROP TABLE Sales.CustomersDups;
GO

SELECT 
  custid, companyname, contactname, contacttitle, address,
  city, region, postalcode, country, phone, fax
INTO Sales.CustomersDups
FROM Sales.Customers CROSS JOIN (VALUES(1),(2),(3)) AS Nums(n);

-- Modifying data through CTEs
WITH CustsDupsRN AS
(
  SELECT *,
    ROW_NUMBER() OVER(PARTITION BY custid ORDER BY (SELECT 0)) AS rn
  FROM Sales.CustomersDups
)
DELETE FROM CustsDupsRN
WHERE rn > 1;
GO

-- Modifying data through CTEs
DELETE FROM CustsDupsRN
FROM ( SELECT *,
         ROW_NUMBER() OVER(PARTITION BY custid ORDER BY (SELECT 0)) AS rn
       FROM Sales.CustomersDups ) AS CustsDupsRN
WHERE rn > 1;

---------------------------------------------------------------------
-- CTEs in View and Inline Function Definitions
---------------------------------------------------------------------

-- View with CTE
IF OBJECT_ID('dbo.YearCustCount') IS NOT NULL
  DROP VIEW dbo.YearCustCount;
GO
CREATE VIEW dbo.YearCustCount
AS
WITH CYearCustCount AS
(
  SELECT YEAR(orderdate) AS orderyear,
    COUNT(DISTINCT custid) AS numcusts
  FROM Sales.Orders
  GROUP BY YEAR(orderdate)
)
SELECT * FROM CYearCustCount;
GO

-- Querying view with CTE
SELECT * FROM dbo.YearCustCount;
GO

-- UDF with CTE
IF OBJECT_ID('dbo.EmpYearCustCnt') IS NOT NULL
  DROP FUNCTION dbo.EmpYearCustCnt;
GO
CREATE FUNCTION dbo.EmpYearCustCnt(@empid AS INT) RETURNS TABLE
AS
RETURN
  WITH CEmpYearCustCnt AS
  (
    SELECT YEAR(orderdate) AS orderyear,
      COUNT(DISTINCT custid) AS numcusts
    FROM Sales.Orders
    WHERE empid = @empid
    GROUP BY YEAR(orderdate)
  )
  SELECT * FROM CEmpYearCustCnt;
GO

-- Querying UDF with CTE
SELECT * FROM dbo.EmpYearCustCnt(3) AS T;
GO

---------------------------------------------------------------------
-- Recursive CTEs
---------------------------------------------------------------------

-- Create index for recursive CTE
CREATE UNIQUE INDEX idx_mgr_emp_i_fname_lname
  ON HR.Employees(mgrid, empid)
  INCLUDE(firstname, lastname);

-- Recursive CTE returning subordinates of employee 2 in all levels
WITH Emps AS
(
  SELECT empid, mgrid, firstname, lastname
  FROM HR.Employees
  WHERE empid = 5

  UNION ALL

  SELECT Emp.empid, Emp.mgrid, Emp.firstname, Emp.lastname
  FROM Emps AS Mgr
    JOIN HR.Employees AS Emp
      ON Emp.mgrid = Mgr.empid
)
SELECT * FROM Emps;

-- Cleanup
DROP INDEX HR.Employees.idx_mgr_emp_i_fname_lname;

---------------------------------------------------------------------
-- Analytical Ranking Functions
---------------------------------------------------------------------

-- Creating and Populating the Sales Table
SET NOCOUNT ON;
USE tempdb;
GO
IF OBJECT_ID('dbo.Sales') IS NOT NULL
  DROP TABLE dbo.Sales;
GO

CREATE TABLE dbo.Sales
(
  empid VARCHAR(10) NOT NULL PRIMARY KEY,
  mgrid VARCHAR(10) NOT NULL,
  qty   INT         NOT NULL
);

INSERT INTO dbo.Sales(empid, mgrid, qty) VALUES
  ('A', 'Z', 300),
  ('B', 'X', 100),
  ('C', 'X', 200),
  ('D', 'Y', 200),
  ('E', 'Z', 250),
  ('F', 'Z', 300),
  ('G', 'X', 100),
  ('H', 'Y', 150),
  ('I', 'X', 250),
  ('J', 'Z', 100),
  ('K', 'Y', 200);

CREATE INDEX idx_qty_empid ON dbo.Sales(qty, empid);
CREATE INDEX idx_mgrid_qty_empid ON dbo.Sales(mgrid, qty, empid);
GO

-- Querying the Sales table
SELECT * FROM dbo.Sales;

---------------------------------------------------------------------
-- Row Number
---------------------------------------------------------------------

---------------------------------------------------------------------
-- ROW_NUMBER Function
---------------------------------------------------------------------

-- Row number
SELECT empid, qty,
  ROW_NUMBER() OVER(ORDER BY qty) AS rownum
FROM dbo.Sales
ORDER BY qty;

---------------------------------------------------------------------
-- Determinism
---------------------------------------------------------------------

-- Row number, determinism
SELECT empid, qty,
  ROW_NUMBER() OVER(ORDER BY qty)        AS nd_rownum,
  ROW_NUMBER() OVER(ORDER BY qty, empid) AS d_rownum
FROM dbo.Sales
ORDER BY qty, empid;

---------------------------------------------------------------------
-- Partitioning
---------------------------------------------------------------------

-- Row number, partitioned
SELECT mgrid, empid, qty,
  ROW_NUMBER() OVER(PARTITION BY mgrid ORDER BY qty, empid) AS rownum
FROM dbo.Sales
ORDER BY mgrid, qty, empid;

---------------------------------------------------------------------
-- Using Subqueries
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Unique Sort Column
---------------------------------------------------------------------

-- Row number, unique sort column
SELECT empid,
  (SELECT COUNT(*)
   FROM dbo.Sales AS S2
   WHERE S2.empid <= S1.empid) AS rownum
FROM dbo.Sales AS S1
ORDER BY empid;

---------------------------------------------------------------------
-- Non-Unique Sort Column and Tiebreaker
---------------------------------------------------------------------

-- Row number, non-unique sort column and tiebreaker
SELECT empid, qty,
  (SELECT COUNT(*)
   FROM dbo.Sales AS S2
   WHERE S2.qty < S1.qty
      OR (S2.qty = S1.qty AND S2.empid <= S1.empid)) AS rownum
FROM dbo.Sales AS S1
ORDER BY qty, empid;
GO

---------------------------------------------------------------------
-- Non-Unique Sort Column without a Tiebreaker
---------------------------------------------------------------------

-- Creating and Populating the T2 Table
IF OBJECT_ID('dbo.T2') IS NOT NULL
  DROP TABLE dbo.T2;
GO
CREATE TABLE dbo.T2(col1 VARCHAR(5));
INSERT INTO dbo.T2(col1) VALUES
  ('A'),('A'),('A'),('B'),('B'),('C'),('C'),('C'),('C'),('C');
GO

-- Row number, non-unique sort column, no tiebreaker, step 1
SELECT col1, COUNT(*) AS cnt,
  (SELECT COUNT(*) FROM dbo.T2 AS B
   WHERE B.col1 < A.col1) AS smaller
FROM dbo.T2 AS A
GROUP BY col1;

-- Row number, non-unique sort column, no tiebreaker, step 2
WITH C AS
(
  SELECT col1, COUNT(*) AS cnt,
    (SELECT COUNT(*) FROM dbo.T2 AS B
     WHERE B.col1 < A.col1) AS smaller
  FROM dbo.T2 AS A
  GROUP BY col1
)
SELECT col1, cnt, smaller, n
FROM C CROSS JOIN Nums
WHERE n <= cnt;

-- Row number, non-unique sort column, no tiebreaker, final
WITH C AS
(
  SELECT col1, COUNT(*) AS cnt,
    (SELECT COUNT(*) FROM dbo.T2 AS B
     WHERE B.col1 < A.col1) AS smaller
  FROM dbo.T2 AS A
  GROUP BY col1
)
SELECT n + smaller AS rownum, col1
FROM C CROSS JOIN Nums
WHERE n <= cnt;

---------------------------------------------------------------------
-- Partitioning 
---------------------------------------------------------------------

-- Row number, partitioned
SELECT mgrid, empid, qty,
  (SELECT COUNT(*)
   FROM dbo.Sales AS S2
   WHERE S2.mgrid = S1.mgrid
     AND (S2.qty < S1.qty
          OR (S2.qty = S1.qty AND S2.empid <= S1.empid))) AS rownum
FROM dbo.Sales AS S1
ORDER BY mgrid, qty, empid;

---------------------------------------------------------------------
-- Cursor-Based
---------------------------------------------------------------------

-- Calculating Row Numbers with a Cursor
DECLARE @SalesRN TABLE(empid VARCHAR(5), qty INT, rn INT);
DECLARE @empid AS VARCHAR(5), @qty AS INT, @rn AS INT;

DECLARE rncursor CURSOR FAST_FORWARD FOR
  SELECT empid, qty FROM dbo.Sales ORDER BY qty, empid;
OPEN rncursor;

SET @rn = 0;

FETCH NEXT FROM rncursor INTO @empid, @qty;
WHILE @@FETCH_STATUS = 0
BEGIN
  SET @rn = @rn + 1;
  INSERT INTO @SalesRN(empid, qty, rn) VALUES(@empid, @qty, @rn);
  FETCH NEXT FROM rncursor INTO @empid, @qty;
END

CLOSE rncursor;
DEALLOCATE rncursor;

SELECT empid, qty, rn FROM @SalesRN;
GO

---------------------------------------------------------------------
-- IDENTITY-Based
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Non-Partitioned
---------------------------------------------------------------------

-- Calculating row number with IDENTITY, non-guaranteed order
SELECT empid, qty, IDENTITY(int, 1, 1) AS rn
INTO #SalesRN FROM dbo.Sales
ORDER BY qty, empid;

SELECT * FROM #SalesRN;

DROP TABLE #SalesRN;
GO

-- Calculating row number with IDENTITY, guaranteed order
CREATE TABLE #SalesRN(empid VARCHAR(5), qty INT, rn INT IDENTITY);

INSERT INTO #SalesRN(empid, qty)
  SELECT empid, qty FROM dbo.Sales ORDER BY qty, empid;

SELECT * FROM #SalesRN;

DROP TABLE #SalesRN;
GO

---------------------------------------------------------------------
-- Partitioned
---------------------------------------------------------------------

-- Calculating Partitioned Row Numbers with a IDENTITY
CREATE TABLE #SalesRN
  (mgrid VARCHAR(5), empid VARCHAR(5), qty INT, rn INT IDENTITY);
CREATE UNIQUE CLUSTERED INDEX idx_mgrid_rn ON #SalesRN(mgrid, rn);

INSERT INTO #SalesRN(mgrid, empid, qty)
  SELECT mgrid, empid, qty FROM dbo.Sales ORDER BY mgrid, qty, empid;

-- Option 1 – using a subquery
SELECT mgrid, empid, qty,
  rn - (SELECT MIN(rn) FROM #SalesRN AS S2
        WHERE S2.mgrid = S1.mgrid) + 1 AS rn
FROM #SalesRN AS S1;

-- Option 2 – using a join
SELECT S.mgrid, empid, qty, rn - minrn + 1 AS rn
FROM #SalesRN AS S
  JOIN (SELECT mgrid, MIN(rn) AS minrn
        FROM #SalesRN
        GROUP BY mgrid) AS M
    ON S.mgrid = M.mgrid;

DROP TABLE #SalesRN;
GO

---------------------------------------------------------------------
-- Performance Comparisons
---------------------------------------------------------------------

-- Benchmark Comparing Techniques to Calculate Row Numbers

-- Change Tools|Options setting to Discard Query Results
SET NOCOUNT ON;
USE tempdb;
GO
IF OBJECT_ID('dbo.RNBenchmark') IS NOT NULL
  DROP TABLE dbo.RNBenchmark;
GO
IF OBJECT_ID('dbo.RNTechniques') IS NOT NULL
  DROP TABLE dbo.RNTechniques;
GO
IF OBJECT_ID('dbo.SalesBM') IS NOT NULL
  DROP TABLE dbo.SalesBM;
GO
IF OBJECT_ID('dbo.SalesBMIdentity') IS NOT NULL
  DROP TABLE dbo.SalesBMIdentity;
GO
IF OBJECT_ID('dbo.SalesBMCursor') IS NOT NULL
  DROP TABLE dbo.SalesBMCursor;
GO

CREATE TABLE dbo.RNTechniques
(
  tid INT NOT NULL PRIMARY KEY,
  technique VARCHAR(25) NOT NULL
);
INSERT INTO RNTechniques(tid, technique) VALUES
  (1, 'Subquery'),(2, 'IDENTITY'),(3, 'Cursor'),(4, 'ROW_NUMBER');
GO

CREATE TABLE dbo.RNBenchmark
(
  tid        INT    NOT NULL REFERENCES dbo.RNTechniques(tid),
  numrows    INT    NOT NULL,
  runtimemcs BIGINT NOT NULL,
  PRIMARY KEY(tid, numrows)
);
GO

CREATE TABLE dbo.SalesBM
(
  empid INT NOT NULL IDENTITY PRIMARY KEY,
  qty   INT NOT NULL
);
CREATE INDEX idx_qty_empid ON dbo.SalesBM(qty, empid);
GO
CREATE TABLE dbo.SalesBMIdentity(empid INT, qty INT, rn INT IDENTITY);
GO
CREATE TABLE dbo.SalesBMCursor(empid INT, qty INT, rn INT);
GO

DECLARE
  @maxnumrows    AS INT,
  @steprows      AS INT,
  @curnumrows    AS INT,
  @dt            AS DATETIME2; -- use DATETIME prior to 2008

SET @maxnumrows    = 100000;
SET @steprows      = 10000;
SET @curnumrows    = 10000;

WHILE @curnumrows <= @maxnumrows
BEGIN

  TRUNCATE TABLE dbo.SalesBM;
  INSERT INTO dbo.SalesBM(qty)
    SELECT CAST(1+999.9999999999*RAND(CHECKSUM(NEWID())) AS INT)
    FROM dbo.Nums
    WHERE n <= @curnumrows;

  -- 'Subquery'
  
  DBCC FREEPROCCACHE WITH NO_INFOMSGS;
  DBCC DROPCLEANBUFFERS WITH NO_INFOMSGS;

  SET @dt = SYSDATETIME(); -- use GETDATE() prior to 2008

  SELECT empid, qty,
    (SELECT COUNT(*)
     FROM dbo.SalesBM AS S2
     WHERE S2.qty < S1.qty
         OR (S2.qty = S1.qty AND S2.empid <= S1.empid)) AS rn
  FROM dbo.SalesBM AS S1
  ORDER BY qty, empid;

  INSERT INTO dbo.RNBenchmark(tid, numrows, runtimemcs)
    VALUES(1, @curnumrows, DATEDIFF(mcs, @dt, SYSDATETIME()));
                                    -- Use ms prior to 2008

  -- 'IDENTITY'
  
  TRUNCATE TABLE dbo.SalesBMIdentity;

  DBCC FREEPROCCACHE WITH NO_INFOMSGS;
  DBCC DROPCLEANBUFFERS WITH NO_INFOMSGS;

  SET @dt = SYSDATETIME();

  INSERT INTO dbo.SalesBMIdentity(empid, qty)
    SELECT empid, qty FROM dbo.SalesBM ORDER BY qty, empid;

  SELECT empid, qty, rn FROM dbo.SalesBMIdentity;

  INSERT INTO dbo.RNBenchmark(tid, numrows, runtimemcs)
    VALUES(2, @curnumrows, DATEDIFF(mcs, @dt, SYSDATETIME()));

  -- 'Cursor'

  TRUNCATE TABLE dbo.SalesBMCursor;

  DBCC FREEPROCCACHE WITH NO_INFOMSGS;
  DBCC DROPCLEANBUFFERS WITH NO_INFOMSGS;

  SET @dt = SYSDATETIME();

  DECLARE @empid AS INT, @qty AS INT, @rn AS INT;

  BEGIN TRAN

  DECLARE rncursor CURSOR FAST_FORWARD FOR
    SELECT empid, qty FROM dbo.SalesBM ORDER BY qty, empid;
  OPEN rncursor;

  SET @rn = 0;

  FETCH NEXT FROM rncursor INTO @empid, @qty;
  WHILE @@fetch_status = 0
  BEGIN
    SET @rn = @rn + 1;
    INSERT INTO dbo.SalesBMCursor(empid, qty, rn)
      VALUES(@empid, @qty, @rn);
    FETCH NEXT FROM rncursor INTO @empid, @qty;
  END

  CLOSE rncursor;
  DEALLOCATE rncursor;

  COMMIT TRAN

  SELECT empid, qty, rn FROM dbo.SalesBMCursor;

  INSERT INTO dbo.RNBenchmark(tid, numrows, runtimemcs)
    VALUES(3, @curnumrows, DATEDIFF(mcs, @dt, SYSDATETIME()));

  -- 'ROW_NUMBER'

  DBCC FREEPROCCACHE WITH NO_INFOMSGS;
  DBCC DROPCLEANBUFFERS WITH NO_INFOMSGS;

  SET @dt = SYSDATETIME();

  SELECT empid, qty, ROW_NUMBER() OVER(ORDER BY qty, empid) AS rn
  FROM dbo.SalesBM;

  INSERT INTO dbo.RNBenchmark(tid, numrows, runtimemcs)
    VALUES(4, @curnumrows, DATEDIFF(mcs, @dt, SYSDATETIME()));

  SET @curnumrows = @curnumrows + @steprows;

END
GO

-- Query Benchmark Results
SELECT numrows,
  [Subquery], [IDENTITY], [Cursor], [ROW_NUMBER]
FROM (SELECT technique, numrows, runtimemcs
      FROM dbo.RNBenchmark AS B
        JOIN dbo.RNTechniques AS T
          ON B.tid = T.tid) AS D
PIVOT(MAX(runtimemcs) FOR technique IN(
  [Subquery], [IDENTITY], [Cursor], [ROW_NUMBER])) AS P
ORDER BY numrows;
GO

---------------------------------------------------------------------
-- Paging
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Ad-hoc
---------------------------------------------------------------------

-- Second Page of Sales based on qty, empid Order
-- with a page size of 5 rows
DECLARE @pagesize AS INT, @pagenum AS INT;
SET @pagesize = 5;
SET @pagenum = 2;

WITH SalesRN AS
(
  SELECT ROW_NUMBER() OVER(ORDER BY qty, empid) AS rownum,
    empid, mgrid, qty
  FROM dbo.Sales
)
SELECT rownum, empid, mgrid, qty
FROM SalesRN
WHERE rownum > @pagesize * (@pagenum-1)
  AND rownum <= @pagesize * @pagenum
ORDER BY rownum;
GO

---------------------------------------------------------------------
-- Multi Page Access
---------------------------------------------------------------------

-- Creating a table with row numbers
IF OBJECT_ID('tempdb..#SalesRN') IS NOT NULL
  DROP TABLE #SalesRN;
GO
SELECT ROW_NUMBER() OVER(ORDER BY qty, empid) AS rownum,
  empid, mgrid, qty
INTO #SalesRN
FROM dbo.Sales;

CREATE UNIQUE CLUSTERED INDEX idx_rn ON #SalesRN(rownum);
GO

-- Run for each page request
DECLARE @pagesize AS INT, @pagenum AS INT;
SET @pagesize = 5;
SET @pagenum = 2;

SELECT rownum, empid, mgrid, qty
FROM #SalesRN
WHERE rownum BETWEEN @pagesize * (@pagenum-1) + 1
                 AND @pagesize * @pagenum
ORDER BY rownum;
GO

-- Cleanup
DROP TABLE #SalesRN;
GO

---------------------------------------------------------------------
-- Rank and Dense Rank
---------------------------------------------------------------------

---------------------------------------------------------------------
-- RANK and DENSE_RANK Functions
---------------------------------------------------------------------

-- Rank and dense rank
SELECT empid, qty,
  RANK() OVER(ORDER BY qty) AS rnk,
  DENSE_RANK() OVER(ORDER BY qty) AS drnk
FROM dbo.Sales
ORDER BY qty;

---------------------------------------------------------------------
-- Using Subqueries
---------------------------------------------------------------------

-- Rank and dense rank
SELECT empid, qty,
  (SELECT COUNT(*) FROM dbo.Sales AS S2
   WHERE S2.qty < S1.qty) + 1 AS rnk,
  (SELECT COUNT(DISTINCT qty) FROM dbo.Sales AS S2
   WHERE S2.qty < S1.qty) + 1 AS drnk
FROM dbo.Sales AS S1
ORDER BY qty;

---------------------------------------------------------------------
-- NTILE
---------------------------------------------------------------------

---------------------------------------------------------------------
-- NTILE Function
---------------------------------------------------------------------

-- NTILE
SELECT empid, qty,
  NTILE(3) OVER(ORDER BY qty, empid) AS tile
FROM dbo.Sales
ORDER BY qty, empid;

-- Descriptive Tiles
SELECT empid, qty,
  CASE NTILE(3) OVER(ORDER BY qty, empid)
    WHEN 1 THEN 'low'
    WHEN 2 THEN 'meduim'
    WHEN 3 THEN 'high'
  END AS lvl
FROM dbo.Sales
ORDER BY qty, empid;

-- Ranges of Quantities Corresponding to each Category
WITH Tiles AS
(
  SELECT empid, qty,
    NTILE(3) OVER(ORDER BY qty, empid) AS tile
  FROM dbo.Sales
)
SELECT tile, MIN(qty) AS lb, MAX(qty) AS hb
FROM Tiles
GROUP BY tile
ORDER BY tile;

---------------------------------------------------------------------
-- Other Solutions to NTILE
---------------------------------------------------------------------

-- NTILE, even Distribution of Remainder
DECLARE @numtiles AS INT;
SET @numtiles = 3;

WITH D1 AS
(
  SELECT empid, qty,
    ROW_NUMBER() OVER(ORDER BY qty, empid) AS rn,
    (SELECT COUNT(*) FROM dbo.Sales) AS numrows
  FROM dbo.Sales AS S1
),
D2 AS
(
  SELECT empid, qty, rn,
    1.*numrows/@numtiles AS tilesize
  FROM D1
)
SELECT empid, qty, 
  CAST((rn - 1) / tilesize + 1 AS INT) AS tile
FROM D2
ORDER BY qty, empid;
GO

-- NTILE, using subqueries, remainder added to first groups
DECLARE @numtiles AS INT;
SET @numtiles = 9;

WITH D1 AS
(
  SELECT empid, qty,
    (SELECT COUNT(*) FROM dbo.Sales AS S2
      WHERE S2.qty < S1.qty
        OR S2.qty = S1.qty
            AND S2.empid <= S1.empid) AS rn,
    (SELECT COUNT(*) FROM dbo.Sales) AS numrows
  FROM dbo.Sales AS S1
),
D2 AS
(
  SELECT empid, qty, rn,
    numrows/@numtiles AS tilesize,
    numrows%@numtiles AS remainder
  FROM D1
)
SELECT empid, qty, 
  CASE 
    WHEN rn <= (tilesize+1) * remainder
      THEN (rn-1) / (tilesize+1) + 1
    ELSE (rn - remainder - 1) / tilesize + 1
  END AS tile
FROM D2
ORDER BY qty, empid;
GO

---------------------------------------------------------------------
-- Auxiliary Table of Numbers
---------------------------------------------------------------------

-- Listing 6-3: Creating and Populating Auxiliary Table of Numbers
SET NOCOUNT ON;
USE InsideTSQL2008;

IF OBJECT_ID('dbo.Nums') IS NOT NULL DROP TABLE dbo.Nums;

CREATE TABLE dbo.Nums(n INT NOT NULL PRIMARY KEY);
DECLARE @max AS INT, @rc AS INT;
SET @max = 1000000;
SET @rc = 1;

INSERT INTO Nums VALUES(1);
WHILE @rc * 2 <= @max
BEGIN
  INSERT INTO dbo.Nums SELECT n + @rc FROM dbo.Nums;
  SET @rc = @rc * 2;
END

INSERT INTO dbo.Nums 
  SELECT n + @rc FROM dbo.Nums WHERE n + @rc <= @max;
GO

-- Synonyms
USE model;
CREATE SYNONYM dbo.Nums FOR InsideTSQL2008.dbo.Nums;
GO

-- Naive Solution Returning an Auxiliary Table of Numbers
DECLARE @n AS BIGINT;
SET @n = 1000000;

WITH Nums AS
(
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM Nums WHERE n < @n
)
SELECT n FROM Nums
OPTION(MAXRECURSION 0);
GO

-- Optimized Solution 1
DECLARE @n AS BIGINT = 1000000;

WITH Base AS
(
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM Base WHERE n < CEILING(SQRT(@n))
),
Nums AS
(
  SELECT ROW_NUMBER() OVER(ORDER BY (SELECT 0)) AS n
  FROM Base AS B1
    CROSS JOIN Base AS B2
)
SELECT n FROM Nums WHERE n <= @n
OPTION(MAXRECURSION 0);
GO

-- Optimized Solution 2
DECLARE @n AS BIGINT = 1000000;

WITH
L0   AS(SELECT 1 AS c UNION ALL SELECT 1),
L1   AS(SELECT 1 AS c FROM L0 AS A CROSS JOIN L0 AS B),
L2   AS(SELECT 1 AS c FROM L1 AS A CROSS JOIN L1 AS B),
L3   AS(SELECT 1 AS c FROM L2 AS A CROSS JOIN L2 AS B),
L4   AS(SELECT 1 AS c FROM L3 AS A CROSS JOIN L3 AS B),
L5   AS(SELECT 1 AS c FROM L4 AS A CROSS JOIN L4 AS B),
Nums AS(SELECT ROW_NUMBER() OVER(ORDER BY (SELECT 0)) AS n FROM L5)
SELECT n FROM Nums WHERE n <= @n;
GO

-- UDF Returning an Auxiliary Table of Numbers
IF OBJECT_ID('dbo.GetNums') IS NOT NULL
  DROP FUNCTION dbo.GetNums;
GO
CREATE FUNCTION dbo.GetNums(@n AS BIGINT) RETURNS TABLE
AS
RETURN
  WITH
  L0   AS(SELECT 1 AS c UNION ALL SELECT 1),
  L1   AS(SELECT 1 AS c FROM L0 AS A CROSS JOIN L0 AS B),
  L2   AS(SELECT 1 AS c FROM L1 AS A CROSS JOIN L1 AS B),
  L3   AS(SELECT 1 AS c FROM L2 AS A CROSS JOIN L2 AS B),
  L4   AS(SELECT 1 AS c FROM L3 AS A CROSS JOIN L3 AS B),
  L5   AS(SELECT 1 AS c FROM L4 AS A CROSS JOIN L4 AS B),
  Nums AS(SELECT ROW_NUMBER() OVER(ORDER BY (SELECT 0)) AS n FROM L5)
  SELECT n FROM Nums WHERE n <= @n;
GO

-- Test function
SELECT * FROM dbo.GetNums(10) AS Nums;
GO

---------------------------------------------------------------------
-- Missing and Existing Ranges (aka Gaps and Islands)
---------------------------------------------------------------------

SET NOCOUNT ON;
USE tempdb;

-- dbo.NumSeq (numeric sequence with unique values, interval: 1)
IF OBJECT_ID('dbo.NumSeq', 'U') IS NOT NULL DROP TABLE dbo.NumSeq;

CREATE TABLE dbo.NumSeq
(
  seqval INT NOT NULL
    CONSTRAINT PK_NumSeq PRIMARY KEY
);

INSERT INTO dbo.NumSeq(seqval) VALUES
  (2),(3),(11),(12),(13),(27),(33),(34),(35),(42);

-- dbo.BigNumSeq (big numeric sequence with unique values, interval: 1)
IF OBJECT_ID('dbo.BigNumSeq', 'U') IS NOT NULL DROP TABLE dbo.BigNumSeq;

CREATE TABLE dbo.BigNumSeq
(
  seqval INT NOT NULL
    CONSTRAINT PK_BigNumSeq PRIMARY KEY
);

-- Populate table with values in the range 1 through to 10,000,000
-- with a gap every 1000 (total 9,999 gaps, 10,000 islands)
WITH
L0   AS(SELECT 1 AS c UNION ALL SELECT 1),
L1   AS(SELECT 1 AS c FROM L0 AS A, L0 AS B),
L2   AS(SELECT 1 AS c FROM L1 AS A, L1 AS B),
L3   AS(SELECT 1 AS c FROM L2 AS A, L2 AS B),
L4   AS(SELECT 1 AS c FROM L3 AS A, L3 AS B),
L5   AS(SELECT 1 AS c FROM L4 AS A, L4 AS B),
Nums AS(SELECT ROW_NUMBER() OVER(ORDER BY (SELECT 0)) AS n FROM L5)
INSERT INTO dbo.BigNumSeq WITH(TABLOCK) (seqval)
  SELECT n
  FROM Nums
  WHERE n <= 10000000
    AND n % 1000 <> 0;

-- dbo.TempSeq (temporal sequence with unique values, interval: 4 hours)
IF OBJECT_ID('dbo.TempSeq', 'U') IS NOT NULL DROP TABLE dbo.TempSeq;

CREATE TABLE dbo.TempSeq
(
  seqval DATETIME NOT NULL
    CONSTRAINT PK_TempSeq PRIMARY KEY
);

INSERT INTO dbo.TempSeq(seqval) VALUES
  ('20090212 00:00'),
  ('20090212 04:00'),
  ('20090212 12:00'),
  ('20090212 16:00'),
  ('20090212 20:00'),
  ('20090213 08:00'),
  ('20090213 20:00'),
  ('20090214 00:00'),
  ('20090214 04:00'),
  ('20090214 12:00');

-- dbo.NumSeqDups (numeric sequence with duplicates, interval: 1)
IF OBJECT_ID('dbo.NumSeqDups', 'U') IS NOT NULL DROP TABLE dbo.NumSeqDups;

CREATE TABLE dbo.NumSeqDups
(
  seqval INT NOT NULL
);
CREATE CLUSTERED INDEX idx_seqval ON dbo.NumSeqDups(seqval);

INSERT INTO dbo.NumSeqDups(seqval) VALUES
  (2),(2),(2),(3),(11),(12),(12),(13),(27),(27),(27),(27),
  (33),(34),(34),(35),(35),(35),(42),(42);

----------------------------------------------------------------------
-- Gaps, Solution 1 using subqueries
----------------------------------------------------------------------

-- Numeric
SELECT seqval
FROM dbo.NumSeq AS A
WHERE NOT EXISTS(SELECT *
                 FROM dbo.NumSeq AS B
                 WHERE B.seqval = A.seqval + 1);

SELECT
  seqval + 1 AS start_range
FROM dbo.NumSeq AS A
WHERE NOT EXISTS(SELECT *
                 FROM dbo.NumSeq AS B
                 WHERE B.seqval = A.seqval + 1)
  AND seqval < (SELECT MAX(seqval) FROM dbo.NumSeq);

SELECT
  seqval + 1 AS start_range,
  (SELECT MIN(B.seqval)
   FROM dbo.NumSeq AS B
   WHERE B.seqval > A.seqval) - 1 AS end_range
FROM dbo.NumSeq AS A
WHERE NOT EXISTS(SELECT *
                 FROM dbo.NumSeq AS B
                 WHERE B.seqval = A.seqval + 1)
  AND seqval < (SELECT MAX(seqval) FROM dbo.NumSeq);

-- Big
-- 8 seconds, 62,262 logical reads
SELECT
  seqval + 1 AS start_range,
  (SELECT MIN(B.seqval)
   FROM dbo.BigNumSeq AS B
   WHERE B.seqval > A.seqval) - 1 AS end_range
FROM dbo.BigNumSeq AS A
WHERE NOT EXISTS(SELECT *
                 FROM dbo.BigNumSeq AS B
                 WHERE B.seqval = A.seqval + 1)
  AND seqval < (SELECT MAX(seqval) FROM dbo.BigNumSeq);

-- Temporal
SELECT
  DATEADD(hour, 4, seqval) AS start_range,
  DATEADD(hour, -4,
    (SELECT MIN(B.seqval)
     FROM dbo.TempSeq AS B
     WHERE B.seqval > A.seqval)) AS end_range
FROM dbo.TempSeq AS A
WHERE NOT EXISTS(SELECT *
                 FROM dbo.TempSeq AS B
                 WHERE B.seqval = DATEADD(hour, 4, A.seqval))
  AND seqval < (SELECT MAX(seqval) FROM dbo.TempSeq);

-- Dups
SELECT
  seqval + 1 AS start_range,
  (SELECT MIN(B.seqval)
   FROM dbo.NumSeqDups AS B
   WHERE B.seqval > A.seqval) - 1 AS end_range
FROM (SELECT DISTINCT seqval FROM dbo.NumSeqDups) AS A
WHERE NOT EXISTS(SELECT *
                 FROM dbo.NumSeqDups AS B
                 WHERE B.seqval = A.seqval + 1)
  AND seqval < (SELECT MAX(seqval) FROM dbo.NumSeqDups);

SELECT DISTINCT
  seqval + 1 AS start_range,
  (SELECT MIN(B.seqval)
   FROM dbo.NumSeqDups AS B
   WHERE B.seqval > A.seqval) - 1 AS end_range
FROM dbo.NumSeqDups AS A
WHERE NOT EXISTS(SELECT *
                 FROM dbo.NumSeqDups AS B
                 WHERE B.seqval = A.seqval + 1)
  AND seqval < (SELECT MAX(seqval) FROM dbo.NumSeqDups);

----------------------------------------------------------------------
-- Gaps, Solution 2 using subqueries
----------------------------------------------------------------------

-- Numeric
SELECT
  seqval AS cur,
  (SELECT MIN(B.seqval)
   FROM dbo.NumSeq AS B
   WHERE B.seqval > A.seqval) AS nxt
FROM dbo.NumSeq AS A;

SELECT cur + 1 AS start_range, nxt - 1 AS end_range
FROM (SELECT
        seqval AS cur,
        (SELECT MIN(B.seqval)
         FROM dbo.NumSeq AS B
         WHERE B.seqval > A.seqval) AS nxt
      FROM dbo.NumSeq AS A) AS D
WHERE nxt - cur > 1;

-- Big
-- 48 seconds, 31,875,478 logical reads
SELECT cur + 1 AS start_range, nxt - 1 AS end_range
FROM (SELECT
        seqval AS cur,
        (SELECT MIN(B.seqval)
         FROM dbo.BigNumSeq AS B
         WHERE B.seqval > A.seqval) AS nxt
      FROM dbo.BigNumSeq AS A) AS D
WHERE nxt - cur > 1;

-- Temporal
SELECT 
  DATEADD(hour, 4, cur) AS start_range,
  DATEADD(hour, -4, nxt) AS end_range
FROM (SELECT
        seqval AS cur,
        (SELECT MIN(B.seqval)
         FROM dbo.TempSeq AS B
         WHERE B.seqval > A.seqval) AS nxt
      FROM dbo.TempSeq AS A) AS D
WHERE DATEDIFF(hour, cur, nxt) > 4;

-- Dups
SELECT cur + 1 AS start_range, nxt - 1 AS end_range
FROM (SELECT
        seqval AS cur,
        (SELECT MIN(B.seqval)
         FROM dbo.NumSeqDups AS B
         WHERE B.seqval > A.seqval) AS nxt
      FROM (SELECT DISTINCT seqval FROM dbo.NumSeqDups) AS A) AS D
WHERE nxt - cur > 1;

SELECT DISTINCT cur + 1 AS start_range, nxt - 1 AS end_range
FROM (SELECT
        seqval AS cur,
        (SELECT MIN(B.seqval)
         FROM dbo.NumSeqDups AS B
         WHERE B.seqval > A.seqval) AS nxt
      FROM dbo.NumSeqDups AS A) AS D
WHERE nxt - cur > 1;

----------------------------------------------------------------------
-- Gaps, Solution 3 using ranking functions
----------------------------------------------------------------------

-- Numeric
WITH C AS
(
  SELECT seqval, ROW_NUMBER() OVER(ORDER BY seqval) AS rownum
  FROM dbo.NumSeq
)
SELECT Cur.seqval + 1 AS start_range, Nxt.seqval - 1 AS end_range
FROM C AS Cur
  JOIN C AS Nxt
    ON Nxt.rownum = Cur.rownum + 1
WHERE Nxt.seqval - Cur.seqval > 1;

-- Big
-- 24 seconds, 32,246 logical reads
WITH C AS
(
  SELECT seqval, ROW_NUMBER() OVER(ORDER BY seqval) AS rownum
  FROM dbo.BigNumSeq
)
SELECT Cur.seqval + 1 AS start_range, Nxt.seqval - 1 AS end_range
FROM C AS Cur
  JOIN C AS Nxt
    ON Nxt.rownum = Cur.rownum + 1
WHERE Nxt.seqval - Cur.seqval > 1;

-- Temporal
WITH C AS
(
  SELECT seqval, ROW_NUMBER() OVER(ORDER BY seqval) AS rownum
  FROM dbo.TempSeq
)
SELECT
  DATEADD(hour, 4, Cur.seqval) AS start_range,
  DATEADD(hour, -4, Nxt.Seqval) AS end_range
FROM C AS Cur
  JOIN C AS Nxt
    ON Nxt.rownum = Cur.rownum + 1
WHERE DATEDIFF(hour, Cur.seqval, Nxt.seqval) > 4;

-- Dups
WITH C AS
(
  SELECT seqval, ROW_NUMBER() OVER(ORDER BY seqval) AS rownum
  FROM (SELECT DISTINCT seqval FROM dbo.NumSeqDups) AS D
)
SELECT Cur.seqval + 1 AS start_range, Nxt.seqval - 1 AS end_range
FROM C AS Cur
  JOIN C AS Nxt
    ON Nxt.rownum = Cur.rownum + 1
WHERE Nxt.seqval - Cur.seqval > 1;

WITH C1 AS
(
  SELECT seqval, ROW_NUMBER() OVER(PARTITION BY seqval
                                   ORDER BY (SELECT 0)) AS dupnum
  FROM dbo.NumSeqDups
),
C2 AS
(
  SELECT seqval, ROW_NUMBER() OVER(ORDER BY seqval) AS rownum
  FROM C1
  WHERE dupnum = 1
)
SELECT Cur.seqval + 1 AS start_range, Nxt.seqval - 1 AS end_range
FROM C2 AS Cur
  JOIN C2 AS Nxt
    ON Nxt.rownum = Cur.rownum + 1
WHERE Nxt.seqval - Cur.seqval > 1;

----------------------------------------------------------------------
-- Gaps, Solution 4 using cursors
----------------------------------------------------------------------

-- 250 seconds, 16,123 logical reads
SET NOCOUNT ON;

DECLARE @seqval AS INT, @prvseqval AS INT;
DECLARE @Gaps TABLE(start_range INT, end_range INT);

DECLARE C CURSOR FAST_FORWARD FOR
  SELECT seqval FROM dbo.BigNumSeq ORDER BY seqval;

OPEN C;

FETCH NEXT FROM C INTO @prvseqval;
IF @@FETCH_STATUS = 0 FETCH NEXT FROM C INTO @seqval;

WHILE @@FETCH_STATUS = 0
BEGIN
  IF @seqval - @prvseqval > 1
    INSERT INTO @Gaps(start_range, end_range)
      VALUES(@prvseqval + 1, @seqval - 1);

  SET @prvseqval = @seqval;
  FETCH NEXT FROM C INTO @seqval;
END

CLOSE C;

DEALLOCATE C;

SELECT start_range, end_range FROM @Gaps;

----------------------------------------------------------------------
-- Returning Individual Missing Values
----------------------------------------------------------------------

SELECT n FROM dbo.Nums
WHERE n BETWEEN (SELECT MIN(seqval) FROM dbo.NumSeq)
            AND (SELECT MAX(seqval) FROM dbo.NumSeq)
  AND n NOT IN(SELECT seqval FROM dbo.NumSeq);

----------------------------------------------------------------------
-- Islands, Solution 1 using subqueries and ranking calculations
----------------------------------------------------------------------

-- Numeric
WITH StartingPoints AS
(
  SELECT seqval, ROW_NUMBER() OVER(ORDER BY seqval) AS rownum
  FROM dbo.NumSeq AS A
  WHERE NOT EXISTS
    (SELECT *
     FROM dbo.NumSeq AS B
     WHERE B.seqval = A.seqval - 1)
),
EndingPoints AS
(
  SELECT seqval, ROW_NUMBER() OVER(ORDER BY seqval) AS rownum
  FROM dbo.NumSeq AS A
  WHERE NOT EXISTS
    (SELECT *
     FROM dbo.NumSeq AS B
     WHERE B.seqval = A.seqval + 1)
)
SELECT S.seqval AS start_range, E.seqval AS end_range
FROM StartingPoints AS S
  JOIN EndingPoints AS E
    ON E.rownum = S.rownum;

-- Big
-- 17 seconds, 64,492 logical reads
WITH StartingPoints AS
(
  SELECT seqval, ROW_NUMBER() OVER(ORDER BY seqval) AS rownum
  FROM dbo.BigNumSeq AS A
  WHERE NOT EXISTS
    (SELECT *
     FROM dbo.BigNumSeq AS B
     WHERE B.seqval = A.seqval - 1)
),
EndingPoints AS
(
  SELECT seqval, ROW_NUMBER() OVER(ORDER BY seqval) AS rownum
  FROM dbo.BigNumSeq AS A
  WHERE NOT EXISTS
    (SELECT *
     FROM dbo.BigNumSeq AS B
     WHERE B.seqval = A.seqval + 1)
)
SELECT S.seqval AS start_range, E.seqval AS end_range
FROM StartingPoints AS S
  JOIN EndingPoints AS E
    ON E.rownum = S.rownum;

-- Temporal
WITH StartingPoints AS
(
  SELECT seqval, ROW_NUMBER() OVER(ORDER BY seqval) AS rownum
  FROM dbo.TempSeq AS A
  WHERE NOT EXISTS
    (SELECT *
     FROM dbo.TempSeq AS B
     WHERE B.seqval = DATEADD(hour, -4, A.seqval))
),
EndingPoints AS
(
  SELECT seqval, ROW_NUMBER() OVER(ORDER BY seqval) AS rownum
  FROM dbo.TempSeq AS A
  WHERE NOT EXISTS
    (SELECT *
     FROM dbo.TempSeq AS B
     WHERE B.seqval = DATEADD(hour, 4, A.seqval))
)
SELECT S.seqval AS start_range, E.seqval AS end_range
FROM StartingPoints AS S
  JOIN EndingPoints AS E
    ON E.rownum = S.rownum;

-- Dups
WITH StartingPoints AS
(
  SELECT seqval, ROW_NUMBER() OVER(ORDER BY seqval) AS rownum
  FROM (SELECT DISTINCT seqval FROM dbo.NumSeqDups) AS A
  WHERE NOT EXISTS
    (SELECT *
     FROM dbo.NumSeqDups AS B
     WHERE B.seqval = A.seqval - 1)
),
EndingPoints AS
(
  SELECT seqval, ROW_NUMBER() OVER(ORDER BY seqval) AS rownum
  FROM (SELECT DISTINCT seqval FROM dbo.NumSeqDups) AS A
  WHERE NOT EXISTS
    (SELECT *
     FROM dbo.NumSeqDups AS B
     WHERE B.seqval = A.seqval + 1)
)
SELECT S.seqval AS start_range, E.seqval AS end_range
FROM StartingPoints AS S
  JOIN EndingPoints AS E
    ON E.rownum = S.rownum;

----------------------------------------------------------------------
-- Islands, Solution 2 using group identifier based on subqueries
----------------------------------------------------------------------

-- Numeric
SELECT seqval,
  (SELECT MIN(B.seqval)
   FROM dbo.NumSeq AS B
   WHERE B.seqval >= A.seqval
     AND NOT EXISTS
       (SELECT *
        FROM dbo.NumSeq AS C
        WHERE C.seqval = B.seqval + 1)) AS grp
FROM dbo.NumSeq AS A;

WITH D AS
(
  SELECT seqval,
    (SELECT MIN(B.seqval)
     FROM dbo.NumSeq AS B
     WHERE B.seqval >= A.seqval
       AND NOT EXISTS
         (SELECT *
          FROM dbo.NumSeq AS C
          WHERE C.seqval = B.seqval + 1)) AS grp
  FROM dbo.NumSeq AS A
)
SELECT MIN(seqval) AS start_range, MAX(seqval) AS end_range
FROM D
GROUP BY grp;

-- Big
-- aborted execution after 600 seconds
WITH D AS
(
  SELECT seqval,
    (SELECT MIN(B.seqval)
     FROM dbo.BigNumSeq AS B
     WHERE B.seqval >= A.seqval
       AND NOT EXISTS
         (SELECT *
          FROM dbo.BigNumSeq AS C
          WHERE C.seqval = B.seqval + 1)) AS grp
  FROM dbo.BigNumSeq AS A
)
SELECT MIN(seqval) AS start_range, MAX(seqval) AS end_range
FROM D
GROUP BY grp;

-- Temporal
WITH D AS
(
  SELECT seqval,
    (SELECT MIN(B.seqval)
     FROM dbo.TempSeq AS B
     WHERE B.seqval >= A.seqval
       AND NOT EXISTS
         (SELECT *
          FROM dbo.TempSeq AS C
          WHERE C.seqval = DATEADD(hour, 4, B.seqval))) AS grp
  FROM dbo.TempSeq AS A
)
SELECT MIN(seqval) AS start_range, MAX(seqval) AS end_range
FROM D
GROUP BY grp;

-- Dups
WITH D AS
(
  SELECT seqval,
    (SELECT MIN(B.seqval)
     FROM dbo.NumSeqDups AS B
     WHERE B.seqval >= A.seqval
       AND NOT EXISTS
         (SELECT *
          FROM dbo.NumSeqDups AS C
          WHERE C.seqval = B.seqval + 1)) AS grp
  FROM dbo.NumSeqDups AS A
)
SELECT MIN(seqval) AS start_range, MAX(seqval) AS end_range
FROM D
GROUP BY grp;

----------------------------------------------------------------------
-- Islands, Solution 3 using group identifier based on ranking calculations
----------------------------------------------------------------------

-- Numeric
SELECT seqval, ROW_NUMBER() OVER(ORDER BY seqval) AS rownum
FROM dbo.NumSeq;

SELECT seqval, seqval - ROW_NUMBER() OVER(ORDER BY seqval) AS diff
FROM dbo.NumSeq;

WITH D AS
(
  SELECT seqval, seqval - ROW_NUMBER() OVER(ORDER BY seqval) AS grp
  FROM dbo.NumSeq
)
SELECT MIN(seqval) AS start_range, MAX(seqval) AS end_range
FROM D
GROUP BY grp;

-- Big
-- 10 seconds, 16,123 logical reads
WITH D AS
(
  SELECT seqval, seqval - ROW_NUMBER() OVER(ORDER BY seqval) AS grp
  FROM dbo.BigNumSeq
)
SELECT MIN(seqval) AS start_range, MAX(seqval) AS end_range
FROM D
GROUP BY grp;

-- Temporal
WITH D AS
(
  SELECT seqval, DATEADD(hour, -4 * ROW_NUMBER() OVER(ORDER BY seqval), seqval) AS grp
  FROM dbo.TempSeq
)
SELECT MIN(seqval) AS start_range, MAX(seqval) AS end_range
FROM D
GROUP BY grp;

-- Dups
WITH D AS
(
  SELECT seqval, seqval - DENSE_RANK() OVER(ORDER BY seqval) AS grp
  FROM dbo.NumSeqDups
)
SELECT MIN(seqval) AS start_range, MAX(seqval) AS end_range
FROM D
GROUP BY grp;

----------------------------------------------------------------------
-- Islands, Solution 4 using cursors
----------------------------------------------------------------------

-- 217 seconds, 16,123 logical reads
SET NOCOUNT ON;

DECLARE @seqval AS INT, @prvseqval AS INT, @first AS INT;
DECLARE @Islands TABLE(start_range INT, end_range INT);

DECLARE C CURSOR FAST_FORWARD FOR
  SELECT seqval FROM dbo.BigNumSeq ORDER BY seqval;

OPEN C;

FETCH NEXT FROM C INTO @seqval;
SET @first = @seqval;
SET @prvseqval = @seqval;

WHILE @@FETCH_STATUS = 0
BEGIN
  IF @seqval - @prvseqval > 1
  BEGIN
    INSERT INTO @Islands(start_range, end_range)
      VALUES(@first, @prvseqval);
    SET @first = @seqval;
  END
  
  SET @prvseqval = @seqval;
  FETCH NEXT FROM C INTO @seqval;
END

IF @first IS NOT NULL
  INSERT INTO @Islands(start_range, end_range)
    VALUES(@first, @prvseqval);
  
CLOSE C;

DEALLOCATE C;

SELECT start_range, end_range FROM @Islands;

----------------------------------------------------------------------
-- Variation of Islands Problem
----------------------------------------------------------------------

USE tempdb;
IF OBJECT_ID('dbo.T3') IS NOT NULL DROP TABLE dbo.T3;
CREATE TABLE dbo.T3
(
  id  INT         NOT NULL PRIMARY KEY,
  val VARCHAR(10) NOT NULL
);
GO

INSERT INTO dbo.T3(id, val) VALUES
  (2, 'a'),
  (3, 'a'),
  (5, 'a'),
  (7, 'b'),
  (11, 'b'),
  (13, 'a'),
  (17, 'a'),
  (19, 'a'),
  (23, 'c'),
  (29, 'c'),
  (31, 'a'),
  (37, 'a'),
  (41, 'a'),
  (43, 'a'),
  (47, 'c'),
  (53, 'c'),
  (59, 'c');

SELECT id, val,
  ROW_NUMBER() OVER(ORDER BY id) AS rn_id,
  ROW_NUMBER() OVER(ORDER BY val, id) AS rn_val_id
FROM dbo.T3
ORDER BY id;

SELECT id, val,
  ROW_NUMBER() OVER(ORDER BY id)
    - ROW_NUMBER() OVER(ORDER BY val, id) AS diff
FROM dbo.T3
ORDER BY id;

WITH C AS
(
  SELECT id, val,
    ROW_NUMBER() OVER(ORDER BY id)
      - ROW_NUMBER() OVER(ORDER BY val, id) AS grp
  FROM dbo.T3
)
SELECT MIN(id) AS mn, MAX(id) AS mx, val
FROM C
GROUP BY val, grp
ORDER BY mn;
