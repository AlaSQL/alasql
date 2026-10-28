---------------------------------------------------------------------
-- Inside Microsoft SQL Server 2008: T-SQL Querying (MSPress, 2009)
-- Chapter 07 - Joins and Set Operations
-- Copyright Itzik Ben-Gan, 2009
-- All Rights Reserved
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Joins
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Old-Style vs. New Style
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Fundamental Join Types
---------------------------------------------------------------------

---------------------------------------------------------------------
-- CROSS
---------------------------------------------------------------------

SET NOCOUNT ON;
USE InsideTSQL2008;
GO

-- Get all Possible Combinations, ANSI SQL:1992
SELECT E1.firstname, E1.lastname AS emp1,
  E2.firstname, E2.lastname AS emp2
FROM HR.Employees AS E1
  CROSS JOIN HR.Employees AS E2;

-- Get all Possible Combinations, ANSI SQL:1989
SELECT E1.firstname, E1.lastname AS emp1,
  E2.firstname, E2.lastname AS emp2
FROM HR.Employees AS E1, HR.Employees AS E2;
GO

-- Generate Copies, using a Literal
SELECT custid, empid,
  DATEADD(day, n-1, '20090101') AS orderdate
FROM Sales.Customers
  CROSS JOIN HR.Employees
  CROSS JOIN dbo.Nums
WHERE n <= 31;
GO

-- Make Sure MyOrders does not Exist
IF OBJECT_ID('dbo.MyOrders') IS NOT NULL
  DROP TABLE dbo.MyOrders;
GO

-- Generate Copies, using Arguments
DECLARE
  @fromdate AS DATE = '20090101',
  @todate   AS DATE = '20090131';

WITH Orders
AS
( 
  SELECT custid, empid,
    DATEADD(day, n-1, @fromdate) AS orderdate
  FROM Sales.Customers
    CROSS JOIN HR.Employees
    CROSS JOIN dbo.Nums
  WHERE n <= DATEDIFF(day, @fromdate, @todate) + 1
)
SELECT ROW_NUMBER() OVER(ORDER BY (SELECT 0)) AS orderid,
  custid, empid, orderdate
INTO dbo.MyOrders
FROM Orders;
GO

-- Cleanup
DROP TABLE dbo.MyOrders;
GO

-- Avoiding Multiple Subqueries
IF OBJECT_ID('dbo.MyOrderValues', 'U') IS NOT NULL
  DROP TABLE dbo.MyOrderValues;
GO

SELECT *
INTO dbo.MyOrderValues
FROM Sales.OrderValues;

ALTER TABLE dbo.MyOrderValues
  ADD CONSTRAINT PK_MyOrderValues PRIMARY KEY(orderid);

CREATE INDEX idx_val ON dbo.MyOrderValues(val);
GO

-- Listing 7-1 Query obtaining aggregates with subqueries
SELECT orderid, custid, val,
  CAST(val / (SELECT SUM(val) FROM dbo.MyOrderValues) * 100.
       AS NUMERIC(5, 2)) AS pct,
  CAST(val - (SELECT AVG(val) FROM dbo.MyOrderValues)
       AS NUMERIC(12, 2)) AS diff
FROM dbo.MyOrderValues;

-- Listing 7-2 Query obtaining aggregates with a cross join
WITH Aggs AS
(
  SELECT SUM(val) AS sumval, AVG(val) AS avgval
  FROM dbo.MyOrderValues
)
SELECT orderid, custid, val,
  CAST(val / sumval * 100. AS NUMERIC(5, 2)) AS pct,
  CAST(val - avgval AS NUMERIC(12, 2)) AS diff
FROM dbo.MyOrderValues
  CROSS JOIN Aggs;

-- Cleanup
IF OBJECT_ID('dbo.MyOrderValues', 'U') IS NOT NULL
  DROP TABLE dbo.MyOrderValues;
GO

---------------------------------------------------------------------
-- INNER
---------------------------------------------------------------------

-- Inner Join, ANSI SQL:1992
SELECT C.custid, companyname, orderid
FROM Sales.Customers AS C
  JOIN Sales.Orders AS O
    ON C.custid = O.custid
WHERE country = N'USA';

-- Inner Join, ANSI SQL:1989
SELECT C.custid, companyname, orderid
FROM Sales.Customers AS C, Sales.Orders AS O
WHERE C.custid = O.custid
  AND country = N'USA';
GO

-- Forgetting to Specify Join Condition, ANSI SQL:1989
SELECT C.custid, companyname, orderid
FROM Sales.Customers AS C, Sales.Orders AS O;
GO

-- Forgetting to Specify Join Condition, ANSI SQL:1989
SELECT C.custid, companyname, orderid
FROM Sales.Customers AS C JOIN Sales.Orders AS O;
GO

---------------------------------------------------------------------
-- OUTER
---------------------------------------------------------------------

-- Outer Join, ANSI SQL:1992
SELECT C.custid, companyname, orderid
FROM Sales.Customers AS C
  LEFT OUTER JOIN Sales.Orders AS O
    ON C.custid = O.custid;
GO

-- Changing the Database Compatibility Level to 2000
ALTER DATABASE InsideTSQL2008 SET COMPATIBILITY_LEVEL = 80;
GO

-- Outer Join, Old-Style Non-ANSI
SELECT C.custid, companyname, orderid
FROM Sales.Customers AS C, Sales.Orders AS O
WHERE C.custid *= O.custid;
GO

-- Outer Join with Filter, ANSI SQL:1992
SELECT C.custid, companyname, orderid
FROM Sales.Customers AS C
  LEFT OUTER JOIN Sales.Orders AS O
    ON C.custid = O.custid
WHERE O.custid IS NULL;

-- Outer Join with Filter, Old-Style Non-ANSI
SELECT C.custid, companyname, orderid
FROM Sales.Customers AS C, Sales.Orders AS O
WHERE C.custid *= O.custid
  AND O.custid IS NULL;

-- Changing the Database Compatibility Level Back to 2008
ALTER DATABASE InsideTSQL2008 SET COMPATIBILITY_LEVEL = 100;
GO

-- Creating and Populating the Table T1
USE tempdb;
IF OBJECT_ID('dbo.T1', 'U') IS NOT NULL DROP TABLE dbo.T1;

CREATE TABLE dbo.T1
(
  keycol  INT         NOT NULL PRIMARY KEY,
  datacol VARCHAR(10) NOT NULL
);
GO

INSERT INTO dbo.T1(keycol, datacol) VALUES
  (1, 'e'),
  (2, 'f'),
  (3, 'a'),
  (4, 'b'),
  (6, 'c'),
  (7, 'd');

-- Using Correlated Subquery to Find Minimum Missing Value
SELECT MIN(A.keycol) + 1
FROM dbo.T1 AS A
WHERE NOT EXISTS
  (SELECT * FROM dbo.T1 AS B
   WHERE B.keycol = A.keycol + 1);

-- Using Outer Join to Find Minimum Missing Value
SELECT MIN(A.keycol) + 1
FROM dbo.T1 AS A
  LEFT OUTER JOIN dbo.T1 AS B
    ON B.keycol = A.keycol + 1
WHERE B.keycol IS NULL;
GO

---------------------------------------------------------------------
-- Non-Supported Join Types
---------------------------------------------------------------------

---------------------------------------------------------------------
-- NATURAL, UNION Joins
---------------------------------------------------------------------
USE InsideTSQL2008;
GO

-- NATURAL Join
/*
SELECT C.custid, companyname, orderid
FROM Sales.Customers AS C NATURAL JOIN Sales.Orders AS O;
*/

-- Logically Equivalent Inner Join
SELECT C.custid, companyname, orderid
FROM Sales.Customers AS C
  JOIN Sales.Orders AS O
    ON O.custid = O.custid;
GO

---------------------------------------------------------------------
-- Further Examples of Joins
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Self Joins
---------------------------------------------------------------------
USE InsideTSQL2008;
GO

SELECT E.firstname, E.lastname AS emp,
  M.firstname, M.lastname AS mgr
FROM HR.Employees AS E
  LEFT OUTER JOIN HR.Employees AS M
    ON E.mgrid = M.empid;
GO

---------------------------------------------------------------------
-- Non-Equi-Joins
---------------------------------------------------------------------

-- Cross without Mirrored Pairs and without Self
SELECT E1.empid, E1.lastname, E1.firstname,
  E2.empid, E2.lastname, E2.firstname
FROM HR.Employees AS E1
  JOIN HR.Employees AS E2
    ON E1.empid < E2.empid;

-- Calculating Row Numbers using a Join
SELECT O1.orderid, O1.custid, O1.empid, COUNT(*) AS rn
FROM Sales.Orders AS O1
  JOIN Sales.Orders AS O2
    ON O2.orderid <= O1.orderid
GROUP BY O1.orderid, O1.custid, O1.empid;

---------------------------------------------------------------------
-- Multi-Join Queries
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Controlling the Physical Join Evaluation Order 
---------------------------------------------------------------------

-- Listing 7-3 Multi-join query
-- Suppliers that Supplied Products to Customers
SELECT DISTINCT C.companyname AS customer, S.companyname AS supplier
FROM Sales.Customers AS C
  JOIN Sales.Orders AS O
    ON O.custid = C.custid
  JOIN Sales.OrderDetails AS OD
    ON OD.orderid = O.orderid
  JOIN Production.Products AS P
    ON P.productid = OD.productid
  JOIN Production.Suppliers AS S
    ON S.supplierid = P.supplierid;

-- Listing 7-4 Multi-join query, forcing order
-- Controlling the Physical Join Evaluation Order 
SELECT DISTINCT C.companyname AS customer, S.companyname AS supplier
FROM Sales.Customers AS C
  JOIN Sales.Orders AS O
    ON O.custid = C.custid
  JOIN Sales.OrderDetails AS OD
    ON OD.orderid = O.orderid
  JOIN Production.Products AS P
    ON P.productid = OD.productid
  JOIN Production.Suppliers AS S
    ON S.supplierid = P.supplierid
OPTION (FORCE ORDER);

---------------------------------------------------------------------
-- Controlling the Logical Join Evaluation Order
---------------------------------------------------------------------

-- Including Customers with no Orders, Attempt with Left Join
SELECT DISTINCT C.companyname AS customer, S.companyname AS supplier
FROM Sales.Customers AS C
  LEFT OUTER JOIN Sales.Orders AS O
    ON O.custid = C.custid
  JOIN Sales.OrderDetails AS OD
    ON OD.orderid = O.orderid
  JOIN Production.Products AS P
    ON P.productid = OD.productid
  JOIN Production.Suppliers AS S
    ON S.supplierid = P.supplierid;

-- Multiple Left Joins
SELECT DISTINCT C.companyname AS customer, S.companyname AS supplier
FROM Sales.Customers AS C
  LEFT OUTER JOIN Sales.Orders AS O
    ON O.custid = C.custid
  LEFT OUTER JOIN Sales.OrderDetails AS OD
    ON OD.orderid = O.orderid
  LEFT OUTER JOIN Production.Products AS P
    ON P.productid = OD.productid
  LEFT OUTER JOIN Production.Suppliers AS S
    ON S.supplierid = P.supplierid;

-- Right Join Performed Last
SELECT DISTINCT C.companyname AS customer, S.companyname AS supplier
FROM Sales.Orders AS O
  JOIN Sales.OrderDetails AS OD
    ON OD.orderid = O.orderid
  JOIN Production.Products AS P
    ON P.productid = OD.productid
  JOIN Production.Suppliers AS S
    ON S.supplierid = P.supplierid
  RIGHT OUTER JOIN Sales.Customers AS C
    ON O.custid = C.custid;

-- Using Parenthesis
SELECT DISTINCT C.companyname AS customer, S.companyname AS supplier
FROM Sales.Customers AS C
  LEFT OUTER JOIN 
    (     Sales.Orders AS O
     JOIN Sales.OrderDetails AS OD
       ON OD.orderid = O.orderid
     JOIN Production.Products AS P
       ON P.productid = OD.productid
     JOIN Production.Suppliers AS S
       ON S.supplierid = P.supplierid)
    ON O.custid = C.custid;

-- Changing ON Clause Order
SELECT DISTINCT C.companyname AS customer, S.companyname AS supplier
FROM Sales.Customers AS C
  LEFT OUTER JOIN 
          Sales.Orders AS O
     JOIN Sales.OrderDetails AS OD
       ON OD.orderid = O.orderid
     JOIN Production.Products AS P
       ON P.productid = OD.productid
     JOIN Production.Suppliers AS S
       ON S.supplierid = P.supplierid
    ON O.custid = C.custid;

SELECT DISTINCT C.companyname AS customer, S.companyname AS supplier
FROM Sales.Customers AS C
  LEFT OUTER JOIN Sales.Orders AS O
  JOIN Production.Products AS P
  JOIN Sales.OrderDetails AS OD
    ON P.productid = OD.productid
    ON OD.orderid = O.orderid
  JOIN Production.Suppliers AS S
    ON S.supplierid = P.supplierid
    ON O.custid = C.custid;

SELECT DISTINCT C.companyname AS customer, S.companyname AS supplier
FROM Sales.Customers AS C
  LEFT OUTER JOIN Sales.Orders AS O
  JOIN Sales.OrderDetails AS OD
  JOIN Production.Products AS P
  JOIN Production.Suppliers AS S
    ON S.supplierid = P.supplierid
    ON P.productid = OD.productid
    ON OD.orderid = O.orderid
    ON O.custid = C.custid;
GO

-- Bushy Plans
USE tempdb;
IF OBJECT_ID('dbo.T1', 'U') IS NOT NULL DROP TABLE dbo.T1;
IF OBJECT_ID('dbo.T2', 'U') IS NOT NULL DROP TABLE dbo.T2;
IF OBJECT_ID('dbo.T3', 'U') IS NOT NULL DROP TABLE dbo.T3;
IF OBJECT_ID('dbo.T4', 'U') IS NOT NULL DROP TABLE dbo.T4;
GO
CREATE TABLE dbo.T1(a INT, b INT, c INT, v1 INT);
CREATE TABLE dbo.T2(b INT, v2 INT);
CREATE TABLE dbo.T3(c INT, v3 INT);
CREATE TABLE dbo.T4(d INT, c INT, v4 INT);
GO

SELECT *
FROM dbo.T1
  JOIN dbo.T2
    ON T2.b = T1.b
  JOIN dbo.T3
    ON T3.c = T1.c
  JOIN dbo.T4
    ON T4.c = T3.c;

SELECT *
FROM dbo.T1
  JOIN dbo.T2
    ON T2.b = T1.b
  JOIN dbo.T3
  JOIN dbo.T4
    ON T4.c = T3.c
    ON T3.c = T1.c
OPTION(FORCE ORDER);

SELECT *
FROM   (dbo.T1 JOIN dbo.T2 ON T2.b = T1.b)
  JOIN (dbo.T3 JOIN dbo.T4 ON T4.c = T3.c)
    ON T3.c = T1.c
OPTION(FORCE ORDER);

WITH J1 AS
(
  SELECT T1.a AS T1a, T1.b AS T1b, T1.c, T1.v1, T2.b AS T2b, T2.v2
  FROM dbo.T1 JOIN dbo.T2
    ON T2.b = T1.b
),
J2 AS
(
  SELECT T3.c AS T3c, T3.v3, T4.d, T4.c AS T4c, T4.v4
  FROM dbo.T3 JOIN dbo.T4
    ON T4.c = T3.c
)
SELECT *
FROM J1 JOIN J2
  ON J2.T3c = J1.c
OPTION(FORCE ORDER);

-- Cleanup
USE tempdb;
IF OBJECT_ID('dbo.T1', 'U') IS NOT NULL DROP TABLE dbo.T1;
IF OBJECT_ID('dbo.T2', 'U') IS NOT NULL DROP TABLE dbo.T2;
IF OBJECT_ID('dbo.T3', 'U') IS NOT NULL DROP TABLE dbo.T3;
IF OBJECT_ID('dbo.T4', 'U') IS NOT NULL DROP TABLE dbo.T4;
GO

---------------------------------------------------------------------
-- Semi Joins
---------------------------------------------------------------------

USE InsideTSQL2008;

-- Left Semi Join
SELECT DISTINCT C.custid, C.companyname
FROM Sales.Customers AS C
  JOIN Sales.Orders AS O
    ON O.custid = C.custid
WHERE country = N'Spain';

-- Left Semi Join using EXISTS
SELECT custid, companyname
FROM Sales.Customers AS C
WHERE country = N'Spain'
  AND EXISTS
    (SELECT * FROM Sales.Orders AS O
     WHERE O.custid = C.custid);

-- Left Anti Semi Join
SELECT C.custid, C.companyname
FROM Sales.Customers AS C
  LEFT OUTER JOIN Sales.Orders AS O
    ON O.custid = C.custid
WHERE country = N'Spain'
  AND O.custid IS NULL;

-- Left Anti Semi Join using NOT EXISTS
SELECT custid, companyname
FROM Sales.Customers AS C
WHERE country = N'Spain'
  AND NOT EXISTS
    (SELECT * FROM Sales.Orders AS O
     WHERE O.custid = C.custid);

---------------------------------------------------------------------
-- Sliding Total of Previous Year
---------------------------------------------------------------------

-- Creating and Populating the MonthlyOrders Table
IF OBJECT_ID('dbo.MonthlyOrders') IS NOT NULL
  DROP TABLE dbo.MonthlyOrders;
GO

SELECT 
  DATEADD(month, DATEDIFF(month, '19000101', orderdate), '19000101')
    AS ordermonth,
  SUM(val) AS val
INTO dbo.MonthlyOrders
FROM Sales.OrderValues
GROUP BY DATEADD(month, DATEDIFF(month, '19000101', orderdate), '19000101');

CREATE UNIQUE CLUSTERED INDEX idx_ordermonth ON dbo.MonthlyOrders(ordermonth);

SELECT * FROM dbo.MonthlyOrders ORDER BY ordermonth;
GO

-- Self, Non-Equi-Join
-- Sliding Total of Previous Year
SELECT 
  CONVERT(CHAR(6), DATEADD(month, -11, O1.ordermonth), 112) AS frommonth,
  CONVERT(CHAR(6), O1.ordermonth, 112) AS tomonth,
  SUM(O2.val) AS totalval,
  COUNT(*) AS nummonths
FROM dbo.MonthlyOrders AS O1
  JOIN dbo.MonthlyOrders AS O2
    ON O2.ordermonth BETWEEN DATEADD(month, -11, O1.ordermonth)
                         AND O1.ordermonth
GROUP BY O1.ordermonth
ORDER BY O1.ordermonth;

-- Only complete years
SELECT 
  CONVERT(CHAR(6), DATEADD(month, -11, O1.ordermonth), 112) AS frommonth,
  CONVERT(CHAR(6), O1.ordermonth, 112) AS tomonth,
  SUM(O2.val) AS totalval
FROM dbo.MonthlyOrders AS O1
  JOIN dbo.MonthlyOrders AS O2
    ON O2.ordermonth BETWEEN DATEADD(month, -11, O1.ordermonth)
                         AND O1.ordermonth
GROUP BY O1.ordermonth
HAVING COUNT(*) = 12
ORDER BY O1.ordermonth;

-- When not guaranteed to have a row for every month
DECLARE
  @firsttomonth   AS DATE = '20061201',
  @lasttomonth    AS DATE = '20081201',
  @monthstrailing AS INT  = 11;
  
WITH Months AS
(
  SELECT
    DATEADD(month, n-1-@monthstrailing, @firsttomonth) AS frommonth,
    DATEADD(month, n-1, @firsttomonth)                 AS tomonth
  FROM dbo.Nums
  WHERE n <= DATEDIFF(month, @firsttomonth, @lasttomonth) + 1
)
SELECT
  CONVERT(CHAR(6), frommonth, 112) AS frommonth,
  CONVERT(CHAR(6), tomonth, 112) AS tomonth,
  COUNT(O.ordermonth) AS nummonths,
  SUM(O.val) AS totalval
FROM Months M
  LEFT OUTER JOIN
    dbo.MonthlyOrders AS O
      ON O.ordermonth BETWEEN M.frommonth AND M.tomonth
GROUP BY frommonth, tomonth
ORDER BY frommonth;

-- Cleanup
DROP TABLE dbo.MonthlyOrders;
GO

---------------------------------------------------------------------
-- Join Algorithms
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Nested Loops
---------------------------------------------------------------------

-- Nested Loops
USE Performance;

CREATE INDEX idx_nc_cn_i_cid 
  ON dbo.Customers(custname) INCLUDE(custid);

CREATE INDEX idx_nc_cid_od_i_oid_eid_sid
  ON dbo.Orders(custid, orderdate)
  INCLUDE(orderid, empid, shipperid);

SELECT C.custid, C.custname, O.orderid, O.empid, O.shipperid, O.orderdate
FROM dbo.Customers AS C
  JOIN dbo.Orders AS O
    ON O.custid = C.custid
WHERE C.custname LIKE 'Cust[_]1000%'
  AND O.orderdate >= '20080101'
  AND O.orderdate < '20080401';

---------------------------------------------------------------------
-- Merge
---------------------------------------------------------------------

-- Merge
SELECT C.custid, C.custname, O.orderid, O.empid, O.shipperid, O.orderdate
FROM dbo.Customers AS C
 JOIN dbo.Orders AS O
    ON O.custid = C.custid;

-- With sorting
SELECT C.custid, C.custname, O.orderid, O.empid, O.shipperid, O.orderdate
FROM dbo.Customers AS C
  JOIN dbo.Orders AS O
    ON O.custid = C.custid
WHERE O.orderdate >= '20080101'
  AND O.orderdate < '20080102';

---------------------------------------------------------------------
-- Hash
---------------------------------------------------------------------

-- Hash
DROP INDEX dbo.Customers.idx_nc_cn_i_cid;
DROP INDEX dbo.Orders.idx_nc_cid_od_i_oid_eid_sid;

SELECT C.custid, C.custname, O.orderid, O.empid, O.shipperid, O.orderdate
FROM dbo.Customers AS C
  JOIN dbo.Orders AS O
    ON O.custid = C.custid
WHERE C.custname LIKE 'Cust[_]1000%'
  AND O.orderdate >= '20080101'
  AND O.orderdate < '20080401';

-- Optimized Bitmap Filtering
SELECT C.custname, E.lastname, E.firstname,
  O.orderid, O.orderdate, O.custid, O.empid, O.shipperid
FROM dbo.Orders AS O
  JOIN dbo.Customers AS C
    ON O.custid = C.custid
  JOIN dbo.Employees AS E
    ON O.empid = E.empid
WHERE C.custname LIKE 'Cust[_]100%'
  AND E.lastname LIKE 'Lname[_]100%';

-- Forcing Join Strategy
SELECT C.custid, C.custname, O.orderid, O.empid, O.shipperid, O.orderdate
FROM dbo.Customers AS C
  INNER LOOP JOIN dbo.Orders AS O
    ON O.custid = C.custid;

SELECT C.custid, C.custname, O.orderid, O.empid, O.shipperid, O.orderdate
FROM dbo.Customers AS C
  JOIN dbo.Orders AS O
    ON O.custid = C.custid
OPTION(LOOP JOIN, HASH JOIN);

---------------------------------------------------------------------
-- Separating Elements
---------------------------------------------------------------------

-- Creating and Populating the Table Arrays
USE tempdb;

IF OBJECT_ID('dbo.Arrays') IS NOT NULL DROP TABLE dbo.Arrays;

CREATE TABLE dbo.Arrays
(
  arrid VARCHAR(10)   NOT NULL PRIMARY KEY,
  array VARCHAR(8000) NOT NULL
)
GO

INSERT INTO Arrays(arrid, array) VALUES
  ('A', '20,223,2544,25567,14'),
  ('B', '30,-23433,28'),
  ('C', '12,10,8099,12,1200,13,12,14,10,9'),
  ('D', '-4,-6,-45678,-2');
GO

-- Solution to Separating Elements Problem, Step 1
SELECT arrid, array, n
FROM dbo.Arrays
  JOIN dbo.Nums
    ON n <= DATALENGTH(array)
    AND SUBSTRING(array, n, 1) = ',';

-- Solution to Separating Elements Problem, Step 2
SELECT arrid, array, n
FROM dbo.Arrays
  JOIN dbo.Nums
    ON n <= DATALENGTH(array) + 1
    AND SUBSTRING(',' + array, n, 1) = ',';

-- Solution to Separating Elements Problem, Step 3
SELECT arrid, 
  SUBSTRING(array, n, CHARINDEX(',', array + ',', n) - n) AS element
FROM dbo.Arrays
  JOIN dbo.Nums
    ON n <= DATALENGTH(array) + 1
    AND SUBSTRING(',' + array, n, 1) = ',';

-- Solution to Separating Elements Problem, Step 4
SELECT arrid,
  ROW_NUMBER() OVER(PARTITION BY arrid ORDER BY n) AS pos,
  CAST(SUBSTRING(array, n, CHARINDEX(',', array + ',', n) - n)
       AS INT) AS element
FROM dbo.Arrays
  JOIN dbo.Nums
    ON n <= DATALENGTH(array) + 1
    AND SUBSTRING(',' + array, n, 1) = ',';

-- Alternative Solution to Separating Elements Problem, Step 4
SELECT arrid,
  (n - 1) - DATALENGTH(REPLACE(LEFT(array, n - 1), ',', '')) + 1 AS pos,
  CAST(SUBSTRING(array, n, CHARINDEX(',', array + ',', n) - n)
       AS INT) AS element
FROM dbo.Arrays
  JOIN dbo.Nums
    ON n <= DATALENGTH(array) + 1
    AND SUBSTRING(',' + array, n, 1) = ',';

-- Solution based on Recursive CTEs
WITH Split AS
(
  SELECT arrid, 1 AS pos, 1 AS startpos,
    CHARINDEX(',', array + ',') - 1 AS endpos
  FROM dbo.Arrays
  WHERE DATALENGTH(array) > 0

  UNION ALL

  SELECT Prv.arrid, Prv.pos + 1, Prv.endpos + 2,
    CHARINDEX(',', Cur.array + ',', Prv.endpos + 2) - 1
  FROM Split AS Prv
    JOIN dbo.Arrays AS Cur
      ON Cur.arrid = Prv.arrid
      AND CHARINDEX(',', Cur.array + ',', Prv.endpos + 2) > 0
)
SELECT A.arrid, pos,
  CAST(SUBSTRING(array, startpos, endpos-startpos+1) AS INT) AS element
FROM dbo.Arrays AS A
  JOIN Split AS S
    ON S.arrid = A.arrid
ORDER BY arrid, pos;

-- Solution that "Seems" Correct
SELECT CAST(arrid AS VARCHAR(10)) AS arrid,
    REPLACE(array, ',',
      CHAR(13)+CHAR(10) + CAST(arrid AS VARCHAR(10))+SPACE(10)) AS value
FROM dbo.Arrays;
GO

---------------------------------------------------------------------
-- Set Operations
---------------------------------------------------------------------

---------------------------------------------------------------------
-- UNION
---------------------------------------------------------------------

---------------------------------------------------------------------
-- UNION DISTINCT
---------------------------------------------------------------------

-- UNION DISTINCT
USE InsideTSQL2008;

SELECT country, region, city FROM HR.Employees
UNION
SELECT country, region, city FROM Sales.Customers;

---------------------------------------------------------------------
-- UNION ALL
---------------------------------------------------------------------

-- UNION ALL
SELECT country, region, city FROM HR.Employees
UNION ALL
SELECT country, region, city FROM Sales.Customers;

---------------------------------------------------------------------
-- EXCEPT
---------------------------------------------------------------------

---------------------------------------------------------------------
-- EXCEPT DISTINCT
---------------------------------------------------------------------

-- EXCEPT DISTINCT, Employees EXCEPT Customers
SELECT country, region, city FROM HR.Employees
EXCEPT
SELECT country, region, city FROM Sales.Customers;

-- EXCEPT DISTINCT, Customers EXCEPT Employees
SELECT country, region, city FROM Sales.Customers
EXCEPT
SELECT country, region, city FROM HR.Employees;

---------------------------------------------------------------------
-- EXCEPT ALL
---------------------------------------------------------------------

WITH EXCEPT_ALL
AS
(
  SELECT
    ROW_NUMBER() 
      OVER(PARTITION BY country, region, city
           ORDER     BY (SELECT 0)) AS rn,
    country, region, city
    FROM HR.Employees

  EXCEPT

  SELECT
    ROW_NUMBER() 
      OVER(PARTITION BY country, region, city
           ORDER     BY (SELECT 0)) AS rn,
    country, region, city
  FROM Sales.Customers
)
SELECT country, region, city
FROM EXCEPT_ALL;

---------------------------------------------------------------------
-- INTERSCET
---------------------------------------------------------------------

---------------------------------------------------------------------
-- INTERSECT DISTINCT
---------------------------------------------------------------------

SELECT country, region, city FROM HR.Employees
INTERSECT
SELECT country, region, city FROM Sales.Customers;

---------------------------------------------------------------------
-- INTERSECT ALL
---------------------------------------------------------------------

WITH INTERSECT_ALL
AS
(
  SELECT
    ROW_NUMBER() 
      OVER(PARTITION BY country, region, city
           ORDER     BY (SELECT 0)) AS rn,
    country, region, city
  FROM HR.Employees

  INTERSECT

  SELECT
    ROW_NUMBER() 
      OVER(PARTITION BY country, region, city
           ORDER     BY (SELECT 0)) AS rn,
    country, region, city
    FROM Sales.Customers
)
SELECT country, region, city
FROM INTERSECT_ALL;

---------------------------------------------------------------------
-- Precedence
---------------------------------------------------------------------

-- INTERSECT Precedes EXCEPT
SELECT country, region, city FROM Production.Suppliers
EXCEPT
SELECT country, region, city FROM HR.Employees
INTERSECT
SELECT country, region, city FROM Sales.Customers;

-- Using Parenthesis
(SELECT country, region, city FROM Production.Suppliers
 EXCEPT
 SELECT country, region, city FROM HR.Employees)
INTERSECT
SELECT country, region, city FROM Sales.Customers;

-- Using INTO with Set Operations
SELECT country, region, city INTO #T FROM Production.Suppliers
EXCEPT
SELECT country, region, city FROM HR.Employees
INTERSECT
SELECT country, region, city FROM Sales.Customers;

-- Cleanup
DROP TABLE #T;
GO

---------------------------------------------------------------------
-- Circumventing Unsupported Logical Phases
---------------------------------------------------------------------

-- Number of Cities per Country Covered by Both Customers
-- and Employees
SELECT country, COUNT(*) AS numcities
FROM (SELECT country, region, city FROM HR.Employees
      UNION
      SELECT country, region, city FROM Sales.Customers) AS U
GROUP BY country;

-- Two most recent orders for employees 3 and 5
SELECT empid, orderid, orderdate
FROM (SELECT TOP (2) empid, orderid, orderdate
      FROM Sales.Orders
      WHERE empid = 3
      ORDER BY orderdate DESC, orderid DESC) AS D1

UNION ALL

SELECT empid, orderid, orderdate
FROM (SELECT TOP (2) empid, orderid, orderdate
      FROM Sales.Orders
      WHERE empid = 5
      ORDER BY orderdate DESC, orderid DESC) AS D2;

-- Sorting each Input Independently
SELECT empid, custid, orderid, orderdate
FROM (SELECT 1 AS sortcol, custid, empid, orderid, orderdate
      FROM Sales.Orders
      WHERE custid = 1

      UNION ALL

      SELECT 2 AS sortcol, custid, empid, orderid, orderdate
      FROM Sales.Orders
      WHERE empid = 3) AS U
ORDER BY sortcol,
  CASE WHEN sortcol = 1 THEN orderid END,
  CASE WHEN sortcol = 2 THEN orderdate END DESC;
