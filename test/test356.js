if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 356 PIVOT', function() {
	it.skip('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test356;USE test356');
		done();
	});

	/* Source: http://sqlfiddle.com/#!3/6f4a1/3 */
	it.skip('2. Prepare Data', function(done) {
		alasql(function() {
			/*
      create table test
      (
        username varchar(10),
        subject varchar(10),
        score int
      )
  */
		});

		alasql(function() {
			/*
    insert into test values
      ('Nick', 'Chinese', 80),
      ('Nick', 'Math', 90),
      ('Nick', 'English', 70),
      ('Nick', 'Biology', 85),
      ('Kent', 'Chinese', 80),
      ('Kent', 'Math', 90),
      ('Kent', 'English', 70),
      ('Kent', 'Biology', 85)
  */
		});

		done();
	});

	if (false) {
		it.skip('3. Select Query', function(done) {
			var cols = alasql('COLUMN OF SELECT DISTINCT subject from test');

			alasql(function() {
				/*
      SELECT username,' + @cols + ' from 
         (
            select username, subject, score
            from test
         ) x
         pivot 
         (
            avg(score)
            for subject in(' + @cols + ')
         ) p '  
*/
			});

			done();
		});
	}

	it.skip('3. Select Query', function(done) {
		alasql(function() {
			/*
      SELECT Score FROM Scores
      GROUP BY Name
      PIVOT BY Class
    */
		});
		done();
	});

	it.skip('4. Select Query', function(done) {
		alasql(function() {
			/*
      SELECT Name FROM Scores
      GROUP BY Score
      PIVOT BY Class
    */
		});
		done();
	});

	it.skip('5. Select Query', function(done) {
		alasql(function() {
			/*
      SELECT Class FROM Scores
      GROUP BY Name
      PIVOT BY Score
    */
		});
		done();
	});

	it.skip('6. Select Query', function(done) {
		alasql(function() {
			/*
      SELECT Score FROM Scores
      GROUP BY Class
      PIVOT BY Name
    */
		});
		done();
	});

	it.skip('7. Select Query', function(done) {
		alasql(function() {
			/*
      SELECT Class FROM Scores
      GROUP BY Score
      PIVOT BY Name
    */
		});
		done();
	});

	it.skip('99. DROP DATABASE', function(done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test355');
		done();
	});
});
