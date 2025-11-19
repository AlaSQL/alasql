// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 198 - MS SQL compatibility', () => {
	test('1. Create tables', done => {
		alasql('CREATE DATABASE test198; USE test198');
		alasql('SOURCE "' + __dirname + '/test198-1.sql"');
		var res = alasql('SELECT * FROM Customers');
		expect(res).toEqual([
			{customerid: 'FISSA', city: 'Madrid'},
			{customerid: 'FRNDO', city: 'Madrid'},
			{customerid: 'KRLOS', city: 'Madrid'},
			{customerid: 'MRPHS', city: 'Zion'},
		]);
		var res = alasql('SELECT * FROM Orders');
		expect(res).toEqual([
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

	test('2. Select', done => {
		var res = alasql('SOURCE "' + __dirname + '/test198-2.sql"');
		expect(res).toEqual([
			{customerid: 'FISSA', numorders: 0},
			{customerid: 'FRNDO', numorders: 2},
		]);
		done();
	});

	test('3. CROSS JOIN', done => {
		var res = alasql('SELECT * FROM Customers AS C JOIN Orders AS O');
		expect(res.length == 28).toBe(true);
		//        console.log(res);
		done();
	});

	test('4. ON', done => {
		var res = alasql(
			'SELECT * FROM Customers AS C \
        	JOIN Orders AS O ON C.customerid = O.customerid'
		);
		expect(res.length == 6).toBe(true);
		//        console.log(res);
		done();
	});

	test('5. LEFT OUTER JOIN ', done => {
		var res = alasql(
			'SELECT * FROM Customers AS C \
        	LEFT OUTER JOIN Orders AS O ON C.customerid = O.customerid'
		);
		expect(res.length == 7).toBe(true);
		//        console.log(res);
		done();
	});

	test('6. LEFT OUTER JOIN ', done => {
		var res = alasql(
			'SELECT * FROM Customers AS C \
        	LEFT OUTER JOIN Orders AS O ON C.customerid = O.customerid \
        	WHERE C.city = "Madrid"'
		);
		expect(res.length == 6).toBe(true);
		//        console.log(res);
		done();
	});

	test('7. GROUP BY ', done => {
		var res = alasql(
			'SELECT * FROM Customers AS C \
        	LEFT OUTER JOIN Orders AS O ON C.customerid = O.customerid \
			WHERE C.city = "Madrid" \
			GROUP BY C.customerid'
		);
		//        expect(res.length == 6).toBe(true);
		expect(res).toEqual([{customerid: 'FISSA'}, {customerid: 'FRNDO'}, {customerid: 'KRLOS'}]);
		done();
	});

	test('8. HAVING ', done => {
		var res = alasql(
			'SELECT * FROM Customers AS C \
        	LEFT OUTER JOIN Orders AS O ON C.customerid = O.customerid \
			WHERE C.city = "Madrid" \
			GROUP BY C.customerid \
			HAVING COUNT(O.orderid) < 3'
		);
		expect(res).toEqual([{customerid: 'FISSA'}, {customerid: 'FRNDO'}]);
		done();
	});

	test('9. SELECT ', done => {
		var res = alasql(
			'SELECT C.customerid, COUNT(O.orderid) AS numorders \
        	FROM Customers AS C \
        	LEFT OUTER JOIN Orders AS O ON C.customerid = O.customerid \
			WHERE C.city = "Madrid" \
			GROUP BY C.customerid \
			HAVING COUNT(O.orderid) < 3'
		);
		expect(res).toEqual([
			{customerid: 'FISSA', numorders: 0},
			{customerid: 'FRNDO', numorders: 2},
		]);
		done();
	});

	test('10. ORDER BY ', done => {
		var res = alasql(
			'SELECT orderid, customerid FROM Orders \
          ORDER BY customerid, orderid;'
		);
		//        console.log(res);
		expect(res).toEqual([
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

	test('11. SELECT ', done => {
		var res = alasql(
			'SELECT C.customerid, COUNT(O.orderid) AS numorders \
        	FROM Customers AS C \
        	LEFT OUTER JOIN Orders AS O ON C.customerid = O.customerid \
			WHERE C.city = "Madrid" \
			GROUP BY C.customerid \
			HAVING COUNT(O.orderid) < 3 \
			ORDER BY numorders DESC'
		);
		expect(res).toEqual([
			{customerid: 'FRNDO', numorders: 2},
			{customerid: 'FISSA', numorders: 0},
		]);
		done();
	});

	test('12. TOP ', done => {
		var res = alasql(
			'SELECT TOP 50 PERCENT orderid, customerid \
          FROM Orders ORDER BY customerid, orderid;'
		);
		//        console.log(res);
		expect(res).toEqual([
			{orderid: 7, customerid: undefined},
			{orderid: 1, customerid: 'FRNDO'},
			{orderid: 2, customerid: 'FRNDO'},
		]);
		done();
	});

	if (false) {
		test('13. CROSS APPLY ', done => {
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

		test('14. OUTER APPLY ', done => {
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

		test('15. OVER PARTITION in SELECT', done => {
			var res = alasql(
				'SELECT orderid, customerid, \
  			COUNT(*) OVER(PARTITION BY customerid) AS num_orders \
			FROM Orders \
			WHERE customerid IS NOT NULL \
  			AND orderid % 2 = 1;'
			);
			done();
		});

		test('16. OVER PARTITION in WHERE', done => {
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
	test('17. UNION ALL ', done => {
		var res = alasql(
			"SELECT 'O' AS letter, customerid, orderid \
        		FROM Orders \
         		WHERE customerid LIKE '%O%' \
			UNION ALL \
         		SELECT 'S' AS letter, customerid, orderid FROM Orders \
         		WHERE customerid LIKE '%S%' \
         	ORDER BY letter, customerid, orderid"
		);
		expect(res).toEqual([
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

	test('18. Complex Statement', done => {
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
		expect(res).toEqual([
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

	test('99. Drop database', done => {
		alasql('DROP DATABASE test198');
		done();
	});
});
