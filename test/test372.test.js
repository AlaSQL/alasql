// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 372', () => {
	test('should have a new result after insert', () => {
		var db = new alasql.Database();
		db.exec('create table someNames (name string)');
		db.exec('create table otherNames (name string)');

		expect(
			db.exec('select * from otherNames join someNames on someNames.name = otherNames.name').length
		).toEqual(0);

		db.exec('insert into someNames values ("Lars"), ("Erik")');
		db.exec('insert into otherNames values ("Lars"), ("Erik")');

		expect(
			db.exec('select * from otherNames join someNames on someNames.name = otherNames.name').length
		).toEqual(2);
	});
});
