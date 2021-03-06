if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

// See http://www.codeproject.com/Articles/300785/Calculating-simple-running-totals-in-SQL-Server
describe('Test 231 NIST SQL Example', function () {
	it('1. Prepare database', function (done) {
		alasql('CREATE DATABASE test231; USE test231;');
		done();
	});

	it('2. Create STATION table', function (done) {
		var res = alasql(
			'CREATE TABLE STATION \
                (ID INTEGER PRIMARY KEY, \
                CITY CHAR(20), \
                STATE CHAR(2), \
                LAT_N REAL, \
                LONG_W REAL);'
		);
		assert.deepEqual(res, 1);

		var res = alasql(
			"INSERT INTO STATION VALUES (13, 'Phoenix', 'AZ', 33, 112); \
                INSERT INTO STATION VALUES (44, 'Denver', 'CO', 40, 105); \
                INSERT INTO STATION VALUES (66, 'Caribou', 'ME', 47, 68);"
		);

		assert.deepEqual(res, [1, 1, 1]);

		var res = alasql('SELECT * FROM STATION;');
		assert.deepEqual(res, [
			{ID: 13, CITY: 'Phoenix', STATE: 'AZ', LAT_N: 33, LONG_W: 112},
			{ID: 44, CITY: 'Denver', STATE: 'CO', LAT_N: 40, LONG_W: 105},
			{ID: 66, CITY: 'Caribou', STATE: 'ME', LAT_N: 47, LONG_W: 68},
		]);

		var res = alasql('SELECT * FROM STATION WHERE LAT_N > 39.7;');
		assert.deepEqual(res, [
			{ID: 44, CITY: 'Denver', STATE: 'CO', LAT_N: 40, LONG_W: 105},
			{ID: 66, CITY: 'Caribou', STATE: 'ME', LAT_N: 47, LONG_W: 68},
		]);

		var res = alasql('SELECT ID, CITY, STATE FROM STATION');
		assert.deepEqual(res, [
			{ID: 13, CITY: 'Phoenix', STATE: 'AZ'},
			{ID: 44, CITY: 'Denver', STATE: 'CO'},
			{ID: 66, CITY: 'Caribou', STATE: 'ME'},
		]);

		var res = alasql('SELECT ID, CITY, STATE FROM STATION WHERE LAT_N > 39.7');
		assert.deepEqual(res, [
			{ID: 44, CITY: 'Denver', STATE: 'CO'},
			{ID: 66, CITY: 'Caribou', STATE: 'ME'},
		]);

		done();
	});

	it('3. Create STATS table', function (done) {
		var res = alasql(
			'CREATE TABLE STATS  \
                    (ID INTEGER REFERENCES STATION(ID), \
                    MONTH INTEGER CHECK (MONTH BETWEEN 1 AND 12), \
                    TEMP_F REAL CHECK (TEMP_F BETWEEN -80 AND 150), \
                    RAIN_I REAL CHECK (VALUE->RAIN_I BETWEEN 0 AND 100), \
                    PRIMARY KEY (ID, MONTH));'
		);
		assert.deepEqual(res, 1);

		var res = alasql(
			'INSERT INTO STATS VALUES (13, 1, 57.4, 0.31);  \
            INSERT INTO STATS VALUES (13, 7, 91.7, 5.15);  \
            INSERT INTO STATS VALUES (44, 1, 27.3, 0.18);  \
            INSERT INTO STATS VALUES (44, 7, 74.8, 2.11);  \
            INSERT INTO STATS VALUES (66, 1, 6.7, 2.10); \
            INSERT INTO STATS VALUES (66, 7, 65.8, 4.52);'
		);

		assert.deepEqual(res, [1, 1, 1, 1, 1, 1]);

		var res = alasql('SELECT * FROM STATS;');

		assert.deepEqual(res, [
			{ID: 13, MONTH: 1, TEMP_F: 57.4, RAIN_I: 0.31},
			{ID: 13, MONTH: 7, TEMP_F: 91.7, RAIN_I: 5.15},
			{ID: 44, MONTH: 1, TEMP_F: 27.3, RAIN_I: 0.18},
			{ID: 44, MONTH: 7, TEMP_F: 74.8, RAIN_I: 2.11},
			{ID: 66, MONTH: 1, TEMP_F: 6.7, RAIN_I: 2.1},
			{ID: 66, MONTH: 7, TEMP_F: 65.8, RAIN_I: 4.52},
		]);

		done();
	});

	it('3. Selects', function (done) {
		var res = alasql(
			'SELECT * FROM STATION, STATS \
                            WHERE STATION.ID = STATS.ID'
		);

		assert.deepEqual(res, [
			{
				ID: 13,
				CITY: 'Phoenix',
				STATE: 'AZ',
				LAT_N: 33,
				LONG_W: 112,
				MONTH: 1,
				TEMP_F: 57.4,
				RAIN_I: 0.31,
			},
			{
				ID: 13,
				CITY: 'Phoenix',
				STATE: 'AZ',
				LAT_N: 33,
				LONG_W: 112,
				MONTH: 7,
				TEMP_F: 91.7,
				RAIN_I: 5.15,
			},
			{
				ID: 44,
				CITY: 'Denver',
				STATE: 'CO',
				LAT_N: 40,
				LONG_W: 105,
				MONTH: 1,
				TEMP_F: 27.3,
				RAIN_I: 0.18,
			},
			{
				ID: 44,
				CITY: 'Denver',
				STATE: 'CO',
				LAT_N: 40,
				LONG_W: 105,
				MONTH: 7,
				TEMP_F: 74.8,
				RAIN_I: 2.11,
			},
			{
				ID: 66,
				CITY: 'Caribou',
				STATE: 'ME',
				LAT_N: 47,
				LONG_W: 68,
				MONTH: 1,
				TEMP_F: 6.7,
				RAIN_I: 2.1,
			},
			{
				ID: 66,
				CITY: 'Caribou',
				STATE: 'ME',
				LAT_N: 47,
				LONG_W: 68,
				MONTH: 7,
				TEMP_F: 65.8,
				RAIN_I: 4.52,
			},
		]);

		var res = alasql(
			'SELECT MONTH, ID, RAIN_I, TEMP_F \
            FROM STATS  \
            ORDER BY MONTH, RAIN_I DESC;'
		);

		assert.deepEqual(res, [
			{MONTH: 1, ID: 66, RAIN_I: 2.1, TEMP_F: 6.7},
			{MONTH: 1, ID: 13, RAIN_I: 0.31, TEMP_F: 57.4},
			{MONTH: 1, ID: 44, RAIN_I: 0.18, TEMP_F: 27.3},
			{MONTH: 7, ID: 13, RAIN_I: 5.15, TEMP_F: 91.7},
			{MONTH: 7, ID: 66, RAIN_I: 4.52, TEMP_F: 65.8},
			{MONTH: 7, ID: 44, RAIN_I: 2.11, TEMP_F: 74.8},
		]);

		var res = alasql(
			'SELECT LAT_N, CITY, TEMP_F \
            FROM STATS, STATION \
            WHERE MONTH = 7 \
            AND STATS.ID = STATION.ID \
            ORDER BY TEMP_F;'
		);

		assert.deepEqual(res, [
			{LAT_N: 47, CITY: 'Caribou', TEMP_F: 65.8},
			{LAT_N: 40, CITY: 'Denver', TEMP_F: 74.8},
			{LAT_N: 33, CITY: 'Phoenix', TEMP_F: 91.7},
		]);

		var res = alasql(
			'SELECT MAX(TEMP_F), MIN(TEMP_F), AVG(RAIN_I), ID \
            FROM STATS \
            GROUP BY ID;'
		);

		assert.deepEqual(res, [
			{
				'MAX(TEMP_F)': 91.7,
				'MIN(TEMP_F)': 57.4,
				'AVG(RAIN_I)': 2.73,
				ID: 13,
			},
			{
				'MAX(TEMP_F)': 74.8,
				'MIN(TEMP_F)': 27.3,
				'AVG(RAIN_I)': 1.145,
				ID: 44,
			},
			{
				'MAX(TEMP_F)': 65.8,
				'MIN(TEMP_F)': 6.7,
				'AVG(RAIN_I)': 3.3099999999999996,
				ID: 66,
			},
		]);

		var res = alasql(
			'SELECT * FROM STATION \
            WHERE 50 < (SELECT AVG(TEMP_F) FROM STATS \
            WHERE STATION.ID = STATS.ID);'
		);

		assert.deepEqual(res, [
			{ID: 13, CITY: 'Phoenix', STATE: 'AZ', LAT_N: 33, LONG_W: 112},
			{ID: 44, CITY: 'Denver', STATE: 'CO', LAT_N: 40, LONG_W: 105},
		]);

		//            console.log(res);

		done();
	});

	it('5. View', function (done) {
		var res = alasql(
			'CREATE VIEW METRIC_STATS (ID, MONTH, TEMP_C, RAIN_C) AS \
        SELECT ID, \
        MONTH, \
        (TEMP_F - 32) * 5 /9, \
        RAIN_I * 0.3937 \
        FROM STATS;'
		);
		assert.deepEqual(res, 1);

		var res = alasql('SELECT * FROM METRIC_STATS');

		assert.deepEqual(res, [
			{ID: 13, MONTH: 1, TEMP_C: 14.11111111111111, RAIN_C: 0.122047},
			{ID: 13, MONTH: 7, TEMP_C: 33.166666666666664, RAIN_C: 2.027555},
			{
				ID: 44,
				MONTH: 1,
				TEMP_C: -2.6111111111111107,
				RAIN_C: 0.070866,
			},
			{ID: 44, MONTH: 7, TEMP_C: 23.77777777777778, RAIN_C: 0.830707},
			{ID: 66, MONTH: 1, TEMP_C: -14.055555555555555, RAIN_C: 0.82677},
			{
				ID: 66,
				MONTH: 7,
				TEMP_C: 18.77777777777778,
				RAIN_C: 1.7795239999999999,
			},
		]);

		var res = alasql(
			'SELECT * FROM METRIC_STATS \
            WHERE TEMP_C < 0 AND MONTH = 1  \
            ORDER BY RAIN_C;'
		);

		assert.deepEqual(res, [
			{
				ID: 44,
				MONTH: 1,
				TEMP_C: -2.6111111111111107,
				RAIN_C: 0.070866,
			},
			{ID: 66, MONTH: 1, TEMP_C: -14.055555555555555, RAIN_C: 0.82677},
		]);

		done();
	});

	it('8. UPDATE', function (done) {
		var res = alasql('UPDATE STATS SET RAIN_I = RAIN_I + 0.01');

		assert.deepEqual(res, 6);

		var res = alasql(
			'UPDATE STATS SET TEMP_F = 74.9 \
            WHERE ID = 44 \
            AND MONTH = 7;'
		);

		assert.deepEqual(res, 1);

		var res = alasql('SELECT * FROM STATS;');

		assert.deepEqual(res, [
			{ID: 13, MONTH: 1, TEMP_F: 57.4, RAIN_I: 0.32},
			{ID: 13, MONTH: 7, TEMP_F: 91.7, RAIN_I: 5.16},
			{ID: 44, MONTH: 1, TEMP_F: 27.3, RAIN_I: 0.19},
			{ID: 44, MONTH: 7, TEMP_F: 74.9, RAIN_I: 2.1199999999999997},
			{ID: 66, MONTH: 1, TEMP_F: 6.7, RAIN_I: 2.11},
			{ID: 66, MONTH: 7, TEMP_F: 65.8, RAIN_I: 4.529999999999999},
		]);

		done();
	});

	it('9. Commits', function (done) {
		//alasql('COMMIT WORK');

		var res1 = alasql('SELECT * FROM STATS');
		assert.deepEqual(res1, [
			{ID: 13, MONTH: 1, TEMP_F: 57.4, RAIN_I: 0.32},
			{ID: 13, MONTH: 7, TEMP_F: 91.7, RAIN_I: 5.16},
			{ID: 44, MONTH: 1, TEMP_F: 27.3, RAIN_I: 0.19},
			{ID: 44, MONTH: 7, TEMP_F: 74.9, RAIN_I: 2.1199999999999997},
			{ID: 66, MONTH: 1, TEMP_F: 6.7, RAIN_I: 2.11},
			{ID: 66, MONTH: 7, TEMP_F: 65.8, RAIN_I: 4.529999999999999},
		]);

		var res = alasql('BEGIN WORK');
		assert.deepEqual(res, 1);

		var res = alasql('UPDATE STATS SET RAIN_I = 4.50 \
            WHERE ID = 44');
		assert.deepEqual(res, 2);

		var res2 = alasql('SELECT * FROM STATS');
		assert.deepEqual(res2, [
			{ID: 13, MONTH: 1, TEMP_F: 57.4, RAIN_I: 0.32},
			{ID: 13, MONTH: 7, TEMP_F: 91.7, RAIN_I: 5.16},
			{ID: 44, MONTH: 1, TEMP_F: 27.3, RAIN_I: 4.5},
			{ID: 44, MONTH: 7, TEMP_F: 74.9, RAIN_I: 4.5},
			{ID: 66, MONTH: 1, TEMP_F: 6.7, RAIN_I: 2.11},
			{ID: 66, MONTH: 7, TEMP_F: 65.8, RAIN_I: 4.529999999999999},
		]);

		if (false) {
			assert(!alasql.utils.deepEqual(res1, res2));

			var res = alasql('ROLLBACK WORK;');
			assert.deepEqual(res, 1);

			var res3 = alasql('SELECT * FROM STATS');
			/// console.log(res3);
			assert.deepEqual(res1, res3);
		}
		var res = alasql('UPDATE STATS SET RAIN_I = 4.50 WHERE ID = 44 AND MONTH = 7');
		assert.deepEqual(res, 1);
		//        console.log(res4);
		var res = alasql('COMMIT WORK');
		assert.deepEqual(res, 1);
		//        console.log(res4);

		// TODO: Transactions
		if (false) {
			assert(!alasql.utils.deepEqual(res3, res4));
		}
		done();
	});

	it('10. Delete', function (done) {
		var res = alasql(
			'DELETE FROM STATS \
            WHERE MONTH = 7 \
            OR ID IN (SELECT ID FROM STATION \
            WHERE LONG_W < 90)'
		);
		assert.deepEqual(res, 4);

		var res = alasql('DELETE FROM STATION WHERE LONG_W < 90');
		assert.deepEqual(res, 1);

		var res1 = alasql('SELECT * FROM STATION');
		assert.deepEqual(res1, [
			{ID: 13, CITY: 'Phoenix', STATE: 'AZ', LAT_N: 33, LONG_W: 112},
			{ID: 44, CITY: 'Denver', STATE: 'CO', LAT_N: 40, LONG_W: 105},
		]);
		//        console.log(res1);
		var res2 = alasql('SELECT * FROM STATS');
		//        console.log(res2);
		assert.deepEqual(res2, [
			{ID: 13, MONTH: 1, TEMP_F: 57.4, RAIN_I: 0.32},
			{ID: 44, MONTH: 1, TEMP_F: 27.3, RAIN_I: 4.5},
		]);
		var res3 = alasql('SELECT * FROM METRIC_STATS');
		//        console.log(res3);
		assert.deepEqual(res3, [
			{ID: 13, MONTH: 1, TEMP_C: 14.11111111111111, RAIN_C: 0.125984},
			{ID: 44, MONTH: 1, TEMP_C: -2.6111111111111107, RAIN_C: 1.77165},
		]);

		done();
	});

	it('11. Insert with constraints', function (done) {
		assert.throws(function () {
			var res = alasql('INSERT INTO STATS VALUES (33,8,27.4,.19)');
		}, Error);
		assert.throws(function () {
			var res = alasql('UPDATE STATS SET TEMP_F = -100 WHERE ID = 44 AND MONTH = 1');
		}, Error);
		assert.throws(function () {
			var res = alasql('INSERT INTO STATS VALUES (44,8,27.4,-.03)');
		}, Error);
		assert.throws(function () {
			var res = alasql('INSERT INTO STATS VALUES (44,13,27.4,.19)');
		}, Error);
		assert.throws(function () {
			var res = alasql('INSERT INTO STATS VALUES (44,8,160,.19)');
		}, Error);
		var res = alasql('INSERT INTO STATS VALUES (44,8,27.4,.10)');
		assert.deepEqual(res, 1);

		var res = alasql('SELECT * FROM STATS');
		assert.throws(function () {
			var res = alasql('INSERT INTO STATS VALUES (44,8,160,.19)');
		}, Error);
		done();
	});

	it('99. DROP', function (done) {
		alasql('DROP DATABASE test231');
		done();
	});
});
