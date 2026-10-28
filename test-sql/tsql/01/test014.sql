USE InsideTSQL2008;

SELECT *
FROM (SELECT empid, YEAR(orderdate) AS orderyear, val
      FROM Sales.OrderValues) AS OV
  PIVOT(SUM(val) FOR orderyear IN([2006],[2007],[2008])) AS P;

ASSERT 1;