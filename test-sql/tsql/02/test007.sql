-- Listing 2-4 Query to find customers who were served by every USA employee
CREATE INDEX sk_custid_empid ON Sales.Orders(custid,empid);
GO

WITH TheseEmployees AS (
  SELECT empid
  FROM HR.Employees
  WHERE country = 'USA'
), CharacteristicFunctions AS (
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
    custid 
  FROM CharacteristicFunctions
  GROUP BY custid
  HAVING MIN(charfun) = 1
  ORDER BY custid;
GO

DROP INDEX Sales.Orders.sk_custid_empid;
