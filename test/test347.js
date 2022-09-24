if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 347 Efficient Joined Queries Issue #245', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test347;USE test347');
		done();
	});

	it('2. TEST', function(done) {
		var res = alasql(function() {
			/*
      CREATE TABLE students (
        id serial NOT NULL,
        name character varying(50) NOT NULL,
        CONSTRAINT students_pkey PRIMARY KEY (id)
      );

      INSERT INTO students VALUES
        (1 , 'John Doe'),
        (2 , 'Larry Loe');

      CREATE TABLE assignments (
        id serial NOT NULL,
        class_id integer NOT NULL,
        name character varying(50),
        [value] integer NOT NULL,
        CONSTRAINT assignments_pkey PRIMARY KEY (id)
      );

      INSERT INTO assignments VALUES
        (1 , 1 , 'Homework'    , 10),
        (2 , 1 , 'Test'        , 100),
        (3 , 2 , 'Art Project' , 30),
        (4 , 1 , 'HW 2'        , 10),
        (5 , 1 , 'HW 3'        , 10);


      CREATE TABLE scores (
        id serial NOT NULL,
        assignment_id integer NOT NULL,
        student_id integer NOT NULL,
        score integer NOT NULL,
        CONSTRAINT scores_pkey PRIMARY KEY (id)
      );

      INSERT INTO scores VALUES
        (1 , 1 , 1 , 10),
        (2 , 1 , 2 , 8),
        (3 , 2 , 1 , 70),
        (4 , 2 , 2 , 82),
        (5 , 3 , 1 , 15),
        (8 , 5 , 1 , 10);
      */
		});
		done();
	});

	it('3. TEST', function(done) {
		var res = alasql(
			function() {
				/*
      SELECT
        students.name AS student_name,
        students.id AS student_id,
        assignments.name,
        assignments.value,
        scores.score
      FROM
        scores
      INNER JOIN assignments ON
        (assignments.id = scores.assignment_id)
      INNER JOIN students ON
        (students.id = scores.student_id)
      WHERE
        assignments.class_id = $0;

    */
			},
			[2]
		);
		/// console.log(res);
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test347');
		done();
	});
});
