SET NOCOUNT ON;

-- Populate table HR.Employees
SET IDENTITY_INSERT HR.Employees ON;
INSERT INTO HR.Employees(empid, lastname, firstname, title, titleofcourtesy, birthdate, hiredate, address, city, region, postalcode, country, phone, mgrid)
  VALUES(1, N'Davis', N'Sara', N'CEO', N'Ms.', '19581208 00:00:00.000', '20020501 00:00:00.000', N'7890 - 20th Ave. E., Apt. 2A', N'Seattle', N'WA', N'10003', N'USA', N'(206) 555-0101', NULL);
INSERT INTO HR.Employees(empid, lastname, firstname, title, titleofcourtesy, birthdate, hiredate, address, city, region, postalcode, country, phone, mgrid)
  VALUES(2, N'Funk', N'Don', N'Vice President, Sales', N'Dr.', '19620219 00:00:00.000', '20020814 00:00:00.000', N'9012 W. Capital Way', N'Tacoma', N'WA', N'10001', N'USA', N'(206) 555-0100', 1);
INSERT INTO HR.Employees(empid, lastname, firstname, title, titleofcourtesy, birthdate, hiredate, address, city, region, postalcode, country, phone, mgrid)
  VALUES(3, N'Lew', N'Judy', N'Sales Manager', N'Ms.', '19730830 00:00:00.000', '20020401 00:00:00.000', N'2345 Moss Bay Blvd.', N'Kirkland', N'WA', N'10007', N'USA', N'(206) 555-0103', 2);
INSERT INTO HR.Employees(empid, lastname, firstname, title, titleofcourtesy, birthdate, hiredate, address, city, region, postalcode, country, phone, mgrid)
  VALUES(4, N'Peled', N'Yael', N'Sales Representative', N'Mrs.', '19470919 00:00:00.000', '20030503 00:00:00.000', N'5678 Old Redmond Rd.', N'Redmond', N'WA', N'10009', N'USA', N'(206) 555-0104', 3);
INSERT INTO HR.Employees(empid, lastname, firstname, title, titleofcourtesy, birthdate, hiredate, address, city, region, postalcode, country, phone, mgrid)
  VALUES(5, N'Buck', N'Sven', N'Sales Manager', N'Mr.', '19650304 00:00:00.000', '20031017 00:00:00.000', N'8901 Garrett Hill', N'London', NULL, N'10004', N'UK', N'(71) 234-5678', 2);
INSERT INTO HR.Employees(empid, lastname, firstname, title, titleofcourtesy, birthdate, hiredate, address, city, region, postalcode, country, phone, mgrid)
  VALUES(6, N'Suurs', N'Paul', N'Sales Representative', N'Mr.', '19730702 00:00:00.000', '20031017 00:00:00.000', N'3456 Coventry House, Miner Rd.', N'London', NULL, N'10005', N'UK', N'(71) 345-6789', 5);
INSERT INTO HR.Employees(empid, lastname, firstname, title, titleofcourtesy, birthdate, hiredate, address, city, region, postalcode, country, phone, mgrid)
  VALUES(7, N'King', N'Russell', N'Sales Representative', N'Mr.', '19700529 00:00:00.000', '20040102 00:00:00.000', N'6789 Edgeham Hollow, Winchester Way', N'London', NULL, N'10002', N'UK', N'(71) 123-4567', 5);
INSERT INTO HR.Employees(empid, lastname, firstname, title, titleofcourtesy, birthdate, hiredate, address, city, region, postalcode, country, phone, mgrid)
  VALUES(8, N'Cameron', N'Maria', N'Sales Representative', N'Ms.', '19680109 00:00:00.000', '20040305 00:00:00.000', N'4567 - 11th Ave. N.E.', N'Seattle', N'WA', N'10006', N'USA', N'(206) 555-0102', 3);
INSERT INTO HR.Employees(empid, lastname, firstname, title, titleofcourtesy, birthdate, hiredate, address, city, region, postalcode, country, phone, mgrid)
  VALUES(9, N'Dolgopyatova', N'Zoya', N'Sales Representative', N'Ms.', '19760127 00:00:00.000', '20041115 00:00:00.000', N'1234 Houndstooth Rd.', N'London', NULL, N'10008', N'UK', N'(71) 456-7890', 5);
SET IDENTITY_INSERT HR.Employees OFF;
