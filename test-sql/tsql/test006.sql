-- Views are not realized yet

IF OBJECT_ID('dbo.VSortedOrders', 'V') IS NOT NULL
  DROP VIEW dbo.VSortedOrders;
GO
CREATE VIEW dbo.VSortedOrders
AS

SELECT orderid, customerid
FROM dbo.Orders
ORDER BY orderid DESC;

ASSERT 1;