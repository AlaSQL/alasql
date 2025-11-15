// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 302 CREATE CLASS ', () => {
	test.skip('1. CREATE CLASS', done => {
		alasql('CREATE DATABASE test302;USE test302');
		done();
	});

	test.skip('2. CREATE CLASS', done => {
		var res = alasql('CREATE CLASS Person');
		expect(res == 1).toBe(true);
		expect(alasql.databases.test302.tables.Person.isclass).toBe(true);
		done();
	});

	var italy, rome, milano, romeo, paola, peter, berlin, germany;

	test.skip('3. CREATE CLASS Country and City, INSERT data', done => {
		alasql('CREATE CLASS Country');
		italy = alasql('INSERT INTO Country VALUES {name:"Italy"}');
		germany = alasql('INSERT INTO Country VALUES {name:"Germany"}');

		alasql('CREATE CLASS City');
		rome = alasql('INSERT INTO City VALUES {name:"Rome",country:' + italy + '}');
		milano = alasql('INSERT INTO City VALUES {name:"Milano",country:' + italy + '}');
		berlin = alasql('INSERT INTO City VALUES {name:"Berlin",country:' + germany + '}');

		expect(alasql.databases.test302.tables.Person.isclass).toBe(true);
		done();
	});

	test.skip('4. INSERT INTO CLASS', done => {
		romeo = alasql('INSERT INTO Person VALUES {name:"Romeo",age:32, city:' + rome + '}');
		paola = alasql('INSERT INTO Person VALUES {name:"Paola",age:25, city:' + milano + '}');
		peter = alasql('INSERT INTO Person VALUES {name:"Peter",age:18, city:' + berlin + '}');
		//    expect(alasql.databases.test302.tables.Person.isclass).toBe(true);
		done();
	});

	test.skip('5. SET variable = (INSERT)', done => {
		alasql('SET @egypt = (INSERT INTO Country VALUES {name:"Egypt"})');
		alasql('SET @cairo = (INSERT INTO City VALUES {name:"Cairo", country:(@egypt)})');
		alasql('INSERT INTO Person VALUES {name:"Ali",city:(@cairo)}');
		done();
	});

	test.skip('6. SELECT !', done => {
		var res = alasql(
			'SELECT COLUMN DISTINCT city!country!name AS country\
           FROM Person ORDER BY country'
		);
		expect(res).toEqual(['Egypt', 'Germany', 'Italy']);
		done();
	});

	test.skip('7. SEARCH #', done => {
		var res = alasql('SEARCH DISTINCT(/ city!country!name) FROM Person');
		expect(res.sort()).toEqual(['Egypt', 'Germany', 'Italy']);
		done();
	});

	test.skip('8. SEARCH #', done => {
		var res = alasql('SEARCH DISTINCT(/ :Person city!country!name)');
		expect(res.sort()).toEqual(['Egypt', 'Germany', 'Italy']);

		var res = alasql('SEARCH ALL(/ :Person city!country!name) DISTINCT()');
		expect(res.sort()).toEqual(['Egypt', 'Germany', 'Italy']);

		done();
	});

	test.skip('9. SEARCH AS', done => {
		var res = alasql(
			'search / city as @c ! where(name like "M%") ex({city:name,country:(@c!country!name)}) FROM Person'
		);
		expect(res).toEqual([{city: 'Milano', country: 'Italy'}]);
		done();
	});

	test.skip('10. SEARCH TO', done => {
		var res = alasql('search / city to @c ! ex({city:name,num:len(@c)}) FROM Person');
		expect(res).toEqual([
			{city: 'Rome', num: 1},
			{city: 'Milano', num: 2},
			{city: 'Berlin', num: 3},
			{city: 'Cairo', num: 4},
		]);
		done();
	});

	test.skip('11. SEARCH EX JSON', done => {
		var res = alasql('search / city to @c ! @[name,len(@c)] FROM Person');
		expect(res).toEqual([
			['Rome', 1],
			['Milano', 2],
			['Berlin', 3],
			['Cairo', 4],
		]);
		done();
	});

	test.skip('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test302');
		done();
	});
});
