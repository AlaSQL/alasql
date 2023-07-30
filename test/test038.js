if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 38', function () {
	describe('LEFT AND RIGHT JOINS', function () {
		var db;
		it('Prepare database', function (done) {
			db = new alasql.Database('db');

			db.exec('CREATE TABLE one (a INT, b INT)');
			db.exec('INSERT INTO one VALUES (1,10),(2,20),(3,30), (4,40)');

			db.exec('CREATE TABLE two (e INT, f INT)');
			db.exec('INSERT INTO two VALUES (1,100),(2,200),(3,300), (1000,1000), (2000,2000)');

			db.exec('CREATE TABLE three (g INT, h INT)');
			db.exec('INSERT INTO three VALUES (200,2000), (1000,10000),(2000,20000), (3000,30000)');
			done();
		});

		it('1x LEFT JOIN', function (done) {
			var res = db.exec('SELECT * FROM one LEFT JOIN two ON one.a = two.e');
			assert.equal(res.length, 4);
			done();
		});

		it('1x RIGHT JOIN', function (done) {
			var res = db.exec('SELECT * FROM two RIGHT JOIN one ON one.a = two.e');
			assert.equal(res.length, 4);
			done();
		});

		it('2x LEFT JOIN', function (done) {
			var res = db.exec(
				'SELECT * FROM one ' +
					' LEFT JOIN two ON one.a = two.e' +
					' LEFT JOIN three ON two.f = three.g'
			);
			assert.equal(res.length, 4);
			done();
		});
		/*
		it('2x RIGHT JOIN', function(done){
			var res = db.exec("SELECT * FROM three "+
				" RIGHT JOIN two ON two.f = three.g"+
				" RIGHT JOIN one ON one.a = two.e" );
/// console.table(res);
			assert.equal(res.length,4);
			done();
		});
*/
		/*
		it('2x RIGHT JOIN', function(done){
			var res = db.exec("SELECT * FROM one "+
				" OUTER JOIN two ON one.a = two.e "+
				" OUTER JOIN three ON two.f = three.g " );
/// console.table(res);
			assert.equal(res.length,2);
			done();
		});
*/
		it('2x INNER JOIN', function (done) {
			var res = db.exec(
				'SELECT * FROM one ' + ' JOIN two ON one.a = two.e' + ' JOIN three ON two.f = three.g'
			);
			assert.equal(res.length, 1);
			done();
		});

		it('2x INNER JOIN', function (done) {
			var res = db.exec(
				'SELECT * FROM three ' +
					' INNER JOIN two ON three.g = two.f' +
					' INNER JOIN one ON two.e = one.a'
			);
			assert.equal(res.length, 1);
			done();
		});
	});
});
