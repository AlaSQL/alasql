// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 325 IDENTITY', () => {
	test.skip('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test325; USE test325');
		done();
	});

	test.skip('2. CREATE TABLE with multiple constraints', done => {
		alasql(() => {
			/*
    IF OBJECT_ID('dbo.Messages') IS NOT NULL DROP TABLE dbo.Messages;
    CREATE TABLE dbo.Messages
    (
      msgid  INT          NOT NULL IDENTITY ,
      msgts  DATETIME     NOT NULL DEFAULT(CURRENT_TIMESTAMP),
      msg    VARCHAR(MAX) NOT NULL,
      status VARCHAR(20)  NOT NULL DEFAULT('new') 
        CHECK(status IN('new', 'open')),
      CONSTRAINT PK_Messages 
        PRIMARY KEY NONCLUSTERED(msgid),
      CONSTRAINT UNQ_Messages_status_msgid 
        UNIQUE CLUSTERED(status, msg),
      CONSTRAINT CHK_Messages_status
        CHECK (status IN('new', 'open', 'done'))
      CONSTRAINT FakeDomainCheck
        CHECK (VALUE->msg != 'Virtue? I spit on virtue!')
    );
  */
		});
		done();
	});

	test.skip('3. INSERT INTO', done => {
		var res = alasql(
			'INSERT INTO dbo.Messages (msgts, msg, status) \
      VALUES("2015.01.01","I love you!","new")'
		);
		expect(res == 1).toBe(true);
		//    console.log(41,alasql.tables.Messages.data);
		done();
	});

	test.skip('4. INSERT INTO with NOT NULL violation', done => {
		expect(() => {
			var res = alasql(
				'INSERT INTO dbo.Messages (msgts, msg, status) \
        VALUES("2015.01.01","I do not love you!","not new")'
			);
		}).toThrow(Error);
		//    console.log(49,alasql.tables.Messages.data);
		done();
	});

	test.skip('5. INSERT INTO with CHECK violation', done => {
		expect(() => {
			var res = alasql(
				'INSERT INTO dbo.Messages (msgts, msg, status) \
        VALUES("2015.01.01","I do not love you!","not new")'
			);
		}).toThrow(Error);
		//    console.log(58,alasql.tables.Messages.uniqs);
		done();
	});

	test.skip('6. INSERT INTO with UNIQUE violation', done => {
		expect(() => {
			var res = alasql(
				'INSERT INTO dbo.Messages (msgts, msg, status) \
        VALUES("2015.01.01","I love you!","new")'
			);
		}).toThrow(Error);
		//    console.log(68,alasql.tables.Messages.uniqs);
		done();
	});

	test.skip('7. INSERT INTO with IDENTITY', done => {
		// console.log(69,alasql.tables.Messages.identities);
		// console.log(69,alasql.tables.Messages.uniqs);
		// console.log(69,alasql.tables.Messages.pk);
		// console.log(69,alasql.tables.Messages.uk);
		var res = alasql('SELECT COLUMN msgid FROM dbo.Messages');
		//      console.log(res);
		done();
	});

	test.skip('8. INSERT INTO with IDENTITY', done => {
		var res = alasql(
			'INSERT INTO dbo.Messages (msg, status) \
      VALUES("I hate you!","new")'
		);
		expect(res == 1).toBe(true);
		done();
	});

	test.skip('9. INSERT INTO with IDENTITY', done => {
		var res = alasql(
			'INSERT INTO dbo.Messages (msg, status) \
      VALUES("I hate you to much!","new")'
		);
		expect(res == 1).toBe(true);
		done();
	});

	test.skip('10. INSERT INTO with IDENTITY', done => {
		var res = alasql('SELECT COLUMN msgid FROM dbo.Messages');
		expect(res).toEqual([1, 2, 3]);
		//    console.log(res);
		done();
	});

	test.skip('11. CHECK CONSTRAINT on column', done => {
		expect(() => {
			var res = alasql(
				'INSERT INTO dbo.Messages (msg, status) \
        VALUES("It is not so bad","done")'
			);
		}).toThrow(Error);
		done();
	});

	test.skip('12. DEFAULT()', done => {
		var res = alasql(
			'INSERT INTO dbo.Messages (msg) \
        VALUES("It lucky rainbow!")'
		);
		expect(res == 1).toBe(true);
		done();
	});

	test.skip('13. SELECT with REMOVE COLUMNS', done => {
		var res = alasql('SELECT COLUMN msgid FROM dbo.Messages');
		expect(res).toEqual([1, 2, 3, 4]);
		var res = alasql('SELECT * REMOVE COLUMN msgts FROM dbo.Messages WHERE msgid = 4');
		//    console.log(res);
		expect(res).toEqual([{msgid: 4, msg: 'It lucky rainbow!', status: 'new'}]);
		done();
	});

	test.skip('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test325');
		done();
	});
});
