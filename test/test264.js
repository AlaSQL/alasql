if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	describe('Test 264 SELECT RECORDSET', function () {
		it('1. Test', function (done) {
			var data = [
				{a: 1, b: 10},
				{b: 2, a: 45},
			];
			var res = alasql('SELECT RECORDSET * FROM ?', [data]);
			/// console.log(res);
			//    assert.deepEqual(res,[ { 'MAX(MAX(a),MIN(a))': 8, 'MIN(MAX(a),MIN(a))': 1 } ]);
			done();
		});
	});
}
