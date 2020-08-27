if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 59 - Other operators', function () {
	it('CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE mybase');
		assert(alasql.databases.mybase instanceof alasql.Database);
		done();
	});

	it('USE DATABASE', function (done) {
		alasql('USE DATABASE mybase');
		assert.equal(alasql.useid, 'mybase');
		done();
	});

	it('DROP current DATABASE', function (done) {
		alasql('DROP DATABASE mybase');
		assert(!alasql.databases.mybase);
		assert(alasql.useid == 'alasql');
		done();
	});
	it('DROP non-current DATABASE', function (done) {
		alasql('CREATE DATABASE mybase');
		alasql('USE DATABASE mybase');
		assert(alasql.useid == 'mybase');
		alasql('USE DATABASE alasql');
		alasql('DROP DATABASE mybase');
		assert(!alasql.databases.mybase);
		assert(alasql.useid == 'alasql');
		done();
	});

	it('CREATE DATABASE if exists', function (done) {
		alasql('CREATE DATABASE mybase');
		assert.throws(function () {
			alasql('CREATE DATABASE mybase');
		}, Error);
		done();
	});

	it('DROP DATABASE if not exists', function (done) {
		alasql('DROP DATABASE mybase');
		assert.throws(function () {
			alasql('DROP DATABASE mybase');
		}, Error);
		done();
	});
});
