// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test/test159.json', {
		strict: false,
		ws: '',
	});
}

describe('Test 159 - test DOM-storage', () => {
	test('1. Test ', done => {
		var res = alasql('drop localstorage database if exists test159');
		expect(res == 0 || res == 1).toBe(true);

		var res = alasql('create localstorage database if not exists test159');
		expect(res == 0 || res == 1).toBe(true);

		res = alasql('attach localstorage database test159');
		expect(res == 1).toBe(true);

		res = alasql('use test159');
		expect(res == 1).toBe(true);

		res = alasql('drop table if exists cities');
		expect(res == 0 || res == 1).toBe(true);

		res = alasql('create table cities (city string)');
		expect(res == 1).toBe(true);

		res = alasql("insert into cities values ('Moscow'),('Paris'),('Minsk'),('Riga'),('Tallinn')");
		expect(res == 5).toBe(true);

		res = alasql("select column * from cities where city like 'M%' order by city");
		expect(res).toEqual(['Minsk', 'Moscow']);

		res = alasql('delete from cities where city in ("Riga","Tallinn","Moscow")');
		expect(res == 3).toBe(true);

		res = alasql('select column * from cities order by city');
		expect(res).toEqual(['Minsk', 'Paris']);

		res = alasql("update cities set city = 'Vilnius' where city = 'Minsk'");
		expect(res == 1).toBe(true);

		res = alasql('select column * from cities order by city');
		expect(res).toEqual(['Paris', 'Vilnius']);

		res = alasql("insert into cities values ('Berlin')");
		expect(res == 1).toBe(true);

		res = alasql('select column * from cities order by city');
		expect(res).toEqual(['Berlin', 'Paris', 'Vilnius']);

		res = alasql(
			`detach database test159;
			 drop localstorage database test159`
		);
		expect(res).toEqual([1, 1]);

		done();
	});

	test('2. Multiple statements ', done => {
		var res = alasql(
			"drop localstorage database if exists test159;\
			create localstorage database if not exists test159;\
			attach localstorage database test159;\
			use test159;\
			drop table if exists cities;\
			create table cities (city string);\
			insert into cities values ('Moscow'),('Paris'),('Minsk'),('Riga'),('Tallinn');\
			delete from cities where city in ('Riga','Tallinn','Moscow'); \
			update cities set city = 'Vilnius' where city = 'Minsk';\
			insert into cities values ('Berlin')"
		);

		res = alasql('select column * from cities order by city');
		expect(res).toEqual(['Berlin', 'Paris', 'Vilnius']);

		res = alasql(
			'detach database test159; \
				drop localstorage database test159'
		);
		expect(res).toEqual([1, 1]);

		done();
	});

	test('3. Multiple call-backs', done => {
		var res = alasql('drop localstorage database if exists test159', [], function (res) {
			alasql('create localstorage database if not exists test159;', [], function (res) {
				alasql('attach localstorage database test159', [], function (res) {
					alasql('use test159', [], function (res) {
						alasql('drop table if exists cities', [], function (res) {
							alasql('create table cities (city string);', [], function (res) {
								alasql(
									"insert into cities values ('Moscow'),('Paris'),('Minsk'),\
									('Riga'),('Tallinn')",
									[],
									function (res) {
										alasql(
											"delete from cities where city in ('Riga','Tallinn','Moscow')",
											[],
											function (res) {
												alasql(
													"update cities set city = 'Vilnius' where city = 'Minsk'",
													[],
													function (res) {
														alasql("insert into cities values ('Berlin')", [], function (res) {
															alasql(
																'select column * from cities order by city',
																[],
																function (res) {
																	expect(res).toEqual(['Berlin', 'Paris', 'Vilnius']);
																	alasql('detach database test159', [], function (res) {
																		expect(res == 1).toBe(true);
																		alasql(
																			'drop localstorage database test159',
																			[],
																			function (res) {
																				expect(res == 1).toBe(true);
																				done();
																			}
																		);
																	});
																}
															);
														});
													}
												);
											}
										);
									}
								);
							});
						});
					});
				});
			});
		});
	});

	/*

//if(false) {
	test("1. Test ", function(done){
		alasql("create localstorage database if not exists test159; \
			attach localstorage database test159; \
			use test159; \
			drop table if exists cities; \
			create table cities (city string)",[], function(res) {
				expect(res).toEqual([1,1,1,1,1]);
				alasql("insert into cities values ('Moscow'),('Paris'),('Minsk'),('Riga'),('Tallinn')",[],function(res){
					expect(res).toEqual(5);
					alasql("select column * from cities where city like 'M%' order by city", [], function(res){
						expect(res).toEqual(['Minsk','Moscow']);
						done();
					});
				});

		});

	});

	test("2. UPDATE and DELETE", function(done){

		alasql("update cities set city = 'Vilnius' where city = 'Minsk'", [], function(res){
			expect(res == 1).toBe(true);
			alasql('delete from cities where city in ("Riga","Tallinn","Moscow")', [], function(res) {
				expect(res == 3).toBe(true);
				alasql('select column * from cities order by city', [], function(res) {
					expect(res).toEqual(["Berlin","Paris","Vilnius"]);
					done();
				});
			});
		});

	});

	test("99. Drop database", function(done){
		alasql('detach database test159;\
				drop localstorage database test159');
		done();
	});
//};
// */
});
