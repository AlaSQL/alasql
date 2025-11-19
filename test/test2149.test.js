// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (!process.env.ALASQL_TEST_SKIP_EXTERNAL)
	describe.concurrent('Test CLI A', () => {
		//console.log(__dirname);
		const cliPath = path.join(__dirname, '..', 'bin', 'alasql-cli.js');
		const testSqlFile = path.join(__dirname, 'temp-test.sql');

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

		test('1. Should execute simple SQL statement', async () => {
			const result = (await Bun.$`bun "${cliPath}" "SELECT VALUE 42"`.text()).trim();
			expect(result).toBe('42');
		});

		test('2. Should handle parameters', async () => {
			const result = (await Bun.$`bun "${cliPath}" "SELECT VALUE ?" 100`.text()).trim();
			expect(result).toBe('100');
		});

		test('3. Should execute SQL from file', async () => {
			const result = (await Bun.$`bun "${cliPath}" -f "${testSqlFile}"`.text()).trim();
			expect(result).toBe('42');
		});

		test('4. Should output minified JSON with -m flag', async () => {
			const result = (await Bun.$`bun "${cliPath}" -m "SELECT {a:1,b:2} as obj"`.text()).trim();
			expect(result).toBe('[{"obj":{"a":1,"b":2}}]');
		});

		test('5. Should show version with -v flag', async () => {
			const result = (await Bun.$`bun "${cliPath}" -v`.text()).trim();
			expect(result).toMatch(/^\d+\.\d+\.\d+/);
		});

		test('6. Should output AST with --ast flag', async () => {
			const result = (await Bun.$`bun "${cliPath}" --ast "SELECT 1"`.text()).trim();
			const ast = JSON.parse(result);
			expect(ast.statements[0].columns[0].value).toBe(1);
		});

		test('7. Should handle file not found error', async () => {
			try {
				await Bun.$`bun "${cliPath}" -f "nonexistent.sql"`.quiet();
				throw new Error('Should have thrown an error');
			} catch (error) {
				expect(error.stderr?.toString() || error.message).toMatch(/Error: file not found/);
			}
		});

		test('8. Should handle piped input data with txt() function - Issue #2149', async () => {
			const result =
				await Bun.$`echo "hello" | bun "${cliPath}" "SELECT COUNT(*) > 0 as Success FROM txt()"`.text();
			expect(JSON.parse(result)).toEqual([
				{
					Success: true,
				},
			]);
		});
	});

if (!process.env.ALASQL_TEST_SKIP_EXTERNAL)
	describe.concurrent('Test CLI B', () => {
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

		test('9. Should handle piped input data without txt() function - backward compatibility', async () => {
			const result = await Bun.$`echo "SELECT 1 as Success" | bun "${cliPath}"`.text();
			expect(JSON.parse(result)).toEqual([
				{
					Success: 1,
				},
			]);
		});

		test('10. Should handle redirected file input with txt() function', async () => {
			const result =
				await Bun.$`bun "${cliPath}" "SELECT COUNT(*) > 0 as Success FROM txt()" < ${testSqlFile}`.text();
			expect(JSON.parse(result)).toEqual([
				{
					Success: true,
				},
			]);
		});

		test('11. Should handle file with txt() function and piped data - Issue #2149', async () => {
			const result =
				await Bun.$`echo "hello world" | bun "${cliPath}" -f "${testWithTxtFile}"`.text();
			expect(JSON.parse(result)).toEqual([
				{
					Success: true,
				},
			]);
		});

		test('12. Should handle file without txt() function normally', async () => {
			const result = await Bun.$`bun "${cliPath}" -f "${testWithoutTxtFile}"`.text();
			expect(JSON.parse(result)).toEqual([
				{
					Success: 1,
				},
			]);
		});

		test('13. Should handle piped input to file without txt() function - should be ignored', async () => {
			const result =
				await Bun.$`echo "this should be ignored" | bun "${cliPath}" -f "${testWithoutTxtFile}"`.text();
			expect(JSON.parse(result)).toEqual([
				{
					Success: 1,
				},
			]);
		});

		test('14. Should handle complex SQL with txt() and piped data', async () => {
			const result =
				await Bun.$`printf "line1\nline2\nline3" | bun "${cliPath}" "SELECT COUNT(*) as LineCount FROM txt()"`.text();
			expect(JSON.parse(result)).toEqual([
				{
					LineCount: 3,
				},
			]);
		});

		test('15. Should handle empty SQL error', async () => {
			try {
				const result = await Bun.$`echo "" | bun "${cliPath}"`.text();
				throw new Error('Should have thrown an error');
			} catch (error) {
				expect(error.stderr?.toString() || error.message).toMatch(/No SQL to process/);
			}
		});
	});
