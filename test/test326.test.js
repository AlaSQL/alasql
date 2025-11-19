// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 326 FOREIGN KEYS', () => {
	test.skip('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test326; USE test326');
		done();
	});

	test.skip('2. CREATE TABLES City', done => {
		alasql(() => {
			/*
      CREATE TABLE dbo.Cities
      (
        cityid  CHAR(3)     NOT NULL PRIMARY KEY,
        city    VARCHAR(30) NOT NULL,
        region  VARCHAR(30) NULL,
        country VARCHAR(30) NOT NULL
      );
    */
		});
		done();
	});

	test.skip('3. INSERT VALUES INTO City', done => {
		alasql(() => {
			/*
      INSERT INTO dbo.Cities(cityid, city, region, country) VALUES
        ('ATL', 'Atlanta', 'GA', 'USA'),
        ('ORD', 'Chicago', 'IL', 'USA'),
        ('DEN', 'Denver', 'CO', 'USA'),
        ('IAH', 'Houston', 'TX', 'USA'),
        ('MCI', 'Kansas City', 'KS', 'USA'),
        ('LAX', 'Los Angeles', 'CA', 'USA'),
        ('MIA', 'Miami', 'FL', 'USA'),
        ('MSP', 'Minneapolis', 'MN', 'USA'),
        ('JFK', 'New York', 'NY', 'USA'),
        ('SEA', 'Seattle', 'WA', 'USA'),
        ('SFO', 'San Francisco', 'CA', 'USA'),
        ('ANC', 'Anchorage', 'AK', 'USA'),
        ('FAI', 'Fairbanks', 'AK', 'USA');
    */
		});
		done();
	});

	test.skip('4. CREATE TABLE Roads', done => {
		alasql(() => {
			/*
      CREATE TABLE dbo.Roads
      (
        city1       CHAR(3) NOT NULL REFERENCES dbo.Cities,
        city2       CHAR(3) NOT NULL REFERENCES dbo.Cities,
        distance INT     NOT NULL,
        PRIMARY KEY(city1, city2),
        CHECK(city1 < city2),
        CHECK(distance > 0)
      );
    */
		});
		done();
	});

	test.skip('5. INSERT VALUES INTO Roads', done => {
		alasql(() => {
			/*
      INSERT INTO dbo.Roads(city1, city2, distance) VALUES
        ('ANC', 'FAI',  359),
        ('ATL', 'ORD',  715),
        ('ATL', 'IAH',  800),
        ('ATL', 'MCI',  805),
        ('ATL', 'MIA',  665),
        ('ATL', 'JFK',  865),
        ('DEN', 'IAH', 1120),
        ('DEN', 'MCI',  600),
        ('DEN', 'LAX', 1025),
        ('DEN', 'MSP',  915),
        ('DEN', 'SEA', 1335),
        ('DEN', 'SFO', 1270),
        ('IAH', 'MCI',  795),
        ('IAH', 'LAX', 1550),
        ('IAH', 'MIA', 1190),
        ('JFK', 'ORD',  795),
        ('LAX', 'SFO',  385),
        ('MCI', 'ORD',  525),
        ('MCI', 'MSP',  440),
        ('MSP', 'ORD',  410),
        ('MSP', 'SEA', 2015),
        ('SEA', 'SFO',  815);
      */
		});
		done();
	});

	test.skip('6. INSERT wrong FOREIGN KEY', done => {
		expect(() => {
			alasql(
				"INSERT INTO dbo.Roads(city1, city2, distance) VALUES \
          ('SFO', 'SVO', 99999)"
			); // SVO - Sheremetievo - Airport
			// There is no such airport in the list
		}).toThrow();
		done();
	});

	test.skip('7. INSERT right FOREIGN KEY', done => {
		alasql(
			"INSERT INTO dbo.Cities(cityid, city, region, country) VALUES \
        ('SVO', 'Sheremetievo', 'Moscow', 'Russia')"
		);
		var res = alasql(
			"INSERT INTO dbo.Roads(city1, city2, distance) VALUES \
          ('SFO', 'SVO', 99999)"
		); // SVO - Sheremetievo - Airport
		expect(res == 1).toBe(true);
		done();
	});

	test.skip('8. SELECT', done => {
		var res = alasql("SELECT VALUE distance FROM dbo.Roads WHERE city1 = 'SFO' AND city2 = 'SVO'");
		expect(res == 99999).toBe(true);
		done();
	});

	if (false) {
		test.skip('9. FOREIGN KEY DOT operator', done => {
			var res = alasql.parse(
				"SELECT city1.name, city2, distance FROM dbo.Roads WHERE city1 = 'SFO' AND city2 = 'SVO'"
			);
			//    console.log(res.statements[0].columns[0].toJS('a','b'));
			var res = alasql(
				"SELECT city1.name, city2, distance FROM dbo.Roads WHERE city1 = 'SFO' AND city2 = 'SVO'"
			);
			expect(res == 99999).toBe(true);
			done();
		});
	}

	test.skip('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test326');
		done();
	});
});
