if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 212: CONVERT dates with style', function () {
	it('1. CONVERT DATES', function (done) {
		alasql(
			'SET @d = DATE("01/08/2015 12:34:56.789"); \
            SELECT ROW \
                CONVERT(STRING,@d,1),\
                CONVERT(STRING,@d,2),\
                CONVERT(STRING,@d,3),\
                CONVERT(STRING,@d,4),\
                CONVERT(STRING,@d,5),\
                CONVERT(STRING,@d,6),\
                CONVERT(STRING,@d,7),\
                CONVERT(STRING,@d,8),\
                CONVERT(STRING,@d,10),\
                CONVERT(STRING,@d,11),\
                CONVERT(STRING,@d,12),\
                CONVERT(STRING,@d,101),\
                CONVERT(STRING,@d,102),\
                CONVERT(STRING,@d,103),\
                CONVERT(STRING,@d,104),\
                CONVERT(STRING,@d,105),\
                CONVERT(STRING,@d,106),\
                CONVERT(STRING,@d,107),\
                CONVERT(STRING,@d,108),\
                CONVERT(STRING,@d,110),\
                CONVERT(STRING,@d,111),\
                CONVERT(STRING,@d,112)\
            ',
			[],
			function (res) {
				assert(res, [
					1,
					[
						'01/08/15',
						'15.01.08',
						'08/01/15',
						'08.01.15',
						'08-01-15',
						'08 jan 15',
						'Jan 08,15',
						'12:35:56',
						'01-08-15',
						'15/01/08',
						'150108',
						'01/08/2015',
						'2015.01.08',
						'08/01/2015',
						'08.01.2015',
						'08-01-2015',
						'08 jan 2015',
						'Jan 08,2015',
						'12:35:56',
						'01-08-2015',
						'2015/01/08',
						'20150108',
					],
				]);
				done();
			}
		);
	});

	it('2. CONVERT DATE TO STRING', function (done) {
		var res = alasql(
			'SET @d = DATE("01/08/2015 12:34:56.789"); \
            SELECT VALUE \
                CONVERT(NVARCHAR(10),@d,110)'
		);
		//        console.log(res);
		assert(res[1] == '01-08-2015');
		done();
	});

	it('3. CONVERT JAVASCRIPT DATE TO STRING', function (done) {
		var res = alasql(
			'SET @d = NEW Date("01/08/2015 12:34:56.789"); \
            SELECT VALUE \
                CONVERT(NVARCHAR(10),@d,110)'
		);
		assert(res[1] == '01-08-2015');
		done();
	});

	it('4. CONVERT JAVASCRIPT DATE TO STRING', function (done) {
		var d = new Date('01/08/2015 12:34:56.789');
		var res = alasql('SELECT VALUE CONVERT(NVARCHAR(10),?,110)', [d]);
		assert(res == '01-08-2015');
		done();
	});

	it('5. CONVERT DATE TO STRING FROM TABLE', function (done) {
		var res = alasql(
			'CREATE DATABASE test212; USE test212;\
            CREATE TABLE one (d DATE); \
            INSERT INTO one VALUES ("01/08/2015 12:34:56.789");\
            INSERT INTO one VALUES (DATE("01/08/2015 12:34:56.789"));\
            INSERT INTO one VALUES (NEW Date("01/08/2015 12:34:56.789"));\
            SELECT COLUMN CONVERT(NVARCHAR(10),d,110) FROM one'
		);
		res = res.pop();
		assert(res[0] == '01-08-2015');
		assert(res[1] == '01-08-2015');
		assert(res[2] == '01-08-2015');
		done();
	});

	it('6. CONVERT DATE TO STRING FROM TABLE', function (done) {
		var res = alasql(
			'CREATE TABLE two (d Date); \
            INSERT INTO two VALUES ("01/08/2015 12:34:56.789");\
            INSERT INTO two VALUES (DATE("01/08/2015 12:34:56.789"));\
            INSERT INTO two VALUES (NEW Date("01/08/2015 12:34:56.789"));\
            SELECT COLUMN CONVERT(NVARCHAR(10),d,110) FROM two'
		);
		res = res.pop();
		assert(res[0] == '01-08-2015');
		assert(res[1] == '01-08-2015');
		assert(res[2] == '01-08-2015');
		done();
	});

	it('7. CONVERT DATE TO STRING FROM TABLE', function (done) {
		var res = alasql(
			'CREATE TABLE three; \
            INSERT INTO three (d) VALUES ("01/08/2015 12:34:56.789");\
            INSERT INTO three (d) VALUES (DATE("01/08/2015 12:34:56.789"));\
            INSERT INTO three (d) VALUES (NEW Date("01/08/2015 12:34:56.789"));\
            SELECT COLUMN CONVERT(NVARCHAR(10),d,110) FROM three'
		);
		res = res.pop();
		assert(res[0] == '01-08-2015');
		assert(res[1] == '01-08-2015');
		assert(res[2] == '01-08-2015');
		done();
	});

	it('8. CONVERT DATE TO STRING FROM TABLE without columns', function (done) {
		var res = alasql(
			'CREATE TABLE four; \
            INSERT INTO four VALUES {d:"01/08/2015 12:34:56.789"};\
            INSERT INTO four VALUES {d:DATE("01/08/2015 12:34:56.789")};\
            INSERT INTO four VALUES {d:(NEW Date("01/08/2015 12:34:56.789"))};\
            SELECT COLUMN CONVERT(NVARCHAR(10),d,110) FROM four'
		);
		res = res.pop();
		assert(res[0] == '01-08-2015');
		assert(res[1] == '01-08-2015');
		assert(res[2] == '01-08-2015');
		done();
	});

	it('9. CONVERT DATE TO STRING FROM TABLE without columns', function (done) {
		var d = new Date('01/08/2015 12:34:56.789');
		var res = alasql(
			'CREATE TABLE five; \
            INSERT INTO five VALUES @"01/08/2015 12:34:56.789";\
            INSERT INTO five VALUES ?;\
            SELECT COLUMN CONVERT(NVARCHAR(10),_,110) FROM five',
			[d]
		);
		res = res.pop();
		assert(res[0] == '01-08-2015');
		assert(res[1] == '01-08-2015');
		done();
	});
});
