SELECT C.customerid, C.city, A.orderid
FROM dbo.Customers AS C
  OUTER APPLY
    (SELECT TOP (2) O.orderid, O.customerid
     FROM dbo.Orders AS O
     WHERE O.customerid = C.customerid
     ORDER BY orderid DESC) AS A;

ASSERT 1;