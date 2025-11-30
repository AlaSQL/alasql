// Performance test for issue #1027 - Direct data loading scenario
// This simulates the user's scenario of loading JSON data directly

console.log('=== Performance Test #1027 - Direct data loading ===\n');

var alasql = require('../../..');

// Create database and tables
alasql('CREATE DATABASE test1027direct');
alasql('USE test1027direct');

console.log('Setting up tables...');
alasql('CREATE TABLE companies (id INT PRIMARY KEY, name STRING)');
alasql('CREATE TABLE departments (id INT PRIMARY KEY, name STRING, company_id INT)');
alasql('CREATE TABLE users (id INT PRIMARY KEY, name STRING, department_id INT)');

// Create indices BEFORE loading data (as user might do)
alasql('CREATE INDEX idx_users_dept ON users(department_id)');
alasql('CREATE INDEX idx_dept_company ON departments(company_id)');

console.log('Loading data directly via table.data.push() (simulating JSON load)...');
var startLoad = Date.now();

var db = alasql.databases.test1027direct;
var companies = db.tables.companies;
var departments = db.tables.departments;
var users = db.tables.users;

// Generate data
var numCompanies = 10;
var numDepartments = 100;
var numUsers = 1000;

for (var i = 1; i <= numCompanies; i++) {
	companies.data.push({id: i, name: 'Company ' + i});
}

for (var i = 1; i <= numDepartments; i++) {
	var companyId = ((i - 1) % numCompanies) + 1;
	departments.data.push({id: i, name: 'Department ' + i, company_id: companyId});
}

for (var i = 1; i <= numUsers; i++) {
	var deptId = ((i - 1) % numDepartments) + 1;
	users.data.push({id: i, name: 'User ' + i, department_id: deptId});
}

var loadTime = Date.now() - startLoad;
console.log('Data loaded in ' + loadTime + 'ms');
console.log('  Companies: ' + numCompanies);
console.log('  Departments: ' + numDepartments);
console.log('  Users: ' + numUsers);

// Check if indices were populated (they won't be with direct loading)
var userIndexDef = users.inddefs['idx_users_dept'];
var userIndexData = users.indices[userIndexDef.hh];
var deptIndexDef = departments.inddefs['idx_dept_company'];
var deptIndexData = departments.indices[deptIndexDef.hh];

console.log('\nIndex status after direct data loading:');
console.log('  Index idx_users_dept has ' + Object.keys(userIndexData).length + ' keys');
console.log('  Index idx_dept_company has ' + Object.keys(deptIndexData).length + ' keys');
console.log('  Note: Indices are empty because direct data loading bypasses INSERT logic');

// Run query - this will trigger on-the-fly index creation
var query = `
	SELECT u.name as user_name, d.name as dept_name, c.name as company_name
	FROM users u
	INNER JOIN departments d ON u.department_id = d.id
	INNER JOIN companies c ON d.company_id = c.id
	WHERE c.id = 5
`;

console.log('\nRunning first query (will create indices on-the-fly)...');
var startQuery = Date.now();
var result = alasql(query);
var firstQueryTime = Date.now() - startQuery;
console.log('  First query time: ' + firstQueryTime + 'ms');
console.log('  Results: ' + result.length);

// Run again to test cached indices
console.log('\nRunning second query (using cached indices)...');
startQuery = Date.now();
result = alasql(query);
var secondQueryTime = Date.now() - startQuery;
console.log('  Second query time: ' + secondQueryTime + 'ms');
console.log('  Results: ' + result.length);

// Run multiple iterations for average
var iterations = 50;
var totalTime = 0;
for (var i = 0; i < iterations; i++) {
	startQuery = Date.now();
	alasql(query);
	totalTime += Date.now() - startQuery;
}
var avgTime = totalTime / iterations;

console.log('\nPerformance results (50 iterations):');
console.log('  Average query time: ' + avgTime.toFixed(2) + 'ms');

console.log('\nNote: With direct data loading, the first query is slower because indices');
console.log('      are built on-the-fly. Subsequent queries use cached indices.');

// Cleanup
alasql('DROP DATABASE test1027direct');

console.log('\n=== Test complete ===');
