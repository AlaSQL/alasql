-- Attempt to create a sorted view
IF OBJECT_ID('dbo.VSortedOrders', 'V') IS NOT NULL
  DROP VIEW dbo.VSortedOrders;
GO

-- Note: This does not create a “sorted view”!
CREATE VIEW dbo.VSortedOrders
AS

SELECT TOP (100) PERCENT orderid, customerid
FROM dbo.Orders
ORDER BY orderid DESC;
GO
