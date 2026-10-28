WITH TheseEmployees AS (
  SELECT empid
  FROM HR.Employees
  WHERE country = 'USA'
), CustomerCharacteristicFunctions AS (
  SELECT
    custid, 
    CASE WHEN custid IN (
        SELECT custid
        FROM Sales.Orders AS O
        WHERE O.empid = E.empid
      ) THEN 1 ELSE 0 END AS charfun
  FROM Sales.Customers AS C
  CROSS JOIN TheseEmployees AS E
) 
  SELECT
    custid, MIN(charfun) as mincharfun
  FROM CustomerCharacteristicFunctions
  GROUP BY custid
  ORDER BY custid;
GO
