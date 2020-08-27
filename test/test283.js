if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var _ = require('lodash');
} else {
	__dirname = '.';
}

describe('Test 283 Test for simple example with foreign key', function () {
	it('1. CREATE DATABASE', function (done) {
		var res = alasql(function () {
			/*

      CREATE DATABASE Fruits;
      USE DATABASE Fruits;
      CREATE TABLE Fruits (
        fruitid INT PRIMARY KEY,
        fruitname NVARCHAR(MAX),
        price MONEY
      );

      CREATE TABLE Orders (
        orderid INT PRIMARY KEY IDENTITY,
        fruitid INT REFERENCES Fruits(fruitid),
        qty FLOAT
      );

      INSERT INTO Fruits VALUES (1,"Peach",22),(2,"Apple",10),(3,"Melon",14);

      INSERT INTO Orders (fruitid, qty) VALUES (1,100), (2,150), (3,25);

      SELECT f.fruitname, f.price, o.qty, f.price*o.qty AS amount FROM Orders o JOIN Fruits f USING fruitid;

      DROP DATABASE Fruits;
    */
		});
		/// console.log(res);

		done();
	});
});
