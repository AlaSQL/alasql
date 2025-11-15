// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import {execSync, spawn} from 'child_process';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test CLI - Command Line Interface)', () => {
	//console.log(__dirname);
	const cliPath = path.join(__dirname, '..', 'bin', 'alasql-cli.js');
	const testSqlFile = path.join(__dirname, 'temp-test.sql');
	const testWithTxtFile = path.join(__dirname, 'test2149-with-txt.sql');
	const testWithoutTxtFile = path.join(__dirname, 'test2149-without-txt.sql');

	beforeAll(() => {
		// Create a temporary SQL file for testing
		fs.writeFileSync(testSqlFile, 'SELECT VALUE 42');
	});

	afterAll(() => {
		// Clean up temporary files
		if (fs.existsSync(testSqlFile)) {
			fs.unlinkSync(testSqlFile);
		}
	});

	test('1. Should execute simple SQL statement', () => {
		const result = execSync(`node "${cliPath}" "SELECT VALUE 42"`).toString().trim();
		expect(result).toBe('42');
	});

	test('2. Should handle parameters', () => {
		const result = execSync(`node "${cliPath}" "SELECT VALUE ?" 100`).toString().trim();
		expect(result).toBe('100');
	});

	test('3. Should execute SQL from file', () => {
		const result = execSync(`node "${cliPath}" -f "${testSqlFile}"`).toString().trim();
		expect(result).toBe('42');
	});

	test('4. Should output minified JSON with -m flag', () => {
		const result = execSync(`node "${cliPath}" -m "SELECT {a:1,b:2} as obj"`).toString().trim();
		expect(result).toBe('[{"obj":{"a":1,"b":2}}]');
	});

	test('5. Should show version with -v flag', () => {
		const result = execSync(`node "${cliPath}" -v`).toString().trim();
		expect(result).toMatch(/^\d+\.\d+\.\d+/);
	});

	test('6. Should output AST with --ast flag', () => {
		const result = execSync(`node "${cliPath}" --ast "SELECT 1"`).toString().trim();
		const ast = JSON.parse(result);
		expect(ast.statements[0].columns[0].value).toBe(1);
	});

	test('7. Should handle file not found error', () => {
		try {
			execSync(`node "${cliPath}" -f "nonexistent.sql"`, {stdio: 'pipe'});
			throw new Error('Should have thrown an error');
		} catch (error) {
			expect(error.stderr.toString()).toMatch(/Error: file not found/);
		}
	});

	test('8. Should handle piped input data with txt() function - Issue #2149', () => {
		const result = execSync(
			`echo "hello" | node "${cliPath}" "SELECT COUNT(*) > 0 as Success FROM txt()"`
		).toString();
		expect(JSON.parse(result)).toEqual([
			{
				Success: true,
			},
		]);
	});

	test('9. Should handle piped input data without txt() function - backward compatibility', () => {
		const result = execSync(`echo "SELECT 1 as Success" | node "${cliPath}"`).toString();
		expect(JSON.parse(result)).toEqual([
			{
				Success: 1,
			},
		]);
	});

	test('10. Should handle redirected file input with txt() function', () => {
		const result = execSync(
			`node "${cliPath}" "SELECT COUNT(*) > 0 as Success FROM txt()" < ${testSqlFile}`
		).toString();
		expect(JSON.parse(result)).toEqual([
			{
				Success: true,
			},
		]);
	});

	test('11. Should handle file with txt() function and piped data - Issue #2149', () => {
		const result = execSync(
			`echo "hello world" | node "${cliPath}" -f "${testWithTxtFile}"`
		).toString();
		expect(JSON.parse(result)).toEqual([
			{
				Success: true,
			},
		]);
	});

	test('12. Should handle file without txt() function normally', () => {
		const result = execSync(`node "${cliPath}" -f "${testWithoutTxtFile}"`).toString();
		expect(JSON.parse(result)).toEqual([
			{
				Success: 1,
			},
		]);
	});

	test('13. Should handle piped input to file without txt() function - should be ignored', () => {
		const result = execSync(
			`echo "this should be ignored" | node "${cliPath}" -f "${testWithoutTxtFile}"`
		).toString();
		expect(JSON.parse(result)).toEqual([
			{
				Success: 1,
			},
		]);
	});

	test('14. Should handle complex SQL with txt() and piped data', () => {
		const result = execSync(
			`echo -e "line1\nline2\nline3" | node "${cliPath}" "SELECT COUNT(*) as LineCount FROM txt()"`
		).toString();
		expect(JSON.parse(result)).toEqual([
			{
				LineCount: 3,
			},
		]);
	});

	test('15. Should handle empty SQL error', () => {
		try {
			execSync(`node "${cliPath}" ""`, {stdio: 'pipe'});
			throw new Error('Should have thrown an error');
		} catch (error) {
			expect(error.stderr.toString()).toMatch(/No SQL to process/);
		}
	});
});
