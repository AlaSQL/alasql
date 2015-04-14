USE InsideTSQL2008;
GO

DECLARE @empid AS INT = 1;

SELECT
  custid,
  CASE WHEN custid IN (
      SELECT custid
      FROM Sales.Orders AS O
      WHERE O.empid = @empid
    ) THEN 1 ELSE 0 END AS charfun
FROM Sales.Customers AS C
GO
