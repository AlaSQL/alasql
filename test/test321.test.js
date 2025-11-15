// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 321 CREATE GRAPH', () => {
	var gdata, vv;

	test('1. READ DATA', done => {
		alasql.options.modifier = undefined;
		alasql(
			'SELECT * FROM CSV("' + __dirname + '/test321a.csv",{headers:true})',
			[],
			function (data) {
				gdata = data;
				// Select unique
				vv = alasql('SEARCH DISTINCT(UNION ALL(/[source],/[target])) FROM ?', [gdata]);
				done();
			}
		);
	});

	test('2. CREATE DATABASE A', done => {
		alasql('CREATE DATABASE test321a; USE test321a');
		done();
	});

	test('3. CREATE GRAPH vertices', done => {
		alasql(
			'CREATE GRAPH ' +
				vv.map(function (v) {
					return '"' + v + '"';
				})
		);
		done();
	});

	test('4. CREATE GRAPH edges', done => {
		var res = alasql(
			'CREATE GRAPH ' +
				gdata.map(function (e) {
					return '"' + e.source + '" > {[value]:' + e.value + '} > "' + e.target + '"';
				})
		);
		done();
	});

	test('5. CREATE GRAPH', done => {
		var res = alasql('SEARCH / "Harry" PATH("Roger") name');
		expect(res).toEqual(['Mario', 'Alice', 'Sarah', 'James', 'Roger']);
		var res = alasql('SEARCH / "Johan" PATH("Carol") name');
		expect(res).toEqual(['Peter', 'Alice', 'Eveie', 'Harry', 'Carol']);
		done();
	});

	test('6. DROP DATABASE', done => {
		alasql('DROP DATABASE test321a');
		done();
	});

	test('7. CREATE DATABASE A', done => {
		alasql('CREATE DATABASE test321b; USE test321b');
		done();
	});

	test('8. CREATE GRAPH edges', done => {
		var res = alasql(
			'CREATE GRAPH ' +
				gdata.map(function (e) {
					return '"' + e.source + '" > {[value]:' + e.value + '} > "' + e.target + '"';
				})
		);
		done();
	});

	test('9. CREATE GRAPH', done => {
		var res = alasql('SEARCH / "Harry" PATH("Roger") name');
		expect(res).toEqual(['Mario', 'Alice', 'Sarah', 'James', 'Roger']);
		var res = alasql('SEARCH / "Johan" PATH("Carol") name');
		expect(res).toEqual(['Peter', 'Alice', 'Eveie', 'Harry', 'Carol']);
		done();
	});

	test('10. DROP DATABASE', done => {
		alasql('DROP DATABASE test321b');
		done();
	});

	test('11. CREATE DATABASE C', done => {
		alasql('CREATE DATABASE test321c; USE test321c');
		done();
	});

	test('12. CREATE GRAPH edges', done => {
		var res = alasql(
			'CREATE GRAPH ' +
				gdata.map(function (e) {
					return e.source + ' > loves {[value]:' + e.value + '} > ' + e.target;
				})
		);
		done();
	});

	test('13. CREATE GRAPH', done => {
		var res = alasql('SEARCH / "Harry" PATH("Roger") VERTEX name');
		expect(res).toEqual(['Mario', 'Alice', 'Sarah', 'James', 'Roger']);
		var res = alasql('SEARCH / "Johan" PATH("Carol") VERTEX name');
		expect(res).toEqual(['Peter', 'Alice', 'Eveie', 'Harry', 'Carol']);
		done();
	});

	test('14. DROP DATABASE', done => {
		alasql('DROP DATABASE test321c');
		done();
	});

	test('15. CREATE DATABASE D', done => {
		alasql('CREATE DATABASE test321d; USE test321d');
		done();
	});

	test('16. Simple create graph', done => {
		alasql('CREATE GRAPH Olga > loves > Michael, Michael > loves > Julia');
		var res = alasql('SEARCH / "Julia" (<<)* name');
		expect(res).toEqual(['Julia', 'Michael', 'Olga']);

		var res = alasql('SEARCH / EDGE "loves" < name');
		expect(res).toEqual(['Olga', 'Michael']);

		var res = alasql('SEARCH / EDGE "loves" > name');
		expect(res).toEqual(['Michael', 'Julia']);

		var res = alasql('SEARCH / "Olga" PATH("Julia") VERTEX name');
		expect(res).toEqual(['Michael', 'Julia']);

		var res = alasql('SEARCH / "Olga" PATH("Julia") EDGE name');
		expect(res).toEqual(['loves', 'loves']);

		//console.log(res);

		done();
	});

	test('17. Simple create graph', done => {
		alasql('CREATE GRAPH Serge >> Helen, Helen > hates > Peter');

		var res = alasql('SEARCH / "Serge" PATH("Peter") EDGE name');
		expect(res).toEqual(['hates']);

		var res = alasql('SEARCH / "Serge" PATH("Peter") EDGE ->name');
		expect(res).toEqual([undefined, 'hates']);

		done();
	});

	test('18. DROP DATABASE', done => {
		alasql('DROP DATABASE test321d');
		done();
	});
});
