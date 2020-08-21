if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

// Test is based on
// https://msdn.microsoft.com/en-us/library/ms190349.aspx
//
describe('Test 237 Test with local variables', function () {
	it('1. Prepare database and tables', function (done) {
		alasql('CREATE DATABASE test237; USE test237;');

		var res = alasql(function () {
			/*

-- Source: https://technet.microsoft.com/en-us/library/ms187953(v=sql.105).aspx

CREATE TABLE TestTable (cola int, colb char(3));
-- Declare the variable to be used.
DECLARE @MyCounter int;
-- Initialize the variable.
SET @MyCounter = 0;

-- Test the variable to see if the loop is finished.
WHILE (@MyCounter < 26)
BEGIN
   -- Insert a row into the table.
   INSERT INTO TestTable VALUES
       -- Use the variable to provide the integer value
       -- for cola. Also use it to generate a unique letter
       -- for each row. Use the ASCII function to get the
       -- integer value of 'a'. Add @MyCounter. Use CHAR to
       -- convert the sum back to the character @MyCounter
       -- characters after 'a'.
       (@MyCounter,
        CHAR( ( @MyCounter + ASCII('a') ) )
       );
   -- Increment the variable to count this iteration
   -- of the loop.
   SET @MyCounter = @MyCounter + 1;
END;
SELECT cola, colb
FROM TestTable;
DROP TABLE TestTable;

        */
		});

		assert(res[4].length == 26);
		assert.deepEqual(res[4][0], {cola: 0, colb: 'a'});
		// assert.deepEqual(res,[ { EmployeeID: 100, EmployeeName: 'Mary' },
		//     { EmployeeID: 101, EmployeeName: 'Sara' },
		//     { EmployeeID: 102, EmployeeName: 'Stefano' } ]);
		//        console.log(res);

		done();
	});

	it('99. DROP', function (done) {
		alasql('DROP DATABASE test237');
		done();
	});
});
