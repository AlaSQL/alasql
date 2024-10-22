if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('../dist/alasql');
}

/*
  Test for issue #1979
*/

var test = '1979'; // insert test file number

describe('Test ' + test + ' - date function aliases in the parser', function () {
	it('1a. NOW is a reserved keyword', function () {
		assert.throws(function() {
			alasql('SELECT NOW() AS now');
		});
		assert.throws(function() {
			alasql('SELECT NOW() AS NOW');
		});
		assert.throws(function() {
			alasql('SELECT NOW() AS NOW()');
		});
	});

	it('1b. GETDATE is a reserved keyword', function () {
		assert.throws(function() {
			alasql('SELECT GETDATE() AS GETDATE');
		});
		assert.throws(function() {
			alasql('SELECT GETDATE() AS getdate');
		});
		assert.throws(function() {
			alasql('SELECT GETDATE() AS getdate()');
		});
	});

	it('1c. Check parser', function () {
		// If the parser works ok, the date functions are parsed with a funcid instead of columnid
		assert.equal("CURRENT_TIMESTAMP", alasql.parse('SELECT CURRENT_TIMESTAMP').statements[0].columns[0].funcid);
		assert.equal("CURRENT_TIMESTAMP", alasql.parse('SELECT CURRENT_TIMESTAMP()').statements[0].columns[0].funcid);
		assert.equal("CURRENT_TIMESTAMP", alasql.parse('SELECT NOW').statements[0].columns[0].funcid);
		assert.equal("NOW", alasql.parse('SELECT NOW()').statements[0].columns[0].funcid);
		assert.equal("CURRENT_TIMESTAMP", alasql.parse('SELECT GETDATE').statements[0].columns[0].funcid);
		assert.equal("GETDATE", alasql.parse('SELECT GETDATE()').statements[0].columns[0].funcid);
		assert.equal("CURRENT_DATE", alasql.parse('SELECT CURRENT_DATE').statements[0].columns[0].funcid);
		assert.equal("CURRENT_DATE", alasql.parse('SELECT CURRENT_DATE()').statements[0].columns[0].funcid);
		assert.equal("CURRENT_DATE", alasql.parse('SELECT CURDATE').statements[0].columns[0].funcid);
		assert.equal("CURDATE", alasql.parse('SELECT CURDATE()').statements[0].columns[0].funcid);

		assert.equal("SECOND", alasql.parse('SELECT SECOND(NOW())').statements[0].columns[0].funcid);
		assert.equal("HOUR", alasql.parse('SELECT HOUR(NOW())').statements[0].columns[0].funcid);
		assert.equal("MINUTE", alasql.parse('SELECT MINUTE(NOW())').statements[0].columns[0].funcid);
		assert.equal("DAY", alasql.parse('SELECT DAY(NOW())').statements[0].columns[0].funcid);
		assert.equal("DAYOFWEEK", alasql.parse('SELECT DAYOFWEEK(NOW())').statements[0].columns[0].funcid);
		assert.equal("MONTH", alasql.parse('SELECT MONTH(NOW())').statements[0].columns[0].funcid);
		assert.equal("YEAR", alasql.parse('SELECT YEAR(NOW())').statements[0].columns[0].funcid);

		assert.equal("DATE_ADD", alasql.parse('SELECT DATE_ADD(DATE("20081012"), INTERVAL 10 DAY)').statements[0].columns[0].funcid);
		assert.equal("DATE_ADD", alasql.parse('SELECT ADDDATE(DATE("20081012"), INTERVAL 10 DAY)').statements[0].columns[0].funcid);
		assert.equal("DATE_SUB", alasql.parse('SELECT DATE_SUB(DATE("20081012"), INTERVAL 10 DAY)').statements[0].columns[0].funcid);
		assert.equal("DATE_SUB", alasql.parse('SELECT SUBDATE(DATE("20081012"), INTERVAL 10 DAY)').statements[0].columns[0].funcid);
		assert.equal("DATE", alasql.parse('SELECT DATE("20081012")').statements[0].columns[0].funcid);
	});

	it('1d. SECOND/HOUR/MINUTE/DAY/DAYOFWEEK/MONTH/YEAR are reserved keywords', function () {
		assert.throws(function() {
			alasql('SELECT SECOND(NOW()) AS SECOND');
		});
		assert.throws(function() {
			alasql('SELECT HOUR(NOW()) AS HOUR');
		});
		assert.throws(function() {
			alasql('SELECT MINUTE(NOW()) AS MINUTE');
		});
		assert.throws(function() {
			alasql('SELECT DAY(NOW()) AS DAY');
		});
		assert.throws(function() {
			alasql('SELECT DAYOFWEEK(NOW()) AS DAYOFWEEK');
		});
		assert.throws(function() {
			alasql('SELECT MONTH(NOW()) AS MONTH');
		});
		assert.throws(function() {
			alasql('SELECT YEAR(NOW()) AS YEAR');
		});

		// As literal is fine
		alasql("SELECT SECOND(NOW()) AS 'SECOND'");
		alasql("SELECT HOUR(NOW()) AS 'HOUR'");
		alasql("SELECT MINUTE(NOW()) AS 'MINUTE'");
		alasql("SELECT DAY(NOW()) AS 'DAY'");
		alasql("SELECT DAYOFWEEK(NOW()) AS 'DAYOFWEEK'");
		alasql("SELECT MONTH(NOW()) AS 'MONTH'");
		alasql("SELECT YEAR(NOW()) AS 'YEAR'");
	});

	it('1e. DATE is _not_ a reserved keyword', function () {
		// Should not throw, use of Date is ambigious in AlaSQL and thus _not_ validated in the parser
		// `SELECT DATE(NOW()) AS DATE` -> as column alias
		// `CREATE TABLE one (d Date)` -> as column type
		// `INSERT INTO one VALUES (new Date(2014,6,1))` -> as JS Date object
		alasql('SELECT DATE("20081012") AS date');
		alasql("SELECT DATE('20081012') AS 'date'");
		alasql('SELECT DATE("20081012") AS `date`');
		alasql("SELECT DATE('20081012') AS 'DATE'");
		alasql("CREATE TABLE one (d Date)");
		alasql("INSERT INTO one VALUES (new Date(2014,6,1))");
		assert.equal(114, alasql('SELECT d FROM one')[0].d.getYear());
	});

	it('1f. DATE_ADD works with IntervalLiteral', function () {
		// Should not throw
		alasql('SELECT DATE_ADD(NOW(), 10) AS a')

		// Verify it added 10 days to 20081012
		assert.equal(22, alasql('SELECT DATE_ADD(DATE("20081012"), INTERVAL 10 DAY) AS a')[0].a.getDate());
		assert.equal(22, alasql('SELECT ADDDATE(DATE("20081012"), INTERVAL 10 DAY) AS a')[0].a.getDate());

		// Verify it subtracted 10 days from 20081012
		assert.equal(2, alasql('SELECT DATE_SUB(DATE("20081012"), INTERVAL 10 DAY) AS a')[0].a.getDate());
		assert.equal(2, alasql('SELECT SUBDATE(DATE("20081012"), INTERVAL 10 DAY) AS a')[0].a.getDate());
	});
});
