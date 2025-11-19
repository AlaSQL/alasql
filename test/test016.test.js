// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 16', () => {
	test('Grouping', () => {
		alasql('create database test16a');
		alasql('use test16a');
		alasql(
			'create table students (studentid int, studentname string, courseid int, startdate date, amt money, schoolid int)'
		);

		alasql.databases.test16a.tables.students.data = [
			{
				studentid: 58,
				studentname: 'Sarah Patrik',
				courseid: 1,
				startdate: new Date(2014, 0, 10),
				amt: 10,
				schoolid: 1,
			},
			{
				studentid: 102,
				studentname: 'John Stewart',
				courseid: 2,
				startdate: new Date(2014, 0, 20),
				amt: 20,
				schoolid: 1,
			},
			{
				studentid: 103,
				studentname: 'Joan Blackmore',
				courseid: 2,
				startdate: new Date(2014, 0, 20),
				amt: 20,
				schoolid: 1,
			},
			{
				studentid: 104,
				studentname: 'Anna Wooden',
				courseid: 4,
				startdate: new Date(2014, 0, 15),
				amt: 30,
				schoolid: 2,
			},
			{
				studentid: 150,
				studentname: 'Astrid Carlson',
				courseid: 7,
				startdate: new Date(2014, 0, 15),
				amt: 30,
				schoolid: 1,
			},
		];

		alasql('create table courses (courseid int, coursename string, schoolid int)');
		alasql.databases.test16a.tables.courses.data = [
			{courseid: 1, coursename: 'first', schoolid: 1},
			{courseid: 2, coursename: 'second', schoolid: 1},
			{courseid: 3, coursename: 'third', schoolid: 2},
			{courseid: 4, coursename: 'fourth', schoolid: 2},
			{courseid: 5, coursename: 'fifth', schoolid: 2},
		];
		alasql('create table schools (schoolid int, schoolname string, regionid int)');

		alasql.databases.test16a.tables.schools.data = [
			{schoolid: 1, schoolname: 'Northern School', regionid: 'north'},
			{schoolid: 2, schoolname: 'Southern School', regionid: 'south'},
			{schoolid: 3, schoolname: 'Eastern School', regionid: 'east'},
			{schoolid: 4, schoolname: 'Western School', regionid: 'west'},
		];

		var res = alasql(
			'SELECT students.schoolid, students.courseid, students.studentname ' +
				' FROM students ' +
				' LEFT JOIN courses ON students.courseid = courses.courseid AND students.schoolid = courses.schoolid' +
				' LEFT JOIN schools ON courses.schoolid = schools.schoolid ' +
				' GROUP BY students.schoolid, students.courseid, studentname ' +
				' ORDER BY studentname DESC'
		);
		//if(typeof window === 'object') console.log(res);
		//else console.table(res);
		//console.table(res);
		expect(res.length).toEqual(5);
		expect(res[0].courseid).toEqual(1);
		expect(res[1].courseid).toEqual(2);
		expect(res[2].courseid).toEqual(2);
		expect(res[3].courseid).toEqual(7);
		expect(res[4].courseid).toEqual(4);

		alasql('drop database test16a');
	});
});
