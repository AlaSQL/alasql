if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 49 - Insert with primary key', function () {
	describe('INSERT WITH PRIMARY KEY', function () {
		it('1: INSERT ONE COLUMN PRIMARY KEY', function (done) {
			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT PRIMARY KEY, b INT)');
			alasql('INSERT INTO one VALUES (1,1)');
			alasql('INSERT INTO one VALUES (2,2)');
			var res = alasql('SELECT VALUE COUNT(*) FROM one');
			assert.equal(2, res);
			done();
		});

		it('2: INSERT ONE MORE RECORD WITH EXISTING KEY', function (done) {
			alasql('INSERT INTO one VALUES (3,1)');
			assert.throws(function () {
				alasql('INSERT INTO one VALUES (1,1)');
			}, Error);
			alasql('INSERT INTO one VALUES (4,1)');

			var res = alasql('SELECT VALUE COUNT(*) FROM one');
			assert.equal(4, res);
			done();
		});

		it('3: DELETE A RECORD AND REMOVE FROM INDEX', function (done) {
			alasql('DELETE FROM one WHERE a = 3');
			alasql('INSERT INTO one VALUES (3,1)');

			var res = alasql('SELECT VALUE COUNT(*) FROM one');
			assert.equal(4, res);
			done();
		});

		it('4.1: UPDATE A RECORD AND TRY TO INSERT INTO NEW VALUE', function (done) {
			alasql('UPDATE one SET a = 5 WHERE a = 3');
			assert.throws(function () {
				alasql('INSERT INTO one VALUES (5,1)');
			}, Error);
			done();
		});

		it('4.2: UPDATE A RECORD AND try to insert into old value', function (done) {
			alasql('INSERT INTO one VALUES (3,1)');

			var res = alasql('SELECT VALUE COUNT(*) FROM one');
			assert.equal(5, res);
			done();
		});
	});
});
