// @ts-ignore
import {describe, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 321 CREATE GRAPH', function () {
	var gdata, vv;

	test('1. READ DATA', function (done) {
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

	test('2. CREATE DATABASE A', function (done) {
		alasql('CREATE DATABASE test321a; USE test321a');
		done();
	});

	test('3. CREATE GRAPH vertices', function (done) {
		alasql(
			'CREATE GRAPH ' +
				vv.map(function (v) {
					return '"' + v + '"';
				})
		);
		done();
	});

	test('4. CREATE GRAPH edges', function (done) {
		var res = alasql(
			'CREATE GRAPH ' +
				gdata.map(function (e) {
					return '"' + e.source + '" > {[value]:' + e.value + '} > "' + e.target + '"';
				})
		);
		done();
	});

	test('5. CREATE GRAPH', function (done) {
		var res = alasql('SEARCH / "Harry" PATH("Roger") name');
		assert.deepEqual(res, ['Mario', 'Alice', 'Sarah', 'James', 'Roger']);
		var res = alasql('SEARCH / "Johan" PATH("Carol") name');
		assert.deepEqual(res, ['Peter', 'Alice', 'Eveie', 'Harry', 'Carol']);
		done();
	});

	test('6. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test321a');
		done();
	});

	test('7. CREATE DATABASE A', function (done) {
		alasql('CREATE DATABASE test321b; USE test321b');
		done();
	});

	test('8. CREATE GRAPH edges', function (done) {
		var res = alasql(
			'CREATE GRAPH ' +
				gdata.map(function (e) {
					return '"' + e.source + '" > {[value]:' + e.value + '} > "' + e.target + '"';
				})
		);
		done();
	});

	test('9. CREATE GRAPH', function (done) {
		var res = alasql('SEARCH / "Harry" PATH("Roger") name');
		assert.deepEqual(res, ['Mario', 'Alice', 'Sarah', 'James', 'Roger']);
		var res = alasql('SEARCH / "Johan" PATH("Carol") name');
		assert.deepEqual(res, ['Peter', 'Alice', 'Eveie', 'Harry', 'Carol']);
		done();
	});

	test('10. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test321b');
		done();
	});

	test('11. CREATE DATABASE C', function (done) {
		alasql('CREATE DATABASE test321c; USE test321c');
		done();
	});

	test('12. CREATE GRAPH edges', function (done) {
		var res = alasql(
			'CREATE GRAPH ' +
				gdata.map(function (e) {
					return e.source + ' > loves {[value]:' + e.value + '} > ' + e.target;
				})
		);
		done();
	});

	test('13. CREATE GRAPH', function (done) {
		var res = alasql('SEARCH / "Harry" PATH("Roger") VERTEX name');
		assert.deepEqual(res, ['Mario', 'Alice', 'Sarah', 'James', 'Roger']);
		var res = alasql('SEARCH / "Johan" PATH("Carol") VERTEX name');
		assert.deepEqual(res, ['Peter', 'Alice', 'Eveie', 'Harry', 'Carol']);
		done();
	});

	test('14. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test321c');
		done();
	});

	test('15. CREATE DATABASE D', function (done) {
		alasql('CREATE DATABASE test321d; USE test321d');
		done();
	});

	test('16. Simple create graph', function (done) {
		alasql('CREATE GRAPH Olga > loves > Michael, Michael > loves > Julia');
		var res = alasql('SEARCH / "Julia" (<<)* name');
		assert.deepEqual(res, ['Julia', 'Michael', 'Olga']);

		var res = alasql('SEARCH / EDGE "loves" < name');
		assert.deepEqual(res, ['Olga', 'Michael']);

		var res = alasql('SEARCH / EDGE "loves" > name');
		assert.deepEqual(res, ['Michael', 'Julia']);

		var res = alasql('SEARCH / "Olga" PATH("Julia") VERTEX name');
		assert.deepEqual(res, ['Michael', 'Julia']);

		var res = alasql('SEARCH / "Olga" PATH("Julia") EDGE name');
		assert.deepEqual(res, ['loves', 'loves']);

		//console.log(res);

		done();
	});

	test('17. Simple create graph', function (done) {
		alasql('CREATE GRAPH Serge >> Helen, Helen > hates > Peter');

		var res = alasql('SEARCH / "Serge" PATH("Peter") EDGE name');
		assert.deepEqual(res, ['hates']);

		var res = alasql('SEARCH / "Serge" PATH("Peter") EDGE ->name');
		assert.deepEqual(res, [undefined, 'hates']);

		done();
	});

	test('18. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test321d');
		done();
	});
});
