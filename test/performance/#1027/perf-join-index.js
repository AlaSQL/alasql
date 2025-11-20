// Performance test for issue #1027 - Join performance with indices
// This is a plain JS script (not mocha) that measures query performance

console.log('=== Performance Test #1027 - Join performance with indices ===\n');

var alasql = require('../../..');

// Create database and tables
alasql('CREATE DATABASE test1027perf');
alasql('USE test1027perf');

console.log('Setting up tables with indices...');
alasql('CREATE TABLE users (id INT PRIMARY KEY, name STRING, department_id INT)');
alasql('CREATE TABLE departments (id INT PRIMARY KEY, name STRING, company_id INT)');
alasql('CREATE TABLE companies (id INT PRIMARY KEY, name STRING)');

// Create indices on join columns
alasql('CREATE INDEX idx_users_dept ON users(department_id)');
alasql('CREATE INDEX idx_dept_company ON departments(company_id)');

console.log('Loading data...');
var startLoad = Date.now();

// Generate test data
var numCompanies = 10;
var numDepartments = 100; // 10 departments per company
var numUsers = 1000; // 10 users per department

// Insert companies
for (var i = 1; i <= numCompanies; i++) {
	alasql('INSERT INTO companies VALUES (?, ?)', [i, 'Company ' + i]);
}

// Insert departments
for (var i = 1; i <= numDepartments; i++) {
	var companyId = ((i - 1) % numCompanies) + 1;
	alasql('INSERT INTO departments VALUES (?, ?, ?)', [i, 'Department ' + i, companyId]);
}

// Insert users
for (var i = 1; i <= numUsers; i++) {
	var deptId = ((i - 1) % numDepartments) + 1;
	alasql('INSERT INTO users VALUES (?, ?, ?)', [i, 'User ' + i, deptId]);
}

var loadTime = Date.now() - startLoad;
console.log('Data loaded in ' + loadTime + 'ms');
console.log('  Companies: ' + numCompanies);
console.log('  Departments: ' + numDepartments);
console.log('  Users: ' + numUsers);

// Verify indices were populated
var db = alasql.databases.test1027perf;
var usersTable = db.tables.users;
var deptsTable = db.tables.departments;

var userIndexDef = usersTable.inddefs['idx_users_dept'];
var userIndexData = usersTable.indices[userIndexDef.hh];
var deptIndexDef = deptsTable.inddefs['idx_dept_company'];
var deptIndexData = deptsTable.indices[deptIndexDef.hh];

console.log('\nIndex verification:');
console.log(
	'  Index idx_users_dept has ' + Object.keys(userIndexData).length + ' keys (expected 100)'
);
console.log(
	'  Index idx_dept_company has ' + Object.keys(deptIndexData).length + ' keys (expected 10)'
);

// Run query with joins multiple times to get average
var query = `
	SELECT u.name as user_name, d.name as dept_name, c.name as company_name
	FROM users u
	INNER JOIN departments d ON u.department_id = d.id
	INNER JOIN companies c ON d.company_id = c.id
	WHERE c.id = 5
`;

var iterations = 100;
var totalTime = 0;

console.log('\nRunning query ' + iterations + ' times...');
for (var i = 0; i < iterations; i++) {
	var startQuery = Date.now();
	var result = alasql(query);
	totalTime += Date.now() - startQuery;

	// Verify result on first iteration
	if (i === 0) {
		console.log('  First query returned ' + result.length + ' results (expected 100)');
	}
}

var avgTime = totalTime / iterations;
console.log('\nPerformance results:');
console.log('  Total time: ' + totalTime + 'ms');
console.log('  Average query time: ' + avgTime.toFixed(2) + 'ms');
console.log('  Queries per second: ' + (1000 / avgTime).toFixed(2));

if (avgTime < 10) {
	console.log('\n✓ PASS - Query performance is excellent (< 10ms average)');
} else if (avgTime < 100) {
	console.log('\n✓ PASS - Query performance is good (< 100ms average)');
} else {
	console.log('\n✗ FAIL - Query performance is poor (>= 100ms average)');
	console.log('  This suggests indices may not be working properly');
}

// Cleanup
alasql('DROP DATABASE test1027perf');

console.log('\n=== Test complete ===');
