SELECT orderid, customerid
FROM dbo.Orders
ORDER BY orderid DESC;

ASSERT @[{"orderid":7,"customerid":NULL},
{"orderid":6,"customerid":"MRPHS"},
{"orderid":5,"customerid":"KRLOS"},
{"orderid":4,"customerid":"KRLOS"},
{"orderid":3,"customerid":"KRLOS"},
{"orderid":2,"customerid":"FRNDO"},
{"orderid":1,"customerid":"FRNDO"}];