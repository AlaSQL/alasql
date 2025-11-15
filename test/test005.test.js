// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 05 - DELETE', () => {
	test('DELETE WHERE ', () => {
		alasql('create database test05;use test05');
		alasql('DROP TABLE IF EXISTS schools');
		var sql1 = 'CREATE TABLE IF NOT EXISTS schools (schoolid INT, schoolname STRING)';
		var sql2 = "INSERT INTO schools (schoolid, schoolname) VALUES (1,'Northern Pacific School')";
		var sql3 = "INSERT INTO schools (schoolid, schoolname) VALUES (2,'Western Atlantic School')";
		var sql4 = "INSERT INTO schools (schoolid, schoolname) VALUES (3,'East Arctic School')";
		var sql5 = "INSERT INTO schools (schoolid, schoolname) VALUES (4,'South Indian School')";
		var sql6 = 'DELETE FROM schools WHERE schoolid = 1 OR schoolid = 3';
		var sql7 = 'SELECT * FROM schools ORDER BY schoolid DESC';

		alasql(sql1);
		alasql(sql2);
		alasql(sql3);
		alasql(sql4);
		alasql(sql5);
		alasql(sql6);
		var res = alasql(sql7);
		expect(4).toEqual(res[0].schoolid);
		expect(2).toEqual(res[1].schoolid);
		alasql('drop database test05');
	});
});
