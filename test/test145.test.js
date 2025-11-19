// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 145 - localStorage', () => {
	test('1. window object', done => {
		// For browser only // For node - another
		if (typeof window === 'undefined') {
			var res = alasql('SELECT [0], [1] FROM ?', [process.argv]);
		} else {
			var res = alasql('SELECT * FROM ? WHERE [0] = "firstname"', [
				{firstname: 'Bruce', lastname: 'Lee'},
			]);
			var res = alasql('SELECT [0], [1]->textContent FROM ?', [
				document.getElementsByTagName('body'),
			]);
		}
		//		alasql('SELECT window->document->getElementsByTags("body")->0->style->background');
		//		alasql("SELECT window->([0])->name FROM ? WHERE window->([0])->name",[window]);
		done();
	});

	if (typeof localStorage !== 'undefined') {
		describe('localStorage tests', () => {
			test('2. Simple localStorage interface: localStorage as a function', done => {
				localStorage['one'] = JSON.stringify([
					{a: 1, b: 2},
					{a: 2, b: 4},
					{a: 3, b: 6},
				]);
				localStorage['two'] = 1;
				localStorage['three'] = undefined;

				// Transfer to stdlib
				alasql.fn.localStorage = function (key) {
					return JSON.parse(localStorage[key]);
				};

				var res = alasql('SELECT * FROM ?', [JSON.parse(localStorage['one'])]);
				expect(res).toEqual([
					{a: 1, b: 2},
					{a: 2, b: 4},
					{a: 3, b: 6},
				]);
				var res = alasql('SELECT a FROM ? WHERE a = localStorage("two")', [
					JSON.parse(localStorage['one']),
				]);
				expect(res).toEqual([{a: 1}]);
				localStorage['three'] = JSON.stringify(res);

				delete alasql.fn.localStorage;

				done();
			});

			test('3. localStorage as a table name with key, value', done => {
				if (false) {
					var lsfn = function (i) {
						if (i >= localStorage.length) return;
						var k = localStorage.key(i);
						var v;
						try {
							v = JSON.parse(localStorage.getItem(k));
						} catch (err) {}
						return [k, v];
					};

					alasql.from.LOCALSTORAGE = () => {
						return lsfn;
					};
					var res = alasql('SELECT COLUMN [1] FROM localStorage() WHERE [0] LIKE "one"');
					expect(res).toEqual([
						[
							{a: 1, b: 2},
							{a: 2, b: 4},
							{a: 3, b: 6},
						],
					]);

					var res = alasql('SELECT COLUMN [1] FROM ? WHERE [0] LIKE "one"', [lsfn]);
					expect(res).toEqual([
						[
							{a: 1, b: 2},
							{a: 2, b: 4},
							{a: 3, b: 6},
						],
					]);
				}
				//		console.log(res);
				if (false) {
					//console.log(1);
					alasql.into.localStorage = function (r, i) {
						/// console.log('save to LS',r,i);
						localStorage[r[0]] = JSON.stringify(r[1]);
					};

					//		alasql('INSERT INTO localStorage() VALUES ("mytable.1",@[1,2,3]), ("mytable.2",@{a:1,b:2})'); // key=value

					var res = alasql('SELECT * INTO localStorage() FROM ?', [
						[1, 'wind'],
						[2, 'fire'],
					]);
					/// console.log(res);
					/// console.log(localStorage[1],localStorage[2]);
				}
				done();
			});
			if (false) {
				test('3. localStorage AS a database', done => {
					// SELECT * FROM localStorage("and")

					alasql('CREATE DATABASE test145'); // Do we really need this?
					alasql('SELECT * INTO test145.two FROM test145.one');

					alasql('USE test145');
					alasql('SHOW TABLES');
					alasql('CREATE TABLE test145.one');

					alasql('BEGIN TRANSACTION');
					alasql(
						'INSERT INTO test145.one VALUES @{a:1,b:10}, @{a:2,b:20}, @{a:1,b:30}, @{a:3, b:40'
					);
					alasql('SELECT * FROM test145.one WHERE a = 1');

					alasql('DELETE FROM test145.one WHERE a = 2');
					alasql('SELECT * FROM test145.one');
					// check localStorage

					alasql('UPDATE test145.one SET b = a*1000 WHERE a = 2');
					alasql('SELECT * FROM test145.one');
					// check localStorage
					alasql('COMMIT TRANSACTION');

					alasql('DROP TABLE test145.one');
					alasql('SHOW TABLES');

					alasql('CREATE TABLE test145.two (a INT PRIMARY KEY, b Object)');
					alasql(
						'INSERT INTO test145.two VALUES @{a:1,b:10}, @{a:2,b:20}, @{a:1,b:30}, @{a:3, b:40'
					);
					alasql('SELECT * FROM test145.two WHERE a = 1');
					alasql('DROP TABLE test145.two');

					//;String.fromCharCode(0)

					done();
				});

				test('99. Detach database', done => {
					alasql('DROP DATABASE test145'); // Do we really need this?
					done();
				});
			}
		});
	}
});
