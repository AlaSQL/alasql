-- Listing 12-1: DDL & Sample Data for Employees
SET NOCOUNT ON;
USE tempdb;
GO
IF OBJECT_ID('dbo.Employees') IS NOT NULL
  DROP TABLE dbo.Employees;
GO
CREATE TABLE dbo.Employees
(
  empid   INT         NOT NULL PRIMARY KEY,
  mgrid   INT         NULL     REFERENCES dbo.Employees,
  empname VARCHAR(25) NOT NULL,
  salary  MONEY       NOT NULL,
  CHECK (empid <> mgrid)
);

INSERT INTO dbo.Employees(empid, mgrid, empname, salary) VALUES
  (1,  NULL, 'David'  , $10000.00),
  (2,  1,    'Eitan'  ,  $7000.00),
  (3,  1,    'Ina'    ,  $7500.00),
  (4,  2,    'Seraph' ,  $5000.00),
  (5,  2,    'Jiru'   ,  $5500.00),
  (6,  2,    'Steve'  ,  $4500.00),
  (7,  3,    'Aaron'  ,  $5000.00),
  (8,  5,    'Lilach' ,  $3500.00),
  (9,  7,    'Rita'   ,  $3000.00),
  (10, 5,    'Sean'   ,  $3000.00),
  (11, 7,    'Gabriel',  $3000.00),
  (12, 9,    'Emilia' ,  $2000.00),
  (13, 9,    'Michael',  $2000.00),
  (14, 9,    'Didi'   ,  $1500.00);

CREATE UNIQUE INDEX idx_unc_mgrid_empid ON dbo.Employees(mgrid, empid);
GO

---------------------------------------------------------------------
-- Bill Of Materials (BOM)
---------------------------------------------------------------------

-- Listing 12-2: DDL & Sample Data for Parts, BOM
SET NOCOUNT ON;
USE tempdb;
GO
IF OBJECT_ID('dbo.BOM') IS NOT NULL
  DROP TABLE dbo.BOM;
GO
IF OBJECT_ID('dbo.Parts') IS NOT NULL
  DROP TABLE dbo.Parts;
GO
CREATE TABLE dbo.Parts
(
  partid   INT         NOT NULL PRIMARY KEY,
  partname VARCHAR(25) NOT NULL
);

INSERT INTO dbo.Parts(partid, partname) VALUES
  ( 1, 'Black Tea'      ),
  ( 2, 'White Tea'      ),
  ( 3, 'Latte'          ),
  ( 4, 'Espresso'       ),
  ( 5, 'Double Espresso'),
  ( 6, 'Cup Cover'      ),
  ( 7, 'Regular Cup'    ),
  ( 8, 'Stirrer'        ),
  ( 9, 'Espresso Cup'   ),
  (10, 'Tea Shot'       ),
  (11, 'Milk'           ),
  (12, 'Coffee Shot'    ),
  (13, 'Tea Leaves'     ),
  (14, 'Water'          ),
  (15, 'Sugar Bag'      ),
  (16, 'Ground Coffee'  ),
  (17, 'Coffee Beans'   );

CREATE TABLE dbo.BOM
(
  partid     INT           NOT NULL REFERENCES dbo.Parts,
  assemblyid INT           NULL     REFERENCES dbo.Parts,
  unit       VARCHAR(3)    NOT NULL,
  qty        DECIMAL(8, 2) NOT NULL,
  UNIQUE(partid, assemblyid),
  CHECK (partid <> assemblyid)
);

INSERT INTO dbo.BOM(partid, assemblyid, unit, qty) VALUES
  ( 1, NULL, 'EA',   1.00),
  ( 2, NULL, 'EA',   1.00),
  ( 3, NULL, 'EA',   1.00),
  ( 4, NULL, 'EA',   1.00),
  ( 5, NULL, 'EA',   1.00),
  ( 6,    1, 'EA',   1.00),
  ( 7,    1, 'EA',   1.00),
  (10,    1, 'EA',   1.00),
  (14,    1, 'mL', 230.00),
  ( 6,    2, 'EA',   1.00),
  ( 7,    2, 'EA',   1.00),
  (10,    2, 'EA',   1.00),
  (14,    2, 'mL', 205.00),
  (11,    2, 'mL',  25.00),
  ( 6,    3, 'EA',   1.00),
  ( 7,    3, 'EA',   1.00),
  (11,    3, 'mL', 225.00),
  (12,    3, 'EA',   1.00),
  ( 9,    4, 'EA',   1.00),
  (12,    4, 'EA',   1.00),
  ( 9,    5, 'EA',   1.00),
  (12,    5, 'EA',   2.00),
  (13,   10, 'g' ,   5.00),
  (14,   10, 'mL',  20.00),
  (14,   12, 'mL',  20.00),
  (16,   12, 'g' ,  15.00),
  (17,   16, 'g' ,  15.00);
GO

---------------------------------------------------------------------
-- Road System
---------------------------------------------------------------------

-- Listing 12-3: DDL & Sample Data for Cities, Roads
SET NOCOUNT ON;
USE tempdb;
GO
IF OBJECT_ID('dbo.Roads') IS NOT NULL
  DROP TABLE dbo.Roads;
GO
IF OBJECT_ID('dbo.Cities') IS NOT NULL
  DROP TABLE dbo.Cities;
GO

CREATE TABLE dbo.Cities
(
  cityid  CHAR(3)     NOT NULL PRIMARY KEY,
  city    VARCHAR(30) NOT NULL,
  region  VARCHAR(30) NULL,
  country VARCHAR(30) NOT NULL
);

INSERT INTO dbo.Cities(cityid, city, region, country) VALUES
  ('ATL', 'Atlanta', 'GA', 'USA'),
  ('ORD', 'Chicago', 'IL', 'USA'),
  ('DEN', 'Denver', 'CO', 'USA'),
  ('IAH', 'Houston', 'TX', 'USA'),
  ('MCI', 'Kansas City', 'KS', 'USA'),
  ('LAX', 'Los Angeles', 'CA', 'USA'),
  ('MIA', 'Miami', 'FL', 'USA'),
  ('MSP', 'Minneapolis', 'MN', 'USA'),
  ('JFK', 'New York', 'NY', 'USA'),
  ('SEA', 'Seattle', 'WA', 'USA'),
  ('SFO', 'San Francisco', 'CA', 'USA'),
  ('ANC', 'Anchorage', 'AK', 'USA'),
  ('FAI', 'Fairbanks', 'AK', 'USA');

CREATE TABLE dbo.Roads
(
  city1       CHAR(3) NOT NULL REFERENCES dbo.Cities,
  city2       CHAR(3) NOT NULL REFERENCES dbo.Cities,
  distance INT     NOT NULL,
  PRIMARY KEY(city1, city2),
  CHECK(city1 < city2),
  CHECK(distance > 0)
);

INSERT INTO dbo.Roads(city1, city2, distance) VALUES
  ('ANC', 'FAI',  359),
  ('ATL', 'ORD',  715),
  ('ATL', 'IAH',  800),
  ('ATL', 'MCI',  805),
  ('ATL', 'MIA',  665),
  ('ATL', 'JFK',  865),
  ('DEN', 'IAH', 1120),
  ('DEN', 'MCI',  600),
  ('DEN', 'LAX', 1025),
  ('DEN', 'MSP',  915),
  ('DEN', 'SEA', 1335),
  ('DEN', 'SFO', 1270),
  ('IAH', 'MCI',  795),
  ('IAH', 'LAX', 1550),
  ('IAH', 'MIA', 1190),
  ('JFK', 'ORD',  795),
  ('LAX', 'SFO',  385),
  ('MCI', 'ORD',  525),
  ('MCI', 'MSP',  440),
  ('MSP', 'ORD',  410),
  ('MSP', 'SEA', 2015),
  ('SEA', 'SFO',  815);