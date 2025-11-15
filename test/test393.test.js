// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
 This sample beased on this article:

*/

describe('Test 393 Triggers', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test393;USE test393');
		done();
	});

	test('2. BEFORE INSERT', done => {
		var testCount = 0;
		alasql.fn.onchange1 = () => {
			testCount++;
		};
		alasql.fn.onchange2 = function (r) {
			expect(r.a == 123).toBe(true);
			testCount++;
		};
		alasql('CREATE TABLE one (a INT)');

		alasql('CREATE TRIGGER tr1 BEFORE INSERT ON one CALL onchange1()');
		alasql('CREATE TRIGGER tr2 BEFORE INSERT ON one onchange2');

		alasql('INSERT INTO one VALUES (123)'); // This will fire onchange()

		//    setTimeout(function(){
		expect(testCount == 2).toBe(true);
		done();
		//    },10);
	});

	test('3. Prevent BEFORE INSERT', done => {
		alasql.fn.onchange3 = function (r) {
			if (r.a == 276) return false;
		};
		alasql('CREATE TABLE two (a INT)');
		alasql('CREATE TRIGGER tr3 BEFORE INSERT ON two onchange3');
		alasql('INSERT INTO two VALUES (276),(145)');

		var res = alasql('COLUMN OF SELECT * FROM two');
		expect(res).toEqual([145]);
		done();
	});

	test('4. Prevent AFTER INSERT', done => {
		alasql.fn.onchange4 = function (r) {
			expect(r.a == 983).toBe(true);
			expect(alasql.databases.test393.tables.two.data.length == 2).toBe(true);
		};
		expect(alasql.databases.test393.tables.two.data.length == 1).toBe(true);
		alasql('CREATE TRIGGER tr4 AFTER INSERT ON two onchange4');
		alasql('INSERT INTO two VALUES (983)');
		done();
	});

	test('5. INSTEAD OF INSERT', done => {
		var testCount = 0;
		alasql.fn.onchange5 = function (r) {
			expect(r.a == 222).toBe(true);
			testCount++;
		};
		alasql('CREATE TABLE three (a INT)');
		alasql('CREATE TRIGGER tr5 INSTEAD OF INSERT ON three onchange5');
		alasql('INSERT INTO three VALUES (222)');

		var res = alasql('COLUMN OF SELECT * FROM three');
		expect(res).toEqual([]);
		expect(testCount == 1).toBe(true);
		done();
	});

	test('6. BEFORE AND AFTER DELETE', done => {
		var testCount = 0;
		alasql.fn.onchange61 = function (r) {
			testCount++;
			var res = alasql('COLUMN OF SELECT * FROM four');
			expect(res).toEqual([1, 2, 3, 4, 5]);
		};
		alasql.fn.onchange62 = () => {
			testCount++;
			var res = alasql('COLUMN OF SELECT * FROM four');
			expect(res).toEqual([2, 3, 4, 5]);
		};
		alasql.fn.onchange63 = () => {
			testCount++;
			var res = alasql('COLUMN OF SELECT * FROM four');
			expect(res).toEqual([2, 3, 4, 5]);
		};
		alasql('CREATE TABLE four (a INT)');
		alasql('CREATE TRIGGER tr61 BEFORE DELETE ON four onchange61');
		alasql('CREATE TRIGGER tr62 AFTER DELETE ON four CALL onchange62()');
		alasql('CREATE TRIGGER tr63 AFTER DELETE ON four onchange63');
		alasql('INSERT INTO four VALUES (1),(2),(3),(4),(5)');
		alasql('DELETE FROM four WHERE a = 1');

		expect(testCount == 3).toBe(true);
		done();
	});

	test('7. BEFORE AND AFTER UPDATE', done => {
		var testCount = 0;
		alasql.fn.onchange7 = function (p, r) {
			expect(p.a == 2).toBe(true);
			expect(r.a == 7).toBe(true);
			testCount++;
		};
		alasql.fn.onchange7after = function (p, r) {
			expect(p.a == 2).toBe(true);
			expect(r.a == 7).toBe(true);
			testCount++;
		};
		alasql('CREATE TRIGGER tr7 BEFORE UPDATE ON four onchange7');
		alasql('CREATE TRIGGER tr7after BEFORE UPDATE ON four onchange7after');
		alasql('UPDATE four SET a = 7 WHERE a = 2');

		var res = alasql('COLUMN OF SELECT * FROM four');
		expect(res).toEqual([7, 3, 4, 5]);
		expect(testCount == 2).toBe(true);
		done();
	});

	test('8. INSTEAD OF UPDATE', done => {
		var testCount = 0;
		alasql.fn.onchange8 = function (p, r) {
			expect(p.a == 2).toBe(true);
			expect(r.a == 7).toBe(true);
			testCount++;
		};
		alasql('CREATE TABLE five (a INT)');
		alasql('CREATE TRIGGER tr8 INSTEAD OF UPDATE ON five onchange8');
		alasql('INSERT INTO five VALUES (1),(2),(3),(4),(5)');
		alasql('UPDATE five SET a = 7 WHERE a = 2');

		var res = alasql('COLUMN OF SELECT * FROM five');
		expect(res).toEqual([1, 2, 3, 4, 5]);
		expect(testCount == 1).toBe(true);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test393');
		done();
	});
});
