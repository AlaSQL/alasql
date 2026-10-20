if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 361 IN (SELECT)', function () {
	before(function () {
		alasql('CREATE DATABASE test361;USE test361');
	});

	after(function () {
		alasql('DROP DATABASE test361');
	});

	it('1. Can be passed', function (done) {
		//    var res = alasql('select 1 where 1 in (select 1)');
		var res = alasql('recordset of select 1 in (select 1)');
		var res = alasql('=1 in (select 1)');
		var res = alasql('select 1 where 1 in (select 1)');
		//    console.log(res);
		//    var res = alasql('select 2 where true');
		//    console.log(1,res);
		done();
	});

	it.skip('2. Gives correct results', function (done) {
		var res = alasql('recordset of select 1 in (select 1)');
		assert.equal(res, 1234);

		var res = alasql('=1 in (select 1)');
		assert.equal(res, 1234);

		var res = alasql('select 1 where 1 in (select 1)');
		assert.equal(res, 1234);

		done();
	});
});
