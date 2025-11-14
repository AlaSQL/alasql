// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

// Test for issue #566
var testNum = 430;

describe.skip('Test ' + testNum + ' UNIQUE keyword in localStorage', function () {
	beforeAll(function () {
		alasql(
			'CREATE localStorage DATABASE test' +
				testNum +
				'g1; ATTACH localStorage DATABASE test' +
				testNum +
				'g1 as test' +
				testNum +
				'g1'
		);
		alasql('CREATE DATABASE test' + testNum + 'g2');
	});

	afterAll(function () {
		alasql('DETACH DATABASE test' + testNum + 'g1');
		alasql('DROP DATABASE test' + testNum + 'g2');
	});

	test.skip('1. Tests unique keys in localstorage', function (done) {
		alasql('USE test' + testNum + 'g1');
		alasql('CREATE TABLE Test (a STRING, UNIQUE(a))');
		alasql('INSERT INTO Test VALUES (?)', {a: 1});
		assert.throws(function () {
			alasql('INSERT INTO Test VALUES (?)', {a: 1});
		});
		done();
	});

	test('2. Tests unique keys outside of localstorage', function (done) {
		alasql('USE test' + testNum + 'g2');
		alasql('CREATE TABLE Test (a STRING, UNIQUE(a))');
		alasql('INSERT INTO Test VALUES (?)', {a: 1});
		assert.throws(function () {
			alasql('INSERT INTO Test VALUES (?)', {a: 1});
		});
		done();
	});
});
