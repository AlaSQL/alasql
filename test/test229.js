if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

// See http://www.codeproject.com/Articles/300785/Calculating-simple-running-totals-in-SQL-Server
describe('Test 229 Calculating simple running totals', function () {
	it('1. Init database', function (done) {
		alasql('CREATE DATABASE test229; USE test229;');

		alasql(
			'CREATE TABLE RunTotalTestData ( \
            id    int not null identity(1,1) primary key, \
            [value] int not null \
        )'
		);
		// TODO Fix test with AUTOINCREMENT
		alasql('insert into RunTotalTestData ([value]) values (1)');
		alasql('insert into RunTotalTestData ([value]) values (2)');
		alasql('insert into RunTotalTestData ([value]) values (4)');
		alasql('insert into RunTotalTestData ([value]) values (7)');
		alasql('insert into RunTotalTestData ([value]) values (9)');
		alasql('insert into RunTotalTestData ([value]) values (12)');
		alasql('insert into RunTotalTestData ([value]) values (13)');
		alasql('insert into RunTotalTestData ([value]) values (16)');
		alasql('insert into RunTotalTestData ([value]) values (22)');
		alasql('insert into RunTotalTestData ([value]) values (42)');
		alasql('insert into RunTotalTestData ([value]) values (57)');
		alasql('insert into RunTotalTestData ([value]) values (58)');
		alasql('insert into RunTotalTestData ([value]) values (59)');
		alasql('insert into RunTotalTestData ([value]) values (60)');

		done();
	});

	it('2. Select accumulated sum', function (done) {
		var res = alasql(
			'SELECT a.id, a.[value], (SELECT SUM(b.[value]) \
                             FROM RunTotalTestData b \
                             WHERE b.id <= a.id) AS c \
                      FROM   RunTotalTestData a \
                      ORDER BY a.id;'
		);
		//      console.log(res);
		assert.deepEqual(res, [
			{id: 1, value: 1, c: 1},
			{id: 2, value: 2, c: 3},
			{id: 3, value: 4, c: 7},
			{id: 4, value: 7, c: 14},
			{id: 5, value: 9, c: 23},
			{id: 6, value: 12, c: 35},
			{id: 7, value: 13, c: 48},
			{id: 8, value: 16, c: 64},
			{id: 9, value: 22, c: 86},
			{id: 10, value: 42, c: 128},
			{id: 11, value: 57, c: 185},
			{id: 12, value: 58, c: 243},
			{id: 13, value: 59, c: 302},
			{id: 14, value: 60, c: 362},
		]);
		//};

		done();
	});

	it('3. Select accumulated sum', function (done) {
		var res = alasql(
			'SELECT a.id, a.[value], SUM(b.[value]) AS c \
                    FROM    RunTotalTestData a, \
                            RunTotalTestData b \
                    WHERE b.id <= a.id \
                    GROUP BY a.id, a.[value] \
                    ORDER BY a.id'
		);
		assert.deepEqual(res, [
			{id: 1, value: 1, c: 1},
			{id: 2, value: 2, c: 3},
			{id: 3, value: 4, c: 7},
			{id: 4, value: 7, c: 14},
			{id: 5, value: 9, c: 23},
			{id: 6, value: 12, c: 35},
			{id: 7, value: 13, c: 48},
			{id: 8, value: 16, c: 64},
			{id: 9, value: 22, c: 86},
			{id: 10, value: 42, c: 128},
			{id: 11, value: 57, c: 185},
			{id: 12, value: 58, c: 243},
			{id: 13, value: 59, c: 302},
			{id: 14, value: 60, c: 362},
		]);

		done();
	});

	it('4. Select accumulated sum', function (done) {
		var res = alasql(
			'SELECT a.id, a.[value], (SELECT SUM(b.[value]) \
                       FROM RunTotalTestData b \
                       WHERE b.id <= a.id \
                       AND b.[value] % 2 = 1) runningtotal\
    FROM  RunTotalTestData a \
    WHERE a.[value] % 2 = 1 \
    ORDER BY a.id;'
		);

		assert.deepEqual(res, [
			{id: 1, value: 1, runningtotal: 1},
			{id: 4, value: 7, runningtotal: 8},
			{id: 5, value: 9, runningtotal: 17},
			{id: 7, value: 13, runningtotal: 30},
			{id: 11, value: 57, runningtotal: 87},
			{id: 13, value: 59, runningtotal: 146},
		]);

		done();
	});

	it('5. Select accumulated sum', function (done) {
		var res = alasql(
			'SELECT a.id, a.[value], SUM(b.[value]) AS runningtotal\
        FROM   RunTotalTestData a, \
                RunTotalTestData b \
WHERE b.id        <= a.id \
AND   a.[value] % 2  = 1 \
AND   b.[value] % 2  = 1 \
GROUP BY a.id, a.[value] \
ORDER BY a.id;'
		);
		//console.log(res);

		assert.deepEqual(res, [
			{id: 1, value: 1, runningtotal: 1},
			{id: 4, value: 7, runningtotal: 8},
			{id: 5, value: 9, runningtotal: 17},
			{id: 7, value: 13, runningtotal: 30},
			{id: 11, value: 57, runningtotal: 87},
			{id: 13, value: 59, runningtotal: 146},
		]);

		done();
	});

	it('6. Select accumulated sum', function (done) {
		var res = alasql(
			'SELECT a.[value]%2 as even, a.id, a.[value], (SELECT SUM(b.[value])  \
                               FROM RunTotalTestData b \
                               WHERE b.id <= a.id \
                               AND b.[value]%2 = a.[value]%2) as c \
FROM   RunTotalTestData a \
ORDER BY [value]%2, a.id;'
		);

		assert.deepEqual(res, [
			{even: 0, id: 2, value: 2, c: 2},
			{even: 0, id: 3, value: 4, c: 6},
			{even: 0, id: 6, value: 12, c: 18},
			{even: 0, id: 8, value: 16, c: 34},
			{even: 0, id: 9, value: 22, c: 56},
			{even: 0, id: 10, value: 42, c: 98},
			{even: 0, id: 12, value: 58, c: 156},
			{even: 0, id: 14, value: 60, c: 216},
			{even: 1, id: 1, value: 1, c: 1},
			{even: 1, id: 4, value: 7, c: 8},
			{even: 1, id: 5, value: 9, c: 17},
			{even: 1, id: 7, value: 13, c: 30},
			{even: 1, id: 11, value: 57, c: 87},
			{even: 1, id: 13, value: 59, c: 146},
		]);

		done();
	});

	it('7. Select accumulated sum', function (done) {
		alasql.fn.mod = function (a, b) {
			return a % 2 == b % 2;
		};

		var res = alasql(
			'SELECT [value]%2 AS even, id, [value], SUM(b.[value]) AS c \
                    FROM   RunTotalTestData a, \
                            RunTotalTestData b \
                    WHERE a.[value]%2 = b.[value]%2 \
                    AND b.id <= a.id \
                    GROUP BY a.[value]%2, a.id, a.[value] \
                    ORDER BY [value]%2, id;'
		);

		assert.deepEqual(res, [
			{even: 0, id: 2, value: 2, c: 2},
			{even: 0, id: 3, value: 4, c: 6},
			{even: 0, id: 6, value: 12, c: 18},
			{even: 0, id: 8, value: 16, c: 34},
			{even: 0, id: 9, value: 22, c: 56},
			{even: 0, id: 10, value: 42, c: 98},
			{even: 0, id: 12, value: 58, c: 156},
			{even: 0, id: 14, value: 60, c: 216},
			{even: 1, id: 1, value: 1, c: 1},
			{even: 1, id: 4, value: 7, c: 8},
			{even: 1, id: 5, value: 9, c: 17},
			{even: 1, id: 7, value: 13, c: 30},
			{even: 1, id: 11, value: 57, c: 87},
			{even: 1, id: 13, value: 59, c: 146},
		]);

		done();
	});
	//}

	// SQL NOT REALIZED YET
	it('8. Over 1', function (done) {
		var ast = alasql.parse(
			'SELECT a.id, a.[value], SUM(a.[value]) OVER (ORDER BY a.id) \
          FROM   RunTotalTestData a \
          ORDER BY a.id;'
		);
		//        console.log(ast.toString());
		done();
	});

	it('8. Over 2', function (done) {
		var ast = alasql.parse(
			'SELECT a.id, a.[value], SUM(a.[value]) OVER (ORDER BY a.id) \
            FROM   RunTotalTestData a \
            WHERE a.[value] % 2 = 1 \
            ORDER BY a.id;'
		);
		//        console.log(ast.toString());
		done();
	});

	it('9. Over 3', function (done) {
		var ast = alasql.parse(
			'SELECT a.value%2, a.id, a.[value], SUM(a.[value]) OVER (PARTITION BY a.[value]%2 ORDER BY a.id) \
            FROM   RunTotalTestData a \
            ORDER BY a.[value]%2, a.id;'
		);
		//        console.log(ast.toString());
		done();
	});

	it('99. Drop database', function (done) {
		alasql('DROP DATABASE test229');
		done();
	});
});
