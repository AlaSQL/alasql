var alasql = require('../../dist/alasql.js');
alasql('CREATE DATABASE Production; USE Production');
alasql('CREATE TABLE Product;');
var res = alasql('SELECT * INTO Product FROM TAB("./Product.txt",{headers:true})',[],function(data){
	var res = alasql(function(){/*

	SELECT DaysToManufacture, AVG(StandardCost) AS AverageCost 
	FROM Production.Product
	GROUP BY DaysToManufacture;

	*/});

	console.log(res);
});
