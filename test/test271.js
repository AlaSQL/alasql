if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 271 RECORDSET and Excel tests', function () {
	// missing in lodash 4
	var pluck = function (arr, key) {
		return arr.map(function (e) {
			return e[key];
		});
	};

	it('1. Open Excel and columns', function (done) {
		var res = alasql(
			'SELECT RECORDSET * FROM XLSX("' + __dirname + '/test168.xlsx",{headers:true})',
			[],
			function (res) {
				var colres = pluck(res.columns, 'columnid');
				assert.deepEqual(colres, ['City', 'Population']);
				done();
			}
		);
	});
});
