SELECT empid, 
  SUM(CASE WHEN orderyear = 2006 THEN val END) AS [2006],
  SUM(CASE WHEN orderyear = 2007 THEN val END) AS [2007],
  SUM(CASE WHEN orderyear = 2008 THEN val END) AS [2008]
FROM (SELECT empid, YEAR(orderdate) AS orderyear, val
      FROM Sales.OrderValues) AS OV
GROUP BY empid;
