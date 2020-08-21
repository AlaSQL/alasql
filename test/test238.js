if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var path = require('path');
	var dirname = path.normalize(__dirname) + '/';
} else {
	dirname = './';
}

// Test is based on
// https://msdn.microsoft.com/en-us/library/ms190349.aspx
//
describe('Test 238 Test from string and into string', function () {
	if (typeof exports == 'object') {
		it('1. JSON', function (done) {
			alasql('SELECT 100 INTO "' + dirname + 'test238.json"', [], function () {
				alasql('SELECT VALUE * FROM "' + dirname + 'test238.json"', [], function (res) {
					assert(res == 100);
					done();
				});
			});
		});
		it('2. CSV() and AS', function (done) {
			alasql('SELECT 1 AS a, 2 AS b INTO "' + dirname + 'restest238a.csv"', [], function () {
				alasql('SELECT VALUE test.a FROM "' + dirname + 'test238a.csv" AS test', [], function (
					res
				) {
					assert(res == 1);
					done();
				});
			});
		});
		it('3. XLSX', function (done) {
			alasql('SELECT 1 AS a, 2 AS b INTO "' + dirname + 'restest238b.xlsx"', [], function () {
				alasql('SELECT VALUE test.a FROM "' + dirname + 'test238b.xlsx" AS test', [], function (
					res
				) {
					assert(res == 1);
					done();
				});
			});
		});
	}
});
