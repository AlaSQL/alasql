// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 53 - Automatic types parsing', () => {
	describe('Primitive types', () => {
		test('Primitive types', done => {
			var ast = alasql.parse('SELECT 1, "Peter", TRUE');
			var cols = ast.statements[0].columns;
			expect(cols[0].toType()).toEqual('number');
			expect(cols[1].toType()).toEqual('string');
			expect(cols[2].toType()).toEqual('boolean');
			done();
		});

		test('Date type... Not yet realized', done => {
			var ast = alasql.parse('SELECT DATE("2014-10-12")');
			done();
		});

		test('Arifmetic operations', done => {
			var ast = alasql.parse('SELECT 10, 1+1, 1-1, 1*1, 1/1, 1%1');
			var cols = ast.statements[0].columns;
			expect(cols[0].toType()).toEqual('number');
			expect(cols[1].toType()).toEqual('number');
			expect(cols[2].toType()).toEqual('number');
			expect(cols[3].toType()).toEqual('number');
			expect(cols[4].toType()).toEqual('number');
			expect(cols[5].toType()).toEqual('number');
			done();
		});

		test('String operations', done => {
			var ast = alasql.parse('SELECT "Serge","Peter"+"Alba"');
			var cols = ast.statements[0].columns;
			expect(cols[0].toType()).toEqual('string');
			expect(cols[1].toType()).toEqual('string');
			done();
		});

		test('Logic operations', done => {
			var ast = alasql.parse('SELECT TRUE, TRUE AND TRUE, TRUE OR TRUE, NOT TRUE');
			var cols = ast.statements[0].columns;
			expect(cols[0].toType()).toEqual('boolean');
			expect(cols[1].toType()).toEqual('boolean');
			expect(cols[2].toType()).toEqual('boolean');
			expect(cols[3].toType()).toEqual('boolean');
			done();
		});

		test('Logic operations on numbers', done => {
			var ast = alasql.parse('SELECT 1=1, 1!=1, 1<1, 1<=1, 1>1, 1>=1');
			var cols = ast.statements[0].columns;
			expect(cols[0].toType()).toEqual('boolean');
			expect(cols[1].toType()).toEqual('boolean');
			expect(cols[2].toType()).toEqual('boolean');
			expect(cols[3].toType()).toEqual('boolean');
			expect(cols[4].toType()).toEqual('boolean');
			expect(cols[5].toType()).toEqual('boolean');
			done();
		});
		test('Logic operations on strings', done => {
			var ast = alasql.parse(
				'SELECT "Peter"="Peter", "Peter"!="Peter", "Peter"<"Peter",' +
					' "Peter"<="Peter", "Peter">"Peter", "Peter">="Peter"'
			);
			var cols = ast.statements[0].columns;
			expect(cols[0].toType()).toEqual('boolean');
			expect(cols[1].toType()).toEqual('boolean');
			expect(cols[2].toType()).toEqual('boolean');
			expect(cols[3].toType()).toEqual('boolean');
			expect(cols[4].toType()).toEqual('boolean');
			expect(cols[5].toType()).toEqual('boolean');
			done();
		});

		test('Logic operations on BETWEEN', done => {
			var ast = alasql.parse(
				'SELECT a BETWEEN 1 AND 2, a NOT BETWEEN 1 AND 2,' +
					' b BETWEEN "Peter" AND "Sonya",  b NOT BETWEEN "Peter" AND "Sonya"'
			);
			var cols = ast.statements[0].columns;
			expect(cols[0].toType()).toEqual('boolean');
			expect(cols[1].toType()).toEqual('boolean');
			expect(cols[2].toType()).toEqual('boolean');
			expect(cols[3].toType()).toEqual('boolean');
			done();
		});

		test('Logic operations on IN', done => {
			var ast = alasql.parse('SELECT a IN (SELECT b FROM c), a NOT IN (SELECT b FROM c)');
			var cols = ast.statements[0].columns;
			expect(cols[0].toType()).toEqual('boolean');
			expect(cols[1].toType()).toEqual('boolean');
			done();
		});

		test('Logic operations on ALL and SOME', done => {
			var ast = alasql.parse('SELECT a > ALL(SELECT b FROM c), a < SOME (SELECT b FROM c)');
			var cols = ast.statements[0].columns;
			expect(cols[0].toType()).toEqual('boolean');
			expect(cols[1].toType()).toEqual('boolean');
			done();
		});

		test('Logic operations on EXISTS', done => {
			var ast = alasql.parse('SELECT EXISTS (SELECT b FROM c), NOT EXISTS (SELECT b FROM c)');
			var cols = ast.statements[0].columns;
			expect(cols[0].toType()).toEqual('boolean');
			expect(cols[1].toType()).toEqual('boolean');
			done();
		});

		test('Aggregators on SUM, COUNT, AVG', done => {
			var ast = alasql.parse('SELECT COUNT(*), SUM(a), AVG(a) FROM d');
			var cols = ast.statements[0].columns;
			expect(cols[0].toType()).toEqual('number');
			expect(cols[1].toType()).toEqual('number');
			done();
		});

		test('Aggregators FIRST, LAST, MIN, MAX on numbers', done => {
			var ast = alasql.parse('SELECT FIRST(10), LAST(20), MIN(10), MAX(40) FROM d');
			var cols = ast.statements[0].columns;
			expect(cols[0].toType()).toEqual('number');
			expect(cols[1].toType()).toEqual('number');
			expect(cols[2].toType()).toEqual('number');
			expect(cols[3].toType()).toEqual('number');
			done();
		});

		test('Aggregators FIRST, LAST, MIN, MAX on strings', done => {
			var ast = alasql.parse('SELECT FIRST("Peter"), LAST("Peter") FROM d');
			var cols = ast.statements[0].columns;
			expect(cols[0].toType()).toEqual('string');
			expect(cols[1].toType()).toEqual('string');
			done();
		});

		if (false) {
			test('Columns from tables', done => {
				var ast = alasql.parse('SELECT a, a=a, a+a, a-a FROM test');
				var cols = ast.statements[0].columns;
				expect(cols[0].toType()).toEqual({tableid: 'test', columnid: 'a'});
				expect(cols[1].toType()).toEqual('boolean');
				expect(cols[1].toType()).toEqual('strnum');
				expect(cols[1].toType()).toEqual('number');
				done();
			});

			test('Columns from tables', done => {
				var ast = alasql.parse('SELECT FIRST(a), FIRST(1), FIRT("Peter"), FIRST(TRUE) FROM test');
				var cols = ast.statements[0].columns;
				expect(cols[0].toType()).toEqual({tableid: 'test', columnid: 'a'});
				expect(cols[1].toType()).toEqual('number');
				expect(cols[2].toType()).toEqual('string');
				expect(cols[3].toType()).toEqual('boolean');
				done();
			});
			test('Columns from subqueries', done => {
				var ast = alasql.parse('SELECT * FROM test');
				var cols = ast.statements[0].columns;
				expect(cols[0].toType()).toEqual('unknown');
				done();
			});

			test('Columns from subqueries', done => {
				var ast = alasql.parse('SELECT a FROM (SELECT 1 AS a)');
				var cols = ast.statements[0].columns;
				expect(cols[0].toType()).toEqual('number');
				done();
			});

			test('Columns from subqueries', done => {
				var ast = alasql.parse('SELECT a FROM (SELECT b AS a FROM test1)');
				var cols = ast.statements[0].columns;
				expect(cols[0].toType()).toEqual({tableid: 'test', columnid: 'b'});
				done();
			});
		}
	});
});
