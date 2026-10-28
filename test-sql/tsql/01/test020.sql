SELECT custid FROM Sales.Customers
EXCEPT
SELECT custid FROM Sales.Orders;
