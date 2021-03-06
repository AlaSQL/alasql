if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test239.json', {strict: false, ws: ''});
}

describe('Test 239 AUTOCOMMIT OFF test', function () {
	if (false) {
		it('1. Create database', function (done) {
			alasql('SET AUTOCOMMIT OFF');
			//    console.log(1);
			alasql('DROP LOCALSTORAGE DATABASE IF EXISTS ls239');
			//    console.log(2);
			alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS ls239');
			//    console.log(3);
			alasql('ATTACH LOCALSTORAGE DATABASE ls239 AS test239; USE test239');
			//    console.log(4);

			alasql('CREATE TABLE IF NOT EXISTS one (a int, b string)');
			//    console.log(5);

			alasql('insert into one VALUES (1,"Moscow"), (2, "Kyiv"), (3,"Minsk")');
			//    console.log(6);
			var res = alasql('select * from one');
			assert.deepEqual(res, [
				{a: 1, b: 'Moscow'},
				{a: 2, b: 'Kyiv'},
				{a: 3, b: 'Minsk'},
			]);

			var res = alasql('COMMIT TRANSACTION');
			//    console.log(7);
			//    var res = alasql('BEGIN TRANSACTION');
			alasql('insert into one VALUES (4,"Sochi"), (5, "Vancouver")');
			var res = alasql('select * from one');
			assert.deepEqual(res, [
				{a: 1, b: 'Moscow'},
				{a: 2, b: 'Kyiv'},
				{a: 3, b: 'Minsk'},
				{a: 4, b: 'Sochi'},
				{a: 5, b: 'Vancouver'},
			]);

			var res = alasql('ROLLBACK TRANSACTION');
			//    console.log(8);
			//    console.log(alasql.databases.test239.tables.one.data);
			//    console.log(alasql.options);
			//    alasql('insert into one VALUES (4,"Berlin")');
			var res = alasql('select * from one');
			//    console.log(9);
			//      console.log(res);
			assert.deepEqual(res, [
				{a: 1, b: 'Moscow'},
				{a: 2, b: 'Kyiv'},
				{a: 3, b: 'Minsk'},
			]);
			alasql('DROP TABLE one');
			//    console.log(10);
			done();
		});

		it('3.Complex test', function (done) {
			alasql(function () {
				/*
    DROP LOCALSTORAGE DATABASE IF EXISTS test001;
    CREATE LOCALSTORAGE DATABASE test001;
    ATTACH LOCALSTORAGE DATABASE test001;
    USE test001;
    CREATE TABLE one(a int, b string);
    */
			});

			var tm = Date.now();
			for (var i = 0; i < 10000; i++) {
				alasql('INSERT INTO one VALUES (?,?)', [1, 'one']);
			}
			//    console.log(alasql.tables.one);
			//alasql('COMMIT TRANSACTION');

			var res = alasql('SELECT VALUE COUNT(*) FROM one ');
			assert(res == 10000);
			var res = alasql('COMMIT TRANSACTION');

			//    console.log(res,Date.now()-tm);

			done();
		});

		it('8.Drop localStorage table', function (done) {
			alasql('DETACH DATABASE test239');
			alasql('DROP LOCALSTORAGE DATABASE ls239');
			done();
		});
	}
});
