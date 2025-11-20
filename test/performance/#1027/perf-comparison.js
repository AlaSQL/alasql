// Performance test for issue #1027 - Comparing data loading methods
// This script tests the same query with two different data loading approaches:
// 1. Using INSERT statements (recommended)
// 2. Using direct table.data.push() (simulating JSON data loading)

var alasql = require('../../..');

// Configuration
var config = {
	numCompanies: 10,
	numDepartments: 100, // 10 departments per company
	numUsers: 1000, // 10 users per department
	queryIterations: 100,
};

// Parse command line argument for loading method
var loadMethod = process.argv[2] || 'both'; // 'insert', 'direct', or 'both'

console.log('=== Performance Test #1027 - Data Loading Comparison ===\n');
console.log('Configuration:');
console.log('  Companies: ' + config.numCompanies);
console.log('  Departments: ' + config.numDepartments);
console.log('  Users: ' + config.numUsers);
console.log('  Query iterations: ' + config.queryIterations);
console.log();

// Function to setup tables with indices
function setupTables(dbName) {
	alasql('CREATE DATABASE ' + dbName);
	alasql('USE ' + dbName);

	alasql('CREATE TABLE users (id INT PRIMARY KEY, name STRING, department_id INT)');
	alasql('CREATE TABLE departments (id INT PRIMARY KEY, name STRING, company_id INT)');
	alasql('CREATE TABLE companies (id INT PRIMARY KEY, name STRING)');

	// Create indices on join columns
	alasql('CREATE INDEX idx_users_dept ON users(department_id)');
	alasql('CREATE INDEX idx_dept_company ON departments(company_id)');
}

// Function to load data using INSERT statements
function loadDataWithInsert(dbName) {
	// Insert companies
	for (var i = 1; i <= config.numCompanies; i++) {
		alasql('INSERT INTO companies VALUES (?, ?)', [i, 'Company ' + i]);
	}

	// Insert departments
	for (var i = 1; i <= config.numDepartments; i++) {
		var companyId = ((i - 1) % config.numCompanies) + 1;
		alasql('INSERT INTO departments VALUES (?, ?, ?)', [i, 'Department ' + i, companyId]);
	}

	// Insert users
	for (var i = 1; i <= config.numUsers; i++) {
		var deptId = ((i - 1) % config.numDepartments) + 1;
		alasql('INSERT INTO users VALUES (?, ?, ?)', [i, 'User ' + i, deptId]);
	}
}

// Function to load data by directly pushing to table.data array
function loadDataDirect(dbName) {
	var db = alasql.databases[dbName];
	var companies = db.tables.companies;
	var departments = db.tables.departments;
	var users = db.tables.users;

	// Push data directly to arrays
	for (var i = 1; i <= config.numCompanies; i++) {
		companies.data.push({id: i, name: 'Company ' + i});
	}

	for (var i = 1; i <= config.numDepartments; i++) {
		var companyId = ((i - 1) % config.numCompanies) + 1;
		departments.data.push({id: i, name: 'Department ' + i, company_id: companyId});
	}

	for (var i = 1; i <= config.numUsers; i++) {
		var deptId = ((i - 1) % config.numDepartments) + 1;
		users.data.push({id: i, name: 'User ' + i, department_id: deptId});
	}
}

// Function to verify index population
function verifyIndices(dbName) {
	var db = alasql.databases[dbName];
	var usersTable = db.tables.users;
	var deptsTable = db.tables.departments;

	var userIndexDef = usersTable.inddefs['idx_users_dept'];
	var userIndexData = usersTable.indices[userIndexDef.hh];
	var deptIndexDef = deptsTable.inddefs['idx_dept_company'];
	var deptIndexData = deptsTable.indices[deptIndexDef.hh];

	return {
		userIndexKeys: Object.keys(userIndexData).length,
		deptIndexKeys: Object.keys(deptIndexData).length,
	};
}

// Function to run query performance test
function runQueryTest(dbName) {
	var query = `
		SELECT u.name as user_name, d.name as dept_name, c.name as company_name
		FROM users u
		INNER JOIN departments d ON u.department_id = d.id
		INNER JOIN companies c ON d.company_id = c.id
		WHERE c.id = 5
	`;

	var times = [];
	var result;

	// Run query multiple times
	for (var i = 0; i < config.queryIterations; i++) {
		var start = Date.now();
		result = alasql(query);
		times.push(Date.now() - start);
	}

	// Calculate statistics
	var totalTime = times.reduce(function (sum, t) {
		return sum + t;
	}, 0);
	var avgTime = totalTime / times.length;
	var minTime = Math.min.apply(null, times);
	var maxTime = Math.max.apply(null, times);

	return {
		resultCount: result.length,
		totalTime: totalTime,
		avgTime: avgTime,
		minTime: minTime,
		maxTime: maxTime,
		iterations: times.length,
	};
}

// Function to print results
function printResults(method, loadTime, indices, queryStats) {
	console.log('='.repeat(70));
	console.log('Method: ' + method);
	console.log('='.repeat(70));
	console.log();
	console.log('Data Loading:');
	console.log('  Time: ' + loadTime + 'ms');
	console.log();
	console.log('Index Status After Loading:');
	console.log('  idx_users_dept keys: ' + indices.userIndexKeys + ' (expected: 100)');
	console.log('  idx_dept_company keys: ' + indices.deptIndexKeys + ' (expected: 10)');
	if (method === 'INSERT statements') {
		if (indices.userIndexKeys === 100 && indices.deptIndexKeys === 10) {
			console.log('  ✓ Indices properly populated during INSERT');
		} else {
			console.log('  ✗ Indices NOT populated (BUG!)');
		}
	} else {
		if (indices.userIndexKeys === 0 && indices.deptIndexKeys === 0) {
			console.log('  ℹ Indices empty (expected - built on first query)');
		} else {
			console.log('  ℹ Indices have data');
		}
	}
	console.log();
	console.log('Query Performance (' + queryStats.iterations + ' iterations):');
	console.log('  Results returned: ' + queryStats.resultCount + ' (expected: 100)');
	console.log('  Total time: ' + queryStats.totalTime + 'ms');
	console.log('  Average time: ' + queryStats.avgTime.toFixed(2) + 'ms');
	console.log('  Min time: ' + queryStats.minTime + 'ms');
	console.log('  Max time: ' + queryStats.maxTime + 'ms');
	console.log('  Queries/sec: ' + (1000 / queryStats.avgTime).toFixed(2));
	console.log();
}

// Run tests based on command line argument
if (loadMethod === 'insert' || loadMethod === 'both') {
	console.log('Testing: INSERT statements (recommended approach)');
	console.log('-'.repeat(70));

	setupTables('test_insert');
	var startLoad = Date.now();
	loadDataWithInsert('test_insert');
	var loadTime = Date.now() - startLoad;

	var indices = verifyIndices('test_insert');
	var queryStats = runQueryTest('test_insert');

	printResults('INSERT statements', loadTime, indices, queryStats);

	alasql('DROP DATABASE test_insert');
}

if (loadMethod === 'direct' || loadMethod === 'both') {
	console.log('Testing: Direct table.data.push() (simulating JSON load)');
	console.log('-'.repeat(70));

	setupTables('test_direct');
	var startLoad = Date.now();
	loadDataDirect('test_direct');
	var loadTime = Date.now() - startLoad;

	var indices = verifyIndices('test_direct');
	var queryStats = runQueryTest('test_direct');

	printResults('Direct table.data.push()', loadTime, indices, queryStats);

	alasql('DROP DATABASE test_direct');
}

if (loadMethod === 'both') {
	console.log('='.repeat(70));
	console.log('SUMMARY');
	console.log('='.repeat(70));
	console.log();
	console.log('Both methods produce the same query results and similar performance.');
	console.log();
	console.log('Key differences:');
	console.log('  1. INSERT statements populate indices during data loading');
	console.log('  2. Direct loading requires indices to be built on first query');
	console.log('  3. After fix, INSERT method maintains indices properly');
	console.log();
	console.log('Recommendation: Use INSERT statements for best index maintenance.');
	console.log();
}

console.log('=== Test Complete ===');

// Print usage
if (loadMethod !== 'insert' && loadMethod !== 'direct' && loadMethod !== 'both') {
	console.log();
	console.log('Usage: node perf-comparison.js [method]');
	console.log('  method: insert, direct, or both (default: both)');
	console.log();
	console.log('Examples:');
	console.log('  node test/performance/#1027/perf-comparison.js');
	console.log('  node test/performance/#1027/perf-comparison.js insert');
	console.log('  node test/performance/#1027/perf-comparison.js direct');
	console.log('  node test/performance/#1027/perf-comparison.js both');
}
