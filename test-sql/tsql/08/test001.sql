---------------------------------------------------------------------
-- Inside Microsoft SQL Server 2008: T-SQL Querying (MSPress, 2009)
-- Chapter 08 - Aggregating and Pivoting Data
-- Copyright Itzik Ben-Gan, 2009
-- All Rights Reserved
---------------------------------------------------------------------

---------------------------------------------------------------------
-- OVER Clause
---------------------------------------------------------------------

SET NOCOUNT ON;
USE InsideTSQL2008;

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

-- Query obtaining aggregates with a cross join
SELECT orderid, custid, val,
  CAST(val / sumval * 100. AS NUMERIC(5, 2)) AS pct,
  CAST(val - avgval AS NUMERIC(12, 2)) AS diff 
FROM dbo.MyOrderValues
  CROSS JOIN (SELECT SUM(val) AS sumval, AVG(val) AS avgval
              FROM dbo.MyOrderValues) AS Aggs;

-- Obtaining Aggregates with OVER Clause
SELECT orderid, custid, val,
  CAST(val / SUM(val) OVER() * 100. AS NUMERIC(5, 2)) AS pct,
  CAST(val - AVG(val) OVER() AS NUMERIC(12, 2)) AS diff
FROM dbo.MyOrderValues;

-- Comparing Single and Multiple Aggregates using OVER Clause
SELECT orderid, custid, val,
  SUM(val) OVER() AS sumval
FROM dbo.MyOrderValues;

SELECT orderid, custid, val,
  SUM(val)   OVER() AS sumval,
  COUNT(val) OVER() AS cntval,
  AVG(val)   OVER() AS avgval,
  MIN(val)   OVER() AS minval,
  MAX(val)   OVER() AS maxval
FROM dbo.MyOrderValues;

-- Comparing Single and Multiple Aggregates using Subqueries
SELECT orderid, custid, val,
  (SELECT SUM(val) FROM dbo.MyOrderValues) AS sumval
FROM dbo.MyOrderValues;

SELECT orderid, custid, val,
  (SELECT SUM(val)   FROM dbo.MyOrderValues) AS sumval,
  (SELECT COUNT(val) FROM dbo.MyOrderValues) AS cntval,
  (SELECT AVG(val)   FROM dbo.MyOrderValues) AS avgval,
  (SELECT MIN(val)   FROM dbo.MyOrderValues) AS minval,
  (SELECT MAX(val)   FROM dbo.MyOrderValues) AS maxval
FROM dbo.MyOrderValues;

-- Obtaining Aggregates with OVER Clause, with Partitioning
SELECT orderid, custid, val,
  CAST(val / SUM(val) OVER(PARTITION BY custid) * 100.
    AS NUMERIC(5, 2)) AS pct,
  CAST(val - AVG(val) OVER(PARTITION BY custid) AS NUMERIC(12, 2)) AS diff
FROM dbo.MyOrderValues
ORDER BY custid;

-- Cleanup
IF OBJECT_ID('dbo.MyOrderValues', 'U') IS NOT NULL
  DROP TABLE dbo.MyOrderValues;
GO

---------------------------------------------------------------------
-- Tiebreakers
---------------------------------------------------------------------

-- Orders with max order date for each Employee
-- Tiebreaker: max order id
SELECT empid,
  CAST(SUBSTRING(binstr, 1,  8) AS DATETIME) AS orderdate,
  CAST(SUBSTRING(binstr, 9,  4) AS INT)      AS orderid,
  CAST(SUBSTRING(binstr, 13, 4) AS INT)      AS custid,
  CAST(SUBSTRING(binstr, 17, 8) AS DATETIME) AS requireddate
FROM (SELECT empid, 
        MAX(CAST(orderdate        AS BINARY(8))
              + CAST(orderid      AS BINARY(4))
              + CAST(custid       AS BINARY(4))
              + CAST(requireddate AS BINARY(8))) AS binstr
      FROM Sales.Orders
      GROUP BY empid) AS D;

-- Tiebreaker: min order id
SELECT empid,
  CAST(SUBSTRING(binstr, 1, 8) AS DATETIME)         AS orderdate,
  2147483647 - CAST(SUBSTRING(binstr, 9, 4) AS INT) AS orderid,
  CAST(SUBSTRING(binstr, 13, 4) AS INT)             AS custid,
  CAST(SUBSTRING(binstr, 17, 8) AS DATETIME)        AS requireddate
FROM (SELECT empid, 
        MAX(CAST(orderdate                AS BINARY(8))
              + CAST(2147483647 - orderid AS BINARY(4))
              + CAST(custid               AS BINARY(4))
              + CAST(requireddate         AS BINARY(8))) AS binstr
      FROM Sales.Orders
      GROUP BY empid) AS D;

-- Tiebreaker: min order id, using bitwise manipulation
SELECT empid,
  CAST(SUBSTRING(binstr, 1, 8) AS DATETIME)  AS orderdate,
  ~CAST(SUBSTRING(binstr, 9, 4) AS INT)      AS orderid,
  CAST(SUBSTRING(binstr, 13, 4) AS INT)      AS custid,
  CAST(SUBSTRING(binstr, 17, 8) AS DATETIME) AS requireddate
FROM (SELECT empid, 
        MAX(CAST(orderdate        AS BINARY(8))
              + CAST(~orderid     AS BINARY(4))
              + CAST(custid       AS BINARY(4))
              + CAST(requireddate AS BINARY(8))) AS binstr
      FROM Sales.Orders
      GROUP BY empid) AS D;

-- Tiebreaker: max required date, max orderid
SELECT empid,
  CAST(SUBSTRING(binstr, 1, 8)   AS DATETIME) AS orderdate,
  CAST(SUBSTRING(binstr, 9, 8)   AS DATETIME) AS requireddate,
  CAST(SUBSTRING(binstr, 17, 4)  AS INT)      AS orderid,
  CAST(SUBSTRING(binstr, 21, 4)  AS INT)      AS custid  
FROM (SELECT empid, 
        MAX(CAST(orderdate        AS BINARY(8))
              + CAST(requireddate AS BINARY(8))
              + CAST(orderid      AS BINARY(4))
              + CAST(custid       AS BINARY(4))
              ) AS binstr
      FROM Sales.Orders
      GROUP BY empid) AS D;
GO

---------------------------------------------------------------------
-- Running Aggregations
---------------------------------------------------------------------

-- Creating and Populating the EmpOrders Table
USE tempdb;

IF OBJECT_ID('dbo.EmpOrders') IS NOT NULL DROP TABLE dbo.EmpOrders;

CREATE TABLE dbo.EmpOrders
(
  empid    INT  NOT NULL,
  ordmonth DATE NOT NULL,
  qty      INT  NOT NULL,
  PRIMARY KEY(empid, ordmonth)
);
GO

INSERT INTO dbo.EmpOrders(empid, ordmonth, qty)
  SELECT O.empid, 
    DATEADD(month, DATEDIFF(month, 0, O.orderdate), 0) AS ordmonth,
    SUM(qty) AS qty
  FROM InsideTSQL2008.Sales.Orders AS O
    JOIN InsideTSQL2008.Sales.OrderDetails AS OD
      ON O.orderid = OD.orderid
  GROUP BY empid,
    DATEADD(month, DATEDIFF(month, 0, O.orderdate), 0);

-- Content of EmpOrders Table
SELECT empid, CONVERT(VARCHAR(7), ordmonth, 121) AS ordmonth, qty
FROM dbo.EmpOrders
ORDER BY empid, ordmonth;
GO

---------------------------------------------------------------------
-- Cumulative Aggregations
---------------------------------------------------------------------

-- Cumulative Aggregates Per Employee, Month
SELECT O1.empid, CONVERT(VARCHAR(7), O1.ordmonth, 121) AS ordmonth,
  O1.qty AS qtythismonth, SUM(O2.qty) AS totalqty,
  CAST(AVG(1.*O2.qty) AS NUMERIC(12, 2)) AS avgqty
FROM dbo.EmpOrders AS O1
  JOIN dbo.EmpOrders AS O2
    ON O2.empid = O1.empid
    AND O2.ordmonth <= O1.ordmonth
GROUP BY O1.empid, O1.ordmonth, O1.qty
ORDER BY O1.empid, O1.ordmonth;

-- Cumulative Aggregates Per Employee, Month, Using Subqueries
SELECT O1.empid, CONVERT(VARCHAR(7), O1.ordmonth, 121) AS ordmonth,
  O1.qty AS qtythismonth,
  (SELECT SUM(O2.qty) 
   FROM dbo.EmpOrders AS O2
   WHERE O2.empid = O1.empid
     AND O2.ordmonth <= O1.ordmonth) AS totalqty
FROM dbo.EmpOrders AS O1
GROUP BY O1.empid, O1.ordmonth, O1.qty;

-- Cumulative Aggregates Per Employee, Month, where totalqty < 1000
SELECT O1.empid, CONVERT(VARCHAR(7), O1.ordmonth, 121) AS ordmonth,
  O1.qty AS qtythismonth, SUM(O2.qty) AS totalqty,
  CAST(AVG(1.*O2.qty) AS NUMERIC(12, 2)) AS avgqty
FROM dbo.EmpOrders AS O1
  JOIN dbo.EmpOrders AS O2
    ON O2.empid = O1.empid
    AND O2.ordmonth <= O1.ordmonth
GROUP BY O1.empid, O1.ordmonth, O1.qty
HAVING SUM(O2.qty) < 1000
ORDER BY O1.empid, O1.ordmonth;

-- Cumulative Aggregates Per Employee, Month,
-- until totalqty Reaches 1000
SELECT O1.empid, CONVERT(VARCHAR(7), O1.ordmonth, 121) AS ordmonth,
  O1.qty AS qtythismonth, SUM(O2.qty) AS totalqty,
  CAST(AVG(1.*O2.qty) AS NUMERIC(12, 2)) AS avgqty
FROM dbo.EmpOrders AS O1
  JOIN dbo.EmpOrders AS O2
    ON O2.empid = O1.empid
    AND O2.ordmonth <= O1.ordmonth
GROUP BY O1.empid, O1.ordmonth, O1.qty
HAVING SUM(O2.qty) - O1.qty < 1000
ORDER BY O1.empid, O1.ordmonth;

-- Point where totalqty Reaches 1000 Per Employee
SELECT O1.empid, CONVERT(VARCHAR(7), O1.ordmonth, 121) AS ordmonth,
  O1.qty AS qtythismonth, SUM(O2.qty) AS totalqty,
  CAST(AVG(1.*O2.qty) AS NUMERIC(12, 2)) AS avgqty
FROM dbo.EmpOrders AS O1
  JOIN dbo.EmpOrders AS O2
    ON O2.empid = O1.empid
    AND O2.ordmonth <= O1.ordmonth
GROUP BY O1.empid, O1.ordmonth, O1.qty
HAVING SUM(O2.qty) - O1.qty < 1000
  AND SUM(O2.qty) >= 1000
ORDER BY O1.empid, O1.ordmonth;

---------------------------------------------------------------------
-- Sliding Aggregations
---------------------------------------------------------------------

-- Sliding Aggregates Per Employee of Three Months Leading to Current
SELECT O1.empid, 
  CONVERT(VARCHAR(7), O1.ordmonth, 121) AS tomonth,
  O1.qty AS qtythismonth,
  SUM(O2.qty) AS totalqty,
  CAST(AVG(1.*O2.qty) AS NUMERIC(12, 2)) AS avgqty
FROM dbo.EmpOrders AS O1
  JOIN dbo.EmpOrders AS O2
    ON O2.empid = O1.empid
    AND (O2.ordmonth > DATEADD(month, -3, O1.ordmonth)
         AND O2.ordmonth <=  O1.ordmonth)
GROUP BY O1.empid, O1.ordmonth, O1.qty
ORDER BY O1.empid, O1.ordmonth;

---------------------------------------------------------------------
-- Year-To-Date (YTD)
---------------------------------------------------------------------

-- YTD Aggregates Per Employee, Month
SELECT O1.empid, 
  CONVERT(VARCHAR(7), O1.ordmonth, 121) AS ordmonth,
  O1.qty AS qtythismonth,
  SUM(O2.qty) AS totalqty,
  CAST(AVG(1.*O2.qty) AS NUMERIC(12, 2)) AS avgqty
FROM dbo.EmpOrders AS O1
  JOIN dbo.EmpOrders AS O2
    ON O2.empid = O1.empid
    AND (O2.ordmonth >= CAST(CAST(YEAR(O1.ordmonth) AS CHAR(4))
                               + '0101' AS DATETIME)
         AND O2.ordmonth <= O1.ordmonth)
GROUP BY O1.empid, O1.ordmonth, O1.qty
ORDER BY O1.empid, O1.ordmonth;
GO

---------------------------------------------------------------------
-- PIVOT
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Pivoting Attributes
---------------------------------------------------------------------

-- Creating and Populating the OpenSchema Table
USE tempdb;

IF OBJECT_ID('dbo.OpenSchema') IS NOT NULL DROP TABLE dbo.OpenSchema;

CREATE TABLE dbo.OpenSchema
(
  objectid  INT          NOT NULL,
  attribute NVARCHAR(30) NOT NULL,
  value     SQL_VARIANT  NOT NULL, 
  PRIMARY KEY (objectid, attribute)
);
GO

INSERT INTO dbo.OpenSchema(objectid, attribute, value) VALUES
  (1, N'attr1', CAST(CAST('ABC'      AS VARCHAR(10))   AS SQL_VARIANT)),
  (1, N'attr2', CAST(CAST(10         AS INT)           AS SQL_VARIANT)),
  (1, N'attr3', CAST(CAST('20070101' AS SMALLDATETIME) AS SQL_VARIANT)),
  (2, N'attr2', CAST(CAST(12         AS INT)           AS SQL_VARIANT)),
  (2, N'attr3', CAST(CAST('20090101' AS SMALLDATETIME) AS SQL_VARIANT)),
  (2, N'attr4', CAST(CAST('Y'        AS CHAR(1))       AS SQL_VARIANT)),
  (2, N'attr5', CAST(CAST(13.7       AS NUMERIC(9,3))  AS SQL_VARIANT)),
  (3, N'attr1', CAST(CAST('XYZ'      AS VARCHAR(10))   AS SQL_VARIANT)),
  (3, N'attr2', CAST(CAST(20         AS INT)           AS SQL_VARIANT)),
  (3, N'attr3', CAST(CAST('20080101' AS SMALLDATETIME) AS SQL_VARIANT));

-- show the contents of the table
SELECT * FROM dbo.OpenSchema;
GO

-- Pivoting Attributes, without PIVOT operator
SELECT objectid,
  MAX(CASE WHEN attribute = 'attr1' THEN value END) AS attr1,
  MAX(CASE WHEN attribute = 'attr2' THEN value END) AS attr2,
  MAX(CASE WHEN attribute = 'attr3' THEN value END) AS attr3,
  MAX(CASE WHEN attribute = 'attr4' THEN value END) AS attr4,
  MAX(CASE WHEN attribute = 'attr5' THEN value END) AS attr5
FROM dbo.OpenSchema
GROUP BY objectid;

-- Pivoting Attributes, using PIVOT operator
SELECT objectid, attr1, attr2, attr3, attr4, attr5
FROM dbo.OpenSchema
  PIVOT(MAX(value) FOR attribute
    IN([attr1],[attr2],[attr3],[attr4],[attr5])) AS P;

-- PIVOT operator, using table expression
SELECT objectid, attr1, attr2, attr3, attr4, attr5
FROM (SELECT objectid, attribute, value FROM dbo.OpenSchema) AS D
  PIVOT(MAX(value) FOR attribute
    IN([attr1],[attr2],[attr3],[attr4],[attr5])) AS P;

---------------------------------------------------------------------
-- Relational Division
---------------------------------------------------------------------

-- Creating and Populating the OrderDetails Table
USE tempdb;
GO

IF OBJECT_ID('dbo.OrderDetails') IS NOT NULL
  DROP TABLE dbo.OrderDetails;
GO

CREATE TABLE dbo.OrderDetails
(
  orderid   VARCHAR(10) NOT NULL,
  productid INT         NOT NULL,
  PRIMARY KEY(orderid, productid)
  /* other colums */
);

INSERT INTO dbo.OrderDetails(orderid, productid) VALUES
  ('A', 1),
  ('A', 2),
  ('A', 3),
  ('A', 4),
  ('B', 2),
  ('B', 3),
  ('B', 4),
  ('C', 3),
  ('C', 4),
  ('D', 4);
GO

-- Relational Division, without PIVOT operator
SELECT orderid
FROM (SELECT
        orderid,
        MAX(CASE WHEN productid = 2 THEN 1 END) AS P2,
        MAX(CASE WHEN productid = 3 THEN 1 END) AS P3,
        MAX(CASE WHEN productid = 4 THEN 1 END) AS P4
      FROM dbo.OrderDetails
      GROUP BY orderid) AS P
WHERE P2 = 1 AND P3 = 1 AND P4 = 1;

-- Relational Division, using PIVOT operator
SELECT orderid 
FROM (SELECT orderid, productid FROM dbo.OrderDetails) AS D
  PIVOT(MAX(productid) FOR productid IN([2],[3],[4])) AS P
WHERE [2] = 2 AND [3] = 3 AND [4] = 4;
GO

-- Relational Division, without PIVOT operator, COUNT aggregate
SELECT orderid
FROM (SELECT
        orderid,
        COUNT(CASE WHEN productid = 2 THEN productid END) AS P2,
        COUNT(CASE WHEN productid = 3 THEN productid END) AS P3,
        COUNT(CASE WHEN productid = 4 THEN productid END) AS P4
      FROM dbo.OrderDetails
      GROUP BY orderid) AS P
WHERE P2 = 1 AND P3 = 1 AND P4 = 1;

-- Relational Division, using PIVOT operator, COUNT aggregate
SELECT orderid 
FROM (SELECT orderid, productid FROM dbo.OrderDetails) AS D
  PIVOT(COUNT(productid) FOR productid IN([2],[3],[4])) AS P
WHERE [2] = 1 AND [3] = 1 AND [4] = 1;
GO
---------------------------------------------------------------------
-- Aggregating Data
---------------------------------------------------------------------

-- Listing 8-1: Creating and Populating the Orders Table
SET NOCOUNT ON;
USE tempdb;

IF OBJECT_ID('dbo.Orders', 'U') IS NOT NULL DROP TABLE dbo.Orders;

CREATE TABLE dbo.Orders
(
  orderid   INT        NOT NULL,
  orderdate DATETIME   NOT NULL,
  empid     INT        NOT NULL,
  custid    VARCHAR(5) NOT NULL,
  qty       INT        NOT NULL,
  CONSTRAINT PK_Orders PRIMARY KEY(orderid)
);
GO

INSERT INTO dbo.Orders
  (orderid, orderdate, empid, custid, qty)
VALUES
  (30001, '20060802', 3, 'A', 10),
  (10001, '20061224', 1, 'A', 12),
  (10005, '20061224', 1, 'B', 20),
  (40001, '20070109', 4, 'A', 40),
  (10006, '20070118', 1, 'C', 14),
  (20001, '20070212', 2, 'B', 12),
  (40005, '20080212', 4, 'A', 10),
  (20002, '20080216', 2, 'C', 20),
  (30003, '20080418', 3, 'B', 15),
  (30004, '20060418', 3, 'C', 22),
  (30007, '20060907', 3, 'D', 30);

-- show the contents of the table
SELECT * FROM dbo.Orders;
GO

-- Aggregating Data, without PIVOT operator, Total Qty
SELECT custid,
  SUM(CASE WHEN orderyear = 2006 THEN qty END) AS [2006],
  SUM(CASE WHEN orderyear = 2007 THEN qty END) AS [2007],
  SUM(CASE WHEN orderyear = 2008 THEN qty END) AS [2008]
FROM (SELECT custid, YEAR(orderdate) AS orderyear, qty
      FROM dbo.Orders) AS D
GROUP BY custid;
GO

-- Creating and Populating the Matrix Table
USE tempdb;
GO

IF OBJECTPROPERTY(OBJECT_ID('dbo.Matrix'), 'IsUserTable') = 1
  DROP TABLE dbo.Matrix;
GO

CREATE TABLE dbo.Matrix
(
  orderyear INT NOT NULL PRIMARY KEY,
  y2006 INT NULL,
  y2007 INT NULL,
  y2008 INT NULL
);

INSERT INTO dbo.Matrix(orderyear, y2006) VALUES(2006, 1);
INSERT INTO dbo.Matrix(orderyear, y2007) VALUES(2007, 1);
INSERT INTO dbo.Matrix(orderyear, y2008) VALUES(2008, 1);

-- show the contents of the table
SELECT * FROM dbo.Matrix;
GO

-- Aggregating Data using the Matrix Table
SELECT custid,
  SUM(qty*y2006) AS [2006],
  SUM(qty*y2007) AS [2007],
  SUM(qty*y2008) AS [2008]
FROM (SELECT custid, YEAR(orderdate) AS orderyear, qty
      FROM dbo.Orders) AS D
  JOIN dbo.Matrix AS M ON D.orderyear = M.orderyear
GROUP BY custid;

-- Counting Orders, without PIVOT operator
SELECT custid,
  COUNT(CASE WHEN orderyear = 2006 THEN 1 END) AS [2006],
  COUNT(CASE WHEN orderyear = 2007 THEN 1 END) AS [2007],
  COUNT(CASE WHEN orderyear = 2008 THEN 1 END) AS [2008]
FROM (SELECT custid, YEAR(orderdate) AS orderyear
      FROM dbo.Orders) AS D
GROUP BY custid;

-- Counting Orders using the Matrix Table
SELECT custid,
  COUNT(y2006) AS [2006],
  COUNT(y2007) AS [2007],
  COUNT(y2008) AS [2008]
FROM (SELECT custid, YEAR(orderdate) AS orderyear
      FROM dbo.Orders) AS D
  JOIN dbo.Matrix AS M ON D.orderyear = M.orderyear
GROUP BY custid;

-- Aggregating Data, using PIVOT operator
SELECT *
FROM (SELECT custid, YEAR(orderdate) AS orderyear, qty
      FROM dbo.Orders) AS D
  PIVOT(SUM(qty) FOR orderyear IN([2006],[2007],[2008])) AS P;

-- Counting Orders, using PIVOT operator
SELECT *
FROM (SELECT custid, YEAR(orderdate) AS orderyear
      FROM dbo.Orders) AS D
  PIVOT(COUNT(orderyear) FOR orderyear IN([2006],[2007],[2008])) AS P;
GO

---------------------------------------------------------------------
-- UNPIVOT
---------------------------------------------------------------------

-- Creating and Populating the PvtCustOrders Table
USE tempdb;

IF OBJECT_ID('dbo.PvtCustOrders') IS NOT NULL
  DROP TABLE dbo.PvtCustOrders;
GO

SELECT custid, 
  COALESCE([2006], 0) AS [2006],
  COALESCE([2007], 0) AS [2007],
  COALESCE([2008], 0) AS [2008]
INTO dbo.PvtCustOrders
FROM (SELECT custid, YEAR(orderdate) AS orderyear, qty
      FROM dbo.Orders) AS D
  PIVOT(SUM(qty) FOR orderyear IN([2006],[2007],[2008])) AS P;

UPDATE dbo.PvtCustOrders
  SET [2007] = NULL, [2008] = NULL
WHERE custid = 'D';

-- Show the contents of the table
SELECT * FROM dbo.PvtCustOrders;
GO

-- UNPIVOT, without UNPIVOT operator
SELECT custid, orderyear, qty
FROM (SELECT custid, orderyear,
        CASE orderyear
          WHEN 2006 THEN [2006]
          WHEN 2007 THEN [2007]
          WHEN 2008 THEN [2008]
        END AS qty
      FROM dbo.PvtCustOrders
        CROSS JOIN
          (SELECT 2006 AS orderyear
           UNION ALL SELECT 2007
           UNION ALL SELECT 2008) AS OrderYears) AS D
WHERE qty IS NOT NULL;

-- UNPIVOT, without UNPIVOT operator, using VALUES clause
SELECT custid, orderyear, qty
FROM (SELECT custid, orderyear,
        CASE orderyear
          WHEN 2006 THEN [2006]
          WHEN 2007 THEN [2007]
          WHEN 2008 THEN [2008]
        END AS qty
      FROM dbo.PvtCustOrders
        CROSS JOIN
          (VALUES(2006),(2007),(2008)) AS OrderYears(orderyear)) AS D
WHERE qty IS NOT NULL;

-- UNPIVOT, using UNPIVOT operator
SELECT custid, orderyear, qty
FROM dbo.PvtCustOrders
  UNPIVOT(qty FOR orderyear IN([2006],[2007],[2008])) AS U;
GO

---------------------------------------------------------------------
-- Custom Aggregations
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

-- Show the contents of the table
SELECT * FROM dbo.Groups;
GO

---------------------------------------------------------------------
-- Custom Aggregations using Pivoting
---------------------------------------------------------------------

---------------------------------------------------------------------
-- String Concatenation Using Pivoting
---------------------------------------------------------------------
SELECT groupid,
    [1]
  + COALESCE(',' + [2], '')
  + COALESCE(',' + [3], '')
  + COALESCE(',' + [4], '') AS string
FROM (SELECT groupid, string,
        ROW_NUMBER() OVER(PARTITION BY groupid ORDER BY memberid) AS rn
      FROM dbo.Groups AS A) AS D
  PIVOT(MAX(string) FOR rn IN([1],[2],[3],[4])) AS P;

---------------------------------------------------------------------
-- Aggregate Product Using Pivoting
---------------------------------------------------------------------
SELECT groupid,
    [1]
  + COALESCE([2], 1)
  + COALESCE([3], 1)
  + COALESCE([4], 1) AS product
FROM (SELECT groupid, val,
        ROW_NUMBER() OVER(PARTITION BY groupid ORDER BY memberid) AS rn
      FROM dbo.Groups AS A) AS D
  PIVOT(MAX(val) FOR rn IN([1],[2],[3],[4])) AS P;

---------------------------------------------------------------------
-- User Defined Aggregates (UDA)
---------------------------------------------------------------------

-- Listing 8-2: C# code for UDAs
/*
using System;
using System.Data;
using Microsoft.SqlServer.Server;
using System.Data.SqlTypes;
using System.IO;
using System.Text;
using System.Runtime.InteropServices;

[Serializable]
[SqlUserDefinedAggregate(
   Format.UserDefined,              // use user defined serialization 
   IsInvariantToNulls = true,       // NULLs don't matter
   IsInvariantToDuplicates = false, // duplicates matter
   IsInvariantToOrder = false,      // order matters
   IsNullIfEmpty = false,           // do not yield a NULL
                                    //  for a set of zero strings
   MaxByteSize = -1)                // max size unlimited
]
public struct StringConcat : IBinarySerialize
{
  private StringBuilder sb;

  public void Init()
  {
    this.sb = new StringBuilder();
  }

  //two arguments
  public void Accumulate(SqlString v, SqlString separator)
  {
    if (v.IsNull)
    {
      return; // ignore NULLs approach
    }

    this.sb.Append(v.Value).Append(separator.Value);
  }

  public void Merge(StringConcat other)
  {
    this.sb.Append(other.sb);
  }

  public SqlString Terminate()
  {
    string output = string.Empty;
    if (this.sb != null
        && this.sb.Length > 0)
    {
      // remove last separator
      output = this.sb.ToString(0, this.sb.Length - 1);
    }

    return new SqlString(output);
  }

  public void Read(BinaryReader r)
  {
    sb = new StringBuilder(r.ReadString());
  }

  public void Write(BinaryWriter w)
  {
    w.Write(this.sb.ToString());
  }
} // end StringConcat

[Serializable]
[StructLayout(LayoutKind.Sequential)]
[SqlUserDefinedAggregate(
   Format.Native,                   // use native serialization 
   IsInvariantToNulls = true,       // NULLs don't matter
   IsInvariantToDuplicates = false, // duplicates matter
   IsInvariantToOrder = false)]     // order matters
public class Product
{
  private SqlInt64 si;

  public void Init()
  {
    si = 1;
  }

  public void Accumulate(SqlInt64 v)
  {
    if (v.IsNull || si.IsNull)  // NULL input = NULL output approach
    {
      si = SqlInt64.Null;
      return;
    }
    if (v == 0 || si == 0)      // to prevent an exception in next if
    {
      si = 0;
      return;
    }
    // stop before we reach max v
    if (Math.Abs(v.Value) <= SqlInt64.MaxValue / Math.Abs(si.Value))
    {
      si = si * v;
    }
    else
    {
      si = 0;                 // if we reach too big v, return 0
    }

  }

  public void Merge(Product Group)
  {
    Accumulate(Group.Terminate());
  }

  public SqlInt64 Terminate()
  {
    return (si);
  }

} // end Product
*/

-- Listing 8-3: Visual Basic code for UDAs
/*
Imports System
Imports System.Data
Imports System.Data.SqlTypes
Imports Microsoft.SqlServer.Server
Imports System.Text
Imports System.IO
Imports System.Runtime.InteropServices

<Serializable(), _
 SqlUserDefinedAggregate( _
               Format.UserDefined, _
               IsInvariantToDuplicates:=False, _
               IsInvariantToNulls:=True, _
               IsInvariantToOrder:=False, _
               IsNullIfEmpty:=False, _
               MaxByteSize:=-1)> _
Public Structure StringConcat
  Implements IBinarySerialize

  Private sb As StringBuilder

  Public Sub Init()
    Me.sb = New StringBuilder()
  End Sub

  Public Sub Accumulate(ByVal v As SqlString, ByVal separator As SqlString)
    If v.IsNull Then
      Return
    End If

    Me.sb.Append(v.Value).Append(separator.Value)
  End Sub

  Public Sub Merge(ByVal other As StringConcat)
    Me.sb.Append(other.sb)
  End Sub

  Public Function Terminate() As SqlString
    Dim output As String = String.Empty

    If Not (Me.sb Is Nothing) AndAlso Me.sb.Length > 0 Then
      output = Me.sb.ToString(0, Me.sb.Length - 1)
    End If

    Return New SqlString(output)
  End Function

  Public Sub Read(ByVal r As BinaryReader) _
    Implements IBinarySerialize.Read
    sb = New StringBuilder(r.ReadString())
  End Sub

  Public Sub Write(ByVal w As BinaryWriter) _
    Implements IBinarySerialize.Write
    w.Write(Me.sb.ToString())
  End Sub

End Structure


<Serializable(), _
 StructLayout(LayoutKind.Sequential), _
 SqlUserDefinedAggregate( _
               Format.Native, _
               IsInvariantToOrder:=False, _
               IsInvariantToNulls:=True, _
               IsInvariantToDuplicates:=False)> _
Public Class Product

  Private si As SqlInt64

  Public Sub Init()
    si = 1
  End Sub

  Public Sub Accumulate(ByVal v As SqlInt64)
    If v.IsNull = True Or si.IsNull = True Then
      si = SqlInt64.Null
      Return
    End If
    If v = 0 Or si = 0 Then
      si = 0
      Return
    End If
    If (Math.Abs(v.Value) <= SqlInt64.MaxValue / Math.Abs(si.Value)) _
      Then
      si = si * v
    Else
      si = 0
    End If
  End Sub

  Public Sub Merge(ByVal Group As Product)
    Accumulate(Group.Terminate())
  End Sub

  Public Function Terminate() As SqlInt64
    If si.IsNull = True Then
      Return SqlInt64.Null
    Else
      Return si
    End If
  End Function

End Class
*/

-- Create Assembly
CREATE ASSEMBLY UDAs
  FROM 'C:\UDAs\UDAs\bin\Debug\UDAs.dll';

-- Register Aggregates
CREATE AGGREGATE dbo.StringConcat
(
  @value     AS NVARCHAR(MAX),
  @separator AS NCHAR(1)
)
RETURNS NVARCHAR(MAX)
EXTERNAL NAME UDAs.StringConcat;

CREATE AGGREGATE dbo.Product
(
  @value     AS BIGINT
)
RETURNS BIGINT
EXTERNAL NAME UDAs.Product;

-- For VB use:
CREATE ASSEMBLY UDAs
  FROM 'C:\UDAs\UDAs\bin\UDAs.dll';

CREATE AGGREGATE dbo.StringConcat
(
  @value     AS NVARCHAR(MAX),
  @separator AS NCHAR(1)
)
RETURNS NVARCHAR(MAX)
EXTERNAL NAME UDAs.[UDAs.StringConcat];

CREATE AGGREGATE dbo.Product
(
  @value     AS BIGINT
)
RETURNS BIGINT
EXTERNAL NAME UDAs.[UDAs.Product];

-- Enabling CLR and Query Catalog Views
EXEC sp_configure 'clr enabled', 1;
RECONFIGURE WITH OVERRIDE;

SELECT * FROM sys.assemblies;
SELECT * FROM sys.assembly_modules;
GO

-- test UDAs
SELECT groupid, dbo.StringConcat(string, N',') AS string
FROM dbo.Groups
GROUP BY groupid;

SELECT groupid, dbo.Product(val) AS product
FROM dbo.Groups
GROUP BY groupid;
GO

---------------------------------------------------------------------
-- Specialized Solutions
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Specialized Solution for Aggregate String Concatenation
---------------------------------------------------------------------

SELECT groupid,
  STUFF((SELECT ',' + string AS [text()]
         FROM dbo.Groups AS G2
         WHERE G2.groupid = G1.groupid
         ORDER BY memberid
         FOR XML PATH('')), 1, 1, '') AS string
FROM dbo.Groups AS G1
GROUP BY groupid;
GO

-- Static PIVOT Query
SELECT *
FROM (SELECT custid, YEAR(orderdate) AS orderyear, qty
      FROM dbo.Orders) AS D
  PIVOT(SUM(qty) FOR orderyear IN([2006],[2007],[2008])) AS P;

-- Construct the list of spreading values
SELECT
  STUFF(
    (SELECT N',' + QUOTENAME(orderyear) AS [text()]
     FROM (SELECT DISTINCT YEAR(orderdate) AS orderyear
           FROM dbo.Orders) AS Years
     ORDER BY orderyear
     FOR XML PATH('')), 1, 1, '');

-- Dynamic PIVOT
DECLARE @sql AS NVARCHAR(1000);

SET @sql = N'SELECT *
FROM (SELECT custid, YEAR(orderdate) AS orderyear, qty
      FROM dbo.Orders) AS D
  PIVOT(SUM(qty) FOR orderyear IN(' +

STUFF(
  (SELECT N',' + QUOTENAME(orderyear) AS [text()]
   FROM (SELECT DISTINCT YEAR(orderdate) AS orderyear
         FROM dbo.Orders) AS Years
   ORDER BY orderyear
   FOR XML PATH('')), 1, 1, '') + N')) AS P;';

EXEC sp_executesql @stmt = @sql;

---------------------------------------------------------------------
-- Specialized Solution for Aggregate Product
---------------------------------------------------------------------

SELECT groupid, POWER(10., SUM(LOG10(val))) AS product
FROM dbo.Groups
GROUP BY groupid;

-- Handling Zeros and Negatives with Pivoting
SELECT groupid,
  CASE
    WHEN MAX(CASE WHEN val = 0 THEN 1 END) = 1 THEN 0
    ELSE 
      CASE WHEN COUNT(CASE WHEN val < 0 THEN 1 END) % 2 = 0
        THEN 1 ELSE -1
      END * POWER(10., SUM(LOG10(NULLIF(ABS(val), 0))))
  END AS product
FROM dbo.Groups
GROUP BY groupid;
GO

-- Handling Zeros and Negatives Mathematically
SELECT groupid,
  CAST(ROUND(EXP(SUM(LOG(ABS(NULLIF(val,0)))))*
    (1-SUM(1-SIGN(val))%4)*MIN(ABS(SIGN(val))),0) AS INT)
  AS product
FROM dbo.Groups
GROUP BY groupid;

---------------------------------------------------------------------
-- Specialized Solutions for Aggregate Bitwise Operations
---------------------------------------------------------------------

-- Creation Script for the DecToBase Function
IF OBJECT_ID('dbo.DecToBase') IS NOT NULL
  DROP FUNCTION dbo.DecToBase;
GO
CREATE FUNCTION dbo.DecToBase(@val AS BIGINT, @base AS INT)
  RETURNS VARCHAR(63)
AS
BEGIN
  DECLARE @r AS VARCHAR(63), @alldigits AS VARCHAR(36);

  SET @alldigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  SET @r = '';
  WHILE @val > 0
  BEGIN
    SET @r = SUBSTRING(@alldigits, @val % @base + 1, 1) + @r;
    SET @val = @val / @base;
  END

  RETURN @r;
END
GO

-- Binary Representation of Values
SELECT groupid, val, 
  RIGHT(REPLICATE('0', 32) + CAST(dbo.DecToBase(val, 2) AS VARCHAR(64)),
        32) AS binval
FROM dbo.Groups;

---------------------------------------------------------------------
-- Aggregate Bitwise OR
---------------------------------------------------------------------

-- Aggregate Bitwise OR, using a Series of MAX Expressions
SELECT groupid,
    MAX(val & 1)
  + MAX(val & 2)
  + MAX(val & 4)
  + MAX(val & 8)
  + MAX(val & 16)
  + MAX(val & 32)
  + MAX(val & 64)
  + MAX(val & 128)
  + MAX(val & 256)
  + MAX(val & 512)
  + MAX(val & 1024)
  + MAX(val & 2048)
  + MAX(val & 4096)
  + MAX(val & 8192)
  + MAX(val & 16384)
  + MAX(val & 32768)
  + MAX(val & 65536)
  + MAX(val & 131072)
  + MAX(val & 262144)
  + MAX(val & 524288)
  + MAX(val & 1048576)
  + MAX(val & 2097152)
  + MAX(val & 4194304)
  + MAX(val & 8388608)
  + MAX(val & 16777216)
  + MAX(val & 33554432)
  + MAX(val & 67108864)
  + MAX(val & 134217728)
  + MAX(val & 268435456)
  + MAX(val & 536870912)
  + MAX(val & 1073741824) AS agg_or
FROM dbo.Groups
GROUP BY groupid;

-- Aggregate Bitwise OR, using a Series of SUM(DISTINCT) Expressions
SELECT groupid,
    SUM(DISTINCT val & 1)
  + SUM(DISTINCT val & 2)
  + SUM(DISTINCT val & 4)
  + SUM(DISTINCT val & 8)
  + SUM(DISTINCT val & 16)
  + SUM(DISTINCT val & 32)
  + SUM(DISTINCT val & 64)
  + SUM(DISTINCT val & 128)
  + SUM(DISTINCT val & 256)
  + SUM(DISTINCT val & 512)
  + SUM(DISTINCT val & 1024)
  + SUM(DISTINCT val & 2048)
  + SUM(DISTINCT val & 4096)
  + SUM(DISTINCT val & 8192)
  + SUM(DISTINCT val & 16384)
  + SUM(DISTINCT val & 32768)
  + SUM(DISTINCT val & 65536)
  + SUM(DISTINCT val & 131072)
  + SUM(DISTINCT val & 262144)
  + SUM(DISTINCT val & 524288)
  + SUM(DISTINCT val & 1048576)
  + SUM(DISTINCT val & 2097152)
  + SUM(DISTINCT val & 4194304)
  + SUM(DISTINCT val & 8388608)
  + SUM(DISTINCT val & 16777216)
  + SUM(DISTINCT val & 33554432)
  + SUM(DISTINCT val & 67108864)
  + SUM(DISTINCT val & 134217728)
  + SUM(DISTINCT val & 268435456)
  + SUM(DISTINCT val & 536870912)
  + SUM(DISTINCT val & 1073741824) AS agg_or
FROM dbo.Groups
GROUP BY groupid;

-- Aggregate Bitwise OR, using Nums
SELECT groupid, SUM(DISTINCT bitval) AS agg_or
FROM dbo.Groups
  JOIN (SELECT POWER(2, n-1) AS bitval
        FROM dbo.Nums
        WHERE n <= 31) AS Bits
    ON val & bitval = bitval
GROUP BY groupid;

---------------------------------------------------------------------
-- Aggregate Bitwise AND
---------------------------------------------------------------------
SELECT groupid, SUM(bitval) AS agg_and
FROM (SELECT groupid, bitval
      FROM dbo.Groups,
        (SELECT POWER(2, n-1) AS bitval
         FROM dbo.Nums
         WHERE n <= 31) AS Bits
      GROUP BY groupid, bitval
      HAVING MIN(val & bitval) > 0) AS D
GROUP BY groupid;

---------------------------------------------------------------------
-- Aggregate Bitwise XOR
---------------------------------------------------------------------
SELECT groupid, SUM(bitval) AS agg_xor
FROM (SELECT groupid, bitval
      FROM dbo.Groups,
        (SELECT POWER(2, n-1) AS bitval
         FROM dbo.Nums
         WHERE n <= 31) AS Bits
      GROUP BY groupid, bitval
      HAVING SUM(SIGN(val & bitval)) % 2 = 1) AS D
GROUP BY groupid;

---------------------------------------------------------------------
-- Aggregate Median
---------------------------------------------------------------------
WITH Tiles AS
(
  SELECT groupid, val,
    NTILE(2) OVER(PARTITION BY groupid ORDER BY val) AS tile
  FROM dbo.Groups
),
GroupedTiles AS
(
  SELECT groupid, tile, COUNT(*) AS cnt,
    CASE WHEN tile = 1 THEN MAX(val) ELSE MIN(val) END AS val
  FROM Tiles
  GROUP BY groupid, tile
)
SELECT groupid,
  CASE WHEN MIN(cnt) = MAX(cnt) THEN AVG(1.*val)
       ELSE MIN(val) END AS median
FROM GroupedTiles
GROUP BY groupid;

-- Other Solutions for Median
WITH RN AS
(
  SELECT groupid, val,
    ROW_NUMBER()
      OVER(PARTITION BY groupid ORDER BY val, memberid) AS rna,
    ROW_NUMBER()
      OVER(PARTITION BY groupid ORDER BY val DESC, memberid DESC) AS rnd
  FROM dbo.Groups
)
SELECT groupid, AVG(1.*val) AS median
FROM RN
WHERE ABS(rna - rnd) <= 1
GROUP BY groupid;

WITH RN AS
(
  SELECT groupid, val,
    ROW_NUMBER() OVER(PARTITION BY groupid ORDER BY val) AS rn,
    COUNT(*) OVER(PARTITION BY groupid) AS cnt
  FROM dbo.Groups
)
SELECT groupid, AVG(1.*val) AS median
FROM RN
WHERE ABS(2*rn - cnt - 1) <= 1
GROUP BY groupid;

WITH RN AS
(
  SELECT groupid, val,
    ROW_NUMBER() OVER(PARTITION BY groupid ORDER BY val) AS rn,
    COUNT(*) OVER(PARTITION BY groupid) AS cnt
  FROM dbo.Groups
)
SELECT groupid, AVG(1.*val) AS median
FROM RN
WHERE rn IN((cnt+1)/2, (cnt+2)/2)
GROUP BY groupid;
GO

---------------------------------------------------------------------
-- Aggregate Mode
---------------------------------------------------------------------
USE InsideTSQL2008;

-- Solution based on ranking calculations, using a tiebreaker
WITH C AS
(
  SELECT custid, empid, COUNT(*) AS cnt,
    ROW_NUMBER() OVER(PARTITION BY custid
                      ORDER BY COUNT(*) DESC, empid DESC) AS rn
  FROM Sales.Orders
  GROUP BY custid, empid
)
SELECT custid, empid, cnt
FROM C
WHERE rn = 1;

-- Solution based on ranking calculations, no tiebreaker
WITH C AS
(
  SELECT custid, empid, COUNT(*) AS cnt,
    RANK() OVER(PARTITION BY custid
                ORDER BY COUNT(*) DESC) AS rn
  FROM Sales.Orders
  GROUP BY custid, empid
)
SELECT custid, empid, cnt
FROM C
WHERE rn = 1;

-- Solution based on concatenation
SELECT custid,
  CAST(SUBSTRING(MAX(binval), 5, 4) AS INT) AS empid,
  CAST(SUBSTRING(MAX(binval), 1, 4) AS INT) AS cnt  
FROM (SELECT custid, 
        CAST(COUNT(*) AS BINARY(4)) + CAST(empid AS BINARY(4)) AS binval
      FROM Sales.Orders
      GROUP BY custid, empid) AS D
GROUP BY custid;

---------------------------------------------------------------------
-- Histograms
---------------------------------------------------------------------
USE InsideTSQL2008;

-- Code Returning Histogram Steps Table
DECLARE @numsteps AS INT;
SET @numsteps = 3;

SELECT n AS step,
  mn + (n - 1) * stepsize AS lb,
  mn + n * stepsize AS hb
FROM dbo.Nums
  CROSS JOIN 
    (SELECT MIN(val) AS mn,
       ((1E0*MAX(val) + 0.0000000001) - MIN(val))
       / @numsteps AS stepsize
     FROM Sales.OrderValues) AS D
WHERE n < = @numsteps;
GO

-- Creation Script for HistSteps Function
IF OBJECT_ID('dbo.HistSteps') IS NOT NULL
  DROP FUNCTION dbo.HistSteps;
GO
CREATE FUNCTION dbo.HistSteps(@numsteps AS INT) RETURNS TABLE
AS
RETURN
  SELECT n AS step,
    mn + (n - 1) * stepsize AS lb,
    mn + n * stepsize AS hb
  FROM dbo.Nums
    CROSS JOIN
      (SELECT MIN(val) AS mn,
         ((1E0*MAX(val) + 0.0000000001) - MIN(val))
         / @numsteps AS stepsize
       FROM Sales.OrderValues) AS D
  WHERE n < = @numsteps;
GO

-- Test Function
SELECT * FROM dbo.HistSteps(3) AS S;
GO

-- Returning Histogram with 3 Steps
SELECT step, COUNT(*) AS numorders
FROM dbo.HistSteps(3) AS S
  JOIN Sales.OrderValues AS O
    ON val >= lb AND val < hb
GROUP BY step;

-- Returning Histogram with 10 Steps
SELECT step, COUNT(*) AS numorders
FROM dbo.HistSteps(10) AS S
  JOIN Sales.OrderValues AS O
    ON val >= lb AND val < hb
GROUP BY step;

-- Returning Histogram, Including Empty Steps, Using an Outer Join
SELECT step, COUNT(val) AS numorders
FROM dbo.HistSteps(10) AS S
  LEFT OUTER JOIN Sales.OrderValues AS O
    ON val >= lb AND val < hb
GROUP BY step;

-- Altering the Implementation of the HistSteps Function
ALTER FUNCTION dbo.HistSteps(@numsteps AS INT) RETURNS TABLE
AS
RETURN
  SELECT n AS step,
    mn + (n - 1) * stepsize AS lb,
    mn + n * stepsize + CASE WHEN n = @numsteps THEN 1 ELSE 0 END AS hb
  FROM dbo.Nums
    CROSS JOIN
      (SELECT MIN(val) AS mn,
         (1E0*MAX(val) - MIN(val)) / @numsteps AS stepsize
    FROM Sales.OrderValues) AS D
  WHERE n < = @numsteps;
GO

-- Test Function
SELECT * FROM dbo.HistSteps(10) AS S;

-- Getting the Histogram
SELECT step, COUNT(val) AS numorders
FROM dbo.HistSteps(3) AS S
  LEFT OUTER JOIN Sales.OrderValues AS O
    ON val >= lb AND val < hb
GROUP BY step;
GO

---------------------------------------------------------------------
-- Grouping Factor
---------------------------------------------------------------------

-- Creating and Populating the Stocks Table
USE tempdb;

IF OBJECT_ID('Stocks') IS NOT NULL DROP TABLE Stocks;

CREATE TABLE dbo.Stocks
(
  dt    DATE NOT NULL PRIMARY KEY,
  price INT  NOT NULL
);
GO

INSERT INTO dbo.Stocks(dt, price) VALUES
  ('20090801', 13),
  ('20090802', 14),
  ('20090803', 17),
  ('20090804', 40),
  ('20090805', 40),
  ('20090806', 52),
  ('20090807', 56),
  ('20090808', 60),
  ('20090809', 70),
  ('20090810', 30),
  ('20090811', 29),
  ('20090812', 29),
  ('20090813', 40),
  ('20090814', 45),
  ('20090815', 60),
  ('20090816', 60),
  ('20090817', 55),
  ('20090818', 60),
  ('20090819', 60),
  ('20090820', 15),
  ('20090821', 20),
  ('20090822', 30),
  ('20090823', 40),
  ('20090824', 20),
  ('20090825', 60),
  ('20090826', 60),
  ('20090827', 70),
  ('20090828', 70),
  ('20090829', 40),
  ('20090830', 30),
  ('20090831', 10);

CREATE UNIQUE INDEX idx_price_dt ON Stocks(price, dt);
GO

-- Ranges where Stock Price was >= 50
SELECT MIN(dt) AS startrange, MAX(dt) AS endrange,
  DATEDIFF(day, MIN(dt), MAX(dt)) + 1 AS numdays,
  MAX(price) AS maxprice
FROM (SELECT dt, price,
        (SELECT MIN(dt)
         FROM dbo.Stocks AS S2
         WHERE S2.dt > S1.dt
          AND price < 50) AS grp
      FROM dbo.Stocks AS S1
      WHERE price >= 50) AS D
GROUP BY grp;

-- Solution using ROW_NUMBER
SELECT MIN(dt) AS startrange, MAX(dt) AS endrange,
  DATEDIFF(day, MIN(dt), MAX(dt)) + 1 AS numdays,
  MAX(price) AS maxprice
FROM (SELECT dt, price,
        DATEADD(day, -1 * ROW_NUMBER() OVER(ORDER BY dt), dt) AS grp
      FROM dbo.Stocks AS S1
      WHERE price >= 50) AS D
GROUP BY grp;
GO

---------------------------------------------------------------------
-- Grouping Sets
---------------------------------------------------------------------

-- Code to Create and Populate the Orders Table (same as in Listing 8-1)
SET NOCOUNT ON;
USE tempdb;

IF OBJECT_ID('dbo.Orders', 'U') IS NOT NULL DROP TABLE dbo.Orders;
GO

CREATE TABLE dbo.Orders
(
  orderid   INT        NOT NULL,
  orderdate DATETIME   NOT NULL,
  empid     INT        NOT NULL,
  custid    VARCHAR(5) NOT NULL,
  qty       INT        NOT NULL,
  CONSTRAINT PK_Orders PRIMARY KEY(orderid)
);
GO

INSERT INTO dbo.Orders
  (orderid, orderdate, empid, custid, qty)
VALUES
  (30001, '20060802', 3, 'A', 10),
  (10001, '20061224', 1, 'A', 12),
  (10005, '20061224', 1, 'B', 20),
  (40001, '20070109', 4, 'A', 40),
  (10006, '20070118', 1, 'C', 14),
  (20001, '20070212', 2, 'B', 12),
  (40005, '20080212', 4, 'A', 10),
  (20002, '20080216', 2, 'C', 20),
  (30003, '20080418', 3, 'B', 15),
  (30004, '20060418', 3, 'C', 22),
  (30007, '20060907', 3, 'D', 30);

---------------------------------------------------------------------
-- GROUPING SETS Subclause
---------------------------------------------------------------------

SELECT custid, empid, YEAR(orderdate) AS orderyear, SUM(qty) AS qty
FROM dbo.Orders
GROUP BY GROUPING SETS
(
  ( custid, empid, YEAR(orderdate) ),
  ( custid, YEAR(orderdate)        ),
  ( empid, YEAR(orderdate)         ),
  ()
);

-- Logically equivalent to unifying multiple aggregate queries:
SELECT custid, empid, YEAR(orderdate) AS orderyear, SUM(qty) AS qty
FROM dbo.Orders
GROUP BY custid, empid, YEAR(orderdate)

UNION ALL

SELECT custid, NULL AS empid, YEAR(orderdate) AS orderyear, SUM(qty) AS qty
FROM dbo.Orders
GROUP BY custid, YEAR(orderdate)

UNION ALL

SELECT NULL AS custid, empid, YEAR(orderdate) AS orderyear, SUM(qty) AS qty
FROM dbo.Orders
GROUP BY empid, YEAR(orderdate)

UNION ALL

SELECT NULL AS custid, NULL AS empid, NULL AS orderyear, SUM(qty) AS qty
FROM dbo.Orders;

---------------------------------------------------------------------
-- CUBE Subclause
---------------------------------------------------------------------

SELECT custid, empid, SUM(qty) AS qty
FROM dbo.Orders
GROUP BY CUBE(custid, empid);

-- Equivalent to:
SELECT custid, empid, SUM(qty) AS qty
FROM dbo.Orders
GROUP BY GROUPING SETS
  ( 
    ( custid, empid ),
    ( custid        ),
    ( empid         ),
    ()
  );

-- Pre-2008 CUBE option
SELECT custid, empid, SUM(qty) AS qty
FROM dbo.Orders
GROUP BY custid, empid
WITH CUBE;

---------------------------------------------------------------------
-- ROLLUP Subclause
---------------------------------------------------------------------

SELECT
  YEAR(orderdate) AS orderyear,
  MONTH(orderdate) AS ordermonth,
  DAY(orderdate) AS orderday,
  SUM(qty) AS qty
FROM dbo.Orders
GROUP BY
  ROLLUP(YEAR(orderdate), MONTH(orderdate), DAY(orderdate));

-- Equivalent to:
SELECT
  YEAR(orderdate) AS orderyear,
  MONTH(orderdate) AS ordermonth,
  DAY(orderdate) AS orderday,
  SUM(qty) AS qty
FROM dbo.Orders
GROUP BY
  GROUPING SETS
  (
    ( YEAR(orderdate), MONTH(orderdate), DAY(orderdate) ),
    ( YEAR(orderdate), MONTH(orderdate)                 ),
    ( YEAR(orderdate)                                   ),
    ()
  );

-- Pre-2008 ROLLUP option
SELECT
  YEAR(orderdate) AS orderyear,
  MONTH(orderdate) AS ordermonth,
  DAY(orderdate) AS orderday,
  SUM(qty) AS qty
FROM dbo.Orders
GROUP BY YEAR(orderdate), MONTH(orderdate), DAY(orderdate)
WITH ROLLUP;

---------------------------------------------------------------------
-- Grouping Sets Algebra
---------------------------------------------------------------------

-- Multiplication

SELECT custid, empid,
  YEAR(orderdate) AS orderyear,
  MONTH(orderdate) AS ordermonth,
  DAY(orderdate) AS orderday,
  SUM(qty) AS qty
FROM dbo.Orders
GROUP BY
  CUBE(custid, empid),
  ROLLUP(YEAR(orderdate), MONTH(orderdate), DAY(orderdate));

-- Equivalent to:
SELECT custid, empid,
  YEAR(orderdate) AS orderyear,
  MONTH(orderdate) AS ordermonth,
  SUM(qty) AS qty
FROM dbo.Orders
GROUP BY
  GROUPING SETS
  ( 
    ( custid, empid ),
    ( custid        ),
    ( empid         ),
    ()
  ),
  GROUPING SETS
  (
    ( YEAR(orderdate), MONTH(orderdate), DAY(orderdate) ),
    ( YEAR(orderdate), MONTH(orderdate)                 ),
    ( YEAR(orderdate)                                   ),
    ()
  );

-- Equivalent to:
SELECT custid, empid,
  YEAR(orderdate) AS orderyear,
  MONTH(orderdate) AS ordermonth,
  SUM(qty) AS qty
FROM dbo.Orders
GROUP BY
  GROUPING SETS
  (
    ( custid, empid, YEAR(orderdate), MONTH(orderdate), DAY(orderdate) ),
    ( custid, empid, YEAR(orderdate), MONTH(orderdate)                 ),
    ( custid, empid, YEAR(orderdate)                                   ),
    ( custid, empid                                                    ),
    ( custid, YEAR(orderdate), MONTH(orderdate), DAY(orderdate)        ),
    ( custid, YEAR(orderdate), MONTH(orderdate)                        ),
    ( custid, YEAR(orderdate)                                          ),
    ( custid                                                           ),
    ( empid, YEAR(orderdate), MONTH(orderdate), DAY(orderdate)         ),
    ( empid, YEAR(orderdate), MONTH(orderdate)                         ),
    ( empid, YEAR(orderdate)                                           ),
    ( empid                                                            ),
    ( YEAR(orderdate), MONTH(orderdate), DAY(orderdate)                ),
    ( YEAR(orderdate), MONTH(orderdate)                                ),
    ( YEAR(orderdate)                                                  ),
    ()
  );

-- Division (pulling out common elements)
SELECT
  custid, 
  empid,
  YEAR(orderdate) AS orderyear,
  MONTH(orderdate) AS ordermonth,
  SUM(qty) AS qty
FROM dbo.Orders
GROUP BY
  GROUPING SETS
  ( 
    ( custid, empid, YEAR(orderdate), MONTH(orderdate) ),
    ( custid, empid, YEAR(orderdate)                   ),
    ( custid,        YEAR(orderdate), MONTH(orderdate) ),
    ( custid,        YEAR(orderdate)                   ),
    ( empid,         YEAR(orderdate), MONTH(orderdate) ),
    ( empid,         YEAR(orderdate)                   )
  );

-- Equivalent to:
SELECT
  custid, 
  empid,
  YEAR(orderdate) AS orderyear,
  MONTH(orderdate) AS ordermonth,
  SUM(qty) AS qty
FROM dbo.Orders
GROUP BY
  GROUPING SETS
  ( 
    ( YEAR(orderdate)                 ) 
  ),
  GROUPING SETS
  ( 
    ( custid, empid, MONTH(orderdate) ),
    ( custid, empid                   ),
    ( custid,        MONTH(orderdate) ),
    ( custid                          ),
    ( empid,         MONTH(orderdate) ),
    ( empid                           )
  );

-- Equivalent to:
SELECT
  custid, 
  empid,
  YEAR(orderdate) AS orderyear,
  MONTH(orderdate) AS ordermonth,
  SUM(qty) AS qty
FROM dbo.Orders
GROUP BY
  YEAR(orderdate),
  GROUPING SETS
  ( 
    ( custid, empid, MONTH(orderdate) ),
    ( custid, empid                   ),
    ( custid,        MONTH(orderdate) ),
    ( custid                          ),
    ( empid,         MONTH(orderdate) ),
    ( empid                           )
  );

-- Equivalent to:
SELECT
  custid, 
  empid,
  YEAR(orderdate) AS orderyear,
  MONTH(orderdate) AS ordermonth,
  SUM(qty) AS qty
FROM dbo.Orders
GROUP BY
  YEAR(orderdate),
  GROUPING SETS
  ( 
    ( custid, empid ),
    ( custid        ),
    ( empid         )
  ),
  GROUPING SETS
  (
    ( MONTH(orderdate) ),
    ()               
  );

-- Addition

SELECT
  custid, 
  empid,
  YEAR(orderdate) AS orderyear,
  MONTH(orderdate) AS ordermonth,
  SUM(qty) AS qty
FROM dbo.Orders
GROUP BY
  GROUPING SETS
  ( 
    ( custid, empid ),
    ( custid        ),
    ( empid         ),
    ROLLUP(YEAR(orderdate), MONTH(orderdate), DAY(orderdate))
  );

-- Equivalent to:
SELECT
  custid, 
  empid,
  YEAR(orderdate) AS orderyear,
  MONTH(orderdate) AS ordermonth,
  SUM(qty) AS qty
FROM dbo.Orders
GROUP BY
  GROUPING SETS
  ( 
    ( custid, empid ),
    ( custid        ),
    ( empid         ),
    ( YEAR(orderdate), MONTH(orderdate), DAY(orderdate) ),
    ( YEAR(orderdate), MONTH(orderdate)                 ),
    ( YEAR(orderdate)                                   ),
    ()
  );

---------------------------------------------------------------------
-- GROUPING_ID Function
---------------------------------------------------------------------

SELECT 
  GROUPING_ID(
    custid, empid,
    YEAR(orderdate), MONTH(orderdate), DAY(orderdate) ) AS grp_id,
  custid, empid,
  YEAR(orderdate) AS orderyear,
  MONTH(orderdate) AS ordermonth,
  DAY(orderdate) AS orderday,
  SUM(qty) AS qty
FROM dbo.Orders
GROUP BY
  CUBE(custid, empid),
  ROLLUP(YEAR(orderdate), MONTH(orderdate), DAY(orderdate));

SELECT
  GROUPING_ID(e, d, c, b, a) as n,
  COALESCE(e, 1) as [16],
  COALESCE(d, 1) as [8],
  COALESCE(c, 1) as [4],
  COALESCE(b, 1) as [2],
  COALESCE(a, 1) as [1]
FROM (VALUES(0, 0, 0, 0, 0)) AS D(a, b, c, d, e)
GROUP BY CUBE (a, b, c, d, e)
ORDER BY n;

-- Pre-2008, Identifying Grouping Set
SELECT
  GROUPING(custid)          * 4 +
  GROUPING(empid)           * 2 +
  GROUPING(YEAR(orderdate)) * 1 AS grp_id,
  custid, empid, YEAR(orderdate) AS orderyear,
  SUM(qty) AS totalqty
FROM dbo.Orders
GROUP BY custid, empid, YEAR(orderdate)
WITH CUBE;

---------------------------------------------------------------------
-- Materialize grouping sets
---------------------------------------------------------------------

USE tempdb;
IF OBJECT_ID('dbo.MyGroupingSets', 'U') IS NOT NULL  DROP TABLE dbo.MyGroupingSets;
GO

SELECT 
  GROUPING_ID(
    custid, empid,
    YEAR(orderdate), MONTH(orderdate), DAY(orderdate) ) AS grp_id,
  custid, empid,
  YEAR(orderdate) AS orderyear,
  MONTH(orderdate) AS ordermonth,
  DAY(orderdate) AS orderday,
  SUM(qty) AS qty
INTO dbo.MyGroupingSets
FROM dbo.Orders
GROUP BY
  CUBE(custid, empid),
  ROLLUP(YEAR(orderdate), MONTH(orderdate), DAY(orderdate));

CREATE UNIQUE CLUSTERED INDEX idx_cl_grp_id_grp_attributes
  ON dbo.MyGroupingSets(grp_id, custid, empid, orderyear, ordermonth, orderday);
GO

SELECT *
FROM dbo.MyGroupingSets
WHERE grp_id = 9;
GO

-- New Order Activity added in April 19, 2008
INSERT INTO dbo.Orders
  (orderid, orderdate, empid, custid, qty)
VALUES
  (50001, '20080419', 1, 'A', 10),
  (50002, '20080419', 1, 'B', 30),
  (50003, '20080419', 2, 'A', 20),
  (50004, '20080419', 2, 'B',  5),
  (50005, '20080419', 3, 'A', 15)
GO

-- Incremental Update
WITH LastDay AS
(
  SELECT 
    GROUPING_ID(
      custid, empid,
      YEAR(orderdate), MONTH(orderdate), DAY(orderdate) ) AS grp_id,
    custid, empid,
    YEAR(orderdate) AS orderyear,
    MONTH(orderdate) AS ordermonth,
    DAY(orderdate) AS orderday,
    SUM(qty) AS qty
  FROM dbo.Orders
  WHERE orderdate = '20080419'
  GROUP BY
    CUBE(custid, empid),
    ROLLUP(YEAR(orderdate), MONTH(orderdate), DAY(orderdate))
)
MERGE INTO dbo.MyGroupingSets AS TGT
USING LastDay AS SRC
  ON     (TGT.grp_id    = SRC.grp_id)
     AND (TGT.orderyear  = SRC.orderyear
          OR (TGT.orderyear IS NULL AND SRC.orderyear IS NULL))
     AND (TGT.ordermonth = SRC.ordermonth
          OR (TGT.ordermonth IS NULL AND SRC.ordermonth IS NULL))
     AND (TGT.orderday   = SRC.orderday
          OR (TGT.orderday IS NULL AND SRC.orderday IS NULL))
     AND (TGT.custid   = SRC.custid
          OR (TGT.custid IS NULL AND SRC.custid IS NULL))
     AND (TGT.empid    = SRC.empid
          OR (TGT.empid IS NULL AND SRC.empid IS NULL))
WHEN MATCHED THEN
  UPDATE SET
    TGT.qty += SRC.qty
WHEN NOT MATCHED THEN
  INSERT (grp_id, custid, empid, orderyear, ordermonth, orderday)
  VALUES (SRC.grp_id, SRC.custid, SRC.empid, SRC.orderyear, SRC.ordermonth, SRC.orderday);

---------------------------------------------------------------------
-- CUBE and ROLLUP
---------------------------------------------------------------------

SELECT YEAR(orderdate) AS orderyear, empid, custid,
  SUM(qty) AS totalqty
FROM dbo.Orders
GROUP BY YEAR(orderdate), empid, custid
WITH CUBE;

SELECT
  YEAR(orderdate)  AS orderyear,
  MONTH(orderdate) AS ordermonth,
  DAY(orderdate)   AS orderday,
  SUM(qty)         AS totalqty
FROM dbo.Orders
GROUP BY
  YEAR(orderdate),
  MONTH(orderdate),
  DAY(orderdate)
WITH ROLLUP;

---------------------------------------------------------------------
-- Identifying Grouping Set
---------------------------------------------------------------------

SELECT
  GROUPING(YEAR(orderdate)) * 4 +
  GROUPING(empid)           * 2 +
  GROUPING(custid)          * 1 AS grp_id,  
  YEAR(orderdate) AS orderyear, empid, custid,
  SUM(qty) AS totalqty
FROM dbo.Orders
GROUP BY YEAR(orderdate), empid, custid
WITH CUBE;

---------------------------------------------------------------------
-- Sorting
---------------------------------------------------------------------

SELECT 
  YEAR(orderdate)  AS orderyear,
  MONTH(orderdate) AS ordermonth,
  DAY(orderdate)   AS orderday,
  SUM(qty)         AS totalqty
FROM dbo.Orders
GROUP BY
  ROLLUP(YEAR(orderdate), MONTH(orderdate), DAY(orderdate))
ORDER BY
  GROUPING(YEAR(orderdate)) , YEAR(orderdate),
  GROUPING(MONTH(orderdate)), MONTH(orderdate),
  GROUPING(DAY(orderdate))  , DAY(orderdate);

