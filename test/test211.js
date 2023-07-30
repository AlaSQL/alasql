if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

if (typeof exports != 'object') {
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

	var schoolsData = [
		{schoolid: 1, schoolname: 'Northern School', regionid: 'north'},
		{schoolid: 2, schoolname: 'Southern School', regionid: 'south'},
		{schoolid: 3, schoolname: 'Eastern School', regionid: 'east'},
		{schoolid: 4, schoolname: 'Western School', regionid: 'west'},
	];

	describe('Test211: webworker test', function () {
		describe('Init test', function () {
			it('1. Run worker', function (done) {
				alasql.worker();
				assert(!!alasql.webworker);
				done();
			});
		});

		describe('Database with columns', function () {
			it('2. Create database A and tables with columns ', function (done) {
				alasql(
					'CREATE DATABASE test211a;\
			USE test211a;\
			\
			CREATE TABLE students (\
				studentid INT, \
				studentname STRING, \
				courseid INT, \
				schoolid INT, \
				startdate DATE, \
				amt MONEY \
			); \
			SELECT * INTO students FROM ?;\
			\
			CREATE TABLE courses ( \
				couseid INT, \
				coursename STRING, \
				schoolid INT\
			); \
			SELECT * INTO courses FROM ?; \
			\
			CREATE TABLE schools ( \
				schoolid INT, \
				schoolname STRING, \
				regionid INT\
			); \
			SELECT * INTO schools FROM ?',
					[studentsData, coursesData, schoolsData],
					function (res) {
						assert.deepEqual(res, [1, 1, 1, 5, 1, 5, 1, 4]);
						done();
					}
				);
			});

			it('3. COUNT', function (done) {
				alasql(
					'SELECT courseid, COUNT(*) AS cnt ' +
						' FROM students RIGHT JOIN courses USING courseid GROUP BY courses.courseid ORDER BY courseid',
					[],
					function (res) {
						assert.deepEqual(res, [
							{courseid: 1, cnt: 1},
							{courseid: 2, cnt: 2},
							{courseid: 3, cnt: 1},
							{courseid: 4, cnt: 1},
							{courseid: 5, cnt: 1},
						]);
						done();
					}
				);
			});
			it('4. LEFT JOIN ON ', function (done) {
				alasql(
					'SELECT * ' +
						' FROM students ' +
						' LEFT JOIN courses ON students.courseid = courses.courseid AND students.schoolid = courses.schoolid' +
						' LEFT JOIN schools ON students.schoolid = schools.schoolid ' +
						' GROUP BY students.schools, students.courseid, students.studentname',
					[],
					function (res) {
						assert.equal(res[4].studentname, 'Astrid Carlson');
						done();
					}
				);
			});
			it('5. LEFT JOIN', function (done) {
				alasql(
					'SELECT COLUMN students.schoolid ' +
						' FROM students ' +
						' LEFT JOIN courses USING courseid',
					[],
					function (res) {
						assert.deepEqual([1, 1, 1, 2, 1], res);
						done();
					}
				);
			});
			it('6. VALUE', function (done) {
				alasql('SELECT VALUE COUNT(*) FROM courses, students', [], function (res) {
					assert.equal(25, res);
					done();
				});
			});
		});
		describe('Database without columns', function () {
			it('7. Create database B and tables without columns', function (done) {
				alasql(
					'CREATE DATABASE test211b;\
			USE test211b;\
			\
			CREATE TABLE students; \
			SELECT * INTO students FROM ?;\
			\
			CREATE TABLE courses;\
			SELECT * INTO courses FROM ?; \
			\
			CREATE TABLE schools; \
			SELECT * INTO schools FROM ?',
					[studentsData, coursesData, schoolsData],
					function (res) {
						assert.deepEqual(res, [1, 1, 1, 5, 1, 5, 1, 4]);
						done();
					}
				);
			});
			it('3. COUNT', function (done) {
				alasql(
					'SELECT courseid, COUNT(*) AS cnt ' +
						' FROM students RIGHT JOIN courses USING courseid GROUP BY courses.courseid ORDER BY courseid',
					[],
					function (res) {
						assert.deepEqual(res, [
							{courseid: 1, cnt: 1},
							{courseid: 2, cnt: 2},
							{courseid: 3, cnt: 1},
							{courseid: 4, cnt: 1},
							{courseid: 5, cnt: 1},
						]);
						done();
					}
				);
			});
			it('4. LEFT JOIN ON ', function (done) {
				alasql(
					'SELECT * ' +
						' FROM students ' +
						' LEFT JOIN courses ON students.courseid = courses.courseid AND students.schoolid = courses.schoolid' +
						' LEFT JOIN schools ON students.schoolid = schools.schoolid ' +
						' GROUP BY students.schools, students.courseid, students.studentname',
					[],
					function (res) {
						assert.equal(res[4].studentname, 'Astrid Carlson');
						done();
					}
				);
			});
			it('5. LEFT JOIN', function (done) {
				alasql(
					'SELECT COLUMN students.schoolid ' +
						' FROM students ' +
						' LEFT JOIN courses USING courseid',
					[],
					function (res) {
						assert.deepEqual([1, 1, 1, 2, 1], res);
						done();
					}
				);
			});
			it('6. VALUE', function (done) {
				alasql('SELECT VALUE COUNT(*) FROM courses, students', [], function (res) {
					assert.equal(25, res);
					done();
				});
			});
		});
		describe('Drop databases', function () {
			it('Select 99: queryValue', function (done) {
				alasql('DROP DATABASE test211a; DROP DATABASE test211b', [], function () {
					alasql.worker(false);
					assert(!alasql.webworker);
					done();
				});
			});
		});
	});
}

//	alasql('create database test01');
//	alasql('use test01');

// if(!defined) {

/*
	// } else {
function prepareData (defined) {

		alasql('DROP TABLE IF EXISTS students; \
			CREATE TABLE students (\
				studentid INT, \
				studentname STRING, \
				courseid INT, \
				schoolid INT, \
				startdate DATE, \
				amt MONEY \
			); \
			SELECT * INTO students FROM ?;',[studentsData]);

		// alasql.tables.students = new alasql.Table ({
		// 	data:studentsData,
		// 	columns:[
		// 		{columnid: 'studentid', dbtypeid:'INT'}, 
		// 		{columnid: 'studentname', dbtypeid: 'STRING'}, 
		// 		{columnid: 'courseid'},
		// 		{columnid: 'schoolid'},
		// 		{columnid: 'startdate', dbtypeid: 'DATE'},
		// 		{columnid: 'amt', dbtypeid: 'MONEY'}
		// 	]
		// });

		// alasql.tables.students.indexColumns();

		alasql('DROP TABLE IF EXISTS courses; \
			CREATE TABLE courses ( \
				couseid INT, \
				coursename STRING, \
				schoolid INT\
			); \
			SELECT * INTO courses FROM ?;',[coursesData]);

		// alasql.tables.courses = new alasql.Table({
		// 	data: coursesData,
		// 	columns: [
		// 		{columnid: 'courseid', dbtypeid:'INT'}, 
		// 		{columnid: 'coursename', dbtypeid: 'STRING'}, 
		// 		{columnid: 'schoolid'},
		// 	]
		// });

		// alasql.tables.courses.indexColumns();

		alasql('DROP TABLE IF EXISTS schools; \
			CREATE TABLE schools ( \
				schoolid INT, \
				schoolname STRING, \
				regionid INT\
			); \
			SELECT * INTO schools FROM ?;',[schoolsData]);

		// alasql.tables.schools = new alasql.Table ({
		// 	data: schoolsData,
		// 	columns: [
		// 		{columnid: 'schoolid', dbtypeid:'INT'}, 
		// 		{columnid: 'schoolname', dbtypeid: 'STRING'}, 
		// 		{columnid: 'regionid'},
		// 	]
		// });

		// alasql.tables.schools.indexColumns('schools');
};


	
	function doTests() {
		it('Select 1.1: COUNT', function(done){
		 	alasql('SELECT courseid, COUNT(*) AS cnt '+
		 		' FROM students RIGHT JOIN courses USING courseid GROUP BY courses.courseid ORDER BY courseid',[],function(res){
		 		assert.deepEqual([ 
		 		{ courseid: 1, cnt: 1 },
				{ courseid: 2, cnt: 2 },
				{ courseid: 3, cnt: 1 },
				{ courseid: 4, cnt: 1 },
				{ courseid: 5, cnt: 1 } ], res);
		 		done();
		 	});
		});
		it('Select 1.2: LEFT JOIN ON ', function(done){
			var res = alasql('SELECT * '+
				' FROM students '+
				' LEFT JOIN courses ON students.courseid = courses.courseid AND students.schoolid = courses.schoolid'+
				' LEFT JOIN schools ON students.schoolid = schools.schoolid '+
				' GROUP BY students.schools, students.courseid, students.studentname' );
			assert.equal(res[4].studentname,'Astrid Carlson');
			done();
		});
		it('Select 1.3: LEFT JOIN', function(done){
			var res = alasql('SELECT COLUMN students.schoolid '+
				' FROM students '+
				' LEFT JOIN courses USING courseid'
			);
			assert.deepEqual([1,1,1,2,1], res);
			done();
		});
		it('Select 1.4: queryValue', function(done){
			var res = alasql('SELECT VALUE COUNT(*) FROM courses, students');
			assert.equal(25,res);
			done();
		});
//		alasql('drop database test01');
	};


describe('Test 211: Multiple test', function() {

//	describe('2. Columns are not provided', function() {
		alasql('DROP TABLE IF EXISTS students; \
			CREATE TABLE students; \
			SELECT * INTO students FROM ?; \
			DROP TABLE IF EXISTS courses; \
			CREATE TABLE courses; \
			SELECT * INTO courses FROM ?; \
			DROP TABLE IF EXISTS schools; \
			CREATE TABLE schools; \
			SELECT * INTO schools FROM ?',[studentsData,coursesData,schoolsData],function(res){
/// console.log(res);
				doTests();
			});

//		prepareData(false);
//	});

	// describe('1. Columns provided', function() {

	// 	prepareData(true);
	// 	doTests();
	// });


// 	describe('99. Clean code', function() {
// 		alasql.worker(false);
// 	});
});
*/
