DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Customers;
CREATE TABLE Customers
(
  customerid  CHAR(5)     NOT NULL PRIMARY KEY,
  city        VARCHAR(10) NOT NULL
);
INSERT INTO Customers(customerid, city) VALUES('FISSA', 'Madrid');
INSERT INTO Customers(customerid, city) VALUES('FRNDO', 'Madrid');
INSERT INTO Customers(customerid, city) VALUES('KRLOS', 'Madrid');
INSERT INTO Customers(customerid, city) VALUES('MRPHS', 'Zion');
CREATE TABLE Orders
(
  orderid    INT         NOT NULL PRIMARY KEY,
  customerid CHAR(5)     NULL     REFERENCES Customers(customerid)
);
INSERT INTO Orders(orderid, customerid) VALUES(1, 'FRNDO');
INSERT INTO Orders(orderid, customerid) VALUES(2, 'FRNDO');
INSERT INTO Orders(orderid, customerid) VALUES(3, 'KRLOS');
INSERT INTO Orders(orderid, customerid) VALUES(4, 'KRLOS');
INSERT INTO Orders(orderid, customerid) VALUES(5, 'KRLOS');
INSERT INTO Orders(orderid, customerid) VALUES(6, 'MRPHS');
INSERT INTO Orders(orderid, customerid) VALUES(7, NULL);
