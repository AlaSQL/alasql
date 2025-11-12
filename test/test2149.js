if (typeof exports === 'object') {
	var assert = require('assert');
	var {execSync, spawn} = require('child_process');
	var fs = require('fs');
	var path = require('path');
}

describe('Test CLI - Command Line Interface - Issue #2149 (Pipe handling with txt())', function () {
	console.log(__dirname);
	const cliPath = path.join(__dirname, '..', 'bin', 'alasql-cli.js');
	const testSqlFile = path.join(__dirname, 'temp-test.sql');
	const testWithTxtFile = path.join(__dirname, 'test2149-with-txt.sql');
	const testWithoutTxtFile = path.join(__dirname, 'test2149-without-txt.sql');

	before(function () {
		// Create a temporary SQL file for testing
		fs.writeFileSync(testSqlFile, 'SELECT VALUE 42');
	});

	after(function () {
		// Clean up temporary files
		if (fs.existsSync(testSqlFile)) {
			fs.unlinkSync(testSqlFile);
		}
	});

	it('1. Should execute simple SQL statement', function () {
		const result = execSync(`node "${cliPath}" "SELECT VALUE 42"`).toString().trim();
		assert.strictEqual(result, '42');
	});

	it('2. Should handle parameters', function () {
		const result = execSync(`node "${cliPath}" "SELECT VALUE ?" 100`).toString().trim();
		assert.strictEqual(result, '100');
	});

	it('3. Should execute SQL from file', function () {
		const result = execSync(`node "${cliPath}" -f "${testSqlFile}"`).toString().trim();
		assert.strictEqual(result, '42');
	});

	it('4. Should output minified JSON with -m flag', function () {
		const result = execSync(`node "${cliPath}" -m "SELECT {a:1,b:2} as obj"`).toString().trim();
		assert.strictEqual(result, '[{"obj":{"a":1,"b":2}}]');
	});

	it('5. Should show version with -v flag', function () {
		const result = execSync(`node "${cliPath}" -v`).toString().trim();
		assert.match(result, /^\d+\.\d+\.\d+/);
	});

	it('6. Should output AST with --ast flag', function () {
		const result = execSync(`node "${cliPath}" --ast "SELECT 1"`).toString().trim();
		const ast = JSON.parse(result);
		assert.strictEqual(ast.statements[0].columns[0].value, 1);
	});

	it('7. Should handle file not found error', function () {
		try {
			execSync(`node "${cliPath}" -f "nonexistent.sql"`, {stdio: 'pipe'});
			assert.fail('Should have thrown an error');
		} catch (error) {
			assert.match(error.stderr.toString(), /Error: file not found/);
		}
	});

	it('8. Should handle piped input data with txt() function - Issue #2149', function () {
		const result = execSync(
			`echo "hello" | node "${cliPath}" "SELECT COUNT(*) > 0 as Success FROM txt()"`
		).toString();
		assert.deepEqual(
			[
				{
					Success: true,
				},
			],
			JSON.parse(result)
		);
	});

	it('9. Should handle piped input data without txt() function - backward compatibility', function () {
		const result = execSync(`echo "SELECT 1 as Success" | node "${cliPath}"`).toString();
		assert.deepEqual(
			[
				{
					Success: 1,
				},
			],
			JSON.parse(result)
		);
	});

	it('10. Should handle redirected file input with txt() function', function () {
		const result = execSync(
			`node "${cliPath}" "SELECT COUNT(*) > 0 as Success FROM txt()" < ${testSqlFile}`
		).toString();
		assert.deepEqual(
			[
				{
					Success: true,
				},
			],
			JSON.parse(result)
		);
	});

	it('11. Should handle file with txt() function and piped data - Issue #2149', function () {
		const result = execSync(
			`echo "hello world" | node "${cliPath}" -f "${testWithTxtFile}"`
		).toString();
		assert.deepEqual(
			[
				{
					Success: true,
				},
			],
			JSON.parse(result)
		);
	});

	it('12. Should handle file without txt() function normally', function () {
		const result = execSync(`node "${cliPath}" -f "${testWithoutTxtFile}"`).toString();
		assert.deepEqual(
			[
				{
					Success: 1,
				},
			],
			JSON.parse(result)
		);
	});

	it('13. Should handle piped input to file without txt() function - should be ignored', function () {
		const result = execSync(
			`echo "this should be ignored" | node "${cliPath}" -f "${testWithoutTxtFile}"`
		).toString();
		assert.deepEqual(
			[
				{
					Success: 1,
				},
			],
			JSON.parse(result)
		);
	});

	it('14. Should handle complex SQL with txt() and piped data', function () {
		const result = execSync(
			`echo -e "line1\nline2\nline3" | node "${cliPath}" "SELECT COUNT(*) as LineCount FROM txt()"`
		).toString();
		assert.deepEqual(
			[
				{
					LineCount: 3,
				},
			],
			JSON.parse(result)
		);
	});

	it('15. Should handle empty SQL error', function () {
		try {
			execSync(`node "${cliPath}" ""`, {stdio: 'pipe'});
			assert.fail('Should have thrown an error');
		} catch (error) {
			assert.match(error.stderr.toString(), /No SQL to process/);
		}
	});
});
