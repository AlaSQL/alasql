if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//

//http://stackoverflow.com/questions/18811265/sql-creating-temporary-variables
//
describe('Test 334 WITH CTE', function () {
	it.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test334;USE test334');

		done();
	});

	it.skip('2. Create table', function (done) {
		var res = alasql(function () {
			/*
      CREATE TABLE grocery (name STRING, price MONEY, quantity INT);
      INSERT INTO test VALUES ("Apples",10,10),("Melons",15,20),("Cucumbers",40,50);
    */
		});
		assert.deepEqual(res, [1, 1]);
		done();
	});

	it.skip('3. WITH SELECT', function (done) {
		var res = alasql(function () {
			/*

 With Totals as
 (
    select  *,
            price * quantity as [Total price],
    from    grocery
 )
 select  *
    ,  case
         when [Total price]>100 and [Total price]<= 200 then '2%'
         when [Total price]>200 and [Total price]<= 300 then '3%'
         when [Total price]>300 and [Total price]<= 400 then '4%'
        else '0%'
     end as tax
 from
   Totals

    */
		});
		console.log(res);
		assert.deepEqual(res, [
			{tax: '0%', name: 'Apples', price: 10, quantity: 10, 'Total price': 100},
			{tax: '3%', name: 'Melons', price: 15, quantity: 20, 'Total price': 300},
			{tax: '0%', name: 'Cucumbers', price: 40, quantity: 50, 'Total price': 2000},
		]);

		done();
	});

	it.skip('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test334');
		done();
	});
});
