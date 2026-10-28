-- SELECT orderid, customerid FROM dbo.Orders ORDER BY 2, 1;
SELECT orderid, customerid FROM dbo.Orders ORDER BY customerid, orderid;

ASSERT @[{"orderid":1,"customerid":"FRNDO"},
{"orderid":2,"customerid":"FRNDO"},
{"orderid":3,"customerid":"KRLOS"},
{"orderid":4,"customerid":"KRLOS"},
{"orderid":5,"customerid":"KRLOS"},
{"orderid":6,"customerid":"MRPHS"},
{"orderid":7,"customerid": NULL}];