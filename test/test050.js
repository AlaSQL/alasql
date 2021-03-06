if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 50 - Insert with primary key with two columns', function () {
	describe('INSERT WITH PRIMARY KEY', function () {
		it('1: INSERT ONE COLUMN PRIMARY KEY', function (done) {
			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT, b INT, PRIMARY KEY (a,b))');
			alasql('INSERT INTO one VALUES (1,1)');
			alasql('INSERT INTO one VALUES (2,1)');

			alasql('INSERT INTO one VALUES (3,1)');
			alasql('INSERT INTO one VALUES (1,2)');
			var res = alasql('SELECT VALUE COUNT(*) FROM one');
			assert.equal(4, res);
			done();
		});

		it('2: INSERT ONE MORE RECORD WITH EXISTING KEY', function (done) {
			assert.throws(function () {
				alasql('INSERT INTO one VALUES (1,2)');
			}, Error);
			alasql('INSERT INTO one VALUES (1,3)');

			var res = alasql('SELECT VALUE COUNT(*) FROM one');
			assert.equal(5, res);
			done();
		});

		it('3: DELETE A RECORD AND REMOVE FROM INDEX', function (done) {
			alasql('DELETE FROM one WHERE a = 1');
			alasql('INSERT INTO one VALUES (1,1)');

			var res = alasql('SELECT VALUE COUNT(*) FROM one');
			assert.equal(3, res);
			done();
		});

		it('4.1: UPDATE A RECORD AND TRY TO INSERT INTO NEW VALUE', function (done) {
			alasql('UPDATE one SET a = 5, b=2 WHERE a = 1 AND b = 1');
			assert.throws(function () {
				alasql('INSERT INTO one VALUES (5,2)');
			}, Error);
			alasql('INSERT INTO one VALUES (5,1)');

			done();
		});

		it('4.2: UPDATE A RECORD AND try to insert into old value', function (done) {
			alasql('INSERT INTO one VALUES (1,1)');

			var res = alasql('SELECT VALUE COUNT(*) FROM one');
			assert.equal(5, res);
			done();
		});
	});
});
