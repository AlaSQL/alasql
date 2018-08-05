if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 324 Roads samples', function() {
	it.skip('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test324a; USE test324a');
		done();
	});

	it.skip('2. OBJECT_ID()', function(done) {
		alasql('CREATE TABLE dbo.Employees(id INT, name STRING)');
		alasql('INSERT INTO dbo.Employees VALUES (1,"Tomas"),(2,"Lisa")');
		assert.deepEqual(alasql('SELECT * FROM dbo.Employees'), [
			{id: 1, name: 'Tomas'},
			{id: 2, name: 'Lisa'},
		]);
		assert.deepEqual(alasql('SELECT VALUE OBJECT_ID("dbo.Employees")'), 'test324a.Employees');
		var res = alasql(
			'IF OBJECT_ID("dbo.Employees") IS NOT NULL\
      DROP TABLE dbo.Employees;'
		);
		assert(!alasql.databases.dbo.tables.Employees);
		assert.deepEqual(res, 1);
		done();
	});

	it.skip('3. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test324a');
		done();
	});

	it.skip('2. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test324b; USE test324b');
		done();
	});

	it.skip('3. CREATE TABLE with constraints', function(done) {
		var res = alasql(function() {
			/*
      CREATE TABLE dbo.Employees
      (
        empid   INT         NOT NULL PRIMARY KEY,
        mgrid   INT         NULL     REFERENCES dbo.Employees,
        empname VARCHAR(25) NOT NULL,
        salary  MONEY       NOT NULL,
        CHECK (empid <> mgrid)
      );
  */
		});
		assert(res == 1);
		assert(alasql.databases.dbo.tables.Employees);
		done();
	});

	it.skip('4. INSERT INTO table with constraints', function(done) {
		var res = alasql(function() {
			/*
      INSERT INTO dbo.Employees(empid, mgrid, empname, salary) VALUES
        (1,  NULL, 'David'  , 10000.00),
        (2,  1,    'Eitan'  ,  7000.00)
  */
		});
		assert(res == 2);
		assert.deepEqual(alasql('SELECT * FROM dbo.Employees'), [
			{empid: 1, mgrid: undefined, empname: 'David', salary: 10000},
			{empid: 2, mgrid: 1, empname: 'Eitan', salary: 7000},
		]);
		done();
	});

	it.skip('5. INSERT INTO table with same primary key', function(done) {
		assert.throws(function() {
			var res = alasql(function() {
				/*
        INSERT INTO dbo.Employees(empid, mgrid, empname, salary) VALUES
          (1,  NULL, 'David'  , 10000.00),
          (2,  1,    'Eitan'  ,  7000.00)
      */
			});
		}, Error);
		done();
	});

	it.skip('6. INSERT INTO wrong NULL in NOT NULL column', function(done) {
		assert.throws(function() {
			var res = alasql(function() {
				/*
        INSERT INTO dbo.Employees(empid, mgrid, empname, salary) VALUES
          (NULL,  3, 'Samson'  , 45000.00)
      */
			});
		}, Error);
		done();
	});

	it.skip('7. UPDATE wrong NULL in NOT NULL column', function(done) {
		assert.throws(function() {
			var res = alasql('UPDATE dbo.Employees SET empid = NULL WHERE empid = 1');
		}, Error);
		done();
	});

	it.skip('8. UPDATE wrong NULL in NOT NULL column', function(done) {
		var res = alasql('UPDATE dbo.Employees SET mgrid = NULL WHERE empid = 2');
		assert(res == 1);
		done();
	});

	it.skip('9. UPDATE wrong NULL in NOT NULL column', function(done) {
		assert.throws(function() {
			var res = alasql('UPDATE dbo.Employees SET mgrid = 3 WHERE empid = 2');
		}, Error);
		done();
	});

	it.skip('10. INSERT INTO table with constraints violation', function(done) {
		//    console.log(alasql.databases.dbo.tables.Employees);
		assert.throws(function() {
			var res = alasql(
				"INSERT INTO dbo.Employees(empid, mgrid, empname, salary) \
            VALUES (3,  3, 'Samson'  , 45000.00)"
			);
		}, Error);
		//  console.log(res);
		done();
	});

	it.skip('11. INSERT INTO table with constraints violation', function(done) {
		//    console.log(alasql.databases.dbo.tables.Employees);
		var res = alasql(
			"INSERT INTO dbo.Employees(empid, mgrid, empname, salary) \
            VALUES (3,  1, 'Samson'  , 45000.00)"
		);
		assert(res == 1);
		//  console.log(res);
		done();
	});

	it.skip('12. UPDATE wrong NULL in NOT NULL column', function(done) {
		var res = alasql('UPDATE dbo.Employees SET mgrid = 3 WHERE empid = 2');
		assert(res == 1);
		done();
	});

	it.skip('13. UPDATE table with constraints violation', function(done) {
		//    console.log(alasql.databases.dbo.tables.Employees);
		assert.throws(function() {
			var res = alasql('UPDATE dbo.Employees SET mgrid = 1 WHERE empid = 1');
		}, Error);
		//  console.log(res);
		done();
	});

	it.skip('14. CURRENT_TIMESTAMP', function(done) {
		var res = alasql('SELECT VALUE CURRENT_TIMESTAMP');
		assert(res.length == '2015.05.11 07:58:20.078'.length);
		assert(res.substr(0, 2) == '20');
		done();
	});
	it.skip('19. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test324b');
		done();
	});

	it.skip('20. Full example', function(done) {
		alasql('SOURCE "test324.sql"');
		// Check NO COUNT
		alasql.options.nocount = false;
		done();
	});
});
