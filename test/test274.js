if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var _ = require('lodash');
} else {
	__dirname = '.';
}

describe('Test 274 Count and other bugs', function () {
	it('2. Select count', function (done) {
		var res = alasql('SELECT _ AS a FROM RANGE(1,10)');
		/// console.log(res);

		var res = alasql('SELECT * FROM (SELECT _ AS a FROM RANGE(1,10))');
		/// console.log(res);

		var res = alasql('SELECT RECORDSET COUNT(*) FROM RANGE(1,10)');
		/// console.log(res);
		//    var colres = _.pluck(res.columns,'columnid');
		//    assert.deepEqual(colres, ["a","b"]);
		alasql.options.modifier = undefined;
		done();
	});
});
