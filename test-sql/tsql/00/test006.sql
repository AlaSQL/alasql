CREATE TABLE Sales.Customers
(
  custid       INT          NOT NULL IDENTITY,
  companyname  NVARCHAR(40) NOT NULL,
  contactname  NVARCHAR(30) NOT NULL,
  contacttitle NVARCHAR(30) NOT NULL,
  address      NVARCHAR(60) NOT NULL,
  city         NVARCHAR(15) NOT NULL,
  region       NVARCHAR(15) NULL,
  postalcode   NVARCHAR(10) NULL,
  country      NVARCHAR(15) NOT NULL,
  phone        NVARCHAR(24) NOT NULL,
  fax          NVARCHAR(24) NULL,
  CONSTRAINT PK_Customers PRIMARY KEY(custid)
);

CREATE NONCLUSTERED INDEX idx_nc_city        ON Sales.Customers(city);
CREATE NONCLUSTERED INDEX idx_nc_companyname ON Sales.Customers(companyname);
CREATE NONCLUSTERED INDEX idx_nc_postalcode  ON Sales.Customers(postalcode);
CREATE NONCLUSTERED INDEX idx_nc_region      ON Sales.Customers(region);
