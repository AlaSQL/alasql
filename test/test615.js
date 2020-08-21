if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '615'; // insert test file number

describe('Test ' + test + ' - Read empty and non-empty excel files', function () {
	it('A) Load empty excel file', function (done) {
		alasql('SELECT * FROM XLSX("' + __dirname + '/test615.xlsx")', [], function (res) {
			assert.equal(res.length, 0);
			done();
		});
	});

	it('B) Load non-empty excel file', function (done) {
		alasql('SELECT * FROM XLSX("' + __dirname + '/test614.xlsx")', [], function (res) {
			var dataPresent = res.length > 0;
			assert.ok(dataPresent);
			done();
		});
	});
});
