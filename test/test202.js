if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 202 GETTIME and CAST', function () {
	it('1a. GETDATE() as String', function (done) {
		var res = alasql('SELECT ROW NOW(),GETDATE()');
		//        console.log(res);
		assert(res[0].substr(0, 20) === res[1].substr(0, 20));
		done();
	});

	it('1b. GETDATE() as Date', function (done) {
		alasql.options.dateAsString = false;
		var res = alasql('SELECT ROW NOW(),GETDATE()');
		//        console.log(res);
		assert(res[0] instanceof Date);
		assert(res[1] instanceof Date);
		assert(res[1].toISOString() === res[0].toISOString());
		done();
	});

	it('2. CONVERT(,,110) as String', function (done) {
		var res = alasql('SELECT VALUE CONVERT(NVARCHAR(10),GETDATE(),110)');
		//        console.log(res);
		assert(res.substr(-4) == new Date().getFullYear());
		//        assert(res[0].substr(0,20)==res[1].substr(0,20));
		done();
	});
});
