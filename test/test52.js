if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 52 - UPPER CASE and LOWER CASE', function() {

	var db1 = new alasql.Database("city");

	it('Upper and lower case in CREATE TABLE Category', function(done){
		db1.exec('CrEaTe TABle caTeGories (Category Int, city strinG)');
		db1.exec('InsERT Into CATEGORIES values (1,"Rome")');
		db1.exec('insert into categories values (1,"Paris")');
		db1.exec('INSERT INTO Categories VAlUES (2, "Moscow")');
		db1.exec('INSERT INTO CategorieS VALues (3, "New York")');
		assert.equal(4, db1.queryValue('select COUNT(*) from categories'));
		done();
	});

	it('Upper and lower case in CREATE TABLE City', function(done){
		db1.exec('CREATE table CiTiEs (City String, population int)');
		db1.exec('INSERT INTO CITIES VALues ("Rome",10)');
		db1.exec('insert into cities values ("Moscow", 12)');
		db1.exec('inseRt iNto cIties vAlues ("New York", 16)');
		db1.exec('INSERT into CITIES values ("Paris", 9)');
		assert.equal(4, db1.queryValue('select count(*)from cities'));
		assert.equal(47, db1.queryValue('select suM(population) from cities'));
		done();
	});

	it('Upper and lower case in SELECT with JOIN', function(done){
		var sql1 = 'select POPULATION from (SELECT category, '+
			'SUM(cities.POPULATION) as POPULATION from CATEGORIES '+
			'join CITIES using CITY group BY category) T order BY population';
		var sql2 = 'select POPULATION from (SELECT category, '+
			'SUM(cities.POPULATION) as population from categories '+
			'join cities using city group by category) t order by population';
		assert.deepEqual([12,16,19],db1.queryArray(sql1));
		assert.deepEqual([12,16,19],db1.queryArray(sql2));
		done();
	});

	it('Upper and lower case in SELECT with JOIN', function(done){

		var res1 = db1.queryValue('select sum(cities.population) from categories '+
			' join cities using city');

		var res2 = db1.queryValue('SELECT SUM(CiTiEs.POPULATION) FROM CATEGORIES  '+
			' JOIN CITIES Using ciTY');

		var res3 = db1.queryValue('Select Sum(CITIES.Population) From Categories '+
			' Join Cities Using City');

		var res4 = db1.queryValue('Select Sum(cities.PopulATION) From CategorIes '+
			' Join Cities ON Categories.City = CITIES.CITY');

		assert.equal(47,res1);
		assert.equal(47,res2);
		assert.equal(47,res3);
		assert.equal(47,res4);
		done();
	});
});
