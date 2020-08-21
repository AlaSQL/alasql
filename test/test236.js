if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

// Test is based on
// https://msdn.microsoft.com/en-us/library/ms190349.aspx
//
describe('Test 236 MERGE', function () {
	it('1. Prepare database and tables', function (done) {
		alasql('CREATE DATABASE test236; USE test236;');

		var sql = function () {
			/*
            CREATE TABLE [Target](EmployeeID int, EmployeeName varchar(10), 
                 CONSTRAINT Target_PK PRIMARY KEY(EmployeeID));
            CREATE TABLE [Source](EmployeeID int, EmployeeName varchar(10), 
                 CONSTRAINT Source_PK PRIMARY KEY(EmployeeID));

            INSERT [Target](EmployeeID, EmployeeName) VALUES(100, 'Mary');
            INSERT [Target](EmployeeID, EmployeeName) VALUES(101, 'Sara');
            INSERT [Target](EmployeeID, EmployeeName) VALUES(102, 'Stefano');

            INSERT [Source](EmployeeID, EmployeeName) Values(103, 'Bob');
            INSERT [Source](EmployeeID, EmployeeName) Values(104, 'Steve');

        */
		};

		alasql(sql);
		var res = alasql('SELECT * FROM [Target]');
		assert.deepEqual(res, [
			{EmployeeID: 100, EmployeeName: 'Mary'},
			{EmployeeID: 101, EmployeeName: 'Sara'},
			{EmployeeID: 102, EmployeeName: 'Stefano'},
		]);
		//        console.log(res);

		var res = alasql('SELECT * FROM [Source]');
		assert.deepEqual(res, [
			{EmployeeID: 103, EmployeeName: 'Bob'},
			{EmployeeID: 104, EmployeeName: 'Steve'},
		]);
		//        console.log(res);

		done();
	});

	it('2. Merge', function (done) {
		var sql = function () {
			/*

        MERGE [Target] AS T
        USING [Source] AS S
        ON (T.EmployeeID = S.EmployeeID) 
        WHEN NOT MATCHED BY TARGET AND S.EmployeeName LIKE 'S%' 
            THEN INSERT(EmployeeID, EmployeeName) VALUES(S.EmployeeID, S.EmployeeName)
        WHEN MATCHED 
            THEN UPDATE SET T.EmployeeName = S.EmployeeName
        WHEN NOT MATCHED BY SOURCE AND T.EmployeeName LIKE 'S%'
            THEN DELETE

    */
		}
			.toString()
			.slice(14, -3);
		/// console.log(alasql.parse(sql).toString());

		//        console.log(res);
		done();
	});

	it('99. DROP', function (done) {
		alasql('DROP DATABASE test236');
		done();
	});
});
