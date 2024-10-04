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
	});
});
