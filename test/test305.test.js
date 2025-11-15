// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 305 CREATE GRAPH', () => {
	test('1. Create database ', done => {
		var res = alasql('CREATE DATABASE test305;USE test305');
		done();
	});
	test('2. CREATE GRAPH', done => {
		alasql('CREATE CLASS Person');
		var res = alasql(
			'CREATE GRAPH Andrey #Andrey:Person, Olga "Olga Ivanova",\
     John, Andrey >> Olga, Olga >> John'
		);
		expect(res).toEqual(['Andrey', 'Olga', 'John', 0, 1]);
		done();
	});
	test('3. CREATE GRAPH', done => {
		var res = alasql('CREATE GRAPH Peter:Person {age:63}');
		expect(res).toEqual(['Peter']);
		done();
	});
	test('4. CREATE GRAPH', done => {
		var res = alasql(
			'CREATE GRAPH Serge {age:44}, Helen {age:25}, \
      Serge > loves {how:"to much"} > Helen'
		);
		expect(res).toEqual(['Serge', 'Helen', 2]);
		done();
	});
	test('5. Search over graph', done => {
		var res = alasql('SEARCH FROM #Peter');
		expect(res.age).toEqual(63);
		done();
	});
	test('6. Search over graph', done => {
		var res = alasql('SEARCH FROM #Peter');
		expect(res.age).toEqual(63);
		done();
	});
	test('7. Search over graph', done => {
		var res = alasql('SEARCH / #Peter age');
		expect(res).toEqual([63]);
		done();
	});
	test('8. Search over graph', done => {
		var res = alasql('SEARCH / :Person age');
		expect(res).toEqual([63]);
		done();
	});
	test('9a. Search over graph with >>', done => {
		var res = alasql('SEARCH / #Andrey >> name');
		expect(res).toEqual(['Olga Ivanova']);
		done();
	});

	test('9b. Search over graph with <<', done => {
		var res = alasql('SEARCH / #Olga << name');
		expect(res).toEqual(['Andrey']);
		done();
	});

	test('10. CREATE GRAPH', done => {
		var res = alasql('SEARCH / #Andrey >> >> name');
		expect(res).toEqual(['John']);
		done();
	});
	test('11. CREATE GRAPH', done => {
		var res = alasql('SEARCH / #Andrey (>>)+ name');
		expect(res).toEqual(['Olga Ivanova', 'John']);
		done();
	});
	test('12. CREATE GRAPH', done => {
		var res = alasql('SEARCH / #Andrey (>>)* name');
		expect(res).toEqual(['Andrey', 'Olga Ivanova', 'John']);
		done();
	});
	test('13. CREATE GRAPH', done => {
		var res = alasql('SEARCH / :Person age');
		expect(res).toEqual([63]);
		done();
	});
	test('14. CREATE GRAPH', done => {
		var res = alasql('SEARCH / age');
		expect(res).toEqual([63, 44, 25]);
		done();
	});
	test('15. CREATE GRAPH', done => {
		var res = alasql('SEARCH / AS @p1 >"loves"> @p1 name');
		expect(res).toEqual(['Serge']);
		done();
	});

	test('16. Create database ', done => {
		var res = alasql('DROP DATABASE test305');
		done();
	});

	test('17. Create database ', done => {
		var res = alasql('CREATE DATABASE test305a;USE test305a');
		done();
	});

	test('18. Create graph from file ', done => {
		var res = alasql('SEARCH FROM XML("' + __dirname + '/test305a.gexf")', [], function (data) {
			//      console.log(res);
			done();
		});
		//    var res = alasql('CREATE GRAPH FROM GEXF("test305a.gexf")');
	});

	test('99. Drop database ', done => {
		var res = alasql('DROP DATABASE test305a');
		done();
	});
});
