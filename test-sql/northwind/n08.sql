--[Customer and Suppliers by City];
DROP VIEW IF EXISTS [Customer and Suppliers by City];
--
CREATE VIEW [Customer and Suppliers by City] 
AS
SELECT City, 
       CompanyName, 
       ContactName, 
       'Customers' AS Relationship 
FROM Customers
UNION 
SELECT City, 
       CompanyName, 
       ContactName, 
       'Suppliers'
FROM Suppliers 
ORDER BY City, CompanyName;
--
SELECT * FROM [Customer and Suppliers by City]; -- OK 
--
--[Invoices];
DROP VIEW IF EXISTS [Invoices];
--
CREATE VIEW [Invoices] 
AS
SELECT Orders.ShipName,
       Orders.ShipAddress,
       Orders.ShipCity,
       Orders.ShipRegion, 
       Orders.ShipPostalCode,
       Orders.ShipCountry,
       Orders.CustomerID,
       Customers.CompanyName AS CustomerName, 
       Customers.Address,
       Customers.City,
       Customers.Region,
       Customers.PostalCode,
       Customers.Country,
       (Employees.FirstName + ' ' + Employees.LastName) AS Salesperson, 
       Orders.OrderID,
       Orders.OrderDate,
       Orders.RequiredDate,
       Orders.ShippedDate, 
       Shippers.CompanyName As ShipperName,
       [Order Details].ProductID,
       Products.ProductName, 
       [Order Details].UnitPrice,
       [Order Details].Quantity,
       [Order Details].Discount, 
       ((([Order Details].UnitPrice*Quantity*(1-Discount))/100)*100) AS ExtendedPrice,
       Orders.Freight 
FROM Customers 
  JOIN Orders ON Customers.CustomerID = Orders.CustomerID  
    JOIN Employees ON Employees.EmployeeID = Orders.EmployeeID    
     JOIN [Order Details] ON Orders.OrderID = [Order Details].OrderID     
      JOIN Products ON Products.ProductID = [Order Details].ProductID      
       JOIN Shippers ON Shippers.ShipperID = Orders.ShipVia;
--
SELECT * FROM [Invoices]; -- OK
--
--[Orders Qry];
DROP VIEW IF EXISTS [Orders Qry];
--
CREATE VIEW [Orders Qry] AS
SELECT Orders.OrderID,
       Orders.CustomerID,
       Orders.EmployeeID, 
       Orders.OrderDate, 
       Orders.RequiredDate,
       Orders.ShippedDate, 
       Orders.ShipVia, 
       Orders.Freight,
       Orders.ShipName, 
       Orders.ShipAddress, 
       Orders.ShipCity,
       Orders.ShipRegion,
       Orders.ShipPostalCode,
       Orders.ShipCountry,
       Customers.CompanyName,
       Customers.Address,
       Customers.City,
       Customers.Region,
       Customers.PostalCode, 
       Customers.Country
FROM Customers 
     JOIN Orders ON Customers.CustomerID = Orders.CustomerID;     
--
SELECT * FROM [Orders Qry]; -- OK
--
--[Order Subtotals]
DROP VIEW IF EXISTS [Order Subtotals];
--
CREATE VIEW [Order Subtotals] AS
SELECT [Order Details].OrderID, 
Sum(([Order Details].UnitPrice*Quantity*(1-Discount)/100)*100) AS Subtotal
FROM [Order Details]
GROUP BY [Order Details].OrderID;
--
SELECT * FROM [Order Subtotals]; -- OK
--
--[Orders Qry];
DROP VIEW IF EXISTS [Orders Qry];
--
CREATE VIEW [Orders Qry] AS
SELECT Orders.OrderID, 
       Orders.CustomerID, 
       Orders.EmployeeID, 
       Orders.OrderDate, 
       Orders.RequiredDate, 
       Orders.ShippedDate, 
       Orders.ShipVia, 
       Orders.Freight, 
       Orders.ShipName, 
       Orders.ShipAddress, 
       Orders.ShipCity, 
	   Orders.ShipRegion, 
       Orders.ShipPostalCode, 
       Orders.ShipCountry, 
  	   Customers.CompanyName, 
       Customers.Address, 
       Customers.City, 
       Customers.Region, 
       Customers.PostalCode, 
       Customers.Country
FROM Customers 
     INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID;     
--
SELECT * FROM [Orders Qry]; -- OK
--
--[Product Sales for 1997]
DROP VIEW IF EXISTS [Product Sales for 1997];
--
CREATE VIEW [Product Sales for 1997] AS
SELECT Categories.CategoryName, 
       Products.ProductName, 
       Sum(([Order Details].UnitPrice*Quantity*(1-Discount)/100)*100) AS ProductSales
FROM Categories
 JOIN    Products On Categories.CategoryID = Products.CategoryID
    JOIN  [Order Details] on Products.ProductID = [Order Details].ProductID     
     JOIN  [Orders] on Orders.OrderID = [Order Details].OrderID 
WHERE Orders.ShippedDate Between DATETIME('1997-01-01') And DATETIME('1997-12-31')
GROUP BY Categories.CategoryName, Products.ProductName;
--
SELECT * FROM [Product Sales for 1997]; -- OK
--[Products Above Average Price]
DROP VIEW IF EXISTS [Products Above Average Price];
--
CREATE VIEW [Products Above Average Price] AS
SELECT Products.ProductName, 
       Products.UnitPrice
FROM Products
WHERE Products.UnitPrice>(SELECT AVG(UnitPrice) From Products);
--
SELECT * FROM [Products Above Average Price]; -- OK
--
--[Products by Category]
DROP VIEW IF EXISTS [Products by Category];
--
CREATE VIEW [Products by Category] AS
SELECT Categories.CategoryName, 
       Products.ProductName, 
       Products.QuantityPerUnit, 
       Products.UnitsInStock, 
       Products.Discontinued
FROM Categories 
     INNER JOIN Products ON Categories.CategoryID = Products.CategoryID
WHERE Products.Discontinued <> 1;
--
SELECT * FROM [Products by Category]; -- OK
--
--[Quarterly Orders]
DROP VIEW IF EXISTS [Quarterly Orders];
--
CREATE VIEW [Quarterly Orders] AS
SELECT DISTINCT Customers.CustomerID, 
                Customers.CompanyName, 
                Customers.City, 
                Customers.Country
FROM Customers 
     JOIN Orders ON Customers.CustomerID = Orders.CustomerID
WHERE Orders.OrderDate BETWEEN DATETIME('1997-01-01') And DATETIME('1997-12-31');
--
SELECT * FROM [Quarterly Orders]; --OK
--
--[Sales Totals by Amount]
DROP VIEW IF EXISTS [Sales Totals by Amount];
--
CREATE VIEW [Sales Totals by Amount] AS
SELECT [Order Subtotals].Subtotal AS SaleAmount, 
                  Orders.OrderID, 
               Customers.CompanyName, 
                  Orders.ShippedDate
FROM Customers 
 JOIN Orders ON Customers.CustomerID = Orders.CustomerID
    JOIN [Order Subtotals] ON Orders.OrderID = [Order Subtotals].OrderID 
WHERE ([Order Subtotals].Subtotal >2500) 
AND (Orders.ShippedDate BETWEEN DATETIME('1997-01-01') And DATETIME('1997-12-31'));
--
Select * From [Sales Totals by Amount]; --OK
--
--[Summary of Sales by Quarter]
DROP VIEW IF EXISTS [Summary of Sales by Quarter];
CREATE VIEW [Summary of Sales by Quarter] AS
SELECT Orders.ShippedDate, 
       Orders.OrderID, 
       [Order Subtotals].Subtotal
FROM Orders 
     INNER JOIN [Order Subtotals] ON Orders.OrderID = [Order Subtotals].OrderID
WHERE Orders.ShippedDate IS NOT NULL;
--
SELECT * FROM [Sales Totals by Amount];
--
--[Summary of Sales by Year]
DROP VIEW IF EXISTS [Summary of Sales by Year];
CREATE VIEW [Summary of Sales by Year] AS
SELECT      Orders.ShippedDate, 
            Orders.OrderID, 
 [Order Subtotals].Subtotal
FROM Orders 
     INNER JOIN [Order Subtotals] ON Orders.OrderID = [Order Subtotals].OrderID
WHERE Orders.ShippedDate IS NOT NULL;
--
--[Category Sales for 1997]
DROP VIEW IF EXISTS [Category Sales for 1997];
--
CREATE VIEW [Category Sales for 1997] AS
SELECT     [Product Sales for 1997].CategoryName, 
       Sum([Product Sales for 1997].ProductSales) AS CategorySales
FROM [Product Sales for 1997]
GROUP BY [Product Sales for 1997].CategoryName;
--
SELECT * FROM [Category Sales for 1997];
--
--[Order Details Extended]
DROP VIEW IF EXISTS [Order Details Extended];
CREATE VIEW [Order Details Extended] AS
SELECT [Order Details].OrderID, 
       [Order Details].ProductID, 
       Products.ProductName, 
	   [Order Details].UnitPrice, 
       [Order Details].Quantity, 
       [Order Details].Discount, 
      ([Order Details].UnitPrice*Quantity*(1-Discount)/100)*100 AS ExtendedPrice
FROM Products 
     JOIN [Order Details] ON Products.ProductID = [Order Details].ProductID;
--     
SELECT * FROM [Order Details Extended];
--
--[Sales by Category]
DROP VIEW IF EXISTS [Sales by Category];
--
CREATE VIEW [Sales by Category] AS
SELECT Categories.CategoryID, 
       Categories.CategoryName, 
         Products.ProductName, 
	Sum([Order Details Extended].ExtendedPrice) AS ProductSales
FROM  Categories 
    JOIN Products 
      ON Categories.CategoryID = Products.CategoryID
       JOIN [Order Details Extended] 
         ON Products.ProductID = [Order Details Extended].ProductID                
           JOIN Orders 
             ON Orders.OrderID = [Order Details Extended].OrderID 
WHERE Orders.OrderDate BETWEEN DATETIME('1997-01-01') And DATETIME('1997-12-31')
GROUP BY Categories.CategoryID, Categories.CategoryName, Products.ProductName;
--
SELECT * FROM [Sales by Category]; --OK