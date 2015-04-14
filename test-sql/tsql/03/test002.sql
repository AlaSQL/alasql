-- Try with Israel; no employee is from Israel
SELECT custid FROM Sales.Customers AS C
WHERE NOT EXISTS
  (SELECT * FROM HR.Employees AS E
   WHERE country = N'IL'
     AND NOT EXISTS
       (SELECT * FROM Sales.Orders AS O
        WHERE O.custid = C.custid
          AND O.empid = E.empid));
