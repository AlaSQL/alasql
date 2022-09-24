if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

var dbFile = __dirname + '/test_db_fs.json';

describe('Test 808 - Filestorage: Basic Operations and Drop Database', function () {
	before(function (done) {
		alasql('SET AUTOCOMMIT ON');
		done();
	});
	after(function (done) {
		done();
	});

	it('A. Create a Filestorage DB', function (done) {
		alasql('CREATE FILESTORAGE DATABASE testDBFS("' + dbFile + '")', [], function () {
			alasql('ATTACH FILESTORAGE DATABASE testDBFS("' + dbFile + '")', [], function () {
				alasql('USE testDBFS', [], function () {
					done();
				});
			});
		});
	});

	it('B. Basic Operations on a Filestorage DB table ', function (done) {
		alasql('CREATE TABLE one (a VARCHAR, b INT)', [], function () {
			alasql('INSERT INTO one VALUES ("A", 1), ("B", 2)', [], function () {
				alasql('INSERT INTO one VALUES ("C", 3)', [], function () {
					alasql('SELECT * FROM one', [], function (sres) {
						var res = sres;
						var actual = [
							{a: 'A', b: 1},
							{a: 'B', b: 2},
							{a: 'C', b: 3},
						];
						assert.deepEqual(res, actual);
						done();
					});
				});
			});
		});
	});

	it('C. Detach and Drop a Filestorage DB', function (done) {
		alasql('DETACH DATABASE testDBFS', [], function () {
			alasql('DROP FILESTORAGE DATABASE testDBFS', [], function () {
				done();
			});
		});
	});
});
