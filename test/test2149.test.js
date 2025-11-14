// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import {execSync, spawn} from 'child_process';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test CLI - Command Line Interface)', function () {
	//console.log(__dirname);
	const cliPath = path.join(__dirname, '..', 'bin', 'alasql-cli.js');
	const testSqlFile = path.join(__dirname, 'temp-test.sql');
	const testWithTxtFile = path.join(__dirname, 'test2149-with-txt.sql');
	const testWithoutTxtFile = path.join(__dirname, 'test2149-without-txt.sql');

	beforeAll(function () {
		// Create a temporary SQL file for testing
		fs.writeFileSync(testSqlFile, 'SELECT VALUE 42');
	});

	afterAll(function () {
		// Clean up temporary files
		if (fs.existsSync(testSqlFile)) {
			fs.unlinkSync(testSqlFile);
		}
	});

	test('1. Should execute simple SQL statement', function () {
		const result = execSync(`node "${cliPath}" "SELECT VALUE 42"`).toString().trim();
		assert.strictEqual(result, '42');
	});

	test('2. Should handle parameters', function () {
		const result = execSync(`node "${cliPath}" "SELECT VALUE ?" 100`).toString().trim();
		assert.strictEqual(result, '100');
	});

	test('3. Should execute SQL from file', function () {
		const result = execSync(`node "${cliPath}" -f "${testSqlFile}"`).toString().trim();
		assert.strictEqual(result, '42');
	});

	test('4. Should output minified JSON with -m flag', function () {
		const result = execSync(`node "${cliPath}" -m "SELECT {a:1,b:2} as obj"`).toString().trim();
		assert.strictEqual(result, '[{"obj":{"a":1,"b":2}}]');
	});

	test('5. Should show version with -v flag', function () {
		const result = execSync(`node "${cliPath}" -v`).toString().trim();
		assert.match(result, /^\d+\.\d+\.\d+/);
	});

	test('6. Should output AST with --ast flag', function () {
		const result = execSync(`node "${cliPath}" --ast "SELECT 1"`).toString().trim();
		const ast = JSON.parse(result);
		assert.strictEqual(ast.statements[0].columns[0].value, 1);
	});

	test('7. Should handle file not found error', function () {
		try {
			execSync(`node "${cliPath}" -f "nonexistent.sql"`, {stdio: 'pipe'});
			assert.fail('Should have thrown an error');
		} catch (error) {
			assert.match(error.stderr.toString(), /Error: file not found/);
		}
	});

	test('8. Should handle piped input data with txt() function - Issue #2149', function () {
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

	test('9. Should handle piped input data without txt() function - backward compatibility', function () {
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

	test('10. Should handle redirected file input with txt() function', function () {
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

	test('11. Should handle file with txt() function and piped data - Issue #2149', function () {
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

	test('12. Should handle file without txt() function normally', function () {
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

	test('13. Should handle piped input to file without txt() function - should be ignored', function () {
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

	test('14. Should handle complex SQL with txt() and piped data', function () {
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

	test('15. Should handle empty SQL error', function () {
		try {
			execSync(`node "${cliPath}" ""`, {stdio: 'pipe'});
			assert.fail('Should have thrown an error');
		} catch (error) {
			assert.match(error.stderr.toString(), /No SQL to process/);
		}
	});
});
