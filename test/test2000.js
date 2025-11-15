const alasql = require('../dist/alasql.js');

if (typeof exports === 'object') {
	var assert = require('assert');
}

describe('Test 2000', function () {
	before(function () {
		alasql('create database test');
		alasql('use test');
	});

	after(function () {
		alasql('drop database test');
	});

	it('A) Select from memory', () => {
		alasql('CREATE TABLE osoby (id INT, meno STRING)');
		alasql('INSERT INTO osoby VALUES (1, "John"), (2, "Jane"), (3, "Jake")');
		const result = alasql('SELECT * FROM osoby');

		assert.deepEqual(result, [
			{id: 1, meno: 'John'},
			{id: 2, meno: 'Jane'},
			{id: 3, meno: 'Jake'},
		]);
	});

	it('B) Max from memory', () => {
		alasql('CREATE TABLE produkty (id INT, cena INT)');
		alasql('INSERT INTO produkty VALUES (1, 100), (2, 150), (3, 200)');
		const result = alasql('SELECT MAX(cena) AS maxCena FROM produkty');

		assert.strictEqual(result[0].maxCena, 200);
	});

	it('C) Min from memory', () => {
		alasql('CREATE TABLE produkty3 (id INT, cena INT)');
		alasql('INSERT INTO produkty3 VALUES (1, 100), (2, 150), (3, 200)');
		const result = alasql('SELECT MIN(cena) AS minCena FROM produkty3');

		assert.strictEqual(result[0].minCena, 100);
	});

	it('Total from memory', () => {
		alasql('CREATE TABLE produkty4 (id INT, cena INT)');
		alasql('INSERT INTO produkty4 VALUES (1, 100), (2, 150), (3, 200)');

		const result = alasql('SELECT TOTAL(cena) AS totalCena FROM produkty4');

		assert.strictEqual(result[0].totalCena, 450);
	});

	it('E) Avg from memory', () => {
		alasql('CREATE TABLE produkty2 (id INT, cena INT)');
		alasql('INSERT INTO produkty2 VALUES (1, 100), (2, 150), (3, 200)');
		const result = alasql('SELECT AVG(cena) AS avgCena FROM produkty2');

		assert.strictEqual(result[0].avgCena, 150);
	});

	it('F) SUM with Round function from memory', function () {
		var data = [
			{
				a: null,
				b: 9.45,
				c: true,
				c2: 1.39,
				d: null,
				e: 'XYZ1',
				f: new Number(2),
			},
			{
				a: null,
				b: 1.13,
				c: false,
				c2: false,
				d: 5.15,
				e: 'XYZ2',
				f: new Number(11.25),
			},
		];
		res = alasql(
			`SELECT SUM(ROUND(a))  AS a,
					sum(ROUND(b))  as b,
					sUm(c)         as c,
					sUm(ROUND(c2)) as c2,
					SuM(ROUND(d))  as d,
					SUM(ROUND(e))  as e,
					SUM(ROUND(f))  as f
			 FROM ?`,
			[data]
		);
		assert.deepEqual(res, [
			{
				a: null,
				b: 10,
				c: null,
				c2: 1,
				d: 5,
				e: null,
				f: 13,
			},
		]);
	});

	it('G) MAX/MIN/SUM with Round or Ceil function from memory', function () {
		var data = [{a: 10.25}, {a: null}, {b: 10}, {a: 5.25}, {a: 33.45}];
		res = alasql(
			`SELECT MIN(ROUND(a)) AS a,
					MAX(ROUND(a)) AS b,
					MIN(a)        AS c,
					MAX(a)        AS d,
					MIN(CEIL(a))  AS e,
					MAX(CEIL(a))  AS f,
					SUM(ROUND(a)) AS g,
					SUM(CEIL(a))  AS h
			 FROM ?`,
			[data]
		);
		assert.deepEqual(res, [
			{
				a: 5,
				b: 33,
				c: 5.25,
				d: 33.45,
				e: 6,
				f: 34,
				g: 48,
				h: 51,
			},
		]);
	});

	it('H) MAX/MIN for Dates from memory', function () {
		var data = [
			{a: new Date(2023, 6, 6, 0, 0, 0)},
			{a: new Date(2023, 6, 15, 0, 0, 0)},
			{a: null},
			{a: undefined},
			{a: new Date(2023, 7, 7, 0, 0, 0)},
		];
		res = alasql(
			`SELECT
					MIN(a)        AS c,
					MAX(a)        AS d
				 FROM ?`,
			[data]
		);
		assert.deepEqual(res, [
			{
				c: new Date(2023, 6, 6, 0, 0, 0),
				d: new Date(2023, 7, 7, 0, 0, 0),
			},
		]);
	});
});
