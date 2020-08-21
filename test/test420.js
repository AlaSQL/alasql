if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #379
*/

var test = 420;

describe('Test ' + test + ' Load data from XLSX without extra line', function () {
	before(function () {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('1. Load XLSX', function (done) {
		alasql('VALUE OF SELECT COUNT(*) FROM XLSX("' + __dirname + '/test420.xlsx")', [], function (
			res
		) {
			assert(res == 4);
			//      console.log(res);
			//       assert.deepEqual(res,
			// 0
			//       );
			done();
		});
	});
});
