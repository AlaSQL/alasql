// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 50 - Insert with primary key with two columns', () => {
	describe('INSERT WITH PRIMARY KEY', () => {
		test('1: INSERT ONE COLUMN PRIMARY KEY', done => {
			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT, b INT, PRIMARY KEY (a,b))');
			alasql('INSERT INTO one VALUES (1,1)');
			alasql('INSERT INTO one VALUES (2,1)');

			alasql('INSERT INTO one VALUES (3,1)');
			alasql('INSERT INTO one VALUES (1,2)');
			var res = alasql('SELECT VALUE COUNT(*) FROM one');
			expect(4).toEqual(res);
			done();
		});

		test('2: INSERT ONE MORE RECORD WITH EXISTING KEY', done => {
			expect(() => {
				alasql('INSERT INTO one VALUES (1,2)');
			}).toThrow(Error);
			alasql('INSERT INTO one VALUES (1,3)');

			var res = alasql('SELECT VALUE COUNT(*) FROM one');
			expect(5).toEqual(res);
			done();
		});

		test('3: DELETE A RECORD AND REMOVE FROM INDEX', done => {
			alasql('DELETE FROM one WHERE a = 1');
			alasql('INSERT INTO one VALUES (1,1)');

			var res = alasql('SELECT VALUE COUNT(*) FROM one');
			expect(3).toEqual(res);
			done();
		});

		test('4.1: UPDATE A RECORD AND TRY TO INSERT INTO NEW VALUE', done => {
			alasql('UPDATE one SET a = 5, b=2 WHERE a = 1 AND b = 1');
			expect(() => {
				alasql('INSERT INTO one VALUES (5,2)');
			}).toThrow(Error);
			alasql('INSERT INTO one VALUES (5,1)');

			done();
		});

		test('4.2: UPDATE A RECORD AND try to insert into old value', done => {
			alasql('INSERT INTO one VALUES (1,1)');

			var res = alasql('SELECT VALUE COUNT(*) FROM one');
			expect(5).toEqual(res);
			done();
		});
	});
});
