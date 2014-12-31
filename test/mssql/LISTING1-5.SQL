 SELECT C.customerid, city,
           CASE
             WHEN COUNT(orderid)  = 0 THEN 'no_orders'
             WHEN COUNT(orderid) <= 2 THEN 'upto_two_orders'
             WHEN COUNT(orderid)  > 2 THEN 'more_than_two_orders'
           END AS category
         FROM dbo.Customers AS C
           LEFT OUTER JOIN dbo.Orders AS O
             ON C.customerid = O.customerid
         GROUP BY C.customerid, city;
