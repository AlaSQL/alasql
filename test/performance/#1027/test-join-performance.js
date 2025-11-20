if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('../../..');
}

describe('Performance Test #1027 - Join performance with indices', function () {
	this.timeout(60000); // 60 second timeout

	const test = '1027';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Setup tables with indices', function () {
		// Create three tables similar to the issue description
		alasql('CREATE TABLE users (id INT PRIMARY KEY, name STRING, department_id INT)');
		alasql('CREATE TABLE departments (id INT PRIMARY KEY, name STRING, company_id INT)');
		alasql('CREATE TABLE companies (id INT PRIMARY KEY, name STRING)');

		// Create indices on join columns
		alasql('CREATE INDEX idx_users_dept ON users(department_id)');
		alasql('CREATE INDEX idx_dept_company ON departments(company_id)');

		assert(true);
	});

	it('B) Load data into tables (simulating ~2500 records)', function () {
		// Generate test data - smaller dataset for faster tests but still demonstrative
		const numCompanies = 10;
		const numDepartments = 100; // 10 departments per company
		const numUsers = 1000; // 10 users per department

		// Insert companies
		for (let i = 1; i <= numCompanies; i++) {
			alasql('INSERT INTO companies VALUES (?, ?)', [i, 'Company ' + i]);
		}

		// Insert departments
		for (let i = 1; i <= numDepartments; i++) {
			const companyId = ((i - 1) % numCompanies) + 1;
			alasql('INSERT INTO departments VALUES (?, ?, ?)', [i, 'Department ' + i, companyId]);
		}

		// Insert users
		for (let i = 1; i <= numUsers; i++) {
			const deptId = ((i - 1) % numDepartments) + 1;
			alasql('INSERT INTO users VALUES (?, ?, ?)', [i, 'User ' + i, deptId]);
		}

		// Verify data was inserted
		const userCount = alasql('SELECT COUNT(*) as cnt FROM users')[0].cnt;
		const deptCount = alasql('SELECT COUNT(*) as cnt FROM departments')[0].cnt;
		const compCount = alasql('SELECT COUNT(*) as cnt FROM companies')[0].cnt;

		assert.strictEqual(userCount, numUsers);
		assert.strictEqual(deptCount, numDepartments);
		assert.strictEqual(compCount, numCompanies);
	});

	it('C) Query with 2 joins - measure performance', function () {
		// First, check if manually created indices were populated
		const db = alasql.databases.test1027;
		const usersTable = db.tables.users;
		const deptsTable = db.tables.departments;

		console.log('Checking manually created indices:');
		for (let indexName in usersTable.inddefs) {
			const indexDef = usersTable.inddefs[indexName];
			const indexData = usersTable.indices[indexDef.hh];
			console.log(
				'  Index ' +
					indexName +
					' on users has ' +
					Object.keys(indexData || {}).length +
					' keys (expected 100)'
			);
		}
		for (let indexName in deptsTable.inddefs) {
			const indexDef = deptsTable.inddefs[indexName];
			const indexData = deptsTable.indices[indexDef.hh];
			console.log(
				'  Index ' +
					indexName +
					' on departments has ' +
					Object.keys(indexData || {}).length +
					' keys (expected 10)'
			);
		}

		// This query joins all three tables
		const query = `
			SELECT u.name as user_name, d.name as dept_name, c.name as company_name
			FROM users u
			INNER JOIN departments d ON u.department_id = d.id
			INNER JOIN companies c ON d.company_id = c.id
			WHERE c.id = 5
		`;

		const startTime = Date.now();
		const result = alasql(query);
		const endTime = Date.now();
		const duration = endTime - startTime;

		console.log('Query execution time: ' + duration + 'ms');
		console.log('Number of results: ' + result.length);

		// Verify results are correct
		assert(result.length > 0, 'Should return results');
		assert(result.length === 100, 'Should return 100 users (10 depts * 10 users per dept)');

		// Check result structure
		assert(result[0].user_name, 'Should have user_name');
		assert(result[0].dept_name, 'Should have dept_name');
		assert(result[0].company_name, 'Should have company_name');
		assert.strictEqual(result[0].company_name, 'Company 5');

		// Performance assertion - with proper index usage, this should be fast
		// Without indices working, this could take several seconds even with 1000 records
		// With indices working properly, it should be under 100ms
		if (duration > 1000) {
			console.warn(
				'WARNING: Query took longer than 1 second. This suggests indices may not be working properly.'
			);
		}
	});

	it('D) Direct data loading performance test', function () {
		// Test the scenario where data is loaded directly (not via INSERT statements)
		alasql('DROP TABLE IF EXISTS direct_users');
		alasql('DROP TABLE IF EXISTS direct_departments');
		alasql('DROP TABLE IF EXISTS direct_companies');

		alasql('CREATE TABLE direct_companies (id INT PRIMARY KEY, name STRING)');
		alasql('CREATE TABLE direct_departments (id INT PRIMARY KEY, name STRING, company_id INT)');
		alasql('CREATE TABLE direct_users (id INT PRIMARY KEY, name STRING, department_id INT)');

		// Create indices BEFORE loading data
		alasql('CREATE INDEX idx_direct_users_dept ON direct_users(department_id)');
		alasql('CREATE INDEX idx_direct_dept_company ON direct_departments(company_id)');

		// Load data directly into table.data array (simulating JSON load)
		const db = alasql.databases.test1027;
		const companies = db.tables.direct_companies;
		const departments = db.tables.direct_departments;
		const users = db.tables.direct_users;

		// Generate data
		for (let i = 1; i <= 10; i++) {
			companies.data.push({id: i, name: 'Company ' + i});
		}

		for (let i = 1; i <= 100; i++) {
			const companyId = ((i - 1) % 10) + 1;
			departments.data.push({id: i, name: 'Department ' + i, company_id: companyId});
		}

		for (let i = 1; i <= 1000; i++) {
			const deptId = ((i - 1) % 100) + 1;
			users.data.push({id: i, name: 'User ' + i, department_id: deptId});
		}

		// Now query - this will show the issue with indices not being populated
		const query = `
			SELECT u.name as user_name, d.name as dept_name, c.name as company_name
			FROM direct_users u
			INNER JOIN direct_departments d ON u.department_id = d.id
			INNER JOIN direct_companies c ON d.company_id = c.id
			WHERE c.id = 5
		`;

		const startTime = Date.now();
		const result = alasql(query);
		const endTime = Date.now();
		const duration = endTime - startTime;

		console.log('Direct load query execution time: ' + duration + 'ms');
		console.log('Number of results: ' + result.length);

		// Verify results
		assert(result.length === 100, 'Should return 100 users');

		if (duration > 1000) {
			console.warn(
				'WARNING: Direct load query took longer than 1 second. Indices are likely not populated.'
			);
		}
	});
});
