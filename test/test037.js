if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 37', function () {
	describe('JOINS', function () {
		alasql('create database test37; use test37');
		//		var db = alasql.Database("db");

		it('Prepare database', function (done) {
			alasql('drop table if exists one;drop table if exists two;');
			alasql('CREATE TABLE one (a INT, b INT)');
			alasql('INSERT INTO one VALUES (1,10),(2,20),(3,30), (4,40)');

			alasql('CREATE TABLE two (e INT, f INT)');
			alasql('INSERT INTO two VALUES (1,100),(2,200),(3,300), (1000,1000), (2000,2000)');
			done();
		});
		it('CROSS JOIN', function (done) {
			var res = alasql('SELECT * FROM one, two');
			assert.equal(res.length, 20);
			done();
		});

		it('INNER JOIN', function (done) {
			var res = alasql('SELECT * FROM one INNER JOIN two ON one.a = two.e');
			assert.equal(res.length, 3);
			done();
		});

		it('LEFT JOIN', function (done) {
			var res = alasql('SELECT * FROM one LEFT JOIN two ON one.a = two.e');
			assert.equal(res.length, 4);
			done();
		});

		it('SEMI JOIN', function (done) {
			var res = alasql('SELECT * FROM one SEMI JOIN two ON one.a = two.e');
			assert.equal(res.length, 1);
			done();
		});

		it('RIGHT JOIN', function (done) {
			var res = alasql('SELECT * FROM one RIGHT JOIN two ON one.a = two.e');
			assert.equal(res.length, 5);
			done();
		});

		it('OUTER JOIN', function (done) {
			var res = alasql('SELECT * FROM one OUTER JOIN two ON one.a = two.e');
			assert.equal(res.length, 6);
			done();
		});

		it('ANTI JOIN', function (done) {
			var res = alasql('SELECT * FROM one ANTI JOIN two ON one.a = two.e');
			assert.equal(res.length, 2);
			done();
		});

		alasql('drop database test37');
	});
});
