//
// tselect01.js
// Test for select
//

// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 113 - SELECT ', () => {
	test('prepare database', done => {
		alasql('create database test113');
		alasql('use database test113');
		//	alasql('show database');
		//	alasql.use('test113');
		//	console.log(alasql.currentDatabase.databaseid);
		// Prepare data for test

		alasql.tables.students = {
			data: [
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
			],
		};

		alasql.tables.courses = {
			data: [
				{courseid: 1, coursename: 'first', schoolid: 1},
				{courseid: 2, coursename: 'second', schoolid: 1},
				{courseid: 3, coursename: 'third', schoolid: 2},
				{courseid: 4, coursename: 'fourth', schoolid: 2},
				{courseid: 5, coursename: 'fifth', schoolid: 2},
			],
		};

		alasql.tables.schools = {
			data: [
				{schoolid: 1, schoolname: 'Northern School', regionid: 'north'},
				{schoolid: 2, schoolname: 'Southern School', regionid: 'south'},
				{schoolid: 3, schoolname: 'Eastern School', regionid: 'east'},
				{schoolid: 4, schoolname: 'Western School', regionid: 'west'},
			],
		};

		//	console.log(Object.keys(alasql.tables));
		done();
	});

	//	console.log(Object.keys(alasql.currentDatabase.sqlcache).length);
	test('Select COUNT(*) on cross-join', done => {
		expect(25).toEqual(alasql('select value count(*) from courses, students'));
		done();
	});

	//	console.log(alasql.tables.students.data.length);
	//	console.log(Object.keys(alasql.currentDatabase.sqlcache));

	//	console.log(Object.keys(alasql.currentDatabase.sqlcache).length);

	test('Select COUNT(*) on right-join', done => {
		var res = alasql.exec(
			'SELECT courses.courseid, COUNT(students.studentid) AS cnt \
			FROM students \
			RIGHT JOIN courses USING courseid \
			GROUP BY courses.courseid \
			ORDER BY courseid'
		);
		//		console.log(res);
		expect(res).toEqual([
			{courseid: 1, cnt: 1},
			{courseid: 2, cnt: 2},
			{courseid: 3, cnt: 0},
			{courseid: 4, cnt: 1},
			{courseid: 5, cnt: 0},
		]);
		done();
	});

	test('Select on two left-join', done => {
		var res = alasql.exec(
			'SELECT * ' +
				' FROM students ' +
				' LEFT JOIN courses ON students.courseid = courses.courseid AND students.schoolid = courses.schoolid' +
				' LEFT JOIN schools ON students.schoolid = schools.schoolid ' +
				' GROUP BY schoolid, courseid, studentname ' +
				' ORDER BY studentname DESC'
		);
		//		console.table(res);
		expect(5).toEqual(res.length);
		expect(2).toEqual(res[4].schoolid);
		done();
	});

	test('Select on one inner-join/1', done => {
		var res = alasql.exec(
			'SELECT students.schoolid ' + ' FROM students ' + ' JOIN courses USING courseid'
		);
		expect(4).toEqual(res.length);
		done();
	});

	test('Select on one inner-join/2', done => {
		var res = alasql(
			'SELECT students.schoolid ' + ' FROM students ' + ' INNER JOIN courses USING courseid'
		);

		expect(4).toEqual(res.length);
		done();
	});

	test('Select on one left-join', done => {
		var res = alasql(
			'SELECT students.schoolid ' + ' FROM students ' + ' LEFT JOIN courses USING courseid'
		);

		expect(5).toEqual(res.length);
		done();
	});

	test('Select on one right-join', done => {
		var res = alasql(
			'SELECT students.schoolid ' + ' FROM students ' + ' RIGHT JOIN courses USING courseid'
		);

		expect(6).toEqual(res.length);
		alasql('drop database test113');
		done();
	});
});
