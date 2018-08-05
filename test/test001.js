if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

function prepareData(defined) {
	//	alasql('create database test01');
	//	alasql('use test01');

	var studentsData = [
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
			studentid: 102,
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
			studentid: 104,
			studentname: 'Astrid Carlson',
			courseid: 7,
			startdate: new Date(2014, 0, 15),
			amt: 30,
			schoolid: 1,
		},
	];

	var coursesData = [
		{courseid: 1, coursename: 'first', schoolid: 1},
		{courseid: 2, coursename: 'second', schoolid: 1},
		{courseid: 3, coursename: 'third', schoolid: 2},
		{courseid: 4, coursename: 'fourth', schoolid: 2},
		{courseid: 5, coursename: 'fifth', schoolid: 2},
	];

	var schoolData = [
		{schoolid: 1, schoolname: 'Northern School', regionid: 'north'},
		{schoolid: 2, schoolname: 'Southern School', regionid: 'south'},
		{schoolid: 3, schoolname: 'Eastern School', regionid: 'east'},
		{schoolid: 4, schoolname: 'Western School', regionid: 'west'},
	];

	if (!defined) {
		alasql.tables.students = {
			data: studentsData,
		};

		alasql.tables.courses = {
			data: coursesData,
		};

		alasql.tables.schools = {
			data: schoolData,
		};
	} else {
		alasql.tables.students = new alasql.Table({
			data: studentsData,
			columns: [
				{columnid: 'studentid', dbtypeid: 'INT'},
				{columnid: 'studentname', dbtypeid: 'STRING'},
				{columnid: 'courseid'},
				{columnid: 'schoolid'},
				{columnid: 'startdate', dbtypeid: 'DATE'},
				{columnid: 'amt', dbtypeid: 'MONEY'},
			],
		});

		alasql.tables.students.indexColumns();

		alasql.tables.courses = new alasql.Table({
			data: coursesData,
			columns: [
				{columnid: 'courseid', dbtypeid: 'INT'},
				{columnid: 'coursename', dbtypeid: 'STRING'},
				{columnid: 'schoolid'},
			],
		});

		alasql.tables.courses.indexColumns();

		alasql.tables.schools = new alasql.Table({
			data: schoolData,
			columns: [
				{columnid: 'schoolid', dbtypeid: 'INT'},
				{columnid: 'schoolname', dbtypeid: 'STRING'},
				{columnid: 'regionid'},
			],
		});

		alasql.tables.schools.indexColumns('schools');
	}
}

function doTests() {
	it('Select 1.1: COUNT', function(done) {
		var res = alasql(
			'SELECT courses.courseid, COUNT(*) AS cnt ' +
				' FROM students RIGHT JOIN courses USING courseid GROUP BY courses.courseid ORDER BY courseid'
		);
		assert.deepEqual(
			[
				{courseid: 1, cnt: 1},
				{courseid: 2, cnt: 2},
				{courseid: 3, cnt: 1},
				{courseid: 4, cnt: 1},
				{courseid: 5, cnt: 1},
			],
			res
		);
		done();
	});
	it('Select 1.2: LEFT JOIN ON ', function(done) {
		var res = alasql(
			'SELECT * ' +
				' FROM students ' +
				' LEFT JOIN courses ON students.courseid = courses.courseid AND students.schoolid = courses.schoolid' +
				' LEFT JOIN schools ON students.schoolid = schools.schoolid ' +
				' GROUP BY students.schoolid, students.courseid, students.studentname'
		);
		//			console.log(res);
		assert.equal(res[4].studentname, 'Astrid Carlson');
		done();
	});
	it('Select 1.3: LEFT JOIN', function(done) {
		var res = alasql(
			'SELECT COLUMN students.schoolid ' +
				' FROM students ' +
				' LEFT JOIN courses USING courseid'
		);
		assert.deepEqual([1, 1, 1, 2, 1], res);
		done();
	});
	it('Select 1.4: queryValue', function(done) {
		var res = alasql('SELECT VALUE COUNT(*) FROM courses, students');
		assert.equal(25, res);
		done();
	});
	//		alasql('drop database test01');
}

describe('Test 001', function() {
	describe('Columns provided', function() {
		prepareData(true);
		doTests();
	});

	describe('Columns are not provided', function() {
		prepareData(false);
		doTests();
	});
});
