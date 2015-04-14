USE InsideTSQL2008;

SELECT orderid, custid,
  COUNT(*) OVER(PARTITION BY custid) AS numorders
FROM Sales.Orders
WHERE shipcountry = N'Spain';
