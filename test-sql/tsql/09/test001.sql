---------------------------------------------------------------------
-- Inside Microsoft SQL Server 2008: T-SQL Querying (MSPress, 2009)
-- Chapter 09 - TOP and APPLY
-- Copyright Itzik Ben-Gan, 2009
-- All Rights Reserved
---------------------------------------------------------------------

---------------------------------------------------------------------
-- SELECT TOP
---------------------------------------------------------------------
SET NOCOUNT ON;

-- Three Most-Recent Orders
USE InsideTSQL2008;

SELECT TOP (3) orderid, custid, orderdate
FROM Sales.Orders
ORDER BY orderdate DESC, orderid DESC;

-- Most-Recent One Percent of Orders
SELECT TOP (1) PERCENT orderid, custid, orderdate
FROM Sales.Orders
ORDER BY orderdate DESC, orderid DESC;

---------------------------------------------------------------------
-- TOP and Determinism
---------------------------------------------------------------------

-- Non-Determinstic
SELECT TOP (3) orderid, custid, orderdate
FROM Sales.Orders;

-- Non-Determinstic
SELECT TOP (3) orderid, custid, orderdate
FROM Sales.Orders
ORDER BY custid;

-- Determinstic
SELECT TOP (3) orderid, custid, orderdate
FROM Sales.Orders
ORDER BY custid, orderid;

-- Determinstic
SELECT TOP (3) WITH TIES orderid, custid, orderdate
FROM Sales.Orders
ORDER BY custid;

---------------------------------------------------------------------
-- TOP and Input Expressions
---------------------------------------------------------------------

-- Top @n Most Recent Orders
DECLARE @n AS INT = 2;

SELECT TOP (@n) orderid, orderdate, custid, empid
FROM Sales.Orders
ORDER BY orderdate DESC, orderid DESC;
GO

-- Most Recent Average Number of Monthly Orders
SELECT TOP (SELECT COUNT(*)/(DATEDIFF(month,
              MIN(orderdate), MAX(orderdate))+1)
            FROM Sales.Orders)
  orderid, orderdate, custid, empid
FROM Sales.Orders
ORDER BY orderdate DESC, orderid DESC;

---------------------------------------------------------------------
-- TOP and Modifications
---------------------------------------------------------------------

-- Modifying Large Volumes of Data
-- Purging Data in Batches

-- Creating and Populating the LargeOrders Table 
IF OBJECT_ID('dbo.LargeOrders') IS NOT NULL
  DROP TABLE dbo.LargeOrders;
GO
SELECT ROW_NUMBER() OVER(ORDER BY (SELECT 0)) AS orderid,
  O1.custid, O1.empid, O1.orderdate, O1.requireddate,
  O1.shippeddate, O1.shipperid, O1.freight, O1.shipname, O1.shipaddress,
  O1.shipcity, O1.shipregion, O1.shippostalcode, O1.shipcountry
INTO dbo.LargeOrders
FROM Sales.Orders AS O1
  CROSS JOIN Sales.Orders AS O2;

CREATE UNIQUE CLUSTERED INDEX idx_od_oid
  ON dbo.LargeOrders(orderdate, orderid);
GO

-- Solution using TOP
WHILE 1 = 1
BEGIN
  DELETE TOP (5000) FROM dbo.LargeOrders
  WHERE orderdate < '20070101';
  
  IF @@rowcount < 5000 BREAK;
END
GO

-- Updating Data in Batches

-- Solution using TOP
WHILE 1 = 1
BEGIN
  UPDATE TOP (5000) dbo.LargeOrders
    SET custid = 123
  WHERE custid = 55;

  IF @@rowcount < 5000 BREAK;
END
GO

---------------------------------------------------------------------
-- TOP on Steroids
---------------------------------------------------------------------

SELECT 
  TOP (3) OVER(PARTITION BY empid
               ORDER BY orderdate DESC, orderid DESC)
  empid, orderid, orderdate, custid
FROM Sales.Orders;

WITH C AS
(
  SELECT 
    ROW_NUMBER() OVER(PARTITION BY empid
                      ORDER BY orderdate DESC, orderid DESC) AS rownum,
    empid, orderid, orderdate, custid
  FROM Sales.Orders
)
SELECT *
FROM C
WHERE rownum <= 3;

WITH C AS
(
  SELECT 
    ROW_NUMBER() OVER(PARTITION BY empid
                      ORDER BY orderdate, orderid) AS rownum,
    empid, orderid, orderdate, custid
  FROM dbo.LargeOrders
)
DELETE FROM C
WHERE rownum <= 1000;

-- Cleanup
IF OBJECT_ID('dbo.LargeOrders', 'U') IS NOT NULL
  DROP TABLE dbo.LargeOrders;
GO

---------------------------------------------------------------------
-- APPLY
---------------------------------------------------------------------

-- Creation Script for the Function GetTopProducts
IF OBJECT_ID('dbo.GetTopProducts') IS NOT NULL
  DROP FUNCTION dbo.GetTopProducts;
GO
CREATE FUNCTION dbo.GetTopProducts
  (@supid AS INT, @catid INT, @n AS INT)
  RETURNS TABLE
AS
RETURN
  SELECT TOP (@n) WITH TIES productid, productname, unitprice
  FROM Production.Products
  WHERE supplierid = @supid
    AND categoryid = @catid
  ORDER BY unitprice DESC;
GO

-- Return, for each supplier, the two most expensive beverages
SELECT S.supplierid, S.companyname, P.productid, P.productname, P.unitprice
FROM Production.Suppliers AS S
  CROSS APPLY dbo.GetTopProducts(S.supplierid, 1, 2) AS P;

-- Include also suppliers that don't supply beverages
SELECT S.supplierid, S.companyname, P.productid, P.productname, P.unitprice
FROM Production.Suppliers AS S
  OUTER APPLY dbo.GetTopProducts(S.supplierid, 1, 2) AS P;

-- Return, for each supplier, the lower of the two most expensive
-- beverage prices
SELECT supplierid, companyname,
  (SELECT MIN(P.unitprice)
   FROM dbo.GetTopProducts(S.supplierid, 1, 2) AS P) AS price
FROM Production.Suppliers AS S;
GO

---------------------------------------------------------------------
-- Solutions to Common Problems using TOP and APPLY
---------------------------------------------------------------------

---------------------------------------------------------------------
-- TOP n for Each Group
---------------------------------------------------------------------

-- Indexes for Following Problems
USE InsideTSQL2008;

CREATE UNIQUE INDEX idx_eid_od_oid_i_cid_rd 
  ON Sales.Orders(empid, orderdate, orderid)
     INCLUDE(custid, requireddate);

CREATE UNIQUE INDEX idx_oid_qtyd_pid
  ON Sales.OrderDetails(orderid, qty DESC, productid);
GO

-- Listing 9-1: Solution 1 to the Single Most Recent Order for each Employee Problem
SELECT empid, orderid, custid, orderdate, requireddate 
FROM Sales.Orders AS O1
WHERE orderid =
  (SELECT TOP (1) orderid
   FROM Sales.Orders AS O2
   WHERE O2.empid = O1.empid
   ORDER BY orderdate DESC, orderid DESC);

-- Listing 9-2: Solution 1 to the Three Most Recent Orders for each Employee Problem
SELECT empid, orderid, custid, orderdate, requireddate 
FROM Sales.Orders AS O1
WHERE orderid IN
  (SELECT TOP (3) orderid
   FROM Sales.Orders AS O2
   WHERE O2.empid = O1.empid
   ORDER BY orderdate DESC, orderid DESC);

-- Listing 9-3: Solution 2 to the Single Most Recent Order for each Employee Problem
SELECT O.empid, O.orderid, custid, O.orderdate, O.requireddate 
FROM (SELECT E.empid,
        (SELECT TOP (1) orderid
         FROM Sales.Orders AS O2
         WHERE O2.empid = E.empid
         ORDER BY orderdate DESC, orderid DESC) AS toporder
      FROM HR.Employees AS E) AS EO
  JOIN Sales.Orders AS O
    ON O.orderid = EO.toporder;

-- Listing 9-4: Solution 2 to the Three Most Recent Orders for each Employee Problem
SELECT O1.empid, O1.orderid, O1.custid, O1.orderdate, O1.requireddate 
FROM HR.Employees AS E
   JOIN Sales.Orders AS O1
     ON orderid IN
       (SELECT TOP (3) orderid
        FROM Sales.Orders AS O2
        WHERE O2.empid = E.empid
        ORDER BY orderdate DESC, orderid DESC);

-- Listing 9-5: Solution 3 to the Three Most Recent Orders for each Employee Problem
SELECT E.empid, A.orderid, A.custid, A.orderdate, A.requireddate 
FROM HR.Employees AS E
  CROSS APPLY
    (SELECT TOP (3) orderid, custid, orderdate, requireddate 
     FROM Sales.Orders AS O
     WHERE O.empid = E.empid
     ORDER BY orderdate DESC, orderid DESC) AS A;
GO

-- Create optimal index for next solution
CREATE UNIQUE INDEX idx_eid_odD_oidD_i_cid_rd 
  ON Sales.Orders(empid, orderdate DESC, orderid DESC)
     INCLUDE(custid, requireddate);
GO

-- Listing 9-6: Solution 4 to the Three Most Recent Orders for each Employee Problem
SELECT orderid, custid, orderdate, requireddate
FROM (SELECT orderid, custid, orderdate, requireddate,
        ROW_NUMBER() OVER(PARTITION BY empid
                          ORDER BY orderdate DESC, orderid DESC) AS rownum
      FROM Sales.Orders) AS D
WHERE rownum <= 3;

-- Solutions for TOP n Order Details for each Order
SELECT D.orderid, D.productid, D.qty
FROM Sales.Orders AS O
  CROSS APPLY
    (SELECT TOP (3) OD.orderid, OD.productid, OD.qty
     FROM Sales.OrderDetails AS OD
     WHERE OD.orderid = O.orderid
     ORDER BY qty DESC, productid) AS D;

SELECT orderid, productid, qty
FROM (SELECT ROW_NUMBER() OVER(PARTITION BY orderid 
                               ORDER BY qty DESC, productid) AS rownum,
        orderid, productid, qty
      FROM Sales.OrderDetails) AS D
WHERE rownum <= 3;
GO

---------------------------------------------------------------------
-- Matching Current and Previous Occurrences
---------------------------------------------------------------------

-- Listing 9-7: Query Solution 1 Matching Current and Previous Occurrences
SELECT C.empid,
  C.orderid AS curorderid, P.orderid AS prvorderid,
  C.orderdate AS curorderdate, P.orderdate AS prvorderdate,
  C.requireddate AS curreqdate, P.requireddate AS prvreqdate
FROM Sales.Orders AS C
  LEFT OUTER JOIN Sales.Orders AS P
    ON P.orderid =
       (SELECT TOP (1) orderid
        FROM Sales.Orders AS O
        WHERE O.empid = C.empid
          AND (O.orderdate < C.orderdate
               OR (O.orderdate = C.orderdate
                   AND O.orderid < C.orderid))
        ORDER BY orderdate DESC, orderid DESC)
ORDER BY C.empid, C.orderdate, C.orderid;

-- Listing 9-8: Query Solution 2 Matching Current and Previous Occurrences
SELECT C.empid,
  C.orderid AS curorderid, P.orderid AS prvorderid,
  C.orderdate AS curorderdate, P.orderdate AS prvorderdate,
  C.requireddate AS curreqdate, P.requireddate AS prvreqdate
FROM (SELECT empid, orderid, orderdate, requireddate,
        (SELECT TOP (1) orderid
         FROM Sales.Orders AS O2
         WHERE O2.empid = O1.empid
           AND (O2.orderdate < O1.orderdate
                OR O2.orderdate = O1.orderdate
                   AND O2.orderid < O1.orderid)
         ORDER BY orderdate DESC, orderid DESC) AS prvorderid
      FROM Sales.Orders AS O1) AS C
  LEFT OUTER JOIN Sales.Orders AS P
    ON C.prvorderid = P.orderid
ORDER BY C.empid, C.orderdate, C.orderid;

-- Listing 9-9: Query Solution 3 Matching Current and Previous Occurrences
SELECT C.empid,
  C.orderid AS curorderid, P.orderid AS prvorderid,
  C.orderdate AS curorderdate, P.orderdate AS prvorderdate,
  C.requireddate AS curreqdate, P.requireddate AS prvreqdate
FROM Sales.Orders AS C
  OUTER APPLY
    (SELECT TOP (1) orderid, orderdate, requireddate
     FROM Sales.Orders AS O
     WHERE O.empid = C.empid
       AND (O.orderdate < C.orderdate
            OR (O.orderdate = C.orderdate
               AND O.orderid < C.orderid))
     ORDER BY orderdate DESC, orderid DESC) AS P
ORDER BY C.empid, C.orderdate, C.orderid;

-- Listing 9-10: Query Solution 4 Matching Current and Previous Occurrences
WITH OrdersRN AS
(
  SELECT empid, orderid, orderdate, requireddate,
    ROW_NUMBER() OVER(PARTITION BY empid
                      ORDER BY orderdate, orderid) AS rn
  FROM Sales.Orders
)
SELECT C.empid,
  C.orderid AS curorderid, P.orderid AS prvorderid,
  C.orderdate AS curorderdate, P.orderdate AS prvorderdate,
  C.requireddate AS curreqdate, P.requireddate AS prvreqdate
FROM OrdersRN AS C
  LEFT OUTER JOIN OrdersRN AS P
    ON C.empid = P.empid
    AND C.rn = P.rn + 1
ORDER BY C.empid, C.orderdate, C.orderid;
GO

-- Cleanup
DROP INDEX Sales.Orders.idx_eid_od_oid_i_cid_rd;
DROP INDEX Sales.Orders.idx_eid_odD_oidD_i_cid_rd;
DROP INDEX Sales.OrderDetails.idx_oid_qtyd_pid;
GO

---------------------------------------------------------------------
-- Paging
---------------------------------------------------------------------

-- Index for Paging Problem
CREATE INDEX idx_od_oid_i_cid_eid
  ON Sales.Orders(orderdate, orderid) INCLUDE(custid, empid);
GO

-- Cleanup before Creation of Procedures
IF OBJECT_ID('dbo.GetFirstPage') IS NOT NULL
  DROP PROC dbo.GetFirstPage;
GO
IF OBJECT_ID('dbo.GetNextPage') IS NOT NULL
  DROP PROC dbo.GetNextPage;
GO
IF OBJECT_ID('dbo.GetPrevPage') IS NOT NULL
  DROP PROC dbo.GetPrevPage;
GO

-- First Page
CREATE PROC dbo.GetFirstPage
  @n AS INT = 10
AS
SELECT TOP (@n) orderid, orderdate, custid, empid
FROM Sales.Orders
ORDER BY orderdate, orderid;
GO

-- Test Proc
EXEC dbo.GetFirstPage;
GO

-- Next Page
CREATE PROC dbo.GetNextPage
  @anchor AS INT, -- key of last row in prev page
  @n AS INT = 10
AS
SELECT TOP (@n) O.orderid, O.orderdate, O.custid, O.empid
FROM Sales.Orders AS O
  JOIN Sales.Orders AS A
    ON A.orderid = @anchor
    AND (O.orderdate > A.orderdate
         OR (O.orderdate = A.orderdate
             AND O.orderid > A.orderid))
ORDER BY O.orderdate, O.orderid;
GO

-- Test Proc
EXEC dbo.GetNextPage @anchor = 10257;
EXEC dbo.GetNextPage @anchor = 10267;
GO

-- Optimized Next Page
ALTER PROC dbo.GetNextPage
  @anchor AS INT, -- key of last row in prev page
  @n AS INT = 10
AS
SELECT TOP (@n) O.orderid, O.orderdate, O.custid, O.empid
FROM Sales.Orders AS O
  JOIN Sales.Orders AS A
    ON A.orderid = @anchor
    AND (O.orderdate >= A.orderdate
         AND (O.orderdate > A.orderdate
              OR O.orderid > A.orderid))
ORDER BY O.orderdate, O.orderid;
GO

-- Test Proc
EXEC dbo.GetNextPage @anchor = 10257;
GO

-- Previous Page
CREATE PROC dbo.GetPrevPage
  @anchor AS INT, -- key of first row in next page
  @n AS INT = 10
AS
SELECT orderid, orderdate, custid, empid
FROM (SELECT TOP (@n) O.orderid, O.orderdate, O.custid, O.empid
      FROM Sales.Orders AS O
        JOIN Sales.Orders AS A
          ON A.orderid = @anchor
          AND (O.orderdate <= A.orderdate
               AND (O.orderdate < A.orderdate
                    OR O.orderid < A.orderid))
      ORDER BY O.orderdate DESC, O.orderid DESC) AS D
ORDER BY orderdate, orderid;
GO

-- Test Proc
EXEC dbo.GetPrevPage @anchor = 10268;
EXEC dbo.GetPrevPage @anchor = 10258;
GO

-- For dynamic paging see dynamic execution chapter
-- For flexible scrollable paging see row numbers solution

-- Cleanup
DROP INDEX Sales.Orders.idx_od_oid_i_cid_eid;
GO

---------------------------------------------------------------------
-- Random Rows
---------------------------------------------------------------------

-- Attempt to get Random Row
SELECT TOP (1) orderid, orderdate, custid, empid
FROM Sales.Orders
ORDER BY RAND();

-- Deterministic Random
SELECT RAND(5);
SELECT RAND();

-- Non-Deterministic Random
SELECT CHECKSUM(NEWID());

SELECT ABS(CHECKSUM(NEWID())) % 10 + 1;

-- Solutions to Random Row
SELECT TOP (1) orderid, orderdate, custid, empid
FROM Sales.Orders
ORDER BY CHECKSUM(NEWID());

SELECT TOP (1) orderid, orderdate, custid, empid
FROM (SELECT TOP (100e0*(CHECKSUM(NEWID()) + 2147483649)/4294967296e0) PERCENT
        orderid, orderdate, custid, empid
      FROM Sales.Orders
      ORDER BY orderid) AS D
ORDER BY orderid DESC;

-- N Random Rows for rach Employee
SELECT orderid, custid, empid, orderdate, requireddate 
FROM HR.Employees AS E
  CROSS APPLY
    (SELECT TOP (3) orderid, custid, orderdate, requireddate 
     FROM Sales.Orders AS O
     WHERE O.empid = E.empid
     ORDER BY CHECKSUM(NEWID())) AS A;
GO

---------------------------------------------------------------------
-- Median
---------------------------------------------------------------------

-- Creating and Populating the Groups Table
USE tempdb;

IF OBJECT_ID('dbo.Groups') IS NOT NULL DROP TABLE dbo.Groups;

CREATE TABLE dbo.Groups
(
  groupid  VARCHAR(10) NOT NULL,
  memberid INT         NOT NULL,
  string   VARCHAR(10) NOT NULL,
  val      INT         NOT NULL,
  PRIMARY KEY (groupid, memberid)
);
GO
  
INSERT INTO dbo.Groups(groupid, memberid, string, val) VALUES
  ('a', 3, 'stra1', 6),
  ('a', 9, 'stra2', 7),
  ('b', 2, 'strb1', 3),
  ('b', 4, 'strb2', 7),
  ('b', 5, 'strb3', 3),
  ('b', 9, 'strb4', 11),
  ('c', 3, 'strc1', 8),
  ('c', 7, 'strc2', 10),
  ('c', 9, 'strc3', 12);
GO

-- Median for whole Table
SELECT
  ((SELECT MAX(val)
    FROM (SELECT TOP (50) PERCENT val
          FROM dbo.Groups
          ORDER BY val) AS M1)
   +
   (SELECT MIN(val)
    FROM (SELECT TOP (50) PERCENT val
          FROM dbo.Groups
          ORDER BY val DESC) AS M2))
  /2. AS median;

-- Median for each Group
SELECT groupid,
  ((SELECT MAX(val)
    FROM (SELECT TOP (50) PERCENT val
          FROM dbo.Groups AS H1
          WHERE H1.groupid = G.groupid
          ORDER BY val) AS M1)
   +
   (SELECT MIN(val)
    FROM (SELECT TOP (50) PERCENT val
          FROM dbo.Groups AS H2
          WHERE H2.groupid = G.groupid
          ORDER BY val DESC) AS M2))
  /2. AS median
FROM (SELECT DISTINCT groupid FROM dbo.Groups) AS G;

---------------------------------------------------------------------
-- Logcial Transformations
---------------------------------------------------------------------

-- Creating and Populating the MyOrders Table
IF OBJECT_ID('dbo.MyOrders') IS NOT NULL
  DROP TABLE dbo.MyOrders;
GO
SELECT * INTO dbo.MyOrders FROM Sales.Orders
CREATE INDEX idx_dt ON dbo.MyOrders(orderdate);
GO

-- Anchor: orderdate - '20080506', orderid - 11075

-- Listing 9-11: Query Using OR Logic
SELECT orderid, orderdate, custid, empid
FROM dbo.MyOrders
WHERE orderdate > '20080506'
   OR (orderdate = '20080506' AND orderid > 11075);

-- Listing 9-12: Query Using AND Logic
SELECT orderid, orderdate, custid, empid
FROM dbo.MyOrders
WHERE orderdate >= '20080506'
  AND (orderdate > '20080506' OR orderid > 11075);

-- Index on Both Columns
CREATE INDEX idx_dt_oid ON dbo.MyOrders(orderdate, orderid);
GO

-- Rerun queries in Listing 9-11 and Listing 9-12

-- Cleanup
IF OBJECT_ID('dbo.MyOrders') IS NOT NULL
  DROP TABLE dbo.MyOrders;
GO
