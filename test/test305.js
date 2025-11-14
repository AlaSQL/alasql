// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 305 CREATE GRAPH', function () {
	test('1. Create database ', function (done) {
		var res = alasql('CREATE DATABASE test305;USE test305');
		done();
	});
	test('2. CREATE GRAPH', function (done) {
		alasql('CREATE CLASS Person');
		var res = alasql(
			'CREATE GRAPH Andrey #Andrey:Person, Olga "Olga Ivanova",\
     John, Andrey >> Olga, Olga >> John'
		);
		assert.deepEqual(res, ['Andrey', 'Olga', 'John', 0, 1]);
		done();
	});
	test('3. CREATE GRAPH', function (done) {
		var res = alasql('CREATE GRAPH Peter:Person {age:63}');
		assert.deepEqual(res, ['Peter']);
		done();
	});
	test('4. CREATE GRAPH', function (done) {
		var res = alasql(
			'CREATE GRAPH Serge {age:44}, Helen {age:25}, \
      Serge > loves {how:"to much"} > Helen'
		);
		assert.deepEqual(res, ['Serge', 'Helen', 2]);
		done();
	});
	test('5. Search over graph', function (done) {
		var res = alasql('SEARCH FROM #Peter');
		assert.deepEqual(res.age, 63);
		done();
	});
	test('6. Search over graph', function (done) {
		var res = alasql('SEARCH FROM #Peter');
		assert.deepEqual(res.age, 63);
		done();
	});
	test('7. Search over graph', function (done) {
		var res = alasql('SEARCH / #Peter age');
		assert.deepEqual(res, [63]);
		done();
	});
	test('8. Search over graph', function (done) {
		var res = alasql('SEARCH / :Person age');
		assert.deepEqual(res, [63]);
		done();
	});
	test('9a. Search over graph with >>', function (done) {
		var res = alasql('SEARCH / #Andrey >> name');
		assert.deepEqual(res, ['Olga Ivanova']);
		done();
	});

	test('9b. Search over graph with <<', function (done) {
		var res = alasql('SEARCH / #Olga << name');
		assert.deepEqual(res, ['Andrey']);
		done();
	});

	test('10. CREATE GRAPH', function (done) {
		var res = alasql('SEARCH / #Andrey >> >> name');
		assert.deepEqual(res, ['John']);
		done();
	});
	test('11. CREATE GRAPH', function (done) {
		var res = alasql('SEARCH / #Andrey (>>)+ name');
		assert.deepEqual(res, ['Olga Ivanova', 'John']);
		done();
	});
	test('12. CREATE GRAPH', function (done) {
		var res = alasql('SEARCH / #Andrey (>>)* name');
		assert.deepEqual(res, ['Andrey', 'Olga Ivanova', 'John']);
		done();
	});
	test('13. CREATE GRAPH', function (done) {
		var res = alasql('SEARCH / :Person age');
		assert.deepEqual(res, [63]);
		done();
	});
	test('14. CREATE GRAPH', function (done) {
		var res = alasql('SEARCH / age');
		assert.deepEqual(res, [63, 44, 25]);
		done();
	});
	test('15. CREATE GRAPH', function (done) {
		var res = alasql('SEARCH / AS @p1 >"loves"> @p1 name');
		assert.deepEqual(res, ['Serge']);
		done();
	});

	test('16. Create database ', function (done) {
		var res = alasql('DROP DATABASE test305');
		done();
	});

	test('17. Create database ', function (done) {
		var res = alasql('CREATE DATABASE test305a;USE test305a');
		done();
	});

	test('18. Create graph from file ', function (done) {
		var res = alasql('SEARCH FROM XML("' + __dirname + '/test305a.gexf")', [], function (data) {
			//      console.log(res);
			done();
		});
		//    var res = alasql('CREATE GRAPH FROM GEXF("test305a.gexf")');
	});

	test('99. Drop database ', function (done) {
		var res = alasql('DROP DATABASE test305a');
		done();
	});
});
