// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

var testId = 605;

describe('Test ' + testId + ' - get autoval', function () {
	beforeAll(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	afterAll(function () {
		alasql('drop database test' + testId);
	});

	test('A) get autoval from default alasql object', function () {
		alasql('CREATE TABLE session (id INT AUTOINCREMENT, sessid STRING)');
		alasql('INSERT INTO session (sessid) VALUES ("TEST")');

		assert.equal(alasql.autoval('session', 'id'), 1);
		assert.equal(alasql.autoval('session', 'id', true), 2);

		alasql('INSERT INTO session (sessid) VALUES ("TEST"), ("TEST")');
		assert.equal(alasql.autoval('session', 'id'), 3);
		assert.equal(alasql.autoval('session', 'id', true), 4);
	});

	test('B) get autoval from new database', function () {
		//
		var mydb = new alasql.Database('My Database');
		mydb.exec('CREATE TABLE session (id INT AUTOINCREMENT, sessid STRING)');
		mydb.exec('INSERT INTO session (sessid) VALUES ("TEST"), ("TEST")');
		assert.equal(mydb.autoval('session', 'id'), 2);
		assert.equal(mydb.autoval('session', 'id', true), 3);
	});
});
