// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

var testId = 605;

describe('Test ' + testId + ' - get autoval', () => {
	beforeAll(() => {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	afterAll(() => {
		alasql('drop database test' + testId);
	});

	test('A) get autoval from default alasql object', () => {
		alasql('CREATE TABLE session (id INT AUTOINCREMENT, sessid STRING)');
		alasql('INSERT INTO session (sessid) VALUES ("TEST")');

		expect(alasql.autoval('session', 'id')).toEqual(1);
		expect(alasql.autoval('session', 'id', true)).toEqual(2);

		alasql('INSERT INTO session (sessid) VALUES ("TEST"), ("TEST")');
		expect(alasql.autoval('session', 'id')).toEqual(3);
		expect(alasql.autoval('session', 'id', true)).toEqual(4);
	});

	test('B) get autoval from new database', () => {
		//
		var mydb = new alasql.Database('My Database');
		mydb.exec('CREATE TABLE session (id INT AUTOINCREMENT, sessid STRING)');
		mydb.exec('INSERT INTO session (sessid) VALUES ("TEST"), ("TEST")');
		expect(mydb.autoval('session', 'id')).toEqual(2);
		expect(mydb.autoval('session', 'id', true)).toEqual(3);
	});
});
