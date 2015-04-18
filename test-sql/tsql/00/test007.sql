CREATE TABLE Sales.Shippers
(
  shipperid   INT          NOT NULL IDENTITY,
  companyname NVARCHAR(40) NOT NULL,
  phone       NVARCHAR(24) NOT NULL,
  CONSTRAINT PK_Shippers PRIMARY KEY(shipperid)
);
