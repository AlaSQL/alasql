if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 215 DECLARE', function () {
	it('1. DECLARE INT', function (done) {
		alasql('DECLARE @one INT; SET @one = "123.456"');
		var res = alasql('SELECT VALUE @one');
		assert(res === 123);
		done();
	});

	it('2. DECLARE CHAR(N)', function (done) {
		alasql('declare @two char(5); set @two = "abc"');
		//        console.log(alasql.vars.two,alasql.declares.two);
		var res = alasql('SELECT VALUE @two');
		//        console.log(res);
		assert(res == 'abc  ');
		done();
	});

	it('3. DECLARE CHAR(N)', function (done) {
		alasql('declare @three char(5); set @three = "abcdefghijk"');
		var res = alasql('SELECT VALUE @three');
		//        console.log(res);
		assert(res == 'abcde');
		done();
	});

	it('4. DECLARE WITH SET', function (done) {
		alasql('declare @four char(5) = "abcdefghijk"');
		var res = alasql('SELECT VALUE @four');
		//        console.log(res);
		assert(res == 'abcde');
		done();
	});

	it('5. Multiple DECLARE', function (done) {
		alasql('declare @five char(5) = "abcdefghijk", @six int = 123');
		var res = alasql('SELECT ROW @five, @six');
		//        console.log(res);
		assert(res[0] == 'abcde');
		assert(res[1] == 123);
		done();
	});
});
