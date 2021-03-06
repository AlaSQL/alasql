if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 202 GETTIME and CAST', function () {
	it('1. GETDATE()', function (done) {
		var res = alasql('SELECT ROW NOW(),GETDATE()');
		//        console.log(res);
		assert(res[0].substr(0, 20) == res[1].substr(0, 20));
		done();
	});

	it('2. CONVERT(,,110)', function (done) {
		var res = alasql('SELECT VALUE CONVERT(NVARCHAR(10),GETDATE(),110)');
		//        console.log(res);
		assert(res.substr(-4) == new Date().getFullYear());
		//        assert(res[0].substr(0,20)==res[1].substr(0,20));
		done();
	});
});
