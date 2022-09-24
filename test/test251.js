if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 251 Overwrite XLSX file', function () {
	if (typeof exports === 'object') {
		it('1. Overwrite', function (done) {
			alasql('SELECT * INTO XLSX("' + __dirname + '/test251.xlsx", {headers:true}) from ?', [
				{a: 1, b: 2},
			]);

			alasql(
				'SELECT HOUR(NOW()), MINUTE(NOW()), SECOND(NOW()) \
        INTO XLSX("' +
					__dirname +
					'/restest251.xlsx",{sourcefilename:"' +
					__dirname +
					'/test251.xlsx", \
          sheetid:"test2", range:"B3"})',
				[],
				function (res) {
					assert(res == 1);
					done();
				}
			);
		});
	}
});
