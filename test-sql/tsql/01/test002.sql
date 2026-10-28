SELECT * FROM dbo.Customers;
ASSERT @[{"customerid":"FISSA","city":"Madrid"},
{"customerid":"FRNDO","city":"Madrid"},
{"customerid":"KRLOS","city":"Madrid"},
{"customerid":"MRPHS","city":"Zion"}];

SELECT * FROM dbo.Orders;
ASSERT @[{"orderid":1,"customerid":"FRNDO"},
{"orderid":2,"customerid":"FRNDO"},
{"orderid":3,"customerid":"KRLOS"},
{"orderid":4,"customerid":"KRLOS"},
{"orderid":5,"customerid":"KRLOS"},
{"orderid":6,"customerid":"MRPHS"},
{"orderid":7,"customerid":NULL}];
