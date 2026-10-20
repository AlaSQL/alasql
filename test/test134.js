if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 134 SELECT FROM', function () {
	if (false) {
		it('1. Load data from CSV and TAB', function (done) {
			alasql('CREATE DATABASE test134; USE test134');
			alasql('CREATE TABLE one (a INT, b STRING)');
			alasql('SELECT * INTO one FROM CSV("' + __dirname + '/test134.csv",true)');
			alasql('SELECT [0] AS a, [1] AS b INTO one FROM TAB("' + __dirname + '/test134.tab")');

			var res = alasql('SELECT VALUE COUNT(*) FROM one');
			assert(res == 10);

			done();
		});

		it('2. INSERT (Node.js only)', function (done) {
			if (typeof exports === 'object') {
				alasql('SELECT * INTO CSV("' + __dirname + '/out/test134-out.csv", true)');
				alasql('SELECT * INTO TAB("' + __dirname + '/out/test134-out.tab", false)');
				done();
			}
		});

		it('3. EXCEL LOAD (require load sheet.xls libraries', function (done) {
			alasql('SELECT * FROM XLS("' + __dirname + '/out/test134.xls", true, "Sheet1")');
			alasql('SELECT * FROM XLSX("' + __dirname + '/out/test134.xlsx", false, "Sheet2", "A2:C4")');
			alasql('SELECT * FROM XLSX("' + __dirname + '/out/test134.xlsx", "A", "Sheet2", "B2:C4")');
			done();
		});

		it('4. EXCEL SAVE', function (done) {
			if (typeof exports === 'object') {
				alasql('SELECT * INTO XLS("' + __dirname + '/out/test134-out.xls", true)');
				alasql('SELECT * INTO XLSX("' + __dirname + '/out/test134-out.xlsx", false)');
				done();
			}
		});

		it('99. UPDATE', function (done) {
			alasql('DROP DATABASE test134');
			done();
		});
	}
});
