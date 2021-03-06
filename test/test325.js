if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 325 IDENTITY', function () {
	it.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test325; USE test325');
		done();
	});

	it.skip('2. CREATE TABLE with multiple constraints', function (done) {
		alasql(function () {
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

	it.skip('3. INSERT INTO', function (done) {
		var res = alasql(
			'INSERT INTO dbo.Messages (msgts, msg, status) \
      VALUES("2015.01.01","I love you!","new")'
		);
		assert(res == 1);
		//    console.log(41,alasql.tables.Messages.data);
		done();
	});

	it.skip('4. INSERT INTO with NOT NULL violation', function (done) {
		assert.throws(function () {
			var res = alasql(
				'INSERT INTO dbo.Messages (msgts, msg, status) \
        VALUES("2015.01.01","I do not love you!","not new")'
			);
		}, Error);
		//    console.log(49,alasql.tables.Messages.data);
		done();
	});

	it.skip('5. INSERT INTO with CHECK violation', function (done) {
		assert.throws(function () {
			var res = alasql(
				'INSERT INTO dbo.Messages (msgts, msg, status) \
        VALUES("2015.01.01","I do not love you!","not new")'
			);
		}, Error);
		//    console.log(58,alasql.tables.Messages.uniqs);
		done();
	});

	it.skip('6. INSERT INTO with UNIQUE violation', function (done) {
		assert.throws(function () {
			var res = alasql(
				'INSERT INTO dbo.Messages (msgts, msg, status) \
        VALUES("2015.01.01","I love you!","new")'
			);
		}, Error);
		//    console.log(68,alasql.tables.Messages.uniqs);
		done();
	});

	it.skip('7. INSERT INTO with IDENTITY', function (done) {
		// console.log(69,alasql.tables.Messages.identities);
		// console.log(69,alasql.tables.Messages.uniqs);
		// console.log(69,alasql.tables.Messages.pk);
		// console.log(69,alasql.tables.Messages.uk);
		var res = alasql('SELECT COLUMN msgid FROM dbo.Messages');
		//      console.log(res);
		done();
	});

	it.skip('8. INSERT INTO with IDENTITY', function (done) {
		var res = alasql('INSERT INTO dbo.Messages (msg, status) \
      VALUES("I hate you!","new")');
		assert(res == 1);
		done();
	});

	it.skip('9. INSERT INTO with IDENTITY', function (done) {
		var res = alasql(
			'INSERT INTO dbo.Messages (msg, status) \
      VALUES("I hate you to much!","new")'
		);
		assert(res == 1);
		done();
	});

	it.skip('10. INSERT INTO with IDENTITY', function (done) {
		var res = alasql('SELECT COLUMN msgid FROM dbo.Messages');
		assert.deepEqual(res, [1, 2, 3]);
		//    console.log(res);
		done();
	});

	it.skip('11. CHECK CONSTRAINT on column', function (done) {
		assert.throws(function () {
			var res = alasql(
				'INSERT INTO dbo.Messages (msg, status) \
        VALUES("It is not so bad","done")'
			);
		}, Error);
		done();
	});

	it.skip('12. DEFAULT()', function (done) {
		var res = alasql('INSERT INTO dbo.Messages (msg) \
        VALUES("It lucky rainbow!")');
		assert(res == 1);
		done();
	});

	it.skip('13. SELECT with REMOVE COLUMNS', function (done) {
		var res = alasql('SELECT COLUMN msgid FROM dbo.Messages');
		assert.deepEqual(res, [1, 2, 3, 4]);
		var res = alasql('SELECT * REMOVE COLUMN msgts FROM dbo.Messages WHERE msgid = 4');
		//    console.log(res);
		assert.deepEqual(res, [{msgid: 4, msg: 'It lucky rainbow!', status: 'new'}]);
		done();
	});

	it.skip('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test325');
		done();
	});
});
