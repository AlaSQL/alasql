// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 59 - Other operators', function () {
	test('CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE mybase');
		assert(alasql.databases.mybase instanceof alasql.Database);
		done();
	});

	test('USE DATABASE', function (done) {
		alasql('USE DATABASE mybase');
		assert.equal(alasql.useid, 'mybase');
		done();
	});

	test('DROP current DATABASE', function (done) {
		alasql('DROP DATABASE mybase');
		assert(!alasql.databases.mybase);
		assert(alasql.useid == 'alasql');
		done();
	});
	test('DROP non-current DATABASE', function (done) {
		alasql('CREATE DATABASE mybase');
		alasql('USE DATABASE mybase');
		assert(alasql.useid == 'mybase');
		alasql('USE DATABASE alasql');
		alasql('DROP DATABASE mybase');
		assert(!alasql.databases.mybase);
		assert(alasql.useid == 'alasql');
		done();
	});

	test('CREATE DATABASE if exists', function (done) {
		alasql('CREATE DATABASE mybase');
		assert.throws(function () {
			alasql('CREATE DATABASE mybase');
		}, Error);
		done();
	});

	test('DROP DATABASE if not exists', function (done) {
		alasql('DROP DATABASE mybase');
		assert.throws(function () {
			alasql('DROP DATABASE mybase');
		}, Error);
		done();
	});
});
