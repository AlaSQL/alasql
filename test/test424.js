if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #379
*/

var test = 424;

describe('Test ' + test + ' Arrow and DOT', function () {
	before(function () {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('1. DOT outside SELECT', function (done) {
		var res = alasql('={a:10}.a');
		assert(res == 10);
		done();
	});

	it.skip('2. DOT inside SELECT', function (done) {
		var res = alasql('SELECT a.b FROM @[{a:{b:10}}]');
		console.log(res);
		assert.deepEqual(res, [{'a.b': 10}]);
		done();
	});

	it('3. DOT inside SELECT', function (done) {
		alasql('CREATE TABLE a (b INT); INSERT INTO a VALUES (10)');
		var res = alasql('SELECT a.b FROM a');
		assert.deepEqual(res, [{b: 10}]);
		done();
	});

	it('4. DOT inside SELECT', function (done) {
		alasql('CREATE TABLE e (b JSON); INSERT INTO e VALUES ({c:10})');
		var res = alasql('SELECT b->c FROM e');
		assert.deepEqual(res, [{'b->c': 10}]);
		done();
	});

	it.skip('5. DOT inside SELECT', function (done) {
		var res = alasql('SELECT b.c FROM e');
		console.log(res);
		assert.deepEqual(res, [{'b.c': 10}]);
		//    assert(res==10);
		done();
	});
});
