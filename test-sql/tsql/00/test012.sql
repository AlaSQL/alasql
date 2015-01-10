
---------------------------------------------------------------------
-- Create Views
---------------------------------------------------------------------

CREATE VIEW Sales.OrderValues
  WITH SCHEMABINDING
AS

SELECT O.orderid, O.custid, O.empid, O.shipperid, O.orderdate,
  CAST(SUM(OD.qty * OD.unitprice * (1 - discount))
       AS NUMERIC(12, 2)) AS val
FROM Sales.Orders AS O
  JOIN Sales.OrderDetails AS OD
    ON O.orderid = OD.orderid
GROUP BY O.orderid, O.custid, O.empid, O.shipperid, O.orderdate;
GO

