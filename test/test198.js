if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 198 - MS SQL compatibility', function () {
	it('1. Create tables', function (done) {
		alasql('CREATE DATABASE test198; USE test198');
		alasql('SOURCE "' + __dirname + '/test198-1.sql"');
		var res = alasql('SELECT * FROM Customers');
		assert.deepEqual(res, [
			{customerid: 'FISSA', city: 'Madrid'},
			{customerid: 'FRNDO', city: 'Madrid'},
			{customerid: 'KRLOS', city: 'Madrid'},
			{customerid: 'MRPHS', city: 'Zion'},
		]);
		var res = alasql('SELECT * FROM Orders');
		assert.deepEqual(res, [
			{orderid: 1, customerid: 'FRNDO'},
			{orderid: 2, customerid: 'FRNDO'},
			{orderid: 3, customerid: 'KRLOS'},
			{orderid: 4, customerid: 'KRLOS'},
			{orderid: 5, customerid: 'KRLOS'},
			{orderid: 6, customerid: 'MRPHS'},
			{orderid: 7, customerid: undefined},
		]);
		done();
	});

	it('2. Select', function (done) {
		var res = alasql('SOURCE "' + __dirname + '/test198-2.sql"');
		assert.deepEqual(res, [
			{customerid: 'FISSA', numorders: 0},
			{customerid: 'FRNDO', numorders: 2},
		]);
		done();
	});

	it('3. CROSS JOIN', function (done) {
		var res = alasql('SELECT * FROM Customers AS C JOIN Orders AS O');
		assert(res.length == 28);
		//        console.log(res);
		done();
	});

	it('4. ON', function (done) {
		var res = alasql(
			'SELECT * FROM Customers AS C \
        	JOIN Orders AS O ON C.customerid = O.customerid'
		);
		assert(res.length == 6);
		//        console.log(res);
		done();
	});

	it('5. LEFT OUTER JOIN ', function (done) {
		var res = alasql(
			'SELECT * FROM Customers AS C \
        	LEFT OUTER JOIN Orders AS O ON C.customerid = O.customerid'
		);
		assert(res.length == 7);
		//        console.log(res);
		done();
	});

	it('6. LEFT OUTER JOIN ', function (done) {
		var res = alasql(
			'SELECT * FROM Customers AS C \
        	LEFT OUTER JOIN Orders AS O ON C.customerid = O.customerid \
        	WHERE C.city = "Madrid"'
		);
		assert(res.length == 6);
		//        console.log(res);
		done();
	});

	it('7. GROUP BY ', function (done) {
		var res = alasql(
			'SELECT * FROM Customers AS C \
        	LEFT OUTER JOIN Orders AS O ON C.customerid = O.customerid \
			WHERE C.city = "Madrid" \
			GROUP BY C.customerid'
		);
		//        assert(res.length == 6);
		assert.deepEqual(res, [{customerid: 'FISSA'}, {customerid: 'FRNDO'}, {customerid: 'KRLOS'}]);
		done();
	});

	it('8. HAVING ', function (done) {
		var res = alasql(
			'SELECT * FROM Customers AS C \
        	LEFT OUTER JOIN Orders AS O ON C.customerid = O.customerid \
			WHERE C.city = "Madrid" \
			GROUP BY C.customerid \
			HAVING COUNT(O.orderid) < 3'
		);
		assert.deepEqual(res, [{customerid: 'FISSA'}, {customerid: 'FRNDO'}]);
		done();
	});

	it('9. SELECT ', function (done) {
		var res = alasql(
			'SELECT C.customerid, COUNT(O.orderid) AS numorders \
        	FROM Customers AS C \
        	LEFT OUTER JOIN Orders AS O ON C.customerid = O.customerid \
			WHERE C.city = "Madrid" \
			GROUP BY C.customerid \
			HAVING COUNT(O.orderid) < 3'
		);
		assert.deepEqual(res, [
			{customerid: 'FISSA', numorders: 0},
			{customerid: 'FRNDO', numorders: 2},
		]);
		done();
	});

	it('10. ORDER BY ', function (done) {
		var res = alasql(
			'SELECT orderid, customerid FROM Orders \
          ORDER BY customerid, orderid;'
		);
		//        console.log(res);
		assert.deepEqual(res, [
			{orderid: 7, customerid: undefined},
			{orderid: 1, customerid: 'FRNDO'},
			{orderid: 2, customerid: 'FRNDO'},
			{orderid: 3, customerid: 'KRLOS'},
			{orderid: 4, customerid: 'KRLOS'},
			{orderid: 5, customerid: 'KRLOS'},
			{orderid: 6, customerid: 'MRPHS'},
		]);
		done();
	});

	it('11. SELECT ', function (done) {
		var res = alasql(
			'SELECT C.customerid, COUNT(O.orderid) AS numorders \
        	FROM Customers AS C \
        	LEFT OUTER JOIN Orders AS O ON C.customerid = O.customerid \
			WHERE C.city = "Madrid" \
			GROUP BY C.customerid \
			HAVING COUNT(O.orderid) < 3 \
			ORDER BY numorders DESC'
		);
		assert.deepEqual(res, [
			{customerid: 'FRNDO', numorders: 2},
			{customerid: 'FISSA', numorders: 0},
		]);
		done();
	});

	it('12. TOP ', function (done) {
		var res = alasql(
			'SELECT TOP 50 PERCENT orderid, customerid \
          FROM Orders ORDER BY customerid, orderid;'
		);
		//        console.log(res);
		assert.deepEqual(res, [
			{orderid: 7, customerid: undefined},
			{orderid: 1, customerid: 'FRNDO'},
			{orderid: 2, customerid: 'FRNDO'},
		]);
		done();
	});

	if (false) {
		it('13. CROSS APPLY ', function (done) {
			var res = alasql(
				'SELECT C.customerid, city, orderid \
			FROM Customers AS C \
  			CROSS APPLY \
    			(SELECT TOP(2) orderid, customerid \
     				FROM Orders AS O \
     				WHERE O.customerid = C.customerid \
     				ORDER BY orderid DESC) AS CA;'
			);
			done();
		});

		it('14. OUTER APPLY ', function (done) {
			var res = alasql(
				'SELECT C.customerid, city, orderid \
			FROM Customers AS C \
  			OUTER APPLY \
    			(SELECT TOP(2) orderid, customerid \
     				FROM Orders AS O \
     				WHERE O.customerid = C.customerid \
     				ORDER BY orderid DESC) AS CA;'
			);
			done();
		});

		it('15. OVER PARTITION in SELECT', function (done) {
			var res = alasql(
				'SELECT orderid, customerid, \
  			COUNT(*) OVER(PARTITION BY customerid) AS num_orders \
			FROM Orders \
			WHERE customerid IS NOT NULL \
  			AND orderid % 2 = 1;'
			);
			done();
		});

		it('16. OVER PARTITION in WHERE', function (done) {
			var res = alasql(
				'SELECT orderid, customerid \
			FROM Orders \
			WHERE customerid IS NOT NULL \
  					AND orderid % 2 = 1 \
			ORDER BY COUNT(*) OVER(PARTITION BY customerid) DESC;'
			);
			done();
		});
	}
	it('17. UNION ALL ', function (done) {
		var res = alasql(
			"SELECT 'O' AS letter, customerid, orderid \
        		FROM Orders \
         		WHERE customerid LIKE '%O%' \
			UNION ALL \
         		SELECT 'S' AS letter, customerid, orderid FROM Orders \
         		WHERE customerid LIKE '%S%' \
         	ORDER BY letter, customerid, orderid"
		);
		assert.deepEqual(res, [
			{letter: 'O', customerid: 'FRNDO', orderid: 1},
			{letter: 'O', customerid: 'FRNDO', orderid: 2},
			{letter: 'O', customerid: 'KRLOS', orderid: 3},
			{letter: 'O', customerid: 'KRLOS', orderid: 4},
			{letter: 'O', customerid: 'KRLOS', orderid: 5},
			{letter: 'S', customerid: 'KRLOS', orderid: 3},
			{letter: 'S', customerid: 'KRLOS', orderid: 4},
			{letter: 'S', customerid: 'KRLOS', orderid: 5},
			{letter: 'S', customerid: 'MRPHS', orderid: 6},
		]);
		//        console.log(res);
		done();
	});

	it('18. Complex Statement', function (done) {
		var res = alasql(
			"SELECT C.customerid, city,/*COUNT(orderid),*/ \
           CASE \
             WHEN COUNT(orderid)  = 0 THEN 'no_orders' \
             WHEN COUNT(orderid) <= 2 THEN 'upto_two_orders' \
             WHEN COUNT(orderid)  > 2 THEN 'more_than_two_orders' \
           END AS category \
         FROM Customers AS C \
           LEFT OUTER JOIN Orders AS O \
             ON C.customerid = O.customerid \
         GROUP BY C.customerid, city"
		);
		//        console.log(res);
		assert.deepEqual(res, [
			{
				customerid: 'FISSA',
				city: 'Madrid',
				//    'COUNT(orderid)': 0,
				category: 'no_orders',
			},
			{
				customerid: 'FRNDO',
				city: 'Madrid',
				//    'COUNT(orderid)': 2,
				category: 'upto_two_orders',
			},
			{
				customerid: 'KRLOS',
				city: 'Madrid',
				//    'COUNT(orderid)': 3,
				category: 'more_than_two_orders',
			},
			{
				customerid: 'MRPHS',
				city: 'Zion',
				//    'COUNT(orderid)': 1,
				category: 'upto_two_orders',
			},
		]);
		done();
	});

	it('99. Drop database', function (done) {
		alasql('DROP DATABASE test198');
		done();
	});
});
