// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 02', () => {
	test('Create table', () => {
		alasql('create database test02; use test02;');
		alasql('DROP TABLE IF EXISTS schools');
		alasql('CREATE TABLE schools (schoolid INT, schoolname STRING)');
		expect(alasql.databases.test02.tables.schools.columns.length).toEqual(2);
		alasql('drop database test02');
	});
});
