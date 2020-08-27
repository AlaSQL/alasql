if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var _ = require('lodash');
} else {
	__dirname = '.';
}

describe('Test 287 SET NOCOUNT OFF/ON', function () {
	it('1. CREATE TABLE and FIRST INSERT', function (done) {
		alasql('CREATE DATABASE test287;USE test287');
		done();
	});

	it('2. SET', function (done) {
		assert(!alasql.options.nocount);
		var res = alasql('SET NOCOUNT ON');
		assert(alasql.options.nocount);
		var res = alasql('SET NOCOUNT OFF');
		assert(!alasql.options.nocount);
		done();
	});

	it('3. CREATE TABLE', function (done) {
		alasql('SET NOCOUNT OFF');
		var res = alasql('CREATE TABLE one');
		assert(res == 1);
		alasql('SET NOCOUNT ON');
		var res = alasql('CREATE TABLE two');
		assert(typeof res == 'undefined');
		done();
	});

	it('4. INSERT', function (done) {
		alasql('SET NOCOUNT OFF');
		var res = alasql('INSERT INTO one VALUES {a:1},{a:2}');
		assert(res == 2);
		alasql('SET NOCOUNT ON');
		var res = alasql('INSERT INTO two VALUES {b:10},{b:20}');
		assert(typeof res == 'undefined');
		done();
	});
	// TODO: Add other operators

	it('3. DROP DATABASE', function (done) {
		alasql.options.nocount = false;

		var res = alasql('DROP DATABASE test287');
		done();
	});
});
