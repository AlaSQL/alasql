---------------------------------------------------------------------
-- Inside Microsoft SQL Server 2008: T-SQL Querying (MSPress, 2009)
-- Chapter 10 - Data Modification
-- Copyright Itzik Ben-Gan, 2009
-- All Rights Reserved
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Inserting Data
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Enhanced VALUES Clause
---------------------------------------------------------------------

SET NOCOUNT ON;
USE tempdb;

IF OBJECT_ID('dbo.Customers', 'U') IS NOT NULL DROP TABLE dbo.Customers;

CREATE TABLE dbo.Customers
(
  custid      INT         NOT NULL,
  companyname VARCHAR(25) NOT NULL,
  phone       VARCHAR(20) NOT NULL,
  address     VARCHAR(50) NOT NULL,
  CONSTRAINT PK_Customers PRIMARY KEY(custid)
);
GO

-- Insert multiple rows
INSERT INTO dbo.Customers(custid, companyname, phone, address)
  VALUES
  (1, 'cust 1', '(111) 111-1111', 'address 1'),
  (2, 'cust 2', '(222) 222-2222', 'address 2'),
  (3, 'cust 3', '(333) 333-3333', 'address 3'),
  (4, 'cust 4', '(444) 444-4444', 'address 4'),
  (5, 'cust 5', '(555) 555-5555', 'address 5');

INSERT INTO dbo.Customers(custid, companyname, phone, address)
            SELECT 1, 'cust 1', '(111) 111-1111', 'address 1'
  UNION ALL SELECT 2, 'cust 2', '(222) 222-2222', 'address 2'
  UNION ALL SELECT 3, 'cust 3', '(333) 333-3333', 'address 3'
  UNION ALL SELECT 4, 'cust 4', '(444) 444-4444', 'address 4'
  UNION ALL SELECT 5, 'cust 5', '(555) 555-5555', 'address 5';

-- Inline table expression
SELECT *
FROM
  (VALUES
     (1, 'cust 1', '(111) 111-1111', 'address 1'),
     (2, 'cust 2', '(222) 222-2222', 'address 2'),
     (3, 'cust 3', '(333) 333-3333', 'address 3'),
     (4, 'cust 4', '(444) 444-4444', 'address 4'),
     (5, 'cust 5', '(555) 555-5555', 'address 5')
  ) AS C(custid, companyname, phone, address);

---------------------------------------------------------------------
-- SELECT INTO
---------------------------------------------------------------------

-- Create a copy of Shippers
SET NOCOUNT ON;
USE tempdb;

IF OBJECT_ID('tempdb..#MyShippers') IS NOT NULL DROP TABLE #MyShippers;

SELECT shipperid, companyname, phone
INTO #MyShippers
FROM InsideTSQL2008.Sales.Shippers;

-- Creating an Empty Copy of a Table
IF OBJECT_ID('dbo.MyOrders') IS NOT NULL DROP TABLE dbo.MyOrders;
GO

SELECT *
INTO dbo.MyOrders
FROM InsideTSQL2008.Sales.Orders
WHERE 1 = 2;

-- Do not Preserve IDENTITY Property
IF OBJECT_ID('dbo.MyOrders') IS NOT NULL DROP TABLE dbo.MyOrders;
GO

SELECT orderid+0 AS orderid, custid, empid, orderdate,
  requireddate, shippeddate, shipperid, freight, shipname, 
  shipaddress, shipcity, shipregion, shippostalcode, shipcountry
INTO dbo.MyOrders
FROM InsideTSQL2008.Sales.Orders
WHERE 1 = 2;

---------------------------------------------------------------------
-- BULK Rowset Provider
---------------------------------------------------------------------

-- Using the BULK rowset provider to return file data as a rowset
SELECT shipperid, companyname, phone
FROM OPENROWSET(BULK 'c:\temp\shippers.txt',
                FORMATFILE = 'c:\temp\shippers.fmt') AS S;

-- Loading file data to a target table using the BULK rowset provider
USE tempdb;

IF OBJECT_ID('dbo.Shippers') IS NOT NULL DROP TABLE dbo.Shippers;

CREATE TABLE dbo.Shippers
(
  shipperid   INT          NOT NULL PRIMARY KEY,
  companyname NVARCHAR(40) NOT NULL,
  phone       NVARCHAR(24) NOT NULL
);
GO

INSERT INTO dbo.Shippers WITH (TABLOCK) (shipperid, companyname, phone)
  SELECT shipperid, companyname, phone
  FROM OPENROWSET(BULK 'c:\temp\shippers.txt',
                  FORMATFILE = 'c:\temp\shippers.fmt') AS S;

-- Listing 10-1: Create table CustomerData
IF OBJECT_ID('dbo.CustomerData') IS NOT NULL DROP TABLE dbo.CustomerData;

CREATE TABLE dbo.CustomerData
(
  custid      INT            NOT NULL PRIMARY KEY,
  txt_data    VARCHAR(MAX)   NULL,
  ntxt_data   NVARCHAR(MAX)  NULL,
  binary_data VARBINARY(MAX) NULL,
  xml_data    XML            NULL
);
GO

-- Load XML file to XML column using INSERT
INSERT INTO dbo.CustomerData(custid, xml_data)
  VALUES(
    101,
    (SELECT xml_data FROM OPENROWSET(
      BULK 'c:\temp\xmlfile101.xml', SINGLE_NCLOB) AS F(xml_data)));

-- Load files to LOB columns using UPDATE
UPDATE dbo.CustomerData
  SET txt_data  = (SELECT txt_data FROM OPENROWSET(
    BULK 'c:\temp\textfile101.txt', SINGLE_CLOB) AS F(txt_data)),
  ntxt_data  = (SELECT ntxt_data FROM OPENROWSET(
    BULK 'c:\temp\unicodefile101.txt', SINGLE_NCLOB) AS F(ntxt_data)),
  binary_data  = (SELECT binary_data FROM OPENROWSET(
    BULK 'c:\temp\binaryfile101.jpg', SINGLE_BLOB) AS F(binary_data))
WHERE custid = 101;

-- Examine data
SELECT * FROM dbo.CustomerData WHERE custid = 101;
GO

---------------------------------------------------------------------
-- Minimally Logged Operations
---------------------------------------------------------------------

-- Check amount of logging (count, size, duration)
CHECKPOINT;
GO

DECLARE @numrecords AS INT, @size AS BIGINT, @dt AS DATETIME;

SELECT 
  @numrecords = COUNT(*),
  @size       = COALESCE(SUM([Log Record Length]), 0),
  @dt         = CURRENT_TIMESTAMP
FROM fn_dblog(NULL, NULL) AS D
WHERE AllocUnitName = '<table_name>' OR AllocUnitName LIKE '<table_name>.%';

-- <operation>

SELECT 
  COUNT(*) - @numrecords AS numrecords,
  CAST((COALESCE(SUM([Log Record Length]), 0) - @size)
    / 1024. / 1024. AS NUMERIC(12, 2)) AS size_mb,
  CAST(DATEDIFF(millisecond, @dt, CURRENT_TIMESTAMP)/1000. AS DECIMAL(12,3))
    AS duration_sec
FROM fn_dblog(NULL, NULL) AS D
WHERE AllocUnitName = '<table_name>' OR AllocUnitName LIKE '<table_name>.%';

-- Histogram
DECLARE @numsteps AS INT = 10;
DECLARE @log AS TABLE(id INT IDENTITY, size INT, PRIMARY KEY(size, id));

INSERT INTO @log(size)
  SELECT [Log Record Length]
  FROM fn_dblog(null, null) AS D
  WHERE AllocUnitName = 'dbo.T1' OR AllocUnitName LIKE 'dbo.T1.%';

WITH Args AS
(
  SELECT MIN(size) AS mn, MAX(size) AS mx,
    1E0*(MAX(size) - MIN(size)) / @numsteps AS stepsize
  FROM @log
),
Steps AS
(
  SELECT n,
    mn + (n-1)*stepsize - CASE WHEN n = 1 THEN 1 ELSE 0 END AS lb,
    mn + n*stepsize AS hb
  FROM Nums
    CROSS JOIN Args
  WHERE n <= @numsteps
)
SELECT n, lb, hb, COUNT(size) AS numrecords
FROM Steps
  LEFT OUTER JOIN @log
    ON size > lb AND size <= hb
GROUP BY n, lb, hb
ORDER BY n;

-- Breakdown of Log Record Types
SELECT Operation, Context,
  AVG([Log Record Length]) AS AvgLen, COUNT(*) AS Cnt
FROM fn_dblog(null, null) AS D
WHERE AllocUnitName = 'dbo.T1' OR AllocUnitName LIKE 'dbo.T1.%'
GROUP BY Operation, Context, ROUND([Log Record Length], -2)
ORDER BY AvgLen, Operation, Context;

/*
-- Alternative:
SELECT Operation, Context,
  '1'+REPLICATE('0',-1+LEN([Log Record Length]))+'s' AS [Log Entry Sizes],
  AVG([Log Record Length]) AS AvgLen, COUNT(*) AS Cnt
FROM fn_dblog(null, null) AS D
WHERE AllocUnitName = 'dbo.T1' OR AllocUnitName LIKE 'dbo.T1.%'
GROUP BY Operation, Context, LEN([Log Record Length])
ORDER BY AvgLen, Operation, Context;
*/

-- Create test database with FULL recovery
USE master;
IF DB_ID('testdb') IS NULL CREATE DATABASE testdb;
GO
USE testdb;  
GO

-- Test scenarios

-- Set recovery to FULL and backup to get out of log truncate mode
ALTER DATABASE testdb SET RECOVERY FULL;
BACKUP DATABASE testdb TO DISK = 'c:\temp\testdb.bak' WITH INIT;
GO

-- Scenario 1: SELECT INTO, FULL Recovery
-- Listing 10-2: Script with SELECT INTO
USE testdb;

-- Preparation
-- Replace this code with your preparation code
IF OBJECT_ID('dbo.T1', 'U') IS NOT NULL DROP TABLE dbo.T1;
CHECKPOINT;
GO

-- Collect values prior to operation
DECLARE @numrecords AS INT, @size AS BIGINT, @dt AS DATETIME;

SELECT 
  @numrecords = COUNT(*),
  @size       = COALESCE(SUM([Log Record Length]), 0),
  @dt         = CURRENT_TIMESTAMP
FROM fn_dblog(NULL, NULL) AS D
WHERE AllocUnitName = 'dbo.T1' OR AllocUnitName LIKE 'dbo.T1.%';

-- Operation
-- Replace this code with your operation code
SELECT n, CAST('a' AS CHAR(2000)) AS filler
INTO dbo.T1
FROM dbo.Nums
WHERE n <= 100000;

-- Calculate delta of values for operation
SELECT 
  COUNT(*) - @numrecords AS numrecords,
  CAST((COALESCE(SUM([Log Record Length]), 0) - @size)
    / 1024. / 1024. AS NUMERIC(12, 2)) AS size_mb,
  CAST(DATEDIFF(millisecond, @dt, CURRENT_TIMESTAMP)/1000. AS DECIMAL(12,3))
    AS duration_sec
FROM fn_dblog(NULL, NULL) AS D
WHERE AllocUnitName = 'dbo.T1' OR AllocUnitName LIKE 'dbo.T1.%';

-- Generate histogram
DECLARE @numsteps AS INT = 10;
DECLARE @log AS TABLE(id INT IDENTITY, size INT, PRIMARY KEY(size, id));

INSERT INTO @log(size)
  SELECT [Log Record Length]
  FROM fn_dblog(null, null) AS D
  WHERE AllocUnitName = 'dbo.T1' OR AllocUnitName LIKE 'dbo.T1.%';

WITH Args AS
(
  SELECT MIN(size) AS mn, MAX(size) AS mx,
    1E0*(MAX(size) - MIN(size)) / @numsteps AS stepsize
  FROM @log
),
Steps AS
(
  SELECT n,
    mn + (n-1)*stepsize - CASE WHEN n = 1 THEN 1 ELSE 0 END AS lb,
    mn + n*stepsize AS hb
  FROM Nums
    CROSS JOIN Args
  WHERE n <= @numsteps
)
SELECT n, lb, hb, COUNT(size) AS numrecords
FROM Steps
  LEFT OUTER JOIN @log
    ON size > lb AND size <= hb
GROUP BY n, lb, hb
ORDER BY n;

-- Get breakdown of log record types
SELECT Operation, Context,
  AVG([Log Record Length]) AS AvgLen, COUNT(*) AS Cnt
FROM fn_dblog(null, null) AS D
WHERE AllocUnitName = 'dbo.T1' OR AllocUnitName LIKE 'dbo.T1.%'
GROUP BY Operation, Context, ROUND([Log Record Length], -2)
ORDER BY AvgLen, Operation, Context;
GO

-- Scenario 2: SELECT INTO, Non-FULL Recovery
ALTER DATABASE testdb SET RECOVERY SIMPLE;

-- Scenario 3: INSERT SELECT, Empty Heap, TABLOCK

-- Preparation
IF OBJECT_ID('dbo.T1', 'U') IS NOT NULL DROP TABLE dbo.T1;

CREATE TABLE dbo.T1
(
  n INT NOT NULL,
  filler CHAR(2000) NOT NULL
);

CHECKPOINT;
GO

-- Operation
INSERT INTO dbo.T1 WITH (TABLOCK) (n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n <= 100000;

-- Scenario 4: INSERT SELECT, Nonempty Heap, TABLOCK

-- Preparation
CHECKPOINT;
GO

-- Operation
INSERT INTO dbo.T1 WITH (TABLOCK) (n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n BETWEEN 100001 AND 200000;

-- Scenario 5: INSERT SELECT, Empty Heap, Without TABLOCK

-- Preparation
IF OBJECT_ID('dbo.T1', 'U') IS NOT NULL DROP TABLE dbo.T1;

CREATE TABLE dbo.T1
(
  n INT NOT NULL,
  filler CHAR(2000) NOT NULL
);

CHECKPOINT;
GO

-- Operation
INSERT INTO dbo.T1 (n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n <= 100000;

-- Scenario 6: INSERT SELECT, Empty B-Tree, TABLOCK

-- Preparation
IF OBJECT_ID('dbo.T1', 'U') IS NOT NULL DROP TABLE dbo.T1;

CREATE TABLE dbo.T1
(
  n INT NOT NULL,
  filler CHAR(2000) NOT NULL
);

CREATE UNIQUE CLUSTERED INDEX idx_n ON dbo.T1(n);

CHECKPOINT;
GO

-- Operation
INSERT INTO dbo.T1 WITH (TABLOCK) (n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n <= 200000
    AND n % 2 = 0
  ORDER BY n;

-- Scenario 7: INSERT SELECT, Nonempty B-Tree, TABLOCK, TF-610 Off, New Key-Range

-- Preparation
CHECKPOINT;
GO

-- Operation
INSERT INTO dbo.T1 WITH (TABLOCK) (n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n BETWEEN 200001 AND 300000
  ORDER BY n;

-- Turn trace flag 610 on
DBCC TRACEON(610, -1);
DBCC TRACESTATUS;

-- Scenario 8: INSERT SELECT, Nonempty B-Tree, TABLOCK, TF-610 On, New Key-Range

-- Preparation
IF OBJECT_ID('dbo.T1', 'U') IS NOT NULL DROP TABLE dbo.T1;

CREATE TABLE dbo.T1
(
  n INT NOT NULL,
  filler CHAR(2000) NOT NULL
);

CREATE UNIQUE CLUSTERED INDEX idx_n ON dbo.T1(n);

INSERT INTO dbo.T1 WITH (TABLOCK) (n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n <= 200000
    AND n % 2 = 0
  ORDER BY n;

CHECKPOINT;
GO

-- Operation
INSERT INTO dbo.T1 WITH (TABLOCK) (n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n BETWEEN 200001 AND 300000
  ORDER BY n;

-- Turn trace flag 610 off
DBCC TRACEOFF(610, -1);
DBCC TRACESTATUS;

-- Scenario 9 : INSERT SELECT, Nonempty B-Tree, TABLOCK, Merged Key-Range

-- Preparation
IF OBJECT_ID('dbo.T1', 'U') IS NOT NULL DROP TABLE dbo.T1;

CREATE TABLE dbo.T1
(
  n INT NOT NULL,
  filler CHAR(2000) NOT NULL
);

CREATE UNIQUE CLUSTERED INDEX idx_n ON dbo.T1(n);

INSERT INTO dbo.T1 WITH (TABLOCK) (n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n <= 200000
    AND n % 2 = 0
  ORDER BY n;

CHECKPOINT;
GO

-- Operation
INSERT INTO dbo.T1 WITH (TABLOCK) (n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n <= 200000
    AND n % 2 = 1
  ORDER BY n;

-- Scenario 10: INSERT SELECT, Empty B-Tree, Without TABLOCK, TF-610 Off

-- Preparation
DBCC TRACEOFF(610, -1);

IF OBJECT_ID('dbo.T1', 'U') IS NOT NULL DROP TABLE dbo.T1;

CREATE TABLE dbo.T1
(
  n INT NOT NULL,
  filler CHAR(2000) NOT NULL
);

CREATE UNIQUE CLUSTERED INDEX idx_n ON dbo.T1(n);

CHECKPOINT;
GO

-- Operation
INSERT INTO dbo.T1 (n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n <= 200000
    AND n % 2 = 0
  ORDER BY n;

-- Scenario 11: INSERT SELECT, Empty B-Tree, Without TABLOCK, TF-610 On

-- Preparation
DBCC TRACEON(610, -1);

IF OBJECT_ID('dbo.T1', 'U') IS NOT NULL DROP TABLE dbo.T1;

CREATE TABLE dbo.T1
(
  n INT NOT NULL,
  filler CHAR(2000) NOT NULL
);

CREATE UNIQUE CLUSTERED INDEX idx_n ON dbo.T1(n);

CHECKPOINT;
GO

-- Operation
INSERT INTO dbo.T1 (n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n <= 200000
    AND n % 2 = 0
  ORDER BY n;

-- Scenario 12: INSERT SELECT, nonempty B-tree, new key-range, without TABLOCK

-- Preparation
DBCC TRACEOFF(610, -1);

IF OBJECT_ID('dbo.T1', 'U') IS NOT NULL DROP TABLE dbo.T1;

CREATE TABLE dbo.T1
(
  n INT NOT NULL,
  filler CHAR(2000) NOT NULL
);

CREATE UNIQUE CLUSTERED INDEX idx_n ON dbo.T1(n);

INSERT INTO dbo.T1 WITH (TABLOCK) (n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n <= 200000
    AND n % 2 = 0
  ORDER BY n;
CHECKPOINT;
GO

-- Operation
INSERT INTO dbo.T1 (n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n BETWEEN 200001 AND 300000
  ORDER BY n;

-- Scenario 13: INSERT SELECT, Nonempty B-Tree, without TABLOCK, TF-610 On, New Key-Range

-- Preparation
DBCC TRACEON(610, -1);

IF OBJECT_ID('dbo.T1', 'U') IS NOT NULL DROP TABLE dbo.T1;

CREATE TABLE dbo.T1
(
  n INT NOT NULL,
  filler CHAR(2000) NOT NULL
);

CREATE UNIQUE CLUSTERED INDEX idx_n ON dbo.T1(n);

INSERT INTO dbo.T1 WITH (TABLOCK) (n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n <= 200000
    AND n % 2 = 0
  ORDER BY n;

CHECKPOINT;
GO

-- Operation
INSERT INTO dbo.T1(n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n BETWEEN 200001 AND 300000
  ORDER BY n;

-- Scenario 14: INSERT SELECT, non-FULL recovery, nonempty B-tree, merged key-range, without TABLOCK

-- Preparation
IF OBJECT_ID('dbo.T1', 'U') IS NOT NULL DROP TABLE dbo.T1;

CREATE TABLE dbo.T1
(
  n INT NOT NULL,
  filler CHAR(2000) NOT NULL
);

CREATE UNIQUE CLUSTERED INDEX idx_n ON dbo.T1(n);

INSERT INTO dbo.T1 WITH (TABLOCK) (n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n <= 200000
    AND n % 2 = 0
  ORDER BY n;

CHECKPOINT;
GO

-- Operation
INSERT INTO dbo.T1(n, filler)
  SELECT n, CAST('a' AS CHAR(2000)) AS filler
  FROM dbo.Nums
  WHERE n <= 200000
    AND n % 2 = 1
GO

---------------------------------------------------------------------
-- INSERT EXEC
---------------------------------------------------------------------

-- Creation script for paging stored procedures
USE InsideTSQL2008;
GO

-- Index for paging problem
IF INDEXPROPERTY(OBJECT_ID('Sales.Orders'),
     'idx_od_oid_i_cid_eid', 'IndexID') IS NOT NULL
  DROP INDEX Sales.Orders.idx_od_oid_i_cid_eid;
GO
CREATE INDEX idx_od_oid_i_cid_eid
  ON Sales.Orders(orderdate, orderid, custid, empid);
GO

-- First Rows
IF OBJECT_ID('dbo.GetFirstRows') IS NOT NULL
  DROP PROC dbo.GetFirstRows;
GO
CREATE PROC dbo.GetFirstRows
  @n AS INT = 10 -- num rows
AS
SELECT TOP(@n) ROW_NUMBER() OVER(ORDER BY orderdate, orderid) AS rownum,
  orderid, orderdate, custid, empid
FROM Sales.Orders
ORDER BY orderdate, orderid;
GO

-- Next Rows
IF OBJECT_ID('dbo.GetNextRows') IS NOT NULL
  DROP PROC dbo.GetNextRows;
GO
CREATE PROC dbo.GetNextRows
  @anchor_rownum  AS INT = 0, -- row number of last row in prev page
  @anchor_key     AS INT,     -- key of last row in prev page,
  @n              AS INT = 10 -- num rows
AS
SELECT TOP(@n)
  @anchor_rownum
    + ROW_NUMBER() OVER(ORDER BY O.orderdate, O.orderid) AS rownum,
  O.orderid, O.orderdate, O.custid, O.empid
FROM Sales.Orders AS O
  JOIN Sales.Orders AS A
    ON A.orderid = @anchor_key
    AND (O.orderdate >= A.orderdate
         AND (O.orderdate > A.orderdate
              OR O.orderid > A.orderid))
ORDER BY O.orderdate, O.orderid;
GO

-- Create Table #CachedPages
IF OBJECT_ID('tempdb..#CachedPages') IS NOT NULL
  DROP TABLE #CachedPages;
GO
CREATE TABLE #CachedPages
(
  rownum     INT      NOT NULL PRIMARY KEY,
  orderid    INT      NOT NULL UNIQUE,
  orderdate  DATETIME NOT NULL,
  custid     INT      NOT NULL,
  empid      INT      NOT NULL
);
GO

-- Creation script for the stored procedure GetPage
IF OBJECT_ID('dbo.GetPage') IS NOT NULL
  DROP PROC dbo.GetPage;
GO
CREATE PROC dbo.GetPage
  @from_rownum AS INT,       -- row number of first row in requested page
  @to_rownum   AS INT,       -- row number of last row in requested page
  @rc          AS INT OUTPUT -- number of rows returned
AS

SET NOCOUNT ON;

DECLARE
  @last_key    AS INT, -- key of last row in #CachedPages
  @last_rownum AS INT, -- row number of last row in #CachedPages
  @numrows     AS INT; -- number of missing rows in #CachedPages

-- Get anchor values from last cached row
SELECT @last_rownum = rownum, @last_key = orderid
FROM (SELECT TOP(1) rownum, orderid
      FROM #CachedPages ORDER BY rownum DESC) AS D;

-- If temporary table is empty insert first rows to #CachedPages
IF @last_rownum IS NULL
  INSERT INTO #CachedPages
    EXEC dbo.GetFirstRows
      @n = @to_rownum;
ELSE
BEGIN
  SET @numrows = @to_rownum - @last_rownum;
  IF @numrows > 0
    INSERT INTO #CachedPages
      EXEC dbo.GetNextRows
        @anchor_rownum = @last_rownum,
        @anchor_key    = @last_key,
        @n             = @numrows;
END

-- Return requested page
SELECT *
FROM #CachedPages
WHERE rownum BETWEEN @from_rownum AND @to_rownum
ORDER BY rownum;

SET @rc = @@rowcount;
GO

-- Get rows 1-10
DECLARE @rc AS INT;

EXEC dbo.GetPage
  @from_rownum = 1,
  @to_rownum   = 10,
  @rc          = @rc OUTPUT;

IF @rc = 0
  PRINT 'No more pages.'
ELSE IF @rc < 10
  PRINT 'Reached last page.';
GO

-- Examine #CachedPages; you will find 10 rows
SELECT * FROM #CachedPages;
GO

-- Get rows 21-30
DECLARE @rc AS INT;

EXEC dbo.GetPage
  @from_rownum = 21,
  @to_rownum   = 30,
  @rc          = @rc OUTPUT;

IF @rc = 0
  PRINT 'No more pages.'
ELSE IF @rc < 10
  PRINT 'Reached last page.';
GO

-- Examine #CachedPages; you will find 30 rows
SELECT * FROM #CachedPages;
GO

-- Cleanup
IF OBJECT_ID('tempdb..#CachedPages') IS NOT NULL
  DROP TABLE #CachedPages;
GO
IF INDEXPROPERTY(OBJECT_ID('Sales.Orders'),
     'idx_od_oid_i_cid_eid', 'IndexID') IS NOT NULL
  DROP INDEX Sales.Orders.idx_od_oid_i_cid_eid;
GO
IF OBJECT_ID('dbo.GetFirstRows') IS NOT NULL
  DROP PROC dbo.GetFirstRows;
GO
IF OBJECT_ID('dbo.GetNextRows') IS NOT NULL
  DROP PROC dbo.GetNextRows;
GO
IF OBJECT_ID('dbo.GetPage') IS NOT NULL
  DROP PROC dbo.GetPage;
GO

---------------------------------------------------------------------
-- Sequence Mechanisms
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Identity Columns
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Custom Sequences
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Blocking Sequences
---------------------------------------------------------------------

-- Sequence Table
USE tempdb;
IF OBJECT_ID('dbo.Sequence') IS NOT NULL DROP TABLE dbo.Sequence;
CREATE TABLE dbo.Sequence(val INT);
GO
INSERT INTO dbo.Sequence VALUES(0);
GO

---------------------------------------------------------------------
-- Single Sequence Value
---------------------------------------------------------------------

-- Sequence Proc
IF OBJECT_ID('dbo.GetSequence') IS NOT NULL
  DROP PROC dbo.GetSequence;
GO

CREATE PROC dbo.GetSequence
  @val AS INT OUTPUT
AS
UPDATE dbo.Sequence
  SET @val = val = val + 1;
GO

-- Get Next Sequence
DECLARE @key AS INT;
EXEC dbo.GetSequence @val = @key OUTPUT;
SELECT @key;

-- Reset Sequence
UPDATE dbo.Sequence SET val = 0;
GO

---------------------------------------------------------------------
-- Block of Sequence Values
---------------------------------------------------------------------

-- Alter Sequence Proc to Support a Block of Sequence Values
ALTER PROC dbo.GetSequence
  @val AS INT OUTPUT,
  @n   AS INT = 1
AS
UPDATE dbo.Sequence
  SET @val = val = val + @n;

SET @val = @val - @n + 1;
GO

-- Assign Sequence Values to Multiple Rows
DECLARE @firstkey AS INT, @rc AS INT;

IF OBJECT_ID('tempdb..#CustsStage') IS NOT NULL DROP TABLE #CustsStage;

SELECT custid, ROW_NUMBER() OVER(ORDER BY (SELECT 0)) AS rownum
INTO #CustsStage 
FROM InsideTSQL2008.Sales.Customers
WHERE country = N'UK';

SET @rc = @@rowcount;
EXEC dbo.GetSequence @val = @firstkey OUTPUT, @n = @rc;

SELECT custid, @firstkey + rownum - 1 AS keycol
FROM #CustsStage;
GO

---------------------------------------------------------------------
-- Nonblocking Sequences
---------------------------------------------------------------------

-- Sequence Table
USE tempdb;
IF OBJECT_ID('dbo.Sequence') IS NOT NULL DROP TABLE dbo.Sequence;
CREATE TABLE dbo.Sequence(val INT IDENTITY);
GO

-- Sequence Proc
IF OBJECT_ID('dbo.GetSequence') IS NOT NULL
  DROP PROC dbo.GetSequence;
GO

CREATE PROC dbo.GetSequence
  @val AS INT OUTPUT
AS
BEGIN TRAN
  SAVE TRAN S1;
  INSERT INTO dbo.Sequence DEFAULT VALUES;
  SET @val = SCOPE_IDENTITY();
  ROLLBACK TRAN S1;
COMMIT TRAN
GO

-- Get Next Sequence
DECLARE @key AS INT;
EXEC dbo.GetSequence @val = @key OUTPUT;
SELECT @key;

-- Reset Sequence
TRUNCATE TABLE dbo.Sequence;
GO

-- Revised Sequence Proc
IF OBJECT_ID('dbo.GetSequence') IS NOT NULL
  DROP PROC dbo.GetSequence;
GO

CREATE PROC dbo.GetSequence
  @val AS INT OUTPUT
AS

INSERT INTO dbo.Sequence DEFAULT VALUES;
SET @val = SCOPE_IDENTITY();
GO

-- Get Next Sequence
DECLARE @key AS INT;
EXEC dbo.GetSequence @val = @key OUTPUT;
SELECT @key;

-- Clear Sequence table
BEGIN TRAN
  DECLARE @val AS INT;
  SELECT TOP (1) @val = val FROM dbo.Sequence WITH (TABLOCKX); -- lock table
  SET @val = IDENT_CURRENT('dbo.Sequence') + 1;
  TRUNCATE TABLE dbo.Sequence;
  DBCC CHECKIDENT('dbo.Sequence', RESEED, @val);  
COMMIT
GO

---------------------------------------------------------------------
-- Global Unique Identifiers
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Deleting Data
---------------------------------------------------------------------

---------------------------------------------------------------------
-- TRUNCATE vs. DELETE
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Removing Rows with Duplicate Data
---------------------------------------------------------------------

-- DDL & Sample Data
USE tempdb;
IF OBJECT_ID('dbo.OrdersDups') IS NOT NULL DROP TABLE dbo.OrdersDups;
GO

SELECT orderid, custid, empid, orderdate
INTO dbo.OrdersDups
FROM InsideTSQL2008.Sales.Orders
  CROSS JOIN dbo.Nums
WHERE n <= 3;
GO

-- Small percent of dups
WITH Dups AS
(
  SELECT orderid, custid, empid, orderdate,
    ROW_NUMBER() OVER(PARTITION BY orderid ORDER BY (SELECT 0)) AS rn
  FROM dbo.OrdersDups
)
DELETE FROM Dups
WHERE rn > 1;

-- Small percent of dups, version 2
WITH Dups AS
(
  SELECT orderid, custid, empid, orderdate,
    ROW_NUMBER() OVER(PARTITION BY orderid ORDER BY (SELECT 0)) AS rn,
    RANK() OVER(PARTITION BY orderid ORDER BY (SELECT 0)) AS rnk
  FROM dbo.OrdersDups
)
DELETE FROM Dups
WHERE rn <> rnk;

-- Large percent of dups
WITH Dups AS
(
  SELECT orderid, custid, empid, orderdate,
    ROW_NUMBER() OVER(PARTITION BY orderid ORDER BY (SELECT 0)) AS rn
  FROM dbo.OrdersDups
)
SELECT orderid, custid, empid, orderdate
INTO dbo.OrdersDupsTmp
FROM Dups
WHERE rn = 1;

DROP TABLE dbo.OrdersDups;

EXEC sp_rename 'dbo.OrdersDupsTmp', 'OrdersDups';

---------------------------------------------------------------------
-- DELETE Using Joins
---------------------------------------------------------------------

USE InsideTSQL2008;

-- Delete order details for orders placed
-- on or after '20080506'

-- T-SQL Specific Syntax
SELECT OD.*
FROM Sales.OrderDetails AS OD
  JOIN Sales.Orders AS O
    ON OD.orderid = O.orderid
WHERE O.orderdate >= '20080506';

BEGIN TRAN

DELETE FROM OD
FROM Sales.OrderDetails AS OD
  JOIN Sales.Orders AS O
    ON OD.orderid = O.orderid
WHERE O.orderdate >= '20080506';

ROLLBACK TRAN

-- ANSI Syntax
BEGIN TRAN

DELETE FROM Sales.OrderDetails
WHERE EXISTS
  (SELECT *
   FROM Sales.Orders AS O
   WHERE O.orderid = Sales.OrderDetails.orderid
     AND O.orderdate >= '20080506');

ROLLBACK TRAN
GO

-- Delete from a table variable

-- Invalid
DECLARE @MyOD TABLE
(
  orderid   INT NOT NULL,
  productid INT NOT NULL,
  PRIMARY KEY(orderid, productid)
);

INSERT INTO @MyOD VALUES(10001, 14);
INSERT INTO @MyOD VALUES(10001, 51);
INSERT INTO @MyOD VALUES(10001, 65);
INSERT INTO @MyOD VALUES(10248, 11);
INSERT INTO @MyOD VALUES(10248, 42);

/*
DELETE FROM @MyOD
WHERE EXISTS
  (SELECT * FROM Sales.OrderDetails AS OD
   WHERE OD.orderid = @MyOD.orderid
     AND OD.productid = @MyOD.productid);

Msg 137, Level 15, State 2, Line 17
Must declare the scalar variable "@MyOD".
*/

-- Using a second FROM clause to alias table
DELETE FROM MyOD
FROM @MyOD AS MyOD
WHERE EXISTS
  (SELECT * FROM Sales.OrderDetails AS OD
   WHERE OD.orderid = MyOD.orderid
     AND OD.productid = MyOD.productid);

-- Using join
DELETE FROM MyOD
FROM @MyOD AS MyOD
  JOIN Sales.OrderDetails AS OD
    ON OD.orderid = MyOD.orderid
   AND OD.productid = MyOD.productid;

-- Using CTE
WITH MyOD AS (SELECT * FROM @MyOD)
DELETE FROM MyOD
WHERE EXISTS
  (SELECT * FROM Sales.OrderDetails AS OD
   WHERE OD.orderid = MyOD.orderid
     AND OD.productid = MyOD.productid);
GO

---------------------------------------------------------------------
-- Updating Data
---------------------------------------------------------------------

---------------------------------------------------------------------
-- UPDATE Using Joins
---------------------------------------------------------------------

-- Standard
USE InsideTSQL2008;

BEGIN TRAN

  UPDATE Sales.Orders
    SET shipcountry = (SELECT C.country FROM Sales.Customers AS C
                       WHERE C.custid = Sales.Orders.custid),
        shipregion =  (SELECT C.region FROM Sales.Customers AS C
                       WHERE C.custid = Sales.Orders.custid),
        shipcity =    (SELECT C.city FROM Sales.Customers AS C
                       WHERE C.custid = Sales.Orders.custid)
  WHERE custid IN
    (SELECT custid FROM Sales.Customers WHERE country = N'USA');

ROLLBACK TRAN

-- Non-Standard based on join
BEGIN TRAN

  UPDATE O
    SET shipcountry = C.country,
        shipregion = C.region,
        shipcity = C.city
  FROM Sales.Orders AS O
    JOIN Sales.Customers AS C
      ON O.custid = C.custid
  WHERE C.country = N'USA';

ROLLBACK TRAN

-- Using a CTE
BEGIN TRAN;

WITH UPD_CTE AS
(
  SELECT
    O.shipcountry AS set_country, C.country AS get_country,
    O.shipregion  AS set_region,  C.region  AS get_region,
    O.shipcity    AS set_city,    C.city    AS get_city
  FROM Sales.Orders AS O
    JOIN Sales.Customers AS C
      ON O.custid = C.custid
  WHERE C.country = 'USA'
)
UPDATE UPD_CTE
  SET set_country = get_country,
      set_region  = get_region,
      set_city    = get_city;

ROLLBACK TRAN
GO

-- Non-Deterministic Update
USE tempdb;
GO
IF OBJECT_ID('dbo.Orders') IS NOT NULL
  DROP TABLE dbo.Orders;
IF OBJECT_ID('dbo.Customers') IS NOT NULL
  DROP TABLE dbo.Customers;
GO

CREATE TABLE dbo.Customers
(
  custid VARCHAR(5) NOT NULL PRIMARY KEY,
  qty    INT        NULL
);

INSERT INTO dbo.Customers(custid) VALUES('A'),('B');

CREATE TABLE dbo.Orders
(
  orderid INT        NOT NULL PRIMARY KEY,
  custid  VARCHAR(5) NOT NULL REFERENCES dbo.Customers,
  qty     INT        NOT NULL
);

INSERT INTO dbo.Orders(orderid, custid, qty) VALUES
  (1, 'A', 20),
  (2, 'A', 10),
  (3, 'A', 30),
  (4, 'B', 35),
  (5, 'B', 45),
  (6, 'B', 15);

UPDATE Customers
  SET qty = O.qty
FROM dbo.Customers AS C
  JOIN dbo.Orders AS O
    ON C.custid = O.custid;

SELECT custid, qty FROM dbo.Customers;
GO

-- Cleanup
IF OBJECT_ID('dbo.Orders') IS NOT NULL
  DROP TABLE dbo.Orders;
IF OBJECT_ID('dbo.Customers') IS NOT NULL
  DROP TABLE dbo.Customers;
GO

---------------------------------------------------------------------
-- Updating Large Value Types
---------------------------------------------------------------------

-- Insert a row for customer 102
INSERT INTO dbo.CustomerData(custid, txt_data)
  VALUES(102, 'Customer 102 text data');

-- Replacing '102' with 'one hundred and two'
UPDATE dbo.CustomerData
  SET txt_data.WRITE('one hundred and two', 9, 3)
WHERE custid = 102;

-- Removing all data from offset 28 till the end
UPDATE dbo.CustomerData
  SET txt_data.WRITE(NULL, 28, 0)
WHERE custid = 102;

-- Removing all data from offset 9 till the end and appending '102'
UPDATE dbo.CustomerData
  SET txt_data.WRITE('102', 9, NULL)
WHERE custid = 102;

-- Appending data at the end
UPDATE dbo.CustomerData
  SET txt_data.WRITE(' is discontinued', NULL, 0)
WHERE custid = 102;

-- Removing 4 characters beginning at position 9
UPDATE dbo.CustomerData
  SET txt_data.WRITE('', 9, 4)
WHERE custid = 102;

-- Query result
SELECT txt_data FROM dbo.CustomerData WHERE custid = 102;

---------------------------------------------------------------------
-- SELECT and UPDATE Statement Assignments
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Asignment SELECT
---------------------------------------------------------------------
USE InsideTSQL2008;

DECLARE @empid AS INT, @pattern AS NVARCHAR(100);

SET @pattern = N'Davis'; -- Try also N'Ben-Gan', N'D%';
SET @empid = 999;

SELECT @empid = empid
FROM HR.Employees
WHERE lastname LIKE @pattern;

SELECT @empid;
GO

-- Safe Assignment
DECLARE @empid AS INT, @pattern AS NVARCHAR(100);

SET @pattern = N'Davis'; -- Try also N'Ben-Gan', N'D%';
SET @empid = 999;

SET @empid = (SELECT empid
              FROM HR.Employees
              WHERE lastname LIKE @pattern);

SELECT @empid;
GO

-- Assignment SELECT with Multiple Assignments
DECLARE @firstname AS NVARCHAR(10), @lastname AS NVARCHAR(20);

SELECT @firstname = NULL, @lastname = NULL;

SELECT @firstname = firstname, @lastname = lastname
FROM HR.Employees
WHERE empid = 3;

SELECT @firstname, @lastname;
GO

-- Multi-Row Assignment
DECLARE @Orders AS VARCHAR(8000), @custid AS INT;
SET @custid = 1;
SET @Orders = '';

SELECT @Orders = @Orders + CAST(orderid AS VARCHAR(10)) + ';'
FROM Sales.Orders
WHERE custid = @custid;

SELECT @Orders;
GO

-- Multi-Row Assignment with ORDER BY
DECLARE @Orders AS VARCHAR(8000), @custid AS INT;
SET @custid = 1;
SET @Orders = '';

SELECT @Orders = @Orders + CAST(orderid AS VARCHAR(10)) + ';'
FROM Sales.Orders
WHERE custid = @custid
ORDER BY orderdate, orderid;

SELECT @Orders;
GO

---------------------------------------------------------------------
-- Assignment UPDATE
---------------------------------------------------------------------
USE tempdb;
IF OBJECT_ID('dbo.T1') IS NOT NULL DROP TABLE dbo.T1;
CREATE TABLE dbo.T1
(
  col1 INT        NOT NULL,
  col2 VARCHAR(5) NOT NULL
);
GO

INSERT INTO dbo.T1(col1, col2) VALUES
  (0, 'A'),
  (0, 'B'),
  (0, 'C'),
  (0, 'C'),
  (0, 'C'),
  (0, 'B'),
  (0, 'A'),
  (0, 'A'),
  (0, 'C'),
  (0, 'C');
GO

DECLARE @i AS INT;
SET @i = 0;
UPDATE dbo.T1 SET @i = col1 = @i + 1;

SELECT * FROM dbo.T1;
GO

-- With ROW_NUMBER
WITH T1RN AS
(
  SELECT col1, ROW_NUMBER() OVER(ORDER BY col2) AS rownum
  FROM dbo.T1
)
UPDATE T1RN SET col1 = rownum;

SELECT * FROM dbo.T1;
GO

---------------------------------------------------------------------
-- Merging Data
---------------------------------------------------------------------

-- Listing 10-3: Script creating and populating tables Customers and CustomersStage
SET NOCOUNT ON;
USE tempdb;

IF OBJECT_ID('dbo.Customers', 'U') IS NOT NULL
  DROP TABLE dbo.Customers;
GO
CREATE TABLE dbo.Customers
(
  custid       INT         NOT NULL,
  companyname  VARCHAR(25) NOT NULL,
  phone        VARCHAR(20) NOT NULL,
  address      VARCHAR(50) NOT NULL,
  inactive     BIT         NOT NULL DEFAULT (0),
  CONSTRAINT PK_Customers PRIMARY KEY(custid)
);

INSERT INTO dbo.Customers(custid, companyname, phone, address)
  VALUES
  (1, 'cust 1', '(111) 111-1111', 'address 1'),
  (2, 'cust 2', '(222) 222-2222', 'address 2'),
  (3, 'cust 3', '(333) 333-3333', 'address 3'),
  (4, 'cust 4', '(444) 444-4444', 'address 4'),
  (5, 'cust 5', '(555) 555-5555', 'address 5');

IF OBJECT_ID('dbo.CustomersStage', 'U') IS NOT NULL
  DROP TABLE dbo.CustomersStage;
GO
CREATE TABLE dbo.CustomersStage
(
  custid      INT         NOT NULL,
  companyname VARCHAR(25) NOT NULL,
  phone       VARCHAR(20) NOT NULL,
  address     VARCHAR(50) NOT NULL,
  CONSTRAINT PK_CustomersStage PRIMARY KEY(custid)
);

INSERT INTO dbo.CustomersStage(custid, companyname, phone, address)
  VALUES
  (2, 'AAAAA', '(222) 222-2222', 'address 2'),
  (3, 'cust 3', '(333) 333-3333', 'address 3'),
  (5, 'BBBBB', 'CCCCC', 'DDDDD'),
  (6, 'cust 6 (new)', '(666) 666-6666', 'address 6'),
  (7, 'cust 7 (new)', '(777) 777-7777', 'address 7');
GO

SELECT * FROM dbo.Customers;
SELECT * FROM dbo.CustomersStage;

---------------------------------------------------------------------
-- MERGE Fundamentals
---------------------------------------------------------------------

-- Update existing, add missing
SET NOCOUNT OFF;

BEGIN TRAN

MERGE INTO dbo.Customers AS TGT
USING dbo.CustomersStage AS SRC
  ON TGT.custid = SRC.custid
WHEN MATCHED THEN
  UPDATE SET
    TGT.companyname = SRC.companyname,
    TGT.phone = SRC.phone,
    TGT.address = SRC.address
WHEN NOT MATCHED THEN 
  INSERT (custid, companyname, phone, address)
  VALUES (SRC.custid, SRC.companyname, SRC.phone, SRC.address);

SELECT * FROM dbo.Customers;

ROLLBACK TRAN
GO

-- Only WHEN MATCHED
BEGIN TRAN

MERGE INTO dbo.Customers AS TGT
USING dbo.CustomersStage AS SRC
  ON TGT.custid = SRC.custid
WHEN MATCHED THEN
  UPDATE SET
    TGT.companyname = SRC.companyname,
    TGT.phone = SRC.phone,
    TGT.address = SRC.address;

ROLLBACK TRAN

-- Pre-2008 alternative to update existing, add missing
BEGIN TRAN

UPDATE TGT
  SET TGT.companyname = SRC.companyname,
      TGT.phone = SRC.phone,
      TGT.address = SRC.address
FROM dbo.Customers AS TGT
  JOIN dbo.CustomersStage AS SRC
    ON TGT.custid = SRC.custid;

INSERT INTO dbo.Customers (custid, companyname, phone, address)
  SELECT custid, companyname, phone, address
  FROM dbo.CustomersStage AS SRC
  WHERE NOT EXISTS
    (SELECT * FROM dbo.Customers AS TGT
     WHERE TGT.custid = SRC.custid);

ROLLBACK TRAN

---------------------------------------------------------------------
-- Adding a Predicate
---------------------------------------------------------------------

-- Update existing that changed, add missing
BEGIN TRAN

MERGE dbo.Customers AS TGT
USING dbo.CustomersStage AS SRC
  ON TGT.custid = SRC.custid
WHEN MATCHED AND 
       (   TGT.companyname <> SRC.companyname
        OR TGT.phone       <> SRC.phone
        OR TGT.address     <> SRC.address) THEN
  UPDATE SET
    TGT.companyname = SRC.companyname,
    TGT.phone = SRC.phone,
    TGT.address = SRC.address
WHEN NOT MATCHED THEN 
  INSERT (custid, companyname, phone, address)
  VALUES (SRC.custid, SRC.companyname, SRC.phone, SRC.address);

SELECT * FROM dbo.Customers;

ROLLBACK TRAN
GO

-- Handling NULLs
BEGIN TRAN

MERGE dbo.Customers AS TGT
USING dbo.CustomersStage AS SRC
  ON TGT.custid = SRC.custid
WHEN MATCHED AND 
   (   (    TGT.companyname <> SRC.companyname
         OR (TGT.companyname IS NOT NULL AND SRC.companyname IS NULL)
         OR (TGT.companyname IS NULL AND SRC.companyname IS NOT NULL) )
    OR (    TGT.phone <> SRC.phone
         OR (TGT.phone IS NOT NULL AND SRC.phone IS NULL)
         OR (TGT.phone IS NULL AND SRC.phone IS NOT NULL) )
    OR (    TGT.address <> SRC.address
         OR (TGT.address IS NOT NULL AND SRC.address IS NULL)
         OR (TGT.address IS NULL AND SRC.address IS NOT NULL) ) )
  THEN UPDATE SET
    TGT.companyname = SRC.companyname,
    TGT.phone = SRC.phone,
    TGT.address = SRC.address
WHEN NOT MATCHED THEN 
  INSERT (custid, companyname, phone, address)
  VALUES (SRC.custid, SRC.companyname, SRC.phone, SRC.address);

SELECT * FROM dbo.Customers;

ROLLBACK TRAN
GO

---------------------------------------------------------------------
-- Multiple WHEN Clauses
---------------------------------------------------------------------

-- Update existing that changed, delete existing that did not change, add missing
BEGIN TRAN

MERGE dbo.Customers AS TGT
USING dbo.CustomersStage AS SRC
  ON TGT.custid = SRC.custid
WHEN MATCHED AND 
       (   TGT.companyname <> SRC.companyname
        OR TGT.phone       <> SRC.phone
        OR TGT.address     <> SRC.address) THEN
  UPDATE SET
    TGT.companyname = SRC.companyname,
    TGT.phone = SRC.phone,
    TGT.address = SRC.address
WHEN MATCHED THEN
  DELETE
WHEN NOT MATCHED THEN 
  INSERT (custid, companyname, phone, address)
  VALUES (SRC.custid, SRC.companyname, SRC.phone, SRC.address);
  
SELECT * FROM dbo.Customers;

ROLLBACK TRAN
GO

---------------------------------------------------------------------
-- WHEN NOT MATCHED BY SOURCE
---------------------------------------------------------------------

-- Update existing that changed, delete existing that did not change, add missing, discontinue missing in source
BEGIN TRAN

MERGE dbo.Customers AS TGT
USING dbo.CustomersStage AS SRC
  ON TGT.custid = SRC.custid
WHEN MATCHED AND 
       (   TGT.companyname <> SRC.companyname
        OR TGT.phone       <> SRC.phone
        OR TGT.address     <> SRC.address) THEN
  UPDATE SET
    TGT.companyname = SRC.companyname,
    TGT.phone = SRC.phone,
    TGT.address = SRC.address
WHEN MATCHED THEN
  DELETE
WHEN NOT MATCHED THEN 
  INSERT (custid, companyname, phone, address)
  VALUES (SRC.custid, SRC.companyname, SRC.phone, SRC.address)
WHEN NOT MATCHED BY SOURCE THEN
  UPDATE SET
    inactive = 1;
  
SELECT * FROM dbo.Customers;

ROLLBACK TRAN
GO

---------------------------------------------------------------------
-- MERGE Values
---------------------------------------------------------------------

-- MERGE values
IF OBJECT_ID('dbo.AddCust', 'P') IS NOT NULL DROP PROC dbo.AddCust;
GO

CREATE PROC dbo.AddCust
  @custid       INT,
  @companyname  VARCHAR(25),
  @phone        VARCHAR(20),
  @address      VARCHAR(50)
AS

MERGE dbo.Customers AS TGT
USING (VALUES(@custid, @companyname, @phone, @address))
       AS SRC(custid, companyname, phone, address)
  ON TGT.custid = SRC.custid
WHEN MATCHED AND 
       (   TGT.companyname <> SRC.companyname
        OR TGT.phone       <> SRC.phone
        OR TGT.address     <> SRC.address) THEN
  UPDATE SET
    TGT.companyname = SRC.companyname,
    TGT.phone = SRC.phone,
    TGT.address = SRC.address
WHEN NOT MATCHED THEN 
  INSERT (custid, companyname, phone, address)
  VALUES (SRC.custid, SRC.companyname, SRC.phone, SRC.address);
GO

BEGIN TRAN

EXEC dbo.AddCust
  @custid       = 8,
  @companyname  = 'cust 8 (new)',
  @phone        = '(888) 888-8888',
  @address      = 'address 8';

SELECT * FROM dbo.Customers;

ROLLBACK TRAN
GO

---------------------------------------------------------------------
-- MERGE and Triggers
---------------------------------------------------------------------

-- Create Triggers on the Customers Table
CREATE TRIGGER trg_Customers_INSERT ON dbo.Customers AFTER INSERT
AS
PRINT 'INSERT detected.';
GO
CREATE TRIGGER trg_Customers_UPDATE ON dbo.Customers AFTER UPDATE
AS
PRINT 'UPDATE detected.';
GO
CREATE TRIGGER trg_Customers_DELETE ON dbo.Customers AFTER DELETE
AS
PRINT 'DELETE detected.';
GO

-- Run MERGE statement
BEGIN TRAN

MERGE dbo.Customers AS TGT
USING dbo.CustomersStage AS SRC
  ON TGT.custid = SRC.custid
WHEN MATCHED AND 
       (   TGT.companyname <> SRC.companyname
        OR TGT.phone       <> SRC.phone
        OR TGT.address     <> SRC.address) THEN
  UPDATE SET
    TGT.companyname = SRC.companyname,
    TGT.phone = SRC.phone,
    TGT.address = SRC.address
WHEN MATCHED THEN
  DELETE
WHEN NOT MATCHED THEN 
  INSERT (custid, companyname, phone, address)
  VALUES (SRC.custid, SRC.companyname, SRC.phone, SRC.address)
WHEN NOT MATCHED BY SOURCE THEN
  UPDATE SET
    inactive = 1;

ROLLBACK TRAN

---------------------------------------------------------------------
-- OUTPUT Clause
---------------------------------------------------------------------

---------------------------------------------------------------------
-- INSERT with OUTPUT
---------------------------------------------------------------------

-- Generating Surrogate Keys for Customers
USE tempdb;
IF OBJECT_ID('dbo.CustomersDim') IS NOT NULL DROP TABLE dbo.CustomersDim;
CREATE TABLE dbo.CustomersDim
(
  keycol  INT NOT NULL IDENTITY PRIMARY KEY,
  custid  INT NOT NULL,
  companyname NVARCHAR(40) NOT NULL,
  /* ... other columns ... */
);
GO

-- Insert New Customers and Get their Surrogate Keys
DECLARE @NewCusts TABLE
(
  custid INT NOT NULL PRIMARY KEY,
  keycol INT NOT NULL UNIQUE
);

INSERT INTO dbo.CustomersDim(custid, companyname)
    OUTPUT inserted.custid, inserted.keycol
    INTO @NewCusts
    OUTPUT inserted.custid, inserted.keycol
  SELECT custid, companyname
  FROM InsideTSQL2008.Sales.Customers
  WHERE country = N'UK';

SELECT custid, keycol FROM @NewCusts;
GO

---------------------------------------------------------------------
-- DELETE with OUTPUT
---------------------------------------------------------------------

-- Create BigOrders
USE tempdb;
IF OBJECT_ID('dbo.LargeOrders') IS NOT NULL DROP TABLE dbo.LargeOrders;
CREATE TABLE dbo.LargeOrders
(
  orderid   INT       NOT NULL
    CONSTRAINT PK_LargeOrders PRIMARY KEY NONCLUSTERED,
  custid    INT       NOT NULL,
  empid     INT       NOT NULL,
  orderdate DATE      NOT NULL,
  filler    CHAR(200) NOT NULL DEFAULT ('a')
)
GO

CREATE UNIQUE CLUSTERED INDEX idx_od_oid
  ON dbo.LargeOrders(orderdate, orderid);
GO

INSERT INTO dbo.LargeOrders WITH (TABLOCK)(orderid, custid, empid, orderdate)
  SELECT ROW_NUMBER() OVER(ORDER BY (SELECT 0)),
    custid, empid, DATEADD(day, n-1, '20040101')
  FROM InsideTSQL2008.Sales.Customers AS C
    CROSS JOIN InsideTSQL2008.HR.Employees AS E
    CROSS JOIN dbo.Nums
  WHERE n <= DATEDIFF(day, '20000401', '20081231') + 1;
GO

-- Delete orders placed prior to 2006 (don't run)
WHILE 1 = 1
BEGIN
  DELETE TOP (5000) FROM dbo.LargeOrders WHERE orderdate < '20060101';
  IF @@rowcount < 5000 BREAK;
END
GO

-- Purging and Archiving
IF OBJECT_ID('dbo.Archive') IS NOT NULL DROP TABLE dbo.Archive;
CREATE TABLE dbo.Archive
(
  orderid    INT       NOT NULL PRIMARY KEY NONCLUSTERED,
  custid     INT       NOT NULL,
  empid      INT       NOT NULL,
  orderdate  DATE      NOT NULL,
  filler     CHAR(200) NOT NULL
);
GO
CREATE UNIQUE CLUSTERED INDEX idx_od_oid
  ON dbo.Archive(orderdate, orderid);
GO

WHILE 1 = 1
BEGIN
  DELETE TOP(5000) FROM dbo.LargeOrders
    OUTPUT deleted.orderid, deleted.custid, deleted.empid, 
           deleted.orderdate, deleted.filler
      INTO dbo.Archive(orderid, custid, empid, orderdate, filler)
  WHERE orderdate < '20060101';

  IF @@rowcount < 5000 BREAK;
END
GO

---------------------------------------------------------------------
-- UPDATE with OUTPUT
---------------------------------------------------------------------

-- Message Processing
USE tempdb;
IF OBJECT_ID('dbo.Messages') IS NOT NULL DROP TABLE dbo.Messages;
CREATE TABLE dbo.Messages
(
  msgid  INT          NOT NULL IDENTITY ,
  msgts  DATETIME     NOT NULL DEFAULT(CURRENT_TIMESTAMP),
  msg    VARCHAR(MAX) NOT NULL,
  status VARCHAR(20)  NOT NULL DEFAULT('new'),
  CONSTRAINT PK_Messages 
    PRIMARY KEY NONCLUSTERED(msgid),
  CONSTRAINT UNQ_Messages_status_msgid 
    UNIQUE CLUSTERED(status, msgid),
  CONSTRAINT CHK_Messages_status
    CHECK (status IN('new', 'open', 'done'))
);
GO

-- Generate messages; run from multiple sessions
SET NOCOUNT ON;
USE tempdb;
GO
DECLARE @msg AS VARCHAR(MAX);
DECLARE @now AS DATETIME = CURRENT_TIMESTAMP;
WHILE 1=1 AND DATEDIFF(second,@now,CURRENT_TIMESTAMP) < 300
BEGIN
  SET @msg = 'msg' + RIGHT('000000000'
    + CAST(1 + ABS(CHECKSUM(NEWID())) AS VARCHAR(10)), 10);
  INSERT INTO dbo.Messages(msg) VALUES(@msg);
  WAITFOR DELAY '00:00:01';
END
GO

-- Process messages; run from multiple sessions
SET NOCOUNT ON;
USE tempdb;
GO

DECLARE @Msgs TABLE(msgid INT, msgts DATETIME, msg VARCHAR(MAX));
DECLARE @n AS INT;
SET @n = 3;

WHILE 1 = 1
BEGIN
  UPDATE TOP(@n) dbo.Messages WITH(READPAST) SET status = 'open'
    OUTPUT inserted.msgid, inserted.msgts, inserted.msg INTO @Msgs
    OUTPUT inserted.msgid, inserted.msgts, inserted.msg
  WHERE status = 'new';

  IF @@rowcount > 0
  BEGIN
    PRINT 'Processing messages...';
    /* ...process messages here... */
    
    WITH UPD_CTE AS
    (
      SELECT M.status
      FROM dbo.Messages AS M
        JOIN @Msgs AS N
          ON M.msgid = N.msgid
    )
    UPDATE UPD_CTE
      SET status = 'done';

/*    
    -- Alternatively you can delete the processed messages:
    DELETE FROM M
    FROM dbo.Messages AS M
     JOIN @Msgs AS N
       ON M.msgid = N.msgid;
*/

    DELETE FROM @Msgs;
  END
  ELSE
  BEGIN
    PRINT 'No messages to process.';
    WAITFOR DELAY '00:00:01';
  END
END
GO

-- Cleanup
IF OBJECT_ID('dbo.Messages') IS NOT NULL DROP TABLE dbo.Messages;

---------------------------------------------------------------------
-- MERGE with OUTPUT
---------------------------------------------------------------------

-- OUTPUT Clause and $action Function

BEGIN TRAN

MERGE INTO dbo.Customers AS TGT
USING dbo.CustomersStage AS SRC
  ON TGT.custid = SRC.custid
WHEN MATCHED THEN
  UPDATE SET
    TGT.companyname = SRC.companyname,
    TGT.phone = SRC.phone,
    TGT.address = SRC.address
WHEN NOT MATCHED THEN 
  INSERT (custid, companyname, phone, address)
  VALUES (SRC.custid, SRC.companyname, SRC.phone, SRC.address)
OUTPUT $action AS action, 
  inserted.custid,
  deleted.companyname AS Dcompanyname,
  deleted.phone AS Dphone,
  deleted.address AS Daddress,
  inserted.companyname AS Icompanyname,
  inserted.phone AS Iphone,
  inserted.address AS Iaddress;

ROLLBACK TRAN
GO

---------------------------------------------------------------------
-- Composable DML
---------------------------------------------------------------------

IF OBJECT_ID('dbo.CustomersAudit', 'U') IS NOT NULL
  DROP TABLE dbo.CustomersAudit;

CREATE TABLE dbo.CustomersAudit
(
  audit_lsn  INT NOT NULL IDENTITY,
  login_name SYSNAME NOT NULL DEFAULT (SUSER_SNAME()),
  post_time  DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  custid       INT         NOT NULL,
  companyname  VARCHAR(25) NOT NULL,
  phone        VARCHAR(20) NOT NULL,
  address      VARCHAR(50) NOT NULL,
  CONSTRAINT PK_CustomersAudit PRIMARY KEY(audit_lsn)
);

BEGIN TRAN

INSERT INTO dbo.CustomersAudit(custid, companyname, phone, address)
  SELECT custid, Icompanyname, Iphone, Iaddress
  FROM (MERGE INTO dbo.Customers AS TGT
        USING dbo.CustomersStage AS SRC
          ON TGT.custid = SRC.custid
        WHEN MATCHED THEN
          UPDATE SET
            TGT.companyname = SRC.companyname,
            TGT.phone = SRC.phone,
            TGT.address = SRC.address
        WHEN NOT MATCHED THEN 
          INSERT (custid, companyname, phone, address)
          VALUES (SRC.custid, SRC.companyname, SRC.phone, SRC.address)
        OUTPUT $action AS action, 
          inserted.custid,
          inserted.companyname AS Icompanyname,
          inserted.phone AS Iphone,
          inserted.address AS Iaddress) AS D
  WHERE action = 'INSERT';
  
SELECT * FROM dbo.CustomersAudit;

ROLLBACK TRAN
