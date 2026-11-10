if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var fs = require('fs');
}

let testId = '2948'; // Use the ID of the issue being fixed by this PR

(alasql.utils.isNode ? describe : describe.skip)(
	`Test ${testId} - ROLLBACK TRANSACTION on a FILESTORAGE database`,
	function () {
		const fsdbid = 'test' + testId + 'fs';
		const filename = 'test' + testId + '.db';
		let autocommit;

		function attach(done) {
			alasql('ATTACH FILESTORAGE DATABASE ' + fsdbid + '("' + filename + '")', function () {
				alasql('USE ' + fsdbid);
				done();
			});
		}

		before(function (done) {
			autocommit = alasql.options.autocommit;
			alasql.options.autocommit = false;
			if (fs.existsSync(filename)) fs.unlinkSync(filename);
			alasql('CREATE FILESTORAGE DATABASE ' + fsdbid + '("' + filename + '")', function () {
				attach(done);
			});
		});

		after(function (done) {
			alasql('USE alasql');
			alasql('DETACH DATABASE ' + fsdbid);
			alasql.options.autocommit = autocommit;
			alasql('DROP FILESTORAGE DATABASE ' + fsdbid, function () {
				done();
			});
		});

		it('A) ROLLBACK TRANSACTION restores the rows of the last COMMIT', function () {
			let res = [];
			res.push(alasql('CREATE TABLE one (a INT)'));
			res.push(alasql('INSERT INTO one VALUES (1)'));
			res.push(alasql('COMMIT TRANSACTION'));
			res.push(alasql('INSERT INTO one VALUES (2)'));
			res.push(alasql('SELECT * FROM one'));
			res.push(alasql('ROLLBACK TRANSACTION'));
			res.push(alasql('SELECT * FROM one'));
			assert.deepStrictEqual(res, [1, 1, 1, 1, [{a: 1}, {a: 2}], 1, [{a: 1}]]);
		});

		it('B) ROLLBACK TRANSACTION with a callback calls it after the rows are restored', function (done) {
			let res = [];
			res.push(alasql('INSERT INTO one VALUES (3)'));
			res.push(alasql('SELECT * FROM one'));
			alasql('ROLLBACK TRANSACTION', [], function (r) {
				res.push(r);
				res.push(alasql('SELECT * FROM one'));
				assert.deepStrictEqual(res, [1, [{a: 1}, {a: 3}], 1, [{a: 1}]]);
				done();
			});
		});

		it('C) The database keeps working after a ROLLBACK TRANSACTION', function (done) {
			let res = [];
			res.push(alasql('INSERT INTO one VALUES (4)'));
			res.push(alasql('COMMIT TRANSACTION'));
			res.push(alasql('SELECT * FROM one'));
			assert.deepStrictEqual(res, [1, 1, [{a: 1}, {a: 4}]]);
			alasql('USE alasql');
			alasql('DETACH DATABASE ' + fsdbid);
			attach(function () {
				assert.deepStrictEqual(alasql('SELECT * FROM one'), [{a: 1}, {a: 4}]);
				done();
			});
		});
	}
);
