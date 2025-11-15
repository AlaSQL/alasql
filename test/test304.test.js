// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 304 SEARCH over JSON', () => {
	test.skip('0. Create database ', done => {
		var res = alasql('CREATE DATABASE test304;USE test304');
		done();
	});

	test.skip('1. INSTANCEOF selector', done => {
		var People = (alasql.fn.People = () => {});
		var City = (alasql.fn.City = () => {});

		var p1 = new People();
		p1.name = 'John';
		var p2 = new People();
		p2.name = 'Mary';
		var c1 = new City();
		c1.name = 'Milano';
		var c2 = new City();
		c2.name = 'Odessa';

		var data = [p1, c1, p2, c2];

		var res = alasql('SEARCH / INSTANCEOF(City) name FROM ?', [data]);
		expect(res).toEqual(['Milano', 'Odessa']);
		done();
	});

	test.skip('2. CLASS() selector', done => {
		alasql('CREATE CLASS Person');
		alasql('CREATE CLASS City');
		alasql('INSERT INTO Person VALUES {name:"John"},{name:"Mary"}');
		alasql('INSERT INTO City VALUES {name:"Madrid"},{name:"Kyoto"}');
		var res = alasql('SEARCH / CLASS(City) name');
		expect(res).toEqual(['Madrid', 'Kyoto']);
		done();
	});

	test.skip('3. PLUS selector', done => {
		var data = {a: {a: {a: {a: {b: 10}}}}};
		var res = alasql('SEARCH a b FROM ?', [data]);
		expect(res).toEqual([]);

		var res = alasql('SEARCH (a)+ b FROM ?', [data]);
		expect(res).toEqual([10]);

		var res = alasql('SEARCH (a a)+ b FROM ?', [data]);
		expect(res).toEqual([10]);

		var res = alasql('SEARCH (a a a)+ b FROM ?', [data]);
		expect(res).toEqual([]);

		var res = alasql('SEARCH (/)+ b FROM ?', [data]);
		expect(res).toEqual([10]);

		var res = alasql('SEARCH /+b FROM ?', [data]);
		expect(res).toEqual([10]);

		done();
	});

	test.skip('4. STAR and QUESTION selector', done => {
		var data = {a: {a: {a: {a: {b: 10}}}}, b: 20};
		var res = alasql('SEARCH a* b FROM ?', [data]);
		expect(res).toEqual([20, 10]);

		var res = alasql('SEARCH a+ b FROM ?', [data]);
		expect(res).toEqual([10]);

		var res = alasql('SEARCH a? b FROM ?', [data]);
		expect(res).toEqual([20]);

		done();
	});

	test.skip('5. STAR and QUESTION selectors in GRAPHS', done => {
		alasql('SET @olga = (CREATE VERTEX "Olga")');
		alasql('SET @helen = (CREATE VERTEX "Helen")');
		alasql('SET @pablo = (CREATE VERTEX "Pablo")');
		alasql('SET @andrey = (CREATE VERTEX "Andrey")');
		alasql('SET @sofia = (CREATE VERTEX "Sofia")');
		alasql('CREATE EDGE FROM @olga TO @pablo');
		alasql('CREATE EDGE FROM @helen TO @andrey');
		alasql('CREATE EDGE FROM @pablo TO @sofia');
		alasql('CREATE EDGE FROM @andrey TO @sofia');

		var res = alasql('SEARCH / AS @p (>>)+ "Sofia" @(@p) name');
		expect(res).toEqual(['Olga', 'Helen', 'Pablo', 'Andrey']);
		var res = alasql('SEARCH / AS @p (>>)* "Sofia" @(@p) name');
		expect(res).toEqual(['Olga', 'Helen', 'Pablo', 'Andrey', 'Sofia']);

		var res = alasql('SEARCH / "Olga" >> name');
		expect(res).toEqual(['Pablo']);
		var res = alasql('SEARCH / "Olga" (>>)? name');
		expect(res).toEqual(['Olga', 'Pablo']);

		done();
	});

	test.skip('6. STAR and QUESTION selectors in GRAPHS', done => {
		var res = alasql('SEARCH / "Olga" (>>)+ name');
		expect(res).toEqual(['Pablo', 'Sofia']);
		var res = alasql('SEARCH / "Olga" (>>)* name');
		expect(res).toEqual(['Olga', 'Pablo', 'Sofia']);

		var res = alasql('SEARCH / IF(>> >> "Sofia") name');
		expect(res).toEqual(['Olga', 'Helen']);

		done();
	});

	test.skip('99. Create database ', done => {
		var res = alasql('DROP DATABASE test304');
		done();
	});
});
