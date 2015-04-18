SELECT C.customerid, COUNT(O.orderid) AS numorders
FROM Customers AS C
  LEFT OUTER JOIN Orders AS O
    ON C.customerid = O.customerid
WHERE C.city = 'Madrid'
GROUP BY C.customerid
HAVING COUNT(O.orderid) < 3
ORDER BY numorders;