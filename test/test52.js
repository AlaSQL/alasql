if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 52 - UPPER CASE and LOWER CASE', function() {
	it('Upper and lower case in CREATE TABLE', function(done){
		var db1 = alasql.Database("db1");
		db1.exec('CrEaTe TABle caTeGories (Category Int, city strinG)');
		db1.exec('InsERT Into CATEGORIES values (1,"Rome")');
		db1.exec('insert into categores values (1,"Paris")');
		db1.exec('INSERT INTO Categories VAlUES (2, "Moscow")');
		db1.exec('INSERT INTO CategorieS VALues (3, "New York")');

		db1.exec('CREATE table CiTiEs (City String, population int)');
		db1.exec('INSERT INTO CITIES VALues ("Rome",10)');
		db1.exec('insert into cities values ("Moscow", 12)');
		db1.exec('inseRt iNto cIties vAlues ("New York", 16)');
		db1.exec('INSERT into CITIES values ("Paris", 9)');
	});

	it('Upper and lower case in CREATE TABLE', function(done){

		var res1 = db1.queryValue('select sum(population) from categories '+
			' join cities using city group by category');
		console.log(res1);

		var res2 = db1.queryValue('SELECT SUM(POPULATION) FROM CATEGORIES  '+
			' JOIN CITIES GROUP BY CATEGORY');
		console.log(res1);

		var res3 = db1.queryValue('Select Sum(Population) From Categories '+
			' Join Cities Using City Group By Category');
		console.log(res3);

		var res4 = db1.queryValue('Select Sum(PopulATION) From CategorIes '+
			' Join Cities ON Categories.City = CITIES.CITY Group By CaTegory');
		console.log(res4);

		assert.deepEqual(res1,res2);
		assert.deepEqual(res1,res3);
		assert.deepEqual(res1,res4);
		done();
	});
});
