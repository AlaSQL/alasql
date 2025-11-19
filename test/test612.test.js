// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import fs from 'fs';
import alasql from '..';

describe('Test 612 - INTO CSV', () => {
	const testNum = '612'; // insert test file number
	const sql = alasql.promise;

	beforeAll(() => {
		alasql('CREATE DATABASE test' + testNum);
		alasql('CREATE TABLE test612.one (a INT, b VARCHAR)');
		alasql("INSERT INTO test612.one VALUES (10, 'swoll')," + "(11, 'muscles')");
	});

	afterAll(() => {
		alasql('DROP DATABASE test' + testNum);
		fs.unlink('test612-0.csv', function (err) {});
		fs.unlink('test612-1.csv', function (err) {});
		fs.unlink('test612-2.csv', function (err) {});
		fs.unlink('test612-3.csv', function (err) {});
		fs.unlink('test612-4.csv', function (err) {});
	});

	test("With quote = '', single string value", async () => {
		const q = "SELECT 'swing' AS `colname` INTO CSV('test612-0', {quote:''})";
		await sql(q);
		var filecontents = fs.readFileSync('test612-0.csv', 'utf8');
		// must include the BOM at the beginning
		expect(filecontents === '\ufeffcolname\r\nswing\r\n').toBe(true);
	});

	test("With quote = '', single multiword string value", async () => {
		const q = "SELECT 'swing out' AS `colname` INTO CSV('test612-1', {quote:''})";
		await sql(q);
		const filecontents = fs.readFileSync('test612-1.csv', 'utf8');
		// must include the BOM at the beginning
		expect(filecontents === '\ufeffcolname\r\nswing out\r\n').toBe(true);
	});

	test("With quote = '', multiple rows", async () => {
		const q = "SELECT a, b INTO CSV('test612-2', {quote:''}) FROM test612.one";
		await sql(q);
		const filecontents = fs.readFileSync('test612-2.csv', 'utf8');
		// must include the BOM at the beginning
		expect(filecontents === '\ufeffa;b\r\n10;swoll\r\n11;muscles\r\n').toBe(true);
	});

	test("With quote = '\\?', single multiword string value", async () => {
		const q = "SELECT 'swing out' AS `colname` INTO CSV('test612-3', {quote:'?'})";
		await sql(q);
		const filecontents = fs.readFileSync('test612-3.csv', 'utf8');
		// must include the BOM at the beginning
		expect(filecontents === '\ufeff?colname?\r\n?swing out?\r\n').toBe(true);
	});

	test("With quote = '\\?', single multiword string containing ?", async () => {
		const q = "SELECT 'swing?out' AS `colname` INTO CSV('test612-4', {quote:'?'})";
		await sql(q);
		const filecontents = fs.readFileSync('test612-4.csv', 'utf8');
		// must include the BOM at the beginning
		expect(filecontents === '\ufeff?colname?\r\n?swing??out?\r\n').toBe(true);
	});
});
