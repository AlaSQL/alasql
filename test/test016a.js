if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

if (false) {
	describe('Test 16b', function() {
		it('Grouping', function(done) {
			alasql('create database test16;use test16');

			alasql.tables.students = new alasql.Table({
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
			});

			alasql.tables.courses = new alasql.Table({
				data: [
					{courseid: 1, coursename: 'first', schoolid: 1},
					{courseid: 2, coursename: 'second', schoolid: 1},
					{courseid: 3, coursename: 'third', schoolid: 2},
					{courseid: 4, coursename: 'fourth', schoolid: 2},
					{courseid: 5, coursename: 'fifth', schoolid: 2},
				],
			});

			alasql.tables.schools = new alasql.Table({
				data: [
					{schoolid: 1, schoolname: 'Northern School', regionid: 'north'},
					{schoolid: 2, schoolname: 'Southern School', regionid: 'south'},
					{schoolid: 3, schoolname: 'Eastern School', regionid: 'east'},
					{schoolid: 4, schoolname: 'Western School', regionid: 'west'},
				],
			});

			var res = alasql.exec(
				'SELECT * ' +
					' FROM students ' +
					' LEFT JOIN courses ON students.courseid = courses.courseid AND students.schoolid = courses.schoolid' +
					' LEFT JOIN schools ON students.schoolid = schools.schoolid ' +
					' GROUP BY schoolid, courseid, studentname ' +
					' ORDER BY studentname DESC'
			);
			/// console.log(res);
			assert.equal(5, res.length);
			assert.equal(1, res[0].courseid);
			assert.equal(2, res[1].courseid);
			assert.equal(2, res[2].courseid);
			assert.equal(7, res[3].courseid);
			assert.equal(4, res[4].courseid);

			alasql('drop database test16');
			done();
		});
	});
}
