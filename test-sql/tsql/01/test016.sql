IF OBJECT_ID('dbo.EmpYearValues') IS NOT NULL
  DROP TABLE dbo.EmpYearValues;
GO

-- Creating and Populating the EmpYearValues Table
SELECT *
INTO dbo.EmpYearValues
FROM (SELECT empid, YEAR(orderdate) AS orderyear, val
      FROM Sales.OrderValues) AS OV
  PIVOT(SUM(val) FOR orderyear IN([2006],[2007],[2008])) AS P;

UPDATE dbo.EmpYearValues
  SET [2006] = NULL
WHERE empid IN(1, 2);

SELECT * FROM dbo.EmpYearValues;

-- Unpivoted Employee and Year Values
SELECT empid, orderyear, val
FROM dbo.EmpYearValues
  UNPIVOT(val FOR orderyear IN([2006],[2007],[2008])) AS U;

-- Cleanup
IF OBJECT_ID('dbo.EmpYearValues') IS NOT NULL
  DROP TABLE dbo.EmpYearValues;
