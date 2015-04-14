IF OBJECT_ID('dbo.EmpOrders', 'V') IS NOT NULL
  DROP VIEW dbo.EmpOrders;
GO
IF OBJECT_ID('dbo.Orders', 'U') IS NOT NULL
  DROP TABLE dbo.Orders;
GO
IF OBJECT_ID('dbo.Customers', 'U') IS NOT NULL
  DROP TABLE dbo.Customers;
GO
IF OBJECT_ID('dbo.Employees', 'U') IS NOT NULL
  DROP TABLE dbo.Employees;
GO
IF OBJECT_ID('dbo.Shippers', 'U') IS NOT NULL
  DROP TABLE dbo.Shippers;
GO
