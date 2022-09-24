if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 357 Test', function() {
	it.skip('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test357;USE test357');
		done();
	});

	/* Source: http://sqlfiddle.com/#!3/6f4a1/3 */
	it.skip('2. Prepare Data', function(done) {
		alasql(function() {
			/*

      CREATE TABLE users( id int, name char(16) ) ; 
      INSERT INTO users VALUES (1,'John'),(2,'Lewis'),(3,'Muhammad'); 
      CREATE TABLE hobbies( id int, title char(16) ) ; 
      INSERT INTO hobbies  
      VALUES (1,'Sports'),(2,'Computing'),(3,'Drinking'),(4,'Racing'),(5,'Swimming'),(6,'Photography'); 
      CREATE TABLE users_hobbies( user_id int, hobby_id int ) ; 
      INSERT INTO users_hobbies  
      VALUES (1,2),(1,3),(1,6),(2,1),(2,5),(2,6),(3,2),(3,5),(3,6),(1,2),(1,3),(1,6),(2,1), 
      (2,5),(2,6),(3,2),(3,5),(3,6),(1,2),(1,3),(1,6),(2,1),(2,5),(2,6),(3,2),(3,5),(3,6); 

  */
		});

		done();
	});

	it.skip('3. Select Query', function(done) {
		alasql(function() {
			/*
    SELECT a.user_id, b.user_id, GROUP_CONCAT(a.hobby_id) AS 'Pairwise shared hobbies' 
    FROM users_hobbies a 
    JOIN users_hobbies b ON a.user_id<b.user_id AND a.hobby_id=b.hobby_id 
    GROUP BY a.user_id,b.user_id;
*/
		});

		done();
	});

	it.skip('99. DROP DATABASE', function(done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test357');
		done();
	});
});
